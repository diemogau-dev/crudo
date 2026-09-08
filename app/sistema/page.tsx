import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "El Sistema",
  description:
    "Cómo trabaja CRUDO: diseño, fabricación, curación y construcción bajo un mismo equipo, con taller propio de hormigón, concreto y carpintería metálica.",
};

const workshopCapabilities = [
  "Muros y estructuras de hormigón armado",
  "Revestimientos de concreto",
  "Celosías y piezas arquitectónicas",
  "Bachas, tinas y piezas especiales",
  "Pisos de concreto",
  "Carpintería metálica",
];

const metalwork = [
  "Estructuras",
  "Techos",
  "Puertas y ventanas",
  "Elementos metálicos",
  "Detalles arquitectónicos",
];

const technologies = [
  "Hormigón armado de alta resistencia",
  "Concretos especiales",
  "GRC / GFRC cuando corresponde",
  "UHPC cuando el proyecto lo requiere",
  "Estructuras metálicas",
  "Carpintería metálica",
];

export default function SistemaPage() {
  return (
    <>
      <PageHeader
        kicker="El Sistema"
        title={"Diseño, taller y obra\nen las mismas manos."}
        lede="No trabajamos con un solo material ni con un solo proveedor. Trabajamos con un sistema: un proceso completo que va del proyecto a la entrega, y que controlamos de punta a punta."
        image={{
          src: "/images/modelos/crudo-01-volumen.jpg",
          alt: "Volumen exterior de CRUDO 01 mostrando la grilla de paneles de hormigón",
          priority: true,
        }}
      />

      {/* Proceso */}
      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="kicker text-muted">El proceso</p>
          <h2 className="display-lg mt-6">Cómo trabajamos.</h2>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 70}
              className="grid gap-6 border-t border-hairline py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <p className="kicker text-muted md:col-span-1">{step.number}</p>
              <h3 className="display-md md:col-span-4">{step.title}</h3>
              <div className="md:col-span-7">
                <p className="lede">{step.short}</p>
                <p className="body-text mt-5 text-muted">{step.long}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* El taller */}
      <section className="border-t border-hairline bg-cement/35">
        <div className="shell py-24 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <p className="kicker text-muted">El taller</p>
              <h2 className="display-lg mt-6">
                Producción
                <br />
                propia.
              </h2>
              <p className="body-text mt-8 text-muted">
                CRUDO cuenta con su propia fábrica y producción. Ahí
                desarrollamos los elementos que forman parte de nuestra
                arquitectura, y también contamos con taller de carpintería
                metálica.
              </p>
              <p className="body-text mt-5 text-muted">
                Fabricar lo nuestro no es un detalle operativo: es lo que nos
                permite decidir cómo se ve, cómo se comporta y cuánto dura cada
                pieza que llega a tu obra.
              </p>
            </Reveal>

            <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
              <ul className="border-t border-hairline">
                {workshopCapabilities.map((item) => (
                  <li
                    key={item}
                    className="body-text border-b border-hairline py-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="kicker mt-12 text-muted">
                Nuestra herrería nos permite controlar
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
                {metalwork.map((item) => (
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

          <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
            {[
              {
                src: "/images/taller/panel-hormigon.png",
                alt: "Panel de hormigón terminado en el taller de CRUDO",
              },
              {
                src: "/images/taller/bachas-produccion.png",
                alt: "Bachas y tinas de concreto en producción en el taller",
              },
              {
                src: "/images/taller/muestras-concreto.png",
                alt: "Muestras de concreto en distintas tonalidades y texturas",
              },
            ].map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 90}
                className="relative aspect-[4/5] w-full overflow-hidden bg-cement"
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

      {/* Tecnología y materiales */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Tecnología y materiales</p>
            <h2 className="display-lg mt-6">
              El material
              <br />
              lo define
              <br />
              el proyecto.
            </h2>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7 md:pt-4" delay={120}>
            <p className="lede">
              Elegimos sistemas y materiales según lo que cada proyecto
              necesita. No todos los proyectos utilizan las mismas tecnologías:
              la decisión se toma en el diseño, según el uso, el terreno y el
              resultado que buscamos.
            </p>
            <ul className="mt-10 border-t border-hairline">
              {technologies.map((item) => (
                <li
                  key={item}
                  className="body-text border-b border-hairline py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="body-text mt-8 text-muted">
              Detrás de esas decisiones hay un equipo con experiencia real en
              obra y en el desarrollo de piezas de concreto. Es conocimiento
              aplicado, no un catálogo.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={"¿Querés entrar\nen los detalles técnicos?"}
        text="Si sos arquitecto, ingeniero o simplemente querés entender cómo se construye un CRUDO, escribinos y lo conversamos."
      />
    </>
  );
}
