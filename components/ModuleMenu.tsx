'use client';
import { useState } from 'react';
import { Menu, X, User, Target, Briefcase, FileText, Play, MessageCircle, Users, GraduationCap, Sparkles, ClipboardList } from 'lucide-react';
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

export default function ModuleMenu({ onSelect, drawerOnly }: { onSelect?: (key: string) => void, drawerOnly?: boolean }) {
  const { user, userType } = useAuth();
  const { language } = useLanguage();
  const TEXT = {
    tr: {
      title: 'Modüller',
      modules: [
        { key: 'personality', label: 'Kişilik Envanteri', desc: 'AI destekli kişilik envanteri' },
        { key: 'expertise', label: 'Uzmanlık Analizi', desc: 'Yetenek ve deneyim değerlendirmesi' },
        { key: 'role', label: 'Rol Simülasyonu', desc: 'AI destekli rol önerileri ve senaryoları' },
        { key: 'simulation', label: 'Simülasyon Oyunları', desc: 'Etkileşimli kariyer senaryoları' },
        { key: 'cv', label: 'CV Hazırlama', desc: 'AI destekli özgeçmiş oluşturma' },
        { key: 'jobs', label: 'İş İlanları', desc: 'Eşleşmeli iş ilanları' },
        { key: 'interview', label: 'Mülakat Hazırlığı', desc: 'Mülakat soruları ve senaryoları' },
        { key: 'networking', label: 'Network', desc: 'Profesyonel ağ araçları' },
        { key: 'coaching', label: 'Koçluk', desc: 'Kariyer koçluğu seansları' },
      ]
    },
    en: {
      title: 'Modules',
      modules: [
        { key: 'personality', label: 'Personality Assessment', desc: 'AI-powered personality inventory' },
        { key: 'expertise', label: 'Expertise Analysis', desc: 'Skill and experience evaluation' },
        { key: 'role', label: 'Role Simulation', desc: 'AI-powered role suggestions and scenarios' },
        { key: 'simulation', label: 'Simulation Games', desc: 'Interactive career scenario simulations' },
        { key: 'cv', label: 'CV Generator', desc: 'AI-powered resume creation' },
        { key: 'jobs', label: 'Job Board', desc: 'Curated job listings with matching' },
        { key: 'interview', label: 'Interview Prep', desc: 'Practice interview questions and scenarios' },
        { key: 'networking', label: 'Networking', desc: 'Professional networking tools' },
        { key: 'coaching', label: 'Coaching', desc: 'Career coaching sessions' },
      ]
    }
  };
  const t = TEXT[language];
  if (!user && !userType) return null;
  const [open, setOpen] = useState(false);

  if (drawerOnly) {
    return (
      <nav className="flex flex-col gap-1">
        <div className="font-bold text-lg mb-3">{t.title}</div>
        {t.modules
          .filter(mod => mod.key !== 'simulation')
          .map((mod, i) => (
            <button
              key={mod.key}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-left"
              onClick={() => { onSelect?.(mod.key); }}
            >
              <div>
                <div className="font-medium text-gray-900 text-sm">{mod.label}</div>
                <div className="text-xs text-gray-500">{mod.desc}</div>
              </div>
            </button>
          ))}
      </nav>
    );
  }

  return null;
} 