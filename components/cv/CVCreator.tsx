"use client";
import { useState } from "react";
import CVStart from "./CVStart";
import CVImport from "./CVImport";
import { saveUserCV } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
// CVImport ve CVForm bileşenleri ileride eklenecek

export default function CVCreator({ language = "tr" }: { language?: "tr" | "en" }) {
  const [step, setStep] = useState<"start" | "linkedin" | "manual">("start");
  const [importedData, setImportedData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const t = {
    tr: { success: "CV başarıyla kaydedildi!", error: "CV kaydedilemedi." },
    en: { success: "CV saved successfully!", error: "Failed to save CV." }
  };
  const [error, setError] = useState<string | null>(null);

  const handleImportComplete = async (data: any) => {
    setImportedData(data);
    setStep("manual");
    if (!user) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await saveUserCV(user.uid, {
        ...data,
        name: data.personalInfo?.name || "CV",
        date: new Date().toISOString(),
        img: "/placeholder-cv.svg",
      });
      setSuccess(true);
    } catch (e) {
      setError(t[language].error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {step === "start" && (
        <CVStart language={language} onSelect={(mode) => setStep(mode)} />
      )}
      {step === "linkedin" && (
        <CVImport
          language={language}
          onBack={() => setStep("start")}
          onImportComplete={handleImportComplete}
        />
      )}
      {step === "manual" && (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          {saving && <div className="text-blue-500 text-lg font-semibold">Kaydediliyor...</div>}
          {success && <div className="text-green-600 text-lg font-semibold">{t[language].success}</div>}
          {error && <div className="text-red-500 text-lg font-semibold">{error}</div>}
          <div className="text-2xl font-bold text-gray-500">(Manuel CV bilgi girişi ekranı buraya gelecek)</div>
        </div>
      )}
    </>
  );
} 