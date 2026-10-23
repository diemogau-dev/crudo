# Piloto — Etapa 3

Fecha: 23/10/2026. Estado: **a la espera de la revisión de Diego**. No se produjo nada de la sección 9.

## Piezas entregadas (16 PNG)

| Pieza | Archivos | Render |
|---|---|---|
| O2 · CRUDO 04, toma principal (editorial) | `salidas/organico/O2_crudo04_4x5.png`, `_9x16.png` | 04-a |
| O4 · Carrusel «Los cuatro Crudo» (ficha), 6 láminas | `salidas/organico/O4_cuatro-crudo_L1…L6_4x5.png` | 02-a, 01-k, 03-a, 04-a |
| A1 · «Precio cerrado» (publicitaria) | `salidas/anuncios/A1_precio-cerrado_4x5.png`, `_9x16.png` | 04-a |
| A1a · titular «Lista en 2 meses» | `salidas/anuncios/A1a_lista-en-2-meses_4x5.png`, `_9x16.png` | 04-a |
| A1b · imagen del quincho | `salidas/anuncios/A1b_quincho_4x5.png`, `_9x16.png` | 04-c |
| A1c · sin precio en la gráfica | `salidas/anuncios/A1c_sin-precio_4x5.png`, `_9x16.png` | 04-a |

Copys y textos de anuncio: `salidas/textos.md`. Verificación automática: `salidas/verificacion.md` (las 16 piezas dan OK).

## Qué cambié respecto del brief, y por qué

1. **Nombres de las láminas.** Las láminas 2 a 5 usan los nombres de la web: «Loft con kitchenette», «Loft», «Vivienda industrial» y «Casa con quincho». No uso «El refugio», «La suite», etc., porque pediste no inventar nombres. «Casa de verano» queda solo como frase descriptiva en el copy de O2 y en el titular del A1.
2. **«Cuatro modelos» → «Cuatro tipologías»** en el copy del carrusel, por la regla del repo. «Del refugio de 26 m² a la casa de verano de 85 m²» pasa a «del loft con kitchenette de 26 m² a la casa con quincho de 85 m²».
3. **Copy de O2: «madera» → «acero».** El deck es símil madera, así que «hormigón, madera y vidrio» no era exacto.
4. **Plazos.** En todas las piezas, «45 días» y «2 meses» van con «desde la palada inicial». En el A1a, el titular «LISTA EN 2 MESES. PRECIO CERRADO.» lleva en la línea de dato «2 meses desde la palada inicial».
5. **Etiquetas** (decisión de Diego: la piscina siempre como adicional):
   - Crudo 03: «Imagen referencial · Piscina, deck, pérgola, parrilla y cobogós son adicionales».
   - Crudo 04: «Imagen referencial · La tina no está incluida · La piscina se suma como adicional».
6. **Encuadre.** Un recorte 4:5 a sangre del render 04-a cortaba los lados de la casa, y con eso el quincho, la tina y la parrilla. Por eso el render va en una franja ancha (proporción ~1,2), donde entra la casa completa, y el texto y el logo quedan sobre campo Iron Black. En 9:16, la franja central con campo Iron Black arriba y abajo, como aprobaste.
7. **Texto fuera de las carpinterías.** En el A1, el texto queda debajo de la casa, sobre el scrim, sin cruzar carpinterías, como pide el manual.

## Escala tipográfica

Las plantillas se dibujan a 540 px y se exportan a densidad 2×, así que los tamaños del manual se duplican en el PNG:

| Elemento | Manual | En el PNG de 1080 px |
|---|---|---|
| Kicker | 11 px | 22 px |
| Etiqueta «Imagen referencial» | 10 px | 20 px |
| Márgenes | 32 px CSS | 64 px |

Si los tomara literales sobre 1080 px, en el teléfono no se leerían.

## Imágenes

- **Ampliación.** Real-ESRGAN ×2 mezclado al 80 % con un Lanczos del original, para ganar nitidez sin perder la textura del hormigón ni el aspecto fotográfico. Las piezas usan el render ampliado reducido al tamaño final, así que no hay estiramiento.
- **Renders aprobados ampliados** en `renders-aprobados/crudo-0X/`, sin EXIF.
- **Retoque:**
  - Saqué la estrella de Gemini de los siete renders de Crudo 01 (a, b, c, d, e, g y h) y de paso actualicé esos archivos en la web.
  - En 02-b borré la chapita de la heladera y los rótulos del microondas. Quedó limpio, así que lo preferí a 02-e.

## Qué controla `verificar.py` y qué no

**Controla, en cada pieza:**
- Cada número contra `modelos.json`: m², precio, plazo.
- «IVA incl.» junto a cada precio y «desde la palada inicial» junto a cada plazo.
- Términos prohibidos: lujo, exclusivo, «modelo», «serie», rentabilidad, «28 días», nombres de proveedores, etc.
- Etiqueta obligatoria.
- Contraste: L* medio ≤ 45 bajo texto o logo sobre render.
- Márgenes de 64 px.
- Zonas seguras de 9:16 (14 % arriba, 20 % abajo, margen derecho).
- Logo: ≥ 96 px de ancho y zona de seguridad igual a la altura de la C.
- Metadatos de los PNG y EXIF de los renders.
- Nombres de archivo de terceros.

Lo probé con casos armados a propósito (84 m², un precio distinto, «2 meses» sin palada, «lujo», «modelo») y los detecta.

**No controla (lo revisé a ojo):**
- Cantidad de líneas del titular.
- Que no haya personas: no hay personas en los renders usados.
- La calidad del retoque.

## Para revisar

1. Los dos layouts: franja ancha + campo Iron Black (O2, A1) y ficha con render al 60 % (O4).
2. La etiqueta de Crudo 04 ocupa dos líneas a 20 px. ¿Te sirve el texto largo o lo acortamos?
3. Los textos de anuncio son iguales en las cuatro variantes del A1, porque el brief da uno solo. Si querés, escribo un texto principal por variante.
4. La fuente es Archivo variable a peso 900. «Archivo Black» de Google Fonts es un corte aparte, un poco más ancho. Si querés el corte exacto, lo cambio.
