# 🚀 Trailie - AI-Powered Career Discovery & Enterprise Recruitment Platform

Trailie, yapay zeka destekli kişilik ve uzmanlık analizleri ile kariyer keşfi yapan, aynı zamanda şirketler için gelişmiş aday değerlendirme ve filtreleme sistemi sunan modern bir web uygulamasıdır.

## ✨ Özellikler

### 🧠 DISC Kişilik Envanteri
- 10 soruluk bilimsel DISC analizi
- Gizli renk kodlamalı puanlama sistemi
- Detaylı kişilik profili ve kariyer önerileri
- AI destekli kişilik analizi raporu

### 🎯 Uzmanlık Analizi
- 6 soruluk rol belirleme testi
- Marketing, Sales, Brand, Product uzmanlık alanları
- Önerilen araçlar ve kariyer yolları
- AI destekli uzmanlık değerlendirmesi

### 🏢 Çift Kullanıcı Tipi
- **Bireysel Kullanıcılar**: Kişilik ve uzmanlık analizleri, CV oluşturma, mülakat hazırlığı
- **Firma Kullanıcıları**: Gelişmiş aday değerlendirme ve filtreleme sistemi

### 🔍 Enterprise B2B Filtreleme Sistemi
- **Değerlendirme Platformları**: HackerRank, Codility, TestGorilla, Kandio, DevSkiller, iMocha skorları
- **Dil Yeterliliği**: IELTS, TOEFL, CEFR, Duolingo skorları
- **Sertifikalar**: AWS, Azure, Scrum, PMP, Google Analytics, Meta Blueprint
- **Eğitim & Maaş**: Üniversite, GPA, maaş beklentisi filtreleri
- **Uygunluk & Görüşme**: Durum ve mülakat süreç filtreleri
- **Accordion UI**: Gelişmiş filtreler için kullanıcı dostu arayüz

### 📱 Modern UI/UX
- Responsive tasarım (mobil/desktop)
- Minimalist ve modern arayüz
- Soft mint/teal renk paleti
- Hamburger menü ve bildirim sistemi
- Demo mode ile kolay test imkanı

### 🎮 Demo Mode
- Firebase olmadan tam fonksiyonel demo
- Tüm özellikler demo modda erişilebilir
- Gerçekçi dummy data ile test imkanı
- Premium özellikler demo modda açık

### 📊 Kapsamlı Modüller
- **CV Yönetimi**: Oluşturma, düzenleme, import
- **Mülakat Hazırlığı**: Mock interview, AI değerlendirme
- **İş Arama**: AI destekli iş eşleştirme
- **Networking**: Profesyonel bağlantı kurma
- **Coaching**: Kariyer koçluğu seansları
- **Simülasyonlar**: Gerçek iş senaryoları
- **Raporlar**: Detaylı analiz raporları

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Firestore, Auth)
- **AI**: OpenAI API (GPT-4)
- **Deployment**: Vercel
- **State Management**: React Context
- **UI Components**: Lucide React Icons

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya pnpm

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/ismetumut/trailie_v.1.91.git
cd trailie_v.1.91
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables'ları ayarlayın (Opsiyonel - Demo mode için gerekli değil)**
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
OPENAI_API_KEY=your_openai_api_key
```

4. **Development server'ı başlatın**
```bash
npm run dev
```

5. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
trailie/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global stiller
├── components/            # React component'leri
│   ├── auth/             # Kimlik doğrulama
│   ├── assessment/       # Test component'leri
│   ├── company/          # Firma paneli (B2B)
│   ├── cv/               # CV yönetimi
│   ├── interview/        # Mülakat modülleri
│   ├── jobs/             # İş arama
│   ├── networking/       # Networking
│   ├── coaching/         # Koçluk
│   ├── simulation/       # İş simülasyonları
│   ├── premium/          # Premium özellikler
│   └── ui/               # UI component'leri
├── contexts/             # React context'leri
├── lib/                  # Utility fonksiyonları
├── pages/api/            # API routes
├── public/               # Statik dosyalar
└── styles/               # CSS dosyaları
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #10b981 (Emerald)
- **Secondary**: #8b5cf6 (Purple)
- **Background**: #eaf6f2 to #d1f2e6 (Gradient)
- **Text**: #1f2937 (Gray-800)
- **Accent**: #3b82f6 (Blue)

### Fontlar
- **Primary**: Inter
- **Secondary**: SF Pro Display

## 🔧 Konfigürasyon

### Demo Mode (Varsayılan)
- Firebase konfigürasyonu gerekmez
- Tüm özellikler demo data ile çalışır
- Gerçekçi test deneyimi

### Production Setup
1. Firebase Console'da yeni proje oluşturun
2. Web app ekleyin
3. Authentication'ı etkinleştirin
4. Firestore Database'i oluşturun
5. Environment variables'ları ayarlayın

### OpenAI Setup
1. OpenAI API key alın
2. `.env.local` dosyasına ekleyin

## 🚀 Deployment

### Vercel ile Deploy

1. **Vercel CLI yükleyin**
```bash
npm i -g vercel
```

2. **Deploy edin**
```bash
vercel
```

3. **Environment variables'ları ayarlayın**
Vercel dashboard'da environment variables'ları ekleyin.

### Manuel Deploy
```bash
npm run build
npm start
```

## 📊 Analiz Sistemi

### DISC Kişilik Analizi
- **D (Dominant)**: Yönlendirici, liderlik odaklı
- **I (Influential)**: Etkileyici, sosyal
- **S (Steady)**: Destekleyici, sadık
- **C (Conscientious)**: Analitik, düzenli

### Uzmanlık Analizi
- **Marketing**: Dijital pazarlama, veri analizi
- **Sales**: Müşteri ilişkileri, satış
- **Brand**: Marka yönetimi, yaratıcılık
- **Product**: Ürün yönetimi, teknik

### B2B Filtreleme Sistemi
- **Teknik Skorlar**: HackerRank, Codility, TestGorilla
- **Dil Seviyeleri**: IELTS, TOEFL, CEFR, Duolingo
- **Sertifikalar**: AWS, Azure, Scrum, PMP
- **Eğitim**: Üniversite, GPA
- **Maaş**: Min/Maks aralıkları
- **Durum**: Uygunluk ve mülakat süreçleri

## 🎯 Kullanım Senaryoları

### Bireysel Kullanıcılar
1. Demo User ile giriş yapın
2. Kişilik ve uzmanlık testlerini tamamlayın
3. AI destekli raporları inceleyin
4. CV oluşturun ve düzenleyin
5. Mock interview ile pratik yapın
6. Networking ile bağlantı kurun

### Firma Kullanıcıları
1. Demo Company ile giriş yapın
2. Gelişmiş filtreleme sistemi ile aday arayın
3. Değerlendirme platformu skorlarını filtreleyin
4. Sertifika ve dil seviyelerini kontrol edin
5. Aday profillerini detaylı inceleyin
6. Mülakat süreçlerini yönetin

## 🔍 Öne Çıkan Özellikler

### AI Destekli Analiz
- GPT-4 ile kişilik analizi
- Uzmanlık değerlendirmesi
- Mülakat geri bildirimi
- İş eşleştirme önerileri

### Enterprise Filtreleme
- 20+ farklı filtre kategorisi
- Accordion UI ile organize edilmiş
- Gerçek zamanlı arama
- Detaylı aday profilleri

### Demo Mode
- Firebase olmadan çalışır
- Gerçekçi dummy data
- Tüm özellikler erişilebilir
- Kolay test imkanı

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Email**: info@trailie.com
- **Website**: https://trailie.com
- **LinkedIn**: [Trailie](https://linkedin.com/company/trailie)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Firebase](https://firebase.google.com/) - Backend services
- [OpenAI](https://openai.com/) - AI services
- [Lucide](https://lucide.dev/) - Icons

---

**Trailie** - Kariyer yolculuğunuzda yanınızdayız! 🚀

*Enterprise seviyede aday değerlendirme ve kariyer keşif platformu*
