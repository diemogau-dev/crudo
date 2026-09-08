import type { Metadata } from "next";
import Image from "next/image";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import { models } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Modelos",
  description:
    "CRUDO 01 y CRUDO 02: un loft de 28 m² y una vivienda industrial de 60 m², diseñados y construidos con nuestro sistema de hormigón y concreto.",
};

export default function ModelosPage() {
  return (
    <>
      <PageHeader
        kicker="Modelos"
        title={"Dos proyectos.\nMuchas formas de vivirlos."}
        lede="Dos espacios diseñados para adaptarse a diferentes terrenos, estilos de vida y formas de usar la arquitectura. Y una lista que va a seguir creciendo."
        image={{
          src: "/images/modelos/crudo-01-exterior-aereo.jpg",
          alt: "Vista aérea del loft CRUDO 01 con deck de madera y frente vidriado",
          priority: true,
        }}
      />

      {models.map((model, index) => (
        <section
          key={model.slug}
          id={model.slug}
          className={`scroll-mt-20 border-t border-hairline py-20 md:py-32 ${
            index % 2 === 1 ? "bg-cement/30" : ""
          }`}
        >
          <div className="shell">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <Reveal className="md:col-span-5">
                <p className="kicker text-muted">
                  {model.tipology} · {model.area}
                </p>
                <h2 className="display-lg mt-5">{model.name}</h2>
                {model.description.map((paragraph) => (
                  <p key={paragraph} className="body-text mt-6 text-muted">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-10">
                  <Cta href={whatsappLink(model.whatsapp)} external>
                    Hablemos de {model.name}
                  </Cta>
                </div>
              </Reveal>

              <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
                <dl>
                  {model.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                    >
                      <dt className="body-text text-muted">{spec.label}</dt>
                      <dd className="kicker">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="kicker mt-12 text-muted">Sistema</p>
                <ul className="mt-5 space-y-3">
                  {model.system.map((item) => (
                    <li key={item} className="body-text flex gap-4">
                      <span aria-hidden className="text-muted">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
              {model.gallery.map((image, imageIndex) => (
                <Reveal
                  key={image.src}
                  delay={imageIndex * 90}
                  className={`relative w-full overflow-hidden bg-cement ${
                    image.wide
                      ? "aspect-[16/9] md:col-span-2 md:aspect-[21/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      image.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"
                    }
                    className="object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-hairline py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="kicker text-muted">Sobre el presupuesto</p>
            <p className="lede mt-6">
              El presupuesto de cada proyecto depende del terreno, la ubicación
              y los trabajos necesarios para prepararlo y ejecutarlo. Por eso
              preferimos conocer tu caso antes de dar un número, y después
              preparar una propuesta clara con el alcance correspondiente.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={"¿Cuál se parece más\na lo que tenés en mente?"}
        text="Contanos dónde querés construir. Podemos revisar el terreno, adaptar el proyecto y preparar una propuesta."
      />
    </>
  );
}
