import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Se o @tanstack/start/config der erro ao instanciar, o Vinxi lê nativamente assim:
export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
});