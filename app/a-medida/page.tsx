import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Proyectos a Medida",
  description:
    "Un terreno, un plano o una idea. Desarrollamos y construimos proyectos a medida con el sistema constructivo de CRUDO.",
};

const startingPoints = [
  {
    title: "Tenés un terreno",
    text: "Analizamos el lugar, la orientación y el acceso para definir qué tiene sentido construir ahí.",
  },
  {
    title: "Tenés un plano",
    text: "Tomamos un proyecto existente y lo llevamos a nuestro sistema constructivo.",
  },
  {
    title: "Tenés una idea",
    text: "Empezamos por una conversación y la convertimos en un proyecto.",
  },
];

const possibilities = [
  "Viviendas",
  "Casas de fin de semana",
  "Espacios de huéspedes",
  "Quinchos",
  "Oficinas",
  "Gimnasios",
  "Salas de entretenimiento",
  "Ampliaciones",
  "Piletas",
  "Espacios exteriores",
  "Paisajismo",
];

export default function AMedidaPage() {
  return (
    <>
      <PageHeader
        kicker="Proyectos a medida"
        title={"Tu idea.\nNuestro sistema."}
        lede="No necesitás entrar en un molde para trabajar con CRUDO. Partimos de una conversación, un plano o una necesidad concreta y lo transformamos en un proyecto listo para construir."
        image={{
          src: "/images/tipologias/crudo-02-pileta.jpg",
          alt: "CRUDO 02 con pileta, pérgola de madera y celosía de concreto",
          priority: true,
        }}
      />

      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="kicker text-muted">Por dónde se empieza</p>
          <h2 className="display-lg mt-6">Tres formas de arrancar.</h2>
        </Reveal>

        <div className="mt-16 grid gap-px md:mt-24 md:grid-cols-3">
          {startingPoints.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 90}
              className="border-t border-hairline py-8 md:pr-10"
            >
              <p className="kicker text-muted">0{index + 1}</p>
              <h3 className="display-md mt-5">{point.title}</h3>
              <p className="body-text mt-4 text-muted">{point.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-cement/35">
        <div className="shell py-24 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <Reveal className="md:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
                <Image
                  src="/images/proceso/gimnasio.jpg"
                  alt="Gimnasio propio construido en concreto visto, con equipamiento de entrenamiento"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
              <p className="kicker text-muted">Qué podemos construir</p>
              <h2 className="display-lg mt-6">
                Un sistema,
                <br />
                muchos programas.
              </h2>
              <p className="body-text mt-8 text-muted">
                Desde una ampliación hasta una vivienda completa, con todo lo
                que hace falta alrededor.
              </p>
              <ul className="mt-10 flex flex-wrap gap-3">
                {possibilities.map((item) => (
                  <li
                    key={item}
                    className="kicker border border-hairline px-4 py-3 text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="kicker text-muted">El plan</p>
          <h2 className="display-lg mt-6">Simple, en tres pasos.</h2>
        </Reveal>

        <ol className="mt-16 md:mt-24">
          {[
            {
              title: "Hablamos de lo que querés construir",
              text: "Una conversación por WhatsApp para entender el terreno y el uso.",
            },
            {
              title: "Definimos el proyecto",
              text: "Diseño, alcance y materiales quedan cerrados antes de empezar la obra.",
            },
            {
              title: "Producimos y construimos nosotros",
              text: "Nuestro taller fabrica y nuestro equipo ejecuta, hasta la entrega.",
            },
          ].map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 90}
              className="grid gap-4 border-t border-hairline py-10 md:grid-cols-12 md:gap-10"
            >
              <p className="kicker text-muted md:col-span-1">0{index + 1}</p>
              <h3 className="display-md md:col-span-5">{step.title}</h3>
              <p className="body-text text-muted md:col-span-6">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <FinalCta
        title={"Contanos qué\ntenés en mente."}
        text="Un terreno, un plano, una idea suelta. Con eso alcanza para empezar a conversar."
        topic="aMedida"
        label="Hablemos de tu proyecto"
      />
    </>
  );
}
