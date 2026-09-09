# CRUDO — Decisiones y preguntas abiertas

> Registro vivo. Agregar entradas nuevas arriba, con fecha. No borrar historial.

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
