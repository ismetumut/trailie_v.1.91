"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ThumbsUp, TrendingUp } from "lucide-react";

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

export default function InterviewEvaluation({ language = "tr", onClose }: { language?: "tr" | "en"; onClose: () => void }) {
  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" /> {t.title}
            </CardTitle>
            <div className="text-gray-500 text-sm mt-1">{t.summary}</div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-2">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-100 text-green-700 text-base px-3 py-1"><ThumbsUp className="w-4 h-4 mr-1 inline" />{t.strengths}: {dummyEval.strengths[language].join(", ")}</Badge>
              <Badge className="bg-yellow-100 text-yellow-700 text-base px-3 py-1"><TrendingUp className="w-4 h-4 mr-1 inline" />{t.devAreas}: {dummyEval.devAreas[language].join(", ")}</Badge>
              <Badge className="bg-indigo-100 text-indigo-700 text-base px-3 py-1"><Star className="w-4 h-4 mr-1 inline" />{t.score}: {dummyEval.score}/100</Badge>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-semibold text-gray-800 mb-1">{t.aiComment}</div>
              <div className="text-gray-700 text-sm">{dummyEval.aiComment[language]}</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-semibold text-gray-800 mb-1">{t.suggestions}</div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {dummyEval.suggestions[language].map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg" onClick={onClose}>{t.finish}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 