import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
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
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 40}>
            <details className="group border-b border-hairline">
              <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-6 [&::-webkit-details-marker]:hidden md:grid-cols-12 md:gap-x-8">
                <span className="kicker text-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display-md normal-case tracking-[-0.02em] md:col-span-9">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className="text-xl leading-none text-muted transition-transform duration-300 group-open:rotate-45 md:col-span-2 md:justify-self-end"
                >
                  +
                </span>
              </summary>
              <div className="grid gap-x-6 pb-8 md:grid-cols-12 md:gap-x-8">
                <p className="body-text max-w-2xl text-muted md:col-span-9 md:col-start-2">
                  {faq.answer}
                </p>
              </div>
            </details>
          </Reveal>
        ))}
      </section>

      <FinalCta
        title={"¿Te quedó\nalguna duda?"}
        text="Escribinos por WhatsApp. Contanos dónde querés construir y qué tenés en mente."
      />
    </>
  );
}
