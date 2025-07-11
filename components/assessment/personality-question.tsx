"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  id: number;
  text: string;
  options: Array<{
    text: string;
    type: 'D' | 'I' | 'S' | 'C';
  }>;
}

interface PersonalityQuestionProps {
  questions?: DISCQuestion[];
  onComplete: (answers: any, discProfile: any) => void;
}

interface DISCProfile {
  dominant: 'D' | 'I' | 'S' | 'C';
  scores: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  description: string;
}

interface DISCOption {
  text: { tr: string; en: string };
  tag: 'D' | 'I' | 'S' | 'C';
}

interface DISCQuestion {
  id: number;
  text: { tr: string; en: string };
  options: DISCOption[];
}

const DISC_DESCRIPTIONS = {
  D: {
    title: 'Yönlendirici (Dominant)',
    description: 'Güçlü liderlik özellikleri, hedef odaklı, kararlı ve sonuç alıcı. Hızlı karar verir ve kontrolü elinde tutmayı sever.',
    color: '#ef4444',
    traits: ['Liderlik', 'Kararlılık', 'Hedef Odaklı', 'Kontrol']
  },
  I: {
    title: 'Etkileyici (Influential)',
    description: 'Sosyal, enerjik ve iletişim becerileri yüksek. İnsan ilişkilerinde başarılı ve motivasyonu yüksek.',
    color: '#f59e0b',
    traits: ['Sosyallik', 'Enerji', 'İletişim', 'Motivasyon']
  },
  S: {
    title: 'Destekleyici (Steady)',
    description: 'Sakin, anlayışlı ve sadık. Ekip çalışmasında güvenilir, dengeyi sağlayan ve destek veren.',
    color: '#10b981',
    traits: ['Sadakat', 'Anlayış', 'Denge', 'Destek']
  },
  C: {
    title: 'Analitik (Conscientious)',
    description: 'Detaycı, düzenli ve analitik düşünen. Kurallara uygun, sistematik ve kalite odaklı.',
    color: '#3b82f6',
    traits: ['Analitik', 'Düzen', 'Kalite', 'Sistem']
  }
};

// 31 soruluk güncel DISC envanteri (id: 4, 5, 7, 11, 12 hariç tüm orijinal sorular buraya eklenecek)
const DISC_QUESTIONS: DISCQuestion[] = [
  // id: 1
  {
    id: 1,
    text: { tr: "Yeni bir projeye başlarken hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when starting a new project?" },
    options: [
      { text: { tr: "Hedefe hızlıca ulaşmak isterim.", en: "I want to reach the goal quickly." }, tag: 'D' },
      { text: { tr: "Takımın motivasyonunu artırırım.", en: "I increase the team's motivation." }, tag: 'I' },
      { text: { tr: "Düzenli ve planlı ilerlerim.", en: "I proceed in an organized and planned way." }, tag: 'C' },
      { text: { tr: "Uyumlu ve destekleyici olurum.", en: "I am cooperative and supportive." }, tag: 'S' }
    ]
  },
  // id: 2
  {
    id: 2,
    text: { tr: "Bir ekip çalışmasında seni en çok ve en az tanımlayan özellik hangisi?", en: "Which of the following best and least describes you in teamwork?" },
    options: [
      { text: { tr: "Liderliği üstlenirim.", en: "I take the lead." }, tag: 'D' },
      { text: { tr: "Takımın moralini yüksek tutarım.", en: "I keep the team's morale high." }, tag: 'I' },
      { text: { tr: "Kurallara ve plana sadık kalırım.", en: "I stick to rules and plans." }, tag: 'C' },
      { text: { tr: "Destekleyici ve sabırlı olurum.", en: "I am supportive and patient." }, tag: 'S' }
    ]
  },
  // id: 3
  {
    id: 3,
    text: { tr: "Bir sorunla karşılaştığında hangisi seni en çok ve en az tanımlar?", en: "Which of the following best and least describes you when facing a problem?" },
    options: [
      { text: { tr: "Hızlıca çözüm üretirim.", en: "I quickly produce a solution." }, tag: 'D' },
      { text: { tr: "Başkalarını motive ederim.", en: "I motivate others." }, tag: 'I' },
      { text: { tr: "Detaylı analiz yaparım.", en: "I analyze details thoroughly." }, tag: 'C' },
      { text: { tr: "Süreci sabırla takip ederim.", en: "I patiently follow the process." }, tag: 'S' }
    ]
  },
  // id: 6-36 (id: 4, 5, 7, 11, 12 hariç tüm orijinal sorular buraya eklenecek)
  // ...
];

export function PersonalityQuestion({
  questions, 
  onComplete
}: PersonalityQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { most: number | null, least: number | null }>>({});
  const { language } = useLanguage();
  const TEXT = {
    tr: {
      question: 'Soru',
      previous: 'Önceki',
      next: 'Sonraki',
      seeResults: 'Sonuçları Gör',
      progress: '%',
    },
    en: {
      question: 'Question',
      previous: 'Previous',
      next: 'Next',
      seeResults: 'See Results',
      progress: '%',
    }
  };
  const t = TEXT[language];

  const currentQ = (questions && questions[currentQuestion]) || DISC_QUESTIONS[currentQuestion];
  const qLength = (questions && questions.length) || DISC_QUESTIONS.length;

  // Seçim fonksiyonu: önce most, sonra least seçimi yapılır
  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => {
      const prevMost = prev[currentQ.id]?.most;
      const prevLeast = prev[currentQ.id]?.least;
      if (prevMost === null || prevMost === undefined) {
        // İlk tıklama: most
        return { ...prev, [currentQ.id]: { most: optionIdx, least: null } };
      } else if (prevLeast === null || prevLeast === undefined && optionIdx !== prevMost) {
        // İkinci tıklama: least (most ile aynı olamaz)
        return { ...prev, [currentQ.id]: { most: prevMost, least: optionIdx } };
      } else if (prevMost === optionIdx) {
        // Most seçimini kaldır
        return { ...prev, [currentQ.id]: { most: null, least: prevLeast } };
      } else if (prevLeast === optionIdx) {
        // Least seçimini kaldır
        return { ...prev, [currentQ.id]: { most: prevMost, least: null } };
      } else {
        // Farklı bir seçeneğe tıklandıysa, most'u güncelle
        return { ...prev, [currentQ.id]: { most: optionIdx, least: null } };
      }
    });
  };

  // Sonuç hesaplama
  const calculateDISC = () => {
    const scores: { D: number; I: number; S: number; C: number } = { D: 0, I: 0, S: 0, C: 0 };
    const questionArray = questions || DISC_QUESTIONS;
    Object.entries(answers).forEach(([qid, a]) => {
      const q = questionArray.find(q => q.id === Number(qid));
      if (!q) return;
      if (a.most !== null) scores[q.options[a.most].tag]++;
      if (a.least !== null) scores[q.options[a.least].tag]--;
    });
    // Normalize 0-100
    const vals = Object.values(scores);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const normalized: { D: number; I: number; S: number; C: number } = {
      D: Math.round(((scores.D - min) / ((max - min) || 1)) * 100),
      I: Math.round(((scores.I - min) / ((max - min) || 1)) * 100),
      S: Math.round(((scores.S - min) / ((max - min) || 1)) * 100),
      C: Math.round(((scores.C - min) / ((max - min) || 1)) * 100),
    };
    return normalized;
  };

  const handleNext = () => {
    const questionArray = questions || DISC_QUESTIONS;
    if (Object.keys(answers).length === questionArray.length && Object.values(answers).every(a => a.most !== null && a.least !== null)) {
      const normalizedScores = calculateDISC();
      const dominant = (Object.entries(normalizedScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]) as 'D' | 'I' | 'S' | 'C';
      const discProfile = {
        dominant,
        scores: normalizedScores,
        description: DISC_DESCRIPTIONS[dominant].description
      };
      onComplete(normalizedScores, discProfile);
    } else if (currentQuestion < questionArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6]">
      {/* Progress Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="w-10" /> {/* Left spacer */}
          
          <div className="flex-1 mx-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{t.question} {currentQuestion + 1} / {qLength}</span>
              <span>{t.progress}{Math.round(((currentQuestion + 1) / qLength) * 100)}</span>
            </div>
            <Progress value={((currentQuestion + 1) / qLength) * 100} className="h-2" />
          </div>
          
          <div className="w-10" /> {/* Right spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-8 bg-white/90 backdrop-blur-sm shadow-lg border-0">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {currentQ.text[language]}
            </h2>

            {/* Options */}
          <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const most = answers[currentQ.id]?.most === idx;
                const least = answers[currentQ.id]?.least === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                      ${most ? 'border-green-500 bg-green-50 text-green-700' : ''}
                      ${least ? 'border-red-500 bg-red-50 text-red-700' : ''}
                      ${!most && !least ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50' : ''}`}
                    disabled={most && least}
                  >
                    <span className="font-medium">{option.text[language]}</span>
                    {most && <span className="ml-2 text-xs font-bold">({language === 'tr' ? 'En Çok' : 'Most'})</span>}
                    {least && <span className="ml-2 text-xs font-bold">({language === 'tr' ? 'En Az' : 'Least'})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.previous}
                </Button>
            
            <div className="text-sm text-gray-500">
              {currentQuestion + 1} / {qLength}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={
                !answers[currentQ.id] || answers[currentQ.id].most === null || answers[currentQ.id].least === null || answers[currentQ.id].most === answers[currentQ.id].least
              }
              className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669]"
            >
              {currentQuestion === qLength - 1 ? (language === 'tr' ? 'Sonuçları Gör' : 'See Results') : (language === 'tr' ? 'Sonraki' : 'Next')}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
      </Card>
      </div>
    </div>
  );
}
