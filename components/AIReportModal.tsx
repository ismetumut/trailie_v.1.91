"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AIReportModalProps {
  discResults?: any;
  expertiseResults?: any;
  language?: "tr" | "en";
  buttonClassName?: string;
  buttonText?: string;
}

export default function AIReportModal({ discResults, expertiseResults, language = "tr", buttonClassName, buttonText }: AIReportModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generatePrompt = () => {
    let prompt = "";
    if (language === "tr") {
      prompt += "Aşağıda bir kullanıcının DISC kişilik testi ve uzmanlık analizi sonuçları verilmiştir. Bu kişiye özel, güçlü yönlerini ve kariyer potansiyelini özetleyen kısa bir değerlendirme hazırla. Sonunda, bir sonraki modüle geçerse daha kapsamlı bir rapor alabileceğini belirt. Cevabın Türkçe ve motive edici olsun.\n";
    } else {
      prompt += "Below are a user's DISC personality test and expertise analysis results. Write a short summary highlighting their strengths and career potential. At the end, mention that a more comprehensive report will be available if they proceed to the next module. Respond in English, in a motivating tone.\n";
    }
    if (discResults) {
      prompt += language === "tr" ? `\nDISC Sonucu: ${JSON.stringify(discResults)}` : `\nDISC Result: ${JSON.stringify(discResults)}`;
    }
    if (expertiseResults) {
      prompt += language === "tr" ? `\nUzmanlık Sonucu: ${JSON.stringify(expertiseResults)}` : `\nExpertise Result: ${JSON.stringify(expertiseResults)}`;
    }
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

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) fetchReport();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className={"text-lg font-semibold px-8 py-3 " + (buttonClassName || "") }>
          {buttonText || "🤖 AI Rapor Analizi"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{language === "tr" ? "AI Kısa Kariyer Özeti" : "AI Career Summary"}</DialogTitle>
        </DialogHeader>
        {loading && <div className="text-gray-600">{language === "tr" ? "Rapor hazırlanıyor..." : "Generating report..."}</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && report && (
          <div className="whitespace-pre-line text-gray-700 text-base leading-relaxed mt-2">
            {report}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 