import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { HenSilhouette } from "@/components/ui/Icons";
import { FooterSocial, FooterWhatsApp } from "./FooterContact";

// Footer de la web de marca: sin catálogo, todo se consulta por WhatsApp
const columns = [
  {
    title: "Conócenos",
    links: [
      { href: "/#vision", label: "Nuestra visión" },
      { href: "/#signature", label: "Piezas insignia" },
      { href: "/#atelier", label: "El taller" },
      { href: "/our-story", label: "Nuestra historia" },
    ],
  },
  {
    title: "Servicio",
    links: [
      { href: "/#commander", label: "Cómo pedir" },
      { href: "/legal/envios-devoluciones", label: "Envíos & Devoluciones" },
      { href: "/legal/garantia-poulaillers", label: "Garantía de gallineros" },
    ],
  },
];

// Envíos y garantía ya están en la columna Servicio
const legal = [{ href: "/legal/terminos", label: "Términos del Servicio" }];

export function Footer() {
  return (
    <footer className="text-ink">
      {/* Banda de cierre: el contacto es la venta (todo se cierra por WhatsApp) */}
      <section id="contacto" className="relative overflow-hidden bg-ink text-porcelaine">
        <HenSilhouette
          size={420}
          className="pointer-events-none absolute -right-20 -bottom-24 text-porcelaine/[0.05] md:right-[6%] md:-bottom-32"
        />
        <div className="container-editorial relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="font-serif text-[2.5rem] font-light leading-[1.05] md:text-[4rem]">
              Escríbenos,
              <br />
              te respondemos.
            </p>
            <p className="max-w-md text-base text-porcelaine/75">
              ¿Dudas con una talla, un gallinero o un envío? Te asesoramos personalmente por WhatsApp.
            </p>
          </div>
          <FooterWhatsApp />
        </div>
      </section>

      <div className="relative overflow-hidden bg-brume">
        <div className="container-editorial grid gap-14 pt-16 pb-12 md:grid-cols-[1.1fr_2fr] md:gap-16 md:pt-20">
          <div className="flex flex-col items-start gap-6">
            <Logo size="md" className="items-start!" />
            <p className="max-w-xs font-serif text-[1.375rem] leading-snug italic text-ink-soft">
              Vida de gallina, pero a la francesa.
            </p>
            <FooterSocial />
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-12">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="label mb-4">{col.title}</p>
                <ul className="flex flex-col gap-0.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="link-underline inline-flex min-h-10 items-center text-base transition-colors hover:text-ocre"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Firma tipográfica a todo el ancho */}
        <p
          aria-hidden
          className="container-editorial select-none whitespace-nowrap text-center font-serif text-[9.4vw] leading-[0.8] font-light uppercase tracking-[0.06em] pb-[0.12em] text-givre md:text-[8.8vw] xl:text-[8rem]"
        >
          Maison Poupou
        </p>

        <div className="border-t border-givre">
          <div className="container-editorial flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-ink-soft hover:text-ocre">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-soft">© 2026 MAISON POUPOU. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
