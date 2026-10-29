import Image from "next/image";
import { HenSilhouette } from "./Icons";

type EditorialImageProps = {
  src?: string | null;
  alt: string;
  /** Texto del placeholder cuando no hay foto (nombre del producto en Cormorant). */
  label: string;
  ratio?: "portrait" | "square" | "landscape" | "tall";
  sizes?: string;
  priority?: boolean;
  tone?: "givre" | "brume";
  /** Deriva vertical ligada al scroll (solo imágenes grandes de contenido editorial). */
  parallax?: boolean;
  className?: string;
};

const ratios = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  tall: "aspect-[3/4]",
};

/**
 * Foto editorial con placeholder de marca (CLAUDE.md §3): si no hay imagen
 * se muestra un rectángulo givre/brume con el nombre en Cormorant. Nunca stock.
 */
export function EditorialImage({
  src,
  alt,
  label,
  ratio = "portrait",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  tone = "givre",
  parallax = false,
  className = "",
}: EditorialImageProps) {
  return (
    <div
      className={`relative overflow-hidden ${ratios[ratio]} ${tone === "givre" ? "bg-givre" : "bg-brume"} ${className}`}
    >
      {src ? (
        // Tres capas para que cada transform tenga dueño: parallax (scroll),
        // reveal-zoom (aparición) y la imagen (hover).
        <div className={`absolute inset-x-0 ${parallax ? "parallax-layer -inset-y-[8%]" : "inset-y-0"}`}>
          <div className="reveal-zoom absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              // Las fotos subidas desde el panel son data: URLs (no pasan por el optimizador)
              unoptimized={src.startsWith("data:")}
              className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <HenSilhouette size={56} className="text-ink/15" />
          <span className="font-serif text-xl italic leading-tight text-ink/70 md:text-2xl">{label}</span>
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
