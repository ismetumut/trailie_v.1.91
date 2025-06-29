"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ModuleMenu from "./ModuleMenu";
import TopBar from "./TopBar";
import ReportsPanel from "./ReportsPanel";
import Packages from "./pricing/Packages";
import { Briefcase, Users, GraduationCap, Award } from "lucide-react";
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

export default function CareerDashboard({ onModuleRoute }: { onModuleRoute?: (key: string) => void }) {
  const { user, userType } = useAuth();
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

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
    setSelectedModule(moduleKey);
    setCurrentView("module");
  };

  const handleViewPackages = () => {
    setCurrentView("packages");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedModule(null);
  };

  // Modül yönlendirme fonksiyonu
  const goToModule = (key: string) => {
    if (key === 'assessment' || key === 'expertise') {
      if (onModuleRoute) {
        onModuleRoute(key);
        return;
      }
    }
    if (key === 'networking' || key === 'coaching') {
      handleViewPackages();
    } else if (key === 'home' || key === 'dashboard') {
      setCurrentView('dashboard');
      setSelectedModule(null);
    } else {
      setSelectedModule(key);
      setCurrentView('module');
    }
  };

  // Modül içeriklerini render et
  const renderModuleContent = () => {
    switch (selectedModule) {
      case 'simulation':
        return <SimulationIntro onStart={() => setSelectedModule('simulation-pricing')} language={language} />;
      case 'simulation-pricing':
        return <PricingStrategyTask onComplete={() => setSelectedModule('simulation-onepager')} language={language} />;
      case 'simulation-onepager':
        return <OnepagerTask onComplete={() => setSelectedModule('simulation-presentation')} language={language} />;
      case 'simulation-presentation':
        return <PresentationTask onComplete={() => setSelectedModule('simulation-complete')} language={language} />;
      case 'simulation-complete':
        return <AISimulationReport language={language} />;
      case 'cv':
        return <CVCreator language={language} />;
      case 'jobs':
        return <JobDiscovery language={language} />;
      case 'profile':
        return <ProfileMain language={language} />;
      case 'messages':
        return <ProfileMessages language={language} />;
      case 'settings':
        return <ProfileSettings language={language} />;
      case 'help':
        return <ProfileHelp language={language} />;
      case 'coaching':
        return <CoachingSession sessionsLeft={1} onBookSession={() => {}} onBuyAdditional={() => {}} />;
      default:
        return null;
    }
  };

  if (currentView === "packages") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <TopBar onBack={handleBackToDashboard} />
        <Packages language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <TopBar onModuleSelect={goToModule} onViewPackages={handleViewPackages} />
      <div className="container mx-auto px-2 py-6 md:py-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {currentView === 'module' && selectedModule ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {language === "tr" ? "← Ana Sayfa" : "← Home"}
                </button>
              </div>
              {renderModuleContent() || (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
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
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
                  <div className="bg-gray-100 rounded-full p-3">
                    <UserCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">{language === 'tr' ? `Merhaba, ${user?.displayName || user?.email || 'Umut'}!` : `Hello, ${user?.displayName || user?.email || 'User'}!`}</div>
                  <div className="text-green-700 text-xs font-semibold">{language === 'tr' ? 'Profil %85 tamamlandı' : 'Profile 85% complete'}</div>
                  <Progress value={85} className="w-32 h-2 bg-green-100" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    {language === 'tr'
                      ? 'Kariyer yolculuğunda harika ilerliyorsun! Analitik yönlerinle öne çıkıyor, yeni fırsatlara açıksın.'
                      : 'You are progressing great in your career journey! Your analytical skills stand out, you are open to new opportunities.'}
                  </div>
                </div>
              </div>

              {/* Bugün Ne Yapmalısın? Kutusu */}
              <div className="rounded-2xl bg-red-100/60 shadow p-4 md:p-6 flex flex-col gap-3">
                <div className="font-bold text-lg text-red-700 flex items-center gap-2 mb-1">🎯 {language === 'tr' ? 'Bugün Ne Yapmalısın?' : 'What Should You Do Today?'}</div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => goToModule('cv')}>{language === 'tr' ? 'AI ile CV Oluştur' : 'Create Your CV with AI'}</Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2 font-semibold text-sm shadow transition" onClick={() => goToModule('simulation')}>{language === 'tr' ? 'Simülasyonu Dene' : 'Try Simulation'}</Button>
                  <Button className="bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => goToModule('jobs')}>{language === 'tr' ? '2 Yeni İş Fırsatı Seni Bekliyor' : '2 New Job Opportunities Await You'}</Button>
                </div>
              </div>

              {/* Kariyer Yolculuğu Adımları */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{language === 'tr' ? 'Kariyer Yolculuğunuz' : 'Your Career Journey'}</h3>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Sparkles className="w-8 h-8 text-blue-400 mb-1" />
                    <span className="text-sm font-semibold">{language === 'tr' ? 'Kişilik Envanteri' : 'Personality Assessment'}</span>
                    <div className="w-full h-1 bg-green-300 rounded mt-2" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Sparkles className="w-8 h-8 text-green-400 mb-1" />
                    <span className="text-sm font-semibold">{language === 'tr' ? 'Uzmanlık Analizi' : 'Expertise Analysis'}</span>
                    <div className="w-full h-1 bg-green-300 rounded mt-2" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-[120px]">
                    <Sparkles className="w-8 h-8 text-purple-400 mb-1" />
                    <span className="text-sm font-semibold">{language === 'tr' ? 'Rol Simülasyonu' : 'Role Simulation'}</span>
                    <div className="w-full h-1 bg-green-300 rounded mt-2" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-[120px] opacity-60">
                    <Sparkles className="w-8 h-8 text-gray-300 mb-1" />
                    <span className="text-sm font-semibold">{language === 'tr' ? 'CV Hazırlama' : 'CV Builder'}</span>
                    <div className="w-full h-1 bg-gray-200 rounded mt-2" />
                  </div>
                  <div className="flex flex-col items-center flex-1 min-w-[120px] opacity-60">
                    <Sparkles className="w-8 h-8 text-gray-300 mb-1" />
                    <span className="text-sm font-semibold">{language === 'tr' ? 'Başvurular' : 'Applications'}</span>
                    <div className="w-full h-1 bg-gray-200 rounded mt-2" />
                  </div>
                </div>
              </div>

              {/* Hızlı Erişim Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Başvurularım Kartı */}
                <div className="group bg-green-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3">
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'tr' ? 'Başvurularım' : 'My Applications'}</h3>
                  <p className="text-gray-600 text-sm mb-2">{language === 'tr' ? 'Başvurduğun pozisyonları ve durumunu takip et.' : 'Track the positions you applied for and their status.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-700">3</span>
                    <span className="text-xs text-gray-500">{language === 'tr' ? 'aktif başvuru' : 'active applications'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('jobs')}>{language === 'tr' ? 'Başvuruları Gör' : 'View Applications'}</Button>
                </div>
                {/* Network Kartı */}
                <div className="group bg-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'tr' ? 'Network' : 'Network'}</h3>
                  <p className="text-gray-600 text-sm mb-2">{language === 'tr' ? 'Alanındaki profesyonellerle bağlantı kur.' : 'Connect with professionals in your field.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-purple-700">12</span>
                    <span className="text-xs text-gray-500">{language === 'tr' ? 'bağlantı' : 'connections'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('networking')}>{language === 'tr' ? 'Ağını Genişlet' : 'Expand Your Network'}</Button>
                </div>
                {/* Koçluk Kartı */}
                <div className="group bg-yellow-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] rounded-2xl p-6 flex flex-col items-center text-center min-h-[220px]">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-3">
                    <GraduationCap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'tr' ? 'Koçluk' : 'Coaching'}</h3>
                  <p className="text-gray-600 text-sm mb-2">{language === 'tr' ? 'Kariyer yolculuğunda profesyonel destek al, hedeflerine daha hızlı ulaş.' : 'Get professional support in your career journey and reach your goals faster.'}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-yellow-700">1</span>
                    <span className="text-xs text-gray-500">{language === 'tr' ? 'aktif seans' : 'active session'}</span>
                  </div>
                  <Button variant="outline" className="w-full max-w-xs mt-auto" onClick={() => goToModule('coaching')}>{language === 'tr' ? 'Koçluk Al' : 'Get Coaching'}</Button>
                </div>
              </div>

              {/* Raporlar Paneli en altta butonlarla */}
              <ReportsPanel language={language} />
            </>
          )}
        </div>
      </div>
    </div>
  );
} 