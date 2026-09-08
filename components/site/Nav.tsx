"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import Logo from "./Logo";

// Rutas cuyo encabezado es una imagen a sangre: el navbar arranca transparente.
const DARK_HERO_PREFIXES = [
  "/tipologias",
  "/sistema",
  "/a-medida",
  "/nosotros",
];

const hasDarkHero = (pathname: string) =>
  pathname === "/" ||
  DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overDarkHero = hasDarkHero(pathname) && !scrolled;
  const light = overDarkHero && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          light || open
            ? "bg-transparent text-alabaster"
            : "border-b border-hairline bg-alabaster/95 text-iron backdrop-blur-sm"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label="CRUDO — inicio" className="relative z-10">
            <Logo variant={light || open ? "alabaster" : "iron"} priority />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`kicker transition-opacity duration-300 hover:opacity-60 ${
                  pathname === link.href ? "opacity-100" : "opacity-80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink("general")}
              target="_blank"
              rel="noopener noreferrer"
              className={`kicker group inline-flex items-center gap-2 border px-5 py-3 transition-colors duration-300 ${
                light
                  ? "border-hairline-inverse hover:bg-alabaster hover:text-iron"
                  : "border-iron bg-iron text-alabaster hover:bg-transparent hover:text-iron"
              }`}
            >
              Hablemos
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden ${
              open ? "text-alabaster" : ""
            }`}
          >
            <span
              className={`h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* El overlay vive fuera del header: un ancestro con backdrop-filter sería el
          bloque contenedor de un hijo fixed y lo recortaría a la altura del header. */}
      <div
        className={`fixed inset-0 z-40 bg-iron text-alabaster transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pt-28 pb-12">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-md border-b border-hairline-inverse py-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="kicker flex items-center justify-between bg-alabaster px-7 py-5 text-iron"
          >
            Hablemos
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
