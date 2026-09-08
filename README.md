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
app/                 rutas: / · /modelos · /sistema · /a-medida · /nosotros · /faq
components/ui/       Cta, Reveal
components/site/     Nav, Footer, StickyCta
components/sections/ Hero, ModelCard, Versatility, PageHeader, FinalCta
lib/content.ts       modelos, FAQ, proceso, principios, navegación
lib/whatsapp.ts      links de WhatsApp con mensaje predefinido por contexto
public/images/       renders de los modelos y fotos de taller
context/             brief, manual de marca, contexto maestro y decisiones
```

## Assets

- `public/images/modelos/` — renders de CRUDO 01 y CRUDO 02.
- `public/images/taller/` — fotos reales de producción propia.
- `context/crudo/referencias-visuales/` — imágenes de referencia visual **que no se publican**: su origen está sin confirmar y no deben usarse en el sitio hasta verificar que son propias.

## Pendientes

Ver `context/crudo/decisiones-y-preguntas.md`.
