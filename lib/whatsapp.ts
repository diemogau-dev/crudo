const WHATSAPP_NUMBER = "595981625546";

export const whatsappMessages = {
  general: "Hola, quiero conocer más sobre CRUDO.",
  crudo01: "Hola, quiero conocer más sobre CRUDO 01.",
  crudo02: "Hola, quiero conocer más sobre CRUDO 02.",
  aMedida:
    "Hola, tengo una idea o proyecto y quiero conversar sobre construir con CRUDO.",
} as const;

export type WhatsappTopic = keyof typeof whatsappMessages;

export function whatsappLink(topic: WhatsappTopic = "general") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessages[topic],
  )}`;
}
