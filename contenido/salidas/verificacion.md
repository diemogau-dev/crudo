# Verificación automática

Generado por `plantillas/verificar.py`. Controles: números y textos contra `datos/modelos.json`, términos prohibidos, «desde la palada inicial», etiqueta «Imagen referencial», contraste (L* medio ≤ 45 bajo texto o logo sobre render), márgenes de 64 px, zonas seguras de 9:16, logo (≥ 96 px y zona de seguridad), metadatos y nombres de archivo.

| Pieza | Resultado | L* máx. bajo texto/logo |
|---|---|---|
| `salidas/organico/O2_crudo04_4x5.png` | OK | 9.3 |
| `salidas/organico/O2_crudo04_9x16.png` | OK | 9.3 |
| `salidas/organico/O4_cuatro-crudo_L1_4x5.png` | OK | 9.3 |
| `salidas/organico/O4_cuatro-crudo_L2_4x5.png` | OK | 24.1 |
| `salidas/organico/O4_cuatro-crudo_L3_4x5.png` | OK | 22.9 |
| `salidas/organico/O4_cuatro-crudo_L4_4x5.png` | OK | 25.2 |
| `salidas/organico/O4_cuatro-crudo_L5_4x5.png` | OK | 22.4 |
| `salidas/organico/O4_cuatro-crudo_L6_4x5.png` | OK | 9.3 |
| `salidas/anuncios/A1_precio-cerrado_4x5.png` | OK | 9.3 |
| `salidas/anuncios/A1_precio-cerrado_9x16.png` | OK | 9.3 |
| `salidas/anuncios/A1a_lista-en-2-meses_4x5.png` | OK | 9.3 |
| `salidas/anuncios/A1a_lista-en-2-meses_9x16.png` | OK | 9.3 |
| `salidas/anuncios/A1b_quincho_4x5.png` | OK | 9.3 |
| `salidas/anuncios/A1b_quincho_9x16.png` | OK | 9.3 |
| `salidas/anuncios/A1c_sin-precio_4x5.png` | OK | 9.3 |
| `salidas/anuncios/A1c_sin-precio_9x16.png` | OK | 9.3 |

Nombres de archivo: OK
