import Image from "next/image";

type Props = {
  variant: "iron" | "alabaster";
  className?: string;
  priority?: boolean;
};

const sources = {
  iron: "/logo/crudo-wordmark-iron.png",
  alabaster: "/logo/crudo-wordmark-alabaster.png",
} as const;

// Wordmark original de CRUDO, exportado sobre negro/blanco y con el fondo
// recortado a transparente — ver context/crudo/decisiones-y-preguntas.md.
export default function Logo({ variant, className = "", priority }: Props) {
  return (
    <Image
      src={sources[variant]}
      alt="CRUDO"
      width={687}
      height={205}
      priority={priority}
      className={`h-6 w-auto md:h-7 ${className}`}
    />
  );
}
