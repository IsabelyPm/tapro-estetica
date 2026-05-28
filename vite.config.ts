import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackRouter(), // Gera as rotas localmente no seu PC
    react(),
    tailwindcss(),    // Compila o Tailwind v4
    tsconfigPaths(),  // Resolve os caminhos com "@/"
  ],
});