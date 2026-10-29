import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { siteConfig, whatsappUrl } from "@/lib/site";

/** Botón de la banda de contacto del footer. */
export function FooterWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="caps btn-press inline-flex min-h-12 items-center justify-center gap-3 border border-porcelaine/70 px-8 text-porcelaine hover:bg-porcelaine hover:text-ink"
    >
      Escríbenos por WhatsApp
      <WhatsAppIcon size={18} />
    </a>
  );
}

export function FooterSocial() {
  const { instagram, tiktok } = siteConfig.social;
  const link = "group flex min-h-11 items-center gap-3 text-[0.875rem] transition-colors hover:text-ocre";
  return (
    <ul className="flex flex-col">
      <li>
        <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={link}>
          <InstagramIcon size={20} />
          <span>
            Instagram <span className="text-ink-soft group-hover:text-ocre">{instagram.handle}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className={link}>
          <TikTokIcon size={20} />
          <span>
            TikTok <span className="text-ink-soft group-hover:text-ocre">{tiktok.handle}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
