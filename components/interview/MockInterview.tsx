"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

const content = {
  tr: {
    title: "Mock Interview (Deneme Mülakatı)",
    instruction: "Aşağıdaki soruya kendi kelimelerinle cevap ver. AI, cevaplarını analiz edecek.",
    next: "Sonraki Soru",
    prev: "Önceki Soru",
    finish: "Değerlendirmeye Geç"
  },
  en: {
    title: "Mock Interview",
    instruction: "Answer the question below in your own words. AI will analyze your answers.",
    next: "Next Question",
    prev: "Previous Question",
    finish: "Go to Evaluation"
  }
};

const dummyQuestions = [
  {
    tr: "Bir ürünün başarısını nasıl ölçersiniz?",
    en: "How do you measure the success of a product?"
  },
  {
    tr: "Bir ekipte çatışma yaşandığında nasıl çözüm bulursun?",
    en: "How do you resolve conflicts within a team?"
  },
  {
    tr: "Bir ürünü piyasaya sürmeden önce hangi adımları izlersin?",
    en: "What steps do you take before launching a product?"
  }
];

export default function MockInterview({ language = "tr", onFinish }: { language?: "tr" | "en"; onFinish: (answers: string[]) => void }) {
  const t = content[language];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(dummyQuestions.length).fill(""));

  const handleChange = (val: string) => {
    const updated = [...answers];
    updated[step] = val;
    setAnswers(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" /> {t.title}
            </CardTitle>
            <div className="text-gray-500 text-sm mt-1">{t.instruction}</div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mt-2">
            <div className="font-semibold text-lg text-gray-800 mb-2">{dummyQuestions[step][language]}</div>
            <Textarea
              rows={5}
              placeholder={language === 'tr' ? 'Cevabınızı buraya yazın...' : 'Type your answer here...'}
              value={answers[step]}
              onChange={e => handleChange(e.target.value)}
              className="text-base"
            />
            <div className="flex justify-between gap-2 mt-4">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> {t.prev}
              </Button>
              {step < dummyQuestions.length - 1 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!answers[step]}>
                  {t.next} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold" onClick={() => onFinish(answers)} disabled={!answers[step]}>
                  {t.finish} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 