# CRUDO — web oficial

Next.js 16 (App Router) + TypeScript + Tailwind v4. Deploy a Vercel.

## Git

**Se trabaja directo sobre `main` — no crear ramas nuevas por sesión.** Vercel builda de `main`; es la rama de producción. Diego también sube archivos directo por la web de GitHub a veces: antes de asumir que `main` está al día, `git fetch origin main` y revisar si hay algo nuevo sin organizar (assets sueltos en la raíz sin pasar por `public/images/` o `context/crudo/referencias-visuales/`).

## Antes de tocar copy o diseño

Leé `context/` — es la fuente de verdad del proyecto y se mantiene actualizada:

- `context/crudo/brief-proyecto-web.md` — brief completo (estrategia, estructura, reglas).
- `context/crudo/manual-de-marca.html` — **Manual de Marca oficial**. Manda en todo diseño (logo, paleta, tipografía, imagen, tono). Wordmark vectorial: `public/logo/crudo-wordmark.svg`.
- `context/crudo/manual-marca.md` — resumen operativo de la web (paleta, tipografía, tono, CTAs, WhatsApp).
- `context/crudo/decisiones-y-preguntas.md` — decisiones cerradas y preguntas abiertas.
- `context/general/contexto-maestro-house-of-brands.md` — contexto del proyecto madre.

## Reglas de contenido no negociables

- No mostrar precios ni plazos de entrega específicos.
- No usar afirmaciones absolutas de velocidad ("siempre", "récord", "garantizado").
- No inventar certificaciones, testimonios, clientes ni proyectos construidos.
- No mencionar a la constructora madre, a Concrit ni a proveedores externos.
- Los proyectos se llaman **tipologías**, nunca "modelos" ni "Serie": son CRUDO 01, CRUDO 02, y a futuro 03, 04.
- Las specs de los modelos vienen del manual de marca; no se inventan ni se estiman de los renders.
- Nada de stock photography: solo renders propios y fotos reales de taller.

## Propuestas comerciales en PDF

Las propuestas que se mandan por WhatsApp salen de `data/models.json` y `data/contact.json` con `npm run build:pdf` (ver `pdf/README.md`). Ahí sí van precio cerrado y plazo desde la palada: es la excepción a la regla de la web. Los datos de las planillas de presupuesto mandan sobre los de la web.

## Convenciones de código

- Colores y tipografía como tokens en `app/globals.css` (`@theme`): `iron`, `cement`, `alabaster`, `muted`, `hairline`.
- Clases tipográficas propias: `display-xl`, `display-lg`, `display-md`, `kicker`, `lede`, `body-text`, `shell`.
- Todos los links de WhatsApp salen de `lib/whatsapp.ts` — no hardcodear el número.
- Contenido estructurado (tipologías, FAQ, proceso) vive en `lib/content.ts`.
- Sin sombras, gradientes ni bordes redondeados: composición editorial, hairlines y grid.

## Comandos

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # eslint
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
