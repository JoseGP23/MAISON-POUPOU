// Escenas del hero (CLAUDE.md §6). La gallina aparece solo 3 veces (una por
// foto, pedido del cliente): la 4.ª escena va sin gallina, solo el salón.
// Para cambiar textos o fotos, edita este archivo.

export type HeroScene = {
  id: string;
  title: string;
  text: string;
  /** Sin sujeto, la gallina sale de cuadro y queda solo el fondo. */
  subject?: { src: string; alt: string };
  background: { src: string; alt: string; position?: string };
  /** Color de base mientras carga la foto y durante la transición. */
  tint: string;
  cta?: { href: string; label: string };
};

export const heroScenes: HeroScene[] = [
  {
    id: "art-de-vivre",
    title: "L’Art de Vivre, réinventé",
    text: "Arquitectura, nutrición gourmet y diseño de interiores para quienes comparten su jardín con gallinas.",
    subject: { src: "/images/hero-gallina-flotando.png", alt: "Gallina con las alas abiertas, flotando" },
    background: { src: "/images/hero-fondo-nubes.png", alt: "", position: "50% 60%" },
    tint: "#F3E2CC",
  },
  {
    id: "nee-a-paris",
    title: "Née à Paris",
    text: "Un atelier de alma parisina, fundado en Bogotá, donde cada pieza nace del cariño por las aves.",
    subject: { src: "/images/hero-gallina-de-pie.png", alt: "Gallina de pie, de perfil" },
    background: { src: "/images/hero-fondo-balcon-paris.jpg", alt: "", position: "78% 50%" },
    tint: "#EBCFAE",
  },
  {
    id: "architecture",
    title: "L’Architecture du Bien-Être",
    text: "Gallineros modulares de madera noble, pensados para el bienestar de tus gallinas y la belleza de tu jardín.",
    subject: { src: "/images/hero-gallina-sentada.png", alt: "Gallina sentada" },
    background: { src: "/images/hero-fondo-jardin-poulailler.jpg", alt: "", position: "62% 50%" },
    tint: "#E6D3B3",
  },
  {
    id: "maison-pour-tous",
    title: "Une Maison pour Tous",
    text: "Perros, gatos, aves y pequeños compañeros: el mismo cuidado editorial para cada habitante de la casa.",
    background: { src: "/images/hero-fondo-salon-perro-gato.jpg", alt: "Perro y gato en un salón de estilo parisino", position: "24% 50%" },
    tint: "#EFE3D2",
    cta: { href: "/#signature", label: "Descubrir la colección" },
  },
];
