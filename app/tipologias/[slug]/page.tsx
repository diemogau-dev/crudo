import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import {
  SHOW_PRICES,
  PRICE_PER_M2_GS,
  formatGs,
  models,
  constructionSpecs,
  faqs,
} from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = models.find((item) => item.slug === slug);
  if (!model) return {};

  return {
    title: model.name,
    description: `${model.name}: ${model.tipology.toLowerCase()} de ${model.area}. ${model.summary}`,
    openGraph: {
      title: "Arquitectura & Concreto",
      description: model.shareDescription,
      images: [model.cover],
    },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const model = models.find((item) => item.slug === slug);
  if (!model) notFound();

  const other = models.find((item) => item.slug !== model.slug);

  return (
    <>
      <PageHeader
        kicker={`${model.tipology} · ${model.area}`}
        title={model.name}
        lede={model.summary}
      />

      <section className="shell pt-4 pb-12 md:pb-16">
        <Reveal className="max-w-3xl">
          {model.description.map((paragraph) => (
            <p
              key={paragraph}
              className="body-text mt-5 text-muted first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="flex flex-col gap-4">
              {model.gallery.map((image, index) => (
                <Reveal
                  key={image.src}
                  delay={index * 60}
                  className="relative w-full overflow-hidden bg-cement"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    priority={index === 0}
                    className="h-auto w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <Reveal className="md:sticky md:top-28">
              {SHOW_PRICES ? (
                <div className="border-b border-hairline pb-6">
                  <p className="kicker text-muted">Inversión estimada</p>
                  <p className="display-md mt-3">{model.startingPrice}</p>
                  <p className="body-text mt-3 text-muted">
                    Referencia de {formatGs(PRICE_PER_M2_GS)}/m² + IVA.
                    Precio orientativo mientras cerramos el presupuesto
                    definitivo — te confirmamos el número exacto al
                    conversar.
                  </p>
                </div>
              ) : null}

              <dl className="mt-6">
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

              <div className="mt-8">
                <p className="kicker text-muted">Amenities</p>
                <ul className="mt-4 space-y-3">
                  {model.amenities.map((item) => (
                    <li key={item} className="body-text flex gap-4">
                      <span aria-hidden className="text-muted">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Cta
                  href={whatsappLink(model.whatsapp)}
                  external
                  className="w-full justify-center"
                >
                  Hablemos de {model.name}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {model.plan ? (
        <section className="border-t border-hairline py-16 md:py-24">
          <div className="shell">
            <Reveal>
              <p className="kicker text-muted">Planos</p>
              <h2 className="display-md mt-4">
                Cómo se organiza {model.name}
              </h2>
            </Reveal>
            <Reveal
              delay={100}
              className="relative mt-10 w-full overflow-hidden bg-alabaster"
            >
              <Image
                src={model.plan.src}
                alt={model.plan.alt}
                width={model.plan.width}
                height={model.plan.height}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-hairline py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="kicker text-muted">Especificaciones</p>
            <h2 className="display-md mt-4">Ficha técnica simplificada</h2>
            <p className="body-text mt-5 text-muted">
              Mismo sistema constructivo en todas las tipologías CRUDO. Estas
              son las definiciones generales; los detalles finos se cierran
              en el proyecto ejecutivo de cada obra.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {constructionSpecs.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 60}
                className="border-t border-hairline pt-6"
              >
                <h3 className="kicker">{group.label}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="body-text flex gap-4 text-muted"
                    >
                      <span aria-hidden>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {other ? (
        <section className="border-t border-hairline py-16 md:py-20">
          <div className="shell">
            <Reveal>
              <Link
                href={`/tipologias/${other.slug}`}
                className="group flex items-baseline justify-between gap-6"
              >
                <span>
                  <span className="kicker text-muted">
                    Siguiente tipología
                  </span>
                  <span className="display-md mt-3 block">{other.name}</span>
                </span>
                <span
                  aria-hidden
                  className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-hairline py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="kicker text-muted">Preguntas frecuentes</p>
            <h2 className="display-md mt-4">Antes de escribirnos</h2>
          </Reveal>
          <div className="mt-10">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <FinalCta
        title={`¿Te imaginás\nun ${model.name} en tu terreno?`}
        text="Contanos dónde querés construir. Revisamos el terreno y preparamos una propuesta."
        topic={model.whatsapp}
        label={`Hablemos de ${model.name}`}
      />
    </>
  );
}
