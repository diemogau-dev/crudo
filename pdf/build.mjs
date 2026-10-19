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
  if (model.plan?.dimensions == null) pending.push("medidas del plano");
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
  let img = sharp(path.join(ROOT, spec.src)).rotate();
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

// Portada: el logo va sobre Iron, arriba de la foto, así nunca cruza el filo
// del volumen ni una carpintería. La foto va sin filtro y se funde con Iron
// arriba y abajo, donde apoyan el logo y el texto.
async function coverImage(spec) {
  const { img, width, height } = await prepare(spec, SLOTS.cover);
  const svg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1A1A1A" stop-opacity="1"/>
          <stop offset="0.12" stop-color="#1A1A1A" stop-opacity="0"/>
          <stop offset="0.8" stop-color="#1A1A1A" stop-opacity="0"/>
          <stop offset="1" stop-color="#1A1A1A" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#t)"/>
    </svg>`);
  return toDataUri(await jpeg(img.composite([{ input: svg }])), "image/jpeg");
}

async function slotImage(spec, slot, transform) {
  const { img } = await prepare(spec, slot);
  const buf = await jpeg(transform ? transform(img) : img);
  return toDataUri(buf, "image/jpeg");
}

async function sharedAssets() {
  // Archivo estática en los cuatro pesos del manual, embebida en el PDF.
  const fonts = {};
  for (const weight of [400, 500, 600, 900]) {
    const file = `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff2`;
    fonts[weight] = toDataUri(await fs.readFile(path.join(ROOT, file)), "font/woff2");
  }
  const logo = await sharp(path.join(ROOT, "public/logo/crudo-wordmark-alabaster.png"))
    .png()
    .toBuffer();
  return {
    fonts,
    logo: toDataUri(logo, "image/png"),
  };
}

async function modelAssets(model, shared) {
  const im = model.images;
  const cover = await coverImage(im.cover);
  const gallery = await Promise.all(
    im.gallery.map((spec, i) => slotImage(spec, SLOTS.gallery[i])),
  );
  // El plano viene sobre blanco puro: lo llevamos a Alabaster.
  const plan = await slotImage(im.plan, SLOTS.plan, (img) =>
    img.linear([245 / 255, 245 / 255, 243 / 255], [0, 0, 0]),
  );
  const workshop = await slotImage(im.workshop, SLOTS.workshop);
  return {
    ...shared,
    cover,
    gallery,
    plan,
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
