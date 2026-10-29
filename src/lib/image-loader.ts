// Loader de next/image para la exportación estática: apunta a las versiones WebP
// que genera scripts/optimize-images.mjs antes de compilar.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/") || src.startsWith("/images/opt/")) return src;
  const base = src.slice("/images/".length).replace(/\.[^.]+$/, "");
  return `/images/opt/${base}-${width}.webp`;
}
