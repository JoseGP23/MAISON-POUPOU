// Contenido editorial provisional (CLAUDE.md §11): Our Story y páginas legales.
// Cuerpo en texto simple: párrafos separados por una línea en blanco y
// subtítulos con "## ".

export type PageId = "our-story" | "envios-devoluciones" | "terminos" | "garantia-poulaillers";

export type PageContent = {
  title: string;
  intro: string;
  body: string;
  image: string | null;
  /** Borrador pendiente de revisión legal (§11) */
  draft?: boolean;
};

export const legalPageIds = ["envios-devoluciones", "terminos", "garantia-poulaillers"] as const satisfies readonly PageId[];

export const seedPages: Record<PageId, PageContent> = {
  "our-story": {
    title: "Nacida en Bogotá, con alma parisina",
    intro:
      "Una casa nacida del cariño por las pequeñas aves, con la mirada puesta en los talleres de París y los pies en la Sabana de Bogotá.",
    image: "/images/hero-fondo-balcon-paris.jpg",
    body: `## El origen del nombre

En casa, a las pequeñas aves y mascotas siempre se les llamó «poupou»: una palabra suave, casi un arrullo, que nombra a quienes nos acompañan cada día. Cuando decidimos crear una marca, quisimos que conservara esa ternura y la elevara con el concepto chic de una casa francesa. Así nació MAISON POUPOU.

## Bogotá, con alma parisina

Fundamos MAISON POUPOU en Bogotá, entre jardines con niebla de madrugada y patios donde las gallinas pasean entre las hortensias. De París tomamos la exigencia del taller: la proporción, el detalle, la convicción de que lo cotidiano merece belleza. De Colombia, la madera, el barro, el tejido y las manos que saben trabajarlos.

## ¿Por qué las gallinas?

Porque fueron las primeras. Antes de los perros y los gatos de la casa, estaban ellas: curiosas, sociables, sorprendentemente cariñosas. Las gallinas son las protagonistas de nuestra historia y de nuestra marca, y creemos que merecen hábitats tan bien pensados como cualquier otro rincón del hogar.

## Una casa para todos

Con el tiempo, MAISON POUPOU se abrió a perros, gatos, aves, peces, pequeños compañeros y especies exóticas. Cambian las especies, pero no la promesa: arquitectura, nutrición gourmet y diseño de interiores al servicio del bienestar animal. Vida de gallina, pero a la francesa.`,
  },
  "envios-devoluciones": {
    title: "Envíos & Devoluciones",
    intro: "Cómo llegan tus pedidos y qué hacer si algo no está bien.",
    image: null,
    draft: true,
    body: `## Cómo se confirma tu pedido

Todos los pedidos se hacen por WhatsApp. Nuestro equipo te comparte el catálogo, verifica disponibilidad, te confirma el total y coordina contigo el pago y la entrega. Este sitio no realiza ventas ni cobros.

## Tarifas de envío de productos regulares

Los productos regulares son todos los que no son voluminosos (alimentos, cuidado, accesorios y mobiliario pequeño).

Envío gratis cuando los productos regulares de tu pedido suman $ 250.000 COP o más.

Si no alcanzas ese monto, la tarifa depende de tu ciudad: Bogotá D.C. $ 10.000 COP; ciudades principales (Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Manizales y Santa Marta) $ 15.000 COP; resto del país $ 22.000 COP.

## Productos voluminosos

Los gallineros y el mobiliario grande se despachan con transporte especial y su flete se cotiza y coordina por WhatsApp según tu ubicación. Si tu pedido incluye un producto voluminoso, los demás productos viajan con él sin costo de flete extra. El valor de los productos voluminosos no cuenta para alcanzar el envío gratis.

## Tiempos de entrega

Productos regulares: de 1 a 3 días hábiles en Bogotá y de 3 a 6 días hábiles en el resto del país. Productos voluminosos y piezas hechas por encargo: el plazo se acuerda contigo al confirmar el pedido.

## Cambios y devoluciones

Tienes 5 días hábiles desde la entrega para solicitar un cambio o ejercer el derecho de retracto, conforme al Estatuto del Consumidor (Ley 1480 de 2011). El producto debe estar sin uso y en su empaque original. Por higiene, los alimentos y productos de cuidado abiertos no admiten devolución, salvo defecto de calidad.

## Productos con defecto

Si algo llega dañado o con defecto, escríbenos por WhatsApp dentro de las 48 horas siguientes a la entrega, con fotos del producto y del empaque. Lo reponemos o reembolsamos sin costo para ti.`,
  },
  terminos: {
    title: "Términos del Servicio",
    intro: "Las condiciones de uso de este sitio y de las compras en MAISON POUPOU.",
    image: null,
    draft: true,
    body: `## Sobre nosotros

MAISON POUPOU es una marca colombiana con sede en Bogotá D.C. Este sitio presenta la marca y algunas de nuestras piezas; el catálogo completo, los precios y los pedidos se gestionan por WhatsApp.

## Pedidos y precios

Los precios se informan por WhatsApp en pesos colombianos (COP) e incluyen IVA cuando aplica. Un pedido hecho por WhatsApp es una solicitud: la compra se perfecciona cuando nuestro equipo confirma disponibilidad, total y forma de pago. Nos reservamos el derecho de corregir errores evidentes de precio o de inventario antes de confirmar.

## Disponibilidad

Algunos productos se fabrican en series cortas o por encargo. Si un producto no está disponible después de enviado tu pedido, te ofreceremos una alternativa o el reembolso total de lo pagado.

## Pagos

El pago se coordina por WhatsApp a través de los medios que te indique nuestro equipo. Este sitio no almacena datos de tarjetas ni realiza cobros automáticos.

## Abonos y recordatorios

Los formatos «Abono» no son una suscripción con cobro automático: te escribimos cada mes por WhatsApp para recordarte tu pedido, y tú decides si lo confirmas. Puedes cancelarlo cuando quieras con un mensaje.

## Datos personales

Usamos los datos que nos compartes por WhatsApp (nombre, ciudad, dirección, barrio y teléfono) solo para gestionar tu pedido y la entrega, conforme a la Ley 1581 de 2012. Puedes pedirnos consultarlos, corregirlos o eliminarlos en cualquier momento.

## Propiedad intelectual

Los textos, fotografías, diseños y la marca MAISON POUPOU son de nuestra propiedad o se usan con autorización. No pueden reproducirse sin permiso escrito.

## Ley aplicable

Estos términos se rigen por las leyes de la República de Colombia.`,
  },
  "garantia-poulaillers": {
    title: "Garantía de gallineros (1 año)",
    intro: "Nuestros gallineros están hechos para durar. Si algo falla en su primer año, lo resolvemos.",
    image: null,
    draft: true,
    body: `## Qué cubre

Todos los gallineros MAISON POUPOU tienen 1 año de garantía desde la fecha de entrega. Cubre defectos de fabricación y de materiales: uniones que se abren, piezas de madera que se agrietan o deforman por un defecto de origen, herrajes, bisagras y cierres que fallen con el uso normal, y filtraciones del techo.

## Qué no cubre

El desgaste natural de la madera (cambio de color, pátina plateada, pequeñas fisuras superficiales propias del material), los daños por golpes, mal uso, modificaciones o reparaciones hechas por terceros, los daños causados por animales de otras especies o por eventos climáticos extremos, y la falta del mantenimiento recomendado.

## Mantenimiento recomendado

Aplica aceite natural para madera cada 6 meses en las caras exteriores, mantén el gallinero sobre una base que lo aísle del suelo húmedo y limpia la bandeja con regularidad. Te enviamos la guía completa con tu pedido.

## Cómo solicitarla

Escríbenos por WhatsApp con tu nombre, la fecha de compra y fotos del problema. Nuestro equipo lo revisará en un máximo de 5 días hábiles y, si aplica la garantía, repararemos o reemplazaremos la pieza afectada sin costo, incluida la visita técnica en Bogotá y la Sabana. En otras ciudades coordinamos el envío de repuestos.

## Después del primer año

Seguimos contigo: ofrecemos repuestos y reparación de todas nuestras piezas a precio de taller.`,
  },
};
