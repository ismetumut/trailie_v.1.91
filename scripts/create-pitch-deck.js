const PptxGenJS = require('pptxgenjs');

// Create presentation
const pres = new PptxGenJS();

// Slide 1: Title Slide
const slide1 = pres.addSlide();
slide1.addText('TRAILIE', {
    x: 1, y: 1.5, w: 8, h: 1.5,
    fontSize: 48,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32',
    align: 'center'
});
slide1.addText('Kariyer Keşif Platformu', {
    x: 1, y: 3, w: 8, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    color: '666666',
    align: 'center'
});
slide1.addText('"Kariyerinizi Büyütün, Geleceğinizi Şekillendirin"', {
    x: 1, y: 3.8, w: 8, h: 0.3,
    fontSize: 16,
    fontFace: 'Arial',
    italic: true,
    color: '888888',
    align: 'center'
});
slide1.addText('"Grow Your Career, Shape Your Future"', {
    x: 1, y: 4.2, w: 8, h: 0.3,
    fontSize: 16,
    fontFace: 'Arial',
    italic: true,
    color: '888888',
    align: 'center'
});

// Add seedling logo placeholder
slide1.addShape('rect', {
    x: 3.5, y: 5.5, w: 1, h: 1,
    fill: { color: '2E7D32' },
    line: { color: '2E7D32', width: 2 }
});
slide1.addText('🌱', {
    x: 3.5, y: 5.5, w: 1, h: 1,
    fontSize: 36,
    align: 'center',
    valign: 'middle'
});

// Slide 2: Problem Statement
const slide2 = pres.addSlide();
slide2.addText('PROBLEM', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide2.addText('Kariyer Yolculuğundaki Zorluklar', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const problems = [
    '• Kişilik ve yeteneklerin doğru değerlendirilmemesi',
    '• Kariyer hedeflerinin belirsizliği',
    '• İş arama sürecinin karmaşıklığı',
    '• Networking fırsatlarının sınırlılığı',
    '• Kişiselleştirilmiş kariyer rehberliği eksikliği'
];

problems.forEach((problem, index) => {
    slide2.addText(problem, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 3: Solution
const slide3 = pres.addSlide();
slide3.addText('ÇÖZÜM', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide3.addText('Trailie: Kapsamlı Kariyer Keşif Platformu', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const solutions = [
    '• AI Destekli Kişilik ve Uzmanlık Analizi',
    '• Kişiselleştirilmiş Kariyer Önerileri',
    '• Simülasyon Tabanlı Rol Deneyimi',
    '• Networking ve Koçluk Hizmetleri',
    '• B2B ve B2C Entegrasyonu'
];

solutions.forEach((solution, index) => {
    slide3.addText(solution, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 4: Product Features
const slide4 = pres.addSlide();
slide4.addText('ÜRÜN ÖZELLİKLERİ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

// Left column
slide4.addText('B2C Özellikler', {
    x: 0.5, y: 1.5, w: 4, h: 0.4,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const b2cFeatures = [
    '• DISC Kişilik Analizi',
    '• Uzmanlık Değerlendirmesi',
    '• AI Destekli CV Oluşturucu',
    '• Mock Interview Simülasyonu',
    '• Kariyer Yolculuk Haritası',
    '• Premium Koçluk Hizmetleri'
];

b2cFeatures.forEach((feature, index) => {
    slide4.addText(feature, {
        x: 0.5, y: 2 + (index * 0.3), w: 4, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Right column
slide4.addText('B2B Özellikler', {
    x: 5, y: 1.5, w: 4, h: 0.4,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const b2bFeatures = [
    '• Aday Arama ve Filtreleme',
    '• İş İlanı Yönetimi',
    '• Şirket Profil Yönetimi',
    '• Aday Analitikleri',
    '• Entegre İşe Alım Süreci',
    '• Performans Raporları'
];

b2bFeatures.forEach((feature, index) => {
    slide4.addText(feature, {
        x: 5, y: 2 + (index * 0.3), w: 4, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 5: Market Opportunity
const slide5 = pres.addSlide();
slide5.addText('PAZAR FIRSATI', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide5.addText('Türkiye Kariyer Teknolojileri Pazarı', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const marketData = [
    '• Türkiye\'de 84M+ aktif internet kullanıcısı',
    '• 15-64 yaş arası çalışma çağındaki nüfus: 54M+',
    '• Yıllık iş arama pazarı: $500M+',
    '• Kariyer teknolojileri büyüme oranı: %25/yıl',
    '• Hedef kitle: 5M+ aktif iş arayan'
];

marketData.forEach((data, index) => {
    slide5.addText(data, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 6: Revenue Model
const slide6 = pres.addSlide();
slide6.addText('GELİR MODELİ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

// B2C Revenue
slide6.addText('B2C Gelir Akışları', {
    x: 0.5, y: 1.5, w: 4, h: 0.4,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const b2cRevenue = [
    '• Freemium Model',
    '• Premium Abonelik: ₺99/ay',
    '• Koçluk Seansları: ₺500/seans',
    '• CV Hazırlama: ₺199',
    '• Mock Interview: ₺299'
];

b2cRevenue.forEach((revenue, index) => {
    slide6.addText(revenue, {
        x: 0.5, y: 2 + (index * 0.3), w: 4, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: '555555'
    });
});

// B2B Revenue
slide6.addText('B2B Gelir Akışları', {
    x: 5, y: 1.5, w: 4, h: 0.4,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const b2bRevenue = [
    '• Şirket Abonelikleri',
    '• Aday Arama: ₺2,000/ay',
    '• İş İlanı Yayınlama: ₺500/ilan',
    '• Analitik Raporları: ₺1,000/ay',
    '• Özel Entegrasyonlar'
];

b2bRevenue.forEach((revenue, index) => {
    slide6.addText(revenue, {
        x: 5, y: 2 + (index * 0.3), w: 4, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 7: Team (Empty for user to fill)
const slide7 = pres.addSlide();
slide7.addText('TAKIMIMIZ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide7.addText('Deneyimli ve Tutkulu Ekip', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

// Team member placeholders
const positions = ['CEO', 'CFO', 'COO', 'Head of Product', 'CTO'];
const positionsY = [2.2, 3.2, 4.2, 5.2, 6.2];

positions.forEach((position, index) => {
    // Position box
    slide7.addShape('rect', {
        x: 0.5 + (index * 1.8), y: positionsY[index], w: 1.6, h: 1.2,
        fill: { color: 'F5F5F5' },
        line: { color: 'DDDDDD', width: 1 }
    });
    
    // Position title
    slide7.addText(position, {
        x: 0.5 + (index * 1.8), y: positionsY[index] + 0.1, w: 1.6, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: '2E7D32',
        align: 'center'
    });
    
    // Placeholder text
    slide7.addText('Ad Soyad', {
        x: 0.5 + (index * 1.8), y: positionsY[index] + 0.4, w: 1.6, h: 0.2,
        fontSize: 12,
        fontFace: 'Arial',
        color: '888888',
        align: 'center'
    });
    
    slide7.addText('LinkedIn', {
        x: 0.5 + (index * 1.8), y: positionsY[index] + 0.6, w: 1.6, h: 0.2,
        fontSize: 12,
        fontFace: 'Arial',
        color: '888888',
        align: 'center'
    });
    
    slide7.addText('Rol Açıklaması', {
        x: 0.5 + (index * 1.8), y: positionsY[index] + 0.8, w: 1.6, h: 0.3,
        fontSize: 10,
        fontFace: 'Arial',
        color: '888888',
        align: 'center'
    });
});

// Slide 8: Traction & Metrics
const slide8 = pres.addSlide();
slide8.addText('TRACTION & METRICS', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide8.addText('Platform Performansı', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const metrics = [
    '• 10,000+ Kullanıcı Kaydı',
    '• 5,000+ Tamamlanan Değerlendirme',
    '• 1,000+ CV Oluşturuldu',
    '• 500+ Mock Interview Tamamlandı',
    '• 50+ Şirket Ortaklığı',
    '• %85 Kullanıcı Memnuniyeti'
];

metrics.forEach((metric, index) => {
    slide8.addText(metric, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 9: Investment Ask
const slide9 = pres.addSlide();
slide9.addText('YATIRIM TALEBİ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide9.addText('Büyüme için Yatırım', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const investmentDetails = [
    '• Yatırım Miktarı: $150,000',
    '• Hisse Oranı: %10',
    '• Değerleme: $1.5M',
    '• Kullanım Alanları:',
    '  - Teknoloji Geliştirme',
    '  - Pazarlama ve Büyüme',
    '  - Ekip Genişletme',
    '  - Operasyonel Giderler'
];

investmentDetails.forEach((detail, index) => {
    slide9.addText(detail, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Slide 10: Contact & Next Steps
const slide10 = pres.addSlide();
slide10.addText('İLETİŞİM & SONRAKI ADIMLAR', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial',
    bold: true,
    color: '2E7D32'
});

slide10.addText('Bizimle İletişime Geçin', {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: '333333'
});

const contactInfo = [
    '• Email: info@trailie.com',
    '• Website: www.trailie.com',
    '• LinkedIn: linkedin.com/company/trailie',
    '• Demo: trailie.com/demo',
    '',
    'Sonraki Adımlar:',
    '• Demo Görüşmesi',
    '• Teknik Detaylar',
    '• Yatırım Süreci'
];

contactInfo.forEach((info, index) => {
    slide10.addText(info, {
        x: 0.5, y: 2.2 + (index * 0.4), w: 9, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: '555555'
    });
});

// Save the presentation
pres.writeFile({ fileName: 'Trailie_Pitch_Deck.pptx' })
    .then(fileName => {
        console.log(`Pitch deck created successfully: ${fileName}`);
    })
    .catch(err => {
        console.error('Error creating pitch deck:', err);
    }); 