import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description, steps, answers, language } = req.body;
  if (!title || !description || !steps || !answers || !language) {
    return res.status(400).json({ error: 'Eksik veri' });
  }

  // Demo mode kontrolü
  const isDemoMode = !process.env.OPENAI_API_KEY && !process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (isDemoMode) {
    const demoAnalysis = {
      strengths: ["Demo güçlü yön 1", "Demo güçlü yön 2"],
      weaknesses: ["Demo gelişim alanı 1", "Demo gelişim alanı 2"],
      trainings: [
        { title: "Demo Eğitim 1", platform: "Coursera", url: "https://coursera.org" },
        { title: "Demo Eğitim 2", platform: "Udemy", url: "https://udemy.com" }
      ]
    };
    return res.status(200).json(demoAnalysis);
  }

  let prompt = '';
  if (language === 'tr') {
    prompt = `Aşağıda bir simülasyon senaryosu, görev adımları ve bir kullanıcının açık uçlu sorulara verdiği yanıtlar var. Lütfen bu yanıtları analiz et ve aşağıdaki formatta JSON olarak dön:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "trainings": [
    { "title": "...", "platform": "Coursera/Udemy/LinkedIn Learning", "url": "..." }
  ]
}
Senaryo Başlığı: ${title}
Açıklama: ${description}
Görev Adımları: ${steps.map((s: string, i: number) => `${i+1}. ${s}`).join('\n')}
Kullanıcı Yanıtları: ${answers.map((a: string, i: number) => `Soru ${i+1}: ${a}`).join('\n')}
Yanıtları analiz et, güçlü yönleri, gelişim alanlarını ve en az 2 eğitim önerisini (ve platform linkiyle) ver.`;
  } else {
    prompt = `Below is a simulation scenario, task steps, and a user's answers to open-ended questions. Please analyze these answers and return a JSON in the following format:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "trainings": [
    { "title": "...", "platform": "Coursera/Udemy/LinkedIn Learning", "url": "..." }
  ]
}
Scenario Title: ${title}
Description: ${description}
Task Steps: ${steps.map((s: string, i: number) => `${i+1}. ${s}`).join('\n')}
User Answers: ${answers.map((a: string, i: number) => `Q${i+1}: ${a}`).join('\n')}
Analyze the answers, list strengths, development areas, and at least 2 training suggestions (with platform links).`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a career coach and training advisor.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });
    const response = completion.choices[0]?.message?.content;
    if (response) {
      try {
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}') + 1;
        const jsonString = response.substring(jsonStart, jsonEnd);
        const parsed = JSON.parse(jsonString);
        return res.status(200).json(parsed);
      } catch (e) {
        return res.status(200).json({ raw: response, error: 'AI yanıtı JSON parse edilemedi.' });
      }
    }
    return res.status(500).json({ error: 'AI yanıtı alınamadı.' });
  } catch (error) {
    return res.status(500).json({ error: 'OpenAI hatası', detail: (error as any).message });
  }
} 