// Configuración global de la web de marca. Sin catálogo ni panel: el catálogo
// completo, los precios y los pedidos viven en WhatsApp (decisión del cliente,
// 2026-10-28). Para cambiar un dato basta con editar este archivo.

export const siteConfig = {
  // Pendiente: número real (este es de ejemplo)
  whatsappNumber: "573000000000",
  social: {
    instagram: { handle: "@maisonpoupou_co", url: "https://www.instagram.com/maisonpoupou_co" },
    tiktok: { handle: "@maisonpoupou", url: "https://www.tiktok.com/@maisonpoupou" },
  },
};

export function whatsappUrl(text = "Hola, quiero conocer el catálogo de MAISON POUPOU.") {
  return `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export const mainNav = [
  { href: "/#vision", label: "Notre Vision" },
  { href: "/#signature", label: "Pièces Signature" },
  { href: "/#atelier", label: "L’Atelier" },
  { href: "/our-story", label: "Our Story" },
];

export type SignaturePiece = {
  id: string;
  name: string;
  line: string;
  text: string;
  image: string;
};

// Productos insignia: solo vitrina, sin precios (cambian y se consultan por WhatsApp).
// El primero se muestra destacado.
export const signaturePieces: SignaturePiece[] = [
  {
    id: "poulailler-sainte-anne",
    name: "Poulailler Contemporain « Sainte-Anne »",
    line: "Poules & Volailles",
    text: "Gallinero de madera noble con arquitectura modular de estilo francés. Techo a dos aguas, nidales con acceso exterior y bandeja extraíble.",
    image: "/images/poulailler-sainte-anne-medium.jpg",
  },
  {
    id: "mangeoire-ceramique-bois",
    name: "Mangeoire en Céramique & Bois",
    line: "Poules & Volailles",
    text: "Cerámica de Ráquira esmaltada a mano sobre base de roble.",
    image: "/images/mangeoire-ceramique-bois.png",
  },
  {
    id: "pate-gastronomique-bio",
    name: "Pâté Gastronomique Bio",
    line: "Poules & Volailles",
    text: "Vegetales, semillas y larvas de fincas orgánicas de Cundinamarca.",
    image: "/images/pate-gastronomique-bio.jpg",
  },
  {
    id: "lit-moelleux-lin",
    name: "Lit Moelleux en Lin",
    line: "POUPOU DOG",
    text: "Lino lavado a la piedra, funda removible y lavable.",
    image: "/images/lit-moelleux-lin.jpg",
  },
  {
    id: "arbre-a-chat",
    name: "Arbre à Chat Contemporain",
    line: "POUPOU CAT",
    text: "Madera curvada y sisal natural: una escultura para la sala.",
    image: "/images/arbre-a-chat.jpg",
  },
];
