import Image from "next/image";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import ModelCard from "@/components/sections/ModelCard";
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
            <p className="kicker text-muted">Por qué CRUDO</p>
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
              Meses de obra. Decisiones improvisadas sobre la marcha. Un
              estudio, una fábrica y un constructor que no se hablan entre sí.
              En CRUDO el diseño, la fabricación y la construcción están en las
              mismas manos. Por eso el resultado deja de ser una sorpresa, y el
              plazo es más corto que el de una obra tradicional.
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
            src="/images/tipologias/crudo-02-interior.jpg"
            alt="Interior de CRUDO 02: muro de paneles de hormigón, cocina integrada al estar y revestimiento de madera"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      {/* Tipologías */}
      <section className="border-t border-hairline py-24 md:py-36">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="kicker text-muted">Tipologías</p>
            <h2 className="display-lg mt-6">
              Dos proyectos.
              <br />
              Muchas formas de vivirlos.
            </h2>
            <p className="lede mt-8 max-w-lg text-muted">
              Diseñados para adaptarse a distintos terrenos y formas de usar la
              arquitectura.
            </p>
            {/*
              PENDIENTE — Gate 0 (ver context/crudo/decisiones-y-preguntas.md).
              No descomentar hasta que Calde confirme costo real: no publicar
              con el placeholder a la vista.

              <p className="body-text mt-3 text-muted">
                Desde Gs [PLACEHOLDER_INVERSION_CRUDO01] y en [PLACEHOLDER_PLAZO]
                desde la firma del proyecto.
              </p>
            */}
          </Reveal>

          <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10">
            {models.map((model, index) => (
              <Reveal key={model.slug} delay={index * 120}>
                <ModelCard model={model} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Versatility />

      {/* Proyectos a medida */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
              <Image
                src="/images/tipologias/crudo-02-pileta.jpg"
                alt="CRUDO 02 con pileta, pérgola de madera y celosía de concreto"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
            <p className="kicker text-muted">Proyectos a medida</p>
            <h2 className="display-lg mt-6">Empezá con una idea.</h2>
            <p className="body-text mt-8 text-muted">
              CRUDO 01 y CRUDO 02 son el punto de partida. Si tenés un terreno,
              un plano o una idea distinta, desarrollamos un proyecto a medida
              con el mismo sistema y el mismo cuidado.
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
