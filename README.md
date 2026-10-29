# MAISON POUPOU — web de marca

Sitio estático en Next.js + Tailwind CSS. No tiene catálogo ni carrito: los pedidos se atienden por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Dónde se edita el contenido

- `src/lib/site.ts`: número de WhatsApp, redes sociales, menú y piezas signature.
- `src/lib/hero.ts`: escenas del hero.
- `src/lib/content.ts`: Our Story y páginas legales.
- `public/images/`: fotos originales (JPG o PNG). Al compilar, `scripts/optimize-images.mjs` genera versiones WebP en `public/images/opt/`; esa carpeta no se sube al repositorio.

## Publicación

`npm run build` genera el sitio estático en `out/`. Cada push a `main` lo publica en Azure Static Web Apps mediante GitHub Actions. La configuración de Azure (página 404 y caché) está en `public/staticwebapp.config.json`.
