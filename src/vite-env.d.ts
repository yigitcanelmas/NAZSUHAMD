/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App Configuration
  readonly VITE_APP_ENV: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string

  // API Configuration
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_API_RETRY_ATTEMPTS: string

  // Database Configuration
  readonly VITE_DB_HOST: string
  readonly VITE_DB_PORT: string
  readonly VITE_DB_NAME: string

  // Feature Flags
  readonly VITE_ENABLE_DEBUG: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_ERROR_REPORTING: string
  readonly VITE_ENABLE_HOT_RELOAD: string

  // Build Configuration
  readonly VITE_BUILD_SOURCEMAP: string
  readonly VITE_BUILD_MINIFY: string
  readonly VITE_BUILD_ANALYZE: string

  // Security
  readonly VITE_ENABLE_HTTPS: string
  readonly VITE_CORS_ORIGIN: string

  // Google OAuth
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_REDIRECT_URI: string

  // Payment Gateway
  readonly VITE_PAYMENT_GATEWAY_URL: string
  readonly VITE_PAYMENT_PUBLIC_KEY: string

  // Logging
  readonly VITE_LOG_LEVEL: string
  readonly VITE_LOG_TO_CONSOLE: string
  readonly VITE_LOG_TO_FILE: string

  // CDN Configuration
  readonly VITE_CDN_URL?: string
  readonly VITE_ASSETS_URL?: string

  // Performance
  readonly VITE_ENABLE_PWA?: string
  readonly VITE_ENABLE_SERVICE_WORKER?: string
  readonly VITE_CACHE_STRATEGY?: string

  // Monitoring
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string

  // SEO
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_SITE_KEYWORDS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
