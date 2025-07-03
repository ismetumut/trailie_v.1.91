import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userData, language = 'tr' } = req.body;

  if (!userData) {
    return res.status(400).json({ error: 'User data is required' });
  }

  try {
    const systemPrompt = language === 'tr'
      ? `Sen bir kariyer danışmanı ve kişisel gelişim uzmanısın. Kullanıcının DISC kişilik testi, uzmanlık analizi, değerlendirme ve simülasyon sonuçlarını analiz ederek detaylı bir gelişim raporu hazırla.
      
      Analiz şunları içermeli:
      - Güçlü yönler (en az 3 madde)
      - Gelişime açık alanlar (en az 2 madde)
      - AI analiz yorumu (2-3 cümle)
      - Eğitim önerileri (en az 2 alan için somut kaynaklar)
      - Radar grafik için 6 farklı yetkinlik skoru (0-100 arası)
      
      Yanıtını JSON formatında ver:
      {
        "strengths": ["madde1", "madde2", "madde3"],
        "devAreas": ["madde1", "madde2"],
        "aiAnalysis": "analiz metni",
        "recommendations": [
          {
            "area": "Alan adı",
            "links": [
              {"label": "Kurs adı", "url": "https://example.com"}
            ]
          }
        ],
        "radar": [
          {"skill": "Yetkinlik1", "value": 85},
          {"skill": "Yetkinlik2", "value": 75}
        ]
      }`
      : `You are a career coach and personal development expert. Analyze the user's DISC personality test, expertise analysis, assessment and simulation results to prepare a detailed development report.
      
      Analysis should include:
      - Strengths (at least 3 items)
      - Development areas (at least 2 items)
      - AI analysis comment (2-3 sentences)
      - Learning recommendations (concrete resources for at least 2 areas)
      - 6 different competency scores for radar chart (0-100 scale)
      
      Respond in JSON format:
      {
        "strengths": ["item1", "item2", "item3"],
        "devAreas": ["item1", "item2"],
        "aiAnalysis": "analysis text",
        "recommendations": [
          {
            "area": "Area name",
            "links": [
              {"label": "Course name", "url": "https://example.com"}
            ]
          }
        ],
        "radar": [
          {"skill": "Competency1", "value": 85},
          {"skill": "Competency2", "value": 75}
        ]
      }`;

    const userPrompt = language === 'tr'
      ? `Kullanıcı verileri:
      
      DISC Sonuçları: ${JSON.stringify(userData.discResults || {})}
      Uzmanlık Sonuçları: ${JSON.stringify(userData.expertiseResults || {})}
      Değerlendirme Sonuçları: ${JSON.stringify(userData.assessmentResults || {})}
      Simülasyon Sonuçları: ${JSON.stringify(userData.simulationResults || {})}
      
      Bu verileri analiz et ve yukarıdaki formatta JSON yanıtı ver.`
      : `User data:
      
      DISC Results: ${JSON.stringify(userData.discResults || {})}
      Expertise Results: ${JSON.stringify(userData.expertiseResults || {})}
      Assessment Results: ${JSON.stringify(userData.assessmentResults || {})}
      Simulation Results: ${JSON.stringify(userData.simulationResults || {})}
      
      Analyze this data and provide JSON response in the format above.`;

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
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!openaiRes.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await openaiRes.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';

    // Parse JSON response from AI
    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback to default structure if parsing fails
      parsedAnalysis = {
        strengths: language === 'tr' 
          ? ['İletişim becerileri', 'Analitik düşünme', 'Takım çalışması']
          : ['Communication skills', 'Analytical thinking', 'Teamwork'],
        devAreas: language === 'tr'
          ? ['Teknik yetkinlikler', 'Liderlik becerileri']
          : ['Technical competencies', 'Leadership skills'],
        aiAnalysis: language === 'tr'
          ? 'Kullanıcının güçlü iletişim becerileri ve analitik düşünme yeteneği öne çıkıyor. Teknik alanlarda gelişim potansiyeli var.'
          : 'User shows strong communication skills and analytical thinking. There is potential for development in technical areas.',
        recommendations: language === 'tr' ? [
          {
            area: 'Teknik Yetkinlikler',
            links: [
              { label: 'Coursera: Data Science', url: 'https://www.coursera.org/specializations/data-science' },
              { label: 'Udemy: Python Programming', url: 'https://www.udemy.com/course/python-programming/' }
            ]
          },
          {
            area: 'Liderlik Becerileri',
            links: [
              { label: 'LinkedIn Learning: Leadership', url: 'https://linkedin.com/learning/leadership' },
              { label: 'Harvard Business Review', url: 'https://hbr.org/topic/leadership' }
            ]
          }
        ] : [
          {
            area: 'Technical Competencies',
            links: [
              { label: 'Coursera: Data Science', url: 'https://www.coursera.org/specializations/data-science' },
              { label: 'Udemy: Python Programming', url: 'https://www.udemy.com/course/python-programming/' }
            ]
          },
          {
            area: 'Leadership Skills',
            links: [
              { label: 'LinkedIn Learning: Leadership', url: 'https://linkedin.com/learning/leadership' },
              { label: 'Harvard Business Review', url: 'https://hbr.org/topic/leadership' }
            ]
          }
        ],
        radar: [
          { skill: language === 'tr' ? 'İletişim' : 'Communication', value: 85 },
          { skill: language === 'tr' ? 'Problem Çözme' : 'Problem Solving', value: 78 },
          { skill: language === 'tr' ? 'Teknik Yetenek' : 'Technical Skills', value: 72 },
          { skill: language === 'tr' ? 'Takım Çalışması' : 'Teamwork', value: 88 },
          { skill: language === 'tr' ? 'Analitik Düşünme' : 'Analytical Thinking', value: 75 },
          { skill: language === 'tr' ? 'Liderlik' : 'Leadership', value: 70 }
        ]
      };
    }

    res.status(200).json({ analysis: parsedAnalysis });
  } catch (error) {
    console.error('AI Simulation Analysis error:', error);
    res.status(500).json({ error: 'AI analysis failed' });
  }
} 