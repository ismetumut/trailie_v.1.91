"use client";
import { useState, useRef, useEffect, RefObject } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ModuleMenu from "./ModuleMenu";
import TopBar from "./TopBar";
import Packages from "./pricing/Packages";
import { Briefcase, Users, GraduationCap, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, UserCircle } from "lucide-react";
import CVCreator from "./cv/CVCreator";
import JobDiscovery from "./jobs/JobDiscovery";
import ProfileMain from "./profile/ProfileMain";
import ProfileMessages from "./profile/ProfileMessages";
import ProfileSettings from "./profile/ProfileSettings";
import ProfileHelp from "./profile/ProfileHelp";
import { CoachingSession } from "./coaching/coaching-session";
import SimulationIntro from "./simulation/simulation-intro";
import PricingStrategyTask from "./simulation/pricing-strategy-task";
import OnepagerTask from "./simulation/onepager-task";
import PresentationTask from "./simulation/presentation-task";
import AISimulationReport from "./AISimulationReport";
import InterviewEvaluation from "./interview/InterviewEvaluation";
import { getUserProgress } from '@/lib/firebase';
import DigitalCareerTwin from './digital-career-twin/DigitalCareerTwin';

export default function CareerDashboard({ onModuleRoute }: { onModuleRoute?: (key: string) => void }) {
  const { user, userType } = useAuth();
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCareerTwin, setShowCareerTwin] = useState(false);

  if (!user && !userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "tr" ? "Giriş Yapın" : "Please Login"}
          </h1>
          <p className="text-gray-600">
            {language === "tr" 
              ? "Dashboard'a erişmek için giriş yapın" 
              : "Please login to access the dashboard"
            }
          </p>
        </div>
      </div>
    );
  }

  const handleModuleSelect = (moduleKey: string) => {
    // Sayfa değişikliğinde en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Akıştan gelen modüller için localStorage'ı set et
    if (moduleKey === 'jobs') {
      localStorage.setItem('fromJobFlow', 'true');
    } else if (moduleKey === 'simulation') {
      localStorage.setItem('fromSimulationFlow', 'true');
    }
    
    setSelectedModule(moduleKey);
    setCurrentView("module");
  };

  const handleViewPackages = () => {
    setCurrentView("packages");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedModule(null);
    // Ana sayfaya dönüşte en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modül yönlendirme fonksiyonu
  const goToModule = (key: string) => {
    // Sayfa değişikliğinde en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (key === 'assessment' || key === 'expertise') {
      if (onModuleRoute) {
        onModuleRoute(key);
        return;
      }
    }
    if (key === 'networking' || key === 'coaching' || key === 'premium') {
      if (onModuleRoute) {
        onModuleRoute(key);
        return;
      } else {
        setSelectedModule(key);
        setCurrentView('module');
        return;
      }
    } else if (key === 'home' || key === 'dashboard') {
      setCurrentView('dashboard');
      setSelectedModule(null);
    } else if (key === 'reports') {
      setSelectedModule('profile');
      setCurrentView('module');
      setTimeout(() => {
        reportsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    } else {
      // Akıştan gelen modüller için localStorage'ı set et
      if (key === 'jobs') {
        localStorage.setItem('fromJobFlow', 'true');
      } else if (key === 'simulation') {
        localStorage.setItem('fromSimulationFlow', 'true');
      }
      
      setSelectedModule(key);
      setCurrentView('module');
    }
  };

  // Modül içeriklerini render et
  const renderModuleContent = () => {
    switch (selectedModule) {
      case 'simulation':
        return <SimulationIntro onStart={() => {
          setSelectedModule('simulation-pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} language={language} />;
      case 'simulation-pricing':
        return <PricingStrategyTask onComplete={() => {
          setSelectedModule('simulation-onepager');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} language={language} />;
      case 'simulation-onepager':
        return <OnepagerTask onComplete={() => {
          setSelectedModule('simulation-presentation');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} language={language} />;
      case 'simulation-presentation':
        return <PresentationTask onComplete={() => {
          setSelectedModule('simulation-complete');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} language={language} />;
      case 'simulation-complete':
        return <AISimulationReport language={language} />;
      case 'cv':
        return <CVCreator language={language} />;
      case 'jobs':
        return <JobDiscovery language={language} />;
      case 'profile':
        return <ProfileMain language={language} reportsRef={reportsRef} />;
      case 'messages':
        return <ProfileMessages language={language} />;
      case 'settings':
        return <ProfileSettings language={language} />;
      case 'help':
        return <ProfileHelp language={language} />;
      case 'coaching':
        return <CoachingSession sessionsLeft={1} onBookSession={() => {}} onBuyAdditional={() => {}} />;
      case 'interview':
        return <InterviewEvaluation language={language} onClose={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      setProgressLoading(true);
      setProgressError(null);
      getUserProgress(user.uid)
        .then(setProgress)
        .catch((e) => {
          console.warn('Firestore error, using empty progress:', e);
          setProgress([]);
        })
        .finally(() => setProgressLoading(false));
    }
  }, [user]);

  if (currentView === "packages") {
    return (
      <div className="min-h-screen bg-background">
        <TopBar onBack={handleBackToDashboard} />
        <Packages language={language} />
      </div>
    );
  }

  if (showCareerTwin) {
    return <DigitalCareerTwin />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar onModuleSelect={goToModule} onViewPackages={handleViewPackages} />
      <div className="container mx-auto px-2 py-6 md:py-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {currentView === 'module' && selectedModule ? (
            <div className="bg-card rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">
                  {selectedModule === "profile" && (language === "tr" ? "Profilim" : "Profile")}
                  {selectedModule === "cv" && (language === "tr" ? "CV Hazırlama" : "CV Builder")}
                  {selectedModule === "jobs" && (language === "tr" ? "İş İlanları" : "Job Board")}
                  {selectedModule === "messages" && (language === "tr" ? "Mesajlar" : "Messages")}
                  {selectedModule === "settings" && (language === "tr" ? "Ayarlar" : "Settings")}
                  {selectedModule === "help" && (language === "tr" ? "Yardım" : "Help")}
                  {selectedModule === "coaching" && (language === "tr" ? "Koçluk" : "Coaching")}
                </h2>
                <button
                  onClick={() => goToModule('home')}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {language === "tr" ? "← Ana Sayfa" : "← Home"}
                </button>
              </div>
              {renderModuleContent() || (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {language === "tr" 
                      ? "Bu modül yakında aktif olacak!" 
                      : "This module will be available soon!"
                    }
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Profil ve AI Önerisi */}
              <div className="bg-card rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
                  <div className="bg-muted rounded-full p-3">
                    <UserCircle className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="text-xl font-bold text-card-foreground">
                    {language === 'tr'
                      ? `Merhaba, ${user?.displayName || user?.email || 'Kullanıcı'}!`
                      : `Hello, ${user?.displayName || user?.email || 'User'}!`}
                  </div>
                  <div className="text-primary text-xs font-semibold">{language === 'tr' ? 'Profil %85 tamamlandı' : 'Profile 85% complete'}</div>
                  <Progress value={85} className="w-32 h-2 bg-muted" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    {language === 'tr'
                      ? 'Kariyer yolculuğunda harika ilerliyorsun! Analitik yönlerinle öne çıkıyor, yeni fırsatlara açıksın.'
                      : 'You are progressing great in your career journey! Your analytical skills stand out, you are open to new opportunities.'}
                  </div>
                </div>
              </div>

              {/* Bugün Ne Yapmalısın? Kutusu */}
              <div className="rounded-2xl bg-accent shadow p-4 md:p-6 flex flex-col gap-3">
                <div className="font-bold text-lg text-accent-foreground flex items-center gap-2 mb-1">🎯 {language === 'tr' ? 'Bugün Ne Yapmalısın?' : 'What Should You Do Today?'}</div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => goToModule('cv')}>{language === 'tr' ? 'AI ile CV Oluştur' : 'Create Your CV with AI'}</Button>
                  <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => goToModule('simulation')}>{language === 'tr' ? 'Simülasyonu Dene' : 'Try Simulation'}</Button>
                  <Button className="bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => goToModule('jobs')}>{language === 'tr' ? '2 Yeni İş Fırsatı Seni Bekliyor' : '2 New Job Opportunities Await You'}</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => setShowCareerTwin(true)}>{language === 'tr' ? 'Dijital Kariyer İkizini Oluştur' : 'Create Digital Career Twin'}</Button>
                </div>
              </div>

              {/* Kariyer Yolculuğu Adımları */}
              <div className="bg-card rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-card-foreground mb-4">{language === 'tr' ? 'Kariyer Yolculuğunuz' : 'Your Career Journey'}</h3>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button type="button" onClick={() => goToModule('assessment')} className="flex flex-col items-center flex-1 min-w-[120px] focus:outline-none group hover:bg-muted/30 rounded-xl transition cursor-pointer">
                    <UserCircle className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-card-foreground">{language === 'tr' ? 'Kişilik Envanteri' : 'Personality Assessment'}</span>
                    <div className="w-full h-1 bg-primary rounded mt-2" />
                  </button>
                  <button type="button" onClick={() => goToModule('expertise')} className="flex flex-col items-center flex-1 min-w-[120px] focus:outline-none group hover:bg-muted/30 rounded-xl transition cursor-pointer">
                    <Award className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-card-foreground">{language === 'tr' ? 'Uzmanlık Analizi' : 'Expertise Analysis'}</span>
                    <div className="w-full h-1 bg-primary rounded mt-2" />
                  </button>
                  <button type="button" onClick={() => goToModule('simulation')} className="flex flex-col items-center flex-1 min-w-[120px] focus:outline-none group hover:bg-muted/30 rounded-xl transition cursor-pointer">
                    <GraduationCap className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-card-foreground">{language === 'tr' ? 'Rol Simülasyonu' : 'Role Simulation'}</span>
                    <div className="w-full h-1 bg-primary rounded mt-2" />
                  </button>
                  <button type="button" onClick={() => goToModule('cv')} className="flex flex-col items-center flex-1 min-w-[120px] focus:outline-none group hover:bg-muted/30 rounded-xl transition cursor-pointer">
                    <FileText className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-card-foreground">{language === 'tr' ? 'CV Hazırlama' : 'CV Builder'}</span>
                    <div className="w-full h-1 bg-primary rounded mt-2" />
                  </button>
                  <button type="button" onClick={() => goToModule('jobs')} className="flex flex-col items-center flex-1 min-w-[120px] focus:outline-none group hover:bg-muted/30 rounded-xl transition cursor-pointer">
                    <Briefcase className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-card-foreground">{language === 'tr' ? 'Başvurular' : 'Applications'}</span>
                    <div className="w-full h-1 bg-primary rounded mt-2" />
                  </button>
                </div>
              </div>

              {/* Hızlı Erişim Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* AI destekli Mülakat Kartı */}
                <div className="group bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                    <UserCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-1">{language === 'tr' ? 'AI destekli Mülakat' : 'AI Interview'}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{language === 'tr' ? 'Gerçekçi bir mülakat deneyimiyle kendini test et ve gelişim alanlarını keşfet.' : 'Test yourself with a realistic interview experience and discover your areas for improvement.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary">3</span>
                    <span className="text-xs text-muted-foreground">{language === 'tr' ? 'deneme hakkı' : 'attempts left'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('interview')}>{language === 'tr' ? 'Mülakatı Başlat' : 'Start Interview'}</Button>
                </div>
                {/* Network Kartı */}
                <div className="group bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-1">{language === 'tr' ? 'Network' : 'Network'}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{language === 'tr' ? 'Alanındaki profesyonellerle bağlantı kur.' : 'Connect with professionals in your field.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary">12</span>
                    <span className="text-xs text-muted-foreground">{language === 'tr' ? 'bağlantı' : 'connections'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('networking')}>{language === 'tr' ? 'Ağını Genişlet' : 'Expand Your Network'}</Button>
                </div>
                {/* Koçluk Kartı */}
                <div className="group bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-1">{language === 'tr' ? 'Koçluk' : 'Coaching'}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{language === 'tr' ? 'Kariyer yolculuğunda profesyonel destek al, hedeflerine daha hızlı ulaş.' : 'Get professional support in your career journey and reach your goals faster.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-primary">1</span>
                    <span className="text-xs text-muted-foreground">{language === 'tr' ? 'aktif seans' : 'active session'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('coaching')}>{language === 'tr' ? 'Koçluk Al' : 'Get Coaching'}</Button>
                </div>
              </div>
            </>
          )}
          {user && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Geçmiş Simülasyonlarınız</h2>
              {progressLoading && <div className="text-gray-500">Yükleniyor...</div>}
              {progressError && <div className="text-red-500">{progressError}</div>}
              {!progressLoading && progress.length === 0 && <div className="text-gray-400">Henüz kayıtlı simülasyonunuz yok.</div>}
              <div className="grid gap-4 md:grid-cols-2">
                {progress.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{item.simulationTitle}</div>
                        <div className="text-xs text-gray-500">{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                        {expanded === item.id ? 'Kapat' : 'Detay'}
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium text-green-700">Güçlü Yönler:</div>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        {item.aiAnalysis?.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                      </ul>
                      <div className="font-medium text-amber-700 mt-2">Gelişim Alanları:</div>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        {item.aiAnalysis?.weaknesses?.map((w: string, i: number) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                    {expanded === item.id && (
                      <div className="mt-3 bg-gray-50 rounded p-3">
                        <div className="font-semibold mb-1">AI Analizi & Eğitim Önerileri</div>
                        <div className="mb-2">
                          <span className="font-medium">Eğitimler:</span>
                          <ul className="list-disc list-inside ml-4 text-sm">
                            {item.aiAnalysis?.trainings?.map((t: any, i: number) => (
                              <li key={i}>
                                <span className="font-medium">{t.title}</span> - <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{t.platform}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-gray-700 text-sm whitespace-pre-line">
                          {JSON.stringify(item.aiAnalysis, null, 2)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 