import Image from "next/image";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import ModelCard from "@/components/sections/ModelCard";
import Versatility from "@/components/sections/Versatility";
import FinalCta from "@/components/sections/FinalCta";
import { models, principles, processSteps } from "@/lib/content";
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
              CRUDO une arquitectura, fabricación y construcción bajo un mismo
              sistema. Diseñamos espacios pensados para durar y nos encargamos
              de llevarlos desde la idea hasta la obra terminada.
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
            <p className="lede mt-8 max-w-xl text-muted">
              Dos espacios diseñados para adaptarse a diferentes terrenos,
              estilos de vida y formas de usar la arquitectura.
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

      {/* Nuestro sistema */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Nuestro sistema</p>
            <h2 className="display-lg mt-6">
              Controlamos
              <br />
              todo el proceso.
            </h2>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7 md:pt-4" delay={120}>
            <p className="lede">
              Diseño, fabricación, curación y construcción trabajan juntos, bajo
              un mismo equipo y en nuestro propio taller. Por eso lo que se
              define en el proyecto es lo que llega a tu terreno.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px border-t border-hairline md:mt-24 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 90}
              className="border-b border-hairline py-8 md:border-b-0 md:border-r md:last:border-r-0 md:pr-8"
            >
              <p className="kicker text-muted">{step.number}</p>
              <h3 className="display-md mt-5">{step.title}</h3>
              <p className="body-text mt-4 text-muted">{step.short}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2">
          {[
            {
              src: "/images/taller/panel-hormigon.png",
              alt: "Panel de hormigón terminado en el taller de CRUDO, apoyado sobre pallets",
            },
            {
              src: "/images/taller/muestras-concreto.png",
              alt: "Muestras de concreto en distintas tonalidades y texturas",
            },
          ].map((image, index) => (
            <Reveal
              key={image.src}
              delay={index * 90}
              className="relative aspect-[4/3] w-full overflow-hidden bg-cement"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <Cta href="/sistema" variant="outline">
            Ver cómo trabajamos
          </Cta>
        </Reveal>
      </section>

      {/* Por qué CRUDO */}
      <section className="border-t border-hairline bg-cement/35">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-3xl">
            <p className="kicker text-muted">Por qué CRUDO</p>
            <h2 className="display-lg mt-6">
              Lo que cambia
              <br />
              cuando el sistema
              <br />
              es propio.
            </h2>
          </Reveal>

          <ul className="mt-16 md:mt-24">
            {principles.map((principle, index) => (
              <Reveal
                as="li"
                key={principle.number}
                delay={index * 70}
                className="grid gap-4 border-t border-hairline py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <p className="kicker text-muted md:col-span-1">
                  {principle.number}
                </p>
                <h3 className="display-md md:col-span-4">{principle.title}</h3>
                <p className="lede text-muted md:col-span-7">
                  {principle.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

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
              CRUDO 01 y CRUDO 02 son nuestro punto de partida. Pero si tenés un
              terreno, un plano o una idea diferente, podemos desarrollar un
              proyecto pensado para vos con nuestro sistema constructivo.
            </p>
            <p className="body-text mt-5 text-muted">
              Diseñamos y construimos espacios a medida, manteniendo el mismo
              cuidado por la arquitectura, los materiales y la ejecución.
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
