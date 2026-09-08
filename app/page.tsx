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

      {/* Qué es CRUDO */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Arquitectura &amp; Concreto</p>
            <h2 className="display-lg mt-6">
              Una forma
              <br />
              diferente
              <br />
              de&nbsp;construir.
            </h2>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7 md:pt-4" delay={120}>
            <p className="lede">
              Unimos arquitectura, fabricación y construcción bajo un mismo
              sistema. Diseñamos espacios pensados para durar y los llevamos
              desde la idea hasta la obra terminada.
            </p>
            <p className="display-md mt-10 normal-case tracking-[-0.02em]">
              Más control. Más precisión. Menos improvisación.
            </p>
            <div className="mt-10">
              <Cta href="/sistema" variant="inline">
                Conocer el sistema
              </Cta>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mt-20 aspect-[16/10] w-full overflow-hidden bg-cement md:mt-28 md:aspect-[21/9]">
          <Image
            src="/images/modelos/crudo-02-interior.jpg"
            alt="Interior de CRUDO 02: muro de paneles de hormigón, cocina integrada al estar y revestimiento de madera"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      {/* Modelos */}
      <section className="border-t border-hairline py-24 md:py-36">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="kicker text-muted">Modelos</p>
            <h2 className="display-lg mt-6">
              Dos proyectos.
              <br />
              Muchas formas de vivirlos.
            </h2>
            <p className="lede mt-8 max-w-lg text-muted">
              Diseñados para adaptarse a distintos terrenos y formas de usar la
              arquitectura.
            </p>
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
                src="/images/modelos/crudo-02-pileta.jpg"
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
