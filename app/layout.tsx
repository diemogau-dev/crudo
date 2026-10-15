import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import WhatsappButton from "@/components/site/WhatsappButton";
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
    "Diseñamos, fabricamos y construimos tu espacio. Tipologías definidas y proyectos a medida en Paraguay.",
  openGraph: {
    title: "CRUDO | Arquitectura & Concreto",
    description:
      "Diseñamos, fabricamos y construimos tu espacio. Tipologías definidas y proyectos a medida en Paraguay.",
    locale: "es_PY",
    type: "website",
    // Imagen que muestran WhatsApp y las redes al compartir el link.
    images: [
      {
        url: "/images/og/crudo-share.jpg",
        width: 1200,
        height: 630,
        alt: "Frente vidriado de CRUDO 01 con estructura negra, deck de madera y sillones exteriores",
      },
    ],
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
        <WhatsappButton />
      </body>
    </html>
  );
}
