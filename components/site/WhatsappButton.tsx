import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsappButton() {
  return (
    <a
      href={whatsappLink("general")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-11 w-11 items-center justify-center border border-hairline-inverse bg-iron text-alabaster transition-colors duration-300 hover:bg-iron/85 md:right-6 md:bottom-6 md:h-13 md:w-13"
    >
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        className="h-5 w-5 md:h-6 md:w-6"
        fill="currentColor"
      >
        <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.34.66 4.53 1.8 6.4L4 29l7.8-1.75A11.94 11.94 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3Zm0 21.7c-2 0-3.87-.55-5.47-1.5l-.39-.23-4.63 1.04 1-4.5-.26-.42a9.65 9.65 0 0 1-1.5-5.09c0-5.36 4.4-9.7 9.79-9.7 5.38 0 9.75 4.34 9.75 9.7 0 5.35-4.37 9.7-9.75 9.7Zm5.4-7.26c-.29-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.56-.34Z" />
      </svg>
    </a>
  );
}
