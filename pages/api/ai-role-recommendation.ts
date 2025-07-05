import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRoleRecommendations } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('AI role recommendation API route tetiklendi. Method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { personalityResults, expertiseResults, language } = req.body;
    if (!personalityResults || !expertiseResults) {
      console.log('Eksik veri:', { personalityResults, expertiseResults });
      return res.status(400).json({ error: 'Missing personality or expertise results' });
    }
    console.log('AI istek verisi:', { personalityResults, expertiseResults, language });
    const recommendations = await generateRoleRecommendations(personalityResults, expertiseResults, language || 'en');
    console.log('AI yanıtı:', recommendations);
    return res.status(200).json({ recommendations });
  } catch (error) {
    console.error('AI role recommendation error:', error);
    return res.status(500).json({ error: 'Failed to generate recommendations', details: error instanceof Error ? error.message : error });
  }
} 