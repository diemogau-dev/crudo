import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SHOW_PRICES, type Model, type ModelFeatureIcon } from "@/lib/content";

export const featureIcons: Record<ModelFeatureIcon, ReactNode> = {
  bed: <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M6 11.5h2" />,
  bath: (
    <path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM7 19l-1 2M17 19l1 2M6 12V6a2 2 0 0 1 4 0" />
  ),
  kitchen: (
    <path d="M4 4h16v16H4zM4 9h16M8 6.5h.01M12 6.5h.01M9 13h6v4H9z" />
  ),
  living: <path d="M5 11V7h14v4M3 11h4v4h10v-4h4v6H3zM5 17v2M19 17v2" />,
  terrace: <path d="M3 9l9-5 9 5M12 4v12M3 16h18M3 20h18M6 16v4M18 16v4" />,
  grill: (
    <path d="M4 10h16a8 8 0 0 1-16 0zM8 18l-2 3M16 18l2 3M9 3c-1 1.5 1 2.5 0 4M13 3c-1 1.5 1 2.5 0 4M17 3c-1 1.5 1 2.5 0 4" />
  ),
};

export default function ModelCard({
  model,
  showPrice = true,
}: {
  model: Model;
  showPrice?: boolean;
}) {
  const cover = model.cardCover ?? { src: model.cover, alt: model.coverAlt };

  return (
    <Link
      href={`/tipologias/${model.slug}`}
      className="group block"
      aria-label={`Conocer ${model.name}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="display-md mt-6">{model.name}</h3>
      <p className="kicker mt-3 text-muted">
        {model.tipology} · {model.area}
      </p>

      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-4">
        {model.features.map((feature) => (
          <li
            key={feature.label}
            className="body-text flex items-center gap-2 text-muted"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {featureIcons[feature.icon]}
            </svg>
            {feature.label}
          </li>
        ))}
      </ul>

      {SHOW_PRICES && showPrice ? (
        <p className="kicker mt-4 text-iron">{model.startingPrice}</p>
      ) : null}

      {/* La tarjeta entera ya es un link: el botón es visual, no un <a> anidado. */}
      <span className="kicker mt-7 inline-flex items-center gap-3 border border-iron px-6 py-3.5 transition-colors duration-300 group-hover:bg-iron group-hover:text-alabaster">
        Ver más detalles
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
