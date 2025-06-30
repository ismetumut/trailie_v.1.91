"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Linkedin, Edit3, Info } from "lucide-react";

const content = {
  tr: {
    title: "AI Destekli CV Oluştur",
    subtitle: "Kariyer yolculuğuna uygun, global standartlarda CV'ni oluştur.",
    optionLinkedin: "LinkedIn'den Otomatik Veri Çek (veya Dosya Yükle)",
    optionManual: "Manuel Olarak CV Bilgilerini Gir",
    info: "Dilersen önceki modüllerdeki (kişilik, uzmanlık, simülasyon) verilerin otomatik olarak CV'ne eklenebilir.",
    continue: "Devam Et"
  },
  en: {
    title: "Create AI-Powered Resume",
    subtitle: "Build your CV in global standards, tailored to your career journey.",
    optionLinkedin: "Import from LinkedIn (or Upload File)",
    optionManual: "Enter CV Details Manually",
    info: "You can automatically include your previous module results (personality, expertise, simulation) in your CV.",
    continue: "Continue"
  }
};

export default function CVStart({ language = "tr", onSelect }: { language?: "tr" | "en"; onSelect?: (mode: "linkedin" | "manual") => void }) {
  const t = content[language];
  const [selected, setSelected] = useState<"linkedin" | "manual" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
          <div className="text-center text-gray-500 mb-2">{t.subtitle}</div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Button
              variant={selected === "linkedin" ? "default" : "outline"}
              className={`flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-xl shadow transition-all duration-200 ${selected === "linkedin" ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' : 'bg-white/80 text-blue-700 border-blue-200 hover:bg-blue-50'}`}
              onClick={() => setSelected("linkedin")}
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" /> {t.optionLinkedin}
            </Button>
            <Button
              variant={selected === "manual" ? "default" : "outline"}
              className={`flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-xl shadow transition-all duration-200 ${selected === "manual" ? 'bg-gradient-to-r from-green-500 to-green-300 text-white' : 'bg-white/80 text-green-700 border-green-200 hover:bg-green-50'}`}
              onClick={() => setSelected("manual")}
            >
              <Edit3 className="w-6 h-6" /> {t.optionManual}
            </Button>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 text-yellow-800 text-sm">
            <Info className="w-5 h-5" />
            {t.info}
          </div>
          <Button
            className="mt-2 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg disabled:opacity-60"
            disabled={!selected}
            onClick={() => selected && onSelect?.(selected)}
          >
            {t.continue}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 