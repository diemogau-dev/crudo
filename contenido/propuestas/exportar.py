"""Exporta las propuestas comerciales de CRUDO a PDF.

Uso (desde contenido/propuestas):
    python exportar.py                                  # las cuatro, genéricas
    python exportar.py 03                               # solo CRUDO 03
    python exportar.py 03 --cliente "María González"    # a nombre de un cliente, con fecha

Lee datos.json, arma cada propuesta con propuesta.html + propuesta.css y la
imprime con Chromium a 1080 × 1920 px CSS (810 × 1440 pt). Los PDF quedan en
salidas/, con el mismo nombre que se sube a Drive. Con --cliente, la portada
dice «Propuesta para …» con la fecha de hoy, el precio vence a los 15 días y el
PDF va a salidas/clientes/ (no se versiona).
"""

import argparse
import datetime
import io
import json
import urllib.parse
from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter

AQUI = Path(__file__).resolve().parent
SALIDAS = AQUI / "salidas"
CHROMIUM = "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome"


def gs(valor):
    return "Gs " + f"{valor:,}".replace(",", ".")


def armar_html(entorno, datos, c, cliente=None):
    texto_wa = f"Hola! Quiero armar mi Crudo {c['numero']}"
    wa = f"https://wa.me/{datos['comun']['whatsapp']}?text=" + urllib.parse.quote(texto_wa)
    return entorno.get_template("propuesta.html").render(
        c=c,
        comun=datos["comun"],
        precio=gs(c["precio_gs"]),
        wa=wa,
        cliente=cliente,
        logo_svg=Markup((AQUI / "logo.svg").read_text(encoding="utf-8")),
    )


def main():
    datos = json.loads((AQUI / "datos.json").read_text(encoding="utf-8"))
    args = argparse.ArgumentParser(description="Exporta las propuestas comerciales a PDF.")
    args.add_argument("numeros", nargs="*", help="números de CRUDO a exportar (por ejemplo 01 03); vacío = todos")
    args.add_argument("--cliente", help="nombre del cliente para una propuesta personalizada")
    args = args.parse_args()
    filtro = args.numeros or None
    cliente = None
    salidas = SALIDAS
    if args.cliente:
        hoy = datetime.date.today()
        cliente = {
            "nombre": args.cliente,
            "emision": hoy.strftime("%d/%m/%Y"),
            "vence": (hoy + datetime.timedelta(days=15)).strftime("%d/%m/%Y"),
        }
        salidas = SALIDAS / "clientes"
    entorno = Environment(loader=FileSystemLoader(AQUI), autoescape=True)
    salidas.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as pw:
        nav = pw.chromium.launch(executable_path=CHROMIUM)
        pag = nav.new_page(viewport={"width": 1080, "height": 1920})
        for c in datos["crudos"]:
            if filtro and c["numero"] not in filtro:
                continue
            html = AQUI / f".{c['carpeta']}.html"
            html.write_text(armar_html(entorno, datos, c, cliente), encoding="utf-8")
            pag.goto(html.as_uri())
            pag.evaluate("document.fonts.ready")
            pdf = pag.pdf(width="1080px", height="1920px", print_background=True, prefer_css_page_size=True)
            html.unlink()

            lector = PdfReader(io.BytesIO(pdf))
            escritor = PdfWriter(clone_from=lector)
            escritor.add_metadata({"/Title": f"{c['nombre']} · Propuesta comercial", "/Author": "CRUDO", "/Creator": "CRUDO", "/Producer": "CRUDO"})
            nombre = c["archivo"]
            if cliente:
                nombre = nombre.replace(".pdf", f" - {cliente['nombre']}.pdf")
            destino = salidas / nombre
            with destino.open("wb") as f:
                escritor.write(f)
            print(f"✓ {destino.relative_to(AQUI)} ({len(lector.pages)} páginas)")
        nav.close()


if __name__ == "__main__":
    main()
