import type { WhatsappTopic } from "./whatsapp";

// Precios "Desde" del módulo, sin IVA. Salen de las planillas de costo de
// cada tipología (CRUDO 01 real; CRUDO 02 y 03 estimadas a partir de la de
// CRUDO 01). Deck, quincho y piscina son extras y no entran en el precio.
export const SHOW_PRICES = true;

export function formatGs(value: number) {
  return `Gs. ${Math.round(value).toLocaleString("es-PY")}`;
}

const PRICES_GS = {
  crudo01: 147_900_462,
  crudo02: 158_918_742,
  crudo03: 291_332_917,
} as const;

const startingPrice = (value: number) => `Desde ${formatGs(value)} + IVA`;

export const contact = {
  email: "crudohomes@gmail.com",
  instagram: { handle: "crudohomes", url: "https://www.instagram.com/crudohomes/" },
  address: "Sucre 1862 casi José Campos Lanzoni",
  city: "Asunción · Paraguay",
} as const;

export const navLinks = [
  { href: "/sistema", label: "El Sistema" },
  { href: "/tipologias", label: "Tipologías" },
  { href: "/a-medida", label: "A Medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
] as const;

export type ModelFeatureIcon = "bed" | "bath" | "kitchen" | "living";

export type SpecGroup = { label: string; items: string[] };

export type Model = {
  slug: string;
  name: string;
  tipology: string;
  area: string;
  areaM2: number;
  startingPrice: string;
  features: { icon: ModelFeatureIcon; label: string }[];
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  amenities: string[];
  constructionSpecs: SpecGroup[];
  shareDescription: string;
  whatsapp: WhatsappTopic;
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
  plan?: { src: string; alt: string; width: number; height: number };
};

// Especificaciones por tipología, a partir de la planilla de costo de cada
// una: solo se lista lo que está presupuestado en el módulo.
const structureSpecs = (roof: string): SpecGroup[] => [
  {
    label: "Estructura",
    items: [
      "Platea de hormigón armado de 10 cm sobre zapatas y encadenado de hormigón armado.",
      "Columnas y vigas de perfil estructural de acero.",
      "Cerramiento de placas de hormigón de 1 × 1 m, vistas.",
    ],
  },
  {
    label: "Techo",
    items: [
      `Panel termoacústico de 40 mm sobre vigas y clavaderas metálicas${roof}.`,
      "Canaleta y bajada pluvial.",
    ],
  },
];

const exteriorSpecs: SpecGroup = {
  label: "Terminación exterior",
  items: [
    "Placas de hormigón visto, limpiadas con ácido y con patinal.",
    "Pintura sintética en estructura metálica, canaletas y bajadas.",
  ],
};

const bathSpecs = (heater: string, extra: string[] = []): SpecGroup => ({
  label: "Baño",
  items: [
    "Piso y paredes revestidos en cerámica.",
    "Inodoro con cisterna baja y bidet, bacha de concreto sobre mesada de mármol.",
    "Ducha frío/caliente, griferías y kit de accesorios.",
    "Mampara de ducha y espejo flotante con luz LED.",
    `Termocalefón de ${heater}.`,
    ...extra,
  ],
});

const plumbingSpecs = (extra: string): SpecGroup => ({
  label: "Instalación sanitaria",
  items: [
    `Cañerías de termofusión para agua y PVC para desagües del baño${extra}.`,
    "Registros cloacales y pluviales con cañería de 100 mm.",
  ],
});

export const models: Model[] = [
  {
    slug: "crudo-01",
    name: "CRUDO 01",
    tipology: "Loft",
    area: "31 m²",
    areaM2: 31,
    startingPrice: startingPrice(PRICES_GS.crudo01),
    features: [
      { icon: "bed", label: "1 habitación" },
      { icon: "bath", label: "1 baño" },
    ],
    summary: "Un ambiente con baño y frente vidriado.",
    description: [
      "Un loft de un solo ambiente pensado para vivirse entero: un volumen limpio de hormigón con un frente vidriado que abre el espacio hacia el terreno.",
      "Casa de fin de semana, espacio de huéspedes, oficina o retiro en el fondo de una propiedad que ya existe.",
    ],
    specs: [
      { label: "Superficie", value: "31 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
    ],
    amenities: [
      "Frente vidriado de piso a techo",
      "Baño con bacha de concreto y mesada de mármol",
      "Aire acondicionado y placard incluidos",
    ],
    constructionSpecs: [
      ...structureSpecs(""),
      {
        label: "Vidriería",
        items: [
          "Frente de vidrio de 8 mm con puerta corrediza de 3,50 × 2,10 m y cerradura con llave.",
          "Paño superior inclinado y paneles fijos de vidrio de 8 mm.",
        ],
      },
      exteriorSpecs,
      {
        label: "Terminación interior",
        items: [
          "Piso cerámico sobre la platea, con zócalos.",
          "Tabique de baño con cara antihumedad, lana de vidrio y banda acústica.",
          "Pintura interior y puerta placa con contramarco.",
        ],
      },
      bathSpecs("80 L", [
        "Ventana batiente de vidrio templado con perfil negro.",
      ]),
      {
        label: "Instalación eléctrica",
        items: [
          "Tablero principal con jabalina a tierra, tomas y tomas especiales.",
          "Spots GU10 negros, colgantes de concreto y luz LED en fachada.",
          "Ventilador de techo LED con control remoto.",
          "Ductos para TV y datos.",
        ],
      },
      {
        label: "Climatización",
        items: ["Aire acondicionado split de 18.000 BTU, instalado."],
      },
      plumbingSpecs(""),
      {
        label: "Muebles",
        items: ["Placard de melamina."],
      },
    ],
    shareDescription: "CRUDO 01 - Loft de 31 m². Una habitación y baño.",
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
    tipology: "Loft con kitchenette",
    area: "31 m²",
    areaM2: 31,
    startingPrice: startingPrice(PRICES_GS.crudo02),
    features: [
      { icon: "bed", label: "1 habitación" },
      { icon: "bath", label: "1 baño" },
      { icon: "kitchen", label: "Kitchenette" },
    ],
    summary: "Un ambiente con kitchenette y baño.",
    description: [
      "El loft de CRUDO 01 con cocina propia: el mismo volumen de hormigón y frente vidriado, con una kitchenette equipada y una barra para comer sin salir del ambiente.",
      "Pensado para quedarse más de un fin de semana: casa de huéspedes, alquiler temporario, estudio con vivienda o un primer espacio independiente en el fondo de una propiedad que ya existe.",
    ],
    specs: [
      { label: "Superficie", value: "31 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
      { label: "Kitchenette", value: "Incluida" },
    ],
    amenities: [
      "Kitchenette con anafe eléctrico y bacha de concreto",
      "Barra para comer en mármol o granito",
      "Frente vidriado de piso a techo",
      "Baño con bacha de concreto, mesada de mármol y espejo iluminado",
    ],
    constructionSpecs: [
      ...structureSpecs(""),
      {
        label: "Vidriería",
        items: [
          "Frente de vidrio de 8 mm con puerta corrediza de 3,50 × 2,10 m y cerradura con llave.",
          "Paño superior inclinado y paneles fijos de vidrio de 8 mm.",
        ],
      },
      exteriorSpecs,
      {
        label: "Terminación interior",
        items: [
          "Piso cerámico sobre la platea, con zócalos.",
          "Tabique de baño con cara antihumedad, lana de vidrio y banda acústica.",
          "Pintura interior y puerta placa con contramarco.",
        ],
      },
      {
        label: "Kitchenette",
        items: [
          "Mesada de mármol o granito con mueble bajo mesada de melamina.",
          "Anafe eléctrico vitrocerámico de 2 hornallas.",
          "Bacha de concreto con grifería monocomando negra.",
          "Barra para comer en mármol o granito, con soporte metálico.",
        ],
      },
      bathSpecs("80 L", [
        "Ventana batiente de vidrio templado con perfil negro.",
      ]),
      {
        label: "Instalación eléctrica",
        items: [
          "Tablero principal con jabalina a tierra, tomas y tomas especiales.",
          "Toma de fuerza para el anafe.",
          "Spots GU10 negros, colgantes de concreto y luz LED en fachada.",
          "Ventilador de techo LED con control remoto.",
          "Ductos para TV y datos.",
        ],
      },
      {
        label: "Climatización",
        items: ["Aire acondicionado split de 18.000 BTU, instalado."],
      },
      plumbingSpecs(" y la kitchenette"),
      {
        label: "Muebles",
        items: ["Placard de melamina."],
      },
    ],
    shareDescription:
      "CRUDO 02 - Loft de 31 m². Una habitación, kitchenette y baño.",
    whatsapp: "crudo02",
    cover: "/images/renders/crudo-2/crudo-2-c.jpg",
    coverAlt:
      "Kitchenette de CRUDO 02 con bacha, microondas, heladera compacta roja y barra con banquetas",
    plan: {
      src: "/images/renders/crudo-2/crudo-2-d.jpg",
      alt: "Planta de CRUDO 02: deck exterior, dormitorio, kitchenette con barra y baño con ducha",
      width: 1630,
      height: 656,
    },
    gallery: [
      {
        src: "/images/renders/crudo-2/crudo-2-a.jpg",
        alt: "Deck de CRUDO 02 con celosía de concreto y sillones, frente al dormitorio vidriado",
        width: 1313,
        height: 800,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-g.jpg",
        alt: "Volumen de CRUDO 02 en paneles de hormigón y estructura negra, sobre el campo",
        width: 1455,
        height: 736,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-b.jpg",
        alt: "Interior de CRUDO 02: dormitorio con muros de hormigón visto y kitchenette al fondo",
        width: 1312,
        height: 673,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-c.jpg",
        alt: "Kitchenette de CRUDO 02 con bacha, microondas, heladera compacta roja y barra con banquetas",
        width: 1352,
        height: 784,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-e.jpg",
        alt: "Detalle del dormitorio de CRUDO 02 con muro de paneles de hormigón y mesa de luz negra",
        width: 1231,
        height: 864,
      },
      {
        src: "/images/renders/crudo-2/crudo-2-f.jpg",
        alt: "Baño de CRUDO 02 con bacha de apoyo, mesada de mármol y espejo iluminado",
        width: 1027,
        height: 1024,
      },
    ],
  },
  {
    slug: "crudo-03",
    name: "CRUDO 03",
    tipology: "Vivienda industrial",
    area: "66 m²",
    areaM2: 66,
    startingPrice: startingPrice(PRICES_GS.crudo03),
    features: [
      { icon: "bed", label: "2 habitaciones" },
      { icon: "bath", label: "1 baño" },
      { icon: "living", label: "Sala comedor" },
    ],
    summary: "Dos habitaciones, cocina y comedor integrados al estar.",
    description: [
      "Una vivienda de estilo industrial en un solo nivel. La cocina y el comedor se integran al estar en un único espacio abierto, con grandes aberturas vidriadas hacia el exterior.",
      "Dos habitaciones con placard y un baño completo completan una casa pensada para vivir todos los días, con muros de hormigón visto.",
    ],
    specs: [
      { label: "Superficie", value: "66 m²" },
      { label: "Habitaciones", value: "2" },
      { label: "Baño", value: "1" },
      { label: "Cocina · comedor", value: "Integrado" },
    ],
    amenities: [
      "Cocina con isla de mármol, integrada al comedor y al estar",
      "Frente vidriado hacia el exterior",
      "Aire acondicionado en estar y dormitorios",
    ],
    constructionSpecs: [
      ...structureSpecs(", con aleros"),
      {
        label: "Vidriería",
        items: [
          "Dos puertas corredizas de vidrio de 8 mm hacia el exterior, con cerradura.",
          "Ventanal fijo en el estar y paño superior inclinado.",
          "Ventanas de dormitorios y ventiluz de baño en vidrio templado con perfil negro.",
        ],
      },
      exteriorSpecs,
      {
        label: "Terminación interior",
        items: [
          "Piso cerámico sobre la platea, con zócalos.",
          "Tabiques con cara antihumedad en el baño, lana de vidrio y banda acústica.",
          "Pintura interior y tres puertas placa con contramarco.",
        ],
      },
      {
        label: "Cocina",
        items: [
          "Mesada lineal e isla en mármol blanco veteado.",
          "Muebles bajo mesada, alacenas, columna de guardado e isla con cajonera, en melamina.",
          "Anafe eléctrico vitrocerámico de 2 hornallas.",
          "Bacha doble de acero inoxidable con grifería de caño extraíble.",
          "Frente de cocina revestido en cerámica.",
        ],
      },
      bathSpecs("120 L"),
      {
        label: "Instalación eléctrica",
        items: [
          "Tablero principal con jabalina a tierra, tomas y tomas especiales.",
          "Spots GU10 negros, colgantes de concreto y luz LED en fachada.",
          "Ventilador de techo LED con control remoto en cada dormitorio.",
          "Ductos para TV y datos.",
        ],
      },
      {
        label: "Climatización",
        items: [
          "Split de 24.000 BTU en estar y cocina, y split de 12.000 BTU en cada dormitorio.",
        ],
      },
      plumbingSpecs(" y la cocina"),
      {
        label: "Muebles",
        items: ["Placards de melamina en los dos dormitorios."],
      },
    ],
    shareDescription:
      "CRUDO 03 - Vivienda industrial de 66 m². Dos habitaciones, un baño y sala comedor integrada.",
    whatsapp: "crudo03",
    cover: "/images/renders/crudo-3/crudo-3-a.jpg",
    coverAlt:
      "Fachada de CRUDO 03 en paneles de hormigón, con jardín, deck de madera y pileta integrada",
    plan: {
      src: "/images/renders/crudo-3/crudo-3-m.png",
      alt: "Planta de CRUDO 03: dos dormitorios, baño y cocina-comedor-estar integrados",
      width: 1420,
      height: 655,
    },
    gallery: [
      {
        src: "/images/renders/crudo-3/crudo-3-a.jpg",
        alt: "Fachada de CRUDO 03 en paneles de hormigón, con jardín, deck de madera y pileta integrada",
        width: 1568,
        height: 688,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-b.jpg",
        alt: "Pileta de CRUDO 03 junto a la galería, con pérgola de madera y living exterior",
        width: 1486,
        height: 704,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-d.png",
        alt: "Galería de CRUDO 03 bajo pérgola de madera, con celosía de concreto, mesa exterior y pileta",
        width: 1727,
        height: 910,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-c.jpg",
        alt: "Interior de CRUDO 03: cocina integrada al estar, con muro de paneles de hormigón y revestimiento de madera",
        width: 1500,
        height: 704,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-e.jpg",
        alt: "Living de CRUDO 03 con muro de hormigón visto y panel de madera para TV",
        width: 1405,
        height: 679,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-f.jpg",
        alt: "Cocina de CRUDO 03 con mesada de mármol, horno y anafe integrados",
        width: 1282,
        height: 816,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-g.jpg",
        alt: "Cocina exterior de CRUDO 03 bajo pérgola, con parrilla y celosía de concreto",
        width: 1338,
        height: 784,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-l.jpg",
        alt: "Cocina y estar integrados de CRUDO 03, con isla de mármol y muro de hormigón visto",
        width: 1600,
        height: 670,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-h.jpg",
        alt: "Dormitorio de CRUDO 03 con paneles de hormigón y cabecera de madera",
        width: 1375,
        height: 768,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-i.jpg",
        alt: "Dormitorio secundario de CRUDO 03 con dos camas y vista al exterior",
        width: 1322,
        height: 731,
      },
      {
        src: "/images/renders/crudo-3/crudo-3-j.jpg",
        alt: "Detalle del mueble de TV en madera del living de CRUDO 03",
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
    short: "Sabés qué vas a tener y cuánto cuesta antes de empezar.",
    long: "Partimos de tu terreno y de tu idea. Arquitectura, materiales, terminaciones y presupuesto quedan definidos en el proyecto: recibís un precio cerrado y un plazo de obra antes de mover un metro cúbico de tierra. Lo que firmás es lo que se construye.",
    image: {
      src: "/images/proceso/disenamos-planos.jpg",
      alt: "Planos de instalaciones de CRUDO sobre la mesa, junto a la ficha de CRUDO 01 en la computadora y una cinta métrica",
    },
  },
  {
    number: "02",
    title: "Fabricamos",
    short: "Tu casa se fabrica bajo techo, no a la intemperie.",
    long: "Mientras preparamos el terreno, muros, placas, revestimientos y estructura metálica se producen en nuestra fábrica y nuestra herrería, con control pieza por pieza y el tiempo de curado que el hormigón necesita. Sin lluvia que frene la obra ni material esperando en la vereda.",
    image: {
      src: "/images/proceso/fabricamos-fabrica.jpg",
      alt: "Operarios cortando y manipulando placas de hormigón en la fábrica",
    },
  },
  {
    number: "03",
    title: "Construimos",
    short: "Montaje preciso, con nuestro propio equipo.",
    long: "Las piezas llegan terminadas y nuestras cuadrillas las montan sobre la platea. Menos días de obra que una construcción tradicional, menos escombro y un solo responsable de principio a fin: vos no coordinás estudio, fábrica y constructor. Lo hacemos nosotros.",
    image: {
      src: "/images/proceso/construimos-montaje.jpg",
      alt: "Dos operarios nivelando placas de hormigón durante el montaje de un muro",
    },
  },
  {
    number: "04",
    title: "Entregamos",
    short: "Recibís las llaves de una casa terminada, lista para vivir.",
    long: "Instalaciones probadas, terminaciones revisadas y cada detalle en su lugar. Una casa de hormigón armado sólida, segura y de estética impecable, pensada para durar generaciones y pedir muy poco mantenimiento.",
    image: {
      src: "/images/proceso/entregamos-crudo-chaco.jpg",
      alt: "Casa CRUDO terminada en el campo, con frente vidriado, deck de madera y tanque de agua",
    },
  },
];

// Pasos que sigue un cliente al trabajar con CRUDO (banner de la home).
export const clientSteps = [
  { id: "diseno", title: "Diseñamos" },
  { id: "fabricacion", title: "Fabricamos" },
  { id: "construccion", title: "Construimos" },
  { id: "entrega", title: "Entregamos" },
] as const;

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
    question: "¿CRUDO solo construye las tipologías CRUDO 01, 02 y 03?",
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
      ? `CRUDO 01 desde ${formatGs(PRICES_GS.crudo01)} + IVA, CRUDO 02 desde ${formatGs(PRICES_GS.crudo02)} + IVA y CRUDO 03 desde ${formatGs(PRICES_GS.crudo03)} + IVA. El valor final depende del terreno, la ubicación y los trabajos necesarios para prepararlo. Te preparamos una propuesta clara con el alcance exacto apenas conversemos.`
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
