"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.7;
      const nearBottom =
        window.scrollY + window.innerHeight >
        document.documentElement.scrollHeight - 620;
      setVisible(past && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={whatsappLink("general")}
        target="_blank"
        rel="noopener noreferrer"
        className="kicker flex items-center justify-center gap-3 bg-iron px-6 py-4 text-alabaster"
      >
        Hablemos
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
