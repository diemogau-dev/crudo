# CRUDO

Web oficial de **CRUDO — Arquitectura & Concreto**.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · listo para deploy en Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

## Estructura

```
app/                 rutas: / · /tipologias · /sistema · /a-medida · /nosotros · /faq
components/ui/       Cta, Reveal
components/site/     Nav, Footer, StickyCta
components/sections/ Hero, ModelCard, Versatility, PageHeader, FinalCta
lib/content.ts       tipologías, FAQ, proceso, navegación
lib/whatsapp.ts      links de WhatsApp con mensaje predefinido por contexto
public/images/       renders de las tipologías y fotos de proceso/taller
context/             brief, manual de marca, contexto maestro y decisiones
```

## Assets

- `public/images/tipologias/` — renders de CRUDO 01 y CRUDO 02.
- `public/images/proceso/` — fotos de proceso y taller usadas en El Sistema y Nosotros.
- `public/images/taller/` — fotos reales de producción propia.
- `context/crudo/referencias-visuales/` — fotos de producto todavía sin usar en el sitio.

## Pendientes

Ver `context/crudo/decisiones-y-preguntas.md`.
