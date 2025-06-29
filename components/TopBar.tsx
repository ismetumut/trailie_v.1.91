"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Home, Bell, UserCircle, X, Mail, Settings, HelpCircle, LogOut } from "lucide-react";
import { TrailieLogo } from "@/components/auth/TrailieLogo";
import { useAuth } from "@/contexts/AuthContext";
import ModuleMenu from "@/components/ModuleMenu";
import { useLanguage } from '@/contexts/LanguageContext';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function TopBar({ onModuleSelect }: { onModuleSelect?: (key: string) => void }) {
  const { user, userType } = useAuth();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const NOTIFICATIONS = {
    tr: [
      { id: 1, text: 'Yeni bir modül eklendi: Simülasyon Oyunları!' },
      { id: 2, text: 'Profilini tamamlayarak rozet kazanabilirsin.' }
    ],
    en: [
      { id: 1, text: 'A new module added: Simulation Games!' },
      { id: 2, text: 'Complete your profile to earn a badge.' }
    ]
  };
  const notifications = NOTIFICATIONS[language];
  const unreadCount = notifications.length;
  const PROFILE = {
    tr: {
      name: 'Demo Kullanıcı',
      email: 'demo@trailie.com',
      menu: [
        { icon: <UserCircle className="w-5 h-5" />, label: 'Profil' },
        { icon: <Mail className="w-5 h-5" />, label: 'Mesajlar' },
        { icon: <Settings className="w-5 h-5" />, label: 'Ayarlar' },
        { icon: <HelpCircle className="w-5 h-5" />, label: 'Yardım' },
        { icon: <LogOut className="w-5 h-5 text-red-500" />, label: 'Çıkış Yap', danger: true },
      ]
    },
    en: {
      name: 'Demo User',
      email: 'demo@trailie.com',
      menu: [
        { icon: <UserCircle className="w-5 h-5" />, label: 'Profile' },
        { icon: <Mail className="w-5 h-5" />, label: 'Messages' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
        { icon: <HelpCircle className="w-5 h-5" />, label: 'Help' },
        { icon: <LogOut className="w-5 h-5 text-red-500" />, label: 'Log Out', danger: true },
      ]
    }
  };
  const profile = PROFILE[language];
  if (!user && !userType) return null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="relative flex items-center justify-center max-w-4xl mx-auto w-full px-2 md:px-4 py-2 overflow-x-auto whitespace-nowrap">
          {/* Sol: Hamburger + Home */}
          <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-shrink-0">
            <button
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none flex-shrink-0"
              onClick={() => setMenuOpen(true)}
              aria-label={language === 'tr' ? 'Menüyü Aç' : 'Open Menu'}
            >
              <Menu className="w-6 h-6 md:w-6 md:h-6 text-gray-800" />
            </button>
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-primary font-semibold text-base md:text-lg flex-shrink-0"
              onClick={() => onModuleSelect?.("dashboard")}
              aria-label={language === 'tr' ? 'Ana Sayfa' : 'Home'}
            >
              <Home className="w-6 h-6 md:w-6 md:h-6" />
            </button>
          </div>
          {/* Başlık ve logo ortada, absolute ve sm: altında gizli */}
          <div className="hidden sm:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none truncate max-w-[60vw] md:max-w-xs text-center">
            <TrailieLogo className="w-7 h-7 md:w-8 md:h-8" />
            <span className="text-base md:text-xl font-bold text-gray-800">Trailie</span>
          </div>
          {/* Sağda bildirim, profil ve dil seçici */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink-0 ml-auto">
            <Popover open={notifOpen} onOpenChange={setNotifOpen}>
              <PopoverTrigger asChild>
                <button className="relative text-gray-600 hover:text-primary flex-shrink-0" aria-label={language === 'tr' ? 'Bildirimler' : 'Notifications'}>
                  <Bell className="w-6 h-6 md:w-6 md:h-6" />
                  {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-2">
                <div className="font-bold mb-2 text-gray-800 text-sm">{language === 'tr' ? 'Bildirimler' : 'Notifications'}</div>
                <ul className="space-y-2">
                  {notifications.map(n => (
                    <li key={n.id} className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-700 shadow-sm">
                      {n.text}
                    </li>
                  ))}
                </ul>
                {notifications.length === 0 && (
                  <div className="text-xs text-gray-400 py-4 text-center">{language === 'tr' ? 'Hiç bildirimin yok.' : 'No notifications.'}</div>
                )}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-600 hover:text-primary flex-shrink-0" aria-label={language === 'tr' ? 'Profil' : 'Profile'}>
                  <UserCircle className="w-8 h-8 md:w-8 md:h-8" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-0">
                <div className="p-4 border-b">
                  <div className="font-semibold text-gray-900 text-sm">{profile.name}</div>
                  <div className="text-xs text-gray-500">{profile.email}</div>
                </div>
                <ul className="py-2">
                  {profile.menu.map((item, i) => (
                    <li key={i}>
                      <button className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${item.danger ? 'text-red-600 font-semibold' : 'text-gray-800 hover:bg-gray-50'} transition`}> 
                        {item.icon}
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            {/* Dil seçici */}
            <div className="flex items-center gap-1 ml-2">
              <button
                className={`px-2 py-1 rounded text-xs font-semibold border ${language === 'tr' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'} transition`}
                onClick={() => setLanguage('tr')}
                aria-label="Türkçe"
              >TR</button>
              <button
                className={`px-2 py-1 rounded text-xs font-semibold border ${language === 'en' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'} transition`}
                onClick={() => setLanguage('en')}
                aria-label="English"
              >EN</button>
            </div>
          </div>
        </div>
      </div>
      {/* Hamburger Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="w-72 max-w-full bg-white h-full shadow-2xl flex flex-col p-4 relative animate-slideInLeft">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setMenuOpen(false)}
              aria-label="Menüyü Kapat"
            >
              <X className="w-6 h-6" />
            </button>
            <ModuleMenu onSelect={(key) => { setMenuOpen(false); onModuleSelect?.(key); }} drawerOnly />
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </>
  );
} 