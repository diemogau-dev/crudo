import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { clientSteps } from "@/lib/content";

type StepId = (typeof clientSteps)[number]["id"];

// Íconos de línea fina dibujados a mano para seguir la estética editorial:
// trazo de 1.25 px, sin rellenos ni esquinas redondeadas.
const icons: Record<StepId, ReactNode> = {
  diseno: (
    <>
      <rect x="8" y="10" width="34" height="42" />
      <path d="M14 42V30l10-8 10 8v12zM21 42v-7h6v7" />
      <path d="M40 54h16V38zM46 50h5v-5z" />
      <path d="M50 6l6 6-18 18-7 2 2-7z M46 10l6 6" />
    </>
  ),
  fabricacion: (
    <>
      <rect x="10" y="10" width="44" height="44" />
      <path d="M34 10v22h20" />
      <path d="M40 10v22M47 10v22M34 17h20M34 24h20" />
      <path d="M10 46h24v8" />
    </>
  ),
  construccion: (
    <>
      <path d="M8 56h48" />
      <path d="M18 56V16M26 56V16" />
      <path d="M18 20l8 6-8 6 8 6-8 6 8 6-8 6" />
      <path d="M8 16h48M12 16v-4h6M22 16l0-8M14 16l8-8 22 8" />
      <path d="M48 16v12" />
      <rect x="42" y="28" width="12" height="8" />
    </>
  ),
  entrega: (
    <>
      <path d="M6 44l26-10 26 10-26 10z" />
      <path d="M6 44v4l26 10 26-10v-4M32 54v4" />
      <path d="M20 42V26l12-10 12 10v16" />
      <path d="M29 43V33h6v10" />
    </>
  ),
};

export default function ProcessBanner() {
  return (
    <section className="border-t border-hairline py-16 md:py-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker text-muted">Cómo trabajamos</p>
          <h2 className="display-md mt-5">
            Construir con materiales duraderos nunca fue tan fácil.
          </h2>
        </Reveal>

        <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-2 md:mt-16 md:grid-cols-4">
          {clientSteps.map((step, index) => (
            <Reveal
              key={step.id}
              as="li"
              delay={index * 100}
              className={`flex flex-col items-center gap-5 py-8 md:py-4 ${
                index % 2 === 1 ? "border-l border-hairline" : ""
              } ${index > 1 ? "border-t border-hairline md:border-t-0" : ""} ${
                index === 2 ? "md:border-l" : ""
              }`}
            >
              <span className="kicker text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <svg
                viewBox="0 0 64 64"
                className="h-14 w-14 md:h-16 md:w-16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinejoin="miter"
                strokeLinecap="square"
                aria-hidden
              >
                {icons[step.id]}
              </svg>
              <h3 className="kicker">{step.title}</h3>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
