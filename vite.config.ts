import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({
      tsconfigPath:'./tsconfig.build.json'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname,'src/index.ts'),
      name:'AUElement',
      fileName:'au-element'
    },
    rollupOptions: {
      external: ['vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/vue-fontawesome'],
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
