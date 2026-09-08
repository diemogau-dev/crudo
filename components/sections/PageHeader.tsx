import Image from "next/image";

type Props = {
  kicker: string;
  title: string;
  lede?: string;
  image?: { src: string; alt: string; priority?: boolean };
};

export default function PageHeader({ kicker, title, lede, image }: Props) {
  if (!image) {
    return (
      <header className="border-b border-hairline pt-32 md:pt-44">
        <div className="shell pb-16 md:pb-24">
          <p className="kicker text-muted">{kicker}</p>
          <h1 className="display-lg mt-6 max-w-4xl whitespace-pre-line">
            {title}
          </h1>
          {lede ? (
            <p className="lede mt-8 max-w-2xl text-muted">{lede}</p>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header className="relative min-h-[62vh] w-full overflow-hidden text-alabaster md:min-h-[78vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={image.priority}
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-iron/45" />
      <div className="shell relative flex min-h-[62vh] flex-col justify-end pt-32 pb-14 md:min-h-[78vh] md:pb-20">
        <p className="kicker text-alabaster/70">{kicker}</p>
        <h1 className="display-lg mt-5 max-w-5xl whitespace-pre-line">
          {title}
        </h1>
        {lede ? (
          <p className="lede mt-7 max-w-2xl text-alabaster/85">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
