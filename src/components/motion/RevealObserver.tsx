"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marca con [data-revealed] los elementos [data-reveal] cuando entran en
 * pantalla, una sola vez. Los estilos viven en globals.css.
 *   data-reveal          → sube y aparece
 *   data-reveal="mask"   → imagen que se descubre de abajo hacia arriba
 *   style="--reveal-delay: 80ms" → escalonado dentro de un grupo
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
