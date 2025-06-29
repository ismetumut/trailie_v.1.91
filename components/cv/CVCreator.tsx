"use client";
import { useState } from "react";
import CVStart from "./CVStart";
import CVImport from "./CVImport";
// CVImport ve CVForm bileşenleri ileride eklenecek

export default function CVCreator({ language = "tr" }: { language?: "tr" | "en" }) {
  const [step, setStep] = useState<"start" | "linkedin" | "manual">("start");
  const [importedData, setImportedData] = useState<any>(null);

  return (
    <>
      {step === "start" && (
        <CVStart language={language} onSelect={(mode) => setStep(mode)} />
      )}
      {step === "linkedin" && (
        <CVImport
          language={language}
          onBack={() => setStep("start")}
          onImportComplete={(data) => {
            setImportedData(data);
            setStep("manual");
          }}
        />
      )}
      {step === "manual" && (
        <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-gray-500">(Manuel CV bilgi girişi ekranı buraya gelecek)</div>
      )}
    </>
  );
} 