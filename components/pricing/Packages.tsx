"use client";
import { useState } from "react";
import ModuleCard from "./module-card";
import PaymentForm from "../payment/PaymentForm";

type Lang = 'tr' | 'en';

const content: Record<Lang, any> = {
  tr: {
    title: "Paketler ve Fiyatlandırma",
    subtitle: "İhtiyacına uygun paketi seç, tüm modüllerin kilidini aç.",
    full: "Full Paket (Tüm Modüller)",
    medium: "Orta Paket (3 Modül)",
    mini: "Mini Paket (1 Modül)",
    free: "Kişilik Envanteri Ücretsizdir.",
    features: {
      assessment: "Kişilik Envanteri (Ücretsiz)",
      expertise: "Uzmanlık Analizi",
      simulation: "Rol Simülasyonu",
      cv: "AI ile CV Oluşturma",
      jobs: "İş İlanları Erişimi",
      interview: "Mülakat Hazırlığı"
    }
  },
  en: {
    title: "Packages & Pricing",
    subtitle: "Choose the package that fits your needs and unlock all modules.",
    full: "Full Package (All Modules)",
    medium: "Medium Package (3 Modules)",
    mini: "Mini Package (1 Module)",
    free: "Personality Assessment is Free.",
    features: {
      assessment: "Personality Assessment (Free)",
      expertise: "Expertise Analysis",
      simulation: "Role Simulation",
      cv: "AI-powered CV Builder",
      jobs: "Job Board Access",
      interview: "Interview Prep"
    }
  }
};

const packages = [
  {
    key: "full",
    title: (lang: Lang) => content[lang].full,
    price: "$14.99",
    features: (lang: Lang) => [
      content[lang].features.assessment,
      content[lang].features.expertise,
      content[lang].features.simulation,
      content[lang].features.cv,
      content[lang].features.jobs,
      content[lang].features.interview
    ],
    isBest: true
  },
  {
    key: "medium",
    title: (lang: Lang) => content[lang].medium,
    price: "$9.99",
    features: (lang: Lang) => [
      content[lang].features.assessment,
      content[lang].features.expertise,
      content[lang].features.simulation
    ]
  },
  {
    key: "mini",
    title: (lang: Lang) => content[lang].mini,
    price: "$4.99",
    features: (lang: Lang) => [
      content[lang].features.assessment,
      content[lang].features.cv
    ]
  }
];

export default function Packages({ language = "tr" }: { language?: Lang }) {
  const t = content[language];
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedPackage(null);
    // Redirect to home page (dashboard state)
    window.location.href = '/';
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPackage(null);
  };

  if (showPayment && selectedPackage) {
    return (
      <PaymentForm
        amount={selectedPackage.price}
        packageName={selectedPackage.title(language)}
        language={language}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <div className="text-gray-500 text-sm mb-6">{t.subtitle}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <ModuleCard
              key={p.key}
              title={p.title(language)}
              features={p.features(language)}
              price={p.price}
              isBest={!!p.isBest}
              locked={false}
              onSelect={() => handlePackageSelect(p)}
              language={language}
            />
          ))}
        </div>
        <div className="text-center text-xs text-gray-400 mt-6">{t.free}</div>
      </div>
    </div>
  );
} 