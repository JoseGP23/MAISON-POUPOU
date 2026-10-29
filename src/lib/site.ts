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
  { href: "/#vision", label: "Nuestra visión" },
  { href: "/#signature", label: "Piezas insignia" },
  { href: "/#atelier", label: "El taller" },
  { href: "/our-story", label: "Nuestra historia" },
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
    name: "Gallinero Contemporáneo «Sainte-Anne»",
    line: "Gallinas y aves de corral",
    text: "Gallinero de madera noble con arquitectura modular de estilo francés. Techo a dos aguas, nidales con acceso exterior y bandeja extraíble.",
    image: "/images/poulailler-sainte-anne-medium.jpg",
  },
  {
    id: "mangeoire-ceramique-bois",
    name: "Comedero de Cerámica y Madera",
    line: "Gallinas y aves de corral",
    text: "Cerámica de Ráquira esmaltada a mano sobre base de roble.",
    image: "/images/mangeoire-ceramique-bois.png",
  },
  {
    id: "pate-gastronomique-bio",
    name: "Paté Gastronómico Orgánico",
    line: "Gallinas y aves de corral",
    text: "Vegetales, semillas y larvas de fincas orgánicas de Cundinamarca.",
    image: "/images/pate-gastronomique-bio.jpg",
  },
  {
    id: "lit-moelleux-lin",
    name: "Cama Mullida de Lino",
    line: "Perros",
    text: "Lino lavado a la piedra, funda removible y lavable.",
    image: "/images/lit-moelleux-lin.jpg",
  },
  {
    id: "arbre-a-chat",
    name: "Árbol para Gatos Contemporáneo",
    line: "Gatos",
    text: "Madera curvada y sisal natural: una escultura para la sala.",
    image: "/images/arbre-a-chat.jpg",
  },
];
