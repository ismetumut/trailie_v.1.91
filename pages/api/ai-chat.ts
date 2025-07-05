import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, language = 'tr', conversationHistory = [] } = req.body;

  // Demo mode kontrolü
  const isDemoMode = !process.env.OPENAI_API_KEY && !process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (isDemoMode) {
    const demoResponses: { [key: string]: string[] } = {
      tr: [
        "Merhaba! Kariyer yolculuğunuzda size nasıl yardımcı olabilirim?",
        "CV'nizi güncellemek için hangi alanlarda gelişmek istiyorsunuz?",
        "Mülakat hazırlığı için hangi pozisyonu hedefliyorsunuz?",
        "Networking için hangi sektörde bağlantı kurmak istiyorsunuz?"
      ],
      en: [
        "Hello! How can I help you with your career journey?",
        "What areas would you like to improve in your CV?",
        "What position are you targeting for interview preparation?",
        "Which industry would you like to network in?"
      ]
    };
    
    const responses = demoResponses[language] || demoResponses.tr;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return res.status(200).json({ response: randomResponse });
  }

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const systemPrompt = language === 'tr'
      ? 'Sen bir kariyer danışmanı AI asistanısın. Kullanıcıya Türkçe ve samimi şekilde, kısa ve net cevaplar ver. Maksimum 3-4 cümlelik cevaplar ver. Kariyer gelişimi, iş arama, CV hazırlama, mülakat hazırlığı, networking gibi konularda yardımcı ol.'
      : 'You are a career coach AI assistant. Respond in English, friendly, concise and clear. Give maximum 3-4 sentence answers. Help with career development, job search, CV preparation, interview preparation, networking, etc.';

    // Build conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error('OpenAI API error details:', errorText);
      throw new Error('OpenAI API error');
    }

    const data = await openaiRes.json();
    const response = data.choices?.[0]?.message?.content || '';

    res.status(200).json({ response });
  } catch (error) {
    console.error('AI Chat API error:', error);
    res.status(500).json({ error: 'AI chat failed' });
  }
} 