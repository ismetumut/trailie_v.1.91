"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

interface ReviewData {
  role: string;
  scores: {
    fluency: number;
    technical: number;
    fit: number;
    confidence: number;
    clarity: number;
    structure: number;
  };
  strengths: string[];
  devAreas: string[];
  summary: string;
  recommendations: string[];
  radar: { label: string; value: number }[];
}

export default function InterviewReview({ review }: { review: ReviewData }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">AI Mülakat Değerlendirmesi</h2>
      <div className="mb-2 font-semibold">Rol: {review.role}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="font-semibold mb-1">Teknik ve Davranışsal Puanlar</div>
          <ul className="space-y-1 text-sm">
            <li>Akıcılık: <b>{review.scores.fluency}/10</b></li>
            <li>Teknik Derinlik: <b>{review.scores.technical}/10</b></li>
            <li>Role Uygunluk: <b>{review.scores.fit}/10</b></li>
            <li>Güven: <b>{review.scores.confidence}/10</b></li>
            <li>Düşünce Netliği: <b>{review.scores.clarity}/10</b></li>
            <li>Cevap Yapısı: <b>{review.scores.structure}/10</b></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1">Radar Analizi</div>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={review.radar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Aday" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="font-semibold mb-1 text-green-700">Güçlü Yönler</div>
          <ul className="list-disc list-inside text-green-700 text-sm">
            {review.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1 text-red-700">Gelişim Alanları</div>
          <ul className="list-disc list-inside text-red-700 text-sm">
            {review.devAreas.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">AI Özet Yorumu</div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-800 text-sm">
          {review.summary}
        </div>
      </div>
      <div>
        <div className="font-semibold mb-1">Gelişim İçin AI Önerileri</div>
        <ul className="list-disc list-inside text-blue-700 text-sm">
          {review.recommendations.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
} 