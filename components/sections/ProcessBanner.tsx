import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { clientSteps } from "@/lib/content";

type StepId = (typeof clientSteps)[number]["id"];

// Las piezas que se superponen usan el fondo como relleno para tapar las
// líneas de atrás, como en un dibujo de línea.
const BG = "var(--color-alabaster)";

const icons: Record<StepId, ReactNode> = {
  diseno: (
    <>
      <path d="M10 12h34v38H10z" />
      <path d="M10 12c-3 0-5 2-5 4v32c0-2 2-3 5-3M10 45V12M5 48c0 2 2 4 5 4h6" />
      <path d="M16 38V28l7-6 7 6v10zM14 29l9-8 9 8M21 38v-5h4v5M30 32h6v6h-6M33 32v6" />
      <path d="M30 56h28V28z" fill={BG} />
      <path d="M42 51h10V41z" />
      <path d="M54 6l5 5-20 20-7 2 2-7z" fill={BG} />
      <path d="M50 10l5 5M34 26l5 5" />
    </>
  ),
  fabricacion: (
    <>
      <path d="M10 14h40v40H10z" strokeWidth={3} />
      <rect x="30" y="8" width="26" height="24" fill={BG} stroke="none" />
      <path d="M30 14v18h20" strokeWidth={3} />
      <path d="M36 8v26M42 8v26M48 8v26M54 8v20M30 14h26M30 20h26M30 26h26" />
    </>
  ),
  construccion: (
    <>
      <path d="M28 6v48M34 6v48M28 12l6 6-6 6 6 6-6 6 6 6-6 6" />
      <path d="M14 12h46M14 16h46M14 12v4M60 12v4M20 12l11-8 11 8" />
      <path d="M8 13h6v6H8zM52 16v12M46 28h12v6H46zM44 38h16" />
      <path d="M4 36h20v16H4z" fill={BG} />
      <path d="M24 42h8l4 5v5H24" fill={BG} />
      <path d="M8 41h10M8 45h6" />
      <circle cx="10" cy="54" r="3" fill={BG} />
      <circle cx="29" cy="54" r="3" fill={BG} />
    </>
  ),
  entrega: (
    <>
      <path d="M4 42l28-12 28 12-28 12z" />
      <path d="M4 42v5l28 12 28-12v-5M32 54v5" />
      <path d="M18 43V30l14-6 14 6v13l-14 6z" fill={BG} />
      <path d="M32 49V36M18 30l14 6 14-6M15 30l17-15 17 15M32 36L15 30M32 36l17-6M38 46v-7l5-2v7" />
    </>
  ),
};

export default function ProcessBanner() {
  return (
    <section className="border-t border-hairline py-12 md:py-14">
      <Reveal className="shell">
        <h2 className="text-center text-base font-light tracking-[0.14em] text-muted md:text-xl">
          Construir con <strong className="font-bold">materiales duraderos</strong>{" "}
          nunca fue tan fácil.
        </h2>

        <ol className="mx-auto mt-8 grid max-w-4xl grid-cols-4 gap-2 md:mt-10 md:gap-8">
          {clientSteps.map((step, index) => (
            <li key={step.id} className="flex flex-col items-center">
              <div className="relative">
                <span className="absolute -top-1 -left-4 text-[0.6875rem] font-semibold text-muted md:-left-6 md:text-xs">
                  {index + 1}
                </span>
                <svg
                  viewBox="0 0 64 64"
                  className="h-12 w-12 md:h-[5.5rem] md:w-[5.5rem]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  aria-hidden
                >
                  {icons[step.id]}
                </svg>
              </div>
              <h3 className="mt-3 text-[0.6875rem] font-semibold md:text-sm">
                {step.title}
              </h3>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
