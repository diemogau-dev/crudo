import Reveal from "@/components/ui/Reveal";

type FaqItem = { question: string; answer: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      {items.map((faq, index) => (
        <Reveal key={faq.question} delay={index * 40}>
          <details className="group border-b border-hairline">
            <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-6 [&::-webkit-details-marker]:hidden md:grid-cols-12 md:gap-x-8">
              <span className="kicker text-muted md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display-sm md:col-span-9">{faq.question}</span>
              <span
                aria-hidden
                className="text-xl leading-none text-muted transition-transform duration-300 group-open:rotate-45 md:col-span-2 md:justify-self-end"
              >
                +
              </span>
            </summary>
            <div className="grid gap-x-6 pb-8 md:grid-cols-12 md:gap-x-8">
              <p className="body-text max-w-2xl text-muted md:col-span-9 md:col-start-2">
                {faq.answer}
              </p>
            </div>
          </details>
        </Reveal>
      ))}
    </>
  );
}
