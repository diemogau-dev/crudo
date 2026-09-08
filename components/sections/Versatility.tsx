"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import { versatilityUses } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export default function Versatility() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setIndex((value) => (value + 1) % versatilityUses.length),
      2600,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-iron text-alabaster">
      <Image
        src="/images/tipologias/crudo-01-frente.jpg"
        alt="Frente vidriado del loft CRUDO 01 abierto al jardín"
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="shell relative py-24 md:py-40">
        <Reveal className="max-w-4xl">
          <p className="kicker text-alabaster/70">Versatilidad</p>
          <h2 className="display-lg mt-6">
            Un espacio.
            <br />
            Muchas posibilidades.
          </h2>

          <p className="kicker mt-12 text-alabaster/60">Hoy puede ser</p>
          <p
            className="display-md mt-4 min-h-[2.2em] font-medium normal-case tracking-[-0.02em] text-cement sm:min-h-[1.1em]"
            aria-live="off"
          >
            <span key={index} className="inline-block fade-up">
              {versatilityUses[index]}
            </span>
          </p>

          <p className="body-text mt-10 max-w-xl text-alabaster/85">
            Una escapada de la ciudad. Un lugar para recibir amigos. Un espacio
            que tu casa todavía no tiene. La arquitectura cambia según cómo la
            vivís.
          </p>

          <div className="mt-12">
            <Cta
              href={whatsappLink("aMedida")}
              external
              variant="solid-inverse"
            >
              Contanos qué tenés en mente
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
