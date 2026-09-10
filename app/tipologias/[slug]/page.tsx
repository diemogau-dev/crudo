import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/sections/PageHeader";
import FinalCta from "@/components/sections/FinalCta";
import { models } from "@/lib/content";
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
    openGraph: { images: [model.cover] },
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
        image={{ src: model.cover, alt: model.coverAlt, priority: true }}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            {model.description.map((paragraph) => (
              <p
                key={paragraph}
                className="body-text mt-6 text-muted first:mt-0"
              >
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

            <div className="mt-10 border-t border-hairline pt-8">
              <p className="kicker text-muted">Diseñado dentro de un mismo sistema</p>
              <p className="body-text mt-4 text-muted">{model.systemNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-20 md:pb-32">
        <div className="grid gap-4 md:grid-cols-2">
          {model.gallery.map((image, index) => (
            <Reveal
              key={image.src}
              delay={index * 90}
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
                sizes={image.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-16 md:py-20">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="kicker text-muted">Sobre el presupuesto</p>
            <p className="display-md mt-4">{model.startingPrice}</p>
            <p className="body-text mt-5 text-muted">
              El número final depende del terreno, la ubicación y los trabajos
              necesarios para prepararlo. Preferimos conocer tu caso antes de
              confirmar la inversión definitiva.
            </p>
          </Reveal>

          {other ? (
            <Reveal className="mt-14" delay={90}>
              <Link
                href={`/tipologias/${other.slug}`}
                className="group flex items-baseline justify-between gap-6 border-t border-hairline pt-8"
              >
                <span>
                  <span className="kicker text-muted">Siguiente tipología</span>
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
          ) : null}
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
