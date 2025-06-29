"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { PersonalityQuestion } from '@/components/assessment/personality-question';
import { ExpertiseQuestion } from '@/components/assessment/expertise-question';
import { AdminPanel } from '@/components/company/AdminPanel';
import SimulationIntro from '@/components/simulation/simulation-intro';
import PricingStrategyTask from '@/components/simulation/pricing-strategy-task';
import OnepagerTask from '@/components/simulation/onepager-task';
import PresentationTask from '@/components/simulation/presentation-task';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Menu, Home, User, Briefcase, Target, Users, Settings, LogOut, BarChart3, Bell, UserCircle, Mail, Shield, HelpCircle, TrendingUp, Users2, Palette, Code, Play } from 'lucide-react';
import AIReport from '@/components/AIReport';
import AIReportModal from '@/components/AIReportModal';
import CareerDashboard from '@/components/CareerDashboard';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import ModuleMenu from '@/components/ModuleMenu';
import TopBar from '@/components/TopBar';
import { useLanguage } from '@/contexts/LanguageContext';
import AISimulationReport from '@/components/AISimulationReport';
import CVCreator from '@/components/cv/CVCreator';
import CVList from '@/components/cv/CVList';
import ProfileMain from '@/components/profile/ProfileMain';
import ProfileMessages from '@/components/profile/ProfileMessages';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ProfileHelp from '@/components/profile/ProfileHelp';
import JobDiscovery from '@/components/jobs/JobDiscovery';
import InterviewPrep from '@/components/interview/InterviewPrep';
import MockInterview from '@/components/interview/MockInterview';
import InterviewEvaluation from '@/components/interview/InterviewEvaluation';

type UserType = 'individual' | 'company';
type AppState = 'login' | 'assessment' | 'assessment-result' | 'expertise' | 'admin' | 'dashboard' | 'results' | 'expertise-results' | 'simulation' | 'simulation-pricing' | 'simulation-onepager' | 'simulation-presentation' | 'simulation-complete' | 'cv' | 'resumes' | 'profile' | 'messages' | 'settings' | 'help' | 'job-discovery' | 'interview-prep' | 'mock-interview' | 'interview-evaluation';

interface DISCProfile {
  dominant: 'D' | 'I' | 'S' | 'C';
  scores: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  description: string;
}

interface ExpertiseProfile {
  dominant: 'Marketing' | 'Sales' | 'Brand' | 'Product';
  scores: {
    Marketing: number;
    Sales: number;
    Brand: number;
    Product: number;
  };
  description: string;
}

const DISC_DESCRIPTIONS = {
  D: {
    title: 'Dominant (D)',
    description: 'Hedef odaklı, hızlı karar veren, liderlik özellikleri baskın kişilerdir. Zorluklardan çekinmez, rekabeti severler.',
    color: '#ef4444',
    traits: ['Liderlik', 'Kararlılık', 'Sonuç Odaklılık', 'Cesaret'],
    careers: ['Yönetici', 'Girişimci', 'Proje Lideri', 'Satış Müdürü'],
    tools: ['Jira', 'Trello', 'Slack', 'CRM']
  },
  I: {
    title: 'Influencer (I)',
    description: 'İletişim becerileri yüksek, sosyal, enerjik ve insan ilişkilerinde başarılı kişilerdir. Takım çalışmasını ve motivasyonu artırırlar.',
    color: '#f59e42',
    traits: ['İletişim', 'Motivasyon', 'Yaratıcılık', 'İkna Kabiliyeti'],
    careers: ['Pazarlama Uzmanı', 'Eğitmen', 'Halkla İlişkiler', 'Etkinlik Yöneticisi'],
    tools: ['Canva', 'Instagram', 'Mailchimp', 'Zoom']
  },
  S: {
    title: 'Steady (S)',
    description: 'Sakin, sabırlı, güvenilir ve destekleyici kişilerdir. Takımda denge unsuru olurlar, istikrarlıdırlar.',
    color: '#10b981',
    traits: ['Sabır', 'Destek', 'Sadakat', 'İstikrar'],
    careers: ['İK Uzmanı', 'Danışman', 'Koç', 'Müşteri Temsilcisi'],
    tools: ['Notion', 'Teams', 'Google Drive', 'Zendesk']
  },
  C: {
    title: 'Compliant (C)',
    description: 'Detaycı, analitik, kuralcı ve mükemmeliyetçi kişilerdir. Planlama ve analizde başarılıdırlar.',
    color: '#3b82f6',
    traits: ['Analitik Düşünce', 'Dikkat', 'Planlama', 'Mükemmeliyetçilik'],
    careers: ['Finans Uzmanı', 'Analist', 'Mühendis', 'Denetçi'],
    tools: ['Excel', 'Tableau', 'Asana', 'Google Analytics']
  }
};

const EXPERTISE_REPORT = {
  tr: {
    Marketing: {
      title: 'Pazarlama Uzmanı',
      desc: 'Dijital pazarlama stratejileri geliştiren, veri odaklı kampanyalar yöneten ve marka bilinirliğini artıran uzman.',
      color: '#ef4444',
      traits: ['Veri Analizi', 'Stratejik Düşünme', 'Yaratıcılık', 'Sonuç Odaklılık'],
      careers: ['Dijital Pazarlama Yöneticisi', 'İçerik Pazarlama Uzmanı', 'SEO Uzmanı', 'Growth Hacker'],
      tools: ['Google Analytics', 'Meta Ads', 'Mailchimp', 'HubSpot'],
      analysis: 'Veri analizi ve stratejik bakış açısı ile öne çıkıyorsunuz. Yaratıcı fikirler ve sonuç odaklılık güçlü yönleriniz.'
    },
    Sales: {
      title: 'Satış Uzmanı',
      desc: 'Müşteri ihtiyaçlarını analiz eden, ikna edici sunumlar yapan ve satış hedeflerine ulaşan profesyonel.',
      color: '#f59e42',
      traits: ['İkna Kabiliyeti', 'İletişim', 'Müzakere', 'Müşteri Odaklılık'],
      careers: ['Satış Müdürü', 'Müşteri Temsilcisi', 'İş Geliştirme', 'Account Executive'],
      tools: ['CRM', 'Zoom', 'PowerPoint', 'LinkedIn Sales Navigator'],
      analysis: 'İletişim ve ikna kabiliyetiniz ile satış süreçlerinde başarılısınız. Müşteri odaklı yaklaşımınız öne çıkıyor.'
    },
    Brand: {
      title: 'Marka Yöneticisi',
      desc: 'Marka kimliğini oluşturan, marka değerini artıran ve tutarlı iletişim stratejileri geliştiren uzman.',
      color: '#10b981',
      traits: ['Yaratıcılık', 'Görsel Algı', 'Stratejik Düşünme', 'Tutarlılık'],
      careers: ['Brand Manager', 'Creative Director', 'Visual Designer', 'Social Media Manager'],
      tools: ['Canva', 'Figma', 'Instagram Insights', 'Adobe Creative Suite'],
      analysis: 'Yaratıcılığınız ve marka algısı yönetiminiz ile öne çıkıyorsunuz. Tutarlılık ve görsel algı güçlü yönleriniz.'
    },
    Product: {
      title: 'Ürün Yöneticisi',
      desc: 'Ürün yaşam döngüsünü yöneten, kullanıcı ihtiyaçlarını analiz eden ve ürün stratejisi geliştiren profesyonel.',
      color: '#3b82f6',
      traits: ['Analitik Düşünce', 'Süreç Yönetimi', 'Problem Çözme', 'Kullanıcı Odaklılık'],
      careers: ['Product Manager', 'Product Owner', 'UX Designer', 'Business Analyst'],
      tools: ['Jira', 'Notion', 'Miro', 'Figma'],
      analysis: 'Analitik düşünceniz ve süreç yönetimi beceriniz ile ürün geliştirme süreçlerinde başarılısınız.'
    }
  },
  en: {
    Marketing: {
      title: 'Marketing Specialist',
      desc: 'Expert in developing digital marketing strategies, managing data-driven campaigns, and increasing brand awareness.',
      color: '#ef4444',
      traits: ['Data Analysis', 'Strategic Thinking', 'Creativity', 'Results-Oriented'],
      careers: ['Digital Marketing Manager', 'Content Marketing Specialist', 'SEO Specialist', 'Growth Hacker'],
      tools: ['Google Analytics', 'Meta Ads', 'Mailchimp', 'HubSpot'],
      analysis: 'You stand out with your data analysis and strategic perspective. Creativity and results-orientation are your strengths.'
    },
    Sales: {
      title: 'Sales Specialist',
      desc: 'Professional who analyzes customer needs, makes persuasive presentations, and achieves sales targets.',
      color: '#f59e42',
      traits: ['Persuasion', 'Communication', 'Negotiation', 'Customer-Focused'],
      careers: ['Sales Manager', 'Account Executive', 'Business Development', 'Customer Success Manager'],
      tools: ['CRM', 'Zoom', 'PowerPoint', 'LinkedIn Sales Navigator'],
      analysis: 'You are successful in sales processes with your communication and persuasion skills. Customer-oriented approach is your strength.'
    },
    Brand: {
      title: 'Brand Manager',
      desc: 'Expert who creates brand identity, increases brand value, and develops consistent communication strategies.',
      color: '#10b981',
      traits: ['Creativity', 'Visual Perception', 'Strategic Thinking', 'Consistency'],
      careers: ['Brand Manager', 'Creative Director', 'Visual Designer', 'Social Media Manager'],
      tools: ['Canva', 'Figma', 'Instagram Insights', 'Adobe Creative Suite'],
      analysis: 'You stand out with your creativity and brand perception management. Consistency and visual perception are your strengths.'
    },
    Product: {
      title: 'Product Manager',
      desc: 'Professional who manages product lifecycle, analyzes user needs, and develops product strategy.',
      color: '#3b82f6',
      traits: ['Analytical Thinking', 'Process Management', 'Problem Solving', 'User-Focused'],
      careers: ['Product Manager', 'Product Owner', 'UX Designer', 'Business Analyst'],
      tools: ['Jira', 'Notion', 'Miro', 'Figma'],
      analysis: 'You are successful in product development processes with your analytical thinking and process management skills.'
    }
  }
};

// DISC Questions (EN)
const discQuestionsEN = [
    {
      id: 1,
    text: "Your approach in the workplace:",
      options: [
      { text: "I focus on goals and get things done quickly.", type: "D" as const },
      { text: "I facilitate the process with relationships.", type: "I" as const },
      { text: "I provide balance and support in the team.", type: "S" as const },
      { text: "I follow rules and pay attention to details.", type: "C" as const }
    ]
    },
    {
      id: 2,
    text: "What is your first step when starting a new project?",
      options: [
      { text: "Set priorities and get started.", type: "D" as const },
      { text: "Boost the team's motivation.", type: "I" as const },
      { text: "Help everyone adapt to the process.", type: "S" as const },
      { text: "Start with planning and analysis.", type: "C" as const }
    ]
    },
    {
      id: 3,
    text: "How do you behave under stress?",
    options: [
      { text: "Take control.", type: "D" as const },
      { text: "Try to create a relaxed atmosphere.", type: "I" as const },
      { text: "Stay calm and understanding.", type: "S" as const },
      { text: "Find solutions by following rules.", type: "C" as const }
    ]
  },
  {
    id: 4,
    text: "Your role in a team:",
    options: [
      { text: "Leader", type: "D" as const },
      { text: "Communicator", type: "I" as const },
      { text: "Supporter", type: "S" as const },
      { text: "Organizer", type: "C" as const }
    ]
  },
  {
    id: 5,
    text: "Which achievement makes you happiest?",
      options: [
      { text: "Achieving a tough goal", type: "D" as const },
      { text: "Being recognized by people", type: "I" as const },
      { text: "Gaining the team's trust", type: "S" as const },
      { text: "Doing flawless and proper work", type: "C" as const }
    ]
  },
  {
    id: 6,
    text: "In which environment do you work most efficiently?",
    options: [
      { text: "Under pressure", type: "D" as const },
      { text: "In social environments", type: "I" as const },
      { text: "In peaceful, stable places", type: "S" as const },
      { text: "In systematic and organized places", type: "C" as const }
    ]
  },
  {
    id: 7,
    text: "How do people describe you?",
    options: [
      { text: "Decisive", type: "D" as const },
      { text: "Energetic", type: "I" as const },
      { text: "Understanding", type: "S" as const },
      { text: "Careful", type: "C" as const }
    ]
  },
  {
    id: 8,
    text: "How do you feel when meeting new people?",
    options: [
      { text: "Want to make a strong impression", type: "D" as const },
      { text: "Easily communicate", type: "I" as const },
      { text: "Prefer to listen first", type: "S" as const },
      { text: "Observe from a distance", type: "C" as const }
    ]
  },
  {
    id: 9,
    text: "What is your strongest trait?",
    options: [
      { text: "Leadership", type: "D" as const },
      { text: "Social harmony", type: "I" as const },
      { text: "Loyalty", type: "S" as const },
      { text: "Discipline", type: "C" as const }
    ]
  },
  {
    id: 10,
    text: "Which principle do you value most?",
    options: [
      { text: "Getting results", type: "D" as const },
      { text: "Freedom", type: "I" as const },
      { text: "Loyalty", type: "S" as const },
      { text: "Truth", type: "C" as const }
    ]
  }
];

// DISC Questions (TR)
const discQuestionsTR = [
    {
      id: 1,
    text: "İş ortamında seni en iyi tanımlayan yaklaşım:",
      options: [
      { text: "Hedefe odaklanır, işleri hızla tamamlarım.", type: "D" as const },
      { text: "İnsan ilişkileriyle süreci kolaylaştırırım.", type: "I" as const },
      { text: "Ekipte dengeyi sağlar, destek sunarım.", type: "S" as const },
      { text: "Kuralları takip eder, detaylara dikkat ederim.", type: "C" as const }
    ]
    },
    {
      id: 2,
    text: "Yeni bir projeye başlarken ilk adımın nedir?",
      options: [
      { text: "Öncelikleri belirler, ilerlemeye başlarım.", type: "D" as const },
      { text: "Ekibin motivasyonunu artırırım.", type: "I" as const },
      { text: "Herkesin sürece alışmasına yardımcı olurum.", type: "S" as const },
      { text: "Planlama ve analizle başlarım.", type: "C" as const }
    ]
    },
    {
      id: 3,
    text: "Stres altında nasıl davranırsın?",
      options: [
      { text: "Kontrolü ele alırım.", type: "D" as const },
      { text: "Rahat bir atmosfer yaratmaya çalışırım.", type: "I" as const },
      { text: "Sakin kalır, anlayışlı olurum.", type: "S" as const },
      { text: "Kuralları izleyerek çözüm üretirim.", type: "C" as const }
    ]
  },
  {
    id: 4,
    text: "Ekip içinde seni en iyi tanımlayan rol:",
    options: [
      { text: "Yönlendiren", type: "D" as const },
      { text: "İletişim kuran", type: "I" as const },
      { text: "Destek veren", type: "S" as const },
      { text: "Organize eden", type: "C" as const }
    ]
  },
  {
    id: 5,
    text: "En çok hangi başarı seni mutlu eder?",
    options: [
      { text: "Zor bir hedefi başarmak", type: "D" as const },
      { text: "İnsanlar tarafından fark edilmek", type: "I" as const },
      { text: "Ekibin güvenini kazanmak", type: "S" as const },
      { text: "Hatasız ve düzgün bir iş yapmak", type: "C" as const }
    ]
  },
  {
    id: 6,
    text: "Hangi ortamda daha verimli çalışırsın?",
    options: [
      { text: "Under pressure", type: "D" as const },
      { text: "In social environments", type: "I" as const },
      { text: "In peaceful, stable places", type: "S" as const },
      { text: "In systematic and organized places", type: "C" as const }
    ]
  },
  {
    id: 7,
    text: "İnsanlar seni nasıl tanımlar?",
    options: [
      { text: "Kararlı", type: "D" as const },
      { text: "Enerjik", type: "I" as const },
      { text: "Anlayışlı", type: "S" as const },
      { text: "Dikkatli", type: "C" as const }
    ]
  },
  {
    id: 8,
    text: "Yeni insanlarla tanıştığında nasıl hissedersin?",
    options: [
      { text: "Güçlü izlenim bırakmak isterim", type: "D" as const },
      { text: "Kolayca iletişim kurarım", type: "I" as const },
      { text: "Önce dinlemeyi tercih ederim", type: "S" as const },
      { text: "Mesafeli durup gözlemlerim", type: "C" as const }
    ]
  },
  {
    id: 9,
    text: "En güçlü yönün nedir?",
    options: [
      { text: "Liderlik", type: "D" as const },
      { text: "Sosyal uyum", type: "I" as const },
      { text: "Sadakat", type: "S" as const },
      { text: "Disiplin", type: "C" as const }
    ]
  },
  {
    id: 10,
    text: "Hangi ilkeye daha çok önem verirsin?",
    options: [
      { text: "Sonuç almak", type: "D" as const },
      { text: "Özgürlük", type: "I" as const },
      { text: "Sadakat", type: "S" as const },
      { text: "Doğruluk", type: "C" as const }
    ]
  }
];

// Expertise Questions (EN)
const expertiseQuestionsEN = [
    {
      id: 1,
    text: "Which type of work motivates you the most?",
      options: [
      { text: "Generating new ideas and bringing them to market", type: "Marketing" as const },
      { text: "Direct communication with customers and persuasion", type: "Sales" as const },
      { text: "Creating and growing a brand identity", type: "Brand" as const },
      { text: "Being involved in every step of the product process", type: "Product" as const }
    ]
    },
    {
      id: 2,
    text: "Which of the following attracts you most in a project?",
      options: [
      { text: "Competitor analysis and content planning", type: "Marketing" as const },
      { text: "Identifying customer needs and offering solutions", type: "Sales" as const },
      { text: "Creating and sustaining brand perception", type: "Brand" as const },
      { text: "Developing products with user feedback", type: "Product" as const }
    ]
    },
    {
      id: 3,
    text: "Which of these tools would you prefer to use more?",
      options: [
      { text: "Google Analytics, Meta Ads, Mailchimp", type: "Marketing" as const },
      { text: "CRM, Zoom, PowerPoint", type: "Sales" as const },
      { text: "Canva, Figma, Instagram Insights", type: "Brand" as const },
      { text: "Jira, Notion, Miro", type: "Product" as const }
    ]
  },
  {
    id: 4,
    text: "What is the most critical stage for you in a campaign or product launch?",
    options: [
      { text: "Finding the right message for the target audience", type: "Marketing" as const },
      { text: "Making the presentation that converts to sales", type: "Sales" as const },
      { text: "Maintaining brand integrity while communicating", type: "Brand" as const },
      { text: "Perfect technical details and timing", type: "Product" as const }
    ]
  },
  {
    id: 5,
    text: "Who would you most like to work with within the company?",
    options: [
      { text: "Content creators, advertising agencies", type: "Marketing" as const },
      { text: "Sales teams, customer representatives", type: "Sales" as const },
      { text: "Creative team, social media managers", type: "Brand" as const },
      { text: "Developers, designers, data analysts", type: "Product" as const }
    ]
  },
  {
    id: 6,
    text: "Which of the following would make your day more meaningful?",
    options: [
      { text: "Creating digital campaign strategies", type: "Marketing" as const },
      { text: "Presenting solutions to potential customers", type: "Sales" as const },
      { text: "Shaping the brand story", type: "Brand" as const },
      { text: "Mapping product roadmap and prioritization", type: "Product" as const }
    ]
  }
];

// Expertise Questions (TR)
const expertiseQuestionsTR = [
    {
      id: 1,
    text: "Hangisi işin en çok seni motive eden?",
      options: [
      { text: "Yeni fikirler üretmek ve bunları pazarlamak", type: "Marketing" as const },
      { text: "Müşterilerle doğrudan iletişim kurmak ve ikna etmek", type: "Sales" as const },
      { text: "Marka kimliğini oluşturmak ve artırmak", type: "Brand" as const },
      { text: "Ürün yaşam döngüsünün her adımında bulunmak", type: "Product" as const }
    ]
    },
    {
      id: 2,
    text: "Aşağıdakilerden hangisi bir projede en çok sana çekici görünür?",
      options: [
      { text: "Rakip analizleri ve içerik planlaması", type: "Marketing" as const },
      { text: "Müşteri ihtiyaçlarını analiz etmek ve çözümler sunmak", type: "Sales" as const },
      { text: "Marka algısını oluşturmak ve korumak", type: "Brand" as const },
      { text: "Kullanıcı geri bildirimleri ile ürün geliştirmek", type: "Product" as const }
    ]
    },
    {
      id: 3,
    text: "Hangisi işte daha fazla kullanılmasını tercih edersin?",
      options: [
      { text: "Google Analytics, Meta Ads, Mailchimp", type: "Marketing" as const },
      { text: "CRM, Zoom, PowerPoint", type: "Sales" as const },
      { text: "Canva, Figma, Instagram Insights", type: "Brand" as const },
      { text: "Jira, Notion, Miro", type: "Product" as const }
    ]
  },
  {
    id: 4,
    text: "Kampanya veya ürün piyasaya çıkarılırken en kritik aşaması hangisi?",
    options: [
      { text: "Hedef kitle için doğru mesajı bulmak", type: "Marketing" as const },
      { text: "Satışa dönüştüren sunumlar yapmak", type: "Sales" as const },
      { text: "Marka tutarlılığını korumak iletişim sürecinde", type: "Brand" as const },
      { text: "Mükemmel teknik ayrıntıları ve zamanı", type: "Product" as const }
    ]
  },
  {
    id: 5,
    text: "Şirket içinde en çok işbirliği içinde çalışmak istediğin kişi hangisi?",
    options: [
      { text: "İçerik oluşturucular, reklam ajansları", type: "Marketing" as const },
      { text: "Satış ekibi, müşteri temsilcileri", type: "Sales" as const },
      { text: "Yaratıcı ekib, sosyal medya yöneticileri", type: "Brand" as const },
      { text: "Geliştiriciler, tasarımcılar, veri analistleri", type: "Product" as const }
    ]
  },
  {
    id: 6,
    text: "Hangisi gününüzü daha anlamlı kılacak?",
    options: [
      { text: "Dijital kampanya stratejileri oluşturmak", type: "Marketing" as const },
      { text: "Potansiyel müşterilere çözümler sunmak", type: "Sales" as const },
      { text: "Marka hikayesini şekillendirmek", type: "Brand" as const },
      { text: "Ürün yol haritasını ve önceliklendirmeyi eşleştirmek", type: "Product" as const }
    ]
  }
];

// --- Uygulamanın tamamı aşağıda ---

export default function Page() {
  const { user, userType, setAuthUserType } = useAuth();
  const [appState, setAppState] = useState<'login' | 'dashboard' | 'assessment' | 'assessment-result' | 'expertise' | 'admin' | 'results' | 'expertise-results' | 'simulation' | 'simulation-pricing' | 'simulation-onepager' | 'simulation-presentation' | 'simulation-complete' | 'cv' | 'resumes' | 'profile' | 'messages' | 'settings' | 'help' | 'job-discovery' | 'interview-prep' | 'mock-interview' | 'interview-evaluation'>('login');
  const [discResult, setDiscResult] = useState<any>(null);
  const [expertiseResult, setExpertiseResult] = useState<any>(null);
  const [dashboardKey, setDashboardKey] = useState(0);
  const { language } = useLanguage();
  const [mockAnswers, setMockAnswers] = useState<string[] | null>(null);

  // Tüm metinleri iki dilde tanımla
  const TEXT = {
    tr: {
      discResultTitle: '🎯 DISC Kişilik Profiliniz',
      discResultDesc: 'Kişilik envanterinizin sonuçları aşağıdadır',
      strengths: '💪 Güçlü Özellikler',
      careers: 'Uygun Kariyerler',
      tools: '🛠️ Önerilen Araçlar',
      analysis: '🔎 Kişilik Analizi',
      continue: '🚀 Devam Et',
      home: '🏠 Ana Sayfa',
      aiReport: '🤖 AI Raporu',
      strengthsLabel: 'Güçlü Yönler:',
      devAreas: 'Gelişim Alanları:',
      devAreasText: 'Esneklik ve spontanlık, Sosyal etkileşim',
    },
    en: {
      discResultTitle: '🎯 Your DISC Personality Profile',
      discResultDesc: 'Your personality inventory results are below',
      strengths: '💪 Strengths',
      careers: 'Suitable Careers',
      tools: '🛠️ Recommended Tools',
      analysis: '🔎 Personality Analysis',
      continue: '🚀 Continue',
      home: '🏠 Home',
      aiReport: '🤖 AI Report',
      strengthsLabel: 'Strengths:',
      devAreas: 'Development Areas:',
      devAreasText: 'Flexibility and spontaneity, Social interaction',
    }
  };

  // DISC açıklamaları iki dilde
  const DISC_DESCRIPTIONS_ALL = {
    tr: DISC_DESCRIPTIONS,
    en: {
      D: {
        title: 'Dominant (D)',
        description: 'Goal-oriented, quick decision-maker, strong leadership. Not afraid of challenges, loves competition.',
        color: '#ef4444',
        traits: ['Leadership', 'Decisiveness', 'Result-Oriented', 'Courage'],
        careers: ['Manager', 'Entrepreneur', 'Project Leader', 'Sales Manager'],
        tools: ['Jira', 'Trello', 'Slack', 'CRM']
      },
      I: {
        title: 'Influencer (I)',
        description: 'High communication skills, social, energetic, successful in human relations. Increases teamwork and motivation.',
        color: '#f59e42',
        traits: ['Communication', 'Motivation', 'Creativity', 'Persuasion'],
        careers: ['Marketing Specialist', 'Trainer', 'PR', 'Event Manager'],
        tools: ['Canva', 'Instagram', 'Mailchimp', 'Zoom']
      },
      S: {
        title: 'Steady (S)',
        description: 'Calm, patient, reliable, and supportive. Brings balance to the team, stable.',
        color: '#10b981',
        traits: ['Patience', 'Support', 'Loyalty', 'Stability'],
        careers: ['HR Specialist', 'Consultant', 'Coach', 'Customer Rep'],
        tools: ['Notion', 'Teams', 'Google Drive', 'Zendesk']
      },
      C: {
        title: 'Compliant (C)',
        description: 'Detail-oriented, analytical, rule-based, perfectionist. Successful in planning and analysis.',
        color: '#3b82f6',
        traits: ['Analytical Thinking', 'Attention', 'Planning', 'Perfectionism'],
        careers: ['Finance Specialist', 'Analyst', 'Engineer', 'Auditor'],
        tools: ['Excel', 'Tableau', 'Asana', 'Google Analytics']
      }
    }
  };

  // Soru setleri iki dilde
  const discQuestions = language === 'tr' ? discQuestionsTR : discQuestionsEN;
  const expertiseQuestions = language === 'tr' ? expertiseQuestionsTR : expertiseQuestionsEN;
  const DISC_DESCRIPTIONS_LANG = DISC_DESCRIPTIONS_ALL[language];
  const t = TEXT[language];

  // Hamburger menüden modül seçimi
  const handleModuleSelect = (module: string) => {
    switch (module) {
      case 'personality':
        setAppState('assessment');
        break;
      case 'expertise':
        setAppState('expertise');
        break;
      case 'role':
      case 'simulation':
        setAppState('simulation');
        break;
      case 'cv':
        setAppState('cv');
        break;
      case 'resumes':
        setAppState('resumes');
        break;
      case 'profile':
        setAppState('profile');
        break;
      case 'messages':
        setAppState('messages');
        break;
      case 'settings':
        setAppState('settings');
        break;
      case 'help':
        setAppState('help');
        break;
      case 'job-discovery':
      case 'jobs':
        setAppState('job-discovery');
        break;
      case 'interview':
        setAppState('interview-prep');
        break;
      case 'networking':
        // Networking modülüne yönlendirme eklenebilir
        break;
      case 'coaching':
        // Koçluk modülüne yönlendirme eklenebilir
        break;
      case 'dashboard':
        setAppState('dashboard');
        setDashboardKey(Math.random());
        break;
      default:
        setAppState('dashboard');
    }
  };

  // Tüm ekranlarda hamburger menü görünür olacak şekilde üstte render et
    return (
    <>
      <div className="pt-14">
        {user || userType ? <TopBar onModuleSelect={handleModuleSelect} /> : null}
        <ModuleMenu onSelect={handleModuleSelect} />
        {(() => {
          // Giriş yapılmamışsa login ekranı
          if (!user && !userType) {
            return <LoginScreen onLoginSuccess={(userType) => {
              setAuthUserType(userType || 'individual');
              setAppState('dashboard');
            }} />;
          }
          // Admin paneli
          if (userType === 'company' && appState === 'admin') {
            return <AdminPanel />;
          }
          // Personality Assessment Sonuç Ekranı
          if (appState === 'assessment-result' && discResult) {
            const discType = discResult.dominant as keyof typeof DISC_DESCRIPTIONS_LANG;
            const discData = DISC_DESCRIPTIONS_LANG[discType];
            return (
              <TooltipProvider>
              <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
                <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{t.discResultTitle}</h2>
                  <div className="text-center text-gray-500 mb-4">{t.discResultDesc}</div>
                  <div className="flex flex-col items-center mb-4">
                    <span className="inline-block px-6 py-2 rounded-full text-lg font-bold mb-2" style={{ background: discData.color + '22', color: discData.color }}>{discData.title}</span>
                    <div className="text-base md:text-lg text-gray-700 mb-2">{discData.description}</div>
              </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 w-full">
                    {(['D','I','S','C'] as const).map((type) => (
                      <Tooltip key={type}>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col items-center cursor-pointer w-full">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow border-2 text-white text-lg font-bold transition-all duration-200"
                              style={{ background: discData.color, borderColor: discData.color }}
                            >
                              <span className="text-xl font-bold">{discResult.scores[type]}</span>
        </div>
      </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-center max-w-xs">
                          <div className="font-bold mb-1" style={{ color: DISC_DESCRIPTIONS_LANG[type].color }}>{DISC_DESCRIPTIONS_LANG[type].title}</div>
                          <div className="text-xs text-gray-700">{DISC_DESCRIPTIONS_LANG[type].description}</div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
        </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="font-semibold mb-1 text-sm">{t.strengths}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.traits.map((trait, i) => <li key={i}>{trait}</li>)}
                      </ul>
              </div>
                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="font-semibold mb-1 text-sm">{t.careers}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.careers.map((career, i) => <li key={i}>{career}</li>)}
                      </ul>
            </div>
                    <div className="bg-purple-50 rounded-xl p-3">
                      <div className="font-semibold mb-1 text-sm">{t.tools}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                      </ul>
        </div>
      </div>
                  <div className="bg-yellow-50 rounded-xl p-3 mb-4">
                    <div className="font-semibold mb-1 text-sm">{t.analysis}</div>
                    <div className="text-gray-700 text-xs">
                      <b>{t.strengthsLabel}</b> {discData.traits.slice(0,2).join(', ')}<br/>
                      <b>{t.devAreas}</b> {t.devAreasText}
    </div>
        </div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2 w-full">
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 text-sm font-semibold shadow-lg flex-1 min-w-0" onClick={() => setAppState('expertise')}>
                        {t.continue}
              </Button>
                      <Button variant="outline" className="px-3 py-2 text-sm font-semibold flex-1 min-w-0" onClick={() => setAppState('dashboard')}>
                        {t.home}
                    </Button>
                      <AIReportModal discResults={discResult} language={language} buttonClassName="flex-1 min-w-0 px-3 py-2 text-sm font-semibold" buttonText={t.aiReport} />
                  </div>
                </div>
        </div>
      </div>
              </TooltipProvider>
            );
          }
          // Modül akışı
          switch (appState) {
            case 'dashboard':
              return <CareerDashboard key={dashboardKey} onModuleSelect={handleModuleSelect} />;
            case 'assessment':
              return <PersonalityQuestion key={language} questions={discQuestions} onComplete={(_answers, discProfile) => { setDiscResult(discProfile); setAppState('assessment-result'); }} />;
            case 'expertise':
              return <ExpertiseQuestion key={language} questions={expertiseQuestions} onComplete={(_answers, expertiseProfile) => { setExpertiseResult(expertiseProfile); setAppState('expertise-results'); }} />;
            case 'cv':
              return <CVCreator language={language} />;
            case 'resumes':
              return <CVList language={language} />;
            case 'profile':
              return <ProfileMain language={language} />;
            case 'messages':
              return <ProfileMessages language={language} />;
            case 'settings':
              return <ProfileSettings language={language} />;
            case 'help':
              return <ProfileHelp language={language} />;
            case 'expertise-results':
              if (!expertiseResult) return null;
              const expType = expertiseResult.dominant as keyof typeof EXPERTISE_REPORT[typeof language];
              const expData = EXPERTISE_REPORT[language][expType];
    return (
                <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
                  <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{expData.title}</h2>
                    <div className="text-center text-gray-500 mb-4">{expData.desc}</div>
                    <div className="flex flex-col items-center mb-4">
                      <span className="inline-block px-6 py-2 rounded-full text-lg font-bold mb-2" style={{ background: expData.color + '22', color: expData.color }}>{expData.title}</span>
          </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                      <div className="bg-blue-50 rounded-xl p-3">
                        <div className="font-semibold mb-1 text-sm">{language === 'tr' ? '💪 Güçlü Özellikler' : '💪 Strengths'}</div>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                          {expData.traits.map((trait, i) => <li key={i}>{trait}</li>)}
                        </ul>
              </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <div className="font-semibold mb-1 text-sm">{language === 'tr' ? '🎯 Uygun Pozisyonlar' : '🎯 Suitable Careers'}</div>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                          {expData.careers.map((career, i) => <li key={i}>{career}</li>)}
                        </ul>
                </div>
                      <div className="bg-purple-50 rounded-xl p-3">
                        <div className="font-semibold mb-1 text-sm">{language === 'tr' ? '🛠️ Önerilen Araçlar' : '🛠️ Recommended Tools'}</div>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                          {expData.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                        </ul>
              </div>
        </div>
                    <div className="bg-yellow-50 rounded-xl p-3 mb-4">
                      <div className="font-semibold mb-1 text-sm">{language === 'tr' ? '🔎 Rol Analizi' : '🔎 Role Analysis'}</div>
                      <div className="text-gray-700 text-xs">{expData.analysis}</div>
      </div>
                    <div className="mb-4">
                      <div className="font-semibold mb-2 text-sm text-center">{language === 'tr' ? 'Bu pozisyon(lar) için simülasyonları deneyimle:' : 'Try simulations for these roles:'}</div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {expData.careers.map((career, i) => (
                          <Button key={i} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 text-xs font-semibold shadow flex-1 min-w-0" onClick={() => setAppState('simulation')}>
                            {career}
              </Button>
                        ))}
          </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2 w-full">
                      <Button variant="outline" className="px-3 py-2 text-sm font-semibold flex-1 min-w-0" onClick={() => setAppState('dashboard')}>
                        {language === 'tr' ? '🏠 Ana Sayfa' : '🏠 Home'}
                    </Button>
                  </div>
                </div>
          </div>
              );
            case 'simulation':
              return <SimulationIntro onStart={() => setAppState('simulation-pricing')} language={language} />;
            case 'simulation-pricing':
              return <PricingStrategyTask onComplete={() => setAppState('simulation-onepager')} language={language} />;
            case 'simulation-onepager':
              return <OnepagerTask onComplete={() => setAppState('simulation-presentation')} language={language} />;
            case 'simulation-presentation':
              return <PresentationTask onComplete={() => setAppState('simulation-complete')} language={language} />;
            case 'simulation-complete':
              return <AISimulationReport
                user={{ name: user?.displayName || user?.email || 'User', avatarUrl: user?.photoURL || undefined }}
                discResults={discResult}
                expertiseResults={expertiseResult}
                assessmentResults={null}
                simulationResults={null}
                language={language}
              />;
            case 'job-discovery':
              return <JobDiscovery language={language} />;
            case 'interview-prep':
              return <InterviewPrep language={language} onStartMock={() => setAppState('mock-interview')} />;
            case 'mock-interview':
              return <MockInterview language={language} onFinish={(answers) => { setMockAnswers(answers); setAppState('interview-evaluation'); }} />;
            case 'interview-evaluation':
              return <InterviewEvaluation language={language} onClose={() => setAppState('dashboard')} />;
            default:
              return <CareerDashboard onModuleSelect={handleModuleSelect} />;
          }
        })()}
                </div>
    </>
  );
}

export const dynamic = "force-dynamic";
