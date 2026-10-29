import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Suspense } from "react";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MAISON POUPOU — Paris • Élevage d’Excellence",
    template: "%s — MAISON POUPOU",
  },
  description:
    "Boutique lifestyle de alta gama para gallinas y mascotas. Hábitats, nutrición gourmet y accesorios con alma de taller parisino, desde Bogotá.",
};

export const viewport: Viewport = {
  themeColor: "#F6F5F1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Activa los estados iniciales de las animaciones solo si hay JS */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
        <a
          href="#contenido"
          className="caps sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-porcelaine"
        >
          Saltar al contenido
        </a>
        {children}
        {/* Lee la ruta: va en Suspense para no bloquear el prerenderizado */}
        <Suspense fallback={null}>
          <RevealObserver />
        </Suspense>
      </body>
    </html>
  );
}
