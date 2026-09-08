import Link from "next/link";
import type { ReactNode } from "react";

type Variant =
  | "solid"
  | "outline"
  | "inline"
  | "solid-inverse"
  | "outline-inverse";

const variants: Record<Variant, string> = {
  solid: "bg-iron text-alabaster px-7 py-4 hover:bg-iron/85",
  "solid-inverse": "bg-alabaster text-iron px-7 py-4 hover:bg-cement",
  outline:
    "border border-hairline text-iron px-7 py-4 hover:border-iron hover:bg-iron hover:text-alabaster",
  "outline-inverse":
    "border border-hairline-inverse text-alabaster px-7 py-4 hover:bg-alabaster hover:text-iron",
  inline:
    "text-iron border-b border-hairline pb-1 hover:border-iron [&>span:last-child]:ml-2",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export default function Cta({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const classes = `group inline-flex items-center justify-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
