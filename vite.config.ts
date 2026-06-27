import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the build can be hosted from any
  // sub-path (e.g. a static host or a folder) without rewrites.
  base: "./",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0, // keep media/fonts as real files
  },
});
