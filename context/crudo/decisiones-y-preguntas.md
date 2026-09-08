# CRUDO — Decisiones y preguntas abiertas

> Registro vivo. Agregar entradas nuevas arriba, con fecha. No borrar historial.

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
