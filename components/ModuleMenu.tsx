'use client';
import { useState } from 'react';
import { Menu, X, User, Target, Briefcase, FileText, Play, MessageCircle, Users, GraduationCap, Sparkles, ClipboardList, Lock, CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const modules = [
  { key: 'personality', label: 'Personality Assessment', icon: <User className="w-5 h-5" />, description: 'AI-powered personality inventory' },
  { key: 'expertise', label: 'Uzmanlık Analizi', icon: <Target className="w-5 h-5" />, description: 'Yetenek ve deneyim değerlendirmesi' },
  { key: 'role', label: 'Rol Simülasyonu', icon: <Briefcase className="w-5 h-5" />, description: 'AI destekli rol önerileri ve senaryoları' },
  { key: 'simulation', label: 'Simulation Games', icon: <Play className="w-5 h-5" />, description: 'Interactive career scenario simulations' },
  { key: 'cv', label: 'CV Generator', icon: <FileText className="w-5 h-5" />, description: 'AI-powered resume creation' },
  { key: 'jobs', label: 'Job Board', icon: <ClipboardList className="w-5 h-5" />, description: 'Curated job listings with matching' },
  { key: 'interview', label: 'Interview Prep', icon: <MessageCircle className="w-5 h-5" />, description: 'Practice interview questions and scenarios' },
  { key: 'networking', label: 'Networking', icon: <Users className="w-5 h-5" />, description: 'Professional networking tools' },
  { key: 'coaching', label: 'Coaching', icon: <GraduationCap className="w-5 h-5" />, description: 'Career coaching sessions' },
];

const premiumModules = ['expertise', 'role', 'simulation', 'cv', 'jobs', 'interview', 'networking', 'coaching'];

  const TEXT = {
    tr: {
      title: 'Modüller',
      modules: [
      { key: 'assessment', label: 'Kişilik Envanteri', desc: 'AI destekli kişilik envanteri' },
        { key: 'expertise', label: 'Uzmanlık Analizi', desc: 'Yetenek ve deneyim değerlendirmesi' },
        { key: 'role', label: 'Rol Simülasyonu', desc: 'AI destekli rol önerileri ve senaryoları' },
        { key: 'simulation', label: 'Simülasyon Oyunları', desc: 'Etkileşimli kariyer senaryoları' },
        { key: 'cv', label: 'CV Hazırlama', desc: 'AI destekli özgeçmiş oluşturma' },
        { key: 'jobs', label: 'İş İlanları', desc: 'Eşleşmeli iş ilanları' },
        { key: 'interview', label: 'Mülakat Hazırlığı', desc: 'Mülakat soruları ve senaryoları' },
        { key: 'networking', label: 'Network', desc: 'Profesyonel ağ araçları' },
        { key: 'coaching', label: 'Koçluk', desc: 'Kariyer koçluğu seansları' },
    ],
    upgrade: 'Paketleri Görüntüle',
    upgradeDesc: 'Tüm modüllere erişim için paket satın al'
    },
    en: {
      title: 'Modules',
      modules: [
      { key: 'assessment', label: 'Personality Assessment', desc: 'AI-powered personality inventory' },
        { key: 'expertise', label: 'Expertise Analysis', desc: 'Skill and experience evaluation' },
        { key: 'role', label: 'Role Simulation', desc: 'AI-powered role suggestions and scenarios' },
        { key: 'simulation', label: 'Simulation Games', desc: 'Interactive career scenario simulations' },
        { key: 'cv', label: 'CV Generator', desc: 'AI-powered resume creation' },
        { key: 'jobs', label: 'Job Board', desc: 'Curated job listings with matching' },
        { key: 'interview', label: 'Interview Prep', desc: 'Practice interview questions and scenarios' },
        { key: 'networking', label: 'Networking', desc: 'Professional networking tools' },
        { key: 'coaching', label: 'Coaching', desc: 'Career coaching sessions' },
    ],
    upgrade: 'View Packages',
    upgradeDesc: 'Purchase a package to access all modules'
    }
  };

export default function ModuleMenu({ onSelect, drawerOnly, onViewPackages, premiumUnlocked = true, onUnlockPremium }: { onSelect?: (key: string) => void, drawerOnly?: boolean, onViewPackages?: () => void, premiumUnlocked?: boolean, onUnlockPremium?: () => void }) {
  const { user, userType } = useAuth();
  const { language } = useLanguage();
  const t = TEXT[language];
  if (!user && !userType) return null;
  const [open, setOpen] = useState(false);

  if (drawerOnly) {
    return (
      <nav className="flex flex-col gap-1">
        <div className="font-bold text-lg mb-3">{t.title}</div>
        {t.modules
          .map((mod: any, i: number) => {
            const isPremium = premiumModules.includes(mod.key);
            const isUnlocked = !isPremium || premiumUnlocked;
            return (
            <button
              key={mod.key}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-left relative ${!isUnlocked ? 'opacity-60 cursor-pointer' : ''}`}
                onClick={() => { 
                  if (isPremium && !premiumUnlocked) {
                    onUnlockPremium?.();
                    setTimeout(() => onSelect?.(mod.key), 0);
                  } else if (isUnlocked) {
                    // İş ilanları ve simülasyon için localStorage'ı temizle (hamburger menüden geldiğini belirt)
                    if (mod.key === 'jobs') {
                      localStorage.removeItem('fromJobFlow');
                    } else if (mod.key === 'simulation') {
                      localStorage.removeItem('fromSimulationFlow');
                    }
                    onSelect?.(mod.key);
                  }
                }}
            >
              <div>
                  <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                    {mod.label}
                    {isPremium && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded ml-1">
                        <Crown className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                <div className="text-xs text-gray-500">{mod.desc}</div>
              </div>
            </button>
            );
          })}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={onViewPackages}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition"
          >
            <Crown className="w-4 h-4" />
            <span className="font-medium">{t.upgrade}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-500 text-center mt-1">{t.upgradeDesc}</p>
        </div>
      </nav>
    );
  }

  return null;
} 