import Cta from "@/components/ui/Cta";
import Reveal from "@/components/ui/Reveal";
import { whatsappLink, type WhatsappTopic } from "@/lib/whatsapp";

type Props = {
  title?: string;
  text?: string;
  topic?: WhatsappTopic;
  label?: string;
};

export default function FinalCta({
  title = "¿Tenés una idea en mente?\nContanos. Nosotros la hacemos realidad.",
  text = "Hablemos de tu terreno, tu idea o el espacio que querés crear, y la llevamos a CRUDO.",
  topic = "general",
  label = "Hablemos",
}: Props) {
  return (
    <section className="bg-iron text-alabaster">
      <div className="shell py-24 text-center md:py-40">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="display-lg whitespace-pre-line">{title}</h2>
          <p className="lede mx-auto mt-8 max-w-xl text-cement/80">{text}</p>
          <div className="mt-12 flex justify-center">
            <Cta href={whatsappLink(topic)} external variant="solid-inverse">
              {label}
            </Cta>
          </div>
          <p className="kicker mt-14 text-alabaster/40">Asunción · Paraguay</p>
        </Reveal>
      </div>
    </section>
  );
}
