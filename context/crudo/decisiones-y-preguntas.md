# CRUDO — Decisiones y preguntas abiertas

> Registro vivo. Agregar entradas nuevas arriba, con fecha. No borrar historial.

## 2026-10-27 — Precios finales desde las 4 planillas, CRUDO 03 sin bidet y especificaciones sin medidas (pedido de Diego)

1. **Precios cerrados IVA incluido, de la celda "Construcción vivienda" de cada planilla, redondeados hacia arriba a 100.000 Gs.:** CRUDO 01 **Gs. 150.800.000** (150.799.174) · CRUDO 02 **Gs. 148.800.000** (148.717.706) · CRUDO 03 **Gs. 318.800.000** (318.718.715) · CRUDO 04 **Gs. 354.000.000** (353.938.201). Reemplazan los de las propuestas del 21/10 y el de CRUDO 04 del 23/10. Se unifican en la web (`lib/content.ts`), en `contenido/datos/modelos.json` y en las piezas de Instagram y Meta (`contenido/salidas/`, regeneradas). Los trabajos exteriores y los adicionales quedan fuera del precio. CRUDO 04 incluye el quincho.
2. **Por qué daba `#NAME?` al leer las planillas desde Drive:** las fórmulas de precio unitario usan rangos con nombre (`coef1`, `coef2`, `coef3`, `dólar`) y los archivos son .xlsx con unos 300 nombres heredados. El lector de Drive no los resuelve; Google Sheets sí. Los valores están guardados en el archivo y se leen bien descargándolo. Para que Claude los lea directo: guardar cada planilla como hoja de Google (Archivo > Guardar como hoja de cálculo de Google) o reemplazar `coef1/2/3` por `$K$9/$L$9/$M$9`.
3. **"Limpieza final de obra" va fija en Gs. 2.000.000** (sin coeficiente) en las planillas de CRUDO 01, 02 y 04; en CRUDO 03 sí lleva coeficiente.
4. **CRUDO 03: sin bidet y termocalefón de 80 L** (antes bidet y 120 L), según su planilla y propuesta. CRUDO 01 ya no lleva bidet en la planilla.
5. **Especificaciones sin medidas, solo materiales:** se sacan "vistas: máxima solidez" del cerramiento y las medidas de la sección de especificaciones (8 mm, 40 mm, 10 cm, 100 mm, puerta de 3,50 × 2,10 m, deck de 7 × 4 m, cobogós de 12 m²). Se mantienen capacidades (BTU, litros, llaves del tablero) y las medidas de los adicionales con precio de CRUDO 03, que definen qué se cotiza.
6. **Pendiente:** rediseñar los PDF de las propuestas comerciales con estos precios.

## 2026-10-23 (tarde) — Nuevo precio de CRUDO 04

1. **CRUDO 04 = Gs. 364.900.000 IVA incluido** (antes 339.200.000). La planilla "Presupuesto CRUDO 04.xlsx" corregida por Calde (23/10) cuantifica fundaciones, platea, cobogós (12 m²) y lámparas con las cantidades reales de CRUDO 04: el costo pasa de Gs. 251.739.163 a 270.799.278 (+19.060.115). Aplicando los coeficientes de la planilla a esas líneas (×1,35 materiales y mano de obra, ×1,25 subcontratos) la venta sube Gs. 25.696.155 → 364.896.155, redondeado a 364.900.000. Las celdas de precio final de la planilla siguen dando error al leerlas desde Drive: **Calde debe confirmar el número**.
2. Se regenera la propuesta comercial de CRUDO 04 con el precio nuevo y la piscina como adicional a cotizar.

## 2026-10-23 — Web alineada con las propuestas (pedido de Diego)

1. **CRUDO 02 = 26 m²** (antes 31 m²) en toda la web.
2. **Precios cerrados con IVA incluido, los de las propuestas del 21/10:** CRUDO 01 Gs. 152.500.000 · CRUDO 02 Gs. 148.800.000 · CRUDO 03 Gs. 308.800.000 · CRUDO 04 Gs. 339.200.000. Reemplazan los "Desde … + IVA". Web y propuestas tienen que coincidir. Los precios de venta no cambian aunque se corrija el costo interno de las planillas de 03 y 04.
3. **Plazo en la web: 45 días** en CRUDO 01 y 02 como propuesta de valor. La aclaración "desde la palada inicial" se hace en la reunión presencial. En piezas de Instagram y Meta se sigue escribiendo "desde la palada inicial".
4. **CRUDO 04 incluye todo** lo de la ficha: la estructura metálica ya contempla el techo y la pérgola sobre el deck, no hay pérgola extra. Suma pared de cobogós de 12 m² y parrilla (mesada de hormigón, parrilla inox y campana).
5. **CRUDO 03:** termocalefón de 120 L, pérgola metálica (adicional). Se agregan a la ficha los adicionales con precio. Pendiente: actualizar la propuesta de CRUDO 03, que dice 80 L.
6. **Bidet:** CRUDO 01 y 02 no llevan (inodoro con ducha higiénica). CRUDO 03 queda como estaba.
7. **Cobogós** en lugar de "celosías" en textos visibles de la web. Deck en lugar de terraza en CRUDO 01 y 02.
8. **Nombres:** no se inventan nombres comerciales; se usan los de la web. El número de cada CRUDO es su número dentro de la serie (01, 02, 03, 04, 05…).

## 2026-10-22 — Ajustes de "Qué incluye" (pedido de Diego)

1. **CRUDO 01 no incluye bidet** (baño con inodoro y ducha higiénica, igual que CRUDO 04). CRUDO 02 y 03 no se tocaron. **Precio CRUDO 01 = Gs. 151.900.000 + IVA** (precio de venta de la planilla "Presupuesto CRUDO 01" sin bidet: Gs. 151.844.674, redondeado). Los precios de CRUDO 02 y 03 no se recalcularon: siguen siendo estimaciones a partir de la planilla anterior.
2. Sección "Vidriería" pasa a **"Vidrios"** en todas las tipologías. En CRUDO 03: "Puertas corredizas de vidrio de 8 mm hacia el exterior, con cerradura".
3. Terminación exterior: "limpiadas con ácido y **protegidas con sellador**" (antes "con patinal").
4. Todos los pisos son de **porcelanato** (no cerámico), incluidos piso y paredes del baño.
5. Cerramiento: sin medidas de placa (hay varios tamaños). Texto: "placas de hormigón armado reforzado, vistas: máxima solidez".

## 2026-10-16 — CRUDO 04, detalle mobile y amenities (pedido de Diego)

1. **CRUDO 04 tiene página propia** (`/tipologias/crudo-04`) y deja de ser "Próximamente" en la home. Datos de la planilla "Presupuesto CRUDO 04": **85 m²** (85,05 m²; reemplaza los 84 m² de la tarjeta anterior), 2 habitaciones, 1 baño, cocina con isla, sala comedor y **quincho con parrilla incluido** (parrilla, pérgola metálica y deck de 7 × 4 m). Renders en `public/images/renders/crudo-4/`.
2. **Precio CRUDO 04 = Gs. 348.297.858 + IVA**: (vivienda Gs. 231.298.413 + quincho Gs. 26.700.000) × 1,35, mismo criterio que CRUDO 01. Quedan fuera los demás trabajos exteriores de la planilla (cobogó, ANDE, pozo ciego, cámaras, flete). **A validar con Diego.**
3. **Detalle en mobile:** sin el menú Imágenes/Planos/Especificaciones/FAQ. Orden: título, datos y amenities, todas las fotos, planos, precio y CTA; después descripción, especificaciones y FAQ. Desktop no cambia.
4. **Amenities nuevos en tarjetas y detalle:** CRUDO 01 y 02 suman **Terraza**; CRUDO 03 suma Cocina y **Quincho con parrilla opcional**; CRUDO 04 incluye Quincho con parrilla. Esto revierte en parte la decisión de no especificar deck/quincho en la web. Los precios de 01, 02 y 03 no cambian.
5. **Portadas de las tipologías iguales en la home y en `/tipologias`:** las dos usan la de la tarjeta de la home (`cardCover` en `lib/content.ts`; CRUDO 04 usa su `cover`).
6. **Plano de CRUDO 04** (`renders/crudo-4/crudo-4-plano.jpg`) en su página, sección Planos.
7. **Portada de `/tipologias`:** el título baja y queda centrado entre el navbar y el techo de la casa (`PageHeader` con `placement="top"`).
8. **Versatilidad (home):** foto de fondo nueva (`tipologias/versatilidad-quincho.jpg`, "camper 1" en Drive) y título "Diferentes usos y posibilidades."

## 2026-10-13 — Correcciones de El Sistema (pedido de Diego)

1. **Nuestro proceso:** título a la izquierda y texto a la derecha. Texto nuevo, más comercial: sistema propio en hormigón armado y concreto de alta resistencia, equipo experto, control total, forma de construir nueva en el país.
2. **Pasos nuevos:** Diseñamos, Fabricamos, Construimos, Entregamos ("Curamos" se integra en Fabricamos). Textos reescritos como narrativa de venta: precio cerrado y plazo antes de empezar, fabricación bajo techo en paralelo, menos días de obra que una construcción tradicional, entrega llave en mano. Fotos nuevas en `public/images/proceso/` (`disenamos-planos`, `fabricamos-fabrica`, `construimos-montaje`, `entregamos-crudo-chaco`); a la de CRUDO Chaco se le aplicó el mismo blanco y negro cálido de las otras. Recuadro de fotos pasa a 4:5 (las fotos son verticales).
3. **"La fábrica" → "Nuestra fábrica":** todo lo que es hormigón o concreto en una casa CRUDO lo diseñamos y fabricamos nosotros (muros, revestimientos, pisos, bachas, tinas, parrillas, mesadas), más taller de herrería propio (estructuras, techos, pérgolas, parrillas).
4. **Se eliminó la sección "Tecnología y materiales".**

## 2026-10-13 — Portada de Tipologías

1. Portada de `/tipologias` = **CRUDO 01 en el campo** (`Crudo 01 - Campo` en Drive → `renders/crudo-1/crudo-1-campo.jpg`, convertida de PNG de 3 MB a JPG de 2400 px). El título va arriba, sobre el cielo, en una sola línea en desktop, para no tapar la casa (`PageHeader` acepta `placement="top"` e `image.position`).

## 2026-10-13 — Precios reales y especificaciones por tipología (pedido de Diego)

1. **Precios "Desde" (sin IVA, solo el módulo):** CRUDO 01 = **Gs. 147.900.462** (planilla real "CRUDO 01 - Costo final unificado y utilidad (oct-2026)": costo + 5% imprevistos + 30% de ganancia neta sobre costo). CRUDO 02 = **Gs. 158.918.742** (C01 + kitchenette). CRUDO 03 = **Gs. 291.332.917** (estimado desde la planilla de C01, la planta y los renders; Gs. 4,41M/m² contra 4,82M/m² de C01).
2. **Se eliminó la referencia de Gs. 4.500.000/m²** (constante, línea "Ref." del detalle y texto del FAQ). Solo se publica el precio total + IVA.
3. **Especificaciones por tipología:** cada tipología tiene su propio bloque en `lib/content.ts` (`constructionSpecs`), escrito a partir de su planilla. Solo se lista lo presupuestado: sin escritorio en CRUDO 01, sin microondas/heladera/alacenas en CRUDO 02, sin horno/campana/panel de madera en CRUDO 03. Amenities y descripciones corregidas en el mismo sentido.
4. **Planillas de CRUDO 02 y CRUDO 03** generadas con el mismo formato, pestañas y orden de rubros que la de CRUDO 01, y subidas a sus carpetas de Drive. Los supuestos propios de cada una están al final de la pestaña "Supuestos y fuentes". **A validar:** mano de obra de Fer para CRUDO 03, precios de cocina, AA y mobiliario.

## 2026-10-13 — Segunda ronda de Tipologías (pedido de Diego)

1. **Portada de `/tipologias`:** galería de CRUDO 03 (`Crudo 03 - G` en Drive = `renders/crudo-3/crudo-3-g.jpg`).
2. **Texto de intro** redactado por Diego, centrado y sin título (se eliminó "Casas de hormigón armado, para toda la vida.").
3. **Tarjetas:** vuelven al formato 4:3 (CRUDO 01 entra completa) y la grilla pasa a 2 columnas en home y `/tipologias`, para que las fotos se vean más grandes. Reemplaza el formato 9:4 de la ronda anterior; CRUDO 03 se recorta a los costados.
4. Botón **"Ver más detalles"** debajo del precio de cada tarjeta, que lleva al detalle de la tipología.

## 2026-10-13 — Correcciones de Tipologías (pedido de Diego)

1. **Superficies:** CRUDO 01 y CRUDO 02 = **31 m²**; CRUDO 03 = **66 m²**. Solo el módulo: deck, quincho y piscina son opcionales con costo extra y **no se especifican en la web** (se sacaron de specs, amenities, resúmenes y descripciones; las fotos que los muestran quedan). El precio "Desde" se mantiene como gancho comercial, calculado sobre el módulo.
2. **`/tipologias`:** portada = interior de CRUDO 03 (`Crudo 03 - C` en Drive), kicker "Tipologías CRUDO", título "Muchas formas de vivirlas.", texto nuevo sobre CRUDO (hormigón armado, seguro, resistente, para toda la vida; sin hablar de prefabricado ni módulos transportables). Se eliminó "Sobre el presupuesto".
3. **Tarjetas de tipología** al estilo de la referencia: nombre, tipología · m², y fila de íconos (habitaciones, baño, kitchenette / sala comedor). Formato apaisado 9:4 para que CRUDO 03 se vea completa. Portadas: CRUDO 02 = kitchenette (`Crudo 02 - C`), CRUDO 03 = fachada completa (`Crudo 03 - A`).
4. **Plano de CRUDO 03** reemplazado por `Crudo 03 - M` de Drive (sin pileta).
5. CTA "Hablemos sobre tu proyecto" debajo de las tipologías (home y `/tipologias`). En la home el kicker/título de la sección también pasan a "Tipologías CRUDO" / "Muchas formas de vivirlas.".

## 2026-10-13 — Cambios de home, numeración y contacto (pedido de Diego)

1. **CRUDO 02 ↔ CRUDO 03.** El loft con kitchenette (28 m²) pasa a ser **CRUDO 02** y la vivienda industrial (60 m²) pasa a ser **CRUDO 03**. Se renombraron slugs, mensajes de WhatsApp, alts y carpetas de imágenes (`renders/crudo-2` ↔ `renders/crudo-3`, `tipologias/crudo-02-*` → `tipologias/crudo-03-*`). Las entradas anteriores de este registro hablan de la numeración vieja.
2. **Home — "Por qué CRUDO y hormigón":** kicker nuevo y texto reescrito a partir del borrador de Diego (obra tradicional = meses o años, improvisación, sobrecosto y equipos que no sincronizan; CRUDO = proceso definido, menos tiempo de obra, costo fijo desde el primer día).
3. **Home — sin precios en las tarjetas de tipologías.** `ModelCard` recibe `showPrice={false}` en la home; `/tipologias`, el detalle y el FAQ siguen mostrando la referencia provisoria mientras `SHOW_PRICES` sea `true`.
4. **Home — Proyectos a medida:** título "Empezá por el terreno." y texto nuevo (terreno + idea → diseño a medida, plazo y costo final conocidos antes de empezar).
5. **CTA final por defecto:** "¿Tenés una idea en mente? Contanos. Nosotros la hacemos realidad."
6. **Banner de proceso en la home** (`ProcessBanner`), entre el render interior y Tipologías: "Construir con materiales duraderos nunca fue tan fácil." con 4 pasos (Diseñamos, Fabricamos, Construimos, Entregamos) e íconos de línea propios. Referencia visual: banner de pasos estilo ViBert. Ajustado después a banner fino (título chico en gris con "materiales duraderos" en negrita, íconos de ~88 px redibujados en el estilo de la referencia, sin divisores).
7. **Nav:** El Sistema, Tipologías, A Medida, Nosotros, FAQ, Hablemos.
8. **Footer:** correo crudohomes@gmail.com, oficina en Sucre 1862 casi José Campos Lanzoni (Asunción), Instagram @crudohomes con link. Facebook eliminado (no hay cuenta). WhatsApp actualizado: 0991 574 500 (antes 0981 625 546).

## 2026-09-26 — Nueva tipología: CRUDO 03

1. **Renders de CRUDO 03** subidos desde Drive a `public/images/renders/crudo-3/` (`crudo-3-a` a `crudo-3-g`; `crudo-3-d` es la planta).
2. **CRUDO 03 = CRUDO 01 + kitchenette.** Mismo volumen y superficie (28 m², se copió de CRUDO 01 porque la planta tiene la misma huella), con kitchenette equipada: anafe eléctrico, bacha, microondas, heladera compacta y barra con banquetas. Tipología: "Loft con kitchenette". Descripción, amenities y alts se armaron a partir de los renders. **A confirmar con Diego:** m² exactos, nombre de tipología y copy.
3. Nuevo mensaje de WhatsApp `crudo03` en `lib/whatsapp.ts`.
4. **Índice de tipologías (Home y `/tipologias`) pasa a 3 columnas en desktop** (`lg:grid-cols-3`); en ese ancho el nombre y la tipología de la tarjeta se apilan. En tablet sigue en 2 columnas.
5. "Siguiente tipología" en el detalle ahora recorre en orden (01 → 02 → 03 → 01) en vez de saltar siempre al primero distinto.
6. Copys que nombraban solo CRUDO 01 y 02 (FAQ, "Sobre el presupuesto", metadata de `/tipologias`, Home "Proyectos a medida") actualizados para incluir CRUDO 03. El precio de referencia de CRUDO 03 es el mismo que CRUDO 01 (28 m²).

## 2026-09-09 — Novena ronda: título del hero, sin em-dashes, fotos de El Sistema, créditos

1. **Título del hero achicado de nuevo.** `display-xl` bajó de `clamp(2.25rem, 6.4vw, 5.75rem)` a `clamp(1.875rem, 4.8vw, 4.25rem)`.
2. **Subtítulo del hero reemplazado por el texto exacto de Diego:** "Arquitectura en hormigón y concreto. Un mismo equipo, desde el diseño a la entrega llave en mano. Más control y menos tiempo que una obra tradicional."
3. **Se eliminaron los guiones em-dash ("—") de toda la prosa visible del sitio** (home, nosotros, FAQ, y los bloques de copy pendientes comentados en `/tipologias`), reemplazados por comas o punto seguido. Quedan sin tocar los `—` que son bullets decorativos de lista (`<span>—</span>` antes de cada ítem de "Sistema" en las tipologías) y los que están en `aria-label` (no son copy visible) o en comentarios de código — no son la construcción que se pidió eliminar.
4. **Fotos nuevas en "El Sistema" → "El taller":** Diego pasó una foto de un soldador trabajando en la herrería y una foto de bachas de producción propia. Se sacaron `celosia-instalada-dia.jpg` (celosía con la silla) y `taller/paver-muestra.jpg` (la plaqueta chica en la mano) de la segunda fila de fotos, y entraron `proceso/soldadura-herreria.jpg` (nueva) y `taller/bachas-taller.png` (ya existía en el repo sin usar en ninguna página). La fila queda: celosía de noche, soldadura, bachas. Los dos archivos sacados (`celosia-instalada-dia.jpg`, `paver-muestra.jpg`) no se borraron del repo, quedan como assets disponibles sin usar.
5. **"Las manos" (Nosotros):** se agregó "MBA" después de "Diego Morales".
6. **Mención de equipo propio y cuadrillas de construcción:** se agregó en "Las manos" (Nosotros: "equipo propio en el taller, cuadrillas propias de construcción"), en "El taller" (Sistema: "con equipo propio de producción") y en el paso "Construimos" del proceso (usado en Home y Sistema: "Nuestras propias cuadrillas de construcción montan y ejecutan la obra").

## 2026-09-09 — Octava ronda: ajustes de copy y conversión (prompt de ajustes de Diego)

1. **Hero:** H1 nuevo "Diseñamos, fabricamos y construimos tu próximo espacio." (sube al lugar de más peso la idea que antes solo estaba en el FAQ #1). Subhead nueva menciona audiencia (quintas, casas de descanso, ampliaciones), el diferencial de un solo equipo y "más control y menos tiempo que una obra tradicional". CTA primario pasa de "Hablemos" a "Hablemos de tu terreno" (mismo link).
2. **Sección "Una forma diferente de construir" reemplazada por "Por qué CRUDO":** nombra el problema explícitamente ("Construir no debería ser un caos" — mismo titular que ya existía en `/nosotros`, reutilizado a propósito), reafirma "un solo equipo" y mete la velocidad como consecuencia. CTA pasa a "Conocer cómo trabajamos" (mismo link a `/sistema`).
3. **Línea de inversión/plazo en la home (teaser de tipologías): agregada pero comentada, no publicada.** Usa `[PLACEHOLDER_INVERSION_CRUDO01]` y `[PLACEHOLDER_PLAZO]` — depende de que Calde cierre costo real (Gate 0). Mismo criterio aplicado a: FAQ #6 (`[PLACEHOLDER_INVERSION_CRUDO01]`), "Sobre el presupuesto" en `/tipologias` (ambos placeholders) y en `/tipologias/[slug]` (placeholder por modelo). **Ninguno de estos cuatro bloques se publicó** — quedan como comentarios JSX/código con el texto final ya redactado, listos para activar reemplazando el placeholder por la cifra real. Verificado que no aparecen en el HTML generado por el build.
4. **FAQ #7 (plazo) sí se publicó ya** — es una afirmación direccional/comparativa, no un número, coherente con cómo funciona el proceso.
5. **`/nosotros` → "Las manos":** se nombra a los fundadores — Juan Calderoli (diseño y dirección técnica) y Diego Morales (estrategia) — sin cambiar sus roles reales, solo haciéndolos visibles en el único lugar del sitio donde corresponde.

**Pendiente real para Diego/Calde:** completar `[PLACEHOLDER_INVERSION_CRUDO01]`, `[PLACEHOLDER_INVERSION_CRUDO02]` y `[PLACEHOLDER_PLAZO]` con cifras reales (Gate 0) y avisar para descomentar los cuatro bloques listados en el punto 3.

## 2026-09-09 — Séptima ronda: corregir el layout de "El material" y completar galerías

1. **"El material" (Nosotros) vuelto a corregir.** El díptico quedaba centrado en un contenedor angosto con un vacío enorme al costado. Ahora usa el mismo patrón que "Las manos" / "El oficio no se improvisa": grid de 12 columnas, díptico ocupando `md:col-span-6` de un lado y el texto (título + copy) del otro `md:col-span-5`, centrados verticalmente.
2. **Las 4 fotos completas por tipología:** la foto de portada de cada `/tipologias/<slug>` (la que se usa en el header) ahora se repite también como primera imagen de la galería más abajo, además de las 3 que ya tenía. CRUDO 01 y CRUDO 02 muestran 4 renders completos cada una.

## 2026-09-09 — Sexta ronda: fix de bloque negro doble + reorden El material + fotos de celosía en El Sistema

1. **Nosotros: "Desde Paraguay" pegado al CTA final se veía como un solo bloque negro gigante, sobre todo en mobile.** Se elimina el `FinalCta` de la página y se agrega un botón "Hablemos" dentro de la propia sección "Desde Paraguay", debajo de "Arquitectura de autor, producida con el control de una fábrica y el cuidado de un taller." La página ahora termina en esa sección y pasa directo al footer, sin dos negros consecutivos.
2. **"El material" reordenada:** el texto ("Elegimos el concreto porque es honesto...") ahora va debajo del titular "Sólido afuera. Cálido adentro." y antes del díptico de fotos. Las fotos se achicaron (`max-w-2xl` centrado en vez de ancho completo) y bajaron de `aspect-[4/5]` a un grid más compacto.
3. **El Sistema usa las fotos de celosía y piso** que habías subido directo a `main`: se agregó una segunda fila de 3 imágenes en "El taller" con `celosia-instalada-dia.jpg`, `celosia-instalada-noche.jpg` y `paver-muestra.jpg` — quedan como prueba visual directa de los ítems "Celosías y piezas arquitectónicas" y "Pisos de concreto" de la lista de arriba.

## 2026-09-08 — Quinta ronda: fix de diseño + flujo de git a producción

1. **"El material" (Nosotros) rediseñada como díptico.** El layout de texto+una foto quedaba desalineado. Ahora dos fotos lado a lado —detalle de muro (`muro-detalle.png`, "Afuera") y el interior cálido de CRUDO 02 (`crudo-02-interior.jpg`, "Adentro")— con etiqueta superpuesta y degradado para legibilidad, y el texto pasa a una columna completa debajo.
2. **Flujo de git cambia: se deja de trabajar en ramas por sesión.** Diego pidió pushear todo a `main` porque Vercel builda de ahí. Se hizo `git merge origin/main` (Diego había subido archivos directo a GitHub mientras tanto) y se pusheó a `main`. **De acá en adelante, el trabajo en este proyecto se hace directo sobre `main`**, no en `claude/*`.
3. **Diego subió 6 archivos nuevos directo a `main` vía la web de GitHub**, sin avisar en el chat — se detectaron al mergear:
   - **Reales, organizados y disponibles para usar** (`public/images/taller/paver-muestra.jpg`, `public/images/taller/moldes-celosia.jpg`, `public/images/proceso/celosia-instalada-dia.jpg`, `public/images/proceso/celosia-instalada-noche.jpg`): un pavimento de concreto, moldes de celosía en el taller, y —lo más valioso— dos fotos de una **celosía de concreto ya instalada** (día y noche). Es el primer material real de celosías que tenemos; hasta ahora esa categoría de producto no tenía ninguna foto propia en el sitio. Todavía no están usadas en ninguna página — quedan disponibles para cuando se pida.
   - **Cuarentena, no publicar** (`context/crudo/referencias-visuales/`): `IMG_4467.jpg` (foto de una cocina con azulejo celeste, parece inspiración/Pinterest, no un espacio de CRUDO) y `mudd-sink-bowl-bol-rove-pumice-cream-white-grey-natural.jpg.webp` (por el nombre del archivo, es un producto de la marca **Mudd**, no de CRUDO — no publicar bajo ninguna circunstancia).

## 2026-09-08 — Cuarta ronda de ajustes

1. **Bajada del hero:** "Arquitectura contemporánea con materiales sólidos. Hormigón armado y Concreto de Alto Performance."
2. **CTA de tipología:** "Conocer el proyecto" → "Conocer tipología" en `ModelCard`.
3. **Fotos reales para "Diseñamos" y "Fabricamos"** en El Sistema: Diego pasó dos fotos (dos personas sobre un plano en mesa de arquitecto; terminación de un panel recién vertido) — quedaron en `public/images/proceso/disenamos-plano.jpg` y `fabricamos-acabado.jpg`. Reemplazan el placeholder pendiente de la ronda anterior.
4. **Logo real de marca:** Diego pasó el wordmark de CRUDO en dos versiones (fondo Iron Black y fondo Alabaster). Como venían con fondo sólido, no transparente, se generaron versiones con el fondo recortado por chroma-key exacto (`public/logo/crudo-wordmark-iron.png` y `crudo-wordmark-alabaster.png`) para poder usarlo sobre cualquier fondo. Nuevo componente `components/site/Logo.tsx`, usado en `Nav` (cambia de versión según el estado del header) y `Footer`.
5. **Foto de gimnasio** (pasada por Diego) reemplaza la imagen de "Qué podemos construir" en A Medida — encaja directo con la lista de posibilidades que incluye "Gimnasios".
6. **Título de Nosotros:** "Creemos en los materiales que no mienten" → **"Creemos en los materiales en su estado puro."**
7. **Párrafo reescrito en "Por qué existimos"** (Nosotros): "No somos una fábrica que además construye, ni un estudio que terceriza todo. Somos las dos cosas a la vez" no cerraba la idea → ahora "Por eso diseñamos, fabricamos y construimos bajo el mismo techo, en vez de repartir tu proyecto entre un estudio, una fábrica y un constructor que no se hablan entre sí."
8. **"El material" (Nosotros):** se agregó `md:items-center` para que el bloque de texto y la imagen queden centrados verticalmente entre sí, en vez de que el texto arrancara arriba y la imagen quedara más abajo.
9. **"Hecho acá, para acá" reorganizada:** pasó de dos columnas con texto repartido de forma dispareja a una sola columna centrada (kicker, título y los tres párrafos en secuencia, `max-w-2xl` centrado).
10. **Se eliminó la sección "Cómo trabajamos"** de Nosotros — quedaba redundante después de reescribir "Por qué existimos" y ya la página cierra con el CTA final.
    11–16. **Todas las secciones de CTA final (`FinalCta`) ahora centran texto y botón** — afecta por igual a Home, Tipologías, El Sistema, A Medida, Nosotros y FAQ porque comparten el mismo componente.

## 2026-09-08 — Tercera ronda de ajustes

1. **Subtítulo del hero:** "Arquitectura contemporánea con materiales sólidos. Hormigón armado y concreto de alta performance."
2. **"Modelos" pasa a llamarse "Tipologías"** en toda la web: navegación, títulos de sección, FAQ, metadatos y la ruta, que ahora es `/tipologias` (y `/tipologias/crudo-01`, `/tipologias/crudo-02`). La carpeta de imágenes también pasó a `public/images/tipologias/`.
3. **Titular del hero más chico:** `display-xl` bajó de `clamp(2.6rem, 8.4vw, 7.5rem)` a `clamp(2.25rem, 6.4vw, 5.75rem)`.
4. **Foto de "Diseñamos" (pendiente):** se pidió un close-up de dos personas trabajando sobre un plano en mesa de arquitecto, buscándola en Unsplash. **No se pudo descargar: la política de red del entorno bloquea unsplash.com, images.unsplash.com y equivalentes (403 en el gateway).** Quedó el placeholder de muestras de concreto y un comentario en `lib/content.ts` marcando el reemplazo. Para resolverlo: dejar el archivo en `public/images/proceso/` y actualizar `src` y `alt` del primer paso de `processSteps`.
5. **Rediseño de El Sistema** para cortar la repetición de listas: el taller pasó a bloque Iron Black con grilla numerada de dos columnas (también en mobile) y las fotos sobre fondo negro; la lista de herrería se reemplazó por una frase corrida; y tecnología y materiales quedó en bloque claro con tratamiento tipográfico (apilado en mobile, corrido con separadores en desktop) en vez de lista con bordes.
6. **Bajada de Nosotros reescrita:** se eliminó "Es lo que es: mezcla, agua, tiempo y oficio" → ahora "Muestra de qué está hecho y envejece sin pedir permiso".

## 2026-09-08 — Segunda ronda de ajustes sobre la web ya desarrollada

1. **Titular del hero:** "Módulos y viviendas industriales." Imagen de portada: `Crudo 2 - A` (`crudo-02-exterior.jpg`).
2. **Fotos del proceso:** se reemplazaron las de bachas por fotos de producción con más carga de marca y relato (oficio, mezcla, pigmento, acabado). Diego confirmó que **todas las imágenes del repositorio se pueden usar**.
3. **Home más corta:** se eliminaron de la Home las secciones "Nuestro sistema" y "Por qué CRUDO" por repetitivas. Se unificaron en una sola sección llamada **"Nuestro Proceso"** que vive únicamente en la página **El Sistema**, con las cuatro etapas: diseño, fabricación, curación y construcción. La lista de cinco principios (Diseño/Control/Precisión/Eficiencia/Solidez) se eliminó: su contenido ya estaba dicho en las etapas del proceso.
4. **Páginas individuales por modelo:** `/modelos/crudo-01` y `/modelos/crudo-02`, cada una con todos los renders del proyecto. `/modelos` queda como índice. Estructura preparada para CRUDO 03, 04, etc. — alcanza con agregar el modelo en `lib/content.ts`.
5. **Copys acortados** en todas las páginas.

**Home final:** Hero → Qué es CRUDO → Modelos → Versatilidad → Proyectos a medida → CTA final.

## 2026-09-08 — Revisión estratégica inicial

**Decisiones tomadas / asumidas (a confirmar con Diego si no coincide):**

- El naming "CRUDO" y el manual de marca del brief se tratan como definitivos para esta ejecución — supera la nota del Contexto Maestro de "naming pendiente en chat aparte" (se asume que este es ese chat, o que el naming ya se cerró).
- Arquitectura de sitio: Home / Serie 01 / El Sistema / A Medida + FAQ como página propia enlazada desde nav y desde Home — ver propuesta de arquitectura entregada en la sesión.
- No se toca el posicionamiento de "no precios, no plazos absolutos" — se mantiene tal cual el brief.

**Preguntas abiertas (pendientes de respuesta de Diego):**

1. **Relación Loft Industrial (Contexto Maestro) ↔ CRUDO (este brief):** el Contexto Maestro define "Loft Industrial" como módulos de 18 m² y 27 m², producto de validación rápida y bajo costo. Los renders de CRUDO 02 muestran una vivienda completa con pileta, mucho más grande que 27 m². ¿CRUDO 01/02 son directamente esos módulos, o CRUDO ya evolucionó a un producto más grande/ambicioso que el descrito en el Contexto Maestro? Afecta directamente el copy de metros cuadrados y ambientes en la página Serie 01.
2. **Metros cuadrados y ambientes reales de CRUDO 01 y CRUDO 02:** el brief pide "metros cuadrados confirmados" en la página Serie 01 pero no los da. Necesarios antes de escribir esa página (no se pueden inventar).
3. **Assets faltantes:** no hay fotos macro específicas de celosías terminadas, revestimientos de pared instalados ni pisos de concreto. La sección "El Material" se puede armar con lo que hay (paneles, pigmentos, bachas) pero conviene definir si se espera a tener más fotos o se lanza con lo disponible.

Ver la respuesta completa de la sesión (veredicto estratégico A-B-C-D) en el historial de la conversación para el detalle de cada punto.

## 2026-09-08 — Respuestas de Diego a la revisión estratégica (decisiones cerradas)

1. **CRUDO 01 y CRUDO 02 son los modelos finales — no son los módulos de 18/27 m² del Contexto Maestro.** Hay que corregir el Contexto Maestro (queda pendiente, es un documento externo a este repo). Naming de tipología: CRUDO 02 = "vivienda estilo industrial", CRUDO 01 = "loft". Los m² y ambientes exactos de cada uno viven en el Manual de Marca real de Diego (fuera de este repo) — Claude no debe inventarlos, hay que pedirlos/pegarlos cuando estén disponibles.
2. FAQ #7: cambiar "siempre" por "generalmente".
3. Confirmado: escena única para "Versatilidad", no grilla de usos.
4. Confirmado: FAQ como página propia.
5. Confirmado: sin página de Equipo/Nosotros corporativa (bios de fundadores). Distinto de la nueva página "Nosotros" manifiesto (ver punto 11).
6. Confirmado: usar fotos reales de taller en "El Sistema".
7. Confirmado: CTA persistente en mobile.
8. **Eliminar el concepto "Serie 01" de la web — no van a existir "series".** Es CRUDO 01, CRUDO 02, y a futuro CRUDO 03, CRUDO 04... catálogo abierto y creciente, no una serie cerrada. Renombrar la página/nav en consecuencia (propuesta: "Modelos" o "Proyectos", a confirmar con Diego).
9. **La sección "El Material" de Home se redefine como "El Sistema" / proceso.** No es un solo material — es diseño + fabricación + curación + construcción como sistema integrado, con varios materiales adentro. La sección de Home debe transmitir "controlamos todo el proceso, de punta a punta, para un resultado óptimo" — no un mosaico de texturas.
10. Assets: armar la sección igual con lo que hay (paneles, pigmentos, bachas), enmarcado como sistema/proceso, no como "materiales". Diego va a ir pasando más fotos (celosías, revestimientos, pisos) para actualizar más adelante.
11. **Nueva página "Nosotros"** (manifiesto de marca): por qué hacemos lo que hacemos, los artesanos, la calidad, el concreto como material, identidad paraguaya (tierra, arena, piedra). Tono aspiracional, estudio de arquitectura intelectual/artista — no bio corporativa de fundadores. Referencias dadas por Diego: concrettidesigns.com/pages/about-us y co.konkretus.com/pages/nosotros (no se pudieron abrir en esta sesión por bloqueo de red del entorno — pendiente revisarlas manualmente o volver a intentar el fetch más adelante).
12. Pregunta de Diego sobre qué modelo/esfuerzo usar para desarrollar la web — respondida en el chat, no requiere entrada en este archivo.

**Arquitectura final de nav (actualizada):** CRUDO (logo) — Modelos — El Sistema — A Medida — Nosotros — FAQ · · · HABLEMOS → (botón).
