# Selección de renders — Etapa 2

Fecha: 23/10/2026. Estado: **a la espera de la aprobación de Diego**. No se copió ningún render a `renders-aprobados/` ni se usó en ninguna pieza.

Hojas de contactos (todos los renders, con nombre de archivo, píxeles y factor de ampliación necesario):
`hoja-contactos-crudo-01.png`, `-02.png`, `-03.png`, `-04.png`.

## 0. Lo más importante

1. **Resolución: ningún render horizontal llega a 1350 px de alto** (el único que mide más es el baño vertical `1-l`, que es angosto). Los horizontales miden entre 618 y 1200 px de alto, casi todos entre 650 y 910. Para 1080 × 1350 (4:5) hay que ampliarlos entre 1,1× y 2,2×. Para 1080 × 1920 (9:16), entre 1,6× y 3,1×.
   - Los mejores: `crudo-1-campo` (2400 × 1194) y `crudo-4-b` (1800 × 1200), ambos a 1,1× para 4:5.
   - Los archivos de Drive pesan lo mismo que las copias del repo (son los mismos), así que Drive no trae versiones más grandes que las que tengo.
   - **Opciones:** (a) ampliar con IA (2×) y revisar la nitidez pieza por pieza; (b) pasarme los originales en 2K o 4K, o regenerar los elegidos a mayor tamaño. Recomiendo (b) para los 12 elegidos. Si preferís (a), lo hago y lo marco como ampliado.
2. **Marca de agua de Gemini (una estrella pequeña) visible en la esquina inferior derecha** de siete renders de Crudo 01: `a`, `b`, `c`, `d`, `e`, `g` y `h`. En los demás no la vi (revisé la esquina inferior derecha de los 40 renders, sin contar el plano de Crudo 04). No usaría esos siete sin retocarlos.
3. **El render de Crudo 01 con cobogós.** `crudo-1-campo` muestra una pared de cobogós, y la tabla del brief dice que Crudo 01 no lleva cobogós. Es una diferencia de diseño.
4. **La pérgola de Crudo 03 en los renders es de listones de madera** (b, d, g) sobre estructura negra. Vos confirmaste que es metálica. La etiqueta «Imagen referencial» cubre la diferencia, pero conviene que lo sepas.
5. **Marcas dentro de la imagen.** La heladera roja retro (01-c, 01-d, 01-i, 01-j, 02-b, 02-c) imita una marca conocida. En `02-b`, ampliada, la heladera lleva una chapita con letras y el microondas tiene rótulos de marca en el borde inferior. Esto choca con «ningún logo ni nombre de proveedor visible» y hay que retocarlo o descartar el render. En el resto no encontré logos legibles, pero a estas resoluciones no puedo descartar marcas diminutas.

## 1. Criterios que apliqué

Para cada render revisé:
- Coincidencia con la tabla y los planos.
- Defectos de generación.
- Marca de agua y texto dentro de la imagen.
- Cumplimiento del manual (luz, cámara, vegetación, mobiliario).
- Resolución para 4:5 y 9:16.

Limitación: los 12 elegidos y otros 5 los vi a tamaño completo. Los demás (24) los vi en la hoja de contactos, a tamaño reducido, así que un defecto fino ahí podría haberse escapado.

## 2. Propuesta: 3 por modelo

### Crudo 04 (85 m²)

| # | Archivo | px | 4:5 / 9:16 | Por qué |
|---|---|---|---|---|
| 1 | `crudo-4-a.jpg` | 1449 × 736 | ×1,83 / ×2,61 | **Toma principal para O2 y A1.** Altura de ojo, luz dorada, techo a dos aguas, deck, parrilla y cobogós visibles. Sin defectos de generación. El cerro de fondo da aire arriba para el texto. |
| 2 | `crudo-4-c.jpg` | 1600 × 672 | ×2,01 / ×2,86 | **Quincho para la variante (b) del A1.** Parrilla, cobogós, comedor y deck. Se ve muy fotográfico: la etiqueta «Imagen referencial» es obligatoria. |
| 3 | `crudo-4-b.jpg` | 1800 × 1200 | ×1,12 / ×1,60 | **Mayor resolución de Crudo 04.** Vista 3/4 con muro de cobogós, deck y volumen lateral de placas. Contras: luz de mediodía, cielo saturado y una pileta en el borde derecho (no incluida), que se corta recortando. |

Notas de Crudo 04:
- La tina de concreto se ve en a, b, c y d. La etiqueta lleva «La tina no está incluida».
- Los interiores `e`, `f`, `g` y `h` quedan reservados para el carrusel O7.

### Crudo 02 (26 m²)

| # | Archivo | px | 4:5 / 9:16 | Por qué |
|---|---|---|---|---|
| 1 | `crudo-2-a.jpg` | 1313 × 800 | ×1,69 / ×2,40 | **Toma principal.** Frente vidriado con dormitorio, deck y pared de cobogós, todo lo que dice la tabla. Altura de ojo, ligeramente baja. Luz de mediodía, no dorada. |
| 2 | `crudo-2-b.jpg` | 1312 × 673 | ×2,01 / ×2,85 | **Interior.** Dormitorio, estar y kitchenette en una sola vista: muestra el programa completo del modelo. **Requiere retoque:** la heladera roja lleva chapita con letras y el microondas tiene rótulos de marca. Alternativa sin ese problema: `crudo-2-e` (detalle de dormitorio), que no muestra el programa. |
| 3 | `crudo-2-g.jpg` | 1455 × 736 | ×1,83 / ×2,61 | **Volumen limpio con cielo grande,** sirve de fondo para texto. No muestra el deck ni los cobogós. |

### Crudo 01 (31 m²)

| # | Archivo | px | 4:5 / 9:16 | Por qué |
|---|---|---|---|---|
| 1 | `crudo-1-k.jpg` | 1304 × 816 | ×1,65 / ×2,35 | **Mejor exterior sin marca de agua.** Esquina con deck, altura de ojo, luz difusa y vegetación controlada. Es lo más cercano a la «fachada a altura de ojo» que está pendiente. |
| 2 | `crudo-1-campo.jpg` | 2400 × 1194 | ×1,13 / ×1,61 | **Mayor resolución de todo el repo.** Cielo nublado difuso con mucho aire para el texto, ideal para A5 «Tu terreno tiene más para dar». La casa es chica en el cuadro. **Tiene cobogós (punto 3 de la sección 0).** |
| 3 | `crudo-1-i.jpg` | 1527 × 688 | ×1,96 / ×2,79 | **Interior.** Dormitorio con vista al paisaje. Sin marca de agua. Se ve el borde de una heladera roja a la izquierda. |

`crudo-1-c.jpg` (fachada frontal a altura de ojo) sería la mejor toma, pero tiene la estrella de Gemini, casas de barrio reales de fondo (rompe «vegetación mínima y controlada») y una sombra en forma de arco sobre el muro derecho, que es geometría imposible. No la uso sin retocarla.

### Crudo 03 (66 m²)

| # | Archivo | px | 4:5 / 9:16 | Por qué |
|---|---|---|---|---|
| 1 | `crudo-3-a.jpg` | 1568 × 688 | ×1,96 / ×2,79 | **Frente completo a altura de ojo.** Se lee la planta lineal, el estar vidriado, el deck y la pérgola. Cielo despejado arriba. Muestra pileta, deck, pérgola, parrilla y cobogós, todos adicionales. |
| 2 | `crudo-3-d.png` | 1727 × 910 | ×1,48 / ×2,11 | **La de mejor luz** (cálida, cercana a la hora dorada) y la de mayor resolución de Crudo 03. Pérgola de listones de madera. Se ve un alambrado a la derecha y casas reflejadas en el vidrio. |
| 3 | `crudo-3-c.jpg` | 1500 × 704 | ×1,92 / ×2,73 | **Interior de lo incluido:** cocina con isla y estar, muros de placas. Sin adicionales a la vista, así que la etiqueta no necesita aclarar ninguno. |

Etiqueta de Crudo 03: el brief dice «Deck, pérgola, parrilla y cobogós son adicionales». La propuesta agrega **piscina**, que sale en 03-a, 03-b y 03-d. Propongo escribir «Imagen referencial · Piscina, deck, pérgola, parrilla y cobogós son adicionales».

## 3. Todos los renders, uno por uno

Factores: 4:5 / 9:16 = cuánto hay que ampliar el recorte. WM = marca de agua de Gemini.

### Crudo 01

| Archivo | px | 4:5 / 9:16 | Nota |
|---|---|---|---|
| 1-a.jpg | 1220 × 864 | ×1,56 / ×2,22 | Aérea. **WM.** Sin cobogós (coincide con la tabla). Solo como apoyo. |
| 1-b.jpg | 1195 × 880 | ×1,53 / ×2,18 | Aérea, lado cerrado. **WM.** |
| 1-c.jpg | 1287 × 832 | ×1,62 / ×2,31 | Frente a altura de ojo. **WM.** Casas de barrio, sombra imposible, heladera roja. Es la imagen que usa la web para compartir. |
| 1-campo.jpg | 2400 × 1194 | ×1,13 / ×1,61 | Paisaje nublado. **Cobogós** (difiere de la tabla). Sin marca. |
| 1-d.jpg | 1600 × 645 | ×2,09 / ×2,98 | Dormitorio con escritorio. **WM.** Heladera roja. |
| 1-e.jpg | 1331 × 784 | ×1,72 / ×2,45 | Vista desde el deck hacia el dormitorio. **WM** bien visible. |
| 1-f.jpg | 1438 × 736 | ×1,83 / ×2,61 | Plano sin numerar, fondo blanco. Coincide: deck, dormitorio y escritorio, baño. |
| 1-g.png | 1331 × 784 | ×1,72 / ×2,45 | Duplicado de 1-e en PNG. **WM.** |
| 1-h.png | 1625 × 656 | ×2,06 / ×2,93 | Casi duplicado de 1-d en PNG. **WM.** |
| 1-i.jpg | 1527 × 688 | ×1,96 / ×2,79 | Dormitorio con vista. Sin marca. |
| 1-j.jpg | 1279 × 832 | ×1,62 / ×2,31 | Escritorio con heladera roja y una «K» decorativa. Sin marca. |
| 1-k.jpg | 1304 × 816 | ×1,65 / ×2,35 | Deck en esquina. Sin marca. |
| 1-l.jpg | 768 × 1376 | ×1,41 / ×1,41 | Baño con tocador. Resolución insuficiente para 4:5. |

### Crudo 02

| Archivo | px | 4:5 / 9:16 | Nota |
|---|---|---|---|
| 2-a.jpg | 1313 × 800 | ×1,69 / ×2,40 | Exterior con cobogós y deck. Sin defectos vistos. |
| 2-b.jpg | 1312 × 673 | ×2,01 / ×2,85 | Interior, programa completo. Heladera roja con chapita de marca y microondas con rótulos. |
| 2-c.jpg | 1352 × 784 | ×1,72 / ×2,45 | Kitchenette con desayunador, banquetas y heladera roja. |
| 2-d.jpg | 1630 × 656 | ×2,06 / ×2,93 | Plano sin numerar. Coincide: deck, dormitorio, kitchenette, baño. |
| 2-e.jpg | 1231 × 864 | ×1,56 / ×2,22 | Detalle de dormitorio con flores. Sin defectos vistos. |
| 2-f.jpg | 1027 × 1024 | ×1,32 / ×1,88 | Baño con tocador de mármol y espejo LED. Resolución justa. |
| 2-g.jpg | 1455 × 736 | ×1,83 / ×2,61 | Exterior lateral, sin deck ni cobogós. |

### Crudo 03

| Archivo | px | 4:5 / 9:16 | Nota |
|---|---|---|---|
| 3-a.jpg | 1568 × 688 | ×1,96 / ×2,79 | Frente completo, piscina, deck, pérgola. |
| 3-b.jpg | 1486 × 704 | ×1,92 / ×2,73 | Vista 3/4 con piscina, pérgola de listones de madera, alambrado de púas a la izquierda. |
| 3-c.jpg | 1500 × 704 | ×1,92 / ×2,73 | Cocina con isla y estar. |
| 3-d.png | 1727 × 910 | ×1,48 / ×2,11 | Luz cálida, cobogós, piscina. Alambrado a la derecha. |
| 3-e.jpg | 1405 × 679 | ×1,99 / ×2,83 | Estar con TV sobre listones de madera. |
| 3-f.jpg | 1282 × 816 | ×1,65 / ×2,35 | Cocina con isla, horno y microondas empotrados (coincide con la tabla). |
| 3-g.jpg | 1338 × 784 | ×1,72 / ×2,45 | Quincho con parrilla, cobogós y pileta. Sin defectos vistos. |
| 3-h.jpg | 1375 × 768 | ×1,76 / ×2,50 | Dormitorio. |
| 3-i.jpg | 1322 × 731 | ×1,85 / ×2,63 | Dormitorio con dos camas. |
| 3-j.jpg | 1287 × 832 | ×1,62 / ×2,31 | Mueble de TV con libros que tienen texto legible en el lomo. Evitar. |
| 3-l.jpg | 1600 × 670 | ×2,01 / ×2,87 | Cocina con isla. |
| 3-m.png | 1420 × 655 | ×2,06 / ×2,93 | Plano sin numerar, con un hueco blanco en el recorte. |
| 3-n.jpg | 828 × 618 | ×2,18 / ×3,11 | Resolución insuficiente. |

### Crudo 04

| Archivo | px | 4:5 / 9:16 | Nota |
|---|---|---|---|
| 4-a.jpg | 1449 × 736 | ×1,83 / ×2,61 | Toma principal. |
| 4-b.jpg | 1800 × 1200 | ×1,12 / ×1,60 | Mayor resolución. Pileta en el borde derecho. |
| 4-c.jpg | 1600 × 672 | ×2,01 / ×2,86 | Quincho. |
| 4-d.jpg | 1575 × 656 | ×2,06 / ×2,93 | Tina en primer plano con cielo nublado, cobogós al fondo. |
| 4-e.jpg | 1600 × 672 | ×2,01 / ×2,86 | Sala con TV sobre listones de madera. |
| 4-f.jpg | 1592 × 656 | ×2,06 / ×2,93 | Estar y cocina. |
| 4-g.jpg | 1370 × 768 | ×1,76 / ×2,50 | Cenital, comedor y cocina. |
| 4-h.jpg | 1511 × 704 | ×1,92 / ×2,73 | Dormitorio. |
| 4-plano.jpg | 1522 × 688 | ×1,96 / ×2,79 | Plano sin numerar: 2 dormitorios, baño, cocina, estar, quincho, deck. |

Hay un plano sin numerar por modelo (`1-f`, `2-d`, `3-m`, `4-plano`). El brief decía que solo existía el de Crudo 04. Siguen sin los ambientes numerados, aunque las propuestas sí traen uno numerado por modelo.

## 4. Archivos de Drive que no pude revisar

Drive tiene dos renders que no están en el repo: `Crudo 02 - H` (PNG de 2 MB) y `Crudo 03 - K` (PNG de 1 MB). No los pude abrir, porque la herramienta de Drive no devuelve imágenes. Además, `crudo-1-campo` y `crudo-3-n` están en el repo pero no en las carpetas RENDERS de Drive.

Los demás nombres del repo (`a`, `b`, `c`…) corresponden a las letras de Drive. Los `Gemini_Generated_Image_*` de Drive no pude cruzarlos uno a uno con el repo, pero los tamaños son del mismo orden. Si querés que revise 02-H y 03-K, pasámelos por acá.

## 5. Lo que falta (sección 10 del brief)

- Toma de detalle a 50 cm del panel (hormigón + junta + madera) de los cuatro modelos.
- Fachada de Crudo 01 a altura de ojo sin marca de agua ni vecinos. La mejor que hay es `1-k`, que es esquina y no frontal.
- Planos con ambientes numerados como archivo aparte.
- Render de Crudo 02 a hora dorada (hoy es mediodía).
- Cualquier render de Crudo 03 o 04 con la pérgola correcta (metálica).
- Corte del muro por capas (para O11).

## 6. Qué necesito que decidas

1. **¿Aprobás los 12 elegidos?** Decime cuáles cambiar.
2. **Resolución:** ¿ampliación con IA o los originales en mayor tamaño?
3. **Marca de agua en Crudo 01:** ¿evitamos esos siete renders, o los retoco con herramientas de relleno?
4. **`crudo-1-campo` con cobogós:** ¿lo usamos igual, con la etiqueta? Si no, el 01 solo tiene dos renders limpios.
5. **Heladera roja y rótulos de marca en `02-b`:** ¿retoco la chapita y los rótulos, o cambio `02-b` por `02-e`? En `01-i` la heladera solo asoma en el borde izquierdo y se puede recortar.
6. **Etiqueta de Crudo 03:** ¿sumamos «Piscina»?
7. **9:16:** al ser horizontales, la imagen ocupará una franja y el resto será un campo Iron Black (o un recorte vertical con ampliación fuerte). Propongo el campo Iron Black con la imagen en la franja central, salvo que prefieras recorte.
