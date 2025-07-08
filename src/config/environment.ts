// Environment Configuration Manager
export interface EnvironmentConfig {
  app: {
    env: string;
    name: string;
    version: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  database: {
    host: string;
    port: number;
    name: string;
  };
  features: {
    debug: boolean;
    analytics: boolean;
    errorReporting: boolean;
    hotReload: boolean;
  };
  build: {
    sourcemap: boolean;
    minify: boolean;
    analyze: boolean;
  };
  security: {
    https: boolean;
    corsOrigin: string;
  };
  auth: {
    googleClientId: string;
    googleRedirectUri: string;
  };
  payment: {
    gatewayUrl: string;
    publicKey: string;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    toConsole: boolean;
    toFile: boolean;
  };
  cdn?: {
    url: string;
    assetsUrl: string;
  };
  performance?: {
    pwa: boolean;
    serviceWorker: boolean;
    cacheStrategy: 'networkFirst' | 'cacheFirst';
  };
  monitoring?: {
    sentryDsn: string;
    googleAnalyticsId: string;
  };
  seo?: {
    siteUrl: string;
    description: string;
    keywords: string;
  };
}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnvironmentConfig {
    const env = import.meta.env.VITE_APP_ENV || 'development';
    
    return {
      app: {
        env,
        name: import.meta.env.VITE_APP_NAME || 'Nazsu Water Store',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      },
      api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
        timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
        retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
      },
      database: {
        host: import.meta.env.VITE_DB_HOST || 'localhost',
        port: parseInt(import.meta.env.VITE_DB_PORT) || 27017,
        name: import.meta.env.VITE_DB_NAME || 'nazsu_dev',
      },
      features: {
        debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
        analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
        errorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
        hotReload: import.meta.env.VITE_ENABLE_HOT_RELOAD === 'true',
      },
      build: {
        sourcemap: import.meta.env.VITE_BUILD_SOURCEMAP === 'true',
        minify: import.meta.env.VITE_BUILD_MINIFY === 'true',
        analyze: import.meta.env.VITE_BUILD_ANALYZE === 'true',
      },
      security: {
        https: import.meta.env.VITE_ENABLE_HTTPS === 'true',
        corsOrigin: import.meta.env.VITE_CORS_ORIGIN || 'http://localhost:3000',
      },
      auth: {
        googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        googleRedirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || '',
      },
      payment: {
        gatewayUrl: import.meta.env.VITE_PAYMENT_GATEWAY_URL || '',
        publicKey: import.meta.env.VITE_PAYMENT_PUBLIC_KEY || '',
      },
      logging: {
        level: (import.meta.env.VITE_LOG_LEVEL as any) || 'info',
        toConsole: import.meta.env.VITE_LOG_TO_CONSOLE === 'true',
        toFile: import.meta.env.VITE_LOG_TO_FILE === 'true',
      },
      ...(import.meta.env.VITE_CDN_URL && {
        cdn: {
          url: import.meta.env.VITE_CDN_URL,
          assetsUrl: import.meta.env.VITE_ASSETS_URL || import.meta.env.VITE_CDN_URL,
        },
      }),
      ...(import.meta.env.VITE_ENABLE_PWA && {
        performance: {
          pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
          serviceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
          cacheStrategy: (import.meta.env.VITE_CACHE_STRATEGY as any) || 'networkFirst',
        },
      }),
      ...(import.meta.env.VITE_SENTRY_DSN && {
        monitoring: {
          sentryDsn: import.meta.env.VITE_SENTRY_DSN,
          googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
        },
      }),
      ...(import.meta.env.VITE_SITE_URL && {
        seo: {
          siteUrl: import.meta.env.VITE_SITE_URL,
          description: import.meta.env.VITE_SITE_DESCRIPTION || '',
          keywords: import.meta.env.VITE_SITE_KEYWORDS || '',
        },
      }),
    };
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }

  public get(key: string): any {
    const keys = key.split('.');
    let value: any = this.config;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value;
  }

  public isDevelopment(): boolean {
    return this.config.app.env === 'development';
  }

  public isStaging(): boolean {
    return this.config.app.env === 'staging';
  }

  public isProduction(): boolean {
    return this.config.app.env === 'production';
  }

  public getApiUrl(endpoint: string = ''): string {
    return `${this.config.api.baseUrl}${endpoint}`;
  }

  public getAssetUrl(path: string): string {
    if (this.config.cdn?.assetsUrl) {
      return `${this.config.cdn.assetsUrl}${path}`;
    }
    return path;
  }

  public shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.logging.level);
    const requestedLevelIndex = levels.indexOf(level);
    
    return requestedLevelIndex >= currentLevelIndex;
  }

  public logConfig(): void {
    if (this.config.features.debug) {
      console.group('🔧 Environment Configuration');
      console.log('Environment:', this.config.app.env);
      console.log('App Name:', this.config.app.name);
      console.log('Version:', this.config.app.version);
      console.log('API Base URL:', this.config.api.baseUrl);
      console.log('Features:', this.config.features);
      console.groupEnd();
    }
  }
}

// Create singleton instance
export const env = new EnvironmentManager();

// Export config for direct access
export const config = env.getConfig();

// Initialize logging
env.logConfig();

export default env;
