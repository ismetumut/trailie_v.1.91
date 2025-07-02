import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // In a real implementation, you would analyze the transcripts with AI here
    // For demo, just return a dummy review
    res.status(200).json({
      review: {
        role: 'Pricing Specialist',
        scores: {
          fluency: 8.5,
          technical: 9.2,
          fit: 9.0,
          confidence: 6.5,
          clarity: 8.8,
          structure: 9.1
        },
        strengths: [
          'Teknik bilgi ve analiz gücü çok yüksek',
          'Cevaplarda yapı ve netlik',
          'Stratejik bakış açısı'
        ],
        devAreas: [
          'Paydaşlarla müzakere',
          'Sunum ve ikna becerileri'
        ],
        summary: 'Kullanıcı teknik bilgi konusunda oldukça güçlü ve cevaplarında iyi bir yapı kurmuş. Satış tarafındaki senaryolarda ikna kabiliyeti gelişmekte. Genel olarak Pricing Specialist rolüne yüksek derecede uygundur.',
        recommendations: [
          'Müzakere ve ikna becerileri için vaka çalışmaları yapın.',
          'Sunum pratiğiyle iletişiminizi güçlendirin.',
          'Farklı departmanlarla işbirliği simülasyonları deneyin.'
        ],
        radar: [
          { label: 'Sayısal Düşünme', value: 92 },
          { label: 'İletişim', value: 74 },
          { label: 'Veri Kullanımı', value: 88 },
          { label: 'Rol Uyumu', value: 90 },
          { label: 'Müzakere', value: 65 }
        ]
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 