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

## Propuesta a nombre de un cliente

```bash
python exportar.py 03 --cliente "María González"
```

La portada dice «Propuesta para María González · fecha de hoy» y la página de
precio, «Precio válido por 15 días, hasta el …». Queda en `salidas/clientes/`,
que no se sube al repo (tiene datos de clientes).

## Agregar un CRUDO nuevo (05, 06…)

1. **Fotos** en `imagenes/crudo-05/`, ya recortadas al tamaño del hueco (o más
   grandes en la misma proporción): `portada.jpg` 1080 × 960 (o 1080 × 810 si
   la portada lleva 6 datos), `dentro-1.jpg` 1080 × 520, `dentro-2.jpg`
   652 × 700, `dentro-3.jpg` 412 × 700, y `mas-1…` según la disposición:
   `cuatro` (1080 × 560, 532 × 520, 532 × 520, 1080 × 520) o `tres`
   (1080 × 820, 532 × 780, 532 × 780). Nada de fotos de stock: renders propios
   o fotos reales de taller.
2. **Plano** en `imagenes/crudo-05/plano.jpg`. En `plano.caja` va
   `[x, y, ancho, alto]` en px del lienzo de 1080 × 1920 (el plano arranca en
   x 72, y 150, y no debería pasar de y 1780); en `plano.leyenda`, `[x, ancho]`
   de la columna de ambientes (720/288 si el plano mide 600 de ancho, 660/348
   si mide 540). Cada marca es `["número", x, y]`: la esquina superior
   izquierda del cuadrado negro de 46 px sobre el plano.
3. **Datos**: copiá en `datos.json` el bloque del CRUDO más parecido dentro de
   `crudos` y cambiá nombre, número, superficie, plazo, `precio_gs` (el de la
   planilla, redondeado hacia arriba a 100.000), `datos` de portada (hasta 4
   con portada de 960; 5 o 6 con portada de 810), título de «Así se vive por
   dentro», `incluye` y, si tiene, `incluido` (caja clara de «Qué incluye») y
   `sumale` (adicionales con precio).
4. **Exportá** `python exportar.py 05` y revisá el PDF página por página.
5. **Web**: el mismo precio en `lib/content.ts` (y en
   `contenido/datos/modelos.json` si hay piezas para redes).

Reglas de contenido (ver `AGENTS.md`): precio cerrado con IVA incluido, igual
en web y propuesta; especificaciones de material sí (8 mm, 10 mm, 80 L, BTU),
tamaños de piezas o ambientes no; «cobogós», nunca «celosías»; sin
«Imagen referencial»; sin nombrar bancos ni tasas de la financiación.

## Fotos

Las de `imagenes/crudo-0X/` son los recortes de los PDF aprobados, salvo
`crudo-02/mas-1.jpg` (fachada con cobogós, de `renders-aprobados/crudo-02/crudo-2-a.jpg`)
y `crudo-04/mas-1.jpg` (vista lateral con quincho, de `renders-aprobados/crudo-04/crudo-4-b.jpg`),
recortadas a 2160 × 1640 para el hueco grande de la página 3. La portada de CRUDO 03
(`crudo-03/portada.jpg`) es `public/images/renders/crudo-3/crudo-3-g.jpg`, recortada a 1080 × 960.
