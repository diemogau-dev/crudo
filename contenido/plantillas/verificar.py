"""Controles automáticos antes de entregar (sección 7 del brief).

Lee ../salidas/manifiesto.json (lo escribe exportar.py) y ../datos/modelos.json
y revisa cada PNG. Escribe ../salidas/verificacion.md y sale con código 1
si algún control falla.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
TAM = {"4x5": (1080, 1350), "9x16": (1080, 1920)}
MARGEN = 64
LUM_MAX = 45.0  # L* medio del fondo bajo texto o logo apoyado en render
PROHIBIDOS = [
    "casa de tus sueños", "confort que merecés", "rápido y económico", "lujo", "exclusiv",
    "rentabilidad", "retorno", "ocupación", "28 días", "serie", "concrit", "gnesis", "fernando",
    "garantizad", "récord", "siempre", "modelo", "en tiempo",
]
NOMBRES_ARCHIVO = ["concrit", "gnesis", "fernando", "gemini", "maccini"]


def gs(n):
    return "Gs " + f"{n:,}".replace(",", ".")


def cruce(texto, modelos_pieza, datos, errores, donde):
    """Números del texto contra la tabla: m², Gs y plazos."""
    ms = datos["modelos"]
    sup_ok = {m["superficie_m2"] for k, m in ms.items() if k in modelos_pieza}
    for n in re.findall(r"(\d+)\s*m²", texto):
        if int(n) not in sup_ok:
            errores.append(f"{donde}: superficie {n} m² no corresponde a {', '.join(modelos_pieza) or 'ningún modelo'}")
    precios_ok = {gs(m["precio_gs"]) for k, m in ms.items() if k in modelos_pieza}
    for p in re.findall(r"Gs\.? [\d.]+", texto):
        if p.replace("Gs.", "Gs") not in precios_ok:
            errores.append(f"{donde}: precio {p} no corresponde a {', '.join(modelos_pieza)}")
        if "IVA" not in texto:
            errores.append(f"{donde}: precio sin «IVA incl.»")
    plazos_ok = {ms[k]["plazo"] for k in modelos_pieza}
    for cant, unidad in re.findall(r"(\d+) (días|meses)", texto, flags=re.I):
        t = f"{cant} {unidad.lower()}"
        if t == "12 meses" and "garantía" in texto.lower():
            continue
        if t not in plazos_ok:
            errores.append(f"{donde}: plazo «{t}» no corresponde a {', '.join(modelos_pieza)}")
        elif "palada inicial" not in texto:
            errores.append(f"{donde}: «{t}» sin «desde la palada inicial»")
    low = texto.lower()
    for w in PROHIBIDOS:
        if w in low:
            errores.append(f"{donde}: término prohibido «{w}»")


def cruza(a, b):
    return not (a[2] <= b[0] or b[2] <= a[0] or a[3] <= b[1] or b[3] <= a[1])


def main():
    datos = json.loads((RAIZ / "datos" / "modelos.json").read_text(encoding="utf-8"))
    man = json.loads((RAIZ / "salidas" / "manifiesto.json").read_text(encoding="utf-8"))
    filas, fallas = [], 0

    for ruta, m in man.items():
        err, notas = [], []
        W, H = TAM[m["formato"]]
        im = Image.open(RAIZ / ruta)
        if im.size != (W, H):
            err.append(f"tamaño {im.size}, se esperaba {(W, H)}")
        meta = {k: v for k, v in im.info.items() if k not in ("dpi",)}
        if meta:
            err.append(f"metadatos en el PNG: {list(meta)}")

        textos = [c for c in m["cajas"] if c["tipo"] == "texto"]
        logos = [c for c in m["cajas"] if c["tipo"] == "logo"]
        grafica = " ".join(c["texto"] for c in textos)

        # 1. números y textos contra la tabla
        cruce(grafica, m["modelos"], datos, err, "gráfica")
        if m.get("copy"):
            cruce(m["copy"], m["modelos"], datos, err, "copy")
        if m.get("anuncio"):
            cruce(" ".join(m["anuncio"].values()), m["modelos"], datos, err, "anuncio")

        # 2. etiqueta obligatoria en todo render
        etiquetas = [c["texto"] for c in textos if "etiqueta" in c["clase"]]
        for req in m["etiquetas_requeridas"]:
            if req not in etiquetas:
                err.append(f"falta la etiqueta «{req}»")
        if m["render"] and not any(e.lower().startswith("imagen") for e in etiquetas):
            err.append("pieza con render sin «Imagen referencial»")

        # 3. contraste: fondo bajo texto apoyado en render y bajo el logo
        for c in textos + logos:
            if c["sobre_imagen"] or c["tipo"] == "logo":
                if c["fondo_L_media"] > LUM_MAX:
                    err.append(f"contraste: fondo L* {c['fondo_L_media']} > {LUM_MAX} bajo «{(c['texto'] or 'logo')[:30]}»")
        lum_max = max([c["fondo_L_media"] for c in textos + logos if c["sobre_imagen"] or c["tipo"] == "logo"] or [0])

        # 4. márgenes y zonas seguras
        for c in textos + logos:
            x0, y0, x1, y1 = c["x"], c["y"], c["x"] + c["w"], c["y"] + c["h"]
            nombre = (c["texto"] or "logo")[:30]
            if x0 < MARGEN - 0.5 or x1 > W - MARGEN + 0.5 or y0 < MARGEN - 0.5 or y1 > H - MARGEN + 0.5:
                err.append(f"margen de 64 px: «{nombre}»")
            if m["formato"] == "9x16":
                if y0 < 0.14 * H or y1 > 0.80 * H:
                    err.append(f"9:16 fuera de la zona segura vertical: «{nombre}»")
                if c["tipo"] == "texto" and x1 > W - 160:
                    err.append(f"9:16 texto en el margen derecho: «{nombre}»")
        # texto en la mitad inferior (salvo kicker superior)
        for c in textos:
            if c["y"] < H / 2 and not ("kicker" in c["clase"] and c["y"] < 0.15 * H) and "etiqueta" not in c["clase"]:
                if m["plantilla"] != "ficha" or m.get("lamina") in (1, 6):
                    err.append(f"texto en la mitad superior: «{c['texto'][:30]}»")

        # 5. logo: tamaño mínimo y zona de seguridad (altura de la C ≈ 0,9 × alto)
        for lg in logos:
            if lg["w"] < 96:
                err.append(f"logo de {lg['w']:.0f} px, mínimo 96")
            X = 0.9 * lg["h"]
            zona = (lg["x"] - X, lg["y"] - X, lg["x"] + lg["w"] + X, lg["y"] + lg["h"] + X)
            for c in textos:
                if cruza(zona, (c["x"], c["y"], c["x"] + c["w"], c["y"] + c["h"])):
                    err.append(f"«{c['texto'][:30]}» invade la zona de seguridad del logo")
            if zona[0] < 0 or zona[1] < 0 or zona[2] > W or zona[3] > H:
                err.append("la zona de seguridad del logo sale del lienzo")
        if not logos and m["plantilla"] != "ficha":
            err.append("pieza sin logo")

        # 6. renders usados: existen, sin EXIF y sin nombres de terceros
        renders = m["render"] if isinstance(m["render"], list) else ([m["render"]] if m["render"] else [])
        for r in renders:
            f = RAIZ / "renders-aprobados" / r
            if not f.exists():
                err.append(f"no existe {r}")
            elif Image.open(f).getexif():
                err.append(f"{r} tiene EXIF")

        fallas += bool(err)
        filas.append((ruta, err, lum_max))

    # nombres de archivo de todo el entregable
    otros = []
    for f in RAIZ.rglob("*"):
        low = f.name.lower()
        for n in NOMBRES_ARCHIVO:
            if n in low:
                otros.append(f"archivo con nombre de tercero: {f.relative_to(RAIZ)}")
    fallas += bool(otros)

    out = ["# Verificación automática\n", "Generado por `plantillas/verificar.py`. Controles: números y textos contra `datos/modelos.json`, términos prohibidos, «desde la palada inicial», etiqueta «Imagen referencial», contraste (L* medio ≤ 45 bajo texto o logo sobre render), márgenes de 64 px, zonas seguras de 9:16, logo (≥ 96 px y zona de seguridad), metadatos y nombres de archivo.\n",
           "| Pieza | Resultado | L* máx. bajo texto/logo |", "|---|---|---|"]
    for ruta, err, lum in filas:
        out.append(f"| `{ruta}` | {'OK' if not err else 'FALLA: ' + '; '.join(err)} | {lum:.1f} |")
    out.append("\n" + ("Nombres de archivo: OK" if not otros else "\n".join(otros)))
    (RAIZ / "salidas" / "verificacion.md").write_text("\n".join(out) + "\n", encoding="utf-8")
    print("\n".join(out))
    sys.exit(1 if fallas else 0)


if __name__ == "__main__":
    main()
