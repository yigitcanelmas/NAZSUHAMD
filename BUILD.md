# Nazsu Water Store - Dinamik Build Sistemi

Bu proje, çoklu ortam desteği ile dinamik build sistemi kullanmaktadır.

## 🚀 Hızlı Başlangıç

```bash
# Development ortamında çalıştırma
npm run dev

# Production build
npm run build

# Staging ortamında test
npm run dev:staging
```

## 🌍 Ortamlar (Environments)

### Development
- **Dosya**: `.env.development`
- **Port**: 3000
- **API**: http://localhost:5000/api
- **Debug**: Aktif
- **Sourcemap**: Aktif

```bash
npm run dev
npm run build:dev
```

### Staging
- **Dosya**: `.env.staging`
- **Port**: 3001
- **API**: https://staging-api.nazsu.com/api
- **Debug**: Aktif
- **Analytics**: Aktif

```bash
npm run dev:staging
npm run build:staging
```

### Production
- **Dosya**: `.env.production`
- **Port**: 3002
- **API**: https://api.nazsu.com/api
- **Debug**: Kapalı
- **Optimizasyon**: Maksimum

```bash
npm run build:prod
npm run preview:prod
```

## 📦 Build Komutları

### Temel Build Komutları
```bash
# TypeScript kontrolü + Production build
npm run build

# Sadece development build
npm run build:dev

# Staging build
npm run build:staging

# Production build (optimized)
npm run build:prod

# Build analizi
npm run build:analyze
```

### Development Komutları
```bash
# Development server
npm run dev

# Staging development server
npm run dev:staging

# Production mode development
npm run dev:prod
```

### Preview Komutları
```bash
# Production preview
npm run preview

# Staging preview
npm run preview:staging

# Production preview
npm run preview:prod
```

## 🔧 Konfigürasyon

### Environment Değişkenleri

Her ortam için ayrı `.env` dosyaları:

- `.env.development` - Development ortamı
- `.env.staging` - Staging ortamı
- `.env.production` - Production ortamı

### Vite Konfigürasyonu

`vite.config.ts` dosyası dinamik olarak environment'a göre konfigürasyon yapar:

```typescript
// Ortam bazlı konfigürasyon
const isDev = mode === 'development'
const isStaging = mode === 'staging'
const isProd = mode === 'production'

// Dinamik build ayarları
build: {
  sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
  minify: env.VITE_BUILD_MINIFY === 'true' ? 'esbuild' : false,
  chunkSizeWarningLimit: isProd ? 500 : 1000,
}
```

## 🐳 Docker Desteği

### Docker Build
```bash
# Development
npm run docker:build

# Staging
npm run docker:build:staging

# Production
npm run docker:build:prod
```

### Docker Compose
```bash
# Development ortamı
docker-compose --profile development up

# Staging ortamı
docker-compose --profile staging up

# Production ortamı
docker-compose --profile production up
```

## 🚀 Deployment

### Manuel Deployment
```bash
# Staging deployment
npm run deploy:staging

# Production deployment
npm run deploy:prod
```

### Script ile Deployment
```bash
# Staging'e deploy
./scripts/deploy.sh staging

# Production'a deploy (testler ile)
./scripts/deploy.sh production

# Testleri atla
./scripts/deploy.sh production --skip-tests

# Dry run
./scripts/deploy.sh staging --dry-run
```

## 📊 Build Optimizasyonları

### Development
- ✅ Hot Module Replacement (HMR)
- ✅ Source Maps
- ✅ Debug bilgileri
- ❌ Minification
- ❌ Code splitting

### Staging
- ✅ Source Maps
- ✅ Analytics
- ✅ Error Reporting
- ✅ Minification
- ✅ Bundle analizi

### Production
- ❌ Source Maps
- ❌ Console logs
- ✅ Minification (Terser)
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Gzip compression

## 🔍 Build Analizi

```bash
# Bundle analizi
npm run build:analyze

# Bundle boyutlarını kontrol et
npm run build:prod
ls -la dist/
```

## 🛠️ Geliştirme Araçları

### Linting
```bash
# ESLint kontrolü
npm run lint

# ESLint düzeltme
npm run lint:fix

# TypeScript kontrolü
npm run type-check
```

### Temizlik
```bash
# Build klasörünü temizle
npm run clean

# Node modules'ı yeniden yükle
npm run clean:install
```

## 📁 Build Çıktıları

### Klasör Yapısı
```
dist/
├── assets/
│   ├── vendor.[hash].js      # React, React-DOM
│   ├── router.[hash].js      # React Router
│   ├── ui.[hash].js          # UI kütüphaneleri
│   ├── utils.[hash].js       # Zustand, React Hook Form
│   └── index.[hash].css      # Styles
├── index.html                # Ana HTML dosyası
└── favicon.ico               # Favicon
```

### Chunk Stratejisi
- **vendor**: React, React-DOM
- **router**: React Router DOM
- **ui**: Headless UI, Framer Motion
- **utils**: Zustand, React Hook Form

## 🔐 Güvenlik

### Production Güvenlik Ayarları
- Console log'ları kaldırılır
- Debug bilgileri kaldırılır
- Source map'ler devre dışı
- HTTPS zorunlu
- Security header'ları aktif

### Environment Secrets
```bash
# Hassas bilgiler için
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_PAYMENT_PUBLIC_KEY=your-payment-key
```

## 📈 Performans

### Build Süreleri
- **Development**: ~2-3 saniye
- **Staging**: ~15-20 saniye
- **Production**: ~30-45 saniye

### Bundle Boyutları
- **Development**: ~2-3 MB
- **Staging**: ~800 KB (gzipped)
- **Production**: ~400 KB (gzipped)

## 🐛 Sorun Giderme

### Yaygın Sorunlar

1. **Environment değişkenleri yüklenmiyor**
   ```bash
   # .env dosyasının doğru isimde olduğunu kontrol edin
   ls -la .env.*
   ```

2. **Build hatası**
   ```bash
   # Cache'i temizleyin
   npm run clean
   npm install
   ```

3. **TypeScript hataları**
   ```bash
   # Type kontrolü yapın
   npm run type-check
   ```

### Debug Modu
```bash
# Debug bilgileri ile build
VITE_ENABLE_DEBUG=true npm run build:dev
```

## 📚 Daha Fazla Bilgi

- [Vite Dokümantasyonu](https://vitejs.dev/)
- [React Dokümantasyonu](https://react.dev/)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/)
- [Docker Dokümantasyonu](https://docs.docker.com/)

## 🤝 Katkıda Bulunma

1. Feature branch oluşturun
2. Development ortamında test edin
3. Staging'e deploy edin
4. Production'a merge edin

```bash
git checkout -b feature/new-feature
npm run dev
# Geliştirme...
npm run build:staging
./scripts/deploy.sh staging
