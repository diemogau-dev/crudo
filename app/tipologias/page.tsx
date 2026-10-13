import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Cta from "@/components/ui/Cta";
import PageHeader from "@/components/sections/PageHeader";
import ModelCard from "@/components/sections/ModelCard";
import FinalCta from "@/components/sections/FinalCta";
import { models } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tipologías",
  description:
    "CRUDO 01, loft de 31 m²; CRUDO 02, loft de 31 m² con kitchenette, y CRUDO 03, vivienda industrial de 66 m². Casas de hormigón armado diseñadas y construidas con nuestro sistema.",
};

export default function TipologiasPage() {
  return (
    <>
      <PageHeader
        kicker="Tipologías CRUDO"
        title="Muchas formas de vivirlas."
        image={{
          src: "/images/tipologias/crudo-03-interior.jpg",
          alt: "Interior de CRUDO 03: muro de paneles de hormigón, cocina integrada al estar y revestimiento de madera",
          priority: true,
        }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <h2 className="display-md">
              Casas de hormigón armado,
              <br />
              para toda la vida.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="lede">
              CRUDO ofrece un catálogo de tipologías diseñadas por arquitectos
              y construidas en hormigón armado, con paneles de nuestra propia
              fábrica. Son casas sólidas, seguras y resistentes, con la
              estética industrial del hormigón a la vista y terminaciones
              pensadas para durar.
            </p>
            <p className="body-text mt-6 text-muted">
              Nada de paredes de plástico ni de isopor: cada CRUDO se levanta
              sobre una estructura de hormigón armado calculada para tu
              terreno. Sirve como vivienda permanente, casa de fin de semana,
              espacio de huéspedes u oficina, y se construye para acompañarte
              toda la vida.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {models.map((model, index) => (
              <Reveal key={model.slug} delay={index * 120}>
                <ModelCard model={model} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 flex justify-center md:mt-20">
            <Cta href={whatsappLink("aMedida")} external>
              Hablemos sobre tu proyecto
            </Cta>
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
