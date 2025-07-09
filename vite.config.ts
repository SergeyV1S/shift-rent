import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.svg"],
      srcDir: "src",
      // filename: "sw.ts",
      // strategies: "injectManifest",
      // injectManifest: {
      //   swDest: "dist/sw.js"
      // },
      manifest: {
        name: "Shift Rent | Car rent for you",
        short_name: "Shift Rent",
        lang: "ru-RU",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
          },
          { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@shared": path.resolve(__dirname, "src/shared")
    }
  },
  define: {
    "process.env": process.env
  },
  envPrefix: ["VITE_", "BASE_"]
});
