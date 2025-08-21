import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
   
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir:'dist/umd',
    lib: {
      entry: resolve(__dirname,'src/index.ts'),
      name:'AUElement',
      fileName:'au-element',
      formats:['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue:'Vue',
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.type === 'asset' && chunkInfo.names?.some(n => n.endsWith('.css'))) {
            return 'index.css'
          }
          return '[name][extname]'
        }

      }
    }
  }
})
