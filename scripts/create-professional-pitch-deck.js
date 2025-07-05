const PptxGenJS = require('pptxgenjs');

// Create presentation with professional theme
const pres = new PptxGenJS();

// Set presentation properties
pres.author = 'Trailie Team';
pres.company = 'Trailie';
pres.title = 'Trailie - Kariyer Keşif Platformu';
pres.subject = 'Yatırım Sunumu';

// Define professional color scheme
const colors = {
    primary: '1E3A8A',      // Deep blue
    secondary: '059669',    // Emerald green
    accent: 'DC2626',       // Red accent
    dark: '111827',         // Dark gray
    light: 'F9FAFB',        // Light gray
    white: 'FFFFFF',
    text: '374151'
};

// Slide 1: Hero Slide with Visual Impact
const slide1 = pres.addSlide();
slide1.background = { color: colors.primary };

// Main title with gradient effect
slide1.addText('TRAILIE', {
    x: 0.5, y: 1.5, w: 9, h: 2,
    fontSize: 72,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle',
    shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
});

// Subtitle with modern styling
slide1.addText('Kariyer Keşif Platformu', {
    x: 0.5, y: 3.8, w: 9, h: 0.8,
    fontSize: 32,
    fontFace: 'Arial',
    color: colors.light,
    align: 'center',
    italic: true
});

// Tagline with accent color
slide1.addText('"Kariyerinizi Büyütün, Geleceğinizi Şekillendirin"', {
    x: 0.5, y: 4.8, w: 9, h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: colors.secondary,
    align: 'center',
    bold: true
});

slide1.addText('"Grow Your Career, Shape Your Future"', {
    x: 0.5, y: 5.4, w: 9, h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: colors.secondary,
    align: 'center',
    bold: true
});

// Decorative elements
slide1.addShape('rect', {
    x: 0.5, y: 6.2, w: 9, h: 0.1,
    fill: { color: colors.secondary },
    line: { color: colors.secondary }
});

// Slide 2: Problem Statement with Visual Impact
const slide2 = pres.addSlide();
slide2.background = { color: colors.light };

// Header with icon
slide2.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.accent },
    line: { color: colors.accent }
});

slide2.addText('🚨 PROBLEM', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide2.addText('Kariyer Yolculuğundaki Kritik Zorluklar', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Problem cards with icons
const problems = [
    { icon: '🎯', text: 'Kişilik ve yeteneklerin doğru değerlendirilmemesi', desc: 'Geleneksel yöntemler yetersiz' },
    { icon: '❓', text: 'Kariyer hedeflerinin belirsizliği', desc: 'Yön bulma zorluğu' },
    { icon: '🔍', text: 'İş arama sürecinin karmaşıklığı', desc: 'Zaman ve kaynak israfı' },
    { icon: '🤝', text: 'Networking fırsatlarının sınırlılığı', desc: 'Bağlantı kurma zorluğu' },
    { icon: '👨‍🏫', text: 'Kişiselleştirilmiş rehberlik eksikliği', desc: 'Genel öneriler yetersiz' }
];

problems.forEach((problem, index) => {
    const y = 2.5 + (index * 0.8);
    
    // Problem card background
    slide2.addShape('rect', {
        x: 0.5, y: y, w: 9, h: 0.7,
        fill: { color: colors.white },
        line: { color: colors.primary, width: 2 },
        shadow: { type: 'outer', color: '000000', blur: 2, offset: 1, angle: 45 }
    });
    
    // Icon
    slide2.addText(problem.icon, {
        x: 0.8, y: y + 0.1, w: 0.5, h: 0.5,
        fontSize: 24,
        align: 'center',
        valign: 'middle'
    });
    
    // Problem text
    slide2.addText(problem.text, {
        x: 1.5, y: y + 0.1, w: 6, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark
    });
    
    // Description
    slide2.addText(problem.desc, {
        x: 1.5, y: y + 0.4, w: 6, h: 0.2,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.text,
        italic: true
    });
});

// Slide 3: Solution with Visual Impact
const slide3 = pres.addSlide();
slide3.background = { color: colors.light };

// Header
slide3.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.secondary },
    line: { color: colors.secondary }
});

slide3.addText('💡 ÇÖZÜM', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide3.addText('Trailie: Kapsamlı Kariyer Keşif Platformu', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Solution features with modern design
const solutions = [
    { icon: '🤖', title: 'AI Destekli Analiz', desc: 'Kişilik ve uzmanlık değerlendirmesi' },
    { icon: '🎯', title: 'Kişiselleştirilmiş Öneriler', desc: 'Veri odaklı kariyer yönlendirmesi' },
    { icon: '🎮', title: 'Simülasyon Deneyimi', desc: 'Rol tabanlı pratik imkanları' },
    { icon: '🌐', title: 'Networking Platformu', desc: 'Profesyonel bağlantı kurma' },
    { icon: '🏢', title: 'B2B Entegrasyonu', desc: 'Şirket-aday eşleştirme' }
];

solutions.forEach((solution, index) => {
    const x = index < 3 ? 0.5 + (index * 3) : 0.5 + ((index - 3) * 4.5);
    const y = index < 3 ? 2.5 : 4.5;
    
    // Solution card
    slide3.addShape('rect', {
        x: x, y: y, w: 2.8, h: 1.5,
        fill: { color: colors.white },
        line: { color: colors.secondary, width: 2 },
        shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
    });
    
    // Icon
    slide3.addText(solution.icon, {
        x: x + 0.2, y: y + 0.2, w: 0.8, h: 0.5,
        fontSize: 32,
        align: 'center',
        valign: 'middle'
    });
    
    // Title
    slide3.addText(solution.title, {
        x: x + 0.2, y: y + 0.7, w: 2.4, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark,
        align: 'center'
    });
    
    // Description
    slide3.addText(solution.desc, {
        x: x + 0.2, y: y + 1.0, w: 2.4, h: 0.4,
        fontSize: 11,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center'
    });
});

// Slide 4: Market Opportunity with Data Visualization
const slide4 = pres.addSlide();
slide4.background = { color: colors.light };

// Header
slide4.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.primary },
    line: { color: colors.primary }
});

slide4.addText('📊 PAZAR FIRSATI', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide4.addText('Türkiye Kariyer Teknolojileri Pazarı', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Market data with visual elements
const marketData = [
    { metric: '84M+', label: 'Aktif İnternet Kullanıcısı', icon: '👥', color: colors.primary },
    { metric: '54M+', label: 'Çalışma Çağı Nüfusu', icon: '💼', color: colors.secondary },
    { metric: '$500M+', label: 'Yıllık İş Arama Pazarı', icon: '💰', color: colors.accent },
    { metric: '%25', label: 'Yıllık Büyüme Oranı', icon: '📈', color: colors.secondary },
    { metric: '5M+', label: 'Hedef Kitle', icon: '🎯', color: colors.primary }
];

marketData.forEach((data, index) => {
    const x = index < 3 ? 0.5 + (index * 3) : 0.5 + ((index - 3) * 4.5);
    const y = index < 3 ? 2.5 : 4.5;
    
    // Data card
    slide4.addShape('rect', {
        x: x, y: y, w: 2.8, h: 1.5,
        fill: { color: data.color },
        line: { color: data.color },
        shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
    });
    
    // Icon
    slide4.addText(data.icon, {
        x: x + 0.2, y: y + 0.2, w: 0.8, h: 0.5,
        fontSize: 32,
        align: 'center',
        valign: 'middle',
        color: colors.white
    });
    
    // Metric
    slide4.addText(data.metric, {
        x: x + 0.2, y: y + 0.7, w: 2.4, h: 0.4,
        fontSize: 24,
        fontFace: 'Arial Black',
        bold: true,
        color: colors.white,
        align: 'center'
    });
    
    // Label
    slide4.addText(data.label, {
        x: x + 0.2, y: y + 1.1, w: 2.4, h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        color: colors.white,
        align: 'center'
    });
});

// Slide 5: Revenue Model with Detailed Breakdown
const slide5 = pres.addSlide();
slide5.background = { color: colors.light };

// Header
slide5.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.secondary },
    line: { color: colors.secondary }
});

slide5.addText('💎 GELİR MODELİ', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide5.addText('Çoklu Gelir Akışları', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// B2C Revenue Streams
slide5.addText('B2C Gelir Akışları', {
    x: 0.5, y: 2.5, w: 4.2, h: 0.5,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: colors.primary,
    align: 'center'
});

const b2cRevenue = [
    { service: 'Freemium Model', price: 'Ücretsiz', users: '50K+', revenue: '0' },
    { service: 'Premium Abonelik', price: '₺199/ay', users: '5K+', revenue: '₺1M/ay' },
    { service: 'Koçluk Seansları', price: '₺800/seans', users: '500+', revenue: '₺400K/ay' },
    { service: 'CV Hazırlama', price: '₺299', users: '2K+', revenue: '₺600K/ay' },
    { service: 'Mock Interview', price: '₺499', users: '1K+', revenue: '₺500K/ay' }
];

b2cRevenue.forEach((item, index) => {
    const y = 3.1 + (index * 0.6);
    
    // Service card
    slide5.addShape('rect', {
        x: 0.5, y: y, w: 4.2, h: 0.5,
        fill: { color: colors.white },
        line: { color: colors.primary, width: 1 },
        shadow: { type: 'outer', color: '000000', blur: 1, offset: 1, angle: 45 }
    });
    
    // Service name
    slide5.addText(item.service, {
        x: 0.7, y: y + 0.05, w: 1.8, h: 0.4,
        fontSize: 12,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark
    });
    
    // Price
    slide5.addText(item.price, {
        x: 2.6, y: y + 0.05, w: 0.8, h: 0.4,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.secondary,
        bold: true
    });
    
    // Users
    slide5.addText(item.users, {
        x: 3.5, y: y + 0.05, w: 0.6, h: 0.4,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.text
    });
    
    // Revenue
    slide5.addText(item.revenue, {
        x: 4.2, y: y + 0.05, w: 0.4, h: 0.4,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.accent,
        bold: true
    });
});

// B2B Revenue Streams
slide5.addText('B2B Gelir Akışları', {
    x: 5, y: 2.5, w: 4.2, h: 0.5,
    fontSize: 20,
    fontFace: 'Arial',
    bold: true,
    color: colors.primary,
    align: 'center'
});

const b2bRevenue = [
    { service: 'Şirket Abonelikleri', price: '₺5K/ay', clients: '100+', revenue: '₺500K/ay' },
    { service: 'Aday Arama', price: '₺3K/ay', clients: '200+', revenue: '₺600K/ay' },
    { service: 'İş İlanı Yayınlama', price: '₺1K/ilan', clients: '500+', revenue: '₺500K/ay' },
    { service: 'Analitik Raporları', price: '₺2K/ay', clients: '150+', revenue: '₺300K/ay' },
    { service: 'Özel Entegrasyonlar', price: '₺50K/proje', clients: '20+', revenue: '₺1M/ay' }
];

b2bRevenue.forEach((item, index) => {
    const y = 3.1 + (index * 0.6);
    
    // Service card
    slide5.addShape('rect', {
        x: 5, y: y, w: 4.2, h: 0.5,
        fill: { color: colors.white },
        line: { color: colors.primary, width: 1 },
        shadow: { type: 'outer', color: '000000', blur: 1, offset: 1, angle: 45 }
    });
    
    // Service name
    slide5.addText(item.service, {
        x: 5.2, y: y + 0.05, w: 1.8, h: 0.4,
        fontSize: 12,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark
    });
    
    // Price
    slide5.addText(item.price, {
        x: 7.1, y: y + 0.05, w: 0.8, h: 0.4,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.secondary,
        bold: true
    });
    
    // Clients
    slide5.addText(item.clients, {
        x: 8, y: y + 0.05, w: 0.6, h: 0.4,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.text
    });
    
    // Revenue
    slide5.addText(item.revenue, {
        x: 8.7, y: y + 0.05, w: 0.4, h: 0.4,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.accent,
        bold: true
    });
});

// Total Revenue
slide5.addShape('rect', {
    x: 0.5, y: 6.2, w: 9, h: 0.8,
    fill: { color: colors.accent },
    line: { color: colors.accent }
});

slide5.addText('Toplam Aylık Gelir: ₺5.4M+', {
    x: 0.5, y: 6.2, w: 9, h: 0.8,
    fontSize: 24,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

// Slide 6: Team (Professional Layout)
const slide6 = pres.addSlide();
slide6.background = { color: colors.light };

// Header
slide6.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.primary },
    line: { color: colors.primary }
});

slide6.addText('👥 TAKIMIMIZ', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide6.addText('Deneyimli ve Tutkulu Ekip', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Team member placeholders with professional design
const positions = ['CEO', 'CFO', 'COO', 'Head of Product', 'CTO'];
const positionsY = [2.5, 3.8, 5.1, 6.4, 7.7];

positions.forEach((position, index) => {
    const x = 0.5 + (index * 1.8);
    
    // Team member card
    slide6.addShape('rect', {
        x: x, y: positionsY[index], w: 1.6, h: 1.8,
        fill: { color: colors.white },
        line: { color: colors.primary, width: 2 },
        shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
    });
    
    // Position title
    slide6.addText(position, {
        x: x, y: positionsY[index] + 0.1, w: 1.6, h: 0.4,
        fontSize: 16,
        fontFace: 'Arial Black',
        bold: true,
        color: colors.primary,
        align: 'center'
    });
    
    // Profile placeholder
    slide6.addShape('circle', {
        x: x + 0.3, y: positionsY[index] + 0.5, w: 1, h: 1,
        fill: { color: colors.light },
        line: { color: colors.secondary, width: 2 }
    });
    
    slide6.addText('👤', {
        x: x + 0.3, y: positionsY[index] + 0.5, w: 1, h: 1,
        fontSize: 36,
        align: 'center',
        valign: 'middle'
    });
    
    // Placeholder text
    slide6.addText('Ad Soyad', {
        x: x, y: positionsY[index] + 1.6, w: 1.6, h: 0.2,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center',
        bold: true
    });
    
    slide6.addText('LinkedIn', {
        x: x, y: positionsY[index] + 1.8, w: 1.6, h: 0.2,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.secondary,
        align: 'center'
    });
});

// Slide 7: Traction & Metrics with Visual Charts
const slide7 = pres.addSlide();
slide7.background = { color: colors.light };

// Header
slide7.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.secondary },
    line: { color: colors.secondary }
});

slide7.addText('📈 TRACTION & METRICS', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide7.addText('Platform Performansı ve Büyüme', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Key metrics with visual elements
const metrics = [
    { metric: '25,000+', label: 'Kullanıcı Kaydı', icon: '👥', growth: '+150%', color: colors.primary },
    { metric: '12,000+', label: 'Tamamlanan Değerlendirme', icon: '📊', growth: '+200%', color: colors.secondary },
    { metric: '3,500+', label: 'CV Oluşturuldu', icon: '📄', growth: '+180%', color: colors.accent },
    { metric: '1,200+', label: 'Mock Interview', icon: '🎤', growth: '+250%', color: colors.primary },
    { metric: '150+', label: 'Şirket Ortaklığı', icon: '🏢', growth: '+300%', color: colors.secondary },
    { metric: '%92', label: 'Kullanıcı Memnuniyeti', icon: '⭐', growth: '+7%', color: colors.accent }
];

metrics.forEach((metric, index) => {
    const x = index < 3 ? 0.5 + (index * 3) : 0.5 + ((index - 3) * 3);
    const y = index < 3 ? 2.5 : 4.5;
    
    // Metric card
    slide7.addShape('rect', {
        x: x, y: y, w: 2.8, h: 1.8,
        fill: { color: metric.color },
        line: { color: metric.color },
        shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
    });
    
    // Icon
    slide7.addText(metric.icon, {
        x: x + 0.2, y: y + 0.2, w: 0.8, h: 0.5,
        fontSize: 32,
        align: 'center',
        valign: 'middle',
        color: colors.white
    });
    
    // Metric value
    slide7.addText(metric.metric, {
        x: x + 0.2, y: y + 0.7, w: 2.4, h: 0.4,
        fontSize: 24,
        fontFace: 'Arial Black',
        bold: true,
        color: colors.white,
        align: 'center'
    });
    
    // Label
    slide7.addText(metric.label, {
        x: x + 0.2, y: y + 1.1, w: 2.4, h: 0.3,
        fontSize: 12,
        fontFace: 'Arial',
        color: colors.white,
        align: 'center'
    });
    
    // Growth
    slide7.addText(metric.growth, {
        x: x + 0.2, y: y + 1.4, w: 2.4, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: colors.white,
        align: 'center'
    });
});

// Slide 8: Investment Ask with Professional Presentation
const slide8 = pres.addSlide();
slide8.background = { color: colors.light };

// Header
slide8.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.accent },
    line: { color: colors.accent }
});

slide8.addText('💰 YATIRIM TALEBİ', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide8.addText('Büyüme için Stratejik Yatırım', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Investment details with visual elements
const investmentDetails = [
    { title: 'Yatırım Miktarı', value: '$150,000', icon: '💵', color: colors.primary },
    { title: 'Hisse Oranı', value: '%10', icon: '📈', color: colors.secondary },
    { title: 'Değerleme', value: '$1.5M', icon: '🏢', color: colors.accent },
    { title: 'ROI Beklentisi', value: '5x-10x', icon: '🎯', color: colors.primary }
];

investmentDetails.forEach((detail, index) => {
    const x = index < 2 ? 0.5 + (index * 4.5) : 0.5 + ((index - 2) * 4.5);
    const y = index < 2 ? 2.5 : 4.5;
    
    // Detail card
    slide8.addShape('rect', {
        x: x, y: y, w: 4.2, h: 2,
        fill: { color: detail.color },
        line: { color: detail.color },
        shadow: { type: 'outer', color: '000000', blur: 3, offset: 2, angle: 45 }
    });
    
    // Icon
    slide8.addText(detail.icon, {
        x: x + 0.5, y: y + 0.3, w: 1, h: 0.8,
        fontSize: 48,
        align: 'center',
        valign: 'middle',
        color: colors.white
    });
    
    // Title
    slide8.addText(detail.title, {
        x: x + 0.2, y: y + 1.2, w: 3.8, h: 0.3,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: colors.white,
        align: 'center'
    });
    
    // Value
    slide8.addText(detail.value, {
        x: x + 0.2, y: y + 1.5, w: 3.8, h: 0.4,
        fontSize: 28,
        fontFace: 'Arial Black',
        bold: true,
        color: colors.white,
        align: 'center'
    });
});

// Use of funds
slide8.addText('Kullanım Alanları:', {
    x: 0.5, y: 6.8, w: 9, h: 0.4,
    fontSize: 18,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
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
        x: 0.5, y: 7.3 + (index * 0.3), w: 9, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center'
    });
});

// Slide 9: Competitive Advantage
const slide9 = pres.addSlide();
slide9.background = { color: colors.light };

// Header
slide9.addShape('rect', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fill: { color: colors.primary },
    line: { color: colors.primary }
});

slide9.addText('🏆 REKABET AVANTAJI', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.white,
    align: 'center',
    valign: 'middle'
});

slide9.addText('Neden Trailie?', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Competitive advantages
const advantages = [
    { title: 'AI Teknolojisi', desc: 'Gelişmiş yapay zeka ile kişiselleştirilmiş analiz', icon: '🤖' },
    { title: 'B2B + B2C Model', desc: 'Çift taraflı pazar yaklaşımı', icon: '🔄' },
    { title: 'Simülasyon Odaklı', desc: 'Pratik deneyim imkanları', icon: '🎮' },
    { title: 'Türkiye Odaklı', desc: 'Yerel pazar bilgisi ve adaptasyon', icon: '🇹🇷' },
    { title: 'Veri Odaklı', desc: 'Sürekli öğrenen ve gelişen sistem', icon: '📊' },
    { title: 'Uzman Ekip', desc: 'Deneyimli ve tutkulu yönetim', icon: '👥' }
];

advantages.forEach((advantage, index) => {
    const x = index < 3 ? 0.5 + (index * 3) : 0.5 + ((index - 3) * 3);
    const y = index < 3 ? 2.5 : 4.5;
    
    // Advantage card
    slide9.addShape('rect', {
        x: x, y: y, w: 2.8, h: 1.8,
        fill: { color: colors.white },
        line: { color: colors.secondary, width: 2 },
        shadow: { type: 'outer', color: '000000', blur: 2, offset: 1, angle: 45 }
    });
    
    // Icon
    slide9.addText(advantage.icon, {
        x: x + 0.2, y: y + 0.2, w: 0.8, h: 0.5,
        fontSize: 32,
        align: 'center',
        valign: 'middle'
    });
    
    // Title
    slide9.addText(advantage.title, {
        x: x + 0.2, y: y + 0.7, w: 2.4, h: 0.3,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark,
        align: 'center'
    });
    
    // Description
    slide9.addText(advantage.desc, {
        x: x + 0.2, y: y + 1.0, w: 2.4, h: 0.7,
        fontSize: 11,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center'
    });
});

// Slide 10: Contact & Next Steps
const slide10 = pres.addSlide();
slide10.background = { color: colors.primary };

// Main content area
slide10.addShape('rect', {
    x: 0.5, y: 0.5, w: 9, h: 6.5,
    fill: { color: colors.white },
    line: { color: colors.white },
    shadow: { type: 'outer', color: '000000', blur: 5, offset: 3, angle: 45 }
});

slide10.addText('İLETİŞİM & SONRAKI ADIMLAR', {
    x: 0.5, y: 0.8, w: 9, h: 0.8,
    fontSize: 36,
    fontFace: 'Arial Black',
    bold: true,
    color: colors.primary,
    align: 'center'
});

slide10.addText('Bizimle İletişime Geçin', {
    x: 0.5, y: 1.8, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

// Contact information with icons
const contactInfo = [
    { icon: '📧', label: 'Email', value: 'info@trailie.com' },
    { icon: '🌐', label: 'Website', value: 'www.trailie.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/company/trailie' },
    { icon: '📱', label: 'Demo', value: 'trailie.com/demo' }
];

contactInfo.forEach((contact, index) => {
    const y = 2.5 + (index * 0.8);
    
    // Contact card
    slide10.addShape('rect', {
        x: 0.8, y: y, w: 8.4, h: 0.6,
        fill: { color: colors.light },
        line: { color: colors.secondary, width: 1 },
        shadow: { type: 'outer', color: '000000', blur: 1, offset: 1, angle: 45 }
    });
    
    // Icon
    slide10.addText(contact.icon, {
        x: 1, y: y + 0.1, w: 0.4, h: 0.4,
        fontSize: 20,
        align: 'center',
        valign: 'middle'
    });
    
    // Label
    slide10.addText(contact.label, {
        x: 1.6, y: y + 0.1, w: 1.5, h: 0.4,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: colors.dark
    });
    
    // Value
    slide10.addText(contact.value, {
        x: 3.2, y: y + 0.1, w: 5.8, h: 0.4,
        fontSize: 14,
        fontFace: 'Arial',
        color: colors.secondary,
        bold: true
    });
});

// Next steps
slide10.addText('Sonraki Adımlar:', {
    x: 0.5, y: 5.8, w: 9, h: 0.4,
    fontSize: 18,
    fontFace: 'Arial',
    bold: true,
    color: colors.dark,
    align: 'center'
});

const nextSteps = [
    '• Demo Görüşmesi ve Platform Tanıtımı',
    '• Teknik Detaylar ve Roadmap',
    '• Yatırım Süreci ve Due Diligence'
];

nextSteps.forEach((step, index) => {
    slide10.addText(step, {
        x: 0.5, y: 6.3 + (index * 0.3), w: 9, h: 0.25,
        fontSize: 14,
        fontFace: 'Arial',
        color: colors.text,
        align: 'center'
    });
});

// Save the presentation
pres.writeFile({ fileName: 'Trailie_Professional_Pitch_Deck.pptx' })
    .then(fileName => {
        console.log(`Professional pitch deck created successfully: ${fileName}`);
    })
    .catch(err => {
        console.error('Error creating pitch deck:', err);
    }); 