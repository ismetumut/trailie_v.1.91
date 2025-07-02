"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIReportModal from '@/components/AIReportModal';

interface AIReportProps {
  discResults?: any;
  expertiseResults?: any;
  assessmentResults?: any;
  language?: "tr" | "en";
}

const AI_REPORTS_TR = {
  D: {
    title: "AI Report: D tipi (Dominant) baskın kişilik",
    getText: (scores: any) => `Puanlar: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nSen, sonuç odaklı, cesur ve girişken bir kişiliksin. Zorluklara meydan okumaktan korkmaz, liderliği doğal olarak üstlenirsin. Kısıtlamalar seni sıkar, kendi kararlarını almaktan keyif alırsın.\n\nGüçlü Yönlerin: Kararlılık, Risk alma, Liderlik\nGelişime Açık Alanlar: Sabır, Takım içi uyum, Detaylara dikkat`
  },
  I: {
    title: "AI Report: I tipi (Influencer) baskın kişilik",
    getText: (scores: any) => `Puanlar: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nSen, enerjik, sosyal ve ikna kabiliyeti yüksek birisin. İnsanlarla iletişimin gücülü, çevreni etkileyerek fark yaratırsın. İlham vermeyi ve insanlarla iş birliği yapmayı seversin.\n\nGüçlü Yönlerin: Sosyal zeka, Sunum yeteneği, Motive etme\nGelişime Açık Alanlar: Zaman yönetimi, Planlama, Dikkat`
  },
  S: {
    title: "AI Report: S tipi (Steady) baskın kişilik",
    getText: (scores: any) => `Puanlar: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nSen, sabırlı, istikrarlı ve takım ruhuna yatkın birisin. Değişime direnen değil, istikrarlı şekilde ilerleyen bir yapın var. Yardımseverliğin ve güvenilirliğin çevren tarafından takdir edilir.\n\nGüçlü Yönlerin: Sabır, Takım çalışması, Empati\nGelişime Açık Alanlar: Cesaret, Değişime uyum, İnisiyatif alma`
  },
  C: {
    title: "AI Report: C tipi (Compliant) baskın kişilik",
    getText: (scores: any) => `Puanlar: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nSen, analitik, detaycı ve kurallara bağlılığıyla bilinen bir yapıya sahipsin. Planlama, sistem kurma ve analiz etme senin doğal yeteneklerin. Mükemmelliyetçi bir bakışla, işleri hatasız yapmayı hedeflersin.\n\nGüçlü Yönlerin: Analitik düşünme, Planlama, Dikkat\nGelişime Açık Alanlar: Sosyal etkileşim, Esneklik, Pratik karar alma`
  },
  BALANCED: {
    title: "AI Report: Dengeli Profil (Hiçbir alan aşırı baskın değil)",
    getText: (scores: any) => `Puanlar: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nSen, durumlara göre farklı davranış kalıpları geliştirebilen esnek bir bireysin. Her ortamda uyum sağlayabilme becerin, farklı takımlarla çalışabilme yetkinliğin seni öne çıkarıyor.\n\nGüçlü Yönlerin: Uyum, Farklı perspektifleri birleştirme, Dengeli kararlar alma\nGelişime Açık Alanlar: Uzmanlaşma, Yön belirleme, Kendine güven`
  }
};

const AI_REPORTS_EN = {
  D: {
    title: "AI Report: Dominant (D) Personality",
    getText: (scores: any) => `Scores: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nYou are a result-oriented, bold, and enterprising person. You are not afraid to face challenges and naturally take on leadership. Restrictions bore you; you enjoy making your own decisions.\n\nStrengths: Determination, Risk-taking, Leadership\nDevelopment Areas: Patience, Team harmony, Attention to detail`
  },
  I: {
    title: "AI Report: Influencer (I) Personality",
    getText: (scores: any) => `Scores: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nYou are energetic, social, and highly persuasive. Your communication with people is strong, and you make a difference by influencing your environment. You love to inspire and collaborate.\n\nStrengths: Social intelligence, Presentation skills, Motivation\nDevelopment Areas: Time management, Planning, Attention`
  },
  S: {
    title: "AI Report: Steady (S) Personality",
    getText: (scores: any) => `Scores: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nYou are patient, stable, and a team player. You are not resistant to change but progress steadily. Your helpfulness and reliability are appreciated by those around you.\n\nStrengths: Patience, Teamwork, Empathy\nDevelopment Areas: Courage, Adaptation to change, Taking initiative`
  },
  C: {
    title: "AI Report: Compliant (C) Personality",
    getText: (scores: any) => `Scores: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nYou are known for being analytical, detail-oriented, and rule-abiding. Planning, system building, and analysis are your natural talents. With a perfectionist perspective, you aim to do things flawlessly.\n\nStrengths: Analytical thinking, Planning, Attention\nDevelopment Areas: Social interaction, Flexibility, Practical decision-making`
  },
  BALANCED: {
    title: "AI Report: Balanced Profile (No dominant area)",
    getText: (scores: any) => `Scores: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}\nYou are a flexible individual who can develop different behavioral patterns according to situations. Your ability to adapt to any environment and work with different teams makes you stand out.\n\nStrengths: Adaptability, Combining different perspectives, Making balanced decisions\nDevelopment Areas: Specialization, Setting direction, Self-confidence`
  }
};

export default function AIReport({ discResults, expertiseResults, assessmentResults, language = "tr" }: AIReportProps) {
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [appState, setAppState] = useState<'results' | 'expertise'>('results');
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  const generatePrompt = () => {
    let prompt = "";
    if (language === "tr") {
      prompt += "Aşağıda bir kullanıcının DISC kişilik testi, uzmanlık analizi ve varsa diğer değerlendirme sonuçları verilmiştir. Bu kişiye özel, güçlü yönlerini, gelişim alanlarını ve kariyer önerilerini içeren kısa bir değerlendirme özeti hazırla.\n";
    } else {
      prompt += "Below are a user's DISC personality test, expertise analysis, and other assessment results if available. Write a short summary including strengths, areas for development, and career suggestions personalized for this user.\n";
    }
    if (discResults) {
      prompt += language === "tr" ? `\nDISC Sonucu: ${JSON.stringify(discResults)}` : `\nDISC Result: ${JSON.stringify(discResults)}`;
    }
    if (expertiseResults) {
      prompt += language === "tr" ? `\nUzmanlık Sonucu: ${JSON.stringify(expertiseResults)}` : `\nExpertise Result: ${JSON.stringify(expertiseResults)}`;
    }
    if (assessmentResults) {
      prompt += language === "tr" ? `\nEk Değerlendirme: ${JSON.stringify(assessmentResults)}` : `\nAdditional Assessment: ${JSON.stringify(assessmentResults)}`;
    }
    prompt += language === "tr" ? "\nCevabın Türkçe ve samimi, motive edici bir dille olsun." : "\nRespond in English, in a friendly and motivating tone.";
    return prompt;
  };

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    setReport("");
    try {
      const res = await fetch("/api/ai-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: generatePrompt() })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setReport(data.result || "");
    } catch (err: any) {
      setError(language === "tr" ? "AI raporu alınamadı." : "Failed to fetch AI report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, [JSON.stringify(discResults), JSON.stringify(expertiseResults), JSON.stringify(assessmentResults), language]);

  let reportTitle = "";
  let reportText = "";

  if (discResults && discResults.scores) {
    const scores = discResults.scores;
    const maxScore = Math.max(scores.D, scores.I, scores.S, scores.C);
    const dominantTypes = Object.keys(scores).filter(k => scores[k] === maxScore);
    const minScore = Math.min(scores.D, scores.I, scores.S, scores.C);
    const isTR = language === 'tr';
    const REPORTS = isTR ? AI_REPORTS_TR : AI_REPORTS_EN;
    if (maxScore - minScore <= 2) {
      reportTitle = REPORTS.BALANCED.title;
      reportText = REPORTS.BALANCED.getText(scores);
    } else {
      const dominant = dominantTypes[0] as 'D' | 'I' | 'S' | 'C';
      reportTitle = REPORTS[dominant].title;
      reportText = REPORTS[dominant].getText(scores);
    }
  }

  return (
    <Card className="mt-8 bg-gradient-to-br from-blue-50 to-emerald-50 border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          🤖 {language === "tr" ? "AI Değerlendirme Raporu" : "AI Assessment Report"}
        </h2>
        {discResults && discResults.scores ? (
          <div className="whitespace-pre-line text-gray-700 text-lg leading-relaxed">
            <div className="font-bold mb-2">{reportTitle}</div>
            {reportText}
          </div>
        ) : (
          <div className="text-gray-600">Kişilik testi sonucu bulunamadı.</div>
        )}
        <Button onClick={fetchReport} variant="outline" className="mt-4">
          {language === "tr" ? "Raporu Yenile" : "Regenerate Report"}
        </Button>
        {appState === 'results' && discResults && (
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button
                onClick={() => setAppState('expertise')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
              >
                🚀 Uzmanlık Analizine Geç
              </Button>
              <AIReportModal discResults={discResults} language={lang} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 