import Link from "next/link";
import { navLinks } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-iron text-alabaster">
      <div className="shell border-t border-hairline-inverse py-14 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-3xl font-extrabold uppercase tracking-[-0.04em] md:text-4xl">
              Crudo
            </p>
            <p className="kicker mt-3 text-cement/70">
              Arquitectura &amp; Concreto
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="kicker text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={whatsappLink("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="kicker text-alabaster transition-opacity duration-300 hover:opacity-70"
            >
              WhatsApp · +595 981 625 546
            </a>
            <p className="kicker text-alabaster/50">Asunción · Paraguay</p>
            <div className="mt-3 flex items-center gap-4">
              <span
                aria-label="Instagram — próximamente"
                title="Próximamente"
                className="kicker cursor-default text-alabaster/35"
              >
                Instagram
              </span>
              <span
                aria-label="Facebook — próximamente"
                title="Próximamente"
                className="kicker cursor-default text-alabaster/35"
              >
                Facebook
              </span>
            </div>
          </div>
        </div>

        <p className="kicker mt-14 text-alabaster/35">
          © {new Date().getFullYear()} CRUDO
        </p>
      </div>
    </footer>
  );
}
