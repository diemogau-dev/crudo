# Propuestas comerciales en PDF

Una propuesta de 7 páginas (1080 × 1920 px) por tipología, para mandar por WhatsApp.

```bash
npm run build:pdf                 # todas las tipologías con renders cargados
npm run build:pdf -- crudo-01     # una sola
npm run build:pdf:release         # falla si queda algún dato [PENDIENTE]
ISSUED_AT=2026-10-20 npm run build:pdf   # fecha desde la que corren los 15 días
```

- Datos: `data/models.json` (tipologías) y `data/contact.json` (oficina, redes, WhatsApp).
  Un dato en `null` deja el PDF en **BORRADOR** (marca de agua y franja con lo que falta).
  Los renders se eligen por modelo en `images` (`focus` centra el recorte, `trim` corta bordes);
  el plano es la planta del álbum, con los ambientes marcados en `plan.rooms` (píxeles del archivo original).
- Diseño: Manual de Marca (`context/crudo/manual-de-marca.html`). La portada es la ficha técnica
  de la sección 06; el wordmark sale de `public/logo/crudo-wordmark.svg`.
- Plantilla: `pdf/template.mjs`, función pura `renderProposal()` que recibe datos y devuelve HTML.
- Build: `pdf/build.mjs` recorta y comprime los renders (sin metadatos), embebe Archivo,
  imprime con Chromium, limpia los metadatos del PDF y corre el QA (7 páginas, < 6 MB,
  pagos que suman, link de WhatsApp, nada cortado ni pisado sobre el pie, palabras prohibidas
  vía `pdftotext`).
- Salida: `pdf/out/Crudo-0X.pdf`. Páginas rasterizadas para revisar: `pdf/.cache/qa/`.

Requiere `pdftotext`, `pdfinfo` y `pdftoppm` (poppler-utils).
