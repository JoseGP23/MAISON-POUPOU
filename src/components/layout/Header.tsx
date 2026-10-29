"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { mainNav, whatsappUrl } from "@/lib/site";

const iconBtn =
  "flex h-11 w-10 items-center justify-center text-ink min-[400px]:w-11 transition-colors duration-200 ease hover:text-ocre";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Menú: bloquea el scroll del fondo, foco al abrir, Escape para cerrar y foco atrapado.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const menuBtn = menuBtnRef.current;
    drawer?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const focusables = drawer.querySelectorAll<HTMLElement>("a, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      menuBtn?.focus();
    };
  }, [menuOpen]);

  // Se esconde al bajar (más espacio para leer en el celular) y vuelve al subir.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) < 6) return;
        setHidden(delta > 0 && y > window.innerHeight * 0.9);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerHidden = hidden && !menuOpen;

  return (
    <>
      <header
        data-hidden={headerHidden || undefined}
        onFocus={() => setHidden(false)}
        className="header-bar sticky top-0 z-50 border-b border-givre/80 bg-porcelaine/95 transition-transform duration-300 ease-out data-[hidden]:-translate-y-full"
      >
        <div className="container-editorial grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center gap-1 md:h-20">
          {/* Izquierda: menú */}
          <div className="-ml-2.5 flex items-center">
            <button
              ref={menuBtnRef}
              type="button"
              className={iconBtn}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="menu-principal"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>

          {/* Centro: logo */}
          <div className="flex justify-center">
            <Logo size="md" taglineClassName="hidden md:block" />
          </div>

          {/* Derecha: WhatsApp (la venta y el catálogo viven allí) */}
          <div className="-mr-2.5 flex items-center justify-end">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${iconBtn} md:w-auto md:gap-2.5 md:px-2.5`}
              aria-label="Escríbenos por WhatsApp"
            >
              <span className="caps hidden md:inline">Contacto</span>
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>


      </header>

      {/* Menú lateral: fuera del <header>, porque el desplazamiento con que se
          esconde crearía un contenedor para los elementos fixed y recortaría el panel. */}
      <div
        data-open={menuOpen}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-ink/30" onClick={() => setMenuOpen(false)} />
        <div
          id="menu-principal"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          inert={!menuOpen}
          className={`absolute inset-y-0 left-0 flex w-[88%] max-w-sm drawer-panel flex-col overflow-y-auto bg-porcelaine px-6 pb-10 pt-4 transition-transform duration-500 ease-drawer ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="-ml-3 mb-8 flex items-center justify-between">
            <button type="button" className={iconBtn} aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </button>
            <Logo size="sm" withTagline={false} href={null} />
            <span className="size-11" />
          </div>

          <ul className="mb-10 flex flex-col">
            {mainNav.map((item, i) => (
              <li key={item.href} className="drawer-item border-b border-givre/70" style={{ "--i": i } as CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex py-3.5 font-serif text-[1.5rem] transition-colors hover:text-ocre"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-item caps btn-press mt-auto inline-flex min-h-12 items-center justify-center gap-3 bg-oeuf px-6 text-ink hover:bg-ink hover:text-porcelaine"
            style={{ "--i": mainNav.length } as CSSProperties}
          >
            Pedir el catálogo
            <WhatsAppIcon size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
