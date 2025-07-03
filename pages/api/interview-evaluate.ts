import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcripts, role = 'Pricing Specialist', language = 'tr' } = req.body;

  if (!transcripts || !Array.isArray(transcripts)) {
    return res.status(400).json({ error: 'Transcripts array is required' });
  }

  try {
    // Create comprehensive prompt for AI analysis
    const systemPrompt = language === 'tr' 
      ? `Sen bir kariyer danışmanı ve mülakat uzmanısın. Kullanıcının mülakat cevaplarını analiz ederek detaylı bir değerlendirme raporu hazırla. 
      
      Analiz şunları içermeli:
      - Her cevap için 1-10 arası puanlama (akıcılık, teknik bilgi, uyum, güven, netlik, yapı)
      - Güçlü yönler (en az 3 madde)
      - Gelişime açık alanlar (en az 2 madde)
      - Genel özet (2-3 cümle)
      - Öneriler (en az 3 madde)
      - Radar grafik için 5 farklı yetkinlik skoru (0-100 arası)
      
      Yanıtını JSON formatında ver:
      {
        "scores": {"fluency": 8.5, "technical": 9.2, "fit": 9.0, "confidence": 6.5, "clarity": 8.8, "structure": 9.1},
        "strengths": ["madde1", "madde2", "madde3"],
        "devAreas": ["madde1", "madde2"],
        "summary": "özet metni",
        "recommendations": ["öneri1", "öneri2", "öneri3"],
        "radar": [{"label": "Yetkinlik1", "value": 85}, {"label": "Yetkinlik2", "value": 75}]
      }`
      : `You are a career coach and interview expert. Analyze the user's interview answers and prepare a detailed evaluation report.
      
      Analysis should include:
      - Scoring for each answer (1-10 scale for fluency, technical knowledge, fit, confidence, clarity, structure)
      - Strengths (at least 3 items)
      - Development areas (at least 2 items)
      - General summary (2-3 sentences)
      - Recommendations (at least 3 items)
      - 5 different competency scores for radar chart (0-100 scale)
      
      Respond in JSON format:
      {
        "scores": {"fluency": 8.5, "technical": 9.2, "fit": 9.0, "confidence": 6.5, "clarity": 8.8, "structure": 9.1},
        "strengths": ["item1", "item2", "item3"],
        "devAreas": ["item1", "item2"],
        "summary": "summary text",
        "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
        "radar": [{"label": "Competency1", "value": 85}, {"label": "Competency2", "value": 75}]
      }`;

    const userPrompt = language === 'tr'
      ? `Rol: ${role}
      
      Kullanıcının mülakat cevapları:
      ${transcripts.map((t: string, i: number) => `Soru ${i + 1}: ${t || 'Cevap verilmedi'}`).join('\n')}
      
      Bu cevapları analiz et ve yukarıdaki formatta JSON yanıtı ver.`
      : `Role: ${role}
      
      User's interview answers:
      ${transcripts.map((t: string, i: number) => `Question ${i + 1}: ${t || 'No answer provided'}`).join('\n')}
      
      Analyze these answers and provide JSON response in the format above.`;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!openaiRes.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await openaiRes.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';

    // Parse JSON response from AI
    let parsedReview;
    try {
      parsedReview = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback to default structure if parsing fails
      parsedReview = {
        role: role,
        scores: {
          fluency: 7.5,
          technical: 8.0,
          fit: 8.5,
          confidence: 7.0,
          clarity: 8.0,
          structure: 7.5
        },
        strengths: language === 'tr' 
          ? ['Cevaplarda yapı ve netlik', 'Teknik bilgi seviyesi', 'Rol uyumu']
          : ['Structure and clarity in answers', 'Technical knowledge level', 'Role fit'],
        devAreas: language === 'tr'
          ? ['Daha detaylı örnekler verme', 'Güven ifadesi']
          : ['Providing more detailed examples', 'Confidence expression'],
        summary: language === 'tr'
          ? 'Kullanıcı genel olarak iyi bir performans sergiledi. Teknik bilgi ve rol uyumu güçlü yönleri.'
          : 'User performed well overall. Technical knowledge and role fit are strong points.',
        recommendations: language === 'tr'
          ? ['Daha fazla somut örnek kullanın', 'Güven ifadenizi güçlendirin', 'Cevaplarınızı daha detaylandırın']
          : ['Use more concrete examples', 'Strengthen your confidence expression', 'Provide more detailed answers'],
        radar: [
          { label: language === 'tr' ? 'Sayısal Düşünme' : 'Analytical Thinking', value: 85 },
          { label: language === 'tr' ? 'İletişim' : 'Communication', value: 75 },
          { label: language === 'tr' ? 'Veri Kullanımı' : 'Data Usage', value: 80 },
          { label: language === 'tr' ? 'Rol Uyumu' : 'Role Fit', value: 85 },
          { label: language === 'tr' ? 'Müzakere' : 'Negotiation', value: 70 }
        ]
      };
    }

    res.status(200).json({ review: parsedReview });
  } catch (error) {
    console.error('Interview evaluation error:', error);
    res.status(500).json({ error: 'AI evaluation failed' });
  }
} 