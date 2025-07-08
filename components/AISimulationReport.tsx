"use client";

import React from 'react';

const dummySimulation = {
  title: 'Demo Simülasyon: Ürün Lansmanı',
  score: 88,
  feedback: 'Simülasyon boyunca analitik düşünme ve takım çalışması becerilerin öne çıktı. Zaman yönetimi konusunda biraz daha gelişebilirsin.',
  strengths: ['Analitik düşünce', 'Takım çalışması'],
  improvements: ['Zaman yönetimi'],
  steps: [
    'Pazar araştırması yapıldı',
    'Ürün özellikleri belirlendi',
    'Lansman stratejisi oluşturuldu',
    'Ekip ile iletişim sağlandı'
  ]
};

export default function AISimulationReport() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">AI Simülasyon Raporu (Demo)</h2>
      <div className="mb-2 font-semibold">Simülasyon: {dummySimulation.title}</div>
      <div className="mb-2">Skor: <span className="font-bold text-green-700">{dummySimulation.score}</span></div>
      <div className="mb-2 font-semibold">Geri Bildirim</div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-800 text-sm mb-4">{dummySimulation.feedback}</div>
      <div className="mb-2 font-semibold text-green-700">Güçlü Yönler</div>
      <ul className="list-disc list-inside text-green-700 text-sm mb-4">
        {dummySimulation.strengths.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <div className="mb-2 font-semibold text-red-700">Gelişim Alanları</div>
      <ul className="list-disc list-inside text-red-700 text-sm mb-4">
        {dummySimulation.improvements.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
      <div className="mb-2 font-semibold">Simülasyon Adımları</div>
      <ul className="list-disc list-inside text-gray-700 text-sm">
        {dummySimulation.steps.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
} 