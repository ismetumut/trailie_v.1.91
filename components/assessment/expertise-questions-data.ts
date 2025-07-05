// Uzmanlık Envanteri Soru Tipleri ve Mapping

export type ExpertiseOption = {
  text: { tr: string; en: string };
  roles: string[]; // Bu şık hangi rollere puan kazandırıyor
};

export type ExpertiseQuestion = {
  id: number;
  module: string; // "Eğitim Altyapısı", "Kognitif Tarz" vs.
  text: { tr: string; en: string };
  options: ExpertiseOption[];
};

export const EXPERTISE_QUESTIONS: ExpertiseQuestion[] = [
  // Modül 1: Eğitim Altyapısı
  {
    id: 1,
    module: "Eğitim Altyapısı",
    text: { tr: "Aşağıdaki derslerden hangisinde daha kolay başarı sağlarsınız?", en: "Which of the following subjects do you find easier to succeed in?" },
    options: [
      { text: { tr: "Matematik / Fizik", en: "Math / Physics" }, roles: ["Data Analyst", "Engineer"] },
      { text: { tr: "Edebiyat / Psikoloji", en: "Literature / Psychology" }, roles: ["Clinical Psychologist", "Career Counselor"] },
      { text: { tr: "Kimya / Biyoloji", en: "Chemistry / Biology" }, roles: ["Lab Technician", "R&D Specialist"] },
      { text: { tr: "Ekonomi / İstatistik", en: "Economics / Statistics" }, roles: ["Financial Analyst", "Business Analyst"] }
    ]
  },
  {
    id: 2,
    module: "Eğitim Altyapısı",
    text: { tr: "Mezun olduğunuz bölüm sizi en çok hangi alana hazırladı?", en: "Which field did your major prepare you for the most?" },
    options: [
      { text: { tr: "Araştırma ve geliştirme", en: "Research and development" }, roles: ["R&D Specialist", "Lab Technician"] },
      { text: { tr: "İnsan ilişkileri ve danışmanlık", en: "Human relations and consulting" }, roles: ["Career Counselor", "HR Business Partner"] },
      { text: { tr: "Finansal analiz ve muhasebe", en: "Financial analysis and accounting" }, roles: ["Financial Analyst", "Accountant"] },
      { text: { tr: "Hukuki değerlendirme ve karar verme", en: "Legal assessment and decision making" }, roles: ["Legal Advisor", "Compliance Officer"] }
    ]
  },
  {
    id: 3,
    module: "Eğitim Altyapısı",
    text: { tr: "Hangi ders tarzı size daha çok hitap eder?", en: "Which type of course appeals to you most?" },
    options: [
      { text: { tr: "Sayısal ağırlıklı dersler", en: "Numerical courses" }, roles: ["Data Analyst", "Engineer"] },
      { text: { tr: "Sözlü tartışmalı dersler", en: "Verbal/discussion-based courses" }, roles: ["Sales Executive", "Recruiter"] },
      { text: { tr: "Uygulamalı / Laboratuvar çalışmaları", en: "Practical/lab work" }, roles: ["Lab Technician", "QA Tester"] },
      { text: { tr: "Yaratıcılık gerektiren projeler", en: "Creative projects" }, roles: ["UI Designer", "Content Creator"] }
    ]
  },
  {
    id: 4,
    module: "Eğitim Altyapısı",
    text: { tr: "Ders çalışırken en çok ne motive eder?", en: "What motivates you most while studying?" },
    options: [
      { text: { tr: "Net ve çözülmesi gereken problemler", en: "Clear problems to solve" }, roles: ["Engineer", "Data Analyst"] },
      { text: { tr: "İnsan psikolojisini anlamak", en: "Understanding human psychology" }, roles: ["Clinical Psychologist", "HR Specialist"] },
      { text: { tr: "Gerçek hayattaki uygulamalar", en: "Real-life applications" }, roles: ["Product Manager", "QA Tester"] },
      { text: { tr: "Takım projeleri ve iş birliği", en: "Team projects and collaboration" }, roles: ["Scrum Master", "Sales Manager"] }
    ]
  },
  {
    id: 5,
    module: "Eğitim Altyapısı",
    text: { tr: "Şu an bir yüksek lisans programına katılacak olsanız hangi alanı seçerdiniz?", en: "If you were to join a master's program now, which field would you choose?" },
    options: [
      { text: { tr: "Veri bilimi", en: "Data science" }, roles: ["Data Analyst", "Data Engineer"] },
      { text: { tr: "Klinik psikoloji", en: "Clinical psychology" }, roles: ["Clinical Psychologist", "Occupational Therapist"] },
      { text: { tr: "Dijital pazarlama", en: "Digital marketing" }, roles: ["Marketing Specialist", "Content Creator"] },
      { text: { tr: "Yenilenebilir enerji sistemleri", en: "Renewable energy systems" }, roles: ["Process Engineer", "Environmental Scientist"] }
    ]
  },
  {
    id: 6,
    module: "Eğitim Altyapısı",
    text: { tr: "Mezun olduğunuz bölüm dışında hangi alanla ilgileniyorsunuz?", en: "Which field are you interested in besides your major?" },
    options: [
      { text: { tr: "İş geliştirme", en: "Business development" }, roles: ["Business Development Manager", "Product Owner"] },
      { text: { tr: "Eğitim teknolojileri", en: "Educational technologies" }, roles: ["Learning & Development Specialist", "UX Researcher"] },
      { text: { tr: "İnovasyon / Ar-Ge", en: "Innovation / R&D" }, roles: ["R&D Specialist", "Lab Technician"] },
      { text: { tr: "Hukuk veya sosyal adalet", en: "Law or social justice" }, roles: ["Legal Advisor", "Social Worker"] }
    ]
  },
  // Modül 2: Kognitif Tarz
  {
    id: 7,
    module: "Kognitif Tarz",
    text: { tr: "Bir problemi çözmeniz gerektiğinde ilk olarak ne yaparsınız?", en: "What do you do first when you need to solve a problem?" },
    options: [
      { text: { tr: "Sayılar ve verilerle düşünürüm", en: "I think with numbers and data" }, roles: ["Data Analyst", "Financial Analyst"] },
      { text: { tr: "Anlatmaya çalışırım veya metinlerle çözüme giderim", en: "I try to explain or solve with texts" }, roles: ["Sales Executive", "Content Strategist"] },
      { text: { tr: "Gözümde canlandırır, çizerek çözerim", en: "I visualize and solve by drawing" }, roles: ["UI Designer", "Graphic Designer"] }
    ]
  },
  // Modül 2: Kognitif Tarz (devam)
  {
    id: 8,
    module: "Kognitif Tarz",
    text: { tr: "Yeni bir bilgiyi öğrenirken daha kolay aklınızda kalmasını sağlayan şey nedir?", en: "What helps you remember new information more easily?" },
    options: [
      { text: { tr: "Grafikler, diyagramlar", en: "Charts, diagrams" }, roles: ["UI Designer", "Graphic Designer"] },
      { text: { tr: "Okuduğum metinler ve anlatım", en: "Texts and explanations" }, roles: ["Content Strategist", "Recruiter"] },
      { text: { tr: "Sayısal örnekler ve hesaplamalar", en: "Numerical examples and calculations" }, roles: ["Data Analyst", "Financial Analyst"] }
    ]
  },
  {
    id: 9,
    module: "Kognitif Tarz",
    text: { tr: "Bir iş projesinde en çok hangi tür görevler sizi motive eder?", en: "Which type of tasks motivate you most in a work project?" },
    options: [
      { text: { tr: "Rapor yazma, iletişim kurma, sunum hazırlama", en: "Writing reports, communicating, preparing presentations" }, roles: ["Sales Executive", "Brand Manager"] },
      { text: { tr: "Grafik tasarımı, görsel analiz, düzenleme", en: "Graphic design, visual analysis, editing" }, roles: ["UI Designer", "Graphic Designer"] },
      { text: { tr: "Veri analizi, bütçeleme, tablo inceleme", en: "Data analysis, budgeting, reviewing tables" }, roles: ["Data Analyst", "Business Analyst"] }
    ]
  },
  {
    id: 10,
    module: "Kognitif Tarz",
    text: { tr: "Hangisi sizi daha çok tanımlar?", en: "Which describes you best?" },
    options: [
      { text: { tr: "Görsellerle hafızam daha kuvvetlidir", en: "I have a stronger memory with visuals" }, roles: ["UI Designer", "Motion Designer"] },
      { text: { tr: "Kelimelerle düşünürüm", en: "I think with words" }, roles: ["Content Creator", "Recruiter"] },
      { text: { tr: "Matematiksel formüller ve sayılar ilgimi çeker", en: "I am interested in mathematical formulas and numbers" }, roles: ["Data Analyst", "Engineer"] }
    ]
  },
  {
    id: 11,
    module: "Kognitif Tarz",
    text: { tr: "Bir konuyu arkadaşına anlatman istense nasıl bir yol izlersin?", en: "How would you explain a topic to a friend?" },
    options: [
      { text: { tr: "Grafik veya tablo çizerim", en: "I draw a chart or table" }, roles: ["UI Designer", "Graphic Designer"] },
      { text: { tr: "Örneklerle açıklayarak anlatırım", en: "I explain with examples" }, roles: ["Content Strategist", "Sales Executive"] },
      { text: { tr: "Rakamlarla açıklamayı tercih ederim", en: "I prefer to explain with numbers" }, roles: ["Data Analyst", "Financial Analyst"] }
    ]
  },
  // Modül 3: İlgi Alanları
  {
    id: 12,
    module: "İlgi Alanları",
    text: { tr: "Aşağıdaki konulardan hangileri seni daha çok heyecanlandırıyor?", en: "Which of the following topics excites you the most?" },
    options: [
      { text: { tr: "İnsan davranışlarını anlamak ve çözümlemek", en: "Understanding and analyzing human behavior" }, roles: ["Clinical Psychologist", "Recruiter"] },
      { text: { tr: "Yeni teknolojilerin geliştirilmesi", en: "Development of new technologies" }, roles: ["Backend Developer", "DevOps Engineer"] },
      { text: { tr: "Şirketlerin daha kârlı hale gelmesi", en: "Making companies more profitable" }, roles: ["Business Analyst", "Sales Executive"] },
      { text: { tr: "Toplumdaki yapıları incelemek", en: "Examining social structures" }, roles: ["Sociologist", "Organizational Development Analyst"] }
    ]
  },
  // Modül 3: İlgi Alanları (devam)
  {
    id: 13,
    module: "İlgi Alanları",
    text: { tr: "Boş zamanlarında hangi tür içeriklere yönelirsin?", en: "What type of content do you prefer in your free time?" },
    options: [
      { text: { tr: "Bilimsel makale ve deney sonuçları", en: "Scientific articles and experiment results" }, roles: ["R&D Specialist", "Lab Technician"] },
      { text: { tr: "Psikoloji, kişisel gelişim ya da terapi içerikleri", en: "Psychology, personal development or therapy content" }, roles: ["Clinical Psychologist", "Career Counselor"] },
      { text: { tr: "İş dünyası, ekonomi, girişimcilik üzerine içerikler", en: "Business, economy, entrepreneurship content" }, roles: ["Business Analyst", "Marketing Specialist"] },
      { text: { tr: "Kültür, sanat ve iletişim üzerine içerikler", en: "Culture, art and communication content" }, roles: ["Content Creator", "Brand Manager"] }
    ]
  },
  {
    id: 14,
    module: "İlgi Alanları",
    text: { tr: "Aşağıdaki etkinliklerden birine katılma fırsatın olsa hangisini seçersin?", en: "If you could attend one of the following events, which would you choose?" },
    options: [
      { text: { tr: "Bir yapay zekâ konferansı", en: "An artificial intelligence conference" }, roles: ["Backend Developer", "Data Engineer"] },
      { text: { tr: "Bir liderlik ve iş geliştirme kampı", en: "A leadership and business development camp" }, roles: ["Business Development Manager", "Product Owner"] },
      { text: { tr: "Bir sosyal inovasyon atölyesi", en: "A social innovation workshop" }, roles: ["Social Worker", "Organizational Development Analyst"] },
      { text: { tr: "Klinik vakaların tartışıldığı bir tıbbi seminer", en: "A medical seminar discussing clinical cases" }, roles: ["Clinical Psychologist", "Occupational Therapist"] }
    ]
  },
  {
    id: 15,
    module: "İlgi Alanları",
    text: { tr: "Aşağıdakilerden hangisine katkı sağlamak seni en çok tatmin eder?", en: "Which of the following would satisfy you the most to contribute to?" },
    options: [
      { text: { tr: "İnsanların yaşam kalitesini artıracak çözümler üretmek", en: "Producing solutions to improve people's quality of life" }, roles: ["Occupational Therapist", "Career Counselor"] },
      { text: { tr: "Teknolojik bir ürünün geliştirilmesi ve yaygınlaştırılması", en: "Developing and popularizing a technological product" }, roles: ["Product Manager", "DevOps Engineer"] },
      { text: { tr: "Şirketlerin operasyonel verimliliğini artırmak", en: "Increasing operational efficiency of companies" }, roles: ["Process Engineer", "Business Analyst"] },
      { text: { tr: "Toplumda davranışsal farkındalık yaratmak", en: "Creating behavioral awareness in society" }, roles: ["Sociologist", "Organizational Development Analyst"] }
    ]
  },
  {
    id: 16,
    module: "İlgi Alanları",
    text: { tr: "Bir proje geliştirecek olsan hangi temayı seçersin?", en: "If you were to develop a project, which theme would you choose?" },
    options: [
      { text: { tr: "Otomasyon sistemleri ve verimlilik", en: "Automation systems and efficiency" }, roles: ["Process Engineer", "QA Tester"] },
      { text: { tr: "Gençlerin ruh sağlığını destekleyecek bir platform", en: "A platform to support youth mental health" }, roles: ["Clinical Psychologist", "Social Worker"] },
      { text: { tr: "Dijital pazarlama kampanyalarının başarısını ölçen bir yazılım", en: "A software to measure digital marketing campaign success" }, roles: ["Marketing Specialist", "Data Analyst"] },
      { text: { tr: "Alternatif enerji kaynaklarının yaygınlaştırılması", en: "Dissemination of alternative energy sources" }, roles: ["Environmental Scientist", "Process Engineer"] }
    ]
  },
  {
    id: 17,
    module: "İlgi Alanları",
    text: { tr: "Aşağıdaki sektörlerden hangisinde çalışmak seni daha çok motive eder?", en: "Which of the following sectors would motivate you the most to work in?" },
    options: [
      { text: { tr: "Finans & Danışmanlık", en: "Finance & Consulting" }, roles: ["Financial Analyst", "Business Analyst"] },
      { text: { tr: "Sağlık & Klinik Psikoloji", en: "Health & Clinical Psychology" }, roles: ["Clinical Psychologist", "Occupational Therapist"] },
      { text: { tr: "Bilişim & Teknoloji", en: "IT & Technology" }, roles: ["Backend Developer", "DevOps Engineer"] },
      { text: { tr: "Sivil Toplum & Sosyal Girişimcilik", en: "NGO & Social Entrepreneurship" }, roles: ["Social Worker", "Organizational Development Analyst"] }
    ]
  },
  // Modül 4: İş Yapma Tarzı
  {
    id: 18,
    module: "İş Yapma Tarzı",
    text: { tr: "Bir projeye başladığınızda nasıl bir yaklaşım sergilersiniz?", en: "How do you approach a new project?" },
    options: [
      { text: { tr: "Adım adım plan yapar, her detayı önceden düşünürüm.", en: "I plan step by step and think of every detail in advance." }, roles: ["Project Coordinator", "QA Tester"] },
      { text: { tr: "Hızla işe koyulurum, yol üzerinde eksikleri tamamlarım.", en: "I start quickly and complete missing parts on the way." }, roles: ["Field Sales Representative", "Product Manager"] },
      { text: { tr: "Ekip üyeleriyle birlikte süreci şekillendirmeyi tercih ederim.", en: "I prefer to shape the process with team members." }, roles: ["Scrum Master", "Sales Manager"] },
      { text: { tr: "Öncelikle riskleri değerlendirir, sonra hareket ederim.", en: "I first assess risks, then act." }, roles: ["Compliance Officer", "Business Analyst"] }
    ]
  },
  // Modül 4: İş Yapma Tarzı (devam)
  {
    id: 19,
    module: "İş Yapma Tarzı",
    text: { tr: "Ekip çalışmalarında genellikle nasıl bir rol alırsınız?", en: "What role do you usually take in team work?" },
    options: [
      { text: { tr: "Liderlik eder, süreci yönlendiririm.", en: "I lead and direct the process." }, roles: ["Scrum Master", "Sales Manager"] },
      { text: { tr: "Desteğe ihtiyaç duyulan yerde sorumluluk alırım.", en: "I take responsibility where support is needed." }, roles: ["Customer Success Specialist", "HR Business Partner"] },
      { text: { tr: "Analitik düşünür, veriye dayalı katkı sunarım.", en: "I think analytically and contribute with data." }, roles: ["Business Analyst", "QA Tester"] },
      { text: { tr: "İletişimi güçlü tutarak uyumu sağlarım.", en: "I maintain harmony through strong communication." }, roles: ["Brand Manager", "Content Creator"] }
    ]
  },
  {
    id: 20,
    module: "İş Yapma Tarzı",
    text: { tr: "Zaman yönetimi konusunda kendinizi nasıl tanımlarsınız?", en: "How do you describe yourself in time management?" },
    options: [
      { text: { tr: "Dakik ve zaman planlamasında titizim.", en: "I am punctual and meticulous in time planning." }, roles: ["Project Coordinator", "QA Tester"] },
      { text: { tr: "Öncelikleri belirleyerek esnek bir planla ilerlerim.", en: "I set priorities and proceed with a flexible plan." }, roles: ["Product Manager", "Business Development Manager"] },
      { text: { tr: "Baskı altında daha iyi çalışırım.", en: "I work better under pressure." }, roles: ["Field Sales Representative", "Customer Success Specialist"] },
      { text: { tr: "Zaman planını ekip içinde oluşturmayı tercih ederim.", en: "I prefer to create the time plan within the team." }, roles: ["Scrum Master", "Sales Manager"] }
    ]
  },
  {
    id: 21,
    module: "İş Yapma Tarzı",
    text: { tr: "İş hayatınızda risk alır mısınız?", en: "Do you take risks in your work life?" },
    options: [
      { text: { tr: "Karar verirken mutlaka riskleri analiz ederim.", en: "I always analyze risks when making decisions." }, roles: ["Compliance Officer", "Business Analyst"] },
      { text: { tr: "Hızlı ve içgüdüsel kararlarla ilerlemeyi severim.", en: "I like to proceed with quick and intuitive decisions." }, roles: ["Field Sales Representative", "Product Manager"] },
      { text: { tr: "Riskten kaçınmam ama veri ile desteklerim.", en: "I don't avoid risk but support it with data." }, roles: ["QA Tester", "Financial Analyst"] },
      { text: { tr: "Ortak kararlar alarak riski dağıtmayı tercih ederim.", en: "I prefer to share risk by making joint decisions." }, roles: ["Scrum Master", "HR Business Partner"] }
    ]
  },
  {
    id: 22,
    module: "İş Yapma Tarzı",
    text: { tr: "Yeni bir fikirle karşılaştığınızda nasıl tepki verirsiniz?", en: "How do you react when you encounter a new idea?" },
    options: [
      { text: { tr: "Uygulanabilirliğini analiz ederim.", en: "I analyze its applicability." }, roles: ["Business Analyst", "Product Manager"] },
      { text: { tr: "Heyecanla destekler, hemen denemek isterim.", en: "I support it with excitement and want to try it immediately." }, roles: ["Content Creator", "Brand Manager"] },
      { text: { tr: "Önce sorgular, sonra katkı sunarım.", en: "I question first, then contribute." }, roles: ["QA Tester", "Compliance Officer"] },
      { text: { tr: "Ekip içindeki yansımasını düşünerek hareket ederim.", en: "I act by considering its impact on the team." }, roles: ["Scrum Master", "HR Business Partner"] }
    ]
  },
  {
    id: 23,
    module: "İş Yapma Tarzı",
    text: { tr: "Hedef odaklılık konusunda kendinizi nasıl tanımlarsınız?", en: "How do you describe yourself in terms of goal orientation?" },
    options: [
      { text: { tr: "Belirlenen hedeflere mutlaka ulaşırım.", en: "I always achieve set goals." }, roles: ["Product Manager", "Sales Executive"] },
      { text: { tr: "Hedeflere ulaşmak için yaratıcı yollar bulurum.", en: "I find creative ways to achieve goals." }, roles: ["Content Creator", "UI Designer"] },
      { text: { tr: "Hedefleri veri ve stratejiye dönüştürmeyi önemserim.", en: "I care about turning goals into data and strategy." }, roles: ["Business Analyst", "Data Analyst"] },
      { text: { tr: "Hedefleri ekip başarısı üzerinden değerlendiririm.", en: "I evaluate goals based on team success." }, roles: ["Scrum Master", "Sales Manager"] }
    ]
  },
  // Modül 5: Problem Çözme Yaklaşımı
  {
    id: 24,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Bir sorunla karşılaştığında ilk olarak ne yaparsın?", en: "What do you do first when you encounter a problem?" },
    options: [
      { text: { tr: "Hızlıca çözüm yolları üretirim ve denerim", en: "I quickly produce and try solutions" }, roles: ["Field Sales Representative", "Customer Success Specialist"] },
      { text: { tr: "Sorunu parçalara ayırarak analiz ederim", en: "I analyze the problem by breaking it down" }, roles: ["Business Analyst", "Process Engineer"] },
      { text: { tr: "Başkalarına danışırım ve fikir alırım", en: "I consult others and get opinions" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Önce daha önceki benzer durumları düşünürüm", en: "I first think of similar past situations" }, roles: ["QA Tester", "Compliance Officer"] }
    ]
  },
  // Modül 5: Problem Çözme Yaklaşımı (devam)
  {
    id: 25,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Verilere dayalı bir karar vermen gerektiğinde nasıl hareket edersin?", en: "How do you act when you need to make a data-driven decision?" },
    options: [
      { text: { tr: "Tüm verileri analiz eder, modelleme yaparım", en: "I analyze all data and do modeling" }, roles: ["Data Analyst", "Process Engineer"] },
      { text: { tr: "Temel metriklere bakarak sezgisel karar veririm", en: "I make intuitive decisions based on key metrics" }, roles: ["Product Manager", "Field Sales Representative"] },
      { text: { tr: "Öncelikle kararın etkilediği kişilerle görüşürüm", en: "I first consult with people affected by the decision" }, roles: ["HR Business Partner", "Customer Success Specialist"] },
      { text: { tr: "Önce olası riskleri değerlendiririm", en: "I first assess possible risks" }, roles: ["Compliance Officer", "QA Tester"] }
    ]
  },
  {
    id: 26,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Yeni ve karmaşık bir konu hakkında çalışman gerekiyor. Ne yaparsın?", en: "You need to work on a new and complex topic. What do you do?" },
    options: [
      { text: { tr: "Hızlıca kaynaklara göz atar, uygulamaya geçerim", en: "I quickly review resources and start applying" }, roles: ["Field Sales Representative", "Product Manager"] },
      { text: { tr: "Detaylı bir araştırma yapar, notlar çıkarırım", en: "I do detailed research and take notes" }, roles: ["Data Analyst", "Business Analyst"] },
      { text: { tr: "Konu hakkında deneyimli biriyle konuşurum", en: "I talk to someone experienced on the topic" }, roles: ["Career Counselor", "HR Business Partner"] },
      { text: { tr: "Benzer konulardaki deneyimlerimi düşünerek başlarım", en: "I start by thinking about my experiences in similar topics" }, roles: ["QA Tester", "Process Engineer"] }
    ]
  },
  {
    id: 27,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Ekipte çözülemeyen bir problem varsa ne rol üstlenirsin?", en: "If there is an unsolved problem in the team, what role do you take?" },
    options: [
      { text: { tr: "Liderliği alır, çözüm önerileri üretirim", en: "I take the lead and produce solutions" }, roles: ["Scrum Master", "Product Manager"] },
      { text: { tr: "Sessizce analiz yapar, sonra yapıcı öneriler sunarım", en: "I analyze quietly and then offer constructive suggestions" }, roles: ["QA Tester", "Business Analyst"] },
      { text: { tr: "İnsanların bakış açılarını anlamaya çalışırım", en: "I try to understand people's perspectives" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Önce problem kaynağını sistemsel olarak araştırırım", en: "I first investigate the root cause systematically" }, roles: ["Process Engineer", "Compliance Officer"] }
    ]
  },
  {
    id: 28,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Beklenmedik bir sorunla karşılaştığında nasıl hissedersin?", en: "How do you feel when you encounter an unexpected problem?" },
    options: [
      { text: { tr: "Hemen çözmeye motive olurum", en: "I am immediately motivated to solve it" }, roles: ["Field Sales Representative", "Customer Success Specialist"] },
      { text: { tr: "Rahatsız olurum ama analiz ederek ilerlerim", en: "I feel uncomfortable but proceed by analyzing" }, roles: ["Business Analyst", "QA Tester"] },
      { text: { tr: "Endişelenirim ama çevremden destek alırım", en: "I worry but get support from my environment" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Durumu kabullenip daha temkinli ilerlerim", en: "I accept the situation and proceed more cautiously" }, roles: ["Compliance Officer", "Process Engineer"] }
    ]
  },
  {
    id: 29,
    module: "Problem Çözme Yaklaşımı",
    text: { tr: "Aşağıdakilerden hangisi sana daha yakın?", en: "Which of the following is closer to you?" },
    options: [
      { text: { tr: "Hızlı karar vermek", en: "Making quick decisions" }, roles: ["Field Sales Representative", "Product Manager"] },
      { text: { tr: "Stratejik düşünmek", en: "Thinking strategically" }, roles: ["Business Analyst", "Process Engineer"] },
      { text: { tr: "Empatik çözüm üretmek", en: "Producing empathetic solutions" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Sistematik analiz yapmak", en: "Doing systematic analysis" }, roles: ["QA Tester", "Compliance Officer"] }
    ]
  },
  // Modül 6: İletişim Eğilimi
  {
    id: 30,
    module: "İletişim Eğilimi",
    text: { tr: "Bir toplantıda fikrini söylemek için ne kadar istekli olursun?", en: "How willing are you to express your opinion in a meeting?" },
    options: [
      { text: { tr: "Hemen söylerim, fikirlerim duyulmalı", en: "I say it immediately, my ideas should be heard" }, roles: ["Sales Executive", "Brand Manager"] },
      { text: { tr: "Zamanlama uygunsa paylaşırım", en: "I share if the timing is right" }, roles: ["Content Creator", "Product Manager"] },
      { text: { tr: "Başkalarını dinledikten sonra söylerim", en: "I speak after listening to others" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Sessiz kalmayı tercih ederim, yazılı iletişim daha rahat", en: "I prefer to stay silent, written communication is more comfortable" }, roles: ["Content Strategist", "UX Researcher"] }
    ]
  },
  {
    id: 31,
    module: "İletişim Eğilimi",
    text: { tr: "Bir iş arkadaşınla fikir ayrılığı yaşadığında nasıl davranırsın?", en: "How do you behave when you have a disagreement with a colleague?" },
    options: [
      { text: { tr: "Kendi fikrimi güçlü şekilde savunurum", en: "I strongly defend my own opinion" }, roles: ["Sales Executive", "Recruiter"] },
      { text: { tr: "Ortak bir zemin aramaya çalışırım", en: "I try to find common ground" }, roles: ["HR Business Partner", "Organizational Development Analyst"] },
      { text: { tr: "Karşı tarafı anlamaya çalışırım", en: "I try to understand the other side" }, roles: ["Career Counselor", "Clinical Psychologist"] },
      { text: { tr: "Tartışmaya girmekten kaçınırım", en: "I avoid getting into arguments" }, roles: ["Content Strategist", "UX Researcher"] }
    ]
  },
  {
    id: 32,
    module: "İletişim Eğilimi",
    text: { tr: "İletişim kurarken kendini nasıl tanımlarsın?", en: "How do you describe yourself when communicating?" },
    options: [
      { text: { tr: "Etkileyici ve ikna edici", en: "Impressive and persuasive" }, roles: ["Sales Executive", "Brand Manager"] },
      { text: { tr: "Açık ve mantıklı", en: "Clear and logical" }, roles: ["Business Analyst", "Product Manager"] },
      { text: { tr: "Anlayışlı ve empatik", en: "Understanding and empathetic" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Dikkatli ve temkinli", en: "Careful and cautious" }, roles: ["Compliance Officer", "QA Tester"] }
    ]
  },
  {
    id: 33,
    module: "İletişim Eğilimi",
    text: { tr: "Ekip içindeki bir sorunu iletmek gerektiğinde nasıl davranırsın?", en: "How do you behave when you need to communicate a problem within the team?" },
    options: [
      { text: { tr: "Direkt açıkça dile getiririm", en: "I express it directly and openly" }, roles: ["Sales Executive", "Product Manager"] },
      { text: { tr: "Önce ilgili kişiyle özel görüşürüm", en: "I first talk privately with the relevant person" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Ekipçe konuşmak için ortam yaratırım", en: "I create an environment for team discussion" }, roles: ["Scrum Master", "Organizational Development Analyst"] },
      { text: { tr: "Gerekli görürsem yazarak iletirim", en: "I communicate in writing if necessary" }, roles: ["Content Strategist", "UX Researcher"] }
    ]
  },
  {
    id: 34,
    module: "İletişim Eğilimi",
    text: { tr: "Yazılı iletişim mi sözlü iletişim mi?", en: "Written or verbal communication?" },
    options: [
      { text: { tr: "Sözlü iletişim — anlık ve etkili", en: "Verbal communication — instant and effective" }, roles: ["Sales Executive", "Brand Manager"] },
      { text: { tr: "Her ikisi de dengeli şekilde", en: "Both in a balanced way" }, roles: ["Product Manager", "Business Analyst"] },
      { text: { tr: "Yazılı iletişim — daha net ve düşünülmüş", en: "Written communication — clearer and more thoughtful" }, roles: ["Content Strategist", "UX Researcher"] },
      { text: { tr: "Duruma göre değişir", en: "It depends on the situation" }, roles: ["HR Business Partner", "Career Counselor"] }
    ]
  },
  {
    id: 35,
    module: "İletişim Eğilimi",
    text: { tr: "Aşağıdaki tanımlardan hangisi seni daha iyi yansıtır?", en: "Which of the following describes you best?" },
    options: [
      { text: { tr: "Konuşarak ikna eden", en: "Persuasive by speaking" }, roles: ["Sales Executive", "Recruiter"] },
      { text: { tr: "Açıklayarak ikna eden", en: "Persuasive by explaining" }, roles: ["Brand Manager", "Product Manager"] },
      { text: { tr: "Empati kurarak iletişim kuran", en: "Communicates with empathy" }, roles: ["HR Business Partner", "Career Counselor"] },
      { text: { tr: "Detaylara dikkat eden", en: "Pays attention to details" }, roles: ["Compliance Officer", "QA Tester"] }
    ]
  },
  {
    id: 36,
    module: "İletişim Eğilimi",
    text: { tr: "Bir sunum veya rapor hazırlarken hangi yönünüz öne çıkar?", en: "Which aspect stands out when you prepare a presentation or report?" },
    options: [
      { text: { tr: "Etkili ve akıcı anlatım", en: "Effective and fluent expression" }, roles: ["Brand Manager", "Sales Manager"] },
      { text: { tr: "Veri ve analiz odaklılık", en: "Data and analysis oriented" }, roles: ["Data Analyst", "Business Analyst"] },
      { text: { tr: "Yaratıcı görsel kullanım", en: "Creative use of visuals" }, roles: ["UI Designer", "Graphic Designer"] },
      { text: { tr: "Düzen ve sistematiklik", en: "Order and systematic approach" }, roles: ["QA Tester", "Compliance Officer"] }
    ]
  }
]; 