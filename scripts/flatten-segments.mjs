// Next 16 exporta los datos de navegación por segmento en carpetas
// (our-story/__next.X/our-story/__PAGE__.txt), pero el navegador los pide con
// puntos (our-story/__next.X.our-story.__PAGE__.txt). En un hosting estático
// esas peticiones dan 404, así que se copia cada archivo también con el nombre plano.
import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "../out");
const entries = await readdir(out, { recursive: true, withFileTypes: true });
let copied = 0;

for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
  const rel = path.relative(out, path.join(entry.parentPath, entry.name)).split(path.sep);
  const start = rel.findIndex((part) => part.startsWith("__next."));
  if (start === -1 || start === rel.length - 1) continue; // ya es un archivo plano
  const flat = [...rel.slice(0, start), rel.slice(start).join(".")];
  await copyFile(path.join(out, ...rel), path.join(out, ...flat));
  copied++;
}
console.log(`Segmentos: ${copied} archivos copiados con nombre plano`);
