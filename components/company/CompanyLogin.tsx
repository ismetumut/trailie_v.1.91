'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Crown,
  Users,
  FileText,
  Check,
  Star,
  TrendingUp,
  Shield
} from 'lucide-react';

interface CompanyLoginProps {
  onLogin: (companyData: any) => void;
  language?: 'tr' | 'en';
}

const content = {
  tr: {
    title: "Şirket Girişi",
    subtitle: "Nitelikli adayları keşfedin ve CV'lerini inceleyin",
    email: "E-posta",
    password: "Şifre",
    login: "Giriş Yap",
    forgotPassword: "Şifremi Unuttum",
    noAccount: "Hesabınız yok mu?",
    register: "Kayıt Ol",
    or: "veya",
    packages: "Abonelik Paketleri",
    monthly: {
      title: "Aylık Paket",
      price: "9.999 TL",
      period: "/ay",
      cvLimit: "20 CV görüntüleme",
      features: [
        "AI destekli aday filtreleme",
        "DISC kişilik analizi",
        "Uzmanlık değerlendirmesi",
        "Assessment sonuçları",
        "CV indirme",
        "E-posta desteği"
      ]
    },
    annual: {
      title: "Yıllık Paket",
      price: "100.000 TL",
      period: "/yıl",
      cvLimit: "240 CV görüntüleme",
      features: [
        "Tüm aylık paket özellikleri",
        "Öncelikli destek",
        "Özel raporlar",
        "API erişimi",
        "Dedicated hesap yöneticisi",
        "Özel entegrasyonlar"
      ],
      popular: "En Popüler"
    }
  },
  en: {
    title: "Company Login",
    subtitle: "Discover qualified candidates and review their CVs",
    email: "Email",
    password: "Password",
    login: "Login",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    register: "Register",
    or: "or",
    packages: "Subscription Packages",
    monthly: {
      title: "Monthly Package",
      price: "$999",
      period: "/month",
      cvLimit: "20 CV views",
      features: [
        "AI-powered candidate filtering",
        "DISC personality analysis",
        "Expertise assessment",
        "Assessment results",
        "CV download",
        "Email support"
      ]
    },
    annual: {
      title: "Annual Package",
      price: "$10,000",
      period: "/year",
      cvLimit: "240 CV views",
      features: [
        "All monthly package features",
        "Priority support",
        "Custom reports",
        "API access",
        "Dedicated account manager",
        "Custom integrations"
      ],
      popular: "Most Popular"
    }
  }
};

export function CompanyLogin({ onLogin, language = 'tr' }: CompanyLoginProps) {
  const t = content[language];
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'monthly' | 'annual' | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert(language === 'tr' ? 'Lütfen tüm alanları doldurun' : 'Please fill all fields');
      return;
    }
    onLogin({ email, password, package: selectedPackage });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !selectedPackage) {
      alert(language === 'tr' ? 'Lütfen tüm alanları doldurun ve bir paket seçin' : 'Please fill all fields and select a package');
      return;
    }
    onLogin({ email, password, package: selectedPackage, isNew: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Login/Register Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">{t.title}</CardTitle>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  {t.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/50 border-gray-200 focus:border-blue-500"
                    placeholder={language === 'tr' ? 'sirket@email.com' : 'company@email.com'}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/50 border-gray-200 focus:border-blue-500"
                    placeholder={language === 'tr' ? '••••••••' : '••••••••'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isRegistering && (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gray-700">
                    {language === 'tr' ? 'Abonelik Paketi Seçin:' : 'Select Subscription Package:'}
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPackage === 'monthly'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage('monthly')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{t.monthly.title}</div>
                          <div className="text-sm text-gray-600">{t.monthly.cvLimit}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{t.monthly.price}</div>
                          <div className="text-sm text-gray-500">{t.monthly.period}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                        selectedPackage === 'annual'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage('annual')}
                    >
                      <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                        {t.annual.popular}
                      </Badge>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{t.annual.title}</div>
                          <div className="text-sm text-gray-600">{t.annual.cvLimit}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{t.annual.price}</div>
                          <div className="text-sm text-gray-500">{t.annual.period}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg"
              >
                {isRegistering 
                  ? (language === 'tr' ? 'Kayıt Ol ve Başla' : 'Register & Start')
                  : t.login
                }
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isRegistering 
                  ? (language === 'tr' ? 'Zaten hesabınız var mı? Giriş yapın' : 'Already have an account? Login')
                  : (language === 'tr' ? 'Hesabınız yok mu? Kayıt olun' : 'Don\'t have an account? Register')
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Package Details */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.packages}</h2>
            <p className="text-gray-600">
              {language === 'tr' 
                ? 'Nitelikli adayları AI destekli filtrelerle keşfedin'
                : 'Discover qualified candidates with AI-powered filters'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Monthly Package */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">{t.monthly.title}</CardTitle>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{t.monthly.price}</div>
                    <div className="text-sm text-gray-500">{t.monthly.period}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <FileText className="w-5 h-5" />
                  {t.monthly.cvLimit}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.monthly.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Annual Package */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-shadow relative">
              <Badge className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1">
                {t.annual.popular}
              </Badge>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">{t.annual.title}</CardTitle>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">{t.annual.price}</div>
                    <div className="text-sm text-gray-500">{t.annual.period}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <FileText className="w-5 h-5" />
                  {t.annual.cvLimit}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.annual.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 