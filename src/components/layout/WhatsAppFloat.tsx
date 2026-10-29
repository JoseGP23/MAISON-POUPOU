"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/site";

/**
 * Acceso permanente a WhatsApp: el header se esconde al bajar, y la venta vive
 * allí. Aparece pasada la primera pantalla y se retira cuando la banda de
 * contacto del footer ya está a la vista, para no repetir el mismo botón.
 */
export function WhatsAppFloat() {
  const [pastFold, setPastFold] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPastFold(window.scrollY > window.innerHeight * 0.8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const band = document.getElementById("contacto");
    const io = band ? new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting)) : null;
    if (band) io?.observe(band);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const shown = pastFold && !contactVisible;

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      data-shown={shown || undefined}
      className="wa-float btn-press fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-ink text-porcelaine shadow-[0_6px_24px_-8px_rgb(31_53_80/0.45)] hover:bg-ink-soft md:right-8 md:bottom-8"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
