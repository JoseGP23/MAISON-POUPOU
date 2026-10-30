// Escenas del hero (CLAUDE.md §6). Cada escena tiene su especie (pedido del
// cliente, 2026-10-29: alternar gallina, perro, conejo, ave y gato).
// Para cambiar textos o fotos, edita este archivo. Los recortes van en PNG con
// fondo transparente y sin márgenes vacíos.

export type HeroScene = {
  id: string;
  title: string;
  text: string;
  subject: {
    src: string;
    alt: string;
    /** Tamaño relativo en pantalla (1 = normal). Útil para animales apaisados. */
    scale?: number;
    /** Flota en el aire: la sombra del suelo se achica y el vaivén es mayor. */
    floating?: boolean;
  };
  background: { src: string; alt: string; position?: string };
  /** Color de base mientras carga la foto y durante la transición. */
  tint: string;
  cta?: { href: string; label: string };
};

export const heroScenes: HeroScene[] = [
  {
    id: "arte-de-vivir",
    title: "El arte de vivir, reinventado",
    text: "Arquitectura, nutrición gourmet y diseño de interiores para quienes comparten su casa con animales.",
    subject: { src: "/images/hero-gallina-flotando.png", alt: "Gallina con las alas abiertas, flotando", floating: true },
    background: { src: "/images/hero-fondo-nubes.png", alt: "", position: "50% 60%" },
    tint: "#F3E2CC",
  },
  {
    id: "perro",
    title: "Elegancia parisina",
    text: "Camas de lino, collares de cuero vegano y paseos con estilo para el perro de la casa.",
    subject: { src: "/images/hero-perro.png", alt: "Perro Cavalier King Charles de pie" },
    background: { src: "/images/hero-fondo-balcon-paris.jpg", alt: "", position: "78% 50%" },
    tint: "#EBCFAE",
  },
  {
    id: "conejo",
    title: "La arquitectura del bienestar",
    text: "Hábitats de madera noble para gallinas, conejos y pequeños compañeros: belleza y bienestar en tu jardín.",
    subject: { src: "/images/hero-conejo.png", alt: "Conejo belier color crema, sentado", scale: 0.9 },
    background: { src: "/images/hero-fondo-jardin-poulailler.jpg", alt: "", position: "62% 50%" },
    tint: "#E6D3B3",
  },
  {
    id: "ave",
    title: "Un cielo propio",
    text: "Perchas de madera natural y mezclas premium para las aves que llenan la casa de canto.",
    subject: { src: "/images/hero-ave.png", alt: "Cacatúa ninfa posada en una rama", floating: true },
    background: { src: "/images/hero-fondo-nubes.png", alt: "", position: "30% 25%" },
    tint: "#F3E2CC",
  },
  {
    id: "casa-para-todos",
    title: "Una casa para todos",
    text: "Perros, gatos, aves y pequeños compañeros: el mismo cuidado editorial para cada habitante de la casa.",
    subject: { src: "/images/hero-gato.png", alt: "Gato Ragdoll color crema, sentado", scale: 0.86 },
    background: { src: "/images/hero-fondo-salon-perro-gato.jpg", alt: "Salón de estilo parisino con un perro en su cama", position: "24% 50%" },
    tint: "#EFE3D2",
    cta: { href: "/#signature", label: "Descubrir la colección" },
  },
];
