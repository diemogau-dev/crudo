import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import ModelCard from "@/components/sections/ModelCard";
import FinalCta from "@/components/sections/FinalCta";
import { SHOW_PRICES, models } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tipologías",
  description:
    "CRUDO 01, loft de 28 m², y CRUDO 02, vivienda industrial de 60 m². Diseñados y construidos con nuestro sistema de hormigón y concreto.",
};

export default function TipologiasPage() {
  return (
    <>
      <PageHeader
        kicker="Tipologías"
        title={"Tipologías CRUDO.\nMuchas formas de vivirlas."}
        lede="Diseñadas para adaptarse a distintos terrenos y formas de usar la arquitectura. Un catálogo que va a seguir creciendo."
        image={{
          src: "/images/tipologias/crudo-01-exterior-aereo.jpg",
          alt: "Vista aérea del loft CRUDO 01 con deck de madera y frente vidriado",
          priority: true,
        }}
      />

      <section className="shell py-20 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {models.map((model, index) => (
            <Reveal key={model.slug} delay={index * 120}>
              <ModelCard model={model} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="kicker text-muted">Sobre el presupuesto</p>
            <p className="lede mt-6">
              {SHOW_PRICES
                ? "CRUDO 01 desde Gs. 95.000.000 y CRUDO 02 desde Gs. 240.000.000, según terreno y trabajos de preparación. Preferimos conocer tu caso antes de confirmar el número final, y después preparar una propuesta clara con el alcance correspondiente."
                : "El número final depende del terreno, la ubicación y los trabajos de preparación de cada proyecto. Escribinos por WhatsApp y te preparamos una propuesta clara con el alcance y la inversión correspondiente."}
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={"¿Cuál se parece más\na lo que tenés en mente?"}
        text="Contanos dónde querés construir. Podemos revisar el terreno y adaptar el proyecto."
      />
    </>
  );
}
