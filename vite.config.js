import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/website/' : '/', // Set the base path conditionally based on the mode
    // base: mode === 'production' ? '/' : '/', // Always root

   
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // Treat `swiper-container` and `swiper-slide` as custom elements
            isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
          }
        }
      }),
      mode === 'development' && vueDevTools(), // Include vueDevTools only in development mode
    ].filter(Boolean), // Filter out false values

    build: {
      sourcemap: true, // Enable source maps for your code
      rollupOptions: {
        output: {
          sourcemapExcludeSources: true, // Exclude sources from source maps
        },
      },
    },
    server: {
      sourcemap: false, // Enable source maps for development server
      open: true,
      watch: {
        usePolling: true, // Fixes issues in some environments
      },
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      exclude: ['vue', 'three'], // Exclude specific dependencies from pre-bundling
    },
  }
})