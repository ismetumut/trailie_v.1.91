'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Sparkles,
  Target,
  Users,
  Briefcase,
  Award
} from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { TrailieLogo } from './TrailieLogo';
import { signIn as nextAuthSignIn } from 'next-auth/react';

interface LoginScreenProps {
  onLoginSuccess: (userType?: 'company' | 'individual') => void;
}

const translations = {
  en: {
    title: 'Discover your true career path with AI-powered insight',
    subtitle: 'Unlock your potential and navigate your future with personalized guidance.',
    google: 'Continue with Google',
    linkedin: 'Continue with LinkedIn',
    email: 'Sign up with Email',
    demo: 'Demo Login',
    or: 'Or',
    lang: 'Türkçe',
    company: 'Company Login',
    companyDemo: 'Demo Company Login',
    back: 'Back to User Login',
  },
  tr: {
    title: 'Yapay zeka ile gerçek kariyer yolunu keşfet',
    subtitle: 'Potansiyelini ortaya çıkar, geleceğini kişiselleştirilmiş rehberlikle şekillendir.',
    google: 'Google ile Devam Et',
    linkedin: 'LinkedIn ile Devam Et',
    email: 'E-posta ile Kayıt Ol',
    demo: 'Demo Giriş',
    or: 'veya',
    lang: 'English',
    company: 'Firma Girişi',
    companyDemo: 'Demo Firma Girişi',
    back: 'Bireysel Girişe Dön',
  },
};

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [userType, setUserType] = useState<'individual' | 'company'>('individual');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'tr'>('en');
  const [companyMode, setCompanyMode] = useState(false);
  const t = translations[lang];

  const { setAuthUserType } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await nextAuthSignIn('google');
      setAuthUserType(userType);
      onLoginSuccess();
    } catch (error: any) {
      console.warn('Firebase not available, using demo mode');
      setAuthUserType(userType);
      onLoginSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    await nextAuthSignIn('linkedin');
  };

  const handleEmailAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      
      setAuthUserType(userType);
      onLoginSuccess();
    } catch (error: any) {
      console.warn('Firebase not available, using demo mode');
      setAuthUserType(userType);
      onLoginSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleAnyLogin = () => {
    onLoginSuccess('individual');
  };

  const handleCompanyDemoLogin = () => {
    onLoginSuccess('company');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf6f2] px-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-2">
          <div className="flex items-center gap-3 justify-center">
            <TrailieLogo className="w-16 h-16" />
            <span className="text-3xl font-bold text-gray-900 align-middle" style={{lineHeight: '1.1'}}>Trailie</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 leading-snug">
          {t.title}
        </h1>
        <p className="text-center text-gray-600 mb-8 text-base md:text-lg">
          {t.subtitle}
        </p>
        {!companyMode ? (
          <>
            <div className="w-full flex flex-col gap-3 mb-4">
              <Button onClick={() => onLoginSuccess('individual')} variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                {t.google}
              </Button>
              <Button onClick={() => onLoginSuccess('individual')} variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                {t.linkedin}
              </Button>
              <Button onClick={() => onLoginSuccess('individual')} variant="default" className="w-full h-12 text-base font-medium">
                {t.email}
              </Button>
              <div className="flex items-center w-full my-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="mx-3 text-gray-400 text-sm">{t.or}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <Button onClick={() => setCompanyMode(true)} variant="ghost" className="w-full h-12 text-base font-medium mt-2">
                🏢 {t.company}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col gap-3 mb-4">
              <Button onClick={() => onLoginSuccess('company')} variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                {t.google}
              </Button>
              <Button onClick={() => onLoginSuccess('company')} variant="outline" className="w-full h-12 flex items-center justify-center gap-2 text-base font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                {t.linkedin}
              </Button>
              <Button onClick={() => onLoginSuccess('company')} variant="default" className="w-full h-12 text-base font-medium">
                {t.email}
              </Button>
            </div>
            <Button onClick={() => setCompanyMode(false)} variant="ghost" className="w-full h-12 text-base font-medium mt-2">
              ← {t.back}
            </Button>
          </>
        )}
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