import type { WhatsappTopic } from "./whatsapp";

// Precio de referencia mientras no está cerrado el presupuesto definitivo.
// Valor provisorio a pedido de Diego: se reemplaza por el número real antes
// del lanzamiento.
export const SHOW_PRICES = true;
export const PRICE_PER_M2_GS = 4_500_000;

export function formatGs(value: number) {
  return `Gs. ${Math.round(value).toLocaleString("es-PY")}`;
}

export function estimatedPrice(areaM2: number) {
  return formatGs(areaM2 * PRICE_PER_M2_GS);
}

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
  areaM2: number;
  startingPrice: string;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  amenities: string[];
  shareDescription: string;
  whatsapp: WhatsappTopic;
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
  plan?: { src: string; alt: string; width: number; height: number };
};

// Especificaciones generales del sistema constructivo CRUDO, compartidas
// por todas las tipologías. Descripciones simplificadas para el cliente a
// partir de la planilla de rubros de presupuesto (sin montos ni cantidades,
// que todavía no están cerrados).
export const constructionSpecs: { label: string; items: string[] }[] = [
  {
    label: "Estructura",
    items: [
      "Hormigón armado: dados y vigas de fundación calculados para cada proyecto.",
      "Paneles de hormigón de nuestra propia fábrica como cerramiento, sin revoque.",
    ],
  },
  {
    label: "Terminación exterior",
    items: [
      "Paneles de hormigón visto de producción propia, con junta tomada.",
      "Pintura sintética en estructura metálica, canaletas y bajadas.",
    ],
  },
  {
    label: "Terminación interior",
    items: [
      "Contrapiso, carpeta niveladora y piso según proyecto.",
      "Tabiquería interior con aislación en dormitorios y baños.",
      "Pintura interior en paredes de mampostería.",
    ],
  },
  {
    label: "Techo",
    items: [
      "Estructura metálica con pendiente y cubierta de termopanel.",
      "Canaletas, bajadas y desagüe pluvial integrados al diseño.",
    ],
  },
  {
    label: "Aislación termoacústica",
    items: [
      "Termopanel en cubierta para aislar calor y ruido de lluvia.",
      "Lana de vidrio y banda acústica en tabiques interiores.",
    ],
  },
  {
    label: "Instalación sanitaria",
    items: [
      "Cañerías de termofusión para agua y PVC para desagües.",
      "Artefactos y griferías: inodoro, bacha, ducha y termotanque.",
    ],
  },
  {
    label: "Instalación eléctrica",
    items: [
      "Tablero principal, tomas, puntos de luz y salida para aire acondicionado tipo split.",
      "Iluminación con artefactos LED y ductos para TV y datos.",
    ],
  },
  {
    label: "Carpintería",
    items: [
      "Aberturas de vidrio templado con perfilería de aluminio negra.",
      "Puertas interiores, mamparas de baño y espejos con estructura flotante.",
    ],
  },
  {
    label: "Muebles",
    items: [
      "Mesada de mármol o granito en cocina y baño según proyecto.",
      "Mobiliario fijo de cocina y placares de producción propia.",
    ],
  },
];

export const models: Model[] = [
  {
    slug: "crudo-01",
    name: "CRUDO 01",
    tipology: "Loft",
    area: "28 m²",
    areaM2: 28,
    startingPrice: `Desde ${estimatedPrice(28)} + IVA`,
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
    amenities: [
      "Deck exterior integrado al frente vidriado",
      "Frente vidriado de piso a techo",
      "Baño con bacha de concreto y mesada de mármol",
      "Escritorio y espacio de guardado incorporados",
    ],
    shareDescription: "CRUDO 01 - 28 m². Una habitación, baño y deck exterior.",
    whatsapp: "crudo01",
    cover: "/images/renders/crudo-1/crudo-1-a.jpg",
    coverAlt:
      "Vista aérea de CRUDO 01: volumen de vidrio y hormigón sobre el campo, con deck de madera",
    plan: {
      src: "/images/renders/crudo-1/crudo-1-f.jpg",
      alt: "Planta de CRUDO 01: dormitorio, estar, baño con ducha y galería exterior",
      width: 1438,
      height: 736,
    },
    gallery: [
      {
        src: "/images/renders/crudo-1/crudo-1-a.jpg",
        alt: "Vista aérea de CRUDO 01: volumen de vidrio y hormigón sobre el campo, con deck de madera",
        width: 1220,
        height: 864,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-c.jpg",
        alt: "Frente vidriado de CRUDO 01 con estructura negra, deck de madera y sillones exteriores",
        width: 1287,
        height: 832,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-b.jpg",
        alt: "Volumen cerrado de CRUDO 01 en paneles de hormigón, con techo metálico de pendiente única",
        width: 1195,
        height: 880,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-e.jpg",
        alt: "Galería exterior de CRUDO 01 con mesa y sillones de fibra, vista al dormitorio a través del frente vidriado",
        width: 1331,
        height: 784,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-d.jpg",
        alt: "Dormitorio de CRUDO 01 con cabecera de madera, escritorio y frente vidriado con vista al horizonte",
        width: 1600,
        height: 645,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-i.jpg",
        alt: "Dormitorio de CRUDO 01 con ventanales de piso a techo y vista abierta al entorno",
        width: 1527,
        height: 688,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-j.jpg",
        alt: "Detalle del escritorio de CRUDO 01, con mueble de madera y heladera compacta roja",
        width: 1279,
        height: 832,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-k.jpg",
        alt: "Galería exterior de CRUDO 01 con mesa de comedor, sillas y vista al jardín",
        width: 1304,
        height: 816,
      },
      {
        src: "/images/renders/crudo-1/crudo-1-l.jpg",
        alt: "Baño de CRUDO 01 con bacha de concreto, mesada de mármol y espejo iluminado",
        width: 768,
        height: 1376,
      },
    ],
  },
  {
    slug: "crudo-02",
    name: "CRUDO 02",
    tipology: "Vivienda industrial",
    area: "60 m²",
    areaM2: 60,
    startingPrice: `Desde ${estimatedPrice(60)} + IVA`,
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
    amenities: [
      "Pileta integrada al deck exterior",
      "Pérgola de madera y celosía de concreto",
      "Cocina exterior bajo galería, con parrilla",
      "Living con muro de hormigón visto y panel de madera para TV",
    ],
    shareDescription:
      "CRUDO 02 - Vivienda industrial, 60 m². Dos habitaciones, un baño, cocina y comedor integrados al estar.",
    whatsapp: "crudo02",
    cover: "/images/renders/crudo-2/crudo-2-a.jpg",
    coverAlt:
      "Fachada de CRUDO 02 en paneles de hormigón, con jardín, deck de madera y pileta integrada",
    plan: {
      src: "/images/renders/crudo-2/crudo-2-m.png",
      alt: "Planta de CRUDO 02: dos dormitorios, baño, cocina-comedor-estar integrados y deck con pileta",
      width: 4581,
      height: 2250,
    },
    gallery: [
      {
        src: "/images/renders/crudo-2/crudo-2-a.jpg",
        alt: "Fachada de CRUDO 02 en paneles de hormigón, con jardín, deck de madera y pileta integrada",
        width: 1568,
        height: 688,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-b.jpg",
        alt: "Pileta de CRUDO 02 junto a la galería, con pérgola de madera y living exterior",
        width: 1486,
        height: 704,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-d.png",
        alt: "Galería de CRUDO 02 bajo pérgola de madera, con celosía de concreto, mesa exterior y pileta",
        width: 1727,
        height: 910,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-c.jpg",
        alt: "Interior de CRUDO 02: cocina integrada al estar, con muro de paneles de hormigón y revestimiento de madera",
        width: 1500,
        height: 704,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-e.jpg",
        alt: "Living de CRUDO 02 con muro de hormigón visto y panel de madera para TV",
        width: 1405,
        height: 679,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-f.jpg",
        alt: "Cocina de CRUDO 02 con mesada de mármol, horno y anafe integrados",
        width: 1282,
        height: 816,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-g.jpg",
        alt: "Cocina exterior de CRUDO 02 bajo pérgola, con parrilla y celosía de concreto",
        width: 1338,
        height: 784,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-l.jpg",
        alt: "Cocina y estar integrados de CRUDO 02, con isla de mármol y muro de hormigón visto",
        width: 1600,
        height: 670,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-h.jpg",
        alt: "Dormitorio de CRUDO 02 con paneles de hormigón y cabecera de madera",
        width: 1375,
        height: 768,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-i.jpg",
        alt: "Dormitorio secundario de CRUDO 02 con dos camas y vista al exterior",
        width: 1322,
        height: 731,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-j.jpg",
        alt: "Detalle del mueble de TV en madera del living de CRUDO 02",
        width: 1287,
        height: 832,
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
    answer: SHOW_PRICES
      ? `Trabajamos con una referencia de ${formatGs(PRICE_PER_M2_GS)}/m² + IVA: ${estimatedPrice(28)} + IVA para CRUDO 01 y ${estimatedPrice(60)} + IVA para CRUDO 02. Es un número orientativo mientras cerramos el presupuesto definitivo; el valor final depende del terreno, la ubicación y los trabajos necesarios para prepararlo. Te preparamos una propuesta clara con el alcance exacto apenas conversemos.`
      : "El número final depende del terreno, la ubicación y los trabajos necesarios para prepararlo. Escribinos por WhatsApp y te preparamos una propuesta clara con el alcance y la inversión correspondiente.",
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
