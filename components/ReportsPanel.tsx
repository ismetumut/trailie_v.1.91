"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Award, BarChart3 } from "lucide-react";

const content = {
  tr: {
    title: "Raporlar",
    disc: "DISC Raporu",
    expertise: "Uzmanlık Raporu",
    assessment: "Assessment Raporu",
    close: "Kapat",
    discReport: {
      title: "DISC Kişilik Raporu",
      summary: "Baskın tipiniz: D (Dominant). Liderlik ve sonuç odaklılık öne çıkıyor. AI yorumu: Takım içinde liderlik rolünü üstleniyorsunuz, hızlı karar alabiliyor ve zorluklardan yılmıyorsunuz. Gelişim için sosyal etkileşim ve esneklik üzerinde çalışabilirsiniz.",
      score: 88,
      strengths: ["Liderlik", "Kararlılık", "Sonuç Odaklılık", "Hızlı Karar"],
      devAreas: ["Esneklik", "Sosyal Etkileşim", "Empati"],
      details: "AI Analizi: D tipi kişiliğinizle, baskı altında dahi hedef odaklı kalabiliyor ve ekibinizi motive edebiliyorsunuz. Zaman zaman daha fazla empati ve esneklik göstermek, takım içi iletişimi güçlendirecektir.",
      spider: {
        labels: ["Liderlik", "İletişim", "Analitik", "Uyum", "Motivasyon", "Empati"],
        data: [95, 70, 80, 60, 85, 55]
      }
    },
    expertiseReport: {
      title: "Uzmanlık Analizi Raporu",
      summary: "En güçlü alanınız: Pazarlama. Stratejik düşünme, yaratıcılık ve veri analizi becerileriniz yüksek. AI yorumu: Dijital kampanya yönetiminde ve marka stratejisinde öne çıkıyorsunuz.",
      score: 91,
      strengths: ["Stratejik Düşünme", "Yaratıcılık", "Veri Analizi"],
      devAreas: ["Teknik Analiz", "Sunum Becerisi"],
      details: "AI Analizi: Pazarlama alanında yenilikçi fikirler üretebiliyor ve veriye dayalı kararlar alabiliyorsunuz. Teknik analiz ve sunum becerilerinizi geliştirmeniz önerilir."
    },
    assessmentReport: {
      title: "Assessment Raporu",
      summary: "Açık uçlu sorularda iletişim, problem çözme ve takım çalışması becerileriniz öne çıktı. AI yorumu: Zorlu durumlarda analitik düşünerek çözüm üretiyor, takım içinde uyumlu çalışıyorsunuz.",
      score: 85,
      strengths: ["İletişim", "Problem Çözme", "Takım Çalışması", "Analitik Düşünme"],
      devAreas: ["Detaycılık", "Zaman Yönetimi"],
      details: "AI Analizi: Özellikle karmaşık problemlerde hızlı ve etkili çözümler üretebiliyorsunuz. Zaman yönetimi ve detaylara daha fazla odaklanmak gelişiminizi destekleyecektir.",
      spider: {
        labels: ["İletişim", "Analitik", "Takım Çalışması", "Yaratıcılık", "Liderlik", "Zaman Yönetimi"],
        data: [90, 80, 85, 75, 70, 60]
      }
    }
  },
  en: {
    title: "Reports",
    disc: "DISC Report",
    expertise: "Expertise Report",
    assessment: "Assessment Report",
    close: "Close",
    discReport: {
      title: "DISC Personality Report",
      summary: "Your dominant type: D (Dominant). Leadership and result-orientation stand out. AI comment: You take the lead in teams, make quick decisions, and are not afraid of challenges. For development, focus on flexibility and social interaction.",
      score: 88,
      strengths: ["Leadership", "Decisiveness", "Result-Oriented", "Quick Decision"],
      devAreas: ["Flexibility", "Social Interaction", "Empathy"],
      details: "AI Analysis: With your D-type personality, you remain goal-oriented even under pressure and can motivate your team. Sometimes, showing more empathy and flexibility will strengthen team communication.",
      spider: {
        labels: ["Leadership", "Communication", "Analytical", "Adaptability", "Motivation", "Empathy"],
        data: [95, 70, 80, 60, 85, 55]
      }
    },
    expertiseReport: {
      title: "Expertise Analysis Report",
      summary: "Your strongest area: Marketing. Strategic thinking, creativity, and data analysis skills are high. AI comment: You excel in digital campaign management and brand strategy.",
      score: 91,
      strengths: ["Strategic Thinking", "Creativity", "Data Analysis"],
      devAreas: ["Technical Analysis", "Presentation Skills"],
      details: "AI Analysis: You can generate innovative ideas in marketing and make data-driven decisions. Improving your technical analysis and presentation skills is recommended."
    },
    assessmentReport: {
      title: "Assessment Report",
      summary: "In open-ended questions, your communication, problem-solving, and teamwork skills stood out. AI comment: You produce solutions analytically in challenging situations and work harmoniously in teams.",
      score: 85,
      strengths: ["Communication", "Problem Solving", "Teamwork", "Analytical Thinking"],
      devAreas: ["Attention to Detail", "Time Management"],
      details: "AI Analysis: You can quickly and effectively solve complex problems. Focusing more on time management and details will support your development.",
      spider: {
        labels: ["Communication", "Analytical", "Teamwork", "Creativity", "Leadership", "Time Management"],
        data: [90, 80, 85, 75, 70, 60]
      }
    }
  }
};

interface ReportData {
  title: string;
  summary: string;
  score: number;
  strengths: string[];
  devAreas: string[];
  details: string;
  spider?: {
    labels: string[];
    data: number[];
  };
}

interface ReportsPanelProps {
  language?: 'tr' | 'en';
}

export default function ReportsPanel({ language = "tr" }: ReportsPanelProps) {
  const t = content[language];
  const [open, setOpen] = useState<null | "disc" | "expertise" | "assessment">(null);

  const reportData: ReportData | null =
    open === "disc"
      ? t.discReport
      : open === "expertise"
      ? t.expertiseReport
      : open === "assessment"
      ? t.assessmentReport
      : null;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50/60 shadow-xl rounded-2xl p-4 border-0">
      <CardHeader className="flex flex-row items-center gap-2 mb-2">
        <BarChart3 className="w-6 h-6 text-indigo-500" />
        <CardTitle className="text-xl font-bold tracking-tight text-gray-900">{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <Button
            variant={open === "disc" ? "default" : "outline"}
            onClick={() => setOpen("disc")}
            className={`rounded-full px-6 py-2 font-semibold shadow transition-all duration-200 ${open === "disc" ? 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900' : 'bg-white/80 text-yellow-700 border-yellow-200 hover:bg-yellow-50'}`}
          >
            <Award className="w-5 h-5 mr-2 text-yellow-500" /> {t.disc}
          </Button>
          <Button
            variant={open === "expertise" ? "default" : "outline"}
            onClick={() => setOpen("expertise")}
            className={`rounded-full px-6 py-2 font-semibold shadow transition-all duration-200 ${open === "expertise" ? 'bg-gradient-to-r from-green-400 to-green-200 text-gray-900' : 'bg-white/80 text-green-700 border-green-200 hover:bg-green-50'}`}
          >
            <Award className="w-5 h-5 mr-2 text-green-500" /> {t.expertise}
          </Button>
          <Button
            variant={open === "assessment" ? "default" : "outline"}
            onClick={() => setOpen("assessment")}
            className={`rounded-full px-6 py-2 font-semibold shadow transition-all duration-200 ${open === "assessment" ? 'bg-gradient-to-r from-purple-400 to-pink-200 text-gray-900' : 'bg-white/80 text-purple-700 border-purple-200 hover:bg-purple-50'}`}
          >
            <Award className="w-5 h-5 mr-2 text-purple-500" /> {t.assessment}
          </Button>
        </div>
        {reportData && (
          <Card className="bg-gradient-to-br from-white/90 to-blue-50/80 border-0 shadow-lg rounded-xl p-6 mt-2 w-full max-w-xl mx-auto animate-fade-in">
            <CardHeader className="flex flex-row items-center gap-2 mb-2">
              <Award className="w-6 h-6 text-yellow-500" />
              <CardTitle className="text-lg font-semibold text-gray-900">{reportData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-gray-700 text-base font-medium">{reportData.summary}</div>
              <div className="mb-4">
                <span className="font-semibold text-gray-700">{language === "tr" ? "Skor" : "Score"}:</span> <span className="text-indigo-700 font-bold">{reportData.score}/100</span>
                <Progress value={reportData.score} className="h-2 mt-1 bg-indigo-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="font-semibold mb-1 text-green-700">{language === "tr" ? "Güçlü Yönler" : "Strengths"}</div>
                  <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                    {reportData.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1 text-red-700">{language === "tr" ? "Gelişim Alanları" : "Development Areas"}</div>
                  <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                    {reportData.devAreas.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>
              {reportData.spider && (
                <div className="my-6">
                  <div className="font-semibold text-center mb-2 text-blue-700">{language === "tr" ? "Yetenek Profili (Spider Grafiği)" : "Skill Profile (Spider Chart)"}</div>
                  <div className="text-center text-gray-600 text-sm">
                    {language === "tr" ? "Grafik yükleniyor..." : "Chart loading..."}
                  </div>
                </div>
              )}
              <div className="mt-4 text-gray-600 text-sm whitespace-pre-line">
                {reportData.details}
              </div>
              <div className="flex justify-center mt-6">
                <Button className="rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-gray-200 to-gray-50 text-gray-700 border-0 shadow hover:bg-gray-100" variant="outline" onClick={() => setOpen(null)}>{t.close}</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
} 