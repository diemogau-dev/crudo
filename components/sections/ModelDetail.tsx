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
    const ids = sections.map((section) => section.id);
    const readingLine = 160; // px desde arriba del viewport

    const updateActive = () => {
      let current = ids[0];
      for (const id of ids) {
        const node = sectionRefs.current[id];
        if (!node) continue;
        if (node.getBoundingClientRect().top - readingLine <= 0) {
          current = id;
        }
      }
      setActive(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.slug]);

  return (
    <div className="shell pt-24 pb-24 md:pb-32 md:pt-28">
      <div className="flex flex-col md:grid md:grid-cols-[1fr_300px] md:items-start md:gap-14 lg:grid-cols-[1fr_320px] lg:gap-20">
        <div className="order-2 flex flex-col gap-20 md:order-none md:gap-28">
          <div
            id="imagenes"
            ref={(node) => {
              sectionRefs.current.imagenes = node;
            }}
            className="scroll-mt-28"
          >
            <div className="border-b border-hairline pb-4">
              <p className="kicker text-muted">
                {model.tipology} · {model.area}
              </p>
              <h1 className="display-md mt-2">{model.name}</h1>
            </div>
            {model.description.length ? (
              <Reveal className="mt-6 max-w-2xl">
                {model.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="body-text mt-3 text-justify text-muted first:mt-0"
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
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 768px) 76vw, 100vw"
                    priority={index === 0}
                    className="h-auto w-full"
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

          <nav className="mt-6 border-t border-hairline">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`kicker block border-b px-3 py-2.5 transition-colors duration-300 ${
                  active === section.id
                    ? "border-iron bg-iron text-alabaster"
                    : "border-hairline text-muted hover:text-iron"
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-hairline pt-5">
            {model.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="kicker text-muted">{spec.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 border-t border-hairline pt-5">
            <p className="kicker text-muted">Amenities</p>
            <p className="mt-2 text-sm text-muted">
              {model.amenities.join(" · ")}
            </p>
          </div>

          {SHOW_PRICES ? (
            <div className="mt-5 border-t border-hairline pt-5">
              <p className="kicker text-muted">Precio (+IVA)</p>
              <p className="mt-1 text-base font-semibold">
                {model.startingPrice}
              </p>
              <p className="mt-1 text-xs text-muted">
                Ref. {formatGs(PRICE_PER_M2_GS)}/m² — precio provisorio.
              </p>
            </div>
          ) : null}

          <div className="mt-5">
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
