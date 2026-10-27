# Propuestas comerciales (PDF)

Las cuatro propuestas de CRUDO, reconstruidas como plantilla a partir de los PDF
aprobados del 21/10/2026 (mismo diseño, medidas y tipografía).

```
datos.json        textos, precios, fotos y plano de cada CRUDO (lo que se edita)
propuesta.html    plantilla de las 8 páginas (Jinja2)
propuesta.css     estilos, en px de un lienzo de 1080 × 1920
logo.svg          logo vectorial (sale del PDF aprobado)
fuentes/          Archivo en pesos estáticos 400–900, para que el PDF lleve TrueType
imagenes/         fotos ya recortadas por CRUDO y foto de taller
salidas/          los PDF listos para Drive: «Crudo 0X - Propuesta.pdf»
exportar.py       arma e imprime los PDF con Chromium
```

## Cambiar un precio o un texto

1. Editá `datos.json`. Los precios tienen que coincidir con `lib/content.ts`.
2. Exportá: `python exportar.py` (o `python exportar.py 03` para uno solo).

Requisitos: Python 3 con `jinja2`, `playwright` y `pypdf`, y Chromium (en este
entorno, en `/opt/pw-browsers`; si cambia, ajustá `CHROMIUM` en `exportar.py`).

## Fotos

Las de `imagenes/crudo-0X/` son los recortes de los PDF aprobados, salvo
`crudo-02/mas-1.jpg` (fachada con cobogós, de `renders-aprobados/crudo-02/crudo-2-a.jpg`)
y `crudo-04/mas-1.jpg` (vista lateral con quincho, de `renders-aprobados/crudo-04/crudo-4-b.jpg`),
recortadas a 2160 × 1640 para el hueco grande de la página 3. La portada de CRUDO 03
(`crudo-03/portada.jpg`) es `public/images/renders/crudo-3/crudo-3-g.jpg`, recortada a 1080 × 960.
