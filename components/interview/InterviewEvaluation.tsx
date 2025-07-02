"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ThumbsUp, TrendingUp } from "lucide-react";
import InterviewPrep from "./InterviewPrep";
import MockInterview from "./MockInterview";
import InterviewReview from "./InterviewReview";
import dynamic from "next/dynamic";
import { useState } from "react";

const content = {
  tr: {
    title: "AI Mülakat Değerlendirmesi",
    summary: "AI, cevaplarını analiz etti ve aşağıdaki değerlendirmeyi hazırladı:",
    strengths: "Güçlü Yönlerin",
    devAreas: "Gelişime Açık Alanlar",
    score: "Genel Puan",
    aiComment: "AI Yorumu",
    suggestions: "Öneriler",
    finish: "Kapat"
  },
  en: {
    title: "AI Interview Evaluation",
    summary: "AI analyzed your answers and prepared the following evaluation:",
    strengths: "Your Strengths",
    devAreas: "Development Areas",
    score: "Overall Score",
    aiComment: "AI Comment",
    suggestions: "Suggestions",
    finish: "Close"
  }
};

const dummyEval = {
  strengths: {
    tr: ["Analitik düşünce", "İletişim becerisi", "Çözüm odaklılık"],
    en: ["Analytical thinking", "Communication skills", "Solution orientation"]
  },
  devAreas: {
    tr: ["Daha kısa ve net cevaplar verme", "Somut örneklerle destekleme"],
    en: ["Giving shorter and clearer answers", "Supporting with concrete examples"]
  },
  score: 82,
  aiComment: {
    tr: "Cevapların genel olarak güçlü, özellikle analitik yaklaşımın ve iletişim becerilerin öne çıkıyor. Cevaplarını daha fazla örnekle desteklersen çok daha etkili olabilirsin.",
    en: "Your answers are generally strong, especially your analytical approach and communication skills stand out. You can be even more effective by supporting your answers with more examples."
  },
  suggestions: {
    tr: [
      "Her soruda en az bir başarı hikayesi paylaş.",
      "Cevaplarını kısa ve öz tut.",
      "Gelişime açık yönlerini dürüstçe belirt, ardından nasıl geliştirdiğini anlat."
    ],
    en: [
      "Share at least one success story for each question.",
      "Keep your answers short and concise.",
      "Mention your development areas honestly, then explain how you improved them."
    ]
  }
};

const dummyUserProfile = {
  disc: { D: 82, I: 60, S: 55, C: 91, dominant: "C" },
  expertise: { "Sayısal Analiz": 94, "Stratejik Düşünme": 88, "Fiyatlama": 90 },
  simulation: { "Rol Uygunluğu": 85, "İletişim": 70 },
  cv: {
    summary: "Fiyatlandırma alanında 5+ yıl deneyimli, analitik ve detaycı uzman.",
    highlights: [
      "Büyük veri ile fiyat optimizasyonu",
      "Çapraz fonksiyonlu ekiplerle çalışma",
      "Yüksek başarıyla tamamlanan fiyatlandırma projeleri"
    ]
  },
  role: "Pricing Specialist"
};

const coachingData = {
  role: "Pricing Specialist",
  strengths: [
    { label: "Sayısal analiz yetkinliği", value: 94 },
    { label: "Stratejik düşünme", value: 88 },
    { label: "Detaylara dikkat", value: 85 }
  ],
  devAreas: [
    "Paydaşlarla müzakere yetkinliği",
    "Sunum ve ifade becerileri"
  ],
  positiveFraming: [
    "Müzakere konusunda deneyim kazanıyorum, ancak karar alma süreçlerinde veriyle ikna etme gücüm oldukça yüksek.",
    "Sunumlarımı önceden detaylı hazırlarım ve geri bildirimlerle sürekli geliştiririm."
  ],
  expectedQuestions: [
    "Yeni bir ürünün ideal fiyatını nasıl belirlersiniz?",
    "Satış ekibiyle fiyat konusunda yaşadığınız bir anlaşmazlığı nasıl çözdünüz?",
    "Rekabet analizi sonuçlarını fiyatlamanıza nasıl entegre edersiniz?",
    "Hangi araçları kullanarak fiyatlama kararlarını desteklersiniz?"
  ]
};

const mockQuestions = [
  "Satış ekibi indirimi zorlarken, sizin modeliniz indirimi desteklemiyorsa ne yaparsınız?",
  "Daha önce yürüttüğünüz bir fiyatlama projesini anlatır mısınız?",
  "Veri kısıtlı bir pazarda nasıl fiyatlama stratejisi kurarsınız?"
];

const reviewData = {
  role: "Pricing Specialist",
  scores: {
    fluency: 8.5,
    technical: 9.2,
    fit: 9.0,
    confidence: 6.5,
    clarity: 8.8,
    structure: 9.1
  },
  strengths: [
    "Teknik bilgi ve analiz gücü çok yüksek",
    "Cevaplarda yapı ve netlik",
    "Stratejik bakış açısı"
  ],
  devAreas: [
    "Paydaşlarla müzakere",
    "Sunum ve ikna becerileri"
  ],
  summary: "Kullanıcı teknik bilgi konusunda oldukça güçlü ve cevaplarında iyi bir yapı kurmuş. Satış tarafındaki senaryolarda ikna kabiliyeti gelişmekte. Genel olarak Pricing Specialist rolüne yüksek derecede uygundur.",
  recommendations: [
    "Müzakere ve ikna becerileri için vaka çalışmaları yapın.",
    "Sunum pratiğiyle iletişiminizi güçlendirin.",
    "Farklı departmanlarla işbirliği simülasyonları deneyin."
  ],
  radar: [
    { label: "Sayısal Düşünme", value: 92 },
    { label: "İletişim", value: 74 },
    { label: "Veri Kullanımı", value: 88 },
    { label: "Rol Uyumu", value: 90 },
    { label: "Müzakere", value: 65 }
  ]
};

const AVMockInterview = dynamic(
  () => import("./AVMockInterview").then(mod => mod.default),
  { ssr: false }
);

export default function InterviewEvaluation({ language = "tr", onClose }: { language?: "tr" | "en"; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'text' | 'av'>('text');
  // 0: Hazırlık, 1: Mock, 2: Değerlendirme
  if (step === 0) {
    return (
      <div>
        <div className="flex gap-4 mb-6 justify-center">
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'text' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('text')}
          >
            Yazılı Mülakat
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'av' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('av')}
          >
            Sesli/Video Mülakat
          </button>
        </div>
        <InterviewPrep language={language} onStartMock={() => setStep(1)} />
      </div>
    );
  }
  if (step === 1) {
    if (mode === 'text') {
      return <MockInterview language={language} onFinish={() => setStep(2)} />;
    } else {
      return <AVMockInterview />;
    }
  }
  if (step === 2) {
    return <InterviewReview review={reviewData} />;
  }
  return null;
} 