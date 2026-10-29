// Genera las versiones WebP que pide el loader de imágenes (src/lib/image-loader.ts).
// La web se publica como sitio estático, sin servidor que optimice imágenes al vuelo,
// así que cada foto de public/images se convierte de antemano a cada ancho del srcset.
import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "public/images");
const out = path.join(src, "opt");
const { deviceSizes, imageSizes } = JSON.parse(await readFile(path.join(root, "image-widths.json"), "utf8"));
const widths = [...imageSizes, ...deviceSizes];

const mtime = (file) => stat(file).then((s) => s.mtimeMs, () => 0);

await mkdir(out, { recursive: true });
const files = (await readdir(src)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let made = 0;

for (const file of files) {
  const input = path.join(src, file);
  const base = file.replace(/\.[^.]+$/, "");
  const changed = await mtime(input);
  for (const w of widths) {
    const target = path.join(out, `${base}-${w}.webp`);
    if ((await mtime(target)) > changed) continue;
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
    made++;
  }
}
console.log(`Imágenes: ${files.length} fotos, ${made} versiones nuevas en public/images/opt`);
