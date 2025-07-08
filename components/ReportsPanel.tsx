"use client";
import React from 'react';

const dummyReports = [
  {
    id: 1,
    type: 'Kariyer Raporu',
    summary: 'AI tarafından değil, örnek olarak oluşturulmuş kariyer raporu.',
    date: '2024-05-01',
    details: 'Güçlü yönler: Analitik düşünce, takım çalışması. Gelişim alanı: Zaman yönetimi.'
  },
  {
    id: 2,
    type: 'Rol Önerisi',
    summary: 'AI tarafından değil, örnek olarak oluşturulmuş rol önerisi.',
    date: '2024-05-02',
    details: 'Önerilen rol: Product Manager. Uyum: 85%.'
  },
  {
    id: 3,
    type: 'Simülasyon Raporu',
    summary: 'AI tarafından değil, örnek olarak oluşturulmuş simülasyon raporu.',
    date: '2024-05-03',
    details: 'Simülasyon: Ürün Lansmanı. Skor: 88.'
  }
];

export default function ReportsPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Raporlarım (Demo)</h2>
      <ul className="divide-y divide-gray-200">
        {dummyReports.map((r) => (
          <li key={r.id} className="py-4">
            <div className="font-semibold text-lg mb-1">{r.type}</div>
            <div className="text-gray-700 mb-1">{r.summary}</div>
            <div className="text-gray-500 text-sm mb-1">{r.date}</div>
            <div className="text-gray-600 text-sm">{r.details}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 