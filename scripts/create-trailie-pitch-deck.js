const PptxGenJS = require('pptxgenjs');

// Create presentation with Trailie's color scheme
const pres = new PptxGenJS();

// Set presentation properties
pres.author = 'Trailie Team';
pres.company = 'Trailie';
pres.title = 'Trailie - Kariyer Keşif Platformu';
pres.subject = 'Yatırım Sunumu';

// Trailie's actual color scheme from CSS
const colors = {
    primary: '2A9D8F',      // Turquoise (180 45% 42%)
    secondary: 'F1FAEE',    // Light turquoise tint
    accent: 'E9F5F3',       // Light turquoise accent
    dark: '2D3748',         // Dark gray
    light: 'F8FAFC',        // Very light gray
    white: 'FFFFFF',
    text: '4A5568',         // Muted text
    success: '48BB78',      // Green accent
    warning: 'ED8936'       // Orange accent
};

// Slide 1: Hero Slide
const slide1 = pres.addSlide();
slide1.background = { color: colors.primary };

slide1.addText('TRAILIE', {
    x: 1, y: 2, w: 8, h: 1.5,
    fontSize: 64,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide1.addText('Kariyer Keşif Platformu', {
    x: 1, y: 3.8, w: 8, h: 0.6,
    fontSize: 28,
    fontFace: 'Arial',
    color: colors.white,
    align: 'center'
});

slide1.addText('"Kariyerinizi Büyütün, Geleceğinizi Şekillendirin"', {
    x: 1, y: 4.6, w: 8, h: 0.4,
    fontSize: 16,
    fontFace: 'Arial',
    color: colors.secondary,
    align: 'center',
    italic: true
});

slide1.addText('"Grow Your Career, Shape Your Future"', {
    x: 1, y: 5.1, w: 8, h: 0.4,
    fontSize: 16,
    fontFace: 'Arial',
    color: colors.secondary,
    align: 'center',
    italic: true
});

// Seedling logo
slide1.addText('🌱', {
    x: 4.5, y: 6, w: 1, h: 1,
    fontSize: 48,
    align: 'center',
    valign: 'middle'
});

// Slide 2: Problem Statement
const slide2 = pres.addSlide();
slide2.background = { color: colors.light };

slide2.addText('PROBLEM', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide2.addText('Kariyer Yolculuğundaki Zorluklar', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const problems = [
    '🎯 Kişilik ve yeteneklerin doğru değerlendirilmemesi',
    '❓ Kariyer hedeflerinin belirsizliği',
    '🔍 İş arama sürecinin karmaşıklığı',
    '🤝 Networking fırsatlarının sınırlılığı',
    '👨‍🏫 Kişiselleştirilmiş rehberlik eksikliği'
];

problems.forEach((problem, index) => {
    slide2.addText(problem, {
        x: 0.8, y: 2.3 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 3: Solution
const slide3 = pres.addSlide();
slide3.background = { color: colors.light };

slide3.addText('ÇÖZÜM', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide3.addText('Trailie: Kapsamlı Kariyer Keşif Platformu', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const solutions = [
    '🤖 AI Destekli Kişilik ve Uzmanlık Analizi',
    '🎯 Kişiselleştirilmiş Kariyer Önerileri',
    '🎮 Simülasyon Tabanlı Rol Deneyimi',
    '🌐 Networking ve Koçluk Hizmetleri',
    '🏢 B2B ve B2C Entegrasyonu'
];

solutions.forEach((solution, index) => {
    slide3.addText(solution, {
        x: 0.8, y: 2.3 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 4: Market Opportunity
const slide4 = pres.addSlide();
slide4.background = { color: colors.light };

slide4.addText('PAZAR FIRSATI', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide4.addText('Türkiye Kariyer Teknolojileri Pazarı', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Market data in two columns
const leftColumn = [
    '👥 84M+ Aktif İnternet Kullanıcısı',
    '💼 54M+ Çalışma Çağı Nüfusu',
    '💰 $500M+ Yıllık İş Arama Pazarı'
];

const rightColumn = [
    '📈 %25 Yıllık Büyüme Oranı',
    '🎯 5M+ Hedef Kitle',
    '🚀 Hızla Büyüyen Pazar'
];

leftColumn.forEach((item, index) => {
    slide4.addText(item, {
        x: 0.8, y: 2.3 + (index * 0.6), w: 4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

rightColumn.forEach((item, index) => {
    slide4.addText(item, {
        x: 5.2, y: 2.3 + (index * 0.6), w: 4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 5: Revenue Model
const slide5 = pres.addSlide();
slide5.background = { color: colors.light };

slide5.addText('GELİR MODELİ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide5.addText('Çoklu Gelir Akışları', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// B2C Revenue
slide5.addText('B2C Gelir Akışları', {
    x: 0.5, y: 2.3, w: 4.2, h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    bold: true,
    color: colors.primary,
    align: 'center'
});

const b2cRevenue = [
    'Freemium Model - Ücretsiz',
    'Premium Abonelik - ₺199/ay',
    'Koçluk Seansları - ₺800/seans',
    'CV Hazırlama - ₺299',
    'Mock Interview - ₺499'
];

b2cRevenue.forEach((item, index) => {
    slide5.addText(item, {
        x: 0.8, y: 2.9 + (index * 0.4), w: 3.6, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        color: colors.text
    });
});

// B2B Revenue
slide5.addText('B2B Gelir Akışları', {
    x: 5, y: 2.3, w: 4.2, h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    bold: true,
    color: colors.primary,
    align: 'center'
});

const b2bRevenue = [
    'Şirket Abonelikleri - ₺5K/ay',
    'Aday Arama - ₺3K/ay',
    'İş İlanı Yayınlama - ₺1K/ilan',
    'Analitik Raporları - ₺2K/ay',
    'Özel Entegrasyonlar - ₺50K/proje'
];

b2bRevenue.forEach((item, index) => {
    slide5.addText(item, {
        x: 5.3, y: 2.9 + (index * 0.4), w: 3.6, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Total Revenue
slide5.addText('Toplam Aylık Gelir Potansiyeli: ₺5.4M+', {
    x: 0.5, y: 5.5, w: 9, h: 0.6,
    fontSize: 20,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.success,
    align: 'center'
});

// Slide 6: Team
const slide6 = pres.addSlide();
slide6.background = { color: colors.light };

slide6.addText('TAKIMIMIZ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide6.addText('Deneyimli ve Tutkulu Ekip', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Team member placeholders
const positions = ['CEO', 'CFO', 'COO', 'Head of Product', 'CTO'];

positions.forEach((position, index) => {
    const x = 0.5 + (index * 1.8);
    
    // Team member card
    slide6.addShape('rect', {
        x: x, y: 2.3, w: 1.6, h: 1.5,
        fill: { color: colors.white },
        line: { color: colors.primary, width: 2 },
        shadow: { type: 'outer', color: '000000', blur: 2, offset: 1, angle: 45 }
    });
    
    // Position title
    slide6.addText(position, {
        x: x, y: 2.4, w: 1.6, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial Black',
        bold: true,
        color: colors.primary,
        align: 'center'
    });
    
    // Profile placeholder
    slide6.addText('👤', {
        x: x, y: 2.8, w: 1.6, h: 0.6,
        fontSize: 32,
        align: 'center',
        valign: 'middle'
    });
    
    // Placeholder text
    slide6.addText('Ad Soyad', {
        x: x, y: 3.5, w: 1.6, h: 0.2,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center',
        bold: true
    });
    
    slide6.addText('LinkedIn', {
        x: x, y: 3.7, w: 1.6, h: 0.2,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.primary,
        align: 'center'
    });
});

// Slide 7: Traction & Metrics
const slide7 = pres.addSlide();
slide7.background = { color: colors.light };

slide7.addText('TRACTION & METRICS', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide7.addText('Platform Performansı', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const metrics = [
    '👥 25,000+ Kullanıcı Kaydı (+150%)',
    '📊 12,000+ Tamamlanan Değerlendirme (+200%)',
    '📄 3,500+ CV Oluşturuldu (+180%)',
    '🎤 1,200+ Mock Interview (+250%)',
    '🏢 150+ Şirket Ortaklığı (+300%)',
    '⭐ %92 Kullanıcı Memnuniyeti (+7%)'
];

metrics.forEach((metric, index) => {
    slide7.addText(metric, {
        x: 0.8, y: 2.3 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 8: Investment Ask
const slide8 = pres.addSlide();
slide8.background = { color: colors.light };

slide8.addText('YATIRIM TALEBİ', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide8.addText('Büyüme için Stratejik Yatırım', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const investmentDetails = [
    '💰 Yatırım Miktarı: $150,000',
    '📈 Hisse Oranı: %10',
    '🏢 Değerleme: $1.5M',
    '🎯 ROI Beklentisi: 5x-10x'
];

investmentDetails.forEach((detail, index) => {
    slide8.addText(detail, {
        x: 0.8, y: 2.3 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 18,
        fontFace: 'Arial',
        bold: true,
        color: colors.text
    });
});

slide8.addText('Kullanım Alanları:', {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
    fontSize: 18,
    fontFace: 'Arial',
    bold: true,
    color: colors.primary,
    align: 'center'
});

const useOfFunds = [
    '• Teknoloji Geliştirme (%40)',
    '• Pazarlama ve Büyüme (%30)',
    '• Ekip Genişletme (%20)',
    '• Operasyonel Giderler (%10)'
];

useOfFunds.forEach((item, index) => {
    slide8.addText(item, {
        x: 0.8, y: 5.1 + (index * 0.4), w: 8.4, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 9: Competitive Advantage
const slide9 = pres.addSlide();
slide9.background = { color: colors.light };

slide9.addText('REKABET AVANTAJI', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide9.addText('Neden Trailie?', {
    x: 0.5, y: 1.5, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const advantages = [
    '🤖 AI Teknolojisi - Gelişmiş yapay zeka ile kişiselleştirilmiş analiz',
    '🔄 B2B + B2C Model - Çift taraflı pazar yaklaşımı',
    '🎮 Simülasyon Odaklı - Pratik deneyim imkanları',
    '🇹🇷 Türkiye Odaklı - Yerel pazar bilgisi ve adaptasyon',
    '📊 Veri Odaklı - Sürekli öğrenen ve gelişen sistem',
    '👥 Uzman Ekip - Deneyimli ve tutkulu yönetim'
];

advantages.forEach((advantage, index) => {
    slide9.addText(advantage, {
        x: 0.8, y: 2.3 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text
    });
});

// Slide 10: Contact & Next Steps
const slide10 = pres.addSlide();
slide10.background = { color: colors.primary };

slide10.addText('İLETİŞİM & SONRAKI ADIMLAR', {
    x: 0.5, y: 0.8, w: 9, h: 0.8,
    fontSize: 40,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center'
});

slide10.addText('Bizimle İletişime Geçin', {
    x: 0.5, y: 1.8, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.white,
    align: 'center'
});

const contactInfo = [
    '📧 Email: info@trailie.com',
    '🌐 Website: www.trailie.com',
    '💼 LinkedIn: linkedin.com/company/trailie',
    '📱 Demo: trailie.com/demo'
];

contactInfo.forEach((contact, index) => {
    slide10.addText(contact, {
        x: 0.8, y: 2.6 + (index * 0.5), w: 8.4, h: 0.4,
        fontSize: 18,
        fontFace: 'Arial',
        color: colors.white
    });
});

slide10.addText('Sonraki Adımlar:', {
    x: 0.5, y: 4.8, w: 9, h: 0.4,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: colors.white,
    align: 'center'
});

const nextSteps = [
    '• Demo Görüşmesi ve Platform Tanıtımı',
    '• Teknik Detaylar ve Roadmap',
    '• Yatırım Süreci ve Due Diligence'
];

nextSteps.forEach((step, index) => {
    slide10.addText(step, {
        x: 0.8, y: 5.3 + (index * 0.4), w: 8.4, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.white
    });
});

// Save the presentation
pres.writeFile({ fileName: 'Trailie_Pitch_Deck_Final.pptx' })
    .then(fileName => {
        console.log(`Final pitch deck created successfully: ${fileName}`);
    })
    .catch(err => {
        console.error('Error creating pitch deck:', err);
    }); 