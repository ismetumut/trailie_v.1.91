"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, ArrowRight } from "lucide-react";

const content = {
  tr: {
    title: "AI Destekli Mülakat Hazırlığı",
    subtitle: "Pozisyonun, güçlü ve gelişime açık yönlerin ile sana özel mülakat tiyoları ve örnek sorular:",
    position: "Pozisyon",
    strengths: "Güçlü Yönlerin",
    weaknesses: "Gelişime Açık Yönlerin",
    questions: "Sık Sorulan Sorular",
    tip: "AI Tiyosu",
    next: "Mock Interview'a Başla"
  },
  en: {
    title: "AI-Powered Interview Prep",
    subtitle: "Personalized interview tips and sample questions based on your position, strengths and development areas:",
    position: "Position",
    strengths: "Your Strengths",
    weaknesses: "Development Areas",
    questions: "Frequently Asked Questions",
    tip: "AI Tip",
    next: "Start Mock Interview"
  }
};

const dummyData = {
  position: {
    tr: "Ürün Yöneticisi (Product Manager)",
    en: "Product Manager"
  },
  strengths: {
    tr: ["Analitik düşünce", "İletişim", "Stratejik planlama"],
    en: ["Analytical thinking", "Communication", "Strategic planning"]
  },
  weaknesses: {
    tr: ["Detaylarda kaybolmak", "Aşırı mükemmeliyetçilik"],
    en: ["Getting lost in details", "Perfectionism"]
  },
  questions: [
    {
      tr: "Bir ürünün başarısını nasıl ölçersiniz?",
      en: "How do you measure the success of a product?",
      tip: {
        tr: "Analitik düşünce ve veri odaklı yaklaşımını vurgula. Kendi başarı hikayenden örnek ver.",
        en: "Highlight your analytical and data-driven approach. Give an example from your own success story."
      },
      avoid: {
        tr: "Sadece genel cevaplar verme, somut metrikler ve örnekler kullan.",
        en: "Avoid generic answers, use concrete metrics and examples."
      }
    },
    {
      tr: "Bir ekipte çatışma yaşandığında nasıl çözüm bulursun?",
      en: "How do you resolve conflicts within a team?",
      tip: {
        tr: "İletişim ve empati becerilerini öne çıkar. Takım ruhuna vurgu yap.",
        en: "Emphasize your communication and empathy skills. Highlight team spirit."
      },
      avoid: {
        tr: "Çatışmadan kaçındığını söylemekten kaçın, çözüm odaklı yaklaşımını göster.",
        en: "Avoid saying you just avoid conflict, show your solution-oriented approach."
      }
    },
    {
      tr: "Bir ürünü piyasaya sürmeden önce hangi adımları izlersin?",
      en: "What steps do you take before launching a product?",
      tip: {
        tr: "Stratejik planlama ve süreç yönetimi becerilerini vurgula.",
        en: "Highlight your strategic planning and process management skills."
      },
      avoid: {
        tr: "Sadece teknik detaylara odaklanma, büyük resmi de anlat.",
        en: "Don't focus only on technical details, explain the big picture too."
      }
    }
  ]
};

export default function InterviewPrep({ language = "tr", onStartMock }: { language?: "tr" | "en"; onStartMock: () => void }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">{t.title}</CardTitle>
            <div className="text-gray-500 text-sm mt-1">{t.subtitle}</div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-2">
            <div className="flex flex-wrap gap-4 items-center">
              <Badge className="bg-indigo-100 text-indigo-700 text-base px-3 py-1"><Sparkles className="w-4 h-4 mr-1 inline" />{t.position}: {dummyData.position[language]}</Badge>
              <Badge className="bg-green-100 text-green-700 text-base px-3 py-1">{t.strengths}: {dummyData.strengths[language].join(", ")}</Badge>
              <Badge className="bg-yellow-100 text-yellow-700 text-base px-3 py-1">{t.weaknesses}: {dummyData.weaknesses[language].join(", ")}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">{t.questions}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-2">
            {dummyData.questions.map((q, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="font-semibold text-gray-800 text-base">{q[language]}</div>
                <div className="flex flex-col md:flex-row gap-2 mt-1">
                  <div className="flex items-center gap-2 text-green-700"><Lightbulb className="w-4 h-4" /> <span className="font-semibold">{t.tip}:</span> <span>{q.tip[language]}</span></div>
                  <div className="flex items-center gap-2 text-yellow-700"><Lightbulb className="w-4 h-4" /> <span className="font-semibold">{t.weaknesses}:</span> <span>{q.avoid[language]}</span></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex justify-end mt-6">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 text-lg" onClick={onStartMock}>
            {t.next} <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
} 