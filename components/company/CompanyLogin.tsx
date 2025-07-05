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
  onLanguageChange?: (lang: 'tr' | 'en') => void;
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
    demoMode: "Demo Modu - Herhangi bir bilgi ile giriş yapabilirsiniz",
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
    demoMode: "Demo Mode - You can login with any information",
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

export function CompanyLogin({ onLogin, language = 'en', onLanguageChange }: CompanyLoginProps) {
  const t = content[language];
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'monthly' | 'annual' | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode - direct login without validation
    onLogin({ 
      email: email || 'demo@company.com', 
      password: password || 'demo123', 
      package: selectedPackage || 'monthly' 
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode - direct registration without validation
    onLogin({ 
      email: email || 'demo@company.com', 
      password: password || 'demo123', 
      package: selectedPackage || 'monthly', 
      isNew: true 
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => onLanguageChange && onLanguageChange(language === 'en' ? 'tr' : 'en')}
          className="px-3 py-1 rounded-lg border border-border bg-card text-card-foreground shadow hover:bg-muted transition text-sm font-semibold"
          aria-label={language === 'en' ? 'Switch to Turkish' : 'İngilizceye geç'}
        >
          {language === 'en' ? 'Türkçe' : 'English'}
        </button>
      </div>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Login/Register Form */}
        <Card className="bg-card border border-border shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-card-foreground">{t.title}</CardTitle>
            <p className="text-muted-foreground mt-2 text-sm lg:text-base">{t.subtitle}</p>
            
            {/* Demo Mode Notice */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 text-center font-medium">
                {t.demoMode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-card-foreground">
                  {t.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary"
                    placeholder={language === 'tr' ? 'sirket@email.com' : 'company@email.com'}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-card-foreground">
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background border-border focus:border-primary"
                    placeholder={language === 'tr' ? '••••••••' : '••••••••'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isRegistering && (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-card-foreground">
                    {language === 'tr' ? 'Abonelik Paketi Seçin:' : 'Select Subscription Package:'}
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPackage === 'monthly'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedPackage('monthly')}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-semibold text-card-foreground">{t.monthly.title}</div>
                          <div className="text-sm text-muted-foreground">{t.monthly.cvLimit}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xl lg:text-2xl font-bold text-primary">{t.monthly.price}</div>
                          <div className="text-sm text-muted-foreground">{t.monthly.period}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                        selectedPackage === 'annual'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedPackage('annual')}
                    >
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                        {t.annual.popular}
                      </Badge>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-semibold text-card-foreground">{t.annual.title}</div>
                          <div className="text-sm text-muted-foreground">{t.annual.cvLimit}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xl lg:text-2xl font-bold text-primary">{t.annual.price}</div>
                          <div className="text-sm text-muted-foreground">{t.annual.period}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg shadow-lg"
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
                className="text-primary hover:text-primary/80 font-medium text-sm lg:text-base"
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
        <div className="space-y-4 lg:space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-xl lg:text-2xl font-bold text-card-foreground mb-2">{t.packages}</h2>
            <p className="text-muted-foreground text-sm lg:text-base">
              {language === 'tr' 
                ? 'Nitelikli adayları AI destekli filtrelerle keşfedin'
                : 'Discover qualified candidates with AI-powered filters'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            {/* Monthly Package */}
            <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg lg:text-xl font-bold text-card-foreground">{t.monthly.title}</CardTitle>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{t.monthly.price}</div>
                    <div className="text-sm text-muted-foreground">{t.monthly.period}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">{t.monthly.cvLimit}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 lg:space-y-3">
                  {t.monthly.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm lg:text-base text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Annual Package */}
            <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow relative">
              <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-2 py-1 text-xs">
                {t.annual.popular}
              </Badge>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg lg:text-xl font-bold text-card-foreground">{t.annual.title}</CardTitle>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{t.annual.price}</div>
                    <div className="text-sm text-muted-foreground">{t.annual.period}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">{t.annual.cvLimit}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 lg:space-y-3">
                  {t.annual.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm lg:text-base text-card-foreground">{feature}</span>
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