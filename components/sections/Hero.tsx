import Image from "next/image";
import Cta from "@/components/ui/Cta";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden text-alabaster md:min-h-screen">
      <Image
        src="/images/modelos/crudo-02-exterior.jpg"
        alt="Vivienda CRUDO 02: fachada de paneles de hormigón, jardín, deck de madera y pileta"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] md:object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-iron/45" />

      <div className="shell relative flex min-h-[92svh] flex-col justify-end pt-28 pb-16 md:min-h-screen md:pb-24">
        <p className="kicker text-alabaster/75">
          Arquitectura &amp; Concreto · Paraguay
        </p>
        <h1 className="display-xl mt-5 max-w-5xl">
          Módulos y viviendas
          <br />
          industriales.
        </h1>
        <p className="lede mt-8 max-w-lg text-alabaster/90">
          Arquitectura contemporánea, materiales duraderos y un sistema propio
          de diseño, fabricación y construcción.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Cta href={whatsappLink("general")} external variant="solid-inverse">
            Hablemos
          </Cta>
          <Cta href="/modelos" variant="outline-inverse">
            Conocer los modelos
          </Cta>
        </div>
      </div>
    </section>
  );
}
