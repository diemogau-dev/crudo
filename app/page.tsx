import Image from "next/image";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import ModelCard from "@/components/sections/ModelCard";
import ProcessBanner from "@/components/sections/ProcessBanner";
import Versatility from "@/components/sections/Versatility";
import FinalCta from "@/components/sections/FinalCta";
import { models } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Por qué CRUDO */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Por qué CRUDO y hormigón</p>
            <h2 className="display-lg mt-6">
              Construir
              <br />
              no debería
              <br />
              ser un caos.
            </h2>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7 md:pt-4" delay={120}>
            <p className="lede">
              Una obra tradicional lleva meses, a veces años. Las decisiones se
              improvisan sobre la marcha y cada cambio termina en sobrecosto.
              Estudio, contratistas, proveedores y obreros trabajan sin
              sincronizarse, y los errores aparecen en la obra.
            </p>
            <p className="lede mt-6">
              En CRUDO todo el proceso está definido desde el principio: el
              diseño arquitectónico, la fabricación de los materiales y la
              construcción. Los tiempos de obra son menores, el costo queda
              fijo desde el primer día y el resultado final deja de ser una
              sorpresa.
            </p>
            <div className="mt-10">
              <Cta href="/sistema" variant="inline">
                Conocer cómo trabajamos
              </Cta>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mt-20 aspect-[16/10] w-full overflow-hidden bg-cement md:mt-28 md:aspect-[21/9]">
          <Image
            src="/images/tipologias/crudo-03-interior.jpg"
            alt="Interior de CRUDO 03: muro de paneles de hormigón, cocina integrada al estar y revestimiento de madera"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <ProcessBanner />

      {/* Tipologías */}
      <section className="border-t border-hairline py-24 md:py-36">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="kicker text-muted">Tipologías CRUDO</p>
            <h2 className="display-lg mt-6">Muchas formas de vivirlas.</h2>
            <p className="lede mt-8 max-w-lg text-muted">
              Diseñadas para adaptarse a distintos terrenos y formas de usar la
              arquitectura. Un catálogo que va a seguir creciendo.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
            {models.map((model, index) => (
              <Reveal key={model.slug} delay={index * 120}>
                <ModelCard model={model} showPrice={false} />
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

      <Versatility />

      {/* Proyectos a medida */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
              <Image
                src="/images/tipologias/crudo-03-pileta.jpg"
                alt="CRUDO 03 con pileta, pérgola de madera y celosía de concreto"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
            <p className="kicker text-muted">Proyectos a medida</p>
            <h2 className="display-lg mt-6">Empezá por el terreno.</h2>
            <p className="body-text mt-8 text-muted">
              Mostranos tu terreno y contanos tu idea. Diseñamos tu proyecto a
              medida desde cero, con nuestro sistema constructivo, y vas a
              conocer el plazo de obra y el costo final antes de mover un metro
              cúbico de arena.
            </p>
            <div className="mt-10">
              <Cta href={whatsappLink("aMedida")} external>
                Hablemos de tu proyecto
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
