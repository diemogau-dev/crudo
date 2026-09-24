"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/sections/Faq";
import {
  SHOW_PRICES,
  PRICE_PER_M2_GS,
  formatGs,
  type Model,
} from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

type FaqItem = { question: string; answer: string };
type ConstructionSpecGroup = { label: string; items: string[] };

type Props = {
  model: Model;
  other?: Model;
  constructionSpecs: ConstructionSpecGroup[];
  faqs: FaqItem[];
};

export default function ModelDetail({
  model,
  other,
  constructionSpecs,
  faqs,
}: Props) {
  const sections = [
    { id: "imagenes", label: "Imágenes" },
    ...(model.plan ? [{ id: "planos", label: "Planos" }] : []),
    { id: "especificaciones", label: "Especificaciones" },
    { id: "preguntas-frecuentes", label: "Preguntas frecuentes" },
  ];

  const [active, setActive] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const node = sectionRefs.current[section.id];
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.slug]);

  return (
    <div className="shell pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="flex flex-col md:grid md:grid-cols-[1fr_300px] md:items-start md:gap-14 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="order-2 flex flex-col gap-20 md:order-none md:gap-28">
          <div
            id="imagenes"
            ref={(node) => {
              sectionRefs.current.imagenes = node;
            }}
            className="scroll-mt-28"
          >
            <p className="kicker border-b border-hairline pb-4 text-muted">
              Imágenes
            </p>
            {model.description.length ? (
              <Reveal className="mt-6 max-w-2xl">
                {model.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="body-text mt-3 text-muted first:mt-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ) : null}
            <div className="mt-8 flex flex-col gap-3">
              {model.gallery.map((image, index) => (
                <Reveal
                  key={image.src}
                  delay={index * 50}
                  className="relative w-full overflow-hidden bg-cement"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 768px) 76vw, 100vw"
                    priority={index === 0}
                    className="h-auto w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>

          {model.plan ? (
            <div
              id="planos"
              ref={(node) => {
                sectionRefs.current.planos = node;
              }}
              className="scroll-mt-28"
            >
              <p className="kicker border-b border-hairline pb-4 text-muted">
                Planos
              </p>
              <Reveal className="relative mt-8 w-full overflow-hidden bg-alabaster ring-1 ring-hairline">
                <Image
                  src={model.plan.src}
                  alt={model.plan.alt}
                  width={model.plan.width}
                  height={model.plan.height}
                  sizes="(min-width: 768px) 76vw, 100vw"
                  className="h-auto w-full object-contain"
                />
              </Reveal>
            </div>
          ) : null}

          <div
            id="especificaciones"
            ref={(node) => {
              sectionRefs.current.especificaciones = node;
            }}
            className="scroll-mt-28"
          >
            <p className="kicker border-b border-hairline pb-4 text-muted">
              Especificaciones
            </p>
            <Reveal className="mt-6 max-w-2xl">
              <p className="body-text text-muted">
                Mismo sistema constructivo en todas las tipologías CRUDO.
                Estas son las definiciones generales; los detalles finos se
                cierran en el proyecto ejecutivo de cada obra.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {constructionSpecs.map((group, index) => (
                <Reveal
                  key={group.label}
                  delay={index * 50}
                  className="border-t border-hairline pt-5"
                >
                  <h3 className="text-sm font-semibold tracking-tight">
                    {group.label}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="body-text flex gap-3 text-muted"
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

          <div
            id="preguntas-frecuentes"
            ref={(node) => {
              sectionRefs.current["preguntas-frecuentes"] = node;
            }}
            className="scroll-mt-28"
          >
            <p className="kicker border-b border-hairline pb-4 text-muted">
              Preguntas frecuentes
            </p>
            <div className="mt-4">
              <Faq items={faqs} />
            </div>
          </div>

          {other ? (
            <Reveal className="border-t border-hairline pt-8">
              <Link
                href={`/tipologias/${other.slug}`}
                className="group flex items-baseline justify-between gap-6"
              >
                <span>
                  <span className="kicker text-muted">
                    Siguiente tipología
                  </span>
                  <span className="display-sm mt-2 block">{other.name}</span>
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ) : null}
        </div>

        <aside className="order-1 mb-14 md:order-none md:sticky md:top-28 md:mb-0 md:self-start">
          <p className="kicker text-muted">{model.tipology}</p>
          <h1 className="display-sm mt-2">{model.name}</h1>

          <nav className="mt-8 border-t border-hairline">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`kicker flex items-center justify-between gap-3 border-b border-hairline py-3 transition-colors duration-300 ${
                  active === section.id ? "text-iron" : "text-muted"
                }`}
              >
                {section.label}
                {active === section.id ? (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-iron" />
                ) : null}
              </a>
            ))}
          </nav>

          <dl className="mt-8 space-y-4">
            {model.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="kicker text-muted">{spec.label}</dt>
                <dd className="mt-1 text-base font-semibold">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 border-t border-hairline pt-6">
            <p className="kicker text-muted">Amenities</p>
            <ul className="mt-3 space-y-2">
              {model.amenities.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {SHOW_PRICES ? (
            <div className="mt-8 border-t border-hairline pt-6">
              <p className="kicker text-muted">Precio (+IVA)</p>
              <p className="mt-1 text-lg font-semibold">
                {model.startingPrice}
              </p>
              <p className="mt-2 text-xs text-muted">
                Referencia de {formatGs(PRICE_PER_M2_GS)}/m². Precio
                orientativo mientras cerramos el presupuesto definitivo.
              </p>
            </div>
          ) : null}

          <div className="mt-8">
            <Cta
              href={whatsappLink(model.whatsapp)}
              external
              className="w-full justify-center"
            >
              Hablemos de {model.name}
            </Cta>
          </div>
        </aside>
      </div>
    </div>
  );
}
