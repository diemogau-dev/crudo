---
name: propuesta-crudo
description: Crear, actualizar o personalizar las propuestas comerciales en PDF de CRUDO (Crudo 0X - Propuesta.pdf). Usar cuando Diego pida una propuesta, presupuesto o PDF de una tipología, una versión a nombre de un cliente, un CRUDO nuevo (05, 06…), o cambiar precios, textos o fotos de las propuestas.
---

# Propuestas comerciales de CRUDO

La plantilla aprobada vive en `contenido/propuestas/`. Leé primero
`contenido/propuestas/README.md`: ahí está cómo se edita `datos.json`, cómo se
agrega un CRUDO nuevo y qué tamaño lleva cada foto.

## Pasos

1. Precio: sale de la planilla «Presupuesto CRUDO 0X.xlsx» de Drive, celda
   «Construcción vivienda» (descargá el archivo y leelo con openpyxl,
   `data_only=True`; la lectura directa de Drive da `#NAME?` por los rangos con
   nombre). Redondeá hacia arriba a 100.000 Gs. Tiene que ser el mismo en
   `contenido/propuestas/datos.json`, `lib/content.ts` y
   `contenido/datos/modelos.json`.
2. Editá `contenido/propuestas/datos.json` (textos comunes en `comun`, cada
   tipología en `crudos`). El diseño está en `propuesta.html` y
   `propuesta.css`; no lo cambies si no lo piden.
3. Exportá desde `contenido/propuestas`:
   - genéricas: `python exportar.py` (o `python exportar.py 03`)
   - a nombre de un cliente: `python exportar.py 03 --cliente "Nombre Apellido"`
4. Revisá cada página renderizada (`pdftoppm -r 60 -png`) antes de entregar, y
   buscá en el texto (`pdftotext`) que no quede «Imagen referencial»,
   «celosía», «bidet», tamaños de piezas ni precios viejos.
5. Entregá los PDF de `salidas/` y anotá el cambio en
   `context/crudo/decisiones-y-preguntas.md`.

## Reglas

Las de `AGENTS.md`, y además: especificaciones de material sí (vidrio de
8 mm, pilares de 10 mm, 80 L, BTU), tamaños de piezas o ambientes no; la
financiación se nombra como «alianzas bancarias, vía AFD, hasta 27 años», sin
bancos ni tasas; títulos aspiracionales y cortos (diseño, calidad, descanso,
comodidad), no técnicos.
