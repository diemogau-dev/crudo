import type { WhatsappTopic } from "./whatsapp";

export const navLinks = [
  { href: "/modelos", label: "Modelos" },
  { href: "/sistema", label: "El Sistema" },
  { href: "/a-medida", label: "A Medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
] as const;

export type Model = {
  slug: string;
  name: string;
  tipology: string;
  area: string;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  system: string[];
  whatsapp: WhatsappTopic;
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string; wide?: boolean }[];
};

export const models: Model[] = [
  {
    slug: "crudo-01",
    name: "CRUDO 01",
    tipology: "Loft",
    area: "28 m²",
    summary:
      "Un ambiente, baño y deck exterior. El espacio independiente que tu terreno todavía no tiene.",
    description: [
      "CRUDO 01 es un loft de un solo ambiente pensado para vivirse entero. Un volumen limpio de hormigón, un frente vidriado que abre el interior al terreno y un deck que extiende el espacio hacia afuera.",
      "Funciona como casa de fin de semana, espacio de huéspedes, oficina o retiro en el fondo de una propiedad que ya existe. Cambia según cómo lo uses.",
    ],
    specs: [
      { label: "Superficie", value: "28 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
      { label: "Deck exterior", value: "Incluido" },
    ],
    system: [
      "Hormigón armado con paneles de nuestro taller",
      "Techo metálico con pendiente única",
      "Bacha, tina y pisos de concreto propios",
    ],
    whatsapp: "crudo01",
    cover: "/images/modelos/crudo-01-exterior-aereo.jpg",
    coverAlt:
      "Vista aérea del loft CRUDO 01: volumen de paneles de hormigón, frente vidriado y deck de madera sobre césped",
    gallery: [
      {
        src: "/images/modelos/crudo-01-frente.jpg",
        alt: "Frente vidriado del loft CRUDO 01 con deck de madera y estructura metálica negra",
      },
      {
        src: "/images/modelos/crudo-01-volumen.jpg",
        alt: "Volumen exterior de CRUDO 01 mostrando la grilla de paneles de hormigón y el techo de pendiente única",
      },
      {
        src: "/images/modelos/crudo-01-interior.jpg",
        alt: "Interior de CRUDO 01: muro de hormigón, cabecera de madera y salida al deck exterior",
        wide: true,
      },
    ],
  },
  {
    slug: "crudo-02",
    name: "CRUDO 02",
    tipology: "Vivienda industrial",
    area: "60 m²",
    summary:
      "Dos habitaciones, cocina y comedor integrados al estar, con deck exterior. Una casa completa.",
    description: [
      "CRUDO 02 es una vivienda de estilo industrial resuelta en un solo nivel. La cocina y el comedor se integran al estar, y el deck exterior se suma al espacio principal en lugar de quedar afuera de él.",
      "La celosía de concreto y la pérgola de madera ordenan el patio, dan sombra y crean un afuera que se usa todo el año.",
    ],
    specs: [
      { label: "Superficie", value: "60 m²" },
      { label: "Habitaciones", value: "2" },
      { label: "Baño", value: "1" },
      { label: "Cocina · comedor", value: "Integrado" },
    ],
    system: [
      "Hormigón armado con paneles de nuestro taller",
      "Celosía de concreto y pérgola de madera",
      "Deck exterior integrado al estar",
    ],
    whatsapp: "crudo02",
    cover: "/images/modelos/crudo-02-exterior.jpg",
    coverAlt:
      "Vista exterior de la vivienda CRUDO 02: fachada de paneles de hormigón, deck de madera y pileta",
    gallery: [
      {
        src: "/images/modelos/crudo-02-pileta.jpg",
        alt: "CRUDO 02 desde la pileta, con pérgola de madera y galería vidriada",
        wide: true,
      },
      {
        src: "/images/modelos/crudo-02-interior.jpg",
        alt: "Interior de CRUDO 02: muro de paneles de hormigón, cocina integrada al estar y revestimiento de madera",
        wide: true,
      },
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Diseñamos",
    short: "Pensamos cada proyecto antes de llegar a obra.",
    long: "Definimos la arquitectura, los materiales y las terminaciones antes de mover un metro cúbico de tierra. Lo que se decide en el proyecto es lo que se construye: menos decisiones improvisadas en obra, menos sorpresas.",
  },
  {
    number: "02",
    title: "Fabricamos",
    short:
      "Desarrollamos y producimos los elementos que forman parte de nuestra arquitectura.",
    long: "En nuestro taller producimos los muros, revestimientos, celosías y piezas de concreto de cada proyecto, además de la carpintería metálica. Fabricar lo nuestro nos permite decidir cómo se ve y cómo se comporta cada pieza.",
  },
  {
    number: "03",
    title: "Curamos",
    short:
      "Controlamos cada pieza y cada material para asegurar consistencia y calidad.",
    long: "El concreto necesita tiempo y control para llegar a su mejor versión. Revisamos color, textura y terminación pieza por pieza, y lo que no está a la altura vuelve al taller.",
  },
  {
    number: "04",
    title: "Construimos",
    short:
      "Nuestro equipo lleva el proyecto desde la producción hasta la obra terminada.",
    long: "El mismo equipo que diseñó y fabricó ejecuta la obra y la entrega terminada. Un solo responsable de principio a fin: no tenés que coordinar entre estudio, fábrica y constructor.",
  },
];

export const principles = [
  {
    number: "01",
    title: "Diseño",
    text: "Arquitectura pensada antes de empezar a construir.",
  },
  {
    number: "02",
    title: "Control",
    text: "Un mismo equipo acompaña el proyecto desde el diseño hasta la entrega.",
  },
  {
    number: "03",
    title: "Precisión",
    text: "Un sistema que reduce la improvisación propia de muchas obras tradicionales.",
  },
  {
    number: "04",
    title: "Eficiencia",
    text: "Procesos organizados para construir de forma más ágil y ordenada.",
  },
  {
    number: "05",
    title: "Solidez",
    text: "Materiales pensados para durar y espacios hechos para quedarse.",
  },
];

export const versatilityUses = [
  "Una casa de fin de semana.",
  "Un espacio de huéspedes.",
  "Un quincho para recibir.",
  "Una oficina rodeada de verde.",
  "Un gimnasio propio.",
  "Una sala privada.",
];

export const faqs = [
  {
    question: "¿Qué es CRUDO?",
    answer:
      "CRUDO es un estudio de arquitectura y construcción que diseña y ejecuta espacios utilizando hormigón, concreto y un sistema propio de producción y construcción.",
  },
  {
    question: "¿CRUDO solo construye los modelos CRUDO 01 y CRUDO 02?",
    answer:
      "No. CRUDO 01 y CRUDO 02 son nuestro punto de partida y vamos a ir lanzando nuevas tipologías. También desarrollamos proyectos personalizados según el terreno, las necesidades y las ideas de cada cliente.",
  },
  {
    question: "¿Puedo adaptar un modelo CRUDO a mi terreno?",
    answer:
      "Sí. Cada terreno y cada proyecto tienen particularidades. Podemos analizar tu caso y definir la mejor forma de llevar el proyecto a tu propiedad.",
  },
  {
    question: "¿CRUDO construye fuera de Asunción?",
    answer:
      "Evaluamos proyectos en diferentes zonas del país. La ubicación y las condiciones logísticas forman parte del análisis de cada obra.",
  },
  {
    question: "¿Ustedes se encargan de toda la obra?",
    answer:
      "Sí. Nuestro equipo acompaña el proyecto desde la definición hasta la construcción y entrega de la obra, coordinando los procesos necesarios para llevarlo adelante.",
  },
  {
    question: "¿Cuánto cuesta un CRUDO?",
    answer:
      "El presupuesto depende del proyecto, el terreno, la ubicación y los trabajos necesarios para preparar y ejecutar la obra. Por eso preferimos conocer primero tu caso y después preparar una propuesta clara con el alcance correspondiente.",
  },
  {
    question: "¿Cuánto tiempo demora la construcción?",
    answer:
      "El plazo depende del proyecto y de las condiciones de cada obra. Al fabricar buena parte de los elementos en nuestro taller, generalmente los tiempos son más cortos que en una obra tradicional de mampostería.",
  },
  {
    question: "¿Qué necesito tener para empezar?",
    answer:
      "Podés empezar con un terreno, un plano o simplemente una idea. Hablamos de lo que querés construir y definimos los siguientes pasos.",
  },
  {
    question: "¿Los materiales los fabrican ustedes?",
    answer:
      "CRUDO trabaja con producción y desarrollo propio de distintos elementos arquitectónicos y materiales que forman parte de nuestros proyectos, manteniendo control sobre la calidad y el proceso.",
  },
  {
    question: "¿Puedo construir un proyecto completamente personalizado?",
    answer:
      "Sí. Podemos desarrollar un proyecto a medida y ejecutarlo con nuestro equipo, usando el mismo sistema constructivo.",
  },
  {
    question: "¿CRUDO puede construir además del espacio principal?",
    answer:
      "Según el proyecto, podemos desarrollar obras complementarias como espacios exteriores, piletas, quinchos, paisajismo y otros elementos necesarios para completar el proyecto.",
  },
  {
    question: "¿Cómo empiezo?",
    answer:
      "Escribinos por WhatsApp. Contanos dónde querés construir y qué tenés en mente. A partir de ahí podemos conversar sobre el proyecto y los siguientes pasos.",
  },
];
