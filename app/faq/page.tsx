import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import Faq from "@/components/sections/Faq";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Qué es CRUDO, cómo trabajamos, qué necesitás para empezar y cómo se define el presupuesto de un proyecto.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        kicker="Preguntas frecuentes"
        title={"Lo que\nsuelen preguntarnos."}
        lede="Y si falta algo, escribinos por WhatsApp y lo conversamos."
      />

      <section className="shell py-16 md:py-24">
        <Faq items={faqs} />
      </section>

      <FinalCta
        title={"¿Te quedó\nalguna duda?"}
        text="Escribinos por WhatsApp. Contanos dónde querés construir y qué tenés en mente."
      />
    </>
  );
}
