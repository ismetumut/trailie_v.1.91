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

export default function AIReportModal({ discResults, expertiseResults, language = "tr", buttonClassName, buttonText }: AIReportModalProps) {
  const [open, setOpen] = useState(false);

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

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
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
        {discResults && discResults.scores ? (
          <div className="whitespace-pre-line text-gray-700 text-base leading-relaxed mt-2">
            <div className="font-bold mb-2">{reportTitle}</div>
            {reportText}
          </div>
        ) : (
          <div className="text-gray-600">{language === "tr" ? "Kişilik testi sonucu bulunamadı." : "Personality test result not found."}</div>
        )}
      </DialogContent>
    </Dialog>
  );
} 