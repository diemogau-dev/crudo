import Image from "next/image";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  model: { name: string; cover: string; coverAlt: string };
};

// Tarjeta de una tipología que todavía no tiene página: misma estética que
// ModelCard, sin datos técnicos y con consulta por WhatsApp.
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
      <p className="kicker mt-3 text-muted">Próximamente</p>

      <p className="body-text mt-5 border-t border-hairline pt-4 text-muted">
        Una nueva tipología CRUDO, muy pronto.
      </p>

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
