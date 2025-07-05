'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { TrailieLogo } from './TrailieLogo';

interface LoginScreenProps {
  onLoginSuccess: (userType?: 'company' | 'individual') => void;
}

const translations = {
  en: {
    title: 'Discover your true career path with AI-powered insight',
    subtitle: 'Unlock your potential and navigate your future with personalized guidance.',
    demoMode: 'Demo Mode - Choose your experience',
    userDemo: 'Demo User',
    companyDemo: 'Demo Company',
    google: 'Continue with Google',
    linkedin: 'Continue with LinkedIn',
    email: 'Sign up with Email',
    demo: 'Demo Login',
    or: 'Or',
    lang: 'Türkçe',
    company: 'Company Login',
    back: 'Back to User Login',
    comingSoon: 'Coming Soon',
  },
  tr: {
    title: 'Yapay zeka ile gerçek kariyer yolunu keşfet',
    subtitle: 'Potansiyelini ortaya çıkar, geleceğini kişiselleştirilmiş rehberlikle şekillendir.',
    demoMode: 'Demo Modu - Deneyiminizi seçin',
    userDemo: 'Demo Kullanıcı',
    companyDemo: 'Demo Şirket',
    google: 'Google ile Devam Et',
    linkedin: 'LinkedIn ile Devam Et',
    email: 'E-posta ile Kayıt Ol',
    demo: 'Demo Giriş',
    or: 'veya',
    lang: 'English',
    company: 'Firma Girişi',
    back: 'Bireysel Girişe Dön',
    comingSoon: 'Yakında',
  },
};

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [lang, setLang] = useState<'en' | 'tr'>('tr');
  const t = translations[lang];

  const { setAuthUserType } = useAuth();

  const handleUserDemo = () => {
    setAuthUserType('individual');
    onLoginSuccess('individual');
  };

  const handleCompanyDemo = () => {
    setAuthUserType('company');
    onLoginSuccess('company');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6f2] to-[#f0f9ff] px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-2">
          <div className="flex items-center gap-3 justify-center">
            <TrailieLogo className="w-12 h-12" />
            <span className="text-2xl md:text-3xl font-bold text-gray-900">Trailie</span>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-3 leading-snug">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 mb-6 text-base md:text-lg">
          {t.subtitle}
        </p>
        
        {/* Demo Mode Notice */}
        <div className="w-full mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 text-center font-medium">
            {t.demoMode}
          </p>
        </div>

        {/* Demo Options - Single Line Cards */}
        <div className="w-full flex flex-col gap-3 mb-6">
          <Button 
            onClick={handleUserDemo} 
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold flex items-center justify-center gap-3"
          >
            <User className="w-5 h-5" />
            <span>{t.userDemo}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button 
            onClick={handleCompanyDemo} 
            className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold flex items-center justify-center gap-3"
          >
            <Building2 className="w-5 h-5" />
            <span>{t.companyDemo}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

                <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">{t.or}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Traditional Login Options */}
        <div className="w-full flex flex-col gap-3 mb-4">
          <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium opacity-50 cursor-not-allowed" disabled>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.google}
            <Badge variant="secondary" className="text-xs">{t.comingSoon}</Badge>
          </Button>
          <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium opacity-50 cursor-not-allowed" disabled>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
            </svg>
            {t.linkedin}
            <Badge variant="secondary" className="text-xs">{t.comingSoon}</Badge>
          </Button>
          <Button variant="default" className="w-full h-12 text-base font-medium opacity-50 cursor-not-allowed" disabled>
            {t.email}
            <Badge variant="secondary" className="text-xs ml-2">{t.comingSoon}</Badge>
          </Button>
        </div>
        <div className="mt-8 w-full flex justify-center">
          <button
            className="text-sm text-gray-400 hover:text-gray-700 transition"
            onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
          >
            {t.lang}
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-300 text-center w-full select-none">© {new Date().getFullYear()} Trailie</div>
      </div>
    </div>
  );
} 