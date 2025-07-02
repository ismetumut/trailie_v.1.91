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
import { CompanyLogin } from "@/components/company/CompanyLogin";

type UserType = 'individual' | 'company';
type AppState = 
  | 'login' 
  | 'assessment' 
  | 'assessment-result' 
  | 'expertise' 
  | 'admin' 
  | 'dashboard' 
  | 'results' 
  | 'expertise-results' 
  | 'simulation' 
  | 'simulation-pricing' 
  | 'simulation-onepager' 
  | 'simulation-presentation' 
  | 'simulation-complete' 
  | 'cv' 
  | 'resumes' 
  | 'profile' 
  | 'messages' 
  | 'settings' 
  | 'help' 
  | 'job-discovery' 
  | 'interview-prep' 
  | 'mock-interview' 
  | 'interview-evaluation' 
  | 'company-login' 
  | 'company-dashboard';

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

// 36 soruluk DISC kişilik envanteri
const discQuestionsTR = [
  {
    id: 1,
    text: { tr: "Yeni bir projeye başlarken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when starting a new project?" },
    options: [
      { text: { tr: "Hedefe hızlıca ulaşmak isterim.", en: "I want to reach the goal quickly." }, tag: 'D' as const },
      { text: { tr: "Takımın motivasyonunu artırırım.", en: "I increase the team's motivation." }, tag: 'I' as const },
      { text: { tr: "Düzenli ve planlı ilerlerim.", en: "I proceed in an organized and planned way." }, tag: 'C' as const },
      { text: { tr: "Uyumlu ve destekleyici olurum.", en: "I am cooperative and supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 2,
    text: { tr: "Bir ekip çalışmasında seni en çok ve en az tanımlayan özellik hangisi?", en: "Which of the following best and least describes you in teamwork?" },
    options: [
      { text: { tr: "Liderliği üstlenirim.", en: "I take the lead." }, tag: 'D' as const },
      { text: { tr: "Takımın moralini yüksek tutarım.", en: "I keep the team's morale high." }, tag: 'I' as const },
      { text: { tr: "Kurallara ve plana sadık kalırım.", en: "I stick to rules and plans." }, tag: 'C' as const },
      { text: { tr: "Destekleyici ve sabırlı olurum.", en: "I am supportive and patient." }, tag: 'S' as const }
    ]
  },
  {
    id: 3,
    text: { tr: "Bir sorunla karşılaştığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when facing a problem?" },
    options: [
      { text: { tr: "Hızlıca çözüm üretirim.", en: "I quickly produce a solution." }, tag: 'D' as const },
      { text: { tr: "Başkalarını motive ederim.", en: "I motivate others." }, tag: 'I' as const },
      { text: { tr: "Detaylı analiz yaparım.", en: "I analyze details thoroughly." }, tag: 'C' as const },
      { text: { tr: "Süreci sabırla takip ederim.", en: "I patiently follow the process." }, tag: 'S' as const }
    ]
  },
  {
    id: 4,
    text: { tr: "Bir hedef belirlerken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when setting a goal?" },
    options: [
      { text: { tr: "Net ve iddialı hedefler koyarım.", en: "I set clear and ambitious goals." }, tag: 'D' as const },
      { text: { tr: "Takımın fikrini alırım.", en: "I get the team's opinion." }, tag: 'S' as const },
      { text: { tr: "Herkesi motive ederim.", en: "I motivate everyone." }, tag: 'I' as const },
      { text: { tr: "Gerçekçi ve ölçülebilir hedefler koyarım.", en: "I set realistic and measurable goals." }, tag: 'C' as const }
    ]
  },
  {
    id: 5,
    text: { tr: "Bir sunum yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when presenting?" },
    options: [
      { text: { tr: "Etkileyici ve enerjik olurum.", en: "I am impressive and energetic." }, tag: 'I' as const },
      { text: { tr: "Hazırlıklı ve düzenli olurum.", en: "I am prepared and organized." }, tag: 'C' as const },
      { text: { tr: "Kısa ve net konuşurum.", en: "I speak briefly and clearly." }, tag: 'D' as const },
      { text: { tr: "Dinleyicilere yakın olurum.", en: "I am close to the audience." }, tag: 'S' as const }
    ]
  },
  {
    id: 6,
    text: { tr: "Bir karar verirken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when making a decision?" },
    options: [
      { text: { tr: "Hızlıca karar veririm.", en: "I make quick decisions." }, tag: 'D' as const },
      { text: { tr: "Başkalarının fikrini alırım.", en: "I get others' opinions." }, tag: 'I' as const },
      { text: { tr: "Detaylı analiz yaparım.", en: "I do detailed analysis." }, tag: 'C' as const },
      { text: { tr: "Düşünceli ve sabırlı olurum.", en: "I am thoughtful and patient." }, tag: 'S' as const }
    ]
  },
  {
    id: 7,
    text: { tr: "Bir projede rol alırken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes your role in a project?" },
    options: [
      { text: { tr: "Liderlik yapmayı severim.", en: "I like to lead." }, tag: 'D' as const },
      { text: { tr: "Takımın moralini yüksek tutarım.", en: "I keep the team's morale high." }, tag: 'I' as const },
      { text: { tr: "Dengeli ve destekleyici olurum.", en: "I am balanced and supportive." }, tag: 'S' as const },
      { text: { tr: "Kurallara ve plana sadık kalırım.", en: "I stick to rules and plans." }, tag: 'C' as const }
    ]
  },
  {
    id: 8,
    text: { tr: "Stresli bir durumda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you under stress?" },
    options: [
      { text: { tr: "Kontrolü ele alırım.", en: "I take control." }, tag: 'D' as const },
      { text: { tr: "Sakinliğimi korurum.", en: "I remain calm." }, tag: 'S' as const },
      { text: { tr: "Çözüm için kurallara başvururum.", en: "I refer to rules for solutions." }, tag: 'C' as const },
      { text: { tr: "Pozitif bir atmosfer yaratmaya çalışırım.", en: "I try to create a positive atmosphere." }, tag: 'I' as const }
    ]
  },
  {
    id: 9,
    text: { tr: "Bir ekipte seni en çok ve en az tanımlayan özellik hangisi?", en: "Which of the following best and least describes you in a team?" },
    options: [
      { text: { tr: "İletişim kurmayı kolaylaştırırım.", en: "I facilitate communication." }, tag: 'I' as const },
      { text: { tr: "Destekleyici ve sadığım.", en: "I am supportive and loyal." }, tag: 'S' as const },
      { text: { tr: "Hedefe odaklanırım.", en: "I focus on the goal." }, tag: 'D' as const },
      { text: { tr: "Detaylara dikkat ederim.", en: "I pay attention to details." }, tag: 'C' as const }
    ]
  },
  {
    id: 10,
    text: { tr: "Bir işte başarıya ulaşmak için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes your way to success?" },
    options: [
      { text: { tr: "Yaratıcı fikirler üretirim.", en: "I generate creative ideas." }, tag: 'I' as const },
      { text: { tr: "Planlı ve düzenli ilerlerim.", en: "I proceed in a planned and organized way." }, tag: 'C' as const },
      { text: { tr: "Kararlı ve hızlı hareket ederim.", en: "I act decisively and quickly." }, tag: 'D' as const },
      { text: { tr: "Takımın desteğini önemserim.", en: "I value team support." }, tag: 'S' as const }
    ]
  },
  {
    id: 11,
    text: { tr: "Bir problemi çözerken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when solving a problem?" },
    options: [
      { text: { tr: "Hızlıca çözüm bulurum.", en: "I quickly find a solution." }, tag: 'D' as const },
      { text: { tr: "Başkalarını motive ederim.", en: "I motivate others." }, tag: 'I' as const },
      { text: { tr: "Süreci sabırla takip ederim.", en: "I patiently follow the process." }, tag: 'S' as const },
      { text: { tr: "Detaylı analiz yaparım.", en: "I analyze details thoroughly." }, tag: 'C' as const }
    ]
  },
  {
    id: 12,
    text: { tr: "Bir ekip çalışmasında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in teamwork?" },
    options: [
      { text: { tr: "İnsanları bir araya getiririm.", en: "I bring people together." }, tag: 'I' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Hedefe ulaşmak için yönlendiririm.", en: "I direct towards the goal." }, tag: 'D' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 13,
    text: { tr: "Bir değişiklik olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is a change?" },
    options: [
      { text: { tr: "Hızlıca uyum sağlarım.", en: "I adapt quickly." }, tag: 'D' as const },
      { text: { tr: "Düzeni korumaya çalışırım.", en: "I try to maintain order." }, tag: 'S' as const },
      { text: { tr: "Yaratıcı çözümler üretirim.", en: "I create creative solutions." }, tag: 'I' as const },
      { text: { tr: "Kuralları gözden geçiririm.", en: "I review the rules." }, tag: 'C' as const }
    ]
  },
  {
    id: 14,
    text: { tr: "Bir hedef belirlerken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when setting a goal?" },
    options: [
      { text: { tr: "Net ve iddialı hedefler koyarım.", en: "I set clear and ambitious goals." }, tag: 'D' as const },
      { text: { tr: "Takımın fikrini alırım.", en: "I get the team's opinion." }, tag: 'S' as const },
      { text: { tr: "Herkesi motive ederim.", en: "I motivate everyone." }, tag: 'I' as const },
      { text: { tr: "Gerçekçi ve ölçülebilir hedefler koyarım.", en: "I set realistic and measurable goals." }, tag: 'C' as const }
    ]
  },
  {
    id: 15,
    text: { tr: "Bir sunum yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when presenting?" },
    options: [
      { text: { tr: "Etkileyici ve enerjik olurum.", en: "I am impressive and energetic." }, tag: 'I' as const },
      { text: { tr: "Hazırlıklı ve düzenli olurum.", en: "I am prepared and organized." }, tag: 'C' as const },
      { text: { tr: "Kısa ve net konuşurum.", en: "I speak briefly and clearly." }, tag: 'D' as const },
      { text: { tr: "Dinleyicilere yakın olurum.", en: "I am close to the audience." }, tag: 'S' as const }
    ]
  },
  {
    id: 16,
    text: { tr: "Bir hata yaptığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when you make a mistake?" },
    options: [
      { text: { tr: "Hemen çözüm bulurum.", en: "I immediately find a solution." }, tag: 'D' as const },
      { text: { tr: "Durumu analiz ederim.", en: "I analyze the situation." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const },
      { text: { tr: "Mizah ile yaklaşırım.", en: "I approach with humor." }, tag: 'I' as const }
    ]
  },
  {
    id: 17,
    text: { tr: "Bir projede sorumluluk alırken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when taking responsibility?" },
    options: [
      { text: { tr: "Liderliği üstlenirim.", en: "I take the lead." }, tag: 'D' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Takımın motivasyonunu artırırım.", en: "I increase the team's motivation." }, tag: 'I' as const },
      { text: { tr: "İstikrarlı ve güvenilir olurum.", en: "I am consistent and reliable." }, tag: 'S' as const }
    ]
  },
  {
    id: 18,
    text: { tr: "Bir tartışmada hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in a discussion?" },
    options: [
      { text: { tr: "Net ve kararlı olurum.", en: "I am clear and determined." }, tag: 'D' as const },
      { text: { tr: "Ortamı yumuşatırım.", en: "I soften the atmosphere." }, tag: 'I' as const },
      { text: { tr: "Kurallara ve mantığa dayanırım.", en: "I rely on rules and logic." }, tag: 'C' as const },
      { text: { tr: "Sakin ve anlayışlı olurum.", en: "I am calm and understanding." }, tag: 'S' as const }
    ]
  },
  {
    id: 19,
    text: { tr: "Bir yenilik olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is innovation?" },
    options: [
      { text: { tr: "Hemen denerim.", en: "I try it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler üretirim.", en: "I generate creative ideas." }, tag: 'I' as const },
      { text: { tr: "Düzenli ve planlı uygularım.", en: "I apply it in an organized and planned way." }, tag: 'C' as const },
      { text: { tr: "Değişime uyum sağlarım.", en: "I adapt to change." }, tag: 'S' as const }
    ]
  },
  {
    id: 20,
    text: { tr: "Bir iş paylaşımında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in task sharing?" },
    options: [
      { text: { tr: "Görevleri hızlıca üstlenirim.", en: "I quickly take on tasks." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarını motive ederim.", en: "I motivate teammates." }, tag: 'I' as const },
      { text: { tr: "Dengeli ve adil davranırım.", en: "I act balanced and fair." }, tag: 'S' as const },
      { text: { tr: "Görevleri planlar ve takip ederim.", en: "I plan and track tasks." }, tag: 'C' as const }
    ]
  },
  {
    id: 21,
    text: { tr: "Bir başarı elde ettiğinde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when you achieve success?" },
    options: [
      { text: { tr: "Yeni hedefler koyarım.", en: "I set new goals." }, tag: 'D' as const },
      { text: { tr: "Takımı kutlarım.", en: "I celebrate with the team." }, tag: 'I' as const },
      { text: { tr: "Süreci analiz ederim.", en: "I analyze the process." }, tag: 'C' as const },
      { text: { tr: "İstikrarı sürdürmeye çalışırım.", en: "I try to maintain stability." }, tag: 'S' as const }
    ]
  },
  {
    id: 22,
    text: { tr: "Bir kriz anında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in a crisis?" },
    options: [
      { text: { tr: "Hızlıca karar veririm.", en: "I make quick decisions." }, tag: 'D' as const },
      { text: { tr: "Kurallara sadık kalırım.", en: "I stick to the rules." }, tag: 'C' as const },
      { text: { tr: "Takımı sakinleştiririm.", en: "I calm the team." }, tag: 'S' as const },
      { text: { tr: "Motive edici konuşmalar yaparım.", en: "I give motivational speeches." }, tag: 'I' as const }
    ]
  },
  {
    id: 23,
    text: { tr: "Bir iş planı yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when planning work?" },
    options: [
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "Hedefe ulaşmak için net adımlar belirlerim.", en: "I set clear steps to reach the goal." }, tag: 'D' as const },
      { text: { tr: "Takımın görüşünü alırım.", en: "I get the team's opinion." }, tag: 'S' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const }
    ]
  },
  {
    id: 24,
    text: { tr: "Bir işte motivasyonun düştüğünde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when your motivation drops?" },
    options: [
      { text: { tr: "Kendime yeni hedefler koyarım.", en: "I set new goals for myself." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarımla konuşurum.", en: "I talk to my teammates." }, tag: 'I' as const },
      { text: { tr: "Süreci analiz ederim.", en: "I analyze the process." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const }
    ]
  },
  {
    id: 25,
    text: { tr: "Bir işte sorumluluk paylaşırken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when sharing responsibility?" },
    options: [
      { text: { tr: "Görevleri adil dağıtırım.", en: "I distribute tasks fairly." }, tag: 'S' as const },
      { text: { tr: "Hedefe ulaşmak için yönlendiririm.", en: "I direct towards the goal." }, tag: 'D' as const },
      { text: { tr: "Kurallara uygun hareket ederim.", en: "I act according to the rules." }, tag: 'C' as const },
      { text: { tr: "Takımın motivasyonunu artırırım.", en: "I increase the team's motivation." }, tag: 'I' as const }
    ]
  },
  {
    id: 26,
    text: { tr: "Bir işte yenilik yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when innovating?" },
    options: [
      { text: { tr: "Yaratıcı fikirler üretirim.", en: "I generate creative ideas." }, tag: 'I' as const },
      { text: { tr: "Planlı ve sistemli ilerlerim.", en: "I proceed in a planned and systematic way." }, tag: 'C' as const },
      { text: { tr: "Hızlıca uygularım.", en: "I implement quickly." }, tag: 'D' as const },
      { text: { tr: "Takımın desteğini önemserim.", en: "I value team support." }, tag: 'S' as const }
    ]
  },
  {
    id: 27,
    text: { tr: "Bir işte hata yaptığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when you make a mistake at work?" },
    options: [
      { text: { tr: "Çözüm odaklı olurum.", en: "I am solution-oriented." }, tag: 'D' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const },
      { text: { tr: "Kuralları gözden geçiririm.", en: "I review the rules." }, tag: 'C' as const },
      { text: { tr: "Pozitif yaklaşırım.", en: "I approach positively." }, tag: 'I' as const }
    ]
  },
  {
    id: 28,
    text: { tr: "Bir işte başarıya ulaşmak için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you to achieve success at work?" },
    options: [
      { text: { tr: "Net hedefler koyarım.", en: "I set clear goals." }, tag: 'D' as const },
      { text: { tr: "Takımın desteğini önemserim.", en: "I value team support." }, tag: 'S' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Yaratıcı fikirler üretirim.", en: "I generate creative ideas." }, tag: 'I' as const }
    ]
  },
  {
    id: 29,
    text: { tr: "Bir işte planlama yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when planning at work?" },
    options: [
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "Hedefe ulaşmak için net adımlar belirlerim.", en: "I set clear steps to reach the goal." }, tag: 'D' as const },
      { text: { tr: "Takımın görüşünü alırım.", en: "I get the team's opinion." }, tag: 'S' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const }
    ]
  },
  {
    id: 30,
    text: { tr: "Bir işte motivasyonun düştüğünde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when your motivation drops at work?" },
    options: [
      { text: { tr: "Kendime yeni hedefler koyarım.", en: "I set new goals for myself." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarımla konuşurum.", en: "I talk to my teammates." }, tag: 'I' as const },
      { text: { tr: "Süreci analiz ederim.", en: "I analyze the process." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const }
    ]
  },
  {
    id: 31,
    text: { tr: "Yoğun baskı altında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you under heavy pressure?" },
    options: [
      { text: { tr: "Hızlıca karar veririm.", en: "I make quick decisions." }, tag: 'D' as const },
      { text: { tr: "Pozitif kalmaya çalışırım.", en: "I try to stay positive." }, tag: 'I' as const },
      { text: { tr: "Kurallara daha çok uyarım.", en: "I stick to the rules more." }, tag: 'C' as const },
      { text: { tr: "Sakinliğimi korurum.", en: "I remain calm." }, tag: 'S' as const }
    ]
  },
  {
    id: 32,
    text: { tr: "Bir işte ekipten ayrılmak zorunda kalsan hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you if you had to leave a team?" },
    options: [
      { text: { tr: "Yeni hedeflere odaklanırım.", en: "I focus on new goals." }, tag: 'D' as const },
      { text: { tr: "İletişimi sürdürmeye çalışırım.", en: "I try to maintain communication." }, tag: 'I' as const },
      { text: { tr: "Düzeni ve sistemi devrederim.", en: "I hand over order and system." }, tag: 'C' as const },
      { text: { tr: "Destek olmaya devam ederim.", en: "I continue to be supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 33,
    text: { tr: "Bir işte yeni bir yöntem denenecekse hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when a new method is tried at work?" },
    options: [
      { text: { tr: "Hemen uygularım.", en: "I implement it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const },
      { text: { tr: "Kurallara uygunluğunu kontrol ederim.", en: "I check for compliance with rules." }, tag: 'C' as const },
      { text: { tr: "Takımın alışmasını sağlarım.", en: "I help the team adapt." }, tag: 'S' as const }
    ]
  },
  {
    id: 34,
    text: { tr: "Bir işte çatışma çıktığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is conflict at work?" },
    options: [
      { text: { tr: "Sorunu doğrudan çözerim.", en: "I solve the problem directly." }, tag: 'D' as const },
      { text: { tr: "Ortamı yumuşatırım.", en: "I soften the atmosphere." }, tag: 'I' as const },
      { text: { tr: "Kurallara başvururum.", en: "I refer to the rules." }, tag: 'C' as const },
      { text: { tr: "Herkesi sakinleştiririm.", en: "I calm everyone down." }, tag: 'S' as const }
    ]
  },
  {
    id: 35,
    text: { tr: "Bir işte uzun vadeli plan yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when making long-term plans at work?" },
    options: [
      { text: { tr: "Hedefleri netleştiririm.", en: "I clarify the goals." }, tag: 'D' as const },
      { text: { tr: "Takımın motivasyonunu yüksek tutarım.", en: "I keep the team's motivation high." }, tag: 'I' as const },
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "İstikrarı ve sürekliliği gözetirim.", en: "I ensure stability and continuity." }, tag: 'S' as const }
    ]
  },
  {
    id: 36,
    text: { tr: "Bir işte sonuca ulaşmak için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you to achieve results at work?" },
    options: [
      { text: { tr: "Hızlı ve kararlı hareket ederim.", en: "I act quickly and decisively." }, tag: 'D' as const },
      { text: { tr: "Takımın desteğini önemserim.", en: "I value team support." }, tag: 'S' as const },
      { text: { tr: "Kurallara ve plana sadık kalırım.", en: "I stick to rules and plans." }, tag: 'C' as const },
      { text: { tr: "Yaratıcı çözümler üretirim.", en: "I generate creative solutions." }, tag: 'I' as const }
    ]
  }
];

// 36-question DISC personality inventory (EN)
const discQuestionsEN = discQuestionsTR;

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

// ... existing code ...
// Orijinal array'i kullan, map işlemi yapma
const discQuestionsTRProcessed = discQuestionsTR;
// ... existing code ...

// --- Uygulamanın tamamı aşağıda ---

export default function Page() {
  const { user, userType: contextUserType, setAuthUserType } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [appState, setAppState] = useState<AppState>('login');
  const [discResult, setDiscResult] = useState<any>(null);
  const [expertiseResult, setExpertiseResult] = useState<any>(null);
  const [dashboardKey, setDashboardKey] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<string[] | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [showAVMock, setShowAVMock] = useState(false);

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
  const discQuestions = language === 'tr' ? discQuestionsTRProcessed : discQuestionsEN;
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

  const handleCompanyLogin = (companyData: any) => {
    // Demo için basit bir company login
    console.log('Company login:', companyData);
    setAppState('company-dashboard');
  };

  const handleLogin = (userType?: 'company' | 'individual') => {
    // Demo için basit bir login
    console.log('User login:', userType);
    if (userType === 'company') {
      setAppState('company-dashboard');
    } else {
        setAppState('dashboard');
    }
  };

  // Tüm ekranlarda hamburger menü görünür olacak şekilde üstte render et
    return (
    <>
      <div className="pt-14">
        {user || contextUserType ? <TopBar onModuleSelect={handleModuleSelect} onViewPackages={() => setPremiumUnlocked(true)} premiumUnlocked={premiumUnlocked} onUnlockPremium={() => setPremiumUnlocked(true)} /> : null}
        {!premiumUnlocked && (
          <div className="fixed bottom-4 right-4 z-50">
            <button onClick={() => setPremiumUnlocked(true)} className="px-4 py-2 rounded-lg bg-amber-500 text-white font-bold shadow-lg">Demo Premium'u Aç</button>
          </div>
        )}
        {(() => {
          // Giriş yapılmamışsa login ekranı
          if (!user && !contextUserType) {
            return <LoginScreen onLoginSuccess={(userType) => {
              setAuthUserType(userType || 'individual');
              if (userType === 'company') {
                setAppState('company-dashboard');
              } else {
              setAppState('dashboard');
              }
            }} />;
          }
          // Admin paneli
          if (contextUserType === 'company' && appState === 'admin') {
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="font-semibold mb-1 text-sm">{t.strengths}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.traits.map((trait, i) => <li key={i}>{trait}</li>)}
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="font-semibold mb-1 text-sm">{t.careers}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.careers.map((career, i) => <li key={i}>{career}</li>)}
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 md:col-span-2">
                      <div className="font-semibold mb-1 text-sm">{t.tools}</div>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                        {discData.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                    <div className="font-semibold mb-1 text-sm">{t.analysis}</div>
                    <div className="text-gray-700 text-xs">
                      <b>{t.strengthsLabel}</b> {discData.traits.slice(0,2).join(', ')}<br/>
                      <b>{t.devAreas}</b> {t.devAreasText}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2 w-full">
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 text-sm font-semibold shadow-lg flex-1 min-w-0 flex items-center justify-center gap-2" onClick={() => setAppState('expertise')}>
                        Uzmanlık Analizi (2,99 USD)
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
              const handleModuleRoute = (key: string) => {
                if (key === 'assessment' || key === 'expertise') {
                  setAppState(key as AppState);
                }
              };
              return <CareerDashboard key={dashboardKey} onModuleRoute={handleModuleRoute} />;
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
            case 'login':
              return <LoginScreen onLoginSuccess={handleLogin} />;
            case 'company-login':
              return <CompanyLogin onLogin={handleCompanyLogin} language={language} onLanguageChange={setLanguage} />;
            case 'company-dashboard':
              return <AdminPanel language={language} />;
            default:
              return <CareerDashboard />;
          }
        })()}
                </div>
    </>
  );
}

export const dynamic = "force-dynamic";

console.log("TR Soru sayısı:", discQuestionsTRProcessed.length);
console.log("Array içeriği:", discQuestionsTRProcessed.map((q, i) => ({ index: i, id: q?.id, hasText: !!q?.text, hasOptions: !!q?.options })));
discQuestionsTRProcessed.forEach((q, i) => {
  if (!q) console.error("Eksik soru:", i+1, q);
  if (!q.text || !q.text.tr || !q.text.en) console.error("Eksik text:", i+1, q);
  if (!q.options || q.options.length !== 4) console.error("Eksik/yanlış opsiyon:", i+1, q);
  q.options?.forEach((opt, j) => {
    if (!opt.text || !opt.text.tr || !opt.text.en) console.error(`Soru ${i+1} opsiyon ${j+1} eksik metin:`, opt);
    if (!opt.tag) console.error(`Soru ${i+1} opsiyon ${j+1} eksik tag:`, opt);
  });
});
