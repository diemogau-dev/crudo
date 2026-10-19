// Plantilla de la propuesta comercial (7 páginas de 1080 × 1920 px).
// Es una función pura: recibe datos ya resueltos y devuelve HTML. El build
// (pdf/build.mjs) prepara imágenes y fuente; un futuro ERP puede llamar a
// renderProposal con sus propios datos y reutilizar el mismo diseño.

export const PAGE = { width: 1080, height: 1920 };

// Cajas de imagen que usa la plantilla. El build recorta cada render a estas
// proporciones antes de embeberlo.
export const SLOTS = {
  cover: { width: 1080, height: 720 },
  gallery: [
    { width: 1080, height: 487 },
    { width: 620, height: 760 },
    { width: 400, height: 760 },
  ],
  plan: { width: 616, height: 1362 },
  workshop: { width: 1080, height: 600 },
};

// Proporciones del wordmark oficial (public/logo/crudo-wordmark-*.png):
// 687 × 205 px, la C ocupa 197 px de alto.
const LOGO_RATIO = 205 / 687;
const LOGO_C_RATIO = 197 / 687;
// Altura de mayúscula de Archivo respecto del cuerpo.
const ARCHIVO_CAP = 0.7;

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function formatGs(value) {
  return `Gs ${Math.round(value).toLocaleString("de-DE")}`;
}

export function formatNumber(value, decimals = 2) {
  return Number(value).toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function formatDate(date) {
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}

// 40 % y 40 % redondeados al millar; el 20 % es el resto, así suman exacto.
export function paymentSchedule(price, plan) {
  const amounts = plan.map((step, i) =>
    i < plan.length - 1 ? Math.round((price * step.pct) / 100 / 1000) * 1000 : 0,
  );
  amounts[amounts.length - 1] = price - amounts.reduce((a, b) => a + b, 0);
  return plan.map((step, i) => ({ ...step, amount: amounts[i] }));
}

export function pricePerM2(price, area) {
  return Math.round(price / area / 1000) * 1000;
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function pendingMark(label) {
  return `<span class="pending">[PENDIENTE: ${esc(label)}]</span>`;
}

function dataLine(model) {
  const parts = [`${formatNumber(model.area_m2)} m²`];
  parts.push(
    model.bedrooms == null
      ? pendingMark("dormitorios")
      : plural(model.bedrooms, "dormitorio", "dormitorios"),
  );
  parts.push(
    model.bathrooms == null
      ? pendingMark("baños")
      : plural(model.bathrooms, "baño", "baños"),
  );
  if (model.deck == null) parts.push(pendingMark("deck"));
  else if (model.deck) parts.push("deck");
  return parts
    .map((p) => `<span class="nb">${p.startsWith("<") ? p : esc(p)}</span>`)
    .join('<span class="dot">·</span> ');
}

function includeBlocks(model, common) {
  const fill = (line) =>
    line.replace("{access}", model.access).replace("{climate}", model.climate);
  return Object.entries(common.includes).map(([key, base]) => {
    const own = model.includes?.[key] ?? {};
    let lines =
      own.mode === "replace" ? own.lines : [...base.lines, ...(own.lines ?? [])];
    lines = lines.map(fill).map(esc);
    if (key === "equipamiento") {
      if (model.kitchen === null) lines.unshift(pendingMark("cocina, ¿lleva?"));
      else if (model.kitchen) lines.unshift(esc(model.kitchen));
    }
    return { title: own.title ?? base.title, lines };
  });
}

function logoLockup(src, width) {
  const cHeight = width * LOGO_C_RATIO;
  const subSize = cHeight / 6 / ARCHIVO_CAP;
  return `
    <div class="lockup" style="width:${width}px">
      <img src="${src}" alt="Crudo" style="width:${width}px;height:${width * LOGO_RATIO}px">
      <div class="sublockup" style="font-size:${subSize.toFixed(2)}px;margin-top:${(cHeight * 0.32).toFixed(1)}px">Arquitectura &amp; Concreto</div>
    </div>`;
}

const arrow = `<svg class="arrow" viewBox="0 0 40 24" aria-hidden="true"><path d="M0 12h36M26 2l10 10-10 10" fill="none" stroke="currentColor" stroke-width="4"/></svg>`;

const ref = () => `<div class="ref">Imagen referencial</div>`;

function draftLayer(pending) {
  if (!pending.length) return "";
  return `
    <div class="draft-band">Borrador · falta: ${esc(pending.join(" · "))}</div>
    <div class="draft-mark">Borrador</div>`;
}

export function renderProposal({ model, common, contact, assets, issuedAt, pending = [] }) {
  const payments = paymentSchedule(model.price_gs, common.payment_plan);
  const price = formatGs(model.price_gs);
  const waUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(model.whatsapp_text)}`;
  const draft = draftLayer(pending);
  const blocks = includeBlocks(model, common);
  const headline = `Hormigón armado. Lista en ${model.delivery.short}.`;
  const g = assets.gallery;

  const page = (cls, body) =>
    `<section class="page ${cls}">${body}${draft}</section>`;

  // 1 · Portada
  const cover = page(
    "dark cover",
    `
    <img class="cover-img" src="${assets.cover}" alt="">
    <div class="cover-logo">${logoLockup(assets.logo, 400)}</div>
    <div class="cover-text">
      <div class="kicker">Primera serie · Asunción</div>
      <h1 class="display model-name">${esc(model.name)}</h1>
      <div class="data-line">${dataLine(model)}</div>
      <p class="display headline">${esc(headline)}</p>
      <div class="cover-price">
        <span class="price">${price}</span>
        <span class="kicker">IVA incluido · precio cerrado</span>
      </div>
    </div>
    ${ref()}`,
  );

  // 2 · Así se vive
  const gallery = page(
    "light gallery",
    `
    <div class="kicker top">Así se vive · ${esc(model.name)}</div>
    <img class="g0" src="${g[0]}" alt="">
    <div class="g-row">
      <img class="g1" src="${g[1]}" alt="">
      <img class="g2" src="${g[2]}" alt="">
    </div>
    <p class="display phrase">${
      model.gallery_phrase ? esc(model.gallery_phrase) : pendingMark("frase")
    }</p>
    ${ref()}`,
  );

  // 3 · El plano
  const rooms = model.plan.rooms
    .map(
      (r, i) =>
        `<span class="marker" style="left:${(r.x * 100).toFixed(1)}%;top:${(r.y * 100).toFixed(1)}%">${i + 1}</span>`,
    )
    .join("");
  const legend = model.plan.rooms
    .map(
      (r, i) =>
        `<li><span class="num">0${i + 1}</span><span>${esc(r.label)}</span></li>`,
    )
    .join("");
  const dims =
    model.plan.dimensions == null
      ? `<p class="dims">${pendingMark("medidas del plano")}</p>`
      : `<ul class="dims">${model.plan.dimensions
          .map((d) => `<li><span>${esc(d.label)}</span><span class="tab">${esc(d.value)}</span></li>`)
          .join("")}</ul>`;
  const plan = page(
    "dark plan",
    `
    <div class="kicker top">El plano · ${esc(model.name)}</div>
    <h2 class="display plan-title">${formatNumber(model.area_m2)} <span class="unit">m²</span></h2>
    <div class="plan-row">
      <div class="plan-sheet">
        <div class="plan-img">
          <img src="${assets.plan}" alt="">
          ${rooms}
        </div>
      </div>
      <div class="plan-legend">
        <ul class="rooms">${legend}</ul>
        <div class="surface">
          <div class="kicker">Superficie total</div>
          <div class="big-data">${formatNumber(model.area_m2)} m²</div>
          ${dims}
        </div>
      </div>
    </div>
    ${ref()}`,
  );

  // 4 · Qué incluye
  const highlights = model.highlights?.length
    ? `<div class="highlights">
        <div class="kicker">Incluido en tu ${esc(model.name)}</div>
        ${model.highlights.map((h) => `<p>${esc(h)}</p>`).join("")}
      </div>`
    : "";
  const includes = page(
    "light includes",
    `
    <div class="kicker top">Qué incluye</div>
    <div class="includes-body">
    <h2 class="display section-title">Todo esto va en el precio.</h2>
    ${highlights}
    <div class="blocks">
      ${blocks
        .map(
          (b) => `
        <div class="block">
          <h3 class="block-title">${esc(b.title)}</h3>
          <div class="block-body">${b.lines.map((l) => `<p>${l}</p>`).join("")}</div>
        </div>`,
        )
        .join("")}
    </div>
    <p class="closing">Todo lo que no está acá es adicional, y lo cotizamos antes de ejecutarlo.</p>
    </div>`,
  );

  // 5 · Por qué hormigón armado
  const reasons = [
    [
      "Dura décadas",
      "Cada placa sale del molde, cura y se monta con la tolerancia del plano. Muros y fundaciones hechos para durar.",
    ],
    [
      "Fresca y silenciosa",
      "La masa del hormigón frena el calor del día y el ruido de afuera. Adentro, la temperatura cambia más despacio.",
    ],
    [
      "No arde ni se pudre",
      "El hormigón no se quema, aguanta la humedad y no le entran termitas ni plagas.",
    ],
  ];
  const concrete = page(
    "dark concrete",
    `
    <img class="workshop" src="${assets.workshop}" alt="">
    <div class="concrete-body">
      <div class="kicker">Por qué hormigón armado</div>
      <h2 class="display section-title">Diseñamos el molde. Fabricamos el panel. Levantamos la casa.</h2>
      <ol class="reasons">
        ${reasons
          .map(
            ([t, d], i) => `
          <li><span class="num">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`,
          )
          .join("")}
      </ol>
      <p class="series">${esc(model.name)} es parte de la primera serie de la marca: casas de hormigón armado con sistema propio.</p>
      <div class="touch">
        <div class="kicker">Tocalo en la oficina</div>
        <p>Las placas, los revestimientos y los cobogós están en Sucre para que los veas y los toques antes de decidir.</p>
      </div>
    </div>
    ${assets.workshopIsRender ? ref() : ""}`,
  );

  // 6 · Precio
  const extras = model.extras
    .map(
      (e) => `
      <li><span>${esc(e.name)}</span><span class="tab">${
        e.price_gs != null ? formatGs(e.price_gs) : esc(e.custom)
      }</span></li>`,
    )
    .join("");
  const pricing = page(
    "light pricing",
    `
    <div class="kicker top">Tu ${esc(model.name)}, cerrado</div>
    <div class="price-xl">${price}</div>
    <p class="price-sub"><strong>IVA incluido.</strong> Lo que ves es lo que pagás.</p>
    ${
      model.show_price_per_m2
        ? `<p class="ppm">${formatGs(pricePerM2(model.price_gs, model.area_m2))} por m²</p>`
        : ""
    }
    <div class="kicker sub">Cómo lo pagás</div>
    <table class="schedule">
      ${payments
        .map(
          (p) => `
        <tr>
          <td class="pct">${p.pct} %</td>
          <td class="ms"><strong>${esc(p.label)}</strong><span>${esc(p.milestone)}</span></td>
          <td class="amt">${formatGs(p.amount)}</td>
        </tr>`,
        )
        .join("")}
    </table>
    <p class="validity">Precio válido por ${common.valid_days} días, desde el ${formatDate(issuedAt)}.</p>
    <div class="kicker sub">No incluye</div>
    <ul class="plain">${common.not_included.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
    <div class="kicker sub">Sumale a tu Crudo</div>
    <ul class="extras">${extras}</ul>
    <p class="footnote">${esc(common.extras_footnote)}</p>`,
  );

  // 7 · Cómo seguimos
  const steps = [
    ["Nos vemos en la oficina", "Vení a Sucre: tocás las placas, recorrés el plano y resolvemos tus dudas."],
    ["Firmás y arrancamos", "Con la firma y el primer 40 % empezamos tu obra."],
    ["Obra", `${model.delivery.text.charAt(0).toUpperCase()}${model.delivery.text.slice(1)}.`],
    ["Entrega", "Te entregamos tu Crudo y arrancan 12 meses de postventa."],
  ];
  const hours = contact.office.hours
    ? esc(contact.office.hours)
    : pendingMark("horario");
  const next = page(
    "dark next",
    `
    <div class="kicker top">Cómo seguimos</div>
    <div class="next-body">
    <h2 class="display section-title">Armemos tu Crudo.</h2>
    <ol class="steps">
      ${steps
        .map(
          ([t, d], i) => `
        <li><span class="num">0${i + 1}</span><div><h3>${t}</h3><p>${esc(d)}</p></div></li>`,
        )
        .join("")}
    </ol>
    <div class="warranty">
      <div class="kicker">Tu garantía</div>
      <ul>${common.warranty.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
      <p class="note">${esc(common.warranty_note)}</p>
    </div>
    </div>
    <a class="button" href="${esc(waUrl)}">Armemos tu Crudo ${arrow}</a>
    <div class="office">
      <p><strong>Oficina:</strong> ${esc(contact.office.address)}, ${esc(contact.office.city)}.</p>
      <p><strong>Horario:</strong> ${hours}</p>
      <p class="links">
        <a href="${esc(contact.instagram.url)}">${esc(contact.instagram.handle)}</a>
        <span class="dot">·</span>
        <a href="${esc(contact.web.url)}">${esc(contact.web.domain)}</a>
        <span class="dot">·</span>
        <a href="${esc(waUrl)}">${esc(contact.whatsapp.display)}</a>
      </p>
    </div>`,
  );

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>${esc(model.name)} — Propuesta</title>
<style>${css(assets.fonts)}</style>
</head>
<body>
${cover}${gallery}${plan}${includes}${concrete}${pricing}${next}
</body>
</html>`;
}

function css(fonts) {
  const faces = Object.entries(fonts)
    .map(
      ([weight, src]) =>
        `@font-face { font-family: "Archivo"; src: url(${src}) format("woff2"); font-weight: ${weight}; font-style: normal; }`,
    )
    .join("\n");
  return `
${faces}
@page { size: ${PAGE.width}px ${PAGE.height}px; margin: 0; }
:root {
  --iron: #1A1A1A;
  --cement: #D2D1CD;
  --alabaster: #F5F5F3;
  --pad: 72px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--iron); }
body {
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
img { display: block; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
strong { font-weight: 600; }

.page {
  position: relative;
  width: ${PAGE.width}px;
  height: ${PAGE.height}px;
  overflow: hidden;
  break-after: page;
}
.page:last-child { break-after: auto; }
.dark { background: var(--iron); color: var(--alabaster); }
.light { background: var(--alabaster); color: var(--iron); }

.kicker {
  font-weight: 600;
  font-size: 26px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}
.kicker.top { position: absolute; top: 88px; left: var(--pad); right: var(--pad); }
.display {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.95;
}
.tab, .price, .price-xl, .big-data, .amt, .pct { font-variant-numeric: tabular-nums; }
.dot { margin: 0 0.45em; opacity: 0.6; }
.nb { white-space: nowrap; }
.arrow { display: inline-block; width: 40px; height: 24px; margin-left: 14px; vertical-align: 0.05em; }
.pending { background: var(--cement); color: var(--iron); font-weight: 600; padding: 0 0.2em; }

.ref {
  position: absolute;
  right: var(--pad);
  bottom: 28px;
  font-size: 16px;
  color: rgba(210, 209, 205, 0.5);
}

/* Borrador */
.draft-band {
  position: absolute; top: 0; left: 0; right: 0;
  padding: 10px var(--pad);
  background: var(--cement); color: var(--iron);
  font-size: 20px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  z-index: 20;
}
.draft-mark {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-58deg);
  font-weight: 900; font-size: 300px; letter-spacing: -0.02em; text-transform: uppercase;
  color: rgba(210, 209, 205, 0.32);
  white-space: nowrap; pointer-events: none; z-index: 19;
}
.light .draft-mark { color: rgba(26, 26, 26, 0.1); }

/* 1 · Portada */
.cover-img { position: absolute; top: 326px; left: 0; width: ${SLOTS.cover.width}px; height: ${SLOTS.cover.height}px; }
.cover-logo { position: absolute; top: 120px; left: 0; right: 0; display: flex; justify-content: center; }
.lockup { display: flex; flex-direction: column; align-items: center; }
.sublockup {
  font-weight: 600; letter-spacing: 0.42em; text-transform: uppercase; white-space: nowrap;
  margin-right: -0.42em; color: var(--alabaster);
}
.cover-text { position: absolute; left: var(--pad); right: var(--pad); bottom: 96px; }
.model-name { font-size: 168px; margin-top: 18px; white-space: nowrap; }
.data-line { font-weight: 500; font-size: 40px; line-height: 1.4; margin-top: 24px; font-variant-numeric: tabular-nums; }
.headline { font-size: 60px; line-height: 1; margin-top: 56px; max-width: 900px; }
.cover-price {
  display: flex; flex-direction: column; gap: 18px;
  margin-top: 52px; padding-top: 36px; border-top: 1px solid var(--cement);
}
.cover-price .price { font-weight: 900; font-size: 100px; letter-spacing: -0.03em; line-height: 1; }

/* 2 · Así se vive */
.gallery .g0 { position: absolute; top: 160px; left: 0; width: ${SLOTS.gallery[0].width}px; height: ${SLOTS.gallery[0].height}px; }
.gallery .g-row { position: absolute; top: ${160 + SLOTS.gallery[0].height + 16}px; left: 0; display: flex; gap: ${1080 - SLOTS.gallery[1].width - SLOTS.gallery[2].width}px; }
.gallery .g1 { width: ${SLOTS.gallery[1].width}px; height: ${SLOTS.gallery[1].height}px; }
.gallery .g2 { width: ${SLOTS.gallery[2].width}px; height: ${SLOTS.gallery[2].height}px; }
.phrase { position: absolute; left: var(--pad); right: var(--pad); bottom: 110px; font-size: 76px; }

/* 3 · Plano */
.plan-title { position: absolute; top: 150px; left: var(--pad); font-size: 150px; }
.plan-title .unit { text-transform: none; }
.plan-row { position: absolute; top: 340px; left: var(--pad); right: var(--pad); display: flex; gap: 36px; }
.plan-sheet { background: var(--alabaster); padding: 20px; flex: none; }
.plan-img { position: relative; width: ${SLOTS.plan.width}px; height: ${SLOTS.plan.height}px; }
.plan-img img { width: 100%; height: 100%; }
.marker {
  position: absolute; width: 52px; height: 52px; margin: -26px 0 0 -26px;
  background: var(--iron); color: var(--alabaster);
  font-weight: 600; font-size: 28px; line-height: 52px; text-align: center;
}
.plan-legend { display: flex; flex-direction: column; justify-content: space-between; flex: 1; }
.rooms li { display: flex; flex-direction: column; gap: 6px; padding: 24px 0; border-top: 1px solid rgba(210, 209, 205, 0.4); font-size: 32px; line-height: 1.25; }
.rooms .num, .reasons .num, .steps .num { font-weight: 600; font-size: 26px; letter-spacing: 0.08em; color: var(--cement); font-variant-numeric: tabular-nums; }
.surface { border-top: 1px solid rgba(210, 209, 205, 0.4); padding-top: 24px; }
.big-data { font-weight: 500; font-size: 56px; margin-top: 12px; }
.dims { margin-top: 20px; font-size: 28px; line-height: 1.5; }
.dims li { display: flex; justify-content: space-between; }

/* 4 · Qué incluye */
.section-title { font-size: 76px; }
.includes-body { position: absolute; top: 150px; left: var(--pad); right: var(--pad); }
.highlights { margin-top: 36px; background: var(--iron); color: var(--alabaster); padding: 28px 32px; }
.highlights p { font-size: 30px; line-height: 1.4; margin-top: 10px; font-weight: 500; }
.blocks { margin-top: 40px; }
.block { display: flex; gap: 28px; padding: 22px 0; border-top: 1px solid var(--cement); }
.block-title { flex: none; width: 250px; font-weight: 600; font-size: 24px; letter-spacing: 0.14em; text-transform: uppercase; line-height: 1.4; padding-top: 4px; }
.block-body p { font-size: 28px; line-height: 1.42; }
.block-body p + p { margin-top: 4px; }
.closing { font-weight: 500; font-size: 32px; line-height: 1.4; padding-top: 26px; border-top: 1px solid var(--iron); }

/* 5 · Hormigón */
.workshop { position: absolute; top: 0; left: 0; width: ${SLOTS.workshop.width}px; height: ${SLOTS.workshop.height}px; }
.concrete-body { position: absolute; top: ${SLOTS.workshop.height + 64}px; left: var(--pad); right: var(--pad); }
.concrete .section-title { font-size: 60px; margin-top: 24px; }
.reasons { margin-top: 40px; }
.reasons li, .steps li { display: flex; gap: 28px; padding: 22px 0; border-top: 1px solid rgba(210, 209, 205, 0.4); }
.reasons h3, .steps h3 { font-weight: 600; font-size: 32px; line-height: 1.3; }
.reasons p, .steps p { font-size: 28px; line-height: 1.5; margin-top: 4px; }
.reasons .num, .steps .num { padding-top: 4px; flex: none; }
.series { font-size: 28px; line-height: 1.5; margin-top: 12px; padding-top: 22px; border-top: 1px solid rgba(210, 209, 205, 0.4); }
.touch { margin-top: 36px; background: var(--alabaster); color: var(--iron); padding: 30px 32px; }
.touch p { font-size: 30px; line-height: 1.45; margin-top: 12px; font-weight: 500; }

/* 6 · Precio */
.price-xl { position: relative; margin: 150px var(--pad) 0; font-weight: 900; font-size: 116px; letter-spacing: -0.035em; line-height: 1; white-space: nowrap; }
.pricing > p, .pricing > .kicker.sub, .pricing > table, .pricing > ul { margin-left: var(--pad); margin-right: var(--pad); }
.price-sub { font-size: 34px; margin-top: 20px; }
.ppm { font-size: 28px; margin-top: 8px; font-weight: 500; opacity: 0.7; font-variant-numeric: tabular-nums; }
.kicker.sub { margin-top: 52px; margin-bottom: 14px; font-size: 24px; }
.schedule { width: calc(100% - 2 * var(--pad)); border-collapse: collapse; }
.schedule td { border-top: 1px solid var(--cement); padding: 20px 0; vertical-align: top; }
.schedule tr:last-child td { border-bottom: 1px solid var(--cement); }
.schedule .pct { width: 130px; font-weight: 900; font-size: 44px; letter-spacing: -0.02em; line-height: 1; }
.schedule .ms { padding-right: 20px; }
.schedule .ms strong { display: block; font-size: 30px; line-height: 1.2; }
.schedule .ms span { display: block; font-size: 28px; line-height: 1.35; margin-top: 4px; }
.schedule .amt { text-align: right; white-space: nowrap; font-weight: 500; font-size: 40px; line-height: 1; }
.validity { font-weight: 600; font-size: 30px; margin-top: 24px; }
.plain li { font-size: 28px; line-height: 1.5; }
.plain li::before, .warranty li::before { content: "— "; }
.extras li { display: flex; justify-content: space-between; gap: 24px; font-size: 28px; line-height: 1.3; padding: 14px 0; border-top: 1px solid var(--cement); }
.extras li:last-child { border-bottom: 1px solid var(--cement); }
.extras .tab { white-space: nowrap; font-weight: 500; text-align: right; }
.footnote { font-size: 28px; margin-top: 18px; opacity: 0.7; }

/* 7 · Cómo seguimos */
.next-body { position: absolute; top: 150px; left: var(--pad); right: var(--pad); }
.next .section-title { font-size: 96px; }
.steps { margin-top: 48px; }
.warranty { margin-top: 56px; }
.warranty ul { margin-top: 18px; }
.warranty li { font-size: 30px; line-height: 1.45; font-weight: 500; }
.warranty li + li { margin-top: 6px; }
.warranty .note { font-size: 28px; line-height: 1.45; margin-top: 16px; opacity: 0.7; }
.button {
  position: absolute; left: var(--pad); right: var(--pad); top: 1440px;
  display: block; background: var(--alabaster); color: var(--iron);
  font-weight: 900; font-size: 44px; letter-spacing: -0.01em; text-transform: uppercase;
  text-align: center; padding: 40px 0;
}
.office { position: absolute; left: var(--pad); right: var(--pad); top: 1630px; font-size: 28px; line-height: 1.5; }
.office .links { margin-top: 10px; opacity: 0.8; }
`;
}
