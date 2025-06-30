import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";

dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
