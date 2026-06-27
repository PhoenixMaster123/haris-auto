import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Dynamically set the base path based on the GitHub Actions environment variable
  base: process.env.GITHUB_PAGES ? '/Haris-Auto/' : '/',
  
  build: {
    outDir: "dist",
    assetsInlineLimit: 0, // keep media/fonts as real files
  },
});