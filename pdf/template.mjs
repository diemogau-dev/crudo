// Plantilla de la propuesta comercial (7 páginas de 1080 × 1920 px).
// Es una función pura: recibe datos ya resueltos y devuelve HTML. El build
// (pdf/build.mjs) prepara imágenes, fuentes y logo; un futuro ERP puede llamar
// a renderProposal con sus propios datos y reutilizar el mismo diseño.
//
// Diseño según el Manual de Marca (context/crudo/manual-de-marca.html): la
// portada sigue la ficha técnica de la sección 06, paleta cerrada de tres
// tintas, Archivo en todo el sistema, sin sombras ni esquinas redondeadas.

export const PAGE = { width: 1080, height: 1920 };

// Cajas de imagen que usa la plantilla. El build recorta cada render a estas
// proporciones antes de embeberlo. El plano se ajusta dentro de su caja
// máxima respetando la proporción del dibujo.
export const SLOTS = {
  cover: { width: 1080, height: 740 },
  gallery: [
    { width: 1080, height: 520 },
    { width: 652, height: 700 },
    { width: 412, height: 700 },
  ],
  planMax: { width: 600, height: 1440 },
  workshop: { width: 1080, height: 600 },
};

// Wordmark oficial (public/logo/crudo-wordmark.svg): viewBox 0 -30 2540 760.
const WORD_VIEWBOX = "0 -30 2540 760";
const WORD_RATIO = 760 / 2540;

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

// Precio de venta: precio de la planilla más el margen de imprevistos,
// redondeado a la unidad indicada (hoy +5 %, a los Gs 100.000 más cercanos).
export function salePrice(model, common) {
  const raw = model.price_gs * (1 + (common.contingency_pct ?? 0) / 100);
  const unit = common.price_rounding_gs ?? 1;
  return Math.round(raw / unit) * unit;
}

// Superficie como se comunica: en m² enteros.
export const displayArea = (model) => Math.round(model.area_m2);

export function pricePerM2(price, area) {
  return Math.round(price / area / 1000) * 1000;
}

const pendingMark = (label) =>
  `<span class="pending">[PENDIENTE: ${esc(label)}]</span>`;

const arrow = `<svg class="arrow" viewBox="0 0 40 24" aria-hidden="true"><path d="M0 12h36M26 2l10 10-10 10" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`;

function wordmark(paths, width) {
  return `<svg class="wordmark" viewBox="${WORD_VIEWBOX}" style="width:${width}px;height:${(width * WORD_RATIO).toFixed(2)}px" role="img" aria-label="Crudo"><g fill="currentColor" fill-rule="evenodd">${paths}</g></svg>`;
}

// Filas de la ficha de portada: dormitorios, baños, rasgo propio y deck.
function facts(model) {
  const rows = [];
  rows.push(
    model.bedrooms == null
      ? ["Dormitorios", pendingMark("dormitorios")]
      : [model.bedrooms === 1 ? "Dormitorio" : "Dormitorios", model.bedrooms],
  );
  rows.push(
    model.bathrooms == null
      ? ["Baños", pendingMark("baños")]
      : [model.bathrooms === 1 ? "Baño" : "Baños", model.bathrooms],
  );
  if (model.feature) rows.push([esc(model.feature.label), esc(model.feature.value)]);
  if (model.deck == null) rows.push(["Deck", pendingMark("deck")]);
  else if (model.deck) rows.push(["Deck exterior", "Incluido"]);
  return rows;
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
      if (model.kitchen === null) lines.unshift(pendingMark("cocina"));
      else if (model.kitchen) lines.unshift(esc(model.kitchen));
    }
    return { title: own.title ?? base.title, lines };
  });
}

const kicker = (n, label) =>
  `<div class="kicker"><span class="kn">${n}</span><i class="rule"></i>${label}</div>`;

function draftLayer(pending) {
  if (!pending.length) return "";
  return `
    <div class="draft-band">Borrador · falta: ${esc(pending.join(" · "))}</div>
    <div class="draft-mark">Borrador</div>`;
}

export function renderProposal({ model, common, contact, assets, issuedAt, pending = [] }) {
  const sale = salePrice(model, common);
  const price = formatGs(sale);
  const waUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(model.whatsapp_text)}`;
  const draft = draftLayer(pending);
  const blocks = includeBlocks(model, common);
  const area = `${formatNumber(displayArea(model))} m²`;
  const g = assets.gallery;
  const W = assets.wordmark;
  const note = model.render_note ? ` · ${esc(model.render_note)}` : "";

  // Pie: firma con el wordmark y, si hay renders, la línea de imagen referencial.
  const footer = (renders) => `
    <footer class="foot">
      ${wordmark(W, 112)}
      ${renders ? `<span class="ref">Imagen referencial</span>` : ""}
    </footer>`;

  const page = (cls, body) =>
    `<section class="page ${cls}">${body}${draft}</section>`;

  // 1 · Portada: ficha técnica de la sección 06 del manual.
  const cover = page(
    "light cover",
    `
    <header class="cover-head">
      ${wordmark(W, 210)}
      <div class="cover-tag">Propuesta comercial<br>Asunción · ${issuedAt.getFullYear()}</div>
    </header>
    <img class="cover-img" src="${assets.cover}" alt="">
    <div class="cover-body">
      <div class="name-row">
        <h1 class="display model-name">${esc(model.name)}</h1>
        <span class="area">${area}</span>
      </div>
      <p class="headline">Hormigón armado. Lista en ${esc(model.delivery.short)}.</p>
      <dl class="facts">
        ${facts(model)
          .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
          .join("")}
      </dl>
      <div class="boxes">
        <div class="box">
          <div class="label">Precio cerrado</div>
          <div class="box-value">${price}</div>
          <div class="box-sub">IVA incluido</div>
        </div>
        <div class="box">
          <div class="label">Entrega</div>
          <div class="box-value">${esc(model.delivery.short)}</div>
          <div class="box-sub">desde la palada inicial</div>
        </div>
      </div>
      <a class="cta-bar" href="${esc(waUrl)}"><span>Armemos tu Crudo</span>${arrow}</a>
    </div>
    <span class="ref cover-ref">Imagen referencial${note}</span>`,
  );

  // 2 · Así se vive
  const gallery = page(
    "dark gallery",
    `
    ${kicker("02", "Así se vive por dentro")}
    <img class="g0" src="${g[0]}" alt="">
    <div class="g-row">
      <img class="g1" src="${g[1]}" alt="">
      <img class="g2" src="${g[2]}" alt="">
    </div>
    <div class="gallery-text">
      <p class="display phrase">${
        model.gallery_phrase ? esc(model.gallery_phrase) : pendingMark("frase")
      }</p>
      ${model.render_note ? `<p class="caption">${esc(model.render_note)}</p>` : ""}
    </div>
    ${footer(true)}`,
  );

  // 3 · El plano
  const markers = assets.planMarkers
    .map(
      (m, i) =>
        `<span class="marker" style="left:${(m.x * 100).toFixed(2)}%;top:${(m.y * 100).toFixed(2)}%">${i + 1}</span>`,
    )
    .join("");
  const plan = page(
    "light plan",
    `
    ${kicker("03", "El plano")}
    <div class="plan-row">
      <div class="plan-img" style="width:${assets.planBox.width}px;height:${assets.planBox.height}px">
        <img src="${assets.plan}" alt="">
        ${markers}
      </div>
      <div class="plan-side">
        <div>
          <div class="label">Superficie</div>
          <div class="big-data">${area}</div>
        </div>
        <ol class="rooms">
          ${model.plan.rooms
            .map((r, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(r.label)}</span></li>`)
            .join("")}
        </ol>
      </div>
    </div>
    ${footer(true)}`,
  );

  // 4 · Qué incluye
  const highlights = model.highlights?.length
    ? `<div class="highlights">
        <div class="label">Incluido en tu ${esc(model.name)}</div>
        ${model.highlights.map((h) => `<p>${esc(h)}</p>`).join("")}
      </div>`
    : "";
  const includes = page(
    "dark includes",
    `
    ${kicker("04", "Qué incluye")}
    <div class="flow">
      <h2 class="display h2">Todo esto va en el precio.</h2>
      ${highlights}
      <div class="blocks">
        ${blocks
          .map(
            (b) => `
          <div class="block">
            <h3 class="label block-title">${esc(b.title)}</h3>
            <div class="block-body">${b.lines.map((l) => `<p>${l}</p>`).join("")}</div>
          </div>`,
          )
          .join("")}
      </div>
      <p class="closing">Todo lo que no está acá es adicional, y lo cotizamos antes de ejecutarlo.</p>
    </div>
    ${footer(false)}`,
  );

  // 5 · Por qué hormigón armado
  const reasons = [
    [
      "Hecha para durar",
      "Cada placa sale de nuestra fábrica, curada por expertos, y se monta exactamente según planos y diseño. Muros, revestimientos y fundaciones pensados para durar décadas.",
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
    "light concrete",
    `
    <img class="workshop" src="${assets.workshop}" alt="">
    <div class="concrete-body">
      ${kicker("05", "Por qué hormigón armado")}
      <h2 class="display h2">Diseñamos la casa. Fabricamos los muros de hormigón armado. Construimos tu hogar.</h2>
      <ol class="list">
        ${reasons
          .map(
            ([t, d], i) => `
          <li><span class="num">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`,
          )
          .join("")}
      </ol>
      <p class="series">${esc(model.name)} es parte de la primera serie de la marca: casas de hormigón armado con sistema propio.</p>
      <div class="touch">
        <div class="label">Pasá a conocernos en la oficina</div>
        <p>Te esperamos sobre Sucre, en Asunción, para que conozcas nuestro sistema y la solidez de nuestros productos: placas, revestimientos, cobogós, bachas y más.</p>
      </div>
    </div>
    ${footer(assets.workshopIsRender)}`,
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
    "dark pricing",
    `
    ${kicker("06", `Tu ${esc(model.name)}, cerrado`)}
    <div class="flow">
      <div class="price-xl">${price}</div>
      <p class="price-sub"><strong>IVA incluido.</strong> Lo que ves es lo que pagás.</p>
      ${
        model.show_price_per_m2
          ? `<p class="ppm">${formatGs(pricePerM2(sale, displayArea(model)))} por m²</p>`
          : ""
      }
      <div class="label sub">Cómo lo pagás</div>
      <table class="schedule">
        ${common.payment_plan
          .map(
            (p) => `
          <tr>
            <td class="pct">${p.pct} %</td>
            <td class="ms"><strong>${esc(p.label)}</strong><span>${esc(p.milestone)}</span></td>
          </tr>`,
          )
          .join("")}
      </table>
      <p class="validity">Precio válido por ${common.valid_days} días, desde el ${formatDate(issuedAt)}.</p>
      <p class="ready">Estamos listos para empezar tu obra de inmediato.</p>
      <div class="label sub">No incluye</div>
      <ul class="plain">${common.not_included.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
      <div class="label sub">Sumale a tu Crudo</div>
      <ul class="extras">${extras}</ul>
      <p class="footnote">${esc(common.extras_footnote)}</p>
    </div>
    ${footer(false)}`,
  );

  // 7 · Cómo seguimos
  const steps = [
    ["Vení a conocernos", "Te esperamos en la oficina de Sucre para mostrarte el sistema y resolver tus dudas."],
    ["Conocemos tu terreno", "Lo vemos con vos para ubicar tu Crudo y planificar la obra."],
    ["Definimos el diseño de tu Crudo", "Ajustamos juntos el diseño y los adicionales que quieras sumar, con precio cerrado."],
    ["Firmamos y arrancamos", `Estamos listos para empezar de inmediato: con la firma y la entrega inicial del 40 % arrancamos, y tu casa queda lista en ${model.delivery.text}.`],
  ];
  const hours = contact.office.hours ? `${esc(contact.office.hours)}.` : pendingMark("horario");
  const next = page(
    "light next",
    `
    ${kicker("07", "Cómo seguimos")}
    <div class="flow">
      <h2 class="display h2">Armemos tu Crudo.</h2>
      <ol class="list steps">
        ${steps
          .map(
            ([t, d], i) => `
          <li><span class="num">0${i + 1}</span><div><h3>${t}</h3><p>${esc(d)}</p></div></li>`,
          )
          .join("")}
      </ol>
      <div class="warranty">
        <div class="label">Tu garantía</div>
        <ul>${common.warranty.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
        <p class="note">${esc(common.warranty_note)}</p>
      </div>
    </div>
    <div class="next-bottom">
      <a class="button" href="${esc(waUrl)}"><span>Armemos tu Crudo</span>${arrow}</a>
      <div class="office">
        <p><strong>Oficina:</strong> ${esc(contact.office.address)}, ${esc(contact.office.city)}.</p>
        <p><strong>Horario:</strong> ${hours}</p>
        <p class="links">
          <a href="${esc(contact.instagram.url)}">${esc(contact.instagram.handle)}</a><span class="dot">·</span><a href="${esc(contact.web.url)}">${esc(contact.web.domain)}</a><span class="dot">·</span><a href="${esc(waUrl)}">${esc(contact.whatsapp.display)}</a>
        </p>
      </div>
    </div>
    ${footer(false)}`,
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
  font-size: 28px;
  line-height: 1.6;
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
.dark { background: var(--iron); color: var(--alabaster); --line: rgba(210, 209, 205, 0.32); --muted: rgba(245, 245, 243, 0.66); }
.light { background: var(--alabaster); color: var(--iron); --line: var(--cement); --muted: rgba(26, 26, 26, 0.62); }

/* Tipografía del manual: etiqueta Semibold 600 con tracking 0.28 em,
   display Black 900 en mayúsculas a −0.03 em, titular ExtraBold 800 a
   −0.02 em, cuerpo Regular, datos Medium tabular. Escalada a 1080 px para
   leerse en el celular. */
.label {
  font-weight: 600;
  font-size: 21px;
  line-height: 1.3;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}
.kicker {
  position: absolute; top: 76px; left: var(--pad); right: var(--pad);
  display: flex; align-items: center;
  font-weight: 600; font-size: 21px; line-height: 1.3; letter-spacing: 0.28em; text-transform: uppercase;
}
.kicker .kn { color: var(--muted); letter-spacing: 0.1em; }
.kicker .rule { display: inline-block; width: 44px; height: 1px; background: currentColor; opacity: 0.5; margin: 0 20px; }
.display {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.98;
}
.h2 { font-size: 56px; }
.tab, .big-data, .amt, .pct, .price-xl, .box-value, .area, dd { font-variant-numeric: tabular-nums; }
.dot { margin: 0 0.5em; opacity: 0.5; }
.arrow { display: inline-block; width: 34px; height: 20px; flex: none; }
.pending { background: var(--cement); color: var(--iron); font-weight: 600; padding: 0 0.2em; }
.flow { position: absolute; top: 150px; left: var(--pad); right: var(--pad); }

.foot {
  position: absolute; left: var(--pad); right: var(--pad); bottom: 52px;
  display: flex; justify-content: space-between; align-items: flex-end;
}
.ref {
  font-size: 16px; line-height: 1;
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

/* 1 · Portada (ficha) */
.cover-head {
  position: absolute; top: 72px; left: var(--pad); right: var(--pad);
  display: flex; justify-content: space-between; align-items: flex-start;
}
.cover-tag { font-weight: 600; font-size: 19px; line-height: 1.6; letter-spacing: 0.28em; text-transform: uppercase; text-align: right; color: var(--muted); }
.cover-img { position: absolute; top: 200px; left: 0; width: ${SLOTS.cover.width}px; height: ${SLOTS.cover.height}px; }
.cover-body { position: absolute; top: ${200 + SLOTS.cover.height + 44}px; left: var(--pad); right: var(--pad); }
.name-row { display: flex; justify-content: space-between; align-items: baseline; }
.model-name { font-size: 104px; }
.area { font-weight: 500; font-size: 52px; }
.headline { font-weight: 800; font-size: 36px; letter-spacing: -0.02em; line-height: 1.2; text-transform: uppercase; margin-top: 18px; }
.facts { margin-top: 30px; border-top: 1px solid var(--line); }
.facts div { display: flex; justify-content: space-between; align-items: baseline; padding: 13px 0; border-bottom: 1px solid var(--line); }
.facts dt { font-size: 28px; }
.facts dd { font-weight: 500; font-size: 30px; }
.boxes { display: flex; gap: 20px; margin-top: 32px; }
.box { flex: 1; border: 1px solid var(--line); padding: 22px 24px 20px; }
.box-value { font-weight: 500; font-size: 42px; line-height: 1.1; margin-top: 12px; white-space: nowrap; letter-spacing: -0.01em; }
.box-sub { font-size: 24px; margin-top: 4px; color: var(--muted); }
.cta-bar {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 32px; padding: 30px 32px;
  background: var(--iron); color: var(--alabaster);
  font-weight: 600; font-size: 24px; letter-spacing: 0.28em; text-transform: uppercase;
}
.cover-ref { position: absolute; right: var(--pad); bottom: 40px; color: rgba(26, 26, 26, 0.4); }

/* 2 · Así se vive */
.gallery .g0 { position: absolute; top: 150px; left: 0; width: ${SLOTS.gallery[0].width}px; height: ${SLOTS.gallery[0].height}px; }
.gallery .g-row { position: absolute; top: ${150 + SLOTS.gallery[0].height + 16}px; left: 0; display: flex; gap: 16px; }
.gallery .g1 { width: ${SLOTS.gallery[1].width}px; height: ${SLOTS.gallery[1].height}px; }
.gallery .g2 { width: ${SLOTS.gallery[2].width}px; height: ${SLOTS.gallery[2].height}px; }
.gallery-text { position: absolute; left: var(--pad); right: var(--pad); top: ${150 + SLOTS.gallery[0].height + 16 + SLOTS.gallery[1].height + 64}px; }
.phrase { font-size: 52px; max-width: 900px; }
.caption { font-size: 24px; margin-top: 24px; color: var(--muted); }

/* 3 · Plano */
.plan-row { position: absolute; top: 150px; left: var(--pad); right: var(--pad); bottom: 140px; display: flex; gap: 48px; align-items: flex-start; }
.plan-img { position: relative; flex: none; }
.plan-img img { width: 100%; height: 100%; }
.marker {
  position: absolute; width: 46px; height: 46px; margin: -23px 0 0 -23px;
  background: var(--iron); color: var(--alabaster);
  font-weight: 600; font-size: 24px; line-height: 46px; text-align: center;
  font-variant-numeric: tabular-nums;
}
.plan-side { flex: 1; align-self: stretch; display: flex; flex-direction: column; }
.big-data { font-weight: 500; font-size: 56px; line-height: 1.1; margin-top: 10px; }
.rooms { margin-top: 40px; border-top: 1px solid var(--line); }
.rooms li { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 28px; line-height: 1.3; }
.rooms .num, .list .num { font-weight: 600; font-size: 21px; letter-spacing: 0.1em; color: var(--muted); padding-top: 5px; flex: none; font-variant-numeric: tabular-nums; }

/* 4 · Qué incluye */
.highlights { margin-top: 28px; background: var(--alabaster); color: var(--iron); padding: 26px 30px; }
.highlights p { font-weight: 500; font-size: 28px; line-height: 1.38; margin-top: 8px; }
.blocks { margin-top: 28px; }
.block { display: flex; gap: 28px; padding: 16px 0; border-top: 1px solid var(--line); }
.block-title { flex: none; width: 236px; font-size: 19px; letter-spacing: 0.2em; padding-top: 6px; }
.block-body p { font-size: 28px; line-height: 1.4; }
.block-body p + p { margin-top: 2px; }
.closing { font-weight: 500; font-size: 28px; line-height: 1.4; padding-top: 18px; border-top: 1px solid var(--line); }

/* 5 · Hormigón */
.workshop { position: absolute; top: 0; left: 0; width: ${SLOTS.workshop.width}px; height: ${SLOTS.workshop.height}px; }
.concrete .kicker { position: static; }
.concrete-body { position: absolute; top: ${SLOTS.workshop.height + 60}px; left: var(--pad); right: var(--pad); }
.concrete .h2 { font-size: 48px; margin-top: 28px; }
.list { margin-top: 32px; }
.list li { display: flex; gap: 24px; padding: 18px 0; border-top: 1px solid var(--line); }
.list h3 { font-weight: 600; font-size: 30px; line-height: 1.3; }
.list p { font-size: 28px; line-height: 1.45; margin-top: 4px; }
.series { font-size: 28px; line-height: 1.45; padding-top: 18px; border-top: 1px solid var(--line); }
.touch { margin-top: 28px; background: var(--iron); color: var(--alabaster); padding: 26px 30px; }
.touch p { font-weight: 500; font-size: 28px; line-height: 1.45; margin-top: 10px; }

/* 6 · Precio */
.price-xl { font-weight: 900; font-size: 88px; letter-spacing: -0.03em; line-height: 1; white-space: nowrap; }
.price-sub { font-size: 30px; margin-top: 18px; }
.ppm { font-weight: 500; font-size: 26px; margin-top: 4px; color: var(--muted); font-variant-numeric: tabular-nums; }
.label.sub { margin-top: 44px; margin-bottom: 14px; }
.schedule { width: 100%; border-collapse: collapse; }
.schedule td { border-top: 1px solid var(--line); padding: 18px 0; vertical-align: top; }
.schedule tr:last-child td { border-bottom: 1px solid var(--line); }
.schedule .pct { width: 140px; font-weight: 500; font-size: 44px; line-height: 1; }
.schedule .ms { padding-right: 0; }
.schedule .ms strong { display: block; font-size: 28px; line-height: 1.2; }
.schedule .ms span { display: block; font-size: 26px; line-height: 1.35; margin-top: 4px; color: var(--muted); }
.validity { font-weight: 600; font-size: 28px; margin-top: 22px; }
.ready { font-size: 28px; margin-top: 4px; }
.plain li { font-size: 28px; line-height: 1.5; }
.plain li::before, .warranty li::before { content: "— "; }
.extras li { display: flex; justify-content: space-between; gap: 24px; font-size: 28px; line-height: 1.3; padding: 12px 0; border-top: 1px solid var(--line); }
.extras li:last-child { border-bottom: 1px solid var(--line); }
.extras .tab { white-space: nowrap; font-weight: 500; text-align: right; }
.footnote { font-size: 26px; margin-top: 16px; color: var(--muted); }

/* 7 · Cómo seguimos */
.steps { margin-top: 36px; }
.warranty { margin-top: 44px; }
.warranty ul { margin-top: 16px; }
.warranty li { font-weight: 500; font-size: 28px; line-height: 1.45; }
.warranty li + li { margin-top: 6px; }
.warranty .note { font-size: 26px; line-height: 1.45; margin-top: 14px; color: var(--muted); }
.next-bottom { position: absolute; left: var(--pad); right: var(--pad); bottom: 140px; }
.button {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--iron); color: var(--alabaster);
  font-weight: 600; font-size: 26px; letter-spacing: 0.28em; text-transform: uppercase;
  padding: 34px 36px;
}
.office { margin-top: 32px; font-size: 28px; line-height: 1.5; }
.office .links { margin-top: 8px; color: var(--muted); }
`;
}
