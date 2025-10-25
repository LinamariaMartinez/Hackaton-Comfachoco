import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/services': path.resolve(__dirname, './src/services'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React y dependencias de routing
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Separar date-fns en su propio chunk
          'date-vendor': ['date-fns'],

          // Separar UI libraries
          'ui-vendor': ['lucide-react', 'react-hot-toast'],

          // Separar state management
          'state-vendor': ['zustand'],
        },
      },
    },
    // Optimizaciones adicionales
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Desactivar sourcemaps en producción para reducir tamaño
  },
  // Optimizaciones de dev server
  server: {
    hmr: {
      overlay: true,
    },
  },
})
