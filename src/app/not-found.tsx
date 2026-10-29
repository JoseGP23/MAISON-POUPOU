import { PublicChrome } from "@/components/layout/PublicChrome";
import { ButtonLink } from "@/components/ui/Button";
import { HenSilhouette, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/site";

export default function NotFound() {
  // Vive en la raíz (fuera del grupo público), así que trae su propio marco
  return (
    <PublicChrome>
      <div className="container-editorial flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <HenSilhouette size={88} className="text-ocre/50" />
        <p className="label">Error 404</p>
        <h1 className="font-serif text-display font-light">
          La poule s’est échappée
        </h1>
        <p className="max-w-md text-[1rem] text-ink-soft">
          La página que buscas no existe o cambió de lugar. Volvamos a casa.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink href={whatsappUrl()} external variant="secondary" icon={<WhatsAppIcon size={18} />}>
            Escríbenos por WhatsApp
          </ButtonLink>
        </div>
      </div>
    </PublicChrome>
  );
}
