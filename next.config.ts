import type { NextConfig } from "next";
import imageWidths from "./image-widths.json";

const nextConfig: NextConfig = {
  // Web estática (sin servidor) para Azure Static Web Apps; genera la carpeta out/
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    ...imageWidths,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
