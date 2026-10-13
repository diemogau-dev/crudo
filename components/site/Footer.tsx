import Link from "next/link";
import { contact, navLinks } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-iron text-alabaster">
      <div className="shell border-t border-hairline-inverse py-14 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo variant="alabaster" className="h-8 md:h-9" />
            <p className="kicker mt-4 text-cement/70">
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
            <a
              href={`mailto:${contact.email}`}
              className="kicker normal-case tracking-[0.12em] text-alabaster transition-opacity duration-300 hover:opacity-70"
            >
              {contact.email}
            </a>
            <address className="kicker mt-3 not-italic leading-relaxed text-alabaster/50">
              {contact.address}
              <br />
              {contact.city}
            </address>
            <div className="mt-3 flex items-center gap-4">
              <a
                href={contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="kicker text-alabaster/70 transition-colors duration-300 hover:text-alabaster"
              >
                Instagram · @{contact.instagram.handle}
              </a>
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
