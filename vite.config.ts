import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 // base: '/', // Ajusta esto si tu app no está en la raíz
 // build: {
 //   outDir: 'dist',  // Asegúrate que esto esté configurado a 'dist'
 //   assetsDir: 'assets',
 //   emptyOutDir: true,
 //   rollupOptions: {
 //     input: {
 //       main: './index.html',        
 //     },
 //     output: {
 //       dir: 'dist', // Carpeta de salida
 //       format: 'es', // Formato de salida (ESM)
 //     },
 //   },
 // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components')

    }

  },
})

