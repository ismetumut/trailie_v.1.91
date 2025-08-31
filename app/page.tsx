"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { PersonalityQuestion } from '@/components/assessment/personality-question';
import { ExpertiseQuestion } from '@/components/assessment/expertise-question';
import AdminPanel from '@/components/company/AdminPanel';
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
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { saveSimulationResult } from '@/lib/firebase';
import NetworkingPage from '@/components/networking/NetworkingPage';
import CoachingPage from '@/components/coaching/CoachingPage';
import PremiumPage from '@/components/premium/PremiumPage';

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
  | 'company-dashboard' 
  | 'role-simulation'
  | 'networking'
  | 'coaching'
  | 'premium'
  | 'subscription'
  | 'packages'
  | 'payment'
  | 'notifications';

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

// 31 soruluk DISC kişilik envanteri (id: 4, 5, 7, 11, 12 hariç)
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
    id: 6,
    text: { tr: "Bir yenilik olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is innovation?" },
    options: [
      { text: { tr: "Hemen denerim.", en: "I try it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler üretirim.", en: "I generate creative ideas." }, tag: 'I' as const },
      { text: { tr: "Düzenli ve planlı uygularım.", en: "I apply it in an organized and planned way." }, tag: 'C' as const },
      { text: { tr: "Değişime uyum sağlarım.", en: "I adapt to change." }, tag: 'S' as const }
    ]
  },
  {
    id: 8,
    text: { tr: "Bir kriz anında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in a crisis?" },
    options: [
      { text: { tr: "Hızlıca karar veririm.", en: "I make quick decisions." }, tag: 'D' as const },
      { text: { tr: "Kurallara sadık kalırım.", en: "I stick to the rules." }, tag: 'C' as const },
      { text: { tr: "Takımı sakinleştiririm.", en: "I calm the team." }, tag: 'S' as const },
      { text: { tr: "Motive edici konuşmalar yaparım.", en: "I give motivational speeches." }, tag: 'I' as const }
    ]
  },
  {
    id: 9,
    text: { tr: "Bir iş planı yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when planning work?" },
    options: [
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "Hedefe ulaşmak için net adımlar belirlerim.", en: "I set clear steps to reach the goal." }, tag: 'D' as const },
      { text: { tr: "Takımın görüşünü alırım.", en: "I get the team's opinion." }, tag: 'S' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const }
    ]
  },
  {
    id: 10,
    text: { tr: "Bir işte motivasyonun düştüğünde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when your motivation drops?" },
    options: [
      { text: { tr: "Kendime yeni hedefler koyarım.", en: "I set new goals for myself." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarımla konuşurum.", en: "I talk to my teammates." }, tag: 'I' as const },
      { text: { tr: "Süreci analiz ederim.", en: "I analyze the process." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const }
    ]
  },
  {
    id: 13,
    text: { tr: "Bir işte uzun vadeli plan yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when making long-term plans at work?" },
    options: [
      { text: { tr: "Hedefleri netleştiririm.", en: "I clarify the goals." }, tag: 'D' as const },
      { text: { tr: "Takımın motivasyonunu yüksek tutarım.", en: "I keep the team's motivation high." }, tag: 'I' as const },
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "İstikrarı ve sürekliliği gözetirim.", en: "I ensure stability and continuity." }, tag: 'S' as const }
    ]
  },
  // --- EK SORULAR ---
  {
    id: 14,
    text: { tr: "Bir projede sorun çıktığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when a problem arises in a project?" },
    options: [
      { text: { tr: "Çözüm için hemen harekete geçerim.", en: "I take immediate action for a solution." }, tag: 'D' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Detaylı analiz yaparım.", en: "I do a detailed analysis." }, tag: 'C' as const },
      { text: { tr: "Süreci sabırla yönetirim.", en: "I manage the process patiently." }, tag: 'S' as const }
    ]
  },
  {
    id: 15,
    text: { tr: "Bir ekipte yeni biriyle çalışırken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when working with a new team member?" },
    options: [
      { text: { tr: "Hedefleri netleştiririm.", en: "I clarify the goals." }, tag: 'D' as const },
      { text: { tr: "İletişimi güçlendiririm.", en: "I strengthen communication." }, tag: 'I' as const },
      { text: { tr: "Kuralları açıklarım.", en: "I explain the rules." }, tag: 'C' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 16,
    text: { tr: "Yoğun iş temposunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you in a busy work schedule?" },
    options: [
      { text: { tr: "Hızlıca öncelik belirlerim.", en: "I quickly set priorities." }, tag: 'D' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Planlı hareket ederim.", en: "I act in a planned way." }, tag: 'C' as const },
      { text: { tr: "Uyum sağlarım.", en: "I adapt." }, tag: 'S' as const }
    ]
  },
  {
    id: 17,
    text: { tr: "Bir işte değişiklik olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is a change at work?" },
    options: [
      { text: { tr: "Hemen uyum sağlarım.", en: "I adapt immediately." }, tag: 'S' as const },
      { text: { tr: "Yeni fikirler üretirim.", en: "I generate new ideas." }, tag: 'I' as const },
      { text: { tr: "Planı güncellerim.", en: "I update the plan." }, tag: 'C' as const },
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const }
    ]
  },
  {
    id: 18,
    text: { tr: "Bir işte hata yapıldığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when a mistake is made at work?" },
    options: [
      { text: { tr: "Çözüm odaklı yaklaşırım.", en: "I focus on solutions." }, tag: 'D' as const },
      { text: { tr: "Motive edici olurum.", en: "I am motivating." }, tag: 'I' as const },
      { text: { tr: "Detayları incelerim.", en: "I examine the details." }, tag: 'C' as const },
      { text: { tr: "Destek veririm.", en: "I provide support." }, tag: 'S' as const }
    ]
  },
  {
    id: 19,
    text: { tr: "Bir projede liderlik rolü aldığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when you take a leadership role in a project?" },
    options: [
      { text: { tr: "Hedef odaklı olurum.", en: "I am goal-oriented." }, tag: 'D' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Kuralları uygularım.", en: "I enforce the rules." }, tag: 'C' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 20,
    text: { tr: "Bir işte ekip çalışması gerektiğinde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when teamwork is required?" },
    options: [
      { text: { tr: "Liderlik yaparım.", en: "I lead." }, tag: 'D' as const },
      { text: { tr: "İletişimi güçlendiririm.", en: "I strengthen communication." }, tag: 'I' as const },
      { text: { tr: "Planlı hareket ederim.", en: "I act in a planned way." }, tag: 'C' as const },
      { text: { tr: "Uyum sağlarım.", en: "I adapt." }, tag: 'S' as const }
    ]
  },
  {
    id: 21,
    text: { tr: "Bir işte motivasyonun düştüğünde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when your motivation drops at work?" },
    options: [
      { text: { tr: "Yeni hedefler koyarım.", en: "I set new goals." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarımla konuşurum.", en: "I talk to my teammates." }, tag: 'I' as const },
      { text: { tr: "Süreci analiz ederim.", en: "I analyze the process." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const }
    ]
  },
  {
    id: 22,
    text: { tr: "Bir işte uzun vadeli plan yaparken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when making long-term plans at work?" },
    options: [
      { text: { tr: "Hedefleri netleştiririm.", en: "I clarify the goals." }, tag: 'D' as const },
      { text: { tr: "Takımın motivasyonunu yüksek tutarım.", en: "I keep the team's motivation high." }, tag: 'I' as const },
      { text: { tr: "Detaylı ve sistemli plan yaparım.", en: "I make detailed and systematic plans." }, tag: 'C' as const },
      { text: { tr: "İstikrarı ve sürekliliği gözetirim.", en: "I ensure stability and continuity." }, tag: 'S' as const }
    ]
  },
  {
    id: 23,
    text: { tr: "Bir işte başarıya ulaşmak için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you to achieve success at work?" },
    options: [
      { text: { tr: "Hedefe odaklanırım.", en: "I focus on the goal." }, tag: 'D' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Planlı ve sistemli ilerlerim.", en: "I proceed systematically." }, tag: 'C' as const },
      { text: { tr: "Uyumlu ve destekleyici olurum.", en: "I am supportive and cooperative." }, tag: 'S' as const }
    ]
  },
  {
    id: 24,
    text: { tr: "Bir işte yeni bir görev aldığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when you get a new task at work?" },
    options: [
      { text: { tr: "Hemen başlarım.", en: "I start immediately." }, tag: 'D' as const },
      { text: { tr: "Takım arkadaşlarımla paylaşırım.", en: "I share with teammates." }, tag: 'I' as const },
      { text: { tr: "Plan yaparım.", en: "I make a plan." }, tag: 'C' as const },
      { text: { tr: "Destek isterim.", en: "I ask for support." }, tag: 'S' as const }
    ]
  },
  {
    id: 25,
    text: { tr: "Bir işte zorlukla karşılaştığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when facing a challenge at work?" },
    options: [
      { text: { tr: "Çözüm üretirim.", en: "I produce solutions." }, tag: 'D' as const },
      { text: { tr: "Motive edici olurum.", en: "I am motivating." }, tag: 'I' as const },
      { text: { tr: "Detaylı analiz yaparım.", en: "I do detailed analysis." }, tag: 'C' as const },
      { text: { tr: "Süreci sabırla yönetirim.", en: "I manage the process patiently." }, tag: 'S' as const }
    ]
  },
  {
    id: 26,
    text: { tr: "Bir işte ekip içinde anlaşmazlık olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is a disagreement in the team?" },
    options: [
      { text: { tr: "Çözüm odaklı olurum.", en: "I am solution-oriented." }, tag: 'D' as const },
      { text: { tr: "İletişimi güçlendiririm.", en: "I strengthen communication." }, tag: 'I' as const },
      { text: { tr: "Kuralları hatırlatırım.", en: "I remind the rules." }, tag: 'C' as const },
      { text: { tr: "Ortamı yumuşatırım.", en: "I ease the atmosphere." }, tag: 'S' as const }
    ]
  },
  {
    id: 27,
    text: { tr: "Bir işte yeni bir yöntem deneneceğinde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when a new method is tried at work?" },
    options: [
      { text: { tr: "Hemen uygularım.", en: "I apply it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const },
      { text: { tr: "Planlı uygularım.", en: "I apply it systematically." }, tag: 'C' as const },
      { text: { tr: "Uyum sağlarım.", en: "I adapt." }, tag: 'S' as const }
    ]
  },
  {
    id: 28,
    text: { tr: "Bir işte zaman baskısı olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you under time pressure at work?" },
    options: [
      { text: { tr: "Hızlı karar veririm.", en: "I make quick decisions." }, tag: 'D' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Planı uygularım.", en: "I follow the plan." }, tag: 'C' as const },
      { text: { tr: "Sakin kalırım.", en: "I stay calm." }, tag: 'S' as const }
    ]
  },
  {
    id: 29,
    text: { tr: "Bir işte ekip başarısı için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you for team success at work?" },
    options: [
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const },
      { text: { tr: "Takımın moralini yüksek tutarım.", en: "I keep the team's morale high." }, tag: 'I' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 30,
    text: { tr: "Bir işte yenilikçi bir fikir ortaya atıldığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when an innovative idea is proposed at work?" },
    options: [
      { text: { tr: "Hemen uygularım.", en: "I apply it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const },
      { text: { tr: "Planlı uygularım.", en: "I apply it systematically." }, tag: 'C' as const },
      { text: { tr: "Uyum sağlarım.", en: "I adapt." }, tag: 'S' as const }
    ]
  },
  {
    id: 31,
    text: { tr: "Bir işte ekip içinde destek gerektiğinde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when support is needed in the team?" },
    options: [
      { text: { tr: "Yardım teklif ederim.", en: "I offer help." }, tag: 'S' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Kuralları hatırlatırım.", en: "I remind the rules." }, tag: 'C' as const },
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const }
    ]
  },
  {
    id: 32,
    text: { tr: "Bir işte detaylara dikkat edilmesi gerektiğinde hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when attention to detail is needed at work?" },
    options: [
      { text: { tr: "Detaylara odaklanırım.", en: "I focus on details." }, tag: 'C' as const },
      { text: { tr: "Takımı motive ederim.", en: "I motivate the team." }, tag: 'I' as const },
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 33,
    text: { tr: "Bir işte ekip içinde iletişim kurarken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when communicating in the team?" },
    options: [
      { text: { tr: "Açık ve net olurum.", en: "I am clear and direct." }, tag: 'D' as const },
      { text: { tr: "Motivasyon sağlarım.", en: "I provide motivation." }, tag: 'I' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 34,
    text: { tr: "Bir işte ekip içinde değişiklik olduğunda hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when there is a change in the team?" },
    options: [
      { text: { tr: "Hemen uyum sağlarım.", en: "I adapt immediately." }, tag: 'S' as const },
      { text: { tr: "Yeni fikirler üretirim.", en: "I generate new ideas." }, tag: 'I' as const },
      { text: { tr: "Planı güncellerim.", en: "I update the plan." }, tag: 'C' as const },
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const }
    ]
  },
  {
    id: 35,
    text: { tr: "Bir işte ekip başarısı için hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you for team success at work?" },
    options: [
      { text: { tr: "Yönlendirici olurum.", en: "I take the lead." }, tag: 'D' as const },
      { text: { tr: "Takımın moralini yüksek tutarım.", en: "I keep the team's morale high." }, tag: 'I' as const },
      { text: { tr: "Kurallara uyarım.", en: "I follow the rules." }, tag: 'C' as const },
      { text: { tr: "Destekleyici olurum.", en: "I am supportive." }, tag: 'S' as const }
    ]
  },
  {
    id: 36,
    text: { tr: "Bir işte yenilikçi bir fikir ortaya atıldığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when an innovative idea is proposed at work?" },
    options: [
      { text: { tr: "Hemen uygularım.", en: "I apply it immediately." }, tag: 'D' as const },
      { text: { tr: "Yaratıcı fikirler eklerim.", en: "I add creative ideas." }, tag: 'I' as const },
      { text: { tr: "Planlı uygularım.", en: "I apply it systematically." }, tag: 'C' as const },
      { text: { tr: "Uyum sağlarım.", en: "I adapt." }, tag: 'S' as const }
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
  const { user, userType, setAuthUserType } = useAuth();
  

  const { language, setLanguage } = useLanguage();
  const [appState, setAppState] = useState<AppState>('login');
  const [discResult, setDiscResult] = useState<any>(null);
  const [expertiseResult, setExpertiseResult] = useState<any>(null);
  const [dashboardKey, setDashboardKey] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<string[] | null>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(true);
  const [showAVMock, setShowAVMock] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [aiRoles, setAiRoles] = useState<any[] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiRequested, setAiRequested] = useState(false);
  const [aiDiscProfile, setAiDiscProfile] = useState<any>(null);
  const [aiExpertiseProfile, setAiExpertiseProfile] = useState<any>(null);
  const [selectedSimulationRole, setSelectedSimulationRole] = useState<any>(null);



  useEffect(() => {
    console.log('AI useEffect tetiklendi', { appState, discResult, expertiseResult, aiRequested });
    if (
      appState === 'expertise-results' &&
      discResult &&
      expertiseResult &&
      !aiRequested
    ) {
      console.log('AI fetch başlatılıyor', { discResult, expertiseResult });
      setAiLoading(true);
      setAiError(null);
      setAiRequested(true);
      fetch('/api/ai-role-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalityResults: discResult,
          expertiseResults: expertiseResult,
          language
        })
      })
        .then(res => res.json())
        .then(data => {
          setAiRoles(data.recommendations || []);
          setAiLoading(false);
        })
        .catch(err => {
          setAiError('AI önerisi alınamadı.');
          setAiLoading(false);
        });
    }
    if (appState !== 'expertise-results' && aiRequested) {
      console.log('AI flag reset');
      setAiRequested(false);
      setAiRoles(null);
      setAiError(null);
      setAiLoading(false);
    }
  }, [appState, discResult, expertiseResult, aiRequested, language]);

  // Kişilik envanteri tamamlandığında AI'dan rapor al
  useEffect(() => {
    if (appState === 'assessment-result' && discResult && !aiDiscProfile && !aiLoading) {
      setAiLoading(true);
      setAiError(null);
      
      // DISC sonuçlarını AI için formatla
      const discData = {
        scores: discResult.scores,
        dominant: discResult.dominant,
        description: discResult.description
      };
      
      fetch('/api/ai-disc-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discData: JSON.stringify(discData), language }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'API error');
          }
          return await res.json();
        })
        .then((profile: any) => {
          setAiDiscProfile(profile);
          setAiLoading(false);
        })
        .catch((err: any) => {
          console.error('AI DISC raporu hatası:', err);
          let errorMessage = 'AI kişilik raporu alınamadı.';
          
          if (err.message?.includes('API anahtarı') || err.message?.includes('OpenAI API anahtarı') || err.message?.includes('yapılandırılmamış')) {
            errorMessage = 'AI kişilik raporu alınamadı. OpenAI API anahtarı yapılandırılmamış. Lütfen sistem yöneticisine başvurun.';
          } else if (err.message?.includes('DISC verisi gerekli')) {
            errorMessage = 'Kişilik envanteri verileri eksik. Lütfen envanteri tekrar tamamlayın.';
          } else {
            errorMessage = 'AI kişilik raporu alınamadı. Lütfen daha sonra tekrar deneyin.';
          }
          
          setAiError(errorMessage);
          setAiLoading(false);
        });
    }
    if (appState !== 'assessment-result' && aiDiscProfile) {
      setAiDiscProfile(null);
      setAiError(null);
      setAiLoading(false);
    }
  }, [appState, discResult, language]);

  // Uzmanlık analizi tamamlandığında AI'dan rapor al
  useEffect(() => {
    if (appState === 'expertise-results' && expertiseResult && !aiExpertiseProfile && !aiLoading) {
      setAiLoading(true);
      setAiError(null);
      const expertiseData = JSON.stringify(expertiseResult);
      const discData = discResult ? JSON.stringify({
        scores: discResult.scores,
        dominant: discResult.dominant,
        description: discResult.description
      }) : undefined;
      fetch('/api/ai-expertise-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertiseData, discData, language }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('API error');
          return await res.json();
        })
        .then((profile: any) => {
          setAiExpertiseProfile(profile);
          setAiLoading(false);
        })
        .catch((err: any) => {
          console.error('AI Uzmanlık raporu hatası:', err);
          setAiError('AI uzmanlık raporu alınamadı.');
          setAiLoading(false);
        });
    }
    if (appState !== 'expertise-results' && aiExpertiseProfile) {
      setAiExpertiseProfile(null);
      setAiError(null);
      setAiLoading(false);
    }
  }, [appState, expertiseResult, discResult, language]);

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
    // Sayfa değişikliğinde en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
        setAppState('networking');
        break;
      case 'coaching':
        setAppState('coaching');
        break;
      case 'dashboard':
        setAppState('dashboard');
        setDashboardKey(Math.random());
        break;
      default:
        setAppState('dashboard');
    }
  };

  const handleCompanyLogin = async (companyData: any) => {
    setAppState('admin');
    // Company login sonrası en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userType?: 'company' | 'individual') => {
    // Demo için basit bir login
    if (userType === 'company') {
      setAppState('company-dashboard');
    } else {
        setAppState('dashboard');
    }
    // Login sonrası en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  // Tüm ekranlarda hamburger menü görünür olacak şekilde üstte render et
    return (
    <>
      <div className="pt-14">
        {user || userType ? <TopBar onModuleSelect={handleModuleSelect} onViewPackages={() => setPremiumUnlocked(true)} premiumUnlocked={true} onUnlockPremium={() => setPremiumUnlocked(true)} /> : null}
        {(() => {
          // Giriş yapılmamışsa login ekranı
          if (!user && !userType) {
            return <LoginScreen onLoginSuccess={(loginUserType) => {
              setAuthUserType(loginUserType || 'individual');
              if (loginUserType === 'company') {
                setAppState('admin');
              } else {
                setAppState('dashboard');
              }
              // Login sonrası en üste kaydır
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />;
          }
          // Admin paneli
          if (userType === 'company' && appState === 'admin') {
            return <AdminPanel />;
          }
          // Personality Assessment Sonuç Ekranı
          if (appState === 'assessment-result' && discResult) {
            // AI'dan gelen kişilik raporu ile şablonu doldur
            return (
              <TooltipProvider>
                <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
                  <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{aiDiscProfile?.title || t.discResultTitle}</h2>
                    <div className="text-center text-gray-500 mb-4">{t.discResultDesc}</div>
                    {aiLoading && <div className="text-gray-500 text-center mb-4">Yapay zeka kişilik raporu yükleniyor...</div>}
                    {aiError && <div className="text-red-500 text-center mb-4">{aiError}</div>}
                    {aiDiscProfile && (
                      <>
                        <div className="flex flex-col items-center mb-6">
                          <span className="inline-block px-6 py-3 rounded-full text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">{aiDiscProfile.title}</span>
                          <div className="text-base md:text-lg text-gray-700 mb-4 text-center leading-relaxed max-w-2xl">{aiDiscProfile.description}</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm">
                            <div className="font-bold mb-3 text-blue-800 flex items-center gap-2">
                              <span className="text-lg">💪</span>
                              {language === 'tr' ? 'Güçlü Özellikler' : 'Key Traits'}
                            </div>
                            <ul className="space-y-2">
                              {aiDiscProfile.traits.map((trait: string, i: number) => (
                                <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  {trait}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
                            <div className="font-bold mb-3 text-green-800 flex items-center gap-2">
                              <span className="text-lg">🎯</span>
                              {language === 'tr' ? 'Uygun Kariyerler' : 'Suitable Careers'}
                            </div>
                            <ul className="space-y-2">
                              {aiDiscProfile.careers.map((career: string, i: number) => (
                                <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  {career}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 mb-6 shadow-sm">
                          <div className="font-bold mb-3 text-purple-800 flex items-center gap-2">
                            <span className="text-lg">🛠️</span>
                            {language === 'tr' ? 'Önerilen Araçlar' : 'Recommended Tools'}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {aiDiscProfile.tools.map((tool: string, i: number) => (
                              <div key={i} className="bg-white/70 rounded-lg p-3 text-center">
                                <span className="text-gray-700 text-sm font-medium">{tool}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 mb-6 shadow-sm">
                          <div className="font-bold mb-3 text-amber-800 flex items-center gap-2">
                            <span className="text-lg">🔎</span>
                            {language === 'tr' ? 'Kişilik Analizi' : 'Personality Analysis'}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="font-semibold text-amber-800 mb-2">{language === 'tr' ? 'Güçlü Yönler:' : 'Strengths:'}</div>
                              <ul className="space-y-1">
                                {aiDiscProfile.analysis.strengths.map((strength: string, i: number) => (
                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="font-semibold text-amber-800 mb-2">{language === 'tr' ? 'Gelişim Alanları:' : 'Development Areas:'}</div>
                              <ul className="space-y-1">
                                {aiDiscProfile.analysis.developmentAreas.map((area: string, i: number) => (
                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    {area}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Uzmanlık Analizi Butonu */}
                    <div className="mt-8 text-center">
                      <Button 
                        onClick={() => setAppState('expertise')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🎯</span>
                          <div className="text-left">
                            <div className="text-lg font-bold">
                              {language === 'tr' ? 'Uzmanlık Analizi' : 'Expertise Analysis'}
                            </div>
                            <div className="text-sm opacity-90">
                              {language === 'tr' ? '2,00 USD' : '$2.00'}
                            </div>
                          </div>
                          <span className="text-xl">→</span>
                        </div>
                      </Button>
                      <p className="text-gray-500 text-sm mt-2">
                        {language === 'tr' 
                          ? 'Kişilik profilinizi tamamlayın ve kariyer önerilerinizi alın' 
                          : 'Complete your personality profile and get career recommendations'
                        }
                      </p>
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
                } else if (key === 'networking' || key === 'coaching' || key === 'premium') {
                  setAppState(key as AppState);
                }
                // Modül geçişinde en üste kaydır
                window.scrollTo({ top: 0, behavior: 'smooth' });
              };
              return <CareerDashboard key={dashboardKey} onModuleRoute={handleModuleRoute} />;
            case 'assessment':
              return <PersonalityQuestion key={language} questions={discQuestions} onComplete={(_answers, discProfile) => { 
                setDiscResult(discProfile); 
                setAppState('assessment-result'); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
            case 'expertise':
              return <ExpertiseQuestion key={language} onComplete={(result: { topRoles: { role: string; score: number }[]; allScores: Record<string, number> }) => { 
                setExpertiseResult(result); 
                setAppState('expertise-results'); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
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
              return (
                <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
                  <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{language === 'tr' ? 'Uzmanlık Analizi Sonuçları' : 'Expertise Analysis Results'}</h2>
                    <div className="text-center text-gray-500 mb-4">{language === 'tr' ? 'Aldığınız puanlara göre en uygun olduğunuz roller aşağıda listelenmiştir.' : 'The roles you match best with, based on your scores, are listed below.'}</div>
                    
                    {aiLoading && <div className="text-gray-500 text-center mb-4">{language === 'tr' ? 'Yapay zeka raporu yükleniyor...' : 'Loading AI report...'}</div>}
                    {aiError && <div className="text-red-500 text-center mb-4">{aiError}</div>}
                    
                    {aiExpertiseProfile && (
                      <>
                        {/* Ana Rol */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-center mb-4 text-blue-600">{language === 'tr' ? '🎯 Ana Rol Önerisi' : '🎯 Main Role Recommendation'}</h3>
                          <div
                            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg cursor-pointer hover:scale-105 transition"
                            onClick={() => {
                              setSelectedSimulationRole(aiExpertiseProfile.mainRole);
                              setAppState('role-simulation');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-2xl font-bold text-blue-800">{aiExpertiseProfile.mainRole.title}</h4>
                              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {aiExpertiseProfile.mainRole.matchScore}% Uyum
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4 text-base">{aiExpertiseProfile.mainRole.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-white/70 rounded-lg p-4">
                                <h5 className="font-semibold text-blue-800 mb-2">{language === 'tr' ? '📋 Sorumluluklar' : '📋 Responsibilities'}</h5>
                                <ul className="space-y-1">
                                  {aiExpertiseProfile.mainRole.responsibilities.map((resp: string, i: number) => (
                                    <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-white/70 rounded-lg p-4">
                                <h5 className="font-semibold text-blue-800 mb-2">{language === 'tr' ? '🎓 Gereksinimler' : '🎓 Requirements'}</h5>
                                <ul className="space-y-1">
                                  {aiExpertiseProfile.mainRole.requirements.map((req: string, i: number) => (
                                    <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-white/70 rounded-lg p-4">
                              <h5 className="font-semibold text-blue-800 mb-2">💰 {language === 'tr' ? 'Maaş Aralığı' : 'Salary Range'}</h5>
                              <p className="text-gray-700 text-lg font-medium">{aiExpertiseProfile.mainRole.salary}</p>
                            </div>
                          </div>
                        </div>

                        {/* Yedek Roller */}
                        <div className="mb-8">
                          <h3 className="text-xl font-bold text-center mb-4 text-green-600">{language === 'tr' ? '🔄 Yedek Rol Önerileri' : '🔄 Backup Role Recommendations'}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {aiExpertiseProfile.backupRoles.map((role: any, i: number) => (
                              <div
                                key={i}
                                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-md cursor-pointer hover:scale-105 transition"
                                onClick={() => {
                                  setSelectedSimulationRole(role);
                                  setAppState('role-simulation');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-lg font-bold text-green-800">{role.title}</h4>
                                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                    {role.matchScore}%
                                  </div>
                                </div>
                                <p className="text-gray-700 mb-3 text-sm">{role.description}</p>
                                
                                <div className="space-y-2 mb-3">
                                  <div>
                                    <h5 className="font-semibold text-green-800 text-sm mb-1">{language === 'tr' ? 'Sorumluluklar:' : 'Responsibilities:'}</h5>
                                    <ul className="space-y-1">
                                      {role.responsibilities.slice(0, 2).map((resp: string, j: number) => (
                                        <li key={j} className="text-gray-700 text-xs flex items-center gap-1">
                                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                          {resp}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-white/70 rounded p-2">
                                  <p className="text-gray-700 text-xs font-medium">{role.salary}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Analiz */}
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg">
                          <h3 className="text-xl font-bold text-center mb-4 text-amber-800">{language === 'tr' ? '🔎 Kariyer Analizi' : '🔎 Career Analysis'}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-white/70 rounded-lg p-4">
                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '💪 Güçlü Yönler' : '💪 Strengths'}</h4>
                              <ul className="space-y-1">
                                {aiExpertiseProfile.analysis.strengths.map((strength: string, i: number) => (
                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-white/70 rounded-lg p-4">
                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '📈 Gelişim Alanları' : '📈 Development Areas'}</h4>
                              <ul className="space-y-1">
                                {aiExpertiseProfile.analysis.developmentAreas.map((area: string, i: number) => (
                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    {area}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-white/70 rounded-lg p-4">
                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '🚀 Kariyer Yolu' : '🚀 Career Path'}</h4>
                              <ul className="space-y-1">
                                {aiExpertiseProfile.analysis.careerPath.map((step: string, i: number) => (
                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6 w-full">
                      <Button variant="outline" className="px-3 py-2 text-sm font-semibold flex-1 min-w-0" onClick={() => {
                        setAppState('dashboard');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}>
                        {language === 'tr' ? '🏠 Ana Sayfa' : '🏠 Home'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            case 'simulation':
              return <SimulationIntro onStart={() => {
                setAppState('simulation-pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} language={language} />;
            case 'simulation-pricing':
              return <PricingStrategyTask onComplete={() => {
                setAppState('simulation-onepager');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} language={language} />;
            case 'simulation-onepager':
              return <OnepagerTask onComplete={() => {
                setAppState('simulation-presentation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} language={language} />;
            case 'simulation-presentation':
              return <PresentationTask onComplete={() => {
                setAppState('simulation-complete');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} language={language} />;
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
              return <InterviewPrep language={language} onStartMock={() => {
                setAppState('mock-interview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
            case 'mock-interview':
              return <MockInterview language={language} onFinish={(answers) => { 
                setMockAnswers(answers); 
                setAppState('interview-evaluation'); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
            case 'interview-evaluation':
              return <InterviewEvaluation language={language} onClose={() => {
                setAppState('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
            case 'login':
              return <LoginScreen onLoginSuccess={handleLogin} />;
            case 'company-dashboard':
              return <AdminPanel language={language} />;
            case 'role-simulation':
              if (!selectedSimulationRole) return null;
              return <RoleSimulationScreen role={selectedSimulationRole} language={language} onBack={() => { 
                setAppState('dashboard'); 
                setSelectedSimulationRole(null); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />;
            case 'networking':
              return <NetworkingPage language={language} />;
            case 'coaching':
              return <CoachingPage language={language} />;
            case 'premium':
              return <PremiumPage language={language} />;
            default:
              return <CareerDashboard />;
          }
        })()}
                </div>
    </>
  );
}

export const dynamic = "force-dynamic";

// RoleSimulationScreen component
function RoleSimulationScreen({ role, language, onBack }: { role: any, language: string, onBack: () => void }) {
  const { user } = useAuth();
  const [simulation, setSimulation] = useState<AISimulationScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [submitted, setSubmitted] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Open-ended questions (can be dynamic later)
  const questions = [
    language === 'tr'
      ? 'Bu senaryoda ilk adımınız ne olurdu?'
      : 'What would be your first step in this scenario?',
    language === 'tr'
      ? 'Karşılaşabileceğiniz en büyük zorluk nedir ve nasıl aşarsınız?'
      : 'What is the biggest challenge you might face and how would you overcome it?',
    language === 'tr'
      ? 'Başarıyı nasıl ölçer ve raporlarsınız?'
      : 'How would you measure and report success?'
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSimulation(null);
    setSubmitted(false);
    setAiResult(null);
    setAnswers(['', '', '']);
    setAiLoading(false);
    setAiError(null);
    // generateRoleSimulation yerine API route'a fetch ile istek at
    fetch('/api/ai-role-simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roleTitle: role.title,
        roleDescription: role.description,
        language,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('API error');
        return await res.json();
      })
      .then((result: any) => {
        setSimulation(result);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('AI simülasyon senaryosu alınamadı.');
        setLoading(false);
      });
  }, [role, language]);

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleSubmit = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/ai-simulation-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: simulation?.title,
          description: simulation?.description,
          steps: simulation?.steps,
          answers,
          language,
        }),
      });
      const data = await res.json();
      if (res.ok && data.strengths && data.weaknesses && data.trainings) {
        setAiResult(data);
        setSubmitted(true);
        // Firestore'a kaydet
        if (user && user.uid) {
          try {
            await saveSimulationResult(user.uid, {
              simulationTitle: simulation?.title,
              simulationDescription: simulation?.description,
              steps: simulation?.steps,
              answers,
              aiAnalysis: data,
              language,
            });
            setSaveSuccess(true);
          } catch (e) {
            // Kayıt hatası gösterilebilir
          }
        }
      } else {
        setAiError(data.error || 'AI analiz hatası');
      }
    } catch (err) {
      setAiError('AI analiz servisine ulaşılamadı.');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-6"></div>
          <div className="text-lg text-gray-700">AI simülasyon senaryosu hazırlanıyor...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="text-red-500 text-lg font-bold mb-4">{error}</div>
          <Button onClick={onBack}>{language === 'tr' ? 'Ana Sayfa' : 'Home'}</Button>
        </div>
      </div>
    );
  }
  if (!simulation) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {/* Başlık ve açıklama kartı */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-2">{simulation.title}</h2>
          <p className="text-gray-700 text-lg text-center mb-4">{simulation.description}</p>
        </div>
        {/* Görev adımları kartı */}
        <div className="bg-blue-50 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">{language === 'tr' ? 'Görev Adımları' : 'Task Steps'}</h3>
          <ol className="list-decimal list-inside space-y-2">
            {simulation.steps.map((step, i) => (
              <li key={i} className="text-gray-800 text-base">{step}</li>
            ))}
          </ol>
        </div>
        {/* Açık uçlu sorular kartı */}
        {!submitted && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">{language === 'tr' ? 'Açık Uçlu Sorular' : 'Open-Ended Questions'}</h3>
            {questions.map((q, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="font-medium text-gray-800">{q}</label>
                <textarea
                  className="border rounded-lg p-3 min-h-[80px] text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={answers[idx]}
                  onChange={e => handleAnswerChange(idx, e.target.value)}
                  placeholder={language === 'tr' ? 'Yanıtınızı yazın...' : 'Type your answer...'}
                />
              </div>
            ))}
            {aiError && <div className="text-red-500 text-center font-semibold mt-2">{aiError}</div>}
            <Button
              className="mt-4 px-8 py-3 text-lg font-semibold"
              disabled={answers.some(a => !a.trim()) || aiLoading}
              onClick={handleSubmit}
            >
              {aiLoading ? (language === 'tr' ? 'Analiz Ediliyor...' : 'Analyzing...') : (language === 'tr' ? 'Yanıtları Gönder' : 'Submit Answers')}
            </Button>
            <Button variant="ghost" className="mt-2" onClick={onBack}>{language === 'tr' ? 'Ana Sayfa' : 'Home'}</Button>
          </div>
        )}
        {/* AI Analiz ve Eğitim Önerileri */}
        {submitted && aiResult && (
          <>
            {saveSuccess && (
              <div className="bg-green-100 text-green-800 text-center rounded-lg p-2 font-medium mb-2">
                {language === 'tr' ? 'Sonuçlarınız kaydedildi!' : 'Your results have been saved!'}
              </div>
            )}
            <div className="bg-green-50 rounded-xl shadow p-6 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{language === 'tr' ? 'AI Analizi' : 'AI Analysis'}</h3>
              <div>
                <span className="font-semibold">{language === 'tr' ? 'Güçlü Yönler:' : 'Strengths:'}</span>
                <ul className="list-disc list-inside ml-4">
                  {aiResult.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-semibold">{language === 'tr' ? 'Gelişim Alanları:' : 'Development Areas:'}</span>
                <ul className="list-disc list-inside ml-4">
                  {aiResult.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl shadow p-6 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-amber-700 mb-2">{language === 'tr' ? 'Eğitim Önerileri' : 'Training Suggestions'}</h3>
              <ul className="space-y-2">
                {aiResult.trainings.map((t: any, i: number) => (
                  <li key={i} className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium">{t.title}</span>
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{t.platform}</a>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-6 px-8 py-3 text-lg font-semibold" onClick={onBack}>{language === 'tr' ? 'Ana Sayfa' : 'Home'}</Button>
          </>
        )}
      </div>
    </div>
  );
}
