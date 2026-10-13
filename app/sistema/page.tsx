import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "El Sistema",
  description:
    "Un sistema constructivo propio en hormigón armado y concreto de alta resistencia: diseñamos, fabricamos, construimos y entregamos con nuestro propio equipo, fábrica y herrería.",
};

const workshopCapabilities = [
  "Paredes de hormigón armado",
  "Revestimientos y cobogós de concreto",
  "Pisos y decks de concreto",
  "Bachas y tinas de concreto",
  "Estructuras metálicas",
  "Techos de paneles termoacústicos",
];

const workshopImages = [
  {
    src: "/images/proceso/oficio.png",
    alt: "Trabajo manual sobre un molde de concreto en la fábrica",
  },
  {
    src: "/images/proceso/pigmento.png",
    alt: "Pigmento siendo dosificado para una mezcla de concreto",
  },
  {
    src: "/images/taller/panel-hormigon.png",
    alt: "Panel de hormigón terminado en la fábrica",
  },
  {
    src: "/images/proceso/soldadura-herreria.jpg",
    alt: "Soldadura de estructura metálica en nuestra herrería",
  },
  {
    src: "/images/taller/bachas-taller.png",
    alt: "Bachas de concreto de producción propia en distintos colores, en la fábrica",
  },
  {
    src: "/images/taller/arenado-placa.jpg",
    alt: "Operaria arenando una placa de hormigón en la fábrica",
  },
  {
    src: "/images/taller/placas-colores.jpg",
    alt: "Placas de concreto en distintos colores y texturas, secándose sobre pallets",
  },
  {
    src: "/images/taller/bachas-moldeadas.jpg",
    alt: "Bachas y piezas de concreto recién desmoldadas sobre la mesa de trabajo",
  },
  {
    src: "/images/taller/placa-y-piezas.jpg",
    alt: "Placa de hormigón visto junto a un bloque calado, ladrillos y una baldosa de concreto",
  },
];


export default function SistemaPage() {
  return (
    <>
      <PageHeader
        kicker="El Sistema"
        title={"Diseño, fábrica y obra\nen las mismas manos."}
        lede="Un proceso completo que va del proyecto a la entrega, y que controlamos de punta a punta."
        image={{
          src: "/images/renders/crudo-3/crudo-3-a.jpg",
          alt: "Fachada de CRUDO 03 en paneles de hormigón, con jardín, deck de madera y pileta",
          priority: true,
        }}
      />

      {/* Nuestro proceso — fondo claro, foto y texto alternados */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Nuestro proceso</p>
            <h2 className="display-lg mt-6">Cuatro etapas, un solo equipo.</h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 md:pt-4" delay={120}>
            <p className="lede">
              En Paraguay todavía se construye ladrillo por ladrillo, con
              presupuestos que cambian sobre la marcha y plazos que se estiran.
              CRUDO es otra cosa: un sistema constructivo propio, en hormigón
              armado y concreto de alta resistencia, donde diseñamos,
              fabricamos y construimos cada pieza bajo un mismo control.
            </p>
            <p className="body-text mt-6 text-muted">
              Detrás hay un equipo experto en obra y en tecnología del
              concreto, y una forma de construir nueva en el país, distinta a
              todo lo que conocés. Los que la eligen hoy se adelantan a cómo se
              van a construir las casas de mañana.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="grid gap-8 md:grid-cols-12 md:items-center md:gap-16"
            >
              <Reveal
                className={`relative aspect-[4/5] w-full overflow-hidden bg-cement md:col-span-6 ${
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

      {/* La fábrica — bloque oscuro, grilla numerada */}
      <section className="bg-iron text-alabaster">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <p className="kicker text-alabaster/60">Nuestra fábrica</p>
            <h2 className="display-lg mt-6">Producción propia.</h2>
            <p className="lede mt-8 max-w-2xl text-cement/85">
              Todo lo que es hormigón, concreto o metal en una casa CRUDO sale
              de nuestra propia fábrica y de nuestro taller de herrería. Así
              decidimos cómo se ve, cómo se comporta y cuánto dura cada parte
              de tu casa.
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

      <FinalCta
        title={"¿Querés entrar\nen los detalles técnicos?"}
        text="Si sos arquitecto, ingeniero o cliente técnico, escribinos y lo conversamos."
      />
    </>
  );
}
