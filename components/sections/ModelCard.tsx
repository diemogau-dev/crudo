import Image from "next/image";
import Link from "next/link";
import type { Model } from "@/lib/content";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Link
      href={`/modelos/${model.slug}`}
      className="group block"
      aria-label={`Conocer ${model.name}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cement">
        <Image
          src={model.cover}
          alt={model.coverAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-7 flex flex-col gap-2 border-b border-hairline pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="display-md">{model.name}</h3>
        <p className="kicker whitespace-nowrap text-muted">
          {model.tipology} · {model.area}
        </p>
      </div>

      <p className="body-text mt-5 max-w-sm text-muted">{model.summary}</p>

      <span className="kicker mt-7 inline-flex items-center gap-3 border-b border-hairline pb-1 transition-colors duration-300 group-hover:border-iron">
        Conocer el proyecto
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
