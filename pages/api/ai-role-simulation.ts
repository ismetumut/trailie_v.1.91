import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRoleSimulation } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { roleTitle, roleDescription, language } = req.body;
  try {
    const result = await generateRoleSimulation(roleTitle, roleDescription, language);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'AI rol simülasyonu oluşturulamadı.' });
  }
} 