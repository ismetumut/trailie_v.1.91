import { UserCircle, FileText, Briefcase, Users, Award, Sparkles, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AIChatbot from './AIChatbot';
import ModuleMenu from './ModuleMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import ReportsPanel from './ReportsPanel';

export default function CareerDashboard({ onModuleSelect }: { onModuleSelect?: (module: string) => void }) {
  const { language } = useLanguage();
  const TEXT = {
    tr: {
      hello: 'Merhaba',
      profileComplete: 'Profil % tamamlandı',
      aiSummary: 'Kariyer yolculuğunda harika ilerliyorsun! Analitik yönlerinle öne çıkıyor, yeni fırsatlara açıksın.',
      aiSupported: 'AI Destekli',
      journey: 'Kariyer Yolculuğunuz',
      steps: ['Kişilik Envanteri', 'Uzmanlık Analizi', 'Rol Simülasyonu', 'CV Hazırlama', 'Başvurular'],
      cvTitle: 'CV Hazırla',
      cvDesc: 'AI destekli özgeçmişini oluştur ve güncelle.',
      cvBtn: 'CV Oluştur',
      applyTitle: 'Başvurularım',
      applyDesc: 'Başvurduğun pozisyonları ve durumunu takip et.',
      applyBtn: 'Başvuruları Gör',
      networkTitle: 'Network',
      networkDesc: 'Alanındaki profesyonellerle bağlantı kur.',
      networkBtn: 'Ağını Genişlet',
      badges: 'Başarılar & Rozetler',
      badgeList: ['DISC Tamamlandı', 'Uzmanlık Analizi', 'Simülasyon Rozeti'],
      suggestionTitle: 'Bugün Ne Yapmalısın?',
      suggestion1: 'Veri odaklı düşünmen seni Product Manager pozisyonuna yaklaştırıyor, Simülasyonu denemek ister misin?',
      suggestion2: "AI ile CV'ni Oluştur",
      suggestion3: '2 Yeni İş Fırsatı Seni Bekliyor',
      suggestion4: "Profilini Tamamla (%85)",
      continue: 'Devam Et',
      discover: 'Keşfet',
      show: 'Göster',
    },
    en: {
      hello: 'Hello',
      profileComplete: 'Profile % complete',
      aiSummary: 'You are progressing great in your career journey! Your analytical skills stand out, you are open to new opportunities.',
      aiSupported: 'AI Supported',
      journey: 'Your Career Journey',
      steps: ['Personality Inventory', 'Expertise Analysis', 'Role Simulation', 'CV Preparation', 'Applications'],
      cvTitle: 'Create CV',
      cvDesc: 'Create and update your AI-powered resume.',
      cvBtn: 'Create CV',
      applyTitle: 'My Applications',
      applyDesc: 'Track the positions you applied for and their status.',
      applyBtn: 'View Applications',
      networkTitle: 'Network',
      networkDesc: 'Connect with professionals in your field.',
      networkBtn: 'Expand Your Network',
      badges: 'Achievements & Badges',
      badgeList: ['DISC Completed', 'Expertise Analysis', 'Simulation Badge'],
      suggestionTitle: 'What Should You Do Today?',
      suggestion1: 'Your data-driven mindset matches you with the Product Manager position. Would you like to try the simulation?',
      suggestion2: 'Create Your CV with AI',
      suggestion3: '2 New Job Opportunities Await You',
      suggestion4: 'Complete Your Profile (%85)',
      continue: 'Continue',
      discover: 'Discover',
      show: 'Show',
    }
  };
  const t = TEXT[language];
  // Demo veriler
  const user = {
    name: 'Umut',
    profilePercent: 85,
    aiSummary: t.aiSummary,
    badges: [
      { icon: <Award className="w-5 h-5 text-yellow-500" />, label: t.badgeList[0] },
      { icon: <Award className="w-5 h-5 text-green-500" />, label: t.badgeList[1] },
      { icon: <Award className="w-5 h-5 text-purple-500" />, label: t.badgeList[2] },
    ],
    timeline: t.steps.map((label, i) => ({ label, status: i < 2 ? 'done' : i === 2 ? 'active' : 'next', icon: <Sparkles className={`w-5 h-5 ${i === 0 ? 'text-blue-500' : i === 1 ? 'text-green-500' : i === 2 ? 'text-purple-500 animate-pulse' : 'text-gray-400'}`} /> })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6] p-4">
      {/* En üstte Merhaba, kullanıcı ve profil yüzdesi */}
      <div className="max-w-4xl mx-auto flex flex-col items-start gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2 shadow-md">
            <UserCircle className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t.hello}, {user.name}!</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-green-100 text-green-800">{t.profileComplete.replace('%', user.profilePercent.toString())}</Badge>
            </div>
          </div>
        </div>
        {/* Kısa AI önerisi cümlesi */}
        <div className="mt-2 text-gray-700 font-medium flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          {user.aiSummary}
        </div>
      </div>

      {/* Bugün Ne Yapmalısın kutusu */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl bg-red-100/60 shadow p-4 md:p-6 flex flex-col gap-3">
          <div className="font-bold text-lg text-red-700 flex items-center gap-2 mb-1">🎯 {t.suggestionTitle}</div>
          <div className="flex flex-wrap gap-3 mt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => onModuleSelect?.('cv')}>{t.suggestion2}</button>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2 font-semibold text-sm shadow transition" onClick={() => onModuleSelect?.('simulation')}>
              {language === 'tr' ? 'Simülasyonu Dene' : 'Try Simulation'}
            </button>
            <button className="bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-4 py-2 font-semibold text-sm transition" onClick={() => onModuleSelect?.('jobs')}>{t.suggestion3}</button>
          </div>
        </div>
      </div>

      {/* ModuleMenu */}
      <div className="max-w-4xl mx-auto mb-6">
        <ModuleMenu onSelect={onModuleSelect} />
      </div>
      
      {/* Kariyer Yolculuğu (Timeline) */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t.journey}</h3>
          <div className="flex items-center justify-between gap-2">
            {user.timeline.map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`rounded-full p-3 mb-2 shadow-md ${step.status === 'done' ? 'bg-green-100' : step.status === 'active' ? 'bg-purple-100 animate-pulse' : 'bg-gray-100'}`}> 
                  {step.icon}
                </div>
                <span className={`text-xs font-semibold text-center ${step.status === 'done' ? 'text-green-700' : step.status === 'active' ? 'text-purple-700' : 'text-gray-400'}`}>{step.label}</span>
                {i < user.timeline.length - 1 && <div className="h-1 w-full bg-gradient-to-r from-green-200 to-gray-200 my-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hızlı Erişim Kartları */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="group bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <CardContent className="p-6 flex flex-col items-center">
            <Briefcase className="w-10 h-10 text-green-600 mb-2" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t.applyTitle}</h3>
            <p className="text-gray-600 text-sm text-center">{t.applyDesc}</p>
            <Button variant="outline" className="mt-4 w-full">{t.applyBtn}</Button>
          </CardContent>
        </Card>
        <Card className="group bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <CardContent className="p-6 flex flex-col items-center">
            <Users className="w-10 h-10 text-purple-600 mb-2" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t.networkTitle}</h3>
            <p className="text-gray-600 text-sm text-center">{t.networkDesc}</p>
            <Button variant="outline" className="mt-4 w-full">{t.networkBtn}</Button>
          </CardContent>
        </Card>
        <Card className="group bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <CardContent className="p-6 flex flex-col items-center">
            <GraduationCap className="w-10 h-10 text-yellow-600 mb-2" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'tr' ? 'Koçluk' : 'Coaching'}</h3>
            <p className="text-gray-600 text-sm text-center">{language === 'tr' ? 'Kariyer yolculuğunda profesyonel destek al, hedeflerine daha hızlı ulaş.' : 'Get professional support in your career journey and reach your goals faster.'}</p>
            <Button variant="outline" className="mt-4 w-full" onClick={() => onModuleSelect?.('coaching')}>{language === 'tr' ? 'Koçluk Al' : 'Get Coaching'}</Button>
          </CardContent>
        </Card>
      </div>

      {/* Başarılar ve Rozetler */}
      <div className="max-w-4xl mx-auto">
        <ReportsPanel language={language} />
      </div>
    </div>
  );
} 