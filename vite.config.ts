import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  const isDev = mode === 'development'
  const isStaging = mode === 'staging'
  const isProd = mode === 'production'

  return {
    plugins: [react()],
    
    // Server configuration
    server: {
      port: parseInt(env.VITE_SERVER_PORT) || 3000,
      host: env.VITE_SERVER_HOST || '0.0.0.0',
      open: env.VITE_SERVER_OPEN === 'true' || true,
      https: env.VITE_ENABLE_HTTPS === 'true' ? {} : false,
      cors: {
        origin: env.VITE_CORS_ORIGIN || 'http://localhost:3000'
      }
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      minify: env.VITE_BUILD_MINIFY === 'true' ? 'esbuild' : false,
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@headlessui/react', 'framer-motion'],
            utils: ['zustand', 'react-hook-form']
          }
        }
      },
      // Dynamic chunk size warnings based on environment
      chunkSizeWarningLimit: isProd ? 500 : 1000,
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
        '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@types': fileURLToPath(new URL('./src/types', import.meta.url))
      }
    },

    // Define global constants
    define: {
      'process.env': {},
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __COMMIT_HASH__: JSON.stringify(process.env.COMMIT_HASH || 'dev'),
    },

    // CSS configuration
    css: {
      devSourcemap: isDev,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },

    // Optimization configuration
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'zustand',
        'framer-motion'
      ],
      exclude: isDev ? [] : ['@vite/client', '@vite/env']
    },

    // Environment-specific configurations
    ...(isDev && {
      esbuild: {
        jsxDev: true
      }
    }),

    ...(isProd && {
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        target: 'esnext',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              ui: ['@headlessui/react', 'framer-motion'],
              utils: ['zustand', 'react-hook-form']
            }
          }
        },
        chunkSizeWarningLimit: 500,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }
    }),

    // Preview configuration (for production preview)
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT) || 4173,
      host: env.VITE_PREVIEW_HOST || 'localhost',
      open: env.VITE_PREVIEW_OPEN === 'true'
    }
  }
})
