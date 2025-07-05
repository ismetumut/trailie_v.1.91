# 🚀 Trailie Deployment Guide

Bu rehber, Trailie platformunu production ortamına deploy etmek için gerekli adımları içerir.

## 📋 Ön Gereksinimler

- Node.js 18+ 
- Git
- Vercel hesabı (önerilen)
- OpenAI API anahtarı (opsiyonel - demo mode için gerekli değil)

## 🔧 Environment Variables

### Gerekli Environment Variables

Production ortamında aşağıdaki environment variables'ları ayarlayın:

```env
# OpenAI API (Opsiyonel - Demo mode için gerekli değil)
OPENAI_API_KEY=your_openai_api_key

# Firebase (Opsiyonel - Demo mode için gerekli değil)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Demo Mode

Environment variables ayarlanmazsa, uygulama otomatik olarak demo mode'a geçer:
- Tüm AI fonksiyonları demo data ile çalışır
- Firebase bağlantısı olmadan çalışır
- Gerçekçi test deneyimi sunar

## 🚀 Vercel ile Deploy

### 1. Vercel CLI Kurulumu

```bash
npm i -g vercel
```

### 2. Proje Deploy

```bash
# Proje dizininde
vercel

# Veya production için
vercel --prod
```

### 3. Environment Variables Ayarlama

Vercel Dashboard'da:
1. Proje ayarlarına gidin
2. "Environment Variables" sekmesine tıklayın
3. Yukarıdaki environment variables'ları ekleyin
4. "Redeploy" yapın

## 🔧 Manuel Deploy

### 1. Build

```bash
npm run build
```

### 2. Start

```bash
npm start
```

## 🐛 AI Fonksiyonları Sorun Giderme

### Sorun: AI fonksiyonları çalışmıyor

**Çözüm:**
1. Environment variables'ları kontrol edin
2. `OPENAI_API_KEY` doğru ayarlandığından emin olun
3. API key'in geçerli olduğunu kontrol edin

### Sorun: Demo mode'da AI çalışmıyor

**Çözüm:**
1. Environment variables'ları temizleyin
2. Uygulamayı yeniden deploy edin
3. Demo mode otomatik olarak aktif olacaktır

### Sorun: API rate limits

**Çözüm:**
1. OpenAI API kullanım limitlerini kontrol edin
2. Gerekirse daha yüksek limitli plana geçin
3. Demo mode kullanarak test edin

## 📊 Monitoring

### Vercel Analytics

Vercel Dashboard'da:
- Performance metrics
- Error tracking
- User analytics

### OpenAI Usage

OpenAI Dashboard'da:
- API kullanım istatistikleri
- Rate limit durumu
- Cost tracking

## 🔒 Security

### Environment Variables

- Production'da `NEXT_PUBLIC_` prefix'li variables'ları client-side'da kullanmayın
- Server-side API route'larda `OPENAI_API_KEY` kullanın
- API key'leri asla client-side kodda expose etmeyin

### CORS

Production'da CORS ayarlarını kontrol edin:
- Sadece gerekli domain'lere izin verin
- API route'ları için CORS middleware ekleyin

## 🚀 Performance Optimization

### Build Optimization

```bash
# Production build
npm run build

# Bundle analyzer
npm run analyze
```

### Image Optimization

- Next.js Image component kullanın
- WebP format'ını tercih edin
- Lazy loading uygulayın

## 📱 Mobile Optimization

### Responsive Design

- Tüm component'lerin mobile-friendly olduğundan emin olun
- Touch interactions'ları test edin
- Performance'ı mobile cihazlarda kontrol edin

## 🔄 CI/CD

### GitHub Actions

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Common Issues

### Issue: Build fails

**Solution:**
1. Node.js versiyonunu kontrol edin (18+)
2. Dependencies'leri temizleyin: `rm -rf node_modules package-lock.json && npm install`
3. TypeScript hatalarını düzeltin

### Issue: API routes not working

**Solution:**
1. Environment variables'ları kontrol edin
2. API route'ların doğru path'te olduğundan emin olun
3. CORS ayarlarını kontrol edin

### Issue: Mobile issues

**Solution:**
1. Responsive design'ı test edin
2. Touch interactions'ları kontrol edin
3. Performance'ı mobile'da optimize edin

## 📞 Support

Sorun yaşarsanız:
1. Console log'larını kontrol edin
2. Network tab'ını inceleyin
3. Environment variables'ları doğrulayın
4. Demo mode ile test edin

---

**Trailie** - Deployment rehberi tamamlandı! 🚀 