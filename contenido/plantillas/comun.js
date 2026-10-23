// Utilidades compartidas por las plantillas. El script de exportación llama
// a window.render(datos) con la pieza ya resuelta (textos sin marcadores).

// Elemento con clase, texto y marca de control para el verificador:
// data-texto = texto visible (se mide contraste y zonas seguras),
// data-sobre-imagen = el texto va apoyado sobre un render.
function el(tag, cls, texto, attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (texto != null) {
    // "m²" no pasa a mayúsculas aunque el estilo sea en caja alta
    texto.split("m²").forEach((parte, i) => {
      if (i > 0) {
        const u = document.createElement("span");
        u.textContent = "m²";
        u.style.textTransform = "none";
        e.appendChild(u);
      }
      e.appendChild(document.createTextNode(parte));
    });
    e.dataset.texto = "";
  }
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

function foto(src, encuadre, estilo, filtro) {
  const box = el("div", "foto");
  Object.assign(box.style, estilo);
  const img = document.createElement("img");
  img.src = "../renders-aprobados/" + src;
  img.style.objectPosition = encuadre || "50% 50%";
  if (filtro) img.style.filter = filtro;
  box.appendChild(img);
  return box;
}

function capa(estilo) {
  const d = document.createElement("div");
  d.style.position = "absolute";
  Object.assign(d.style, estilo);
  return d;
}

function logo(anchoCss) {
  const img = el("img", "logo", null, {
    src: "../../public/logo/crudo-wordmark-alabaster.png",
    alt: "Crudo",
    "data-logo": "",
  });
  img.style.width = anchoCss + "px";
  return img;
}

// Pila anclada abajo a la izquierda: los hijos se apilan de arriba a abajo.
function pila(estilo) {
  const d = capa(estilo);
  d.style.display = "flex";
  d.style.flexDirection = "column";
  d.style.alignItems = "flex-start";
  return d;
}

// Separación vertical igual a la zona de seguridad del logo (altura de la C
// ≈ 0,9 × alto del wordmark), para que ningún elemento entre en ella.
function respiroLogo(anchoLogo) {
  const alto = anchoLogo * (205 / 687);
  return capa({ position: "static", height: Math.ceil(alto * 0.9) + "px", width: "1px" });
}

function esperarImagenes() {
  const imgs = [...document.images];
  return Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = r; i.onerror = r; }))))
    .then(() => document.fonts.ready);
}
