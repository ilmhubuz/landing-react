// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // optional: cleans dist before build
  },
  server: {
    port: 3000, // optional: custom dev server port
    open: true, // optional: open browser on dev
  },
});
