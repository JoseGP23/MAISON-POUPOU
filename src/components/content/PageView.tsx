import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { legalPageIds, seedPages, type PageId } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import { DraftNotice } from "./DraftNotice";
import { RichText } from "./RichText";

const legalLinks: Record<(typeof legalPageIds)[number], string> = {
  "envios-devoluciones": "Envíos & Devoluciones",
  terminos: "Términos del Servicio",
  "garantia-poulaillers": "Garantía Poulaillers (1 año)",
};

/** Página de contenido (Our Story y legales). */
export function PageView({ id }: { id: PageId }) {
  const page = seedPages[id];
  const isLegal = (legalPageIds as readonly string[]).includes(id);

  if (isLegal) {
    return (
      <div className="container-editorial pt-14 pb-32 md:pt-20 md:pb-40">
        <div className="mx-auto max-w-[40rem]">
          <header className="mb-10 flex flex-col gap-4">
            <h1 className="font-serif text-title font-light">{page.title}</h1>
            {page.intro && <p className="text-[1rem] text-ink-soft">{page.intro}</p>}
          </header>
          {page.draft && <DraftNotice />}
          <RichText body={page.body} />
          <aside className="mt-14 flex flex-col gap-6 border-t border-givre pt-10">
            <p className="text-base text-ink-soft">¿Tienes una pregunta sobre tu pedido?</p>
            <ButtonLink
              href={whatsappUrl("Hola, tengo una pregunta sobre las políticas de MAISON POUPOU.")}
              external
              variant="secondary"
              icon={<WhatsAppIcon size={18} />}
              className="self-start"
            >
              Escríbenos por WhatsApp
            </ButtonLink>
            <nav aria-label="Páginas legales" className="mt-4 flex flex-col gap-1">
              <p className="label mb-2">Más políticas</p>
              {legalPageIds
                .filter((l) => l !== id)
                .map((l) => (
                  <Link key={l} href={`/legal/${l}`} className="link-underline self-start py-1.5 text-base hover:text-ocre">
                    {legalLinks[l]}
                  </Link>
                ))}
            </nav>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <article className="pb-32 md:pb-40">
      <header className="container-editorial grid gap-8 pt-14 pb-12 md:grid-cols-[1fr_1fr] md:items-end md:gap-16 md:pt-24 md:pb-16">
        <div className="flex flex-col gap-5">
          <h1 data-reveal className="font-serif text-display font-light">
            {page.title}
          </h1>
        </div>
        {page.intro && (
          <p data-reveal className="font-serif text-[1.375rem] leading-snug italic text-ink-soft md:text-[1.625rem]">
            {page.intro}
          </p>
        )}
      </header>

      <div data-reveal="mask" className="container-editorial">
        <EditorialImage
          src={page.image}
          alt={page.title}
          label={page.title}
          ratio="landscape"
          tone="brume"
          priority
          parallax
          sizes="(min-width: 1320px) 1240px, 100vw"
          className="md:aspect-[21/9]"
        />
      </div>

      <div className="container-editorial py-16 md:py-24">
        <RichText body={page.body} className="mx-auto max-w-[38rem]" />
      </div>

      <div className="container-editorial">
        <ClosingBand />
      </div>
    </article>
  );
}

// El lema y el botón de WhatsApp ya cierran la página en el footer: aquí solo el siguiente paso
function ClosingBand() {
  return (
    <section className="mt-20 flex justify-center border-t border-givre pt-16 md:mt-28">
      <ButtonLink href="/#signature" variant="secondary" icon={<ArrowRightIcon size={16} />}>
        Ver las piezas signature
      </ButtonLink>
    </section>
  );
}
