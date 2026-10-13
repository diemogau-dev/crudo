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
          src: "/images/renders/crudo-1/crudo-1-campo.jpg",
          alt: "CRUDO 01 en el campo, junto a un arroyo, con su frente vidriado y celosía de concreto",
          priority: true,
          position: "object-[22%_center] md:object-center",
        }}
        placement="top"
      />

      <section className="shell py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="lede">
            CRUDO ofrece un catálogo de tipologías diseñadas por arquitectos y
            construidas con hormigón armado de alta resistencia. Son viviendas
            sólidas, seguras y resistentes, con una estética y un diseño
            industrial moderno.
          </p>
          <p className="body-text mx-auto mt-6 max-w-2xl text-muted">
            El hormigón gana resistencia con el tiempo: a medida que madura se
            vuelve más sólido. Por eso una casa CRUDO es resistente desde el
            primer día y pide muy poco mantenimiento a largo plazo.
          </p>
          <p className="body-text mx-auto mt-4 max-w-2xl text-muted">
            Su masa térmica amortigua el calor paraguayo y ayuda a mantener el
            interior más fresco en verano y más cálido en invierno. Cada
            tipología está pensada para vivirse cómoda todo el año.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
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
