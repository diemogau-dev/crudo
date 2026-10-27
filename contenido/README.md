# Contenido de CRUDO para Instagram y Meta Ads

Material de producción de las gráficas. No forma parte de la web (está excluido de ESLint).

```
contenido/
  datos/modelos.json        única fuente de textos y números de las piezas
  renders-aprobados/        renders aprobados por Diego, ampliados ×2 (crudo-01 … crudo-04)
  plantillas/               HTML/CSS (fuente Archivo local) + exportar.py + verificar.py
  herramientas/             ampliación con IA y retoque de la marca de agua de Gemini
  salidas/organico/         piezas orgánicas (PNG)
  salidas/anuncios/         piezas de anuncio (PNG)
  salidas/textos.md         copys y textos de anuncio, generados desde modelos.json
  salidas/verificacion.md   resultado de los controles automáticos
  propuestas/               propuestas comerciales en PDF (ver propuestas/README.md)
  reporte-verificacion.md   etapa 1 · seleccion-renders.md: etapa 2 · piloto.md: etapa 3
  hoja-contactos-crudo-0X.png
```

## Cambiar un precio o un texto

1. Editá `datos/modelos.json` (por ejemplo `modelos.crudo04.precio_gs`).
2. Exportá y verificá:

```bash
python plantillas/exportar.py          # todas las piezas (o un prefijo: exportar.py A1)
python plantillas/verificar.py         # falla con código 1 si algún control no pasa
```

Requisitos: Python 3 con `playwright`, `pillow` y `numpy`, y Chromium (en este entorno, en `/opt/pw-browsers`; si cambia, ajustá `CHROMIUM` en `exportar.py`).

## Lienzo

Las plantillas se dibujan a 540 px CSS de ancho y se exportan con densidad 2×: 1080 × 1350 (4:5) y 1080 × 1920 (9:16). Los tamaños del manual (kicker 11 px, etiqueta 10 px, márgenes de 64 px en 1080) rinden así a escala de pantalla de teléfono.

## Ampliación y retoque

- `herramientas/ampliar.py`: Real-ESRGAN ×2 (CPU, por mosaicos) mezclado al 80 % con un Lanczos del original, para ganar nitidez sin el aspecto "pintado" del modelo puro. Requiere `torch` (CPU), `torchvision` y `spandrel`.
- `herramientas/quitar_marca_de_agua.py`: tapa la estrella de Gemini (a ~61 × 62 px de la esquina inferior derecha) con un parche de la misma imagen.
