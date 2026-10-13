import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Proyectos a Medida",
  description:
    "Viviendas, quinchos, oficinas, gimnasios o lo que tengas en mente: el sistema constructivo de CRUDO está listo para construir cualquier proyecto a medida.",
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

const possibilityGroups = [
  {
    title: "Espacios para vivir",
    items: [
      "Viviendas",
      "Casas de fin de semana",
      "Espacios de huéspedes",
      "Ampliaciones",
    ],
  },
  {
    title: "Espacios para disfrutar",
    items: ["Quinchos", "Oficinas", "Gimnasios", "Salas de entretenimiento"],
  },
  {
    title: "Lo que completa el proyecto",
    items: ["Piletas", "Vestuarios", "Saunas"],
  },
];

export default function AMedidaPage() {
  return (
    <>
      <PageHeader
        kicker="Proyectos a medida"
        title={"Si lo imaginás,\nlo construimos."}
        lede="Una casa para toda la familia, un quincho, una oficina, un gimnasio o algo que todavía no tiene nombre: nuestro sistema de hormigón armado está listo para construir cualquier proyecto, en cualquier escala, con el mismo control y un precio cerrado desde el inicio."
        image={{
          src: "/images/a-medida/crudo-04-lateral.jpg",
          alt: "Proyecto CRUDO con techo a dos aguas, galería vidriada, celosía de concreto, deck de madera y pileta",
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
          {/* Foto a todo el ancho y en su proporción original: el módulo entra completo. */}
          <Reveal className="relative aspect-[1527/704] w-full overflow-hidden bg-cement">
            <Image
              src="/images/a-medida/gym-noche.jpg"
              alt="Gimnasio CRUDO de noche: frente vidriado, paneles de hormigón e iluminación exterior"
              fill
              sizes="(min-width: 1680px) 1560px, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <p className="kicker text-muted">Qué podemos construir</p>
              <h2 className="display-lg mt-6">Un sistema que se adapta.</h2>
              <p className="body-text mt-8 text-muted">
                Desde una casa para toda la familia hasta un gimnasio en el
                fondo de tu terreno: el mismo sistema, adaptado a lo que
                necesitás.
              </p>
            </Reveal>

            <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
              <div className="space-y-8">
                {possibilityGroups.map((group) => (
                  <div key={group.title}>
                    <p className="kicker text-iron">{group.title}</p>
                    <ul className="mt-3 flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="kicker border border-hairline px-4 py-3 text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
              text: "Nuestra fábrica produce y nuestro equipo ejecuta, hasta la entrega.",
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
