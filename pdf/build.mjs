// Genera las propuestas comerciales en PDF a partir de data/models.json.
//
//   npm run build:pdf                    # todos los modelos con renders cargados
//   npm run build:pdf -- crudo-01        # uno o varios modelos
//   npm run build:pdf:release            # falla si algún dato está [PENDIENTE]
//
// Si un campo pendiente está en null, el PDF sale igual con marca de agua
// "BORRADOR". Errores de datos (pagos que no suman, adicionales sin precio,
// palabras prohibidas, peso) fallan siempre.

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PDFDocument, PDFName } from "pdf-lib";
import { chromium } from "playwright";
import { PAGE, SLOTS, paymentSchedule, renderProposal } from "./template.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "pdf/out");
const CACHE = path.join(ROOT, "pdf/.cache");
const MAX_BYTES = 6 * 1024 * 1024;
const MAX_SIDE = 1600;

// Nada de esto puede aparecer en un PDF generado. Se busca como palabra
// (o como comienzo de palabra si termina en *): "Inodoro" no es "Nodo".
const FORBIDDEN = [
  "Concrit*", "Fernando", "Brutal", "Nodo", "Calmo", "Casa Fácil", "Casa Facil",
  "Deca", "Maccini", "Gemini*", "dividendo*", "ganancia*", "costo*", "Diego", "Calde*",
];
const forbiddenRegex = (word) =>
  word.endsWith("*")
    ? new RegExp(`(?<!\\p{L})${word.slice(0, -1)}`, "iu")
    : new RegExp(`(?<!\\p{L})${word}(?!\\p{L})`, "iu");

const args = process.argv.slice(2);
const release = args.includes("--release");
const only = args.filter((a) => !a.startsWith("--"));

const readJson = async (p) => JSON.parse(await fs.readFile(path.join(ROOT, p), "utf8"));

function pendingFields(model, contact) {
  const pending = [];
  if (model.bedrooms == null) pending.push("dormitorios");
  if (model.bathrooms == null) pending.push("baños");
  if (model.deck == null) pending.push("deck");
  if (model.kitchen === null) pending.push("cocina");
  if (!model.plan?.rooms?.length) pending.push("ambientes del plano");
  if (!model.gallery_phrase) pending.push("frase de galería");
  if (contact.office.hours == null) pending.push("horario de oficina");
  return pending;
}

function validate(model, common) {
  const errors = [];
  if (!Number.isInteger(model.price_gs) || model.price_gs <= 0)
    errors.push("el precio es cero, nulo o no es un entero");
  if (!(model.area_m2 > 0)) errors.push("la superficie no es válida");
  if (typeof model.show_price_per_m2 !== "boolean")
    errors.push("show_price_per_m2 tiene que ser true o false");
  if (errors.length) return errors;
  const payments = paymentSchedule(model.price_gs, common.payment_plan);
  const total = payments.reduce((a, p) => a + p.amount, 0);
  if (total !== model.price_gs)
    errors.push(`los pagos suman ${total} y el precio es ${model.price_gs}`);
  if (payments.some((p) => p.amount <= 0)) errors.push("hay un pago en cero");
  if (common.payment_plan.reduce((a, p) => a + p.pct, 0) !== 100)
    errors.push("los porcentajes del plan de pagos no suman 100");
  for (const e of model.extras) {
    if (e.price_gs == null && !e.custom)
      errors.push(`el adicional "${e.name}" no tiene precio`);
    if (e.price_gs != null && !(Number.isInteger(e.price_gs) && e.price_gs > 0))
      errors.push(`el precio del adicional "${e.name}" no es válido`);
  }
  if (!model.images) errors.push("no tiene renders elegidos (images)");
  return errors;
}

// Recorta la imagen a la proporción del slot alrededor de `focus`, reduce a
// MAX_SIDE y devuelve un pipeline de sharp sin metadatos.
async function prepare(spec, slot) {
  // flatten: los PNG con transparencia van sobre blanco antes de recortar.
  let img = sharp(
    await sharp(path.join(ROOT, spec.src)).rotate().flatten({ background: "#ffffff" }).toBuffer(),
  );
  let { width, height } = await img.metadata();
  if (spec.crop) {
    const [left, top, w, h] = spec.crop;
    img = sharp(await img.extract({ left, top, width: w, height: h }).toBuffer());
    width = w;
    height = h;
  }
  if (spec.trim) {
    const t = { top: 0, bottom: 0, left: 0, right: 0, ...spec.trim };
    const left = Math.round(width * t.left);
    const top = Math.round(height * t.top);
    const w = Math.round(width * (1 - t.left - t.right));
    const h = Math.round(height * (1 - t.top - t.bottom));
    img = sharp(await img.extract({ left, top, width: w, height: h }).toBuffer());
    width = w;
    height = h;
  }
  if (spec.rotate) {
    img = sharp(await img.rotate(spec.rotate).toBuffer());
    if (spec.rotate % 180) [width, height] = [height, width];
  }
  const ratio = slot.width / slot.height;
  let cw = width;
  let ch = Math.round(width / ratio);
  if (ch > height) {
    ch = height;
    cw = Math.round(height * ratio);
  }
  const fx = spec.focus?.x ?? 0.5;
  const fy = spec.focus?.y ?? 0.5;
  const left = Math.min(Math.max(Math.round(fx * width - cw / 2), 0), width - cw);
  const top = Math.min(Math.max(Math.round(fy * height - ch / 2), 0), height - ch);
  img = img.extract({ left, top, width: cw, height: ch });
  const scale = Math.min(1, MAX_SIDE / Math.max(cw, ch));
  const outW = Math.round(cw * scale);
  const outH = Math.round(ch * scale);
  if (scale < 1) img = img.resize(outW, outH);
  return { img, width: outW, height: outH };
}

const toDataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;
const jpeg = (img) => img.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

async function slotImage(spec, slot, transform) {
  const { img } = await prepare(spec, slot);
  const buf = await jpeg(transform ? transform(img) : img);
  return toDataUri(buf, "image/jpeg");
}

// Plano: se recorta, se gira y entra en la caja máxima con su proporción.
// Los marcadores vienen en píxeles del archivo original y se pasan a
// fracciones de la imagen final.
async function planImage(spec, rooms) {
  const meta = await sharp(path.join(ROOT, spec.src)).metadata();
  const [cx, cy, cw, ch] = spec.crop ?? [0, 0, meta.width, meta.height];
  const turned = spec.rotate % 180 !== 0;
  const w = turned ? ch : cw;
  const h = turned ? cw : ch;
  const k = Math.min(SLOTS.planMax.width / w, SLOTS.planMax.height / h);
  const box = { width: Math.round(w * k), height: Math.round(h * k) };
  const uri = await slotImage(spec, box, (img) =>
    // El plano viene sobre blanco puro: lo llevamos a Alabaster.
    img.linear([245 / 255, 245 / 255, 243 / 255], [0, 0, 0]),
  );
  const markers = rooms.map(({ at: [x, y] }) => {
    const u = (x - cx) / cw;
    const v = (y - cy) / ch;
    if (!turned) return { x: u, y: v };
    return spec.rotate === 90 ? { x: 1 - v, y: u } : { x: v, y: 1 - u };
  });
  return { uri, box, markers };
}

async function sharedAssets() {
  // Archivo estática en los cuatro pesos del manual, embebida en el PDF.
  const fonts = {};
  for (const weight of [400, 500, 600, 800, 900]) {
    const file = `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff2`;
    fonts[weight] = toDataUri(await fs.readFile(path.join(ROOT, file)), "font/woff2");
  }
  // Wordmark vectorial oficial: se embeben sus trazos y toma el color del texto.
  const svg = await fs.readFile(path.join(ROOT, "public/logo/crudo-wordmark.svg"), "utf8");
  const wordmark = svg.match(/<g[^>]*>([\s\S]*)<\/g>/)[1].trim();
  return { fonts, wordmark };
}

async function modelAssets(model, shared) {
  const im = model.images;
  const cover = await slotImage(im.cover, SLOTS.cover);
  const gallery = await Promise.all(
    im.gallery.map((spec, i) => slotImage(spec, SLOTS.gallery[i])),
  );
  const plan = await planImage(im.plan, model.plan.rooms);
  const workshop = await slotImage(im.workshop, SLOTS.workshop);
  return {
    ...shared,
    cover,
    gallery,
    plan: plan.uri,
    planBox: plan.box,
    planMarkers: plan.markers,
    workshop,
    workshopIsRender: im.workshop.render !== false,
  };
}

async function cleanPdf(buf, title) {
  const doc = await PDFDocument.load(buf, { updateMetadata: false });
  doc.setTitle(title, { showInWindowTitleBar: true });
  doc.setAuthor("CRUDO");
  doc.setSubject("Propuesta comercial");
  doc.setCreator("CRUDO");
  doc.setProducer("CRUDO");
  doc.setKeywords([]);
  doc.setLanguage("es-PY");
  doc.catalog.delete(PDFName.of("Metadata"));
  const links = [];
  for (const page of doc.getPages()) {
    const annots = page.node.Annots();
    if (!annots) continue;
    for (let i = 0; i < annots.size(); i++) {
      const annot = annots.lookup(i);
      const action = annot.lookup(PDFName.of("A"));
      const uri = action?.lookup(PDFName.of("URI"));
      if (uri) links.push(uri.decodeText ? uri.decodeText() : uri.asString());
    }
  }
  return { bytes: await doc.save(), pages: doc.getPageCount(), links };
}

function qa(file) {
  const problems = [];
  const text = execFileSync("pdftotext", ["-layout", file, "-"]).toString();
  const info = execFileSync("pdfinfo", [file]).toString();
  for (const word of FORBIDDEN) {
    const re = forbiddenRegex(word);
    if (re.test(text) || re.test(info)) problems.push(`aparece la palabra prohibida "${word}"`);
  }
  return { problems };
}

// Nada se corta ni se pisa: cada bloque de contenido termina antes del pie
// de su página y ningún elemento se sale por los costados.
async function checkLayout(page) {
  return page.evaluate(() => {
    const problems = [];
    document.querySelectorAll("section.page").forEach((sec, i) => {
      const box = sec.getBoundingClientRect();
      const foot = sec.querySelector(".foot, .cover-ref");
      const limit = (foot ? foot.getBoundingClientRect().top - 20 : box.bottom - 40) - box.top;
      for (const el of sec.querySelectorAll(".flow, .cover-body, .gallery-text, .plan-side, .concrete-body, .next-bottom")) {
        const bottom = el.getBoundingClientRect().bottom - box.top;
        if (bottom > limit) problems.push(`página ${i + 1}: el contenido se pasa ${Math.ceil(bottom - limit)} px sobre el pie`);
      }
      const flow = sec.querySelector(".flow");
      const bottomBlock = sec.querySelector(".next-bottom");
      if (flow && bottomBlock && flow.getBoundingClientRect().bottom > bottomBlock.getBoundingClientRect().top - 24)
        problems.push(`página ${i + 1}: la garantía se pisa con el botón`);
      for (const el of sec.querySelectorAll("*")) {
        if (el.closest(".draft-mark, .draft-band")) continue;
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > box.right + 0.5 || r.left < box.left - 0.5))
          problems.push(`página ${i + 1}: un elemento se sale por el costado`);
      }
    });
    return [...new Set(problems)];
  });
}

async function rasterize(file, id) {
  const dir = path.join(CACHE, "qa");
  await fs.mkdir(dir, { recursive: true });
  // 1080 px de ancho: el PDF mide 810 pt, así que 96 dpi.
  execFileSync("pdftoppm", ["-r", "96", "-png", file, path.join(dir, id)]);
}

async function main() {
  const data = await readJson("data/models.json");
  const contact = await readJson("data/contact.json");
  const issuedAt = process.env.ISSUED_AT ? new Date(`${process.env.ISSUED_AT}T12:00:00`) : new Date();
  const models = data.models.filter((m) =>
    only.length ? only.includes(m.id) : m.images,
  );
  if (!models.length) throw new Error("No hay modelos para generar.");

  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(CACHE, { recursive: true });
  const shared = await sharedAssets();
  const browser = await chromium.launch();
  let failed = false;
  let releaseBlocked = false;

  try {
    for (const model of models) {
      const errors = validate(model, data.common);
      if (errors.length) {
        console.error(`✗ ${model.name}: ${errors.join("; ")}`);
        failed = true;
        continue;
      }
      const pending = pendingFields(model, contact);
      const assets = await modelAssets(model, shared);
      const html = renderProposal({ model, common: data.common, contact, assets, issuedAt, pending });
      await fs.writeFile(path.join(CACHE, `${model.id}.html`), html);

      const page = await browser.newPage({ viewport: { width: PAGE.width, height: PAGE.height } });
      await page.setContent(html, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const layout = await checkLayout(page);
      const raw = await page.pdf({
        width: `${PAGE.width}px`,
        height: `${PAGE.height}px`,
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();

      const title = `${model.name} — Propuesta`;
      const { bytes, pages, links } = await cleanPdf(raw, title);
      const file = path.join(OUT, `${model.name.replace(/\s+/g, "-")}.pdf`);
      await fs.writeFile(file, bytes);

      const { problems } = qa(file);
      problems.push(...layout);
      if (pages !== 7) problems.push(`tiene ${pages} páginas (deben ser 7)`);
      if (bytes.length > MAX_BYTES) problems.push(`pesa ${(bytes.length / 1048576).toFixed(2)} MB`);
      const wa = `https://wa.me/${contact.whatsapp.number}?text=`;
      if (!links.some((l) => l.startsWith(wa))) problems.push("falta el link de WhatsApp");
      await rasterize(file, model.id);

      const size = `${(bytes.length / 1048576).toFixed(2)} MB`;
      const status = pending.length ? `BORRADOR (falta: ${pending.join(", ")})` : "final";
      console.log(`${problems.length ? "✗" : "✓"} ${path.relative(ROOT, file)} · ${pages} págs · ${size} · ${status}`);
      console.log(`  links: ${links.join(" · ")}`);
      for (const p of problems) console.error(`  ✗ ${p}`);
      if (problems.length) failed = true;
      if (pending.length) releaseBlocked = true;
    }
  } finally {
    await browser.close();
  }

  if (failed) process.exit(1);
  if (release && releaseBlocked) {
    console.error("✗ Release bloqueado: hay datos [PENDIENTE] en data/models.json o data/contact.json.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
