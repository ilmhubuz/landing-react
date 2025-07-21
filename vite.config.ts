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
    emptyOutDir: true,
    // Optimize chunk splitting
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        register: path.resolve(__dirname, 'register.html')
      },
      output: {
        manualChunks: {
          // Vendor chunk for React and core libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Material-UI chunk
          mui: ['@mui/material', '@mui/icons-material', '@mui/system', '@emotion/react', '@emotion/styled'],
          // Utils chunk
          utils: ['axios', 'react-hot-toast', 'react-helmet-async']
        },
        // Optimize chunk and asset naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimize bundle size
    minify: 'esbuild',
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging (disable in production)
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  }
});
