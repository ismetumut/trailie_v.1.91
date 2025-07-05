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
    <div className="w-full max-w-screen-sm mx-auto p-4" style={{ maxWidth: '95vw' }}>
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 flex flex-col items-center gap-4 w-full" style={{ width: '100%' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 break-words w-full" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>{t.title}</h2>
        <p className="text-center text-gray-600 mb-4 text-base md:text-lg break-words w-full" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>{t.subtitle}</p>
        <div className="flex flex-col gap-4 w-full">
          <button
            style={{
              width: '100%',
              maxWidth: '100vw',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              fontSize: '0.95rem',
              padding: '0.75rem 1rem',
              textAlign: 'center',
              background: selected === "linkedin"
                ? 'linear-gradient(to right, #3b82f6, #60a5fa)'
                : '#f0f9ff',
              color: selected === "linkedin" ? 'white' : '#2563eb',
              borderRadius: '1rem',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={() => onSelect && onSelect("linkedin")}
          >
            <img src="/linkedin.svg" alt="LinkedIn" style={{ width: 24, height: 24, marginBottom: 2 }} />
            <span>{t.optionLinkedin}</span>
          </button>
          <button
            style={{
              width: '100%',
              maxWidth: '100vw',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              fontSize: '0.95rem',
              padding: '0.75rem 1rem',
              textAlign: 'center',
              background: selected === "manual"
                ? 'linear-gradient(to right, #22c55e, #86efac)'
                : '#f0fdf4',
              color: selected === "manual" ? 'white' : '#16a34a',
              borderRadius: '1rem',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              fontWeight: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={() => onSelect && onSelect("manual")}
          >
            <Edit3 style={{ width: 24, height: 24, marginBottom: 2 }} />
            <span>{t.optionManual}</span>
          </button>
        </div>
        <div className="w-full max-w-full bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded mb-2 text-sm break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
          <span style={{ display: 'block', wordBreak: 'break-word', whiteSpace: 'normal', overflowWrap: 'break-word', fontSize: '0.95rem', maxWidth: '100%' }}>
            {t.info}
          </span>
        </div>
      </div>
    </div>
  );
} 