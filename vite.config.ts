// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "https://api.crm.ilmhub.uz", // Backend server manzili
        changeOrigin: true,
        secure: false,
        // rewrite yo'q, chunki backend api endpointlari allaqachon /api bilan boshlanadi
      },
    },
  },
});
