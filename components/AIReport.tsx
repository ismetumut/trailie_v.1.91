"use client";

import React from 'react';

const dummyReport = {
  summary: 'Bu, örnek bir AI kariyer raporudur. Burada özet, güçlü yönler, gelişim alanları ve öneriler yer alır.',
  strengths: ['Analitik düşünce', 'Takım çalışması', 'Yenilikçilik'],
  weaknesses: ['Daha iyi zaman yönetimi', 'Daha fazla liderlik deneyimi'],
  recommendations: ['Online liderlik eğitimi al', 'Mentor bul', 'Daha fazla proje yönet'],
  courses: [
    { title: 'Liderlik 101', platform: 'Coursera', url: 'https://coursera.org', duration: '4 hafta', level: 'Başlangıç', description: 'Liderlik temelleri' },
    { title: 'Proje Yönetimi', platform: 'Udemy', url: 'https://udemy.com', duration: '6 saat', level: 'Orta', description: 'Proje yönetimi pratikleri' }
  ],
  nextSteps: ['CV’ni güncelle', 'LinkedIn profilini optimize et', 'Yeni iş ilanlarına başvur']
};

export default function AIReport() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">AI Kariyer Raporu (Demo)</h2>
      <div className="mb-2 font-semibold">Özet</div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-800 text-sm mb-4">{dummyReport.summary}</div>
      <div className="mb-2 font-semibold text-green-700">Güçlü Yönler</div>
      <ul className="list-disc list-inside text-green-700 text-sm mb-4">
        {dummyReport.strengths.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <div className="mb-2 font-semibold text-red-700">Gelişim Alanları</div>
      <ul className="list-disc list-inside text-red-700 text-sm mb-4">
        {dummyReport.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
      <div className="mb-2 font-semibold">AI Önerileri</div>
      <ul className="list-disc list-inside text-blue-700 text-sm mb-4">
        {dummyReport.recommendations.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <div className="mb-2 font-semibold">Önerilen Kurslar</div>
      <ul className="list-disc list-inside text-indigo-700 text-sm mb-4">
        {dummyReport.courses.map((c, i) => <li key={i}><a href={c.url} target="_blank" rel="noopener noreferrer" className="underline">{c.title}</a> ({c.platform}, {c.duration}, {c.level}) - {c.description}</li>)}
      </ul>
      <div className="mb-2 font-semibold">Sonraki Adımlar</div>
      <ul className="list-disc list-inside text-gray-700 text-sm">
        {dummyReport.nextSteps.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
} 