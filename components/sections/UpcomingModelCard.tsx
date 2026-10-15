import Image from "next/image";
import { featureIcons } from "@/components/sections/ModelCard";
import type { ModelFeatureIcon } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  model: {
    name: string;
    area: string;
    features: { icon: ModelFeatureIcon; label: string }[];
    cover: string;
    coverAlt: string;
  };
};

// Tarjeta de una tipología que todavía no tiene página: misma estética que
// ModelCard, con consulta por WhatsApp en lugar del detalle.
export default function UpcomingModelCard({ model }: Props) {
  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
        <Image
          src={model.cover}
          alt={model.coverAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="display-md mt-6">{model.name}</h3>
      <p className="kicker mt-3 text-muted">Próximamente · {model.area}</p>

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

      <a
        href={whatsappLink("general")}
        target="_blank"
        rel="noopener noreferrer"
        className="group kicker mt-7 inline-flex items-center gap-3 border border-iron px-6 py-3.5 transition-colors duration-300 hover:bg-iron hover:text-alabaster"
      >
        Consultar
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}
