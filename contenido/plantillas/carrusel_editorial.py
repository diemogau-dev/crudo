"""Carrusel editorial de 3 láminas por tipología (formato aprobado por Diego
el 23/10 con CRUDO 01): portada con grilla asimétrica de seis renders,
exterior a sangre y close-up a sangre. Logo chico arriba a la derecha.

Uso: python carrusel_editorial.py            (las cuatro tipologías)
     python carrusel_editorial.py crudo02    (una sola)
Salida: ../salidas/carrusel-crudo0X/crudo0X_carrusel_{1,2,3}.png (1080 × 1350)
"""
import io
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
CHROMIUM = "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"

# Posiciones de la grilla de la portada (x, y) — misma composición en las cuatro.
CELDAS = [(97, 272), (343, 272), (97, 625), (803, 625), (555, 981), (803, 981)]

TIPOLOGIAS = {
    "crudo01": {
        "titulo": ["El", "refugio", "que", "buscabas"],
        "col1": ["Hormigón", "31 m²"], "col2": ["armado", "Loft"],
        "frase_media": ["Despertar", "frente al verde"],
        "pie": ["1 hab", "1 baño", "deck"],
        "grilla": [("1-campo", "31% 62%"), ("1-e", "62% 50%"), ("1-i", "72% 50%"),
                   ("1-k", "58% 50%"), ("1-d", "58% 50%"), ("1-l", "50% 72%")],
        "exterior": ("1-campo", "27% 50%"),
        "exterior_texto": ["Tu refugio de fin de semana", "Concreto arquitectónico"],
        "closeup": ("1-e", "58% 50%"),
    },
    "crudo02": {
        "titulo": ["Todo", "a", "un", "paso"],
        "col1": ["Hormigón", "26 m²"], "col2": ["armado", "Loft"],
        "frase_media": ["Cocinás, dormís", "y salís al deck"],
        "pie": ["1 hab", "1 baño", "kitchenette", "deck"],
        "grilla": [("2-a", "40% 50%"), ("2-b", "62% 50%"), ("2-g", "62% 50%"),
                   ("2-c", "45% 50%"), ("2-e", "50% 50%"), ("2-f", "50% 50%")],
        "exterior": ("2-a", "42% 50%"),
        "exterior_texto": ["Kitchenette, deck y cobogós", "Concreto arquitectónico"],
        "closeup": ("2-e", "48% 50%"),
    },
    "crudo03": {
        "titulo": ["Una", "casa", "para", "quedarse"],
        "col1": ["Hormigón", "66 m²"], "col2": ["armado", "2 hab"],
        "frase_media": ["Un estar que", "se abre afuera"],
        "pie": ["2 hab", "1 baño", "cocina con isla"],
        "grilla": [("3-a", "58% 50%"), ("3-c", "40% 50%"), ("3-d", "60% 50%"),
                   ("3-f", "60% 50%"), ("3-h", "62% 50%"), ("3-g", "55% 50%")],
        "exterior": ("3-a", "60% 50%"),
        "exterior_texto": ["Dos dormitorios y cocina con isla", "Concreto arquitectónico"],
        "closeup": ("3-f", "62% 50%"),
    },
    "crudo04": {
        "titulo": ["Tu", "casa", "de", "verano"],
        "col1": ["Hormigón", "85 m²"], "col2": ["armado", "2 hab"],
        "frase_media": ["La parrilla y los cobogós", "ya vienen con la casa"],
        "pie": ["2 hab", "1 baño", "quincho", "deck"],
        "grilla": [("4-a", "50% 55%"), ("4-c", "72% 50%"), ("4-b", "45% 50%"),
                   ("4-e", "30% 50%"), ("4-h", "50% 50%"), ("4-f", "55% 50%")],
        "exterior": ("4-a", "50% 55%"),
        "exterior_texto": ["Quincho con parrilla y deck", "Concreto arquitectónico"],
        "closeup": ("4-h", "50% 50%"),
        "closeup_claro": True,  # pared y cuadro claros arriba: logo oscuro, sin velo
    },
}


def render(clave):
    """Ruta del render: la versión ampliada si existe, si no la de la web."""
    n, letra = clave.split("-", 1)
    amp = RAIZ / "renders-aprobados" / f"crudo-0{n}" / f"crudo-{n}-{letra}.jpg"
    if amp.exists():
        return amp.as_uri()
    web = sorted((RAIZ.parent / "public/images/renders" / f"crudo-{n}").glob(f"crudo-{n}-{letra}.*"))
    return web[0].as_uri()


def texto(lineas):
    return "<br>".join(l.replace("m²", '<span class="nocaps">m²</span>') for l in lineas)


def html(clave, t):
    nombre = clave.replace("crudo", "Crudo ")
    sup = t["col1"][1]
    logo_iron = (RAIZ.parent / "public/logo/crudo-wordmark-iron.png").as_uri()
    logo_ala = (RAIZ.parent / "public/logo/crudo-wordmark-alabaster.png").as_uri()
    fuente = (RAIZ / "plantillas/fuentes/Archivo-latin.woff2").as_uri()
    grilla = "\n".join(
        f'<img class="foto" src="{render(r)}" style="left:{x}px;top:{y}px;width:214px;height:298px;object-position:{pos}">'
        for (x, y), (r, pos) in zip(CELDAS, t["grilla"]))
    claro = t.get("closeup_claro", False)
    logo_l3 = logo_iron if claro else logo_ala
    velo_l3 = "" if claro else '<div class="velo" style="top:0;height:220px;background:linear-gradient(to bottom, rgb(26 26 26 / 0.35), rgb(26 26 26 / 0))"></div>'
    spans = lambda ws: "".join(f"<span>{w}</span>" for w in ws)
    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face {{ font-family: "Archivo"; src: url("{fuente}") format("woff2"); font-weight: 100 900; }}
:root {{ --iron: #1a1a1a; --alabaster: #f5f5f3; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
.lam {{ position: relative; width: 1080px; height: 1350px; overflow: hidden; background: var(--alabaster); color: var(--iron);
       font-family: "Archivo", sans-serif; font-weight: 500; text-transform: uppercase; -webkit-font-smoothing: antialiased; }}
.t {{ position: absolute; font-size: 17px; line-height: 1.2; letter-spacing: -0.01em; }}
.palabras {{ position: absolute; display: flex; }}
.foto {{ position: absolute; object-fit: cover; display: block; }}
.nocaps {{ text-transform: none; }}
.oscura {{ color: var(--alabaster); }}
.logo {{ position: absolute; width: 112px; height: auto; display: block; }}
.velo {{ position: absolute; left: 0; width: 1080px; }}
</style></head><body>

<section class="lam" id="l1">
  <div class="palabras" style="left:97px;top:112px;font-size:38px;letter-spacing:-0.02em;gap:46px">{spans(t["titulo"])}</div>
  <img class="logo" src="{logo_iron}" style="right:63px;top:116px">
  {grilla}
  <div class="t" style="left:880px;top:268px">{texto(t["col1"])}</div>
  <div class="t" style="left:990px;top:268px">{texto(t["col2"])}</div>
  <div class="t" style="left:327px;top:622px">{texto(t["frase_media"])}</div>
  <div class="t" style="right:539px;top:978px;text-align:right">Cada pieza es fabricada por Crudo</div>
  <div class="palabras" style="left:81px;top:1262px;font-size:17px;gap:40px">{spans(t["pie"])}</div>
</section>

<section class="lam oscura" id="l2">
  <img class="foto" src="{render(t["exterior"][0])}" style="left:0;top:0;width:1080px;height:1350px;object-position:{t["exterior"][1]}">
  <div class="velo" style="top:0;height:300px;background:linear-gradient(to bottom, rgb(26 26 26 / 0.5), rgb(26 26 26 / 0))"></div>
  <div class="velo" style="bottom:0;height:260px;background:linear-gradient(to top, rgb(26 26 26 / 0.42), rgb(26 26 26 / 0))"></div>
  <div class="t" style="left:47px;top:66px;font-size:19px">{nombre}<br>{texto([sup])}</div>
  <div class="t" style="left:420px;top:66px;font-size:19px">{texto(t["exterior_texto"])}</div>
  <img class="logo" src="{logo_ala}" style="right:47px;top:66px">
  <div class="palabras" style="left:0;right:0;justify-content:center;top:1296px;font-size:19px;gap:40px">{spans(["Un", "sistema,", "no", "una", "obra"])}</div>
</section>

<section class="lam" id="l3">
  <img class="foto" src="{render(t["closeup"][0])}" style="left:0;top:0;width:1080px;height:1350px;object-position:{t["closeup"][1]}">
  {velo_l3}
  <img class="logo" src="{logo_l3}" style="right:47px;top:66px">
</section>
</body></html>"""


def main(solo=None):
    with sync_playwright() as pw:
        nav = pw.chromium.launch(executable_path=CHROMIUM, args=["--allow-file-access-from-files"])
        for clave, t in TIPOLOGIAS.items():
            if solo and clave != solo:
                continue
            fuente = RAIZ / "plantillas" / f"_carrusel_{clave}.html"
            fuente.write_text(html(clave, t), encoding="utf-8")
            pag = nav.new_page(viewport={"width": 1080, "height": 1350})
            pag.goto(fuente.as_uri())
            pag.wait_for_load_state("networkidle")
            pag.evaluate("document.fonts.ready")
            salida = RAIZ / "salidas" / f"carrusel-{clave}"
            salida.mkdir(parents=True, exist_ok=True)
            for i in (1, 2, 3):
                png = pag.locator(f"#l{i}").screenshot()
                Image.open(io.BytesIO(png)).convert("RGB").save(salida / f"{clave}_carrusel_{i}.png", optimize=True)
            pag.close()
            fuente.unlink()
            print("✓", clave)
        nav.close()


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
