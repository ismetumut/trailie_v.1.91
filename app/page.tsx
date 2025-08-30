 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/page.tsx b/app/page.tsx
index 7ec1fa241ceaa790088201d8817e77857fd91345..6aa339574d4e92ea94557847352b01e29e5cf272 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -1,48 +1,41 @@
 "use client";
 
 import { useState, useEffect } from 'react';
 import { useAuth } from '@/contexts/AuthContext';
 import { LoginScreen } from '@/components/auth/LoginScreen';
 import { PersonalityQuestion } from '@/components/assessment/personality-question';
 import { ExpertiseQuestion } from '@/components/assessment/expertise-question';
+import AssessmentResult from '@/components/assessment/AssessmentResult';
+import ExpertiseResults from '@/components/assessment/ExpertiseResults';
 import AdminPanel from '@/components/company/AdminPanel';
 import SimulationIntro from '@/components/simulation/simulation-intro';
 import PricingStrategyTask from '@/components/simulation/pricing-strategy-task';
 import OnepagerTask from '@/components/simulation/onepager-task';
 import PresentationTask from '@/components/simulation/presentation-task';
-import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
 import { Button } from '@/components/ui/button';
-import { Card, CardContent } from '@/components/ui/card';
-import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
-import { Badge } from '@/components/ui/badge';
-import { Menu, Home, User, Briefcase, Target, Users, Settings, LogOut, BarChart3, Bell, UserCircle, Mail, Shield, HelpCircle, TrendingUp, Users2, Palette, Code, Play } from 'lucide-react';
-import AIReport from '@/components/AIReport';
-import AIReportModal from '@/components/AIReportModal';
 import CareerDashboard from '@/components/CareerDashboard';
-import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
-import ModuleMenu from '@/components/ModuleMenu';
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
diff --git a/app/page.tsx b/app/page.tsx
index 7ec1fa241ceaa790088201d8817e77857fd91345..6aa339574d4e92ea94557847352b01e29e5cf272 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -76,86 +69,51 @@ type AppState =
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
 
-const DISC_DESCRIPTIONS = {
-  D: {
-    title: 'Dominant (D)',
-    description: 'Hedef odaklı, hızlı karar veren, liderlik özellikleri baskın kişilerdir. Zorluklardan çekinmez, rekabeti severler.',
-    color: '#ef4444',
-    traits: ['Liderlik', 'Kararlılık', 'Sonuç Odaklılık', 'Cesaret'],
-    careers: ['Yönetici', 'Girişimci', 'Proje Lideri', 'Satış Müdürü'],
-    tools: ['Jira', 'Trello', 'Slack', 'CRM']
-  },
-  I: {
-    title: 'Influencer (I)',
-    description: 'İletişim becerileri yüksek, sosyal, enerjik ve insan ilişkilerinde başarılı kişilerdir. Takım çalışmasını ve motivasyonu artırırlar.',
-    color: '#f59e42',
-    traits: ['İletişim', 'Motivasyon', 'Yaratıcılık', 'İkna Kabiliyeti'],
-    careers: ['Pazarlama Uzmanı', 'Eğitmen', 'Halkla İlişkiler', 'Etkinlik Yöneticisi'],
-    tools: ['Canva', 'Instagram', 'Mailchimp', 'Zoom']
-  },
-  S: {
-    title: 'Steady (S)',
-    description: 'Sakin, sabırlı, güvenilir ve destekleyici kişilerdir. Takımda denge unsuru olurlar, istikrarlıdırlar.',
-    color: '#10b981',
-    traits: ['Sabır', 'Destek', 'Sadakat', 'İstikrar'],
-    careers: ['İK Uzmanı', 'Danışman', 'Koç', 'Müşteri Temsilcisi'],
-    tools: ['Notion', 'Teams', 'Google Drive', 'Zendesk']
-  },
-  C: {
-    title: 'Compliant (C)',
-    description: 'Detaycı, analitik, kuralcı ve mükemmeliyetçi kişilerdir. Planlama ve analizde başarılıdırlar.',
-    color: '#3b82f6',
-    traits: ['Analitik Düşünce', 'Dikkat', 'Planlama', 'Mükemmeliyetçilik'],
-    careers: ['Finans Uzmanı', 'Analist', 'Mühendis', 'Denetçi'],
-    tools: ['Excel', 'Tableau', 'Asana', 'Google Analytics']
-  }
-};
-
-const EXPERTISE_REPORT = {
+  const EXPERTISE_REPORT = {
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
diff --git a/app/page.tsx b/app/page.tsx
index 7ec1fa241ceaa790088201d8817e77857fd91345..6aa339574d4e92ea94557847352b01e29e5cf272 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -655,253 +613,59 @@ const expertiseQuestionsTR = [
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
-  const [showStoreModal, setShowStoreModal] = useState(false);
-  const [aiRoles, setAiRoles] = useState<any[] | null>(null);
-  const [aiLoading, setAiLoading] = useState(false);
-  const [aiError, setAiError] = useState<string | null>(null);
-  const [aiRequested, setAiRequested] = useState(false);
-  const [aiDiscProfile, setAiDiscProfile] = useState<any>(null);
-  const [aiExpertiseProfile, setAiExpertiseProfile] = useState<any>(null);
   const [selectedSimulationRole, setSelectedSimulationRole] = useState<any>(null);
 
 
 
-  useEffect(() => {
-    console.log('AI useEffect tetiklendi', { appState, discResult, expertiseResult, aiRequested });
-    if (
-      appState === 'expertise-results' &&
-      discResult &&
-      expertiseResult &&
-      !aiRequested
-    ) {
-      console.log('AI fetch başlatılıyor', { discResult, expertiseResult });
-      setAiLoading(true);
-      setAiError(null);
-      setAiRequested(true);
-      fetch('/api/ai-role-recommendation', {
-        method: 'POST',
-        headers: { 'Content-Type': 'application/json' },
-        body: JSON.stringify({
-          personalityResults: discResult,
-          expertiseResults: expertiseResult,
-          language
-        })
-      })
-        .then(res => res.json())
-        .then(data => {
-          setAiRoles(data.recommendations || []);
-          setAiLoading(false);
-        })
-        .catch(err => {
-          setAiError('AI önerisi alınamadı.');
-          setAiLoading(false);
-        });
-    }
-    if (appState !== 'expertise-results' && aiRequested) {
-      console.log('AI flag reset');
-      setAiRequested(false);
-      setAiRoles(null);
-      setAiError(null);
-      setAiLoading(false);
-    }
-  }, [appState, discResult, expertiseResult, aiRequested, language]);
-
   // Kişilik envanteri tamamlandığında AI'dan rapor al
-  useEffect(() => {
-    if (appState === 'assessment-result' && discResult && !aiDiscProfile && !aiLoading) {
-      setAiLoading(true);
-      setAiError(null);
-      
-      // DISC sonuçlarını AI için formatla
-      const discData = {
-        scores: discResult.scores,
-        dominant: discResult.dominant,
-        description: discResult.description
-      };
-      
-      fetch('/api/ai-disc-profile', {
-        method: 'POST',
-        headers: { 'Content-Type': 'application/json' },
-        body: JSON.stringify({ discData: JSON.stringify(discData), language }),
-      })
-        .then(async (res) => {
-          if (!res.ok) throw new Error('API error');
-          return await res.json();
-        })
-        .then((profile: any) => {
-          setAiDiscProfile(profile);
-          setAiLoading(false);
-        })
-        .catch((err: any) => {
-          console.error('AI DISC raporu hatası:', err);
-          setAiError('AI kişilik raporu alınamadı.');
-          setAiLoading(false);
-        });
-    }
-    if (appState !== 'assessment-result' && aiDiscProfile) {
-      setAiDiscProfile(null);
-      setAiError(null);
-      setAiLoading(false);
-    }
-  }, [appState, discResult, language]);
-
   // Uzmanlık analizi tamamlandığında AI'dan rapor al
-  useEffect(() => {
-    if (appState === 'expertise-results' && expertiseResult && !aiExpertiseProfile && !aiLoading) {
-      setAiLoading(true);
-      setAiError(null);
-      const expertiseData = JSON.stringify(expertiseResult);
-      const discData = discResult ? JSON.stringify({
-        scores: discResult.scores,
-        dominant: discResult.dominant,
-        description: discResult.description
-      }) : undefined;
-      fetch('/api/ai-expertise-profile', {
-        method: 'POST',
-        headers: { 'Content-Type': 'application/json' },
-        body: JSON.stringify({ expertiseData, discData, language }),
-      })
-        .then(async (res) => {
-          if (!res.ok) throw new Error('API error');
-          return await res.json();
-        })
-        .then((profile: any) => {
-          setAiExpertiseProfile(profile);
-          setAiLoading(false);
-        })
-        .catch((err: any) => {
-          console.error('AI Uzmanlık raporu hatası:', err);
-          setAiError('AI uzmanlık raporu alınamadı.');
-          setAiLoading(false);
-        });
-    }
-    if (appState !== 'expertise-results' && aiExpertiseProfile) {
-      setAiExpertiseProfile(null);
-      setAiError(null);
-      setAiLoading(false);
-    }
-  }, [appState, expertiseResult, discResult, language]);
-
-  // Tüm metinleri iki dilde tanımla
-  const TEXT = {
-    tr: {
-      discResultTitle: '🎯 DISC Kişilik Profiliniz',
-      discResultDesc: 'Kişilik envanterinizin sonuçları aşağıdadır',
-      strengths: '💪 Güçlü Özellikler',
-      careers: 'Uygun Kariyerler',
-      tools: '🛠️ Önerilen Araçlar',
-      analysis: '🔎 Kişilik Analizi',
-      continue: '🚀 Devam Et',
-      home: '🏠 Ana Sayfa',
-      aiReport: '🤖 AI Raporu',
-      strengthsLabel: 'Güçlü Yönler:',
-      devAreas: 'Gelişim Alanları:',
-      devAreasText: 'Esneklik ve spontanlık, Sosyal etkileşim',
-    },
-    en: {
-      discResultTitle: '🎯 Your DISC Personality Profile',
-      discResultDesc: 'Your personality inventory results are below',
-      strengths: '💪 Strengths',
-      careers: 'Suitable Careers',
-      tools: '🛠️ Recommended Tools',
-      analysis: '🔎 Personality Analysis',
-      continue: '🚀 Continue',
-      home: '🏠 Home',
-      aiReport: '🤖 AI Report',
-      strengthsLabel: 'Strengths:',
-      devAreas: 'Development Areas:',
-      devAreasText: 'Flexibility and spontaneity, Social interaction',
-    }
-  };
-
-  // DISC açıklamaları iki dilde
-  const DISC_DESCRIPTIONS_ALL = {
-    tr: DISC_DESCRIPTIONS,
-    en: {
-      D: {
-        title: 'Dominant (D)',
-        description: 'Goal-oriented, quick decision-maker, strong leadership. Not afraid of challenges, loves competition.',
-        color: '#ef4444',
-        traits: ['Leadership', 'Decisiveness', 'Result-Oriented', 'Courage'],
-        careers: ['Manager', 'Entrepreneur', 'Project Leader', 'Sales Manager'],
-        tools: ['Jira', 'Trello', 'Slack', 'CRM']
-      },
-      I: {
-        title: 'Influencer (I)',
-        description: 'High communication skills, social, energetic, successful in human relations. Increases teamwork and motivation.',
-        color: '#f59e42',
-        traits: ['Communication', 'Motivation', 'Creativity', 'Persuasion'],
-        careers: ['Marketing Specialist', 'Trainer', 'PR', 'Event Manager'],
-        tools: ['Canva', 'Instagram', 'Mailchimp', 'Zoom']
-      },
-      S: {
-        title: 'Steady (S)',
-        description: 'Calm, patient, reliable, and supportive. Brings balance to the team, stable.',
-        color: '#10b981',
-        traits: ['Patience', 'Support', 'Loyalty', 'Stability'],
-        careers: ['HR Specialist', 'Consultant', 'Coach', 'Customer Rep'],
-        tools: ['Notion', 'Teams', 'Google Drive', 'Zendesk']
-      },
-      C: {
-        title: 'Compliant (C)',
-        description: 'Detail-oriented, analytical, rule-based, perfectionist. Successful in planning and analysis.',
-        color: '#3b82f6',
-        traits: ['Analytical Thinking', 'Attention', 'Planning', 'Perfectionism'],
-        careers: ['Finance Specialist', 'Analyst', 'Engineer', 'Auditor'],
-        tools: ['Excel', 'Tableau', 'Asana', 'Google Analytics']
-      }
-    }
-  };
-
   // Soru setleri iki dilde
   const discQuestions = language === 'tr' ? discQuestionsTRProcessed : discQuestionsEN;
   const expertiseQuestions = language === 'tr' ? expertiseQuestionsTR : expertiseQuestionsEN;
-  const DISC_DESCRIPTIONS_LANG = DISC_DESCRIPTIONS_ALL[language];
-  const t = TEXT[language];
 
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
diff --git a/app/page.tsx b/app/page.tsx
index 7ec1fa241ceaa790088201d8817e77857fd91345..6aa339574d4e92ea94557847352b01e29e5cf272 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -959,376 +723,115 @@ export default function Page() {
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
-            // AI'dan gelen kişilik raporu ile şablonu doldur
             return (
-              <TooltipProvider>
-                <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
-                  <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
-                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{aiDiscProfile?.title || t.discResultTitle}</h2>
-                    <div className="text-center text-gray-500 mb-4">{t.discResultDesc}</div>
-                    {aiLoading && <div className="text-gray-500 text-center mb-4">Yapay zeka kişilik raporu yükleniyor...</div>}
-                    {aiError && <div className="text-red-500 text-center mb-4">{aiError}</div>}
-                    {aiDiscProfile && (
-                      <>
-                        <div className="flex flex-col items-center mb-6">
-                          <span className="inline-block px-6 py-3 rounded-full text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">{aiDiscProfile.title}</span>
-                          <div className="text-base md:text-lg text-gray-700 mb-4 text-center leading-relaxed max-w-2xl">{aiDiscProfile.description}</div>
-                        </div>
-                        
-                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
-                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm">
-                            <div className="font-bold mb-3 text-blue-800 flex items-center gap-2">
-                              <span className="text-lg">💪</span>
-                              {language === 'tr' ? 'Güçlü Özellikler' : 'Key Traits'}
-                            </div>
-                            <ul className="space-y-2">
-                              {aiDiscProfile.traits.map((trait: string, i: number) => (
-                                <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
-                                  {trait}
-                                </li>
-                              ))}
-                            </ul>
-                          </div>
-                          
-                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-sm">
-                            <div className="font-bold mb-3 text-green-800 flex items-center gap-2">
-                              <span className="text-lg">🎯</span>
-                              {language === 'tr' ? 'Uygun Kariyerler' : 'Suitable Careers'}
-                            </div>
-                            <ul className="space-y-2">
-                              {aiDiscProfile.careers.map((career: string, i: number) => (
-                                <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
-                                  {career}
-                                </li>
-                              ))}
-                            </ul>
-                          </div>
-                        </div>
-                        
-                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 mb-6 shadow-sm">
-                          <div className="font-bold mb-3 text-purple-800 flex items-center gap-2">
-                            <span className="text-lg">🛠️</span>
-                            {language === 'tr' ? 'Önerilen Araçlar' : 'Recommended Tools'}
-                          </div>
-                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
-                            {aiDiscProfile.tools.map((tool: string, i: number) => (
-                              <div key={i} className="bg-white/70 rounded-lg p-3 text-center">
-                                <span className="text-gray-700 text-sm font-medium">{tool}</span>
-                              </div>
-                            ))}
-                          </div>
-                        </div>
-                        
-                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 mb-6 shadow-sm">
-                          <div className="font-bold mb-3 text-amber-800 flex items-center gap-2">
-                            <span className="text-lg">🔎</span>
-                            {language === 'tr' ? 'Kişilik Analizi' : 'Personality Analysis'}
-                          </div>
-                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
-                            <div>
-                              <div className="font-semibold text-amber-800 mb-2">{language === 'tr' ? 'Güçlü Yönler:' : 'Strengths:'}</div>
-                              <ul className="space-y-1">
-                                {aiDiscProfile.analysis.strengths.map((strength: string, i: number) => (
-                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
-                                    {strength}
-                                  </li>
-                                ))}
-                              </ul>
-                            </div>
-                            <div>
-                              <div className="font-semibold text-amber-800 mb-2">{language === 'tr' ? 'Gelişim Alanları:' : 'Development Areas:'}</div>
-                              <ul className="space-y-1">
-                                {aiDiscProfile.analysis.developmentAreas.map((area: string, i: number) => (
-                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
-                                    {area}
-                                  </li>
-                                ))}
-                              </ul>
-                            </div>
-                          </div>
-                        </div>
-                      </>
-                    )}
-                    
-                    {/* Uzmanlık Analizi Butonu */}
-                    <div className="mt-8 text-center">
-                      <Button 
-                        onClick={() => setAppState('expertise')}
-                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
-                      >
-                        <div className="flex items-center gap-3">
-                          <span className="text-xl">🎯</span>
-                          <div className="text-left">
-                            <div className="text-lg font-bold">
-                              {language === 'tr' ? 'Uzmanlık Analizi' : 'Expertise Analysis'}
-                            </div>
-                            <div className="text-sm opacity-90">
-                              {language === 'tr' ? '2,00 USD' : '$2.00'}
-                            </div>
-                          </div>
-                          <span className="text-xl">→</span>
-                        </div>
-                      </Button>
-                      <p className="text-gray-500 text-sm mt-2">
-                        {language === 'tr' 
-                          ? 'Kişilik profilinizi tamamlayın ve kariyer önerilerinizi alın' 
-                          : 'Complete your personality profile and get career recommendations'
-                        }
-                      </p>
-                    </div>
-                  </div>
-                </div>
-              </TooltipProvider>
+              <AssessmentResult
+                discResult={discResult}
+                language={language}
+                onStartExpertise={() => {
+                  setAppState('expertise');
+                  window.scrollTo({ top: 0, behavior: 'smooth' });
+                }}
+              />
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
-                <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] flex flex-col items-center py-6 px-2">
-                  <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
-                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{language === 'tr' ? 'Uzmanlık Analizi Sonuçları' : 'Expertise Analysis Results'}</h2>
-                    <div className="text-center text-gray-500 mb-4">{language === 'tr' ? 'Aldığınız puanlara göre en uygun olduğunuz roller aşağıda listelenmiştir.' : 'The roles you match best with, based on your scores, are listed below.'}</div>
-                    
-                    {aiLoading && <div className="text-gray-500 text-center mb-4">{language === 'tr' ? 'Yapay zeka raporu yükleniyor...' : 'Loading AI report...'}</div>}
-                    {aiError && <div className="text-red-500 text-center mb-4">{aiError}</div>}
-                    
-                    {aiExpertiseProfile && (
-                      <>
-                        {/* Ana Rol */}
-                        <div className="mb-8">
-                          <h3 className="text-xl font-bold text-center mb-4 text-blue-600">{language === 'tr' ? '🎯 Ana Rol Önerisi' : '🎯 Main Role Recommendation'}</h3>
-                          <div
-                            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg cursor-pointer hover:scale-105 transition"
-                            onClick={() => {
-                              setSelectedSimulationRole(aiExpertiseProfile.mainRole);
-                              setAppState('role-simulation');
-                              window.scrollTo({ top: 0, behavior: 'smooth' });
-                            }}
-                          >
-                            <div className="flex items-center justify-between mb-4">
-                              <h4 className="text-2xl font-bold text-blue-800">{aiExpertiseProfile.mainRole.title}</h4>
-                              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
-                                {aiExpertiseProfile.mainRole.matchScore}% Uyum
-                              </div>
-                            </div>
-                            <p className="text-gray-700 mb-4 text-base">{aiExpertiseProfile.mainRole.description}</p>
-                            
-                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
-                              <div className="bg-white/70 rounded-lg p-4">
-                                <h5 className="font-semibold text-blue-800 mb-2">{language === 'tr' ? '📋 Sorumluluklar' : '📋 Responsibilities'}</h5>
-                                <ul className="space-y-1">
-                                  {aiExpertiseProfile.mainRole.responsibilities.map((resp: string, i: number) => (
-                                    <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
-                                      {resp}
-                                    </li>
-                                  ))}
-                                </ul>
-                              </div>
-                              <div className="bg-white/70 rounded-lg p-4">
-                                <h5 className="font-semibold text-blue-800 mb-2">{language === 'tr' ? '🎓 Gereksinimler' : '🎓 Requirements'}</h5>
-                                <ul className="space-y-1">
-                                  {aiExpertiseProfile.mainRole.requirements.map((req: string, i: number) => (
-                                    <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
-                                      {req}
-                                    </li>
-                                  ))}
-                                </ul>
-                              </div>
-                            </div>
-                            
-                            <div className="bg-white/70 rounded-lg p-4">
-                              <h5 className="font-semibold text-blue-800 mb-2">💰 {language === 'tr' ? 'Maaş Aralığı' : 'Salary Range'}</h5>
-                              <p className="text-gray-700 text-lg font-medium">{aiExpertiseProfile.mainRole.salary}</p>
-                            </div>
-                          </div>
-                        </div>
-
-                        {/* Yedek Roller */}
-                        <div className="mb-8">
-                          <h3 className="text-xl font-bold text-center mb-4 text-green-600">{language === 'tr' ? '🔄 Yedek Rol Önerileri' : '🔄 Backup Role Recommendations'}</h3>
-                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
-                            {aiExpertiseProfile.backupRoles.map((role: any, i: number) => (
-                              <div
-                                key={i}
-                                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-md cursor-pointer hover:scale-105 transition"
-                                onClick={() => {
-                                  setSelectedSimulationRole(role);
-                                  setAppState('role-simulation');
-                                  window.scrollTo({ top: 0, behavior: 'smooth' });
-                                }}
-                              >
-                                <div className="flex items-center justify-between mb-3">
-                                  <h4 className="text-lg font-bold text-green-800">{role.title}</h4>
-                                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
-                                    {role.matchScore}%
-                                  </div>
-                                </div>
-                                <p className="text-gray-700 mb-3 text-sm">{role.description}</p>
-                                
-                                <div className="space-y-2 mb-3">
-                                  <div>
-                                    <h5 className="font-semibold text-green-800 text-sm mb-1">{language === 'tr' ? 'Sorumluluklar:' : 'Responsibilities:'}</h5>
-                                    <ul className="space-y-1">
-                                      {role.responsibilities.slice(0, 2).map((resp: string, j: number) => (
-                                        <li key={j} className="text-gray-700 text-xs flex items-center gap-1">
-                                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
-                                          {resp}
-                                        </li>
-                                      ))}
-                                    </ul>
-                                  </div>
-                                </div>
-                                
-                                <div className="bg-white/70 rounded p-2">
-                                  <p className="text-gray-700 text-xs font-medium">{role.salary}</p>
-                                </div>
-                              </div>
-                            ))}
-                          </div>
-                        </div>
-
-                        {/* Analiz */}
-                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg">
-                          <h3 className="text-xl font-bold text-center mb-4 text-amber-800">{language === 'tr' ? '🔎 Kariyer Analizi' : '🔎 Career Analysis'}</h3>
-                          
-                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
-                            <div className="bg-white/70 rounded-lg p-4">
-                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '💪 Güçlü Yönler' : '💪 Strengths'}</h4>
-                              <ul className="space-y-1">
-                                {aiExpertiseProfile.analysis.strengths.map((strength: string, i: number) => (
-                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
-                                    {strength}
-                                  </li>
-                                ))}
-                              </ul>
-                            </div>
-                            
-                            <div className="bg-white/70 rounded-lg p-4">
-                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '📈 Gelişim Alanları' : '📈 Development Areas'}</h4>
-                              <ul className="space-y-1">
-                                {aiExpertiseProfile.analysis.developmentAreas.map((area: string, i: number) => (
-                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
-                                    {area}
-                                  </li>
-                                ))}
-                              </ul>
-                            </div>
-                            
-                            <div className="bg-white/70 rounded-lg p-4">
-                              <h4 className="font-semibold text-amber-800 mb-2">{language === 'tr' ? '🚀 Kariyer Yolu' : '🚀 Career Path'}</h4>
-                              <ul className="space-y-1">
-                                {aiExpertiseProfile.analysis.careerPath.map((step: string, i: number) => (
-                                  <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
-                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
-                                    {step}
-                                  </li>
-                                ))}
-                              </ul>
-                            </div>
-                          </div>
-                        </div>
-                      </>
-                    )}
-                    
-                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6 w-full">
-                      <Button variant="outline" className="px-3 py-2 text-sm font-semibold flex-1 min-w-0" onClick={() => {
-                        setAppState('dashboard');
-                        window.scrollTo({ top: 0, behavior: 'smooth' });
-                      }}>
-                        {language === 'tr' ? '🏠 Ana Sayfa' : '🏠 Home'}
-                      </Button>
-                    </div>
-                  </div>
-                </div>
+                <ExpertiseResults
+                  expertiseResult={expertiseResult}
+                  discResult={discResult}
+                  language={language}
+                  onRoleSelect={(role) => {
+                    setSelectedSimulationRole(role);
+                    setAppState('role-simulation');
+                    window.scrollTo({ top: 0, behavior: 'smooth' });
+                  }}
+                  onGoHome={() => {
+                    setAppState('dashboard');
+                    window.scrollTo({ top: 0, behavior: 'smooth' });
+                  }}
+                />
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
 
EOF
)
