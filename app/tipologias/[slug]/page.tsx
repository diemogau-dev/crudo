import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCta from "@/components/sections/FinalCta";
import ModelDetail from "@/components/sections/ModelDetail";
import { models, constructionSpecs, faqs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = models.find((item) => item.slug === slug);
  if (!model) return {};

  return {
    title: model.name,
    description: `${model.name}: ${model.tipology.toLowerCase()} de ${model.area}. ${model.summary}`,
    openGraph: {
      title: "Arquitectura & Concreto",
      description: model.shareDescription,
      images: [model.cover],
    },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const index = models.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const model = models[index];
  const other =
    models.length > 1 ? models[(index + 1) % models.length] : undefined;

  return (
    <>
      <ModelDetail
        model={model}
        other={other}
        constructionSpecs={constructionSpecs}
        faqs={faqs}
      />

      <FinalCta
        title={`¿Te imaginás\nun ${model.name} en tu terreno?`}
        text="Contanos dónde querés construir. Revisamos el terreno y preparamos una propuesta."
        topic={model.whatsapp}
        label={`Hablemos de ${model.name}`}
      />
    </>
  );
}
