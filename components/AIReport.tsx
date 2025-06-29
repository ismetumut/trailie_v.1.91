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

  return (
    <Card className="mt-8 bg-gradient-to-br from-blue-50 to-emerald-50 border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          🤖 {language === "tr" ? "AI Değerlendirme Raporu" : "AI Assessment Report"}
        </h2>
        {loading && <div className="text-gray-600">{language === "tr" ? "Rapor hazırlanıyor..." : "Generating report..."}</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && report && (
          <div className="whitespace-pre-line text-gray-700 text-lg leading-relaxed">
            {report}
          </div>
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