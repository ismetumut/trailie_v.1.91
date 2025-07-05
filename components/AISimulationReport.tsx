"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from '@/contexts/AuthContext';
import { saveSimulationResult, saveUserReport } from '@/lib/firebase';

interface AISimulationReportProps {
  user?: { name?: string; avatarUrl?: string };
  discResults?: any;
  expertiseResults?: any;
  assessmentResults?: any;
  simulationResults?: any;
  language?: "tr" | "en";
}

const content = {
  tr: {
    title: "AI Gelişim Raporu",
    summary: "Simülasyon ve değerlendirme sonuçlarına göre kişisel gelişim raporunuz hazır!",
    strengths: "Güçlü Yönler",
    devAreas: "Gelişime Açık Alanlar",
    overallScore: "Genel Skor",
    radarTitle: "Yetkinlik Profili (AI Analizi)",
    aiAnalysis: "AI Analiz Yorumu",
    recommendations: "Eğitim Önerileri",
    userLabel: "Kullanıcı",
    scoreLabel: "Başarı Skoru",
    skills: ["İletişim", "Problem Çözme", "Teknik Yetenek", "Takım Çalışması", "Analitik Düşünme", "Liderlik"],
    noData: "Veri bulunamadı.",
    loading: "AI analizi hazırlanıyor..."
  },
  en: {
    title: "AI Development Report",
    summary: "Your personal development report is ready based on simulation and assessment results!",
    strengths: "Strengths",
    devAreas: "Areas for Development",
    overallScore: "Overall Score",
    radarTitle: "Competency Profile (AI Analysis)",
    aiAnalysis: "AI Analysis Comment",
    recommendations: "Learning Recommendations",
    userLabel: "User",
    scoreLabel: "Performance Score",
    skills: ["Communication", "Problem Solving", "Technical Skills", "Teamwork", "Analytical Thinking", "Leadership"],
    noData: "No data available.",
    loading: "AI analysis is being prepared..."
  }
};

// Real AI analysis function
async function getAIAnalysis(userData: any, language: "tr" | "en") {
  try {
    const response = await fetch('/api/ai-simulation-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userData,
        language
      }),
    });

    if (!response.ok) {
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('AI Analysis error:', error);
    // Fallback to default analysis
    return {
      strengths: language === "tr" ? ["İletişim", "İkna Kabiliyeti", "Takım Çalışması"] : ["Communication", "Persuasion", "Teamwork"],
      devAreas: language === "tr" ? ["Veri Analizi", "Teknik Yetenek"] : ["Data Analysis", "Technical Skills"],
      aiAnalysis: language === "tr" 
        ? "İkna kabiliyetiniz ve iletişim becerileriniz yüksek. Veri analizi ve teknik yetkinliklerde gelişim gösterebilirsiniz. Takım çalışmasında uyumlusunuz, liderlik potansiyeliniz var."
        : "Your persuasion and communication skills are strong. You can improve in data analysis and technical competencies. You are a good team player and have leadership potential.",
      recommendations: language === "tr" ? [
        {
          area: "Veri Analizi",
          links: [
            { label: "Coursera: Excel Skills for Business", url: "https://www.coursera.org/learn/excel" },
            { label: "LinkedIn Learning: SQL for Data Analysts", url: "https://linkedin.com/learning/sql-101" }
          ]
        },
        {
          area: "Teknik Yetenek",
          links: [
            { label: "Udemy: Modern JavaScript", url: "https://www.udemy.com/course/the-complete-javascript-course/" },
            { label: "Coursera: Python for Everybody", url: "https://www.coursera.org/specializations/python" }
          ]
        }
      ] : [
        {
          area: "Data Analysis",
          links: [
            { label: "Coursera: Excel Skills for Business", url: "https://www.coursera.org/learn/excel" },
            { label: "LinkedIn Learning: SQL for Data Analysts", url: "https://linkedin.com/learning/sql-101" }
          ]
        },
        {
          area: "Technical Skills",
          links: [
            { label: "Udemy: Modern JavaScript", url: "https://www.udemy.com/course/the-complete-javascript-course/" },
            { label: "Coursera: Python for Everybody", url: "https://www.coursera.org/specializations/python" }
          ]
        }
      ],
      radar: [
        { skill: language === "tr" ? "İletişim" : "Communication", value: 85 },
        { skill: language === "tr" ? "Problem Çözme" : "Problem Solving", value: 78 },
        { skill: language === "tr" ? "Teknik Yetenek" : "Technical Skills", value: 72 },
        { skill: language === "tr" ? "Takım Çalışması" : "Teamwork", value: 88 },
        { skill: language === "tr" ? "Analitik Düşünme" : "Analytical Thinking", value: 75 },
        { skill: language === "tr" ? "Liderlik" : "Leadership", value: 70 }
      ]
    };
  }
}

export default function AISimulationReport({ user, discResults, expertiseResults, assessmentResults, simulationResults, language = "tr" }: AISimulationReportProps) {
  const t = content[language];
  const { user: authUser } = useAuth();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const userData = {
        discResults,
        expertiseResults,
        assessmentResults,
        simulationResults
      };
      const aiAnalysis = await getAIAnalysis(userData, language);
      setAnalysis(aiAnalysis);
      setLoading(false);
      // Sonuç Firestore'a kaydedilsin
      if (authUser && aiAnalysis && !saved) {
        try {
          // Mevcut progress koleksiyonuna kaydet
          await saveSimulationResult(authUser.uid, {
            discResults,
            expertiseResults,
            assessmentResults,
            simulationResults,
            aiAnalysis,
            createdAt: new Date(),
          });
          
          // Reports koleksiyonuna da kaydet
          await saveUserReport(authUser.uid, {
            type: 'assessment',
            discResults,
            expertiseResults,
            assessmentResults,
            simulationResults,
            aiAnalysis,
            summary: aiAnalysis.summary || 'Kapsamlı Kariyer Analizi',
            score: aiAnalysis.score || 85,
            strengths: aiAnalysis.strengths || [],
            devAreas: aiAnalysis.weaknesses || aiAnalysis.devAreas || [],
            details: aiAnalysis.details || aiAnalysis.summary || '',
            createdAt: new Date()
          });
          
          setSaved(true);
        } catch (e) {
          console.error('Failed to save results:', e);
        }
      }
    };
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discResults, expertiseResults, assessmentResults, simulationResults, language, authUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center">
        <p className="text-gray-600">{t.noData}</p>
      </div>
    );
  }

  const overallScore = Math.round(analysis.radar.reduce((a: number, b: any) => a + b.value, 0) / analysis.radar.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Başlık ve kullanıcı */}
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-20 h-20 mb-2 shadow-lg">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center tracking-tight mb-1">{t.title}</h1>
          <div className="text-base md:text-lg text-gray-600 text-center mb-2">{t.summary}</div>
          <div className="text-sm text-gray-500 font-medium">{t.userLabel}: <span className="text-gray-700 font-semibold">{user?.name || "-"}</span></div>
        </div>
        {/* Genel Skor */}
        <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow p-6">
          <div className="text-lg font-semibold text-gray-800 mb-2">{t.overallScore}</div>
          <Progress value={overallScore} className="w-full max-w-md h-5 rounded-full" />
          <div className="text-base text-gray-700 mt-2 font-bold">{t.scoreLabel}: <span className="text-primary">{overallScore}/100</span></div>
        </div>
        {/* Güçlü Yönler & Gelişim Alanları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-2xl p-6 flex flex-col items-start shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 text-xl">💪</span>
              <span className="font-semibold text-gray-800 text-lg">{t.strengths}</span>
            </div>
            <ul className="list-disc list-inside text-green-700 text-base space-y-1">
              {analysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="bg-red-50 rounded-2xl p-6 flex flex-col items-start shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600 text-xl">🚩</span>
              <span className="font-semibold text-gray-800 text-lg">{t.devAreas}</span>
            </div>
            <ul className="list-disc list-inside text-red-700 text-base space-y-1">
              {analysis.devAreas.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
        {/* Radar Grafik */}
        <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-semibold text-gray-800 mb-2 text-lg">{t.radarTitle}</div>
          <div className="w-full h-64 max-w-lg">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analysis.radar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="AI" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* AI Metinsel Analiz */}
        <div className="bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl p-6 shadow flex flex-col gap-2">
          <div className="font-semibold text-gray-800 mb-1 text-lg">{t.aiAnalysis}</div>
          <div className="text-gray-700 text-base leading-relaxed">{analysis.aiAnalysis}</div>
        </div>
        {/* Eğitim Önerileri */}
        <div className="bg-white/80 rounded-2xl p-6 shadow flex flex-col gap-4">
          <div className="font-semibold text-gray-800 mb-2 text-lg">{t.recommendations}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.recommendations.map((rec: any, i: number) => (
              <div key={i} className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
                <div className="font-semibold text-indigo-700 mb-1 text-base">🎯 {rec.area}</div>
                <ul className="list-disc list-inside ml-4">
                  {rec.links.map((link: any, j: number) => (
                    <li key={j}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 