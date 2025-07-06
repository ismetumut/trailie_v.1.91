import type { NextApiRequest, NextApiResponse } from 'next';
import { generateDiscProfile } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { discData, language } = req.body;
  try {
    const result = await generateDiscProfile(discData, language);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'AI DISC profili oluşturulamadı.' });
  }
} 