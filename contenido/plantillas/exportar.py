"""Exporta las piezas de contenido de CRUDO a PNG.

Lee todos los textos y números de ../datos/modelos.json, resuelve los
marcadores {modelo.campo}, renderiza cada plantilla HTML con Playwright
(Chromium) y guarda los PNG en ../salidas/. Además deja en
../salidas/manifiesto.json lo que necesita verificar.py: textos de cada
pieza, cajas de texto y logo, y luminosidad del fondo bajo cada texto.

Uso: python exportar.py            (todas las piezas)
     python exportar.py O2_crudo04 (solo las piezas cuyo id empieza así)
"""
import io
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
PLANTILLAS = RAIZ / "plantillas"
SALIDAS = RAIZ / "salidas"
CHROMIUM = "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"
ALTO_CSS = {"4x5": 675, "9x16": 960}


def gs(n):
    return "Gs " + f"{n:,}".replace(",", ".")


def contexto(datos):
    ctx = {"contacto": datos["contacto"], "condiciones": datos["condiciones"]}
    for clave, m in datos["modelos"].items():
        d = dict(m)
        d["superficie"] = f"{m['superficie_m2']} m²"
        d["precio"] = gs(m["precio_gs"])
        d["tipologia_min"] = m["tipologia"].lower()
        d["plazo_mayus"] = m["plazo"].upper()
        d["nombre_titulo"] = m["nombre"]
        ctx[clave] = d
    return ctx


def resolver(texto, ctx, modelo=None):
    def rep(mt):
        grupo, campo = mt.group(1), mt.group(2)
        fuente = ctx[modelo] if grupo == "m" else ctx[grupo]
        valor = fuente[campo]
        if isinstance(valor, list):
            raise ValueError(f"{grupo}.{campo} es una lista")
        return str(valor)

    return re.sub(r"\{(\w+)\.(\w+)\}", rep, texto)


def lum_lab(rgb):
    """Luminosidad L* (0-100) por píxel."""
    c = rgb.astype(np.float64) / 255
    lin = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    y = lin @ np.array([0.2126, 0.7152, 0.0722])
    f = np.where(y > 216 / 24389, np.cbrt(y), (24389 / 27 * y + 16) / 116)
    return 116 * f - 16


def piezas_a_exportar(datos, ctx):
    """Devuelve (salida, plantilla, formato, datos_plantilla, meta) por PNG."""
    out = []
    for pz in datos["piezas"]:
        carpeta = pz["carpeta"]
        if pz["plantilla"] == "ficha":
            for i, lam in enumerate(pz["laminas"], 1):
                d = {"tipo": lam["tipo"], "formato": "4x5"}
                modelos = []
                if lam["tipo"] == "portada":
                    d["renders"] = lam["renders"]
                    for k in ("kicker", "titular", "dato", "etiqueta"):
                        d[k] = resolver(lam[k], ctx)
                    modelos = [r["modelo"] for r in lam["renders"]]
                    etiquetas = [d["etiqueta"]]
                elif lam["tipo"] == "modelo":
                    m = ctx[lam["modelo"]]
                    d.update(render=lam["render"], encuadre=lam["encuadre"], etiqueta=m["etiqueta"],
                             kicker=f"{m['nombre']} · {m['superficie']}", titular=m["tipologia"].upper(),
                             filas=[["Programa", " · ".join(m["destacados"])],
                                    ["Plazo", f"{m['plazo']} desde la palada inicial"],
                                    ["Precio cerrado", f"{m['precio']} IVA incl."]])
                    modelos = [lam["modelo"]]
                    etiquetas = [m["etiqueta"]]
                else:
                    for k in ("kicker", "texto", "cta", "cta_dato"):
                        d[k] = resolver(lam[k], ctx)
                    etiquetas = []
                nombre = f"{pz['id']}_L{i}_4x5.png"
                meta = {"pieza": pz["id"], "lamina": i, "modelos": modelos, "etiquetas_requeridas": etiquetas,
                        "copy": resolver(pz["copy"], ctx) if i == 1 else None}
                out.append((SALIDAS / carpeta / nombre, "ficha", "4x5", d, meta))
            continue

        variantes = [dict(id=pz["id"])] + pz.get("variantes", [])
        for var in variantes:
            base = {**pz, **var}
            mid = base["modelo"]
            m = ctx[mid]
            for fmt in base["formatos"]:
                d = {"formato": fmt, "render": base["render"], "encuadre": base["encuadre"],
                     "etiqueta": m["etiqueta"], "kicker": resolver(base["kicker"], ctx, mid)}
                for k in ("titular", "dato"):
                    if k in base:
                        d[k] = resolver(base[k], ctx, mid)
                meta = {"pieza": var["id"], "modelos": [mid], "etiquetas_requeridas": [m["etiqueta"]],
                        "copy": resolver(base["copy"], ctx, mid) if "copy" in base else None,
                        "anuncio": {k: resolver(v, ctx, mid) for k, v in base["anuncio"].items()}
                        if "anuncio" in base else None}
                out.append((SALIDAS / base["carpeta"] / f"{var['id']}_{fmt}.png", base["plantilla"], fmt, d, meta))
    return out


def main(filtro=None):
    datos = json.loads((RAIZ / "datos" / "modelos.json").read_text(encoding="utf-8"))
    ctx = contexto(datos)
    trabajos = piezas_a_exportar(datos, ctx)
    if filtro:
        trabajos = [t for t in trabajos if t[4]["pieza"].startswith(filtro)]
    manifiesto_path = SALIDAS / "manifiesto.json"
    manifiesto = json.loads(manifiesto_path.read_text()) if (filtro and manifiesto_path.exists()) else {}

    with sync_playwright() as pw:
        nav = pw.chromium.launch(executable_path=CHROMIUM, args=["--allow-file-access-from-files"])
        for salida, plantilla, fmt, d, meta in trabajos:
            pag = nav.new_page(viewport={"width": 540, "height": ALTO_CSS[fmt]}, device_scale_factor=2)
            pag.goto((PLANTILLAS / f"{plantilla}.html").as_uri())
            pag.evaluate("d => window.render(d)", d)
            pag.wait_for_timeout(150)
            pieza = pag.locator(".pieza")
            png = pieza.screenshot()
            cajas = pag.evaluate("""() => {
              const r = [];
              document.querySelectorAll('[data-texto],[data-logo]').forEach(e => {
                const b = e.getBoundingClientRect();
                r.push({tipo: e.hasAttribute('data-logo') ? 'logo' : 'texto', texto: e.textContent,
                        sobre_imagen: e.hasAttribute('data-sobre-imagen'), clase: e.className,
                        x: b.x * 2, y: b.y * 2, w: b.width * 2, h: b.height * 2});
              });
              return r;
            }""")
            # fondo sin textos ni logo, para medir la luminosidad bajo cada uno
            pag.add_style_tag(content="[data-texto],[data-logo]{visibility:hidden!important}")
            fondo = np.asarray(Image.open(io.BytesIO(pieza.screenshot())).convert("RGB"))
            for c in cajas:
                x0, y0 = max(int(c["x"]) - 4, 0), max(int(c["y"]) - 4, 0)
                x1, y1 = int(c["x"] + c["w"]) + 4, int(c["y"] + c["h"]) + 4
                L = lum_lab(fondo[y0:y1, x0:x1].reshape(-1, 3))
                c["fondo_L_media"] = round(float(L.mean()), 1)
                c["fondo_L_p90"] = round(float(np.percentile(L, 90)), 1)
            pag.close()

            salida.parent.mkdir(parents=True, exist_ok=True)
            # se vuelve a guardar sin metadatos (sin chunks de texto)
            Image.open(io.BytesIO(png)).convert("RGB").save(salida, optimize=True)
            manifiesto[str(salida.relative_to(RAIZ))] = {**meta, "formato": fmt, "plantilla": plantilla,
                                                         "render": d.get("render") or [r["render"] for r in d.get("renders", [])],
                                                         "cajas": cajas}
            print("✓", salida.relative_to(RAIZ))
        nav.close()

    manifiesto_path.write_text(json.dumps(manifiesto, ensure_ascii=False, indent=1), encoding="utf-8")
    escribir_textos(manifiesto)


def escribir_textos(manifiesto):
    """Copys de publicación y textos de anuncio, uno por pieza."""
    vistos, lineas = set(), ["# Textos de publicación\n", "Generado por `plantillas/exportar.py` desde `datos/modelos.json`. No editar a mano.\n"]
    for ruta, m in manifiesto.items():
        if m["pieza"] in vistos or not (m.get("copy") or m.get("anuncio")):
            continue
        vistos.add(m["pieza"])
        lineas.append(f"\n## {m['pieza']}\n")
        if m.get("copy"):
            lineas.append(f"**Copy:** {m['copy']}\n")
        if m.get("anuncio"):
            a = m["anuncio"]
            lineas.append(f"**Texto principal:** {a['texto_principal']}\n\n**Título del anuncio:** {a['titulo']}\n\n**Botón:** {a['cta']}\n")
    (SALIDAS / "textos.md").write_text("\n".join(lineas), encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
