'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EXPERTISE_QUESTIONS, type ExpertiseQuestion } from './expertise-questions-data';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExpertiseQuestionProps {
  onComplete: (result: { topRoles: { role: string; score: number }[]; allScores: Record<string, number> }) => void;
}

export function ExpertiseQuestion({ onComplete }: ExpertiseQuestionProps) {
  const { language } = useLanguage();
  const questions = EXPERTISE_QUESTIONS;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Skorlama fonksiyonu
  const calculateExpertiseResults = (answers: number[], questions: ExpertiseQuestion[]) => {
    const roleScores: Record<string, number> = {};
    answers.forEach((optionIdx, qIdx) => {
      if (optionIdx < 0) return;
      const roles = questions[qIdx].options[optionIdx].roles;
      roles.forEach(role => {
        roleScores[role] = (roleScores[role] || 0) + 1;
      });
    });
    // En yüksek 4 rolü bul
    const sortedRoles = Object.entries(roleScores).sort((a, b) => b[1] - a[1]);
    return {
      topRoles: sortedRoles.slice(0, 4).map(([role, score]) => ({ role, score })),
      allScores: roleScores
    };
  };

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === -1) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateExpertiseResults(answers, questions);
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const t = {
    next: language === 'tr' ? 'Sonraki' : 'Next',
    previous: language === 'tr' ? 'Önceki' : 'Previous',
    seeResults: language === 'tr' ? 'Sonuçları Gör' : 'See Results',
    question: language === 'tr' ? 'Soru' : 'Question',
    progress: '%',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6f2] to-[#d1f2e6]">
      {/* Progress Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="w-10" /> {/* Left spacer */}
          <div className="flex-1 mx-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{t.question} {currentQuestion + 1} / {questions.length}</span>
              <span>{t.progress}{Math.round(progress)}</span>
            </div>
            <Progress value={progress} className="h-2" />
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
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 text-[#8b5cf6]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-[#8b5cf6] bg-[#8b5cf6]'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option.text[language]}</span>
                  </div>
                </button>
              ))}
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
              {currentQuestion + 1} / {questions.length}
            </div>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === -1}
              className="flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed]"
            >
              {currentQuestion === questions.length - 1 ? t.seeResults : t.next}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 