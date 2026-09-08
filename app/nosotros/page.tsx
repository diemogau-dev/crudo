import type { Metadata } from "next";
import Image from "next/image";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Por qué hacemos lo que hacemos: el concreto como material honesto, el oficio de quienes lo trabajan y una forma de construir pensada desde Paraguay.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        kicker="Nosotros"
        title={"Creemos en los materiales\nque no mienten."}
        lede="El concreto no se disfraza. No imita madera, ni piedra, ni mármol. Muestra de qué está hecho y envejece sin pedir permiso."
        image={{
          src: "/images/tipologias/crudo-01-interior.jpg",
          alt: "Interior de un loft CRUDO: muro de hormigón, madera cálida y luz natural",
          priority: true,
        }}
      />

      {/* Por qué existimos */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="kicker text-muted">Por qué existimos</p>
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
              Meses de obra, decisiones improvisadas sobre la marcha,
              proveedores que no se hablan entre sí, y un resultado que se
              parece apenas a lo que se había imaginado.
            </p>
            <p className="body-text mt-6 text-muted">
              Nos cansamos de eso. CRUDO nació de una idea simple: si el diseño,
              la fabricación y la construcción están en las mismas manos, el
              resultado deja de ser una sorpresa y empieza a ser una decisión.
            </p>
            <p className="body-text mt-6 text-muted">
              No somos una fábrica que además construye, ni un estudio que
              terceriza todo. Somos las dos cosas a la vez.
            </p>
          </Reveal>
        </div>
      </section>

      {/* El material */}
      <section className="border-t border-hairline bg-cement/35">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <p className="kicker text-muted">El material</p>
            <h2 className="display-lg mt-6">
              Sólido afuera.
              <br />
              Cálido adentro.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <p className="lede">
                Elegimos el concreto porque es honesto y porque dura. En un país
                de calor, humedad y sol fuerte, hay pocas cosas que se comporten
                mejor con el paso del tiempo.
              </p>
              <p className="body-text mt-6 text-muted">
                Tiene una cualidad rara: es firme y silencioso a la vez. Un muro
                bien hecho no necesita adornos. Ya tiene textura, sombra y
                carácter.
              </p>
              <p className="body-text mt-6 text-muted">
                Pero un espacio no se vive desde afuera. Por eso trabajamos el
                concreto junto a la madera, el metal, la luz y el verde.
              </p>
            </Reveal>

            <Reveal
              className="relative aspect-[4/5] w-full overflow-hidden bg-cement md:col-span-5 md:col-start-8"
              delay={120}
            >
              <Image
                src="/images/proceso/muro-detalle.png"
                alt="Detalle de un muro de concreto visto, con sus juntas y perforaciones de anclaje"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Las manos */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
              <Image
                src="/images/proceso/oficio.png"
                alt="Trabajo manual sobre un molde de concreto en el taller"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
            <p className="kicker text-muted">Las manos</p>
            <h2 className="display-lg mt-6">
              El oficio
              <br />
              no se improvisa.
            </h2>
            <p className="body-text mt-8 text-muted">
              Detrás de cada pieza hay gente que conoce el material. Que sabe
              cuándo una mezcla está lista, cuánto tiempo necesita curar una
              pieza y cuándo algo no está a la altura y hay que volver a
              hacerlo.
            </p>
            <p className="body-text mt-6 text-muted">
              Ese conocimiento no se compra hecho. Somos un equipo chico y
              obsesivo: un arquitecto con quince años dirigiendo obras y
              desarrollando piezas de concreto, un taller propio, y artesanos
              paraguayos que hacen las cosas bien porque no saben hacerlas de
              otra manera.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Desde Paraguay */}
      <section className="bg-iron text-alabaster">
        <div className="shell py-24 md:py-40">
          <Reveal className="max-w-4xl">
            <p className="kicker text-alabaster/60">Desde Paraguay</p>
            <h2 className="display-lg mt-6">
              Hecho acá,
              <br />
              para acá.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <p className="lede text-cement/90">
                Todo lo que hacemos se piensa, se fabrica y se construye en
                Paraguay. Con materiales de esta tierra y con la gente que sabe
                trabajarlos.
              </p>
            </Reveal>
            <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
              <p className="body-text text-alabaster/70">
                No importamos una fórmula de afuera para aplicarla sin pensar.
                Adaptamos cada proyecto al clima y a la luz de este lugar:
                sombra donde hace falta, ventilación cruzada, materiales que
                aguantan el verano y espacios que se abren al afuera, porque acá
                se vive afuera.
              </p>
              <p className="body-text mt-6 text-alabaster/70">
                Arquitectura de autor, producida con el control de una fábrica y
                el cuidado de un taller.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="shell py-24 md:py-36">
        <Reveal className="max-w-4xl">
          <p className="kicker text-muted">Cómo trabajamos</p>
          <h2 className="display-lg mt-6">
            No vendemos casas.
            <br />
            Construimos espacios completos.
          </h2>
          <p className="lede mt-10 max-w-xl text-muted">
            Diseñamos el proyecto, fabricamos las piezas, controlamos la calidad
            y ejecutamos la obra hasta la entrega. Un solo equipo, un solo
            responsable.
          </p>
          <div className="mt-12">
            <Cta href="/sistema" variant="outline">
              Conocer el sistema
            </Cta>
          </div>
        </Reveal>
      </section>

      <FinalCta
        title={"¿Empezamos\npor tu lugar?"}
        text="Contanos dónde querés construir y qué tenés en mente."
      />
    </>
  );
}
