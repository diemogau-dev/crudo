import type { WhatsappTopic } from "./whatsapp";

// Precios "Desde" del módulo, sin IVA. Salen de las planillas de costo de
// cada tipología (CRUDO 01 y 04 reales; CRUDO 02 y 03 estimadas a partir de
// la de CRUDO 01), con el mismo criterio: costo + 5% de imprevistos + 30% de
// ganancia. Piscina y trabajos del terreno son extras y no entran en el
// precio; en CRUDO 04 el quincho con parrilla sí está incluido.
export const SHOW_PRICES = true;

export function formatGs(value: number) {
  return `Gs. ${Math.round(value).toLocaleString("es-PY")}`;
}

const PRICES_GS = {
  crudo01: 147_900_462,
  crudo02: 158_918_742,
  crudo03: 291_332_917,
  // Planilla "Presupuesto CRUDO 04": vivienda (Gs. 231.298.413) + quincho
  // (parrilla, pérgola y deck, Gs. 26.700.000), × 1,35.
  crudo04: 348_297_858,
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

export type ModelFeatureIcon =
  | "bed"
  | "bath"
  | "kitchen"
  | "living"
  | "terrace"
  | "grill";

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
  // Portada distinta para la tarjeta de la home (si no está, usa cover).
  homeCover?: { src: string; alt: string };
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
      { icon: "terrace", label: "Terraza" },
    ],
    summary: "Un ambiente con baño, frente vidriado y terraza.",
    description: [
      "Un loft de un solo ambiente pensado para vivirse entero: un volumen limpio de hormigón con un frente vidriado que abre el espacio hacia el terreno.",
      "Casa de fin de semana, espacio de huéspedes, oficina o retiro en el fondo de una propiedad que ya existe.",
    ],
    specs: [
      { label: "Superficie", value: "31 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
      { label: "Terraza", value: "Incluida" },
    ],
    amenities: [
      "Frente vidriado de piso a techo",
      "Terraza exterior",
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
    homeCover: {
      src: "/images/renders/crudo-1/crudo-1-c.jpg",
      alt: "Frente vidriado de CRUDO 01 con estructura negra, deck de madera y sillones exteriores",
    },
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
      { icon: "terrace", label: "Terraza" },
    ],
    summary: "Un ambiente con kitchenette, baño y terraza.",
    description: [
      "El loft de CRUDO 01 con cocina propia: el mismo volumen de hormigón y frente vidriado, con una kitchenette equipada y una barra para comer sin salir del ambiente.",
      "Pensado para quedarse más de un fin de semana: casa de huéspedes, alquiler temporario, estudio con vivienda o un primer espacio independiente en el fondo de una propiedad que ya existe.",
    ],
    specs: [
      { label: "Superficie", value: "31 m²" },
      { label: "Habitación", value: "1" },
      { label: "Baño", value: "1" },
      { label: "Kitchenette", value: "Incluida" },
      { label: "Terraza", value: "Incluida" },
    ],
    amenities: [
      "Kitchenette con anafe eléctrico y bacha de concreto",
      "Barra para comer en mármol o granito",
      "Frente vidriado de piso a techo",
      "Terraza exterior",
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
    homeCover: {
      src: "/images/renders/crudo-2/crudo-2-a.jpg",
      alt: "CRUDO 02 con frente vidriado, deck y celosía de concreto, sobre el campo",
    },
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
      { icon: "kitchen", label: "Cocina" },
      { icon: "living", label: "Sala comedor" },
      { icon: "grill", label: "Quincho con parrilla opcional" },
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
      { label: "Cocina", value: "Incluida" },
      { label: "Sala comedor", value: "Integrada" },
      { label: "Quincho con parrilla", value: "Opcional" },
    ],
    amenities: [
      "Cocina con isla de mármol, integrada al comedor y al estar",
      "Frente vidriado hacia el exterior",
      "Aire acondicionado en estar y dormitorios",
      "Quincho con parrilla opcional",
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
    homeCover: {
      src: "/images/renders/crudo-3/crudo-3-n.jpg",
      alt: "Fachada de CRUDO 03 con galería vidriada, deck de madera y pileta",
    },
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
  {
    slug: "crudo-04",
    name: "CRUDO 04",
    tipology: "Casa con quincho",
    area: "85 m²",
    areaM2: 85,
    startingPrice: startingPrice(PRICES_GS.crudo04),
    features: [
      { icon: "bed", label: "2 habitaciones" },
      { icon: "bath", label: "1 baño" },
      { icon: "kitchen", label: "Cocina" },
      { icon: "living", label: "Sala comedor" },
      { icon: "grill", label: "Quincho con parrilla" },
    ],
    summary: "Dos habitaciones, cocina con isla, sala comedor y quincho con parrilla.",
    description: [
      "Una casa de techo a dos aguas con un frente vidriado de doble altura. La cocina con isla, el comedor y el estar comparten un mismo espacio abierto que se continúa hacia afuera.",
      "Afuera, el quincho con parrilla bajo pérgola metálica y un deck para recibir. Dos habitaciones con placard y un baño completo completan una casa para vivir todos los días.",
    ],
    specs: [
      { label: "Superficie", value: "85 m²" },
      { label: "Habitaciones", value: "2" },
      { label: "Baño", value: "1" },
      { label: "Cocina", value: "Con isla" },
      { label: "Sala comedor", value: "Integrada" },
      { label: "Quincho con parrilla", value: "Incluido" },
    ],
    amenities: [
      "Cocina con isla, anafe, extractor y horno empotrado",
      "Sala comedor integrada a la cocina",
      "Quincho con parrilla, pérgola metálica y deck",
      "Frente vidriado de piso a techo",
      "Aire acondicionado en estar y dormitorios",
    ],
    constructionSpecs: [
      {
        label: "Estructura",
        items: [
          "Platea de hormigón armado de 10 cm sobre dados y vigas de fundación de hormigón armado.",
          "Vigas y pilares de estructura metálica.",
          "Muros de placas de hormigón armado, con revestimiento interior de placas de concreto o durlock.",
        ],
      },
      {
        label: "Techo",
        items: [
          "Panel termoacústico de 40 mm sobre estructura metálica.",
          "Canaleta y bajada pluvial.",
        ],
      },
      {
        label: "Vidriería",
        items: [
          "Dos accesos de vidrio templado de 8 mm con perfilería negra, de 4 hojas (2 fijas y 2 corredizas).",
          "Paño fijo superior sobre el acceso.",
          "Ventanas batientes en dormitorios y ventiluz corredizo en el baño, en vidrio templado con perfil negro.",
        ],
      },
      exteriorSpecs,
      {
        label: "Terminación interior",
        items: [
          "Piso sobre carpeta, con zócalos.",
          "Tabiques con lana de vidrio y banda acústica; cara antihumedad en el baño.",
          "Pintura interior y cuatro puertas placa con contramarco.",
        ],
      },
      {
        label: "Cocina",
        items: [
          "Muebles de cocina e isla.",
          "Anafe con extractor.",
          "Microondas y horno empotrados.",
        ],
      },
      {
        label: "Baño",
        items: [
          "Piso y paredes revestidos.",
          "Inodoro con cisterna baja y ducha higiénica.",
          "Bacha de concreto sobre mesada de mármol blanco veteado, con zócalo y pollera de mármol.",
          "Ducha frío/caliente con nicho de mármol, griferías y kit de accesorios.",
          "Mampara de ducha y espejo flotante con luz LED.",
          "Termocalefón de 80 L.",
        ],
      },
      {
        label: "Instalación eléctrica",
        items: [
          "Tablero de 36 llaves con llave de corte general trifásica, disyuntor diferencial, protección contra sobretensiones y puesta a tierra.",
          "Tomas, tomas especiales y bocas de luz.",
          "Spots GU10 negros y colgantes de concreto.",
          "Ductos para datos y TV.",
        ],
      },
      {
        label: "Climatización",
        items: [
          "Split de 24.000 BTU en el estar y split de 12.000 BTU en cada dormitorio, instalados.",
        ],
      },
      plumbingSpecs(" y la cocina"),
      {
        label: "Quincho",
        items: [
          "Módulo de parrilla.",
          "Pérgola metálica.",
          "Deck símil madera de 7 × 4 m sobre platea de 10 cm.",
        ],
      },
      {
        label: "Muebles",
        items: ["Placards en los dos dormitorios."],
      },
    ],
    shareDescription:
      "CRUDO 04 - Casa de 85 m². Dos habitaciones, un baño, cocina, sala comedor y quincho con parrilla.",
    whatsapp: "crudo04",
    cover: "/images/renders/crudo-4/crudo-4-a.jpg",
    coverAlt:
      "CRUDO 04 de frente: techo a dos aguas, frente vidriado y tina exenta, al pie de un cerro",
    gallery: [
      {
        src: "/images/renders/crudo-4/crudo-4-a.jpg",
        alt: "CRUDO 04 de frente: techo a dos aguas, frente vidriado y tina exenta, al pie de un cerro",
        width: 1449,
        height: 736,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-b.jpg",
        alt: "Vista lateral de CRUDO 04 en paneles de hormigón, con galería, celosía de concreto y deck",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-c.jpg",
        alt: "Galería de CRUDO 04 con tina exenta, comedor exterior y parrilla junto a la celosía de concreto",
        width: 1600,
        height: 672,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-d.jpg",
        alt: "Tina exenta de concreto y comedor exterior de CRUDO 04, con vista a los cerros",
        width: 1575,
        height: 656,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-e.jpg",
        alt: "Estar de CRUDO 04 con panel de madera para TV, integrado al comedor y la cocina",
        width: 1600,
        height: 672,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-f.jpg",
        alt: "Estar, comedor y cocina de CRUDO 04 en un mismo espacio, bajo el techo a dos aguas",
        width: 1592,
        height: 656,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-g.jpg",
        alt: "Comedor y cocina de CRUDO 04 vistos desde arriba, con barra y muro de placas de hormigón",
        width: 1370,
        height: 768,
      },
      {
        src: "/images/renders/crudo-4/crudo-4-h.jpg",
        alt: "Dormitorio de CRUDO 04 con cabecera de madera y ventana al jardín",
        width: 1511,
        height: 704,
      },
    ],
  },
];

// Tipologías anunciadas que todavía no tienen página propia: solo se muestran
// como tarjeta en la home.
export const upcomingModels: {
  name: string;
  area: string;
  features: { icon: ModelFeatureIcon; label: string }[];
  cover: string;
  coverAlt: string;
}[] = [];

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
      src: "/images/proceso/fabricamos-planta.jpg",
      alt: "Dos operarios en la planta junto a un molde con placas de hormigón recién coladas",
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
    question: "¿CRUDO solo construye las tipologías CRUDO 01, 02, 03 y 04?",
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
      ? `CRUDO 01 desde ${formatGs(PRICES_GS.crudo01)} + IVA, CRUDO 02 desde ${formatGs(PRICES_GS.crudo02)} + IVA, CRUDO 03 desde ${formatGs(PRICES_GS.crudo03)} + IVA y CRUDO 04 desde ${formatGs(PRICES_GS.crudo04)} + IVA. El valor final depende del terreno, la ubicación y los trabajos necesarios para prepararlo. Te preparamos una propuesta clara con el alcance exacto apenas conversemos.`
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
