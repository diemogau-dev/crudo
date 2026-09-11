import type { WhatsappTopic } from "./whatsapp";

export const navLinks = [
  { href: "/tipologias", label: "Tipologías" },
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
  startingPrice: string;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  system: string[];
  systemNote: string;
  shareDescription: string;
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
    startingPrice: "Desde Gs. 95.000.000",
    summary: "Un ambiente, baño y deck exterior.",
    description: [
      "Un loft de un solo ambiente pensado para vivirse entero: un volumen limpio de hormigón, frente vidriado y un deck que extiende el espacio hacia el terreno.",
      "Casa de fin de semana, espacio de huéspedes, oficina o retiro en el fondo de una propiedad que ya existe.",
    ],
    specs: [
      { label: "Superficie", value: "28 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
      { label: "Deck exterior", value: "Incluido" },
    ],
    system: [
      "Hormigón armado con paneles de nuestra fábrica",
      "Techo metálico con pendiente única",
      "Bacha, tina y pisos de concreto propios",
    ],
    systemNote:
      "CRUDO 01 se piensa desde el inicio para fabricar y construir cada parte de forma coordinada. Diseño, producción y obra trabajan conectados para reducir improvisaciones y tener mayor control sobre el proceso.",
    shareDescription: "CRUDO 01 - 28 m². Una habitación, baño y deck exterior.",
    whatsapp: "crudo01",
    cover: "/images/tipologias/crudo-01-exterior-aereo.jpg",
    coverAlt:
      "Vista aérea del loft CRUDO 01: volumen de paneles de hormigón, frente vidriado y deck de madera",
    gallery: [
      {
        src: "/images/tipologias/crudo-01-exterior-aereo.jpg",
        alt: "Vista aérea del loft CRUDO 01: volumen de paneles de hormigón, frente vidriado y deck de madera",
        wide: true,
      },
      {
        src: "/images/tipologias/crudo-01-frente.jpg",
        alt: "Frente vidriado del loft CRUDO 01 con deck de madera y estructura metálica negra",
      },
      {
        src: "/images/tipologias/crudo-01-volumen.jpg",
        alt: "Volumen exterior de CRUDO 01: grilla de paneles de hormigón y techo de pendiente única",
      },
      {
        src: "/images/tipologias/crudo-01-interior.jpg",
        alt: "Interior de CRUDO 01: muro de hormigón, cabecera de madera y salida al deck",
        wide: true,
      },
      {
        src: "/images/tipologias/crudo-01-deck.jpg",
        alt: "Deck de CRUDO 01 con mesa y sillones de mimbre, vista al dormitorio a través del frente vidriado",
      },
    ],
  },
  {
    slug: "crudo-02",
    name: "CRUDO 02",
    tipology: "Vivienda industrial",
    area: "60 m²",
    startingPrice: "Desde Gs. 240.000.000",
    summary: "Dos habitaciones, cocina y comedor integrados al estar.",
    description: [
      "Una vivienda de estilo industrial en un solo nivel. La cocina y el comedor se integran al estar, y el deck exterior se suma al espacio principal en lugar de quedar afuera.",
      "La celosía de concreto y la pérgola de madera ordenan el patio y crean un afuera que se usa todo el año.",
    ],
    specs: [
      { label: "Superficie", value: "60 m²" },
      { label: "Habitaciones", value: "2" },
      { label: "Baño", value: "1" },
      { label: "Cocina · comedor", value: "Integrado" },
    ],
    system: [
      "Hormigón armado con paneles de nuestra fábrica",
      "Celosía de concreto y pérgola de madera",
      "Deck exterior integrado al estar",
    ],
    systemNote:
      "Definimos el proyecto pensando desde el inicio en cómo se fabrica y construye. Eso permite trabajar con mayor precisión y reducir improvisaciones durante la ejecución.",
    shareDescription:
      "CRUDO 02 - Vivienda industrial, 60 m². Dos habitaciones, un baño, cocina y comedor integrados al estar.",
    whatsapp: "crudo02",
    cover: "/images/tipologias/crudo-02-hero.png",
    coverAlt:
      "CRUDO 02: galería con pérgola de madera, celosía de concreto y pileta sobre deck",
    gallery: [
      {
        src: "/images/tipologias/crudo-02-hero.png",
        alt: "CRUDO 02: galería con pérgola de madera, celosía de concreto y pileta sobre deck",
        wide: true,
      },
      {
        src: "/images/tipologias/crudo-02-exterior.jpg",
        alt: "Fachada de CRUDO 02 en paneles de hormigón, con jardín, deck y pileta",
        wide: true,
      },
      {
        src: "/images/tipologias/crudo-02-pileta.jpg",
        alt: "CRUDO 02 desde la pileta, con pérgola de madera y galería vidriada",
        wide: true,
      },
      {
        src: "/images/tipologias/crudo-02-interior.jpg",
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
    long: "Arquitectura, materiales y terminaciones quedan definidos antes de mover un metro cúbico de tierra. Lo que se decide en el proyecto es lo que se construye.",
    image: {
      src: "/images/proceso/disenamos-plano.jpg",
      alt: "Dos personas trabajando sobre un plano y muestras de material en una mesa de arquitecto",
    },
  },
  {
    number: "02",
    title: "Fabricamos",
    short: "Producimos en nuestra fábrica lo que forma la arquitectura.",
    long: "Muros, revestimientos, celosías, piezas de concreto y carpintería metálica salen de nuestra propia producción. Fabricar lo nuestro nos deja decidir cómo se ve y cómo se comporta cada pieza.",
    image: {
      src: "/images/proceso/fabricamos-acabado.jpg",
      alt: "Terminación de un panel de concreto recién vertido en la fábrica",
    },
  },
  {
    number: "03",
    title: "Curamos",
    short: "Controlamos cada pieza antes de que salga de la fábrica.",
    long: "El concreto necesita tiempo y control para llegar a su mejor versión. Revisamos color, textura y terminación pieza por pieza. Lo que no está a la altura vuelve atrás.",
    image: {
      src: "/images/proceso/acabado.png",
      alt: "Terminación de paneles de concreto en la fábrica",
    },
  },
  {
    number: "04",
    title: "Construimos",
    short: "Nuestras cuadrillas ejecutan la obra y la entrega terminada.",
    long: "Un solo responsable de principio a fin. Nuestras propias cuadrillas de construcción montan y ejecutan la obra, así que no tenés que coordinar entre estudio, fábrica y constructor.",
    image: {
      src: "/images/tipologias/crudo-01-exterior-aereo.jpg",
      alt: "Volumen de hormigón terminado y montado en el terreno",
    },
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
      "Un estudio de arquitectura y construcción que diseña y ejecuta espacios en hormigón y concreto, con un sistema propio de producción y construcción.",
  },
  {
    question: "¿Qué diferencia a CRUDO de una construcción tradicional?",
    answer:
      "En una obra tradicional, el diseño, la fabricación de materiales y la construcción suelen depender de distintos equipos y proveedores. En CRUDO conectamos esas etapas desde el principio: diseñamos pensando en cómo se va a producir y construir cada proyecto, fabricamos elementos clave en nuestra propia fábrica y ejecutamos la obra con nuestro equipo, dentro del mismo sistema. El resultado es más control sobre el proceso y menos improvisación entre etapas.",
  },
  {
    question: "¿CRUDO solo construye las tipologías CRUDO 01 y CRUDO 02?",
    answer:
      "No. Son nuestro punto de partida y vamos a ir lanzando nuevas tipologías. También desarrollamos proyectos personalizados según el terreno y las ideas de cada cliente.",
  },
  {
    question: "¿Puedo adaptar una tipología CRUDO a mi terreno?",
    answer:
      "Sí. Cada terreno tiene sus particularidades. Analizamos tu caso y definimos la mejor forma de llevar el proyecto a tu propiedad.",
  },
  {
    question: "¿CRUDO construye fuera de Asunción?",
    answer:
      "Evaluamos proyectos en diferentes zonas del país. La ubicación y las condiciones logísticas forman parte del análisis de cada obra.",
  },
  {
    question: "¿Ustedes se encargan de toda la obra?",
    answer:
      "Sí. Nuestro equipo acompaña el proyecto desde la definición hasta la construcción y la entrega, coordinando todo lo necesario para llevarlo adelante.",
  },
  {
    question: "¿Cuánto cuesta un CRUDO?",
    answer:
      "CRUDO 01 parte de una inversión de referencia desde Gs. 95.000.000 y CRUDO 02 desde Gs. 240.000.000. El número final depende del terreno, la ubicación y los trabajos necesarios para prepararlo. Te preparamos una propuesta clara con el alcance exacto apenas conversemos.",
  },
  {
    question: "¿Cuánto tiempo demora la construcción?",
    answer:
      "Depende del proyecto y del terreno, pero buena parte del trabajo se resuelve antes de llegar al terreno: al diseñar y fabricar elementos dentro del mismo sistema, reducimos coordinaciones innecesarias y tiempos muertos durante la ejecución. Cada proyecto tiene sus propios plazos; te damos uno concreto apenas revisamos tu caso.",
  },
  {
    question: "¿Qué necesito tener para empezar?",
    answer:
      "Un terreno, un plano o simplemente una idea. Hablamos de lo que querés construir y definimos los siguientes pasos.",
  },
  {
    question: "¿Los materiales los fabrican ustedes?",
    answer:
      "Trabajamos con producción y desarrollo propio de los elementos arquitectónicos y materiales que forman parte de nuestros proyectos, manteniendo el control sobre la calidad y el proceso.",
  },
  {
    question: "¿Cómo se comporta el hormigón con el calor?",
    answer:
      "El hormigón tiene alta masa térmica: absorbe calor durante el día y lo libera lentamente, por lo que una superficie muy expuesta al sol directo puede calentarse. Por eso el diseño se ocupa de lo que rodea al material: sombra, aleros, ventilación cruzada y orientación pensada para el clima paraguayo. Bien resuelto, un muro de hormigón mantiene el interior más estable que otros sistemas constructivos frente al calor y la humedad.",
  },
  {
    question: "¿Puedo construir un proyecto completamente personalizado?",
    answer:
      "Sí. Desarrollamos proyectos a medida y los ejecutamos con nuestro equipo, usando el mismo sistema constructivo.",
  },
  {
    question: "¿CRUDO puede construir además del espacio principal?",
    answer:
      "Según el proyecto, podemos desarrollar espacios exteriores, piletas, quinchos, paisajismo y otros elementos necesarios para completarlo.",
  },
  {
    question: "¿Cómo empiezo?",
    answer:
      "Escribinos por WhatsApp. Contanos dónde querés construir y qué tenés en mente, y seguimos desde ahí.",
  },
];
