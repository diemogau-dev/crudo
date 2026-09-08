import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "El Sistema",
  description:
    "Nuestro proceso: diseño, fabricación, curación y construcción bajo un mismo equipo, con taller propio de hormigón, concreto y carpintería metálica.",
};

const workshopCapabilities = [
  "Muros y estructuras de hormigón armado",
  "Revestimientos de concreto",
  "Celosías y piezas arquitectónicas",
  "Bachas, tinas y piezas especiales",
  "Pisos de concreto",
  "Carpintería metálica",
];

const technologies = [
  "Hormigón armado de alta resistencia",
  "Concretos especiales",
  "GRC / GFRC",
  "UHPC",
  "Estructuras metálicas",
  "Carpintería metálica",
];

const workshopImages = [
  {
    src: "/images/proceso/oficio.png",
    alt: "Trabajo manual sobre un molde de concreto en el taller",
  },
  {
    src: "/images/proceso/pigmento.png",
    alt: "Pigmento siendo dosificado para una mezcla de concreto",
  },
  {
    src: "/images/taller/panel-hormigon.png",
    alt: "Panel de hormigón terminado en el taller",
  },
];

export default function SistemaPage() {
  return (
    <>
      <PageHeader
        kicker="El Sistema"
        title={"Diseño, taller y obra\nen las mismas manos."}
        lede="Un proceso completo que va del proyecto a la entrega, y que controlamos de punta a punta."
        image={{
          src: "/images/tipologias/crudo-01-volumen.jpg",
          alt: "Volumen exterior de CRUDO 01 mostrando la grilla de paneles de hormigón",
          priority: true,
        }}
      />

      {/* Nuestro proceso — fondo claro, foto y texto alternados */}
      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="kicker text-muted">Nuestro proceso</p>
          <h2 className="display-lg mt-6">Cuatro etapas, un solo equipo.</h2>
          <p className="lede mt-8 max-w-xl text-muted">
            Diseño, fabricación, curación y construcción no están repartidos
            entre distintos actores. Son etapas del mismo trabajo.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="grid gap-8 md:grid-cols-12 md:items-center md:gap-16"
            >
              <Reveal
                className={`relative aspect-[4/3] w-full overflow-hidden bg-cement md:col-span-6 ${
                  index % 2 === 1 ? "md:order-2 md:col-start-7" : ""
                }`}
              >
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </Reveal>

              <Reveal
                delay={120}
                className={`md:col-span-5 ${
                  index % 2 === 1
                    ? "md:order-1 md:col-start-1"
                    : "md:col-start-8"
                }`}
              >
                <p className="kicker text-muted">{step.number}</p>
                <h3 className="display-lg mt-5">{step.title}</h3>
                <p className="lede mt-8">{step.short}</p>
                <p className="body-text mt-5 text-muted">{step.long}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* El taller — bloque oscuro, grilla numerada */}
      <section className="bg-iron text-alabaster">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <p className="kicker text-alabaster/60">El taller</p>
            <h2 className="display-lg mt-6">Producción propia.</h2>
            <p className="lede mt-8 max-w-xl text-cement/85">
              Tenemos fábrica y taller de carpintería metálica propios. Eso nos
              permite decidir cómo se ve, cómo se comporta y cuánto dura cada
              pieza que llega a tu obra.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-8 md:mt-24 md:grid-cols-3">
            {workshopCapabilities.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 60}
                className="border-t border-hairline-inverse py-7"
              >
                <p className="kicker text-alabaster/40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-lg leading-tight font-medium tracking-[-0.02em] md:text-2xl">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 max-w-2xl md:mt-20">
            <p className="body-text text-alabaster/70">
              Nuestra herrería nos permite controlar estructuras, techos,
              puertas, ventanas y los detalles metálicos que definen el carácter
              de cada proyecto.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
            {workshopImages.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 90}
                className="relative aspect-[4/5] w-full overflow-hidden bg-iron"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología y materiales — bloque claro, tratamiento tipográfico */}
      <section className="bg-cement/45">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <p className="kicker text-muted">Tecnología y materiales</p>
            <h2 className="display-lg mt-6">
              El material lo define el proyecto.
            </h2>
            <p className="lede mt-8 max-w-2xl text-muted">
              Elegimos sistemas y materiales según lo que cada proyecto
              necesita. No todos usan las mismas tecnologías: la decisión se
              toma en el diseño.
            </p>
          </Reveal>

          <Reveal className="mt-16 md:mt-24" delay={120}>
            {/* Apilado en mobile; corrido tipográfico con separadores en desktop. */}
            <p className="display-md flex flex-col gap-y-3 normal-case tracking-[-0.02em] md:flex-row md:flex-wrap md:items-baseline md:gap-x-5">
              {technologies.map((item, index) => (
                <span
                  key={item}
                  className="md:inline-flex md:items-baseline md:gap-5"
                >
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="hidden text-muted/60 md:inline"
                    >
                      ·
                    </span>
                  ) : null}
                  {item}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal className="mt-16 max-w-2xl md:mt-20" delay={90}>
            <p className="body-text text-muted">
              Detrás hay un equipo con experiencia real en obra y en el
              desarrollo de piezas de concreto. Conocimiento aplicado, no un
              catálogo.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={"¿Querés entrar\nen los detalles técnicos?"}
        text="Si sos arquitecto, ingeniero o cliente técnico, escribinos y lo conversamos."
      />
    </>
  );
}
