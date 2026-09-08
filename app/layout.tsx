import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import StickyCta from "@/components/site/StickyCta";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crudo.com.py"),
  title: {
    default: "CRUDO | Arquitectura & Concreto",
    template: "%s | CRUDO",
  },
  description:
    "Arquitectura y espacios en concreto diseñados y construidos bajo un mismo sistema. Tipologías definidas y proyectos a medida en Paraguay.",
  openGraph: {
    title: "CRUDO | Arquitectura & Concreto",
    description:
      "Arquitectura y espacios en concreto diseñados y construidos bajo un mismo sistema. Tipologías definidas y proyectos a medida en Paraguay.",
    locale: "es_PY",
    type: "website",
    images: ["/images/modelos/crudo-02-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PY" className={archivo.variable}>
      <head>
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
