import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use API routes instead
});

export interface PersonalityResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses?: string[];
  careerPreferences?: string[];
}

export interface ExpertiseResult {
  level?: string;
  skills?: string[];
  experience?: string;
  areas?: string[];
  answers?: any;
}

export interface AIRoleRichRecommendation {
  title: string;
  description: string;
  strengths: string[];
  positions: string[];
  tools: string[];
  analysis: string;
}

export interface RoleRecommendation {
  title: string;
  description: string;
  successTraits: string[];
  averageSalary: string;
  matchScore: number;
  requirements: string[];
  growthPotential: string;
}

export interface SimulationFeedback {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

export interface CareerReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  courses: CourseRecommendation[];
  nextSteps: string[];
}

export interface CourseRecommendation {
  title: string;
  platform: string;
  url: string;
  duration: string;
  level: string;
  description: string;
}

export interface AIDiscProfile {
  title: string;
  description: string;
  traits: string[];
  careers: string[];
  tools: string[];
  analysis: {
    strengths: string[];
    developmentAreas: string[];
  };
}

export interface AIExpertiseProfile {
  mainRole: {
    title: string;
    description: string;
    matchScore: number;
    responsibilities: string[];
    requirements: string[];
    salary: string;
  };
  backupRoles: Array<{
    title: string;
    description: string;
    matchScore: number;
    responsibilities: string[];
    requirements: string[];
    salary: string;
  }>;
  analysis: {
    strengths: string[];
    developmentAreas: string[];
    careerPath: string[];
  };
}

export interface AISimulationScenario {
  title: string;
  description: string;
  steps: string[];
  evaluationCriteria: string[];
  analysis: string;
}

// AI Role Recommendation based on personality and expertise
export const generateRoleRecommendations = async (
  personalityResults: any,
  expertiseResults: any,
  language: 'tr' | 'en' = 'en'
): Promise<AIRoleRichRecommendation[]> => {
  try {
    let prompt = '';
    if (language === 'tr') {
      prompt = `Aşağıda bir kullanıcının kişilik envanteri ve uzmanlık envanteri sonuçları verilmiştir. Lütfen bu verileri analiz et ve aşağıdaki formatta en uygun 1 rolü öner. Yanıtı sadece JSON array olarak döndür:
[
  {
    "title": "",
    "description": "",
    "strengths": [],
    "positions": [],
    "tools": [],
    "analysis": ""
  }
]
Kişilik Sonucu: ${personalityResults.type}
Açıklama: ${personalityResults.description}
Güçlü Yönler: ${(personalityResults.strengths || []).join(', ')}
Zayıf Yönler: ${(personalityResults.weaknesses || []).join(', ')}
Kariyer Tercihleri: ${(personalityResults.careerPreferences || []).join(', ')}
Uzmanlık Sonucu Seviyesi: ${expertiseResults.level || ''}
Yetenekler: ${(expertiseResults.skills || []).join(', ')}
Deneyim: ${expertiseResults.experience || ''}
Alanlar: ${(expertiseResults.areas || []).join(', ')}
`;
    } else {
      prompt = `Below are the results of a user's personality and expertise inventories. Please analyze this data and recommend the single most suitable role for this person in the following format. Return only a JSON array:
[
  {
    "title": "",
    "description": "",
    "strengths": [],
    "positions": [],
    "tools": [],
    "analysis": ""
  }
]
Personality Result: ${personalityResults.type}
Description: ${personalityResults.description}
Strengths: ${(personalityResults.strengths || []).join(', ')}
Weaknesses: ${(personalityResults.weaknesses || []).join(', ')}
Career Preferences: ${(personalityResults.careerPreferences || []).join(', ')}
Expertise Level: ${expertiseResults.level || ''}
Skills: ${(expertiseResults.skills || []).join(', ')}
Experience: ${expertiseResults.experience || ''}
Areas: ${(expertiseResults.areas || []).join(', ')}
`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      try {
        const parsed = JSON.parse(response);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'object' && parsed.roles) return parsed.roles;
      } catch (e) {
        console.error('AI yanıtı JSON parse edilemedi:', response);
      }
    }
    return [];
  } catch (error) {
    console.error('Error generating role recommendations:', error);
    return [];
  }
};

// AI Career Report Generation
export const generateCareerReport = async (
  personalityResults: PersonalityResult,
  expertiseResults: ExpertiseResult,
  simulationResults: SimulationFeedback
): Promise<CareerReport> => {
  try {
    const prompt = `
    Generate a comprehensive career report based on the following assessment results:
    
    Personality Assessment:
    - Type: ${personalityResults.type}
    - Description: ${personalityResults.description}
    - Strengths: ${personalityResults.strengths.join(', ')}
    - Weaknesses: ${personalityResults.weaknesses?.join(', ') || ''}
    
    Expertise Assessment:
    - Level: ${expertiseResults.level || ''}
    - Skills: ${expertiseResults.skills?.join(', ') || ''}
    - Experience: ${expertiseResults.experience || ''}
    
    Simulation Results:
    - Score: ${simulationResults.score}/100
    - Feedback: ${simulationResults.feedback}
    - Strengths: ${simulationResults.strengths.join(', ')}
    - Areas for Improvement: ${simulationResults.improvements.join(', ')}
    
    Provide a comprehensive report including:
    1. Executive summary
    2. Key strengths (5-7 points)
    3. Areas for improvement (3-5 points)
    4. Specific recommendations (5-7 actionable items)
    5. Recommended online courses (3-5 courses with platforms like Coursera, Udemy, LinkedIn Learning)
    6. Next steps (3-5 immediate actions)
    
    Format as JSON with fields: summary, strengths, weaknesses, recommendations, courses, nextSteps
    For courses, include: title, platform, url, duration, level, description
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      return JSON.parse(response);
    }
    
    return {
      summary: "Unable to generate report at this time.",
      strengths: [],
      weaknesses: [],
      recommendations: [],
      courses: [],
      nextSteps: []
    };
  } catch (error) {
    console.error('Error generating career report:', error);
    return {
      summary: "Unable to generate report at this time.",
      strengths: [],
      weaknesses: [],
      recommendations: [],
      courses: [],
      nextSteps: []
    };
  }
};

// AI Interview Question Generation
export const generateInterviewQuestions = async (roleTitle: string): Promise<string[]> => {
  try {
    const prompt = `
    Generate 10 relevant interview questions for the role: ${roleTitle}
    
    Include a mix of:
    - Behavioral questions
    - Technical questions
    - Situational questions
    - Problem-solving questions
    
    Return as a JSON array of strings.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      return JSON.parse(response);
    }
    
    return [];
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return [];
  }
};

// AI Interview Feedback
export const generateInterviewFeedback = async (
  question: string,
  answer: string,
  roleTitle: string
): Promise<string> => {
  try {
    const prompt = `
    Provide constructive feedback for this interview response:
    
    Role: ${roleTitle}
    Question: ${question}
    Answer: ${answer}
    
    Provide specific, actionable feedback in 2-3 sentences.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No feedback available.";
  } catch (error) {
    console.error('Error generating interview feedback:', error);
    return "Unable to generate feedback at this time.";
  }
};

// AI Resume Enhancement
export const enhanceResumeContent = async (
  roleTitle: string,
  currentContent: string
): Promise<string> => {
  try {
    const prompt = `
    Enhance this resume content for the role: ${roleTitle}
    
    Current content: ${currentContent}
    
    Make it more compelling, relevant, and tailored to the role.
    Use action verbs and quantifiable achievements where possible.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || currentContent;
  } catch (error) {
    console.error('Error enhancing resume content:', error);
    return currentContent;
  }
};

export const generateDiscProfile = async (
  discData: string,
  language: 'tr' | 'en' = 'tr'
): Promise<AIDiscProfile | null> => {
  try {
    let prompt = '';
    if (language === 'tr') {
      prompt = `Aşağıda bir kullanıcının DISC kişilik envanteri sonuçları verilmiştir. Bu verileri analiz ederek, kullanıcının kişilik tipini belirle ve aşağıdaki formatta detaylı bir kişilik raporu oluştur. Yanıtı sadece JSON olarak döndür:

{
  "title": "Kişilik tipi başlığı (örn: 'Yönlendirici Lider' veya 'Analitik Planlayıcı')",
  "description": "Kişilik tipinin detaylı açıklaması (2-3 cümle). Bu kişilik tipinin iş hayatında nasıl davrandığını, hangi durumlarda başarılı olduğunu ve nasıl çalıştığını açıkla.",
  "traits": ["Özellik 1", "Özellik 2", "Özellik 3", "Özellik 4"],
  "careers": ["Kariyer 1", "Kariyer 2", "Kariyer 3", "Kariyer 4"],
  "tools": ["Araç 1", "Araç 2", "Araç 3", "Araç 4"],
  "analysis": {
    "strengths": ["Güçlü yön 1", "Güçlü yön 2", "Güçlü yön 3"],
    "developmentAreas": ["Gelişim alanı 1", "Gelişim alanı 2"]
  }
}

DISC verileri: ${discData}

Lütfen şu kurallara uy:
1. Title: Kişilik tipini yansıtan yaratıcı ve motive edici bir başlık
2. Description: Kişilik tipinin iş hayatındaki etkilerini, güçlü yönlerini ve nasıl çalıştığını açıklayan detaylı metin (2-3 cümle)
3. Traits: Bu kişilik tipinin en belirgin 4 özelliği (kısa ve öz)
4. Careers: Bu kişilik tipine en uygun 4 kariyer alanı (spesifik pozisyonlar)
5. Tools: Bu kişilik tipinin kullanabileceği 4 profesyonel araç (yazılım, platform vb.)
6. Strengths: Bu kişilik tipinin 3 güçlü yönü (iş hayatında avantaj sağlayan özellikler)
7. DevelopmentAreas: Bu kişilik tipinin geliştirebileceği 2 alan (yapıcı öneriler)

Yanıtı sadece JSON formatında ver, başka açıklama ekleme.`;
    } else {
      prompt = `Below are a user's DISC personality inventory results. Analyze this data to determine the user's personality type and generate a detailed personality report in the following JSON format. Return only JSON:

{
  "title": "Personality type title (e.g., 'Directive Leader' or 'Analytical Planner')",
  "description": "Detailed description of the personality type (2-3 sentences). Explain how this personality type behaves in the workplace, when they are most successful, and how they work.",
  "traits": ["Trait 1", "Trait 2", "Trait 3", "Trait 4"],
  "careers": ["Career 1", "Career 2", "Career 3", "Career 4"],
  "tools": ["Tool 1", "Tool 2", "Tool 3", "Tool 4"],
  "analysis": {
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "developmentAreas": ["Development area 1", "Development area 2"]
  }
}

DISC data: ${discData}

Please follow these rules:
1. Title: Creative and motivating title reflecting the personality type
2. Description: Detailed text explaining the impact, strengths, and work style of this personality type in the workplace (2-3 sentences)
3. Traits: 4 most prominent traits of this personality type (concise)
4. Careers: 4 most suitable career areas for this personality type (specific positions)
5. Tools: 4 professional tools this personality type can use (software, platforms, etc.)
6. Strengths: 3 strengths of this personality type (advantages in the workplace)
7. DevelopmentAreas: 2 areas this personality type can develop (constructive suggestions)

Return only JSON format, no additional explanation.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      try {
        const parsed = JSON.parse(response);
        if (typeof parsed === 'object' && parsed.title) {
          console.log('AI DISC raporu başarıyla oluşturuldu:', parsed);
          return parsed;
        }
      } catch (e) {
        console.error('AI DISC yanıtı JSON parse edilemedi:', response);
        console.error('Parse hatası:', e);
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating DISC profile:', error);
    return null;
  }
};

export const generateExpertiseProfile = async (
  expertiseData: string,
  discData?: string,
  language: 'tr' | 'en' = 'tr'
): Promise<AIExpertiseProfile | null> => {
  try {
    let prompt = '';
    if (language === 'tr') {
      prompt = `Aşağıda bir kullanıcının uzmanlık analizi sonuçları ve DISC kişilik envanteri verilmiştir. Bu verileri analiz ederek, kullanıcıya 1 ana rol ve 4 yedek iş rolü öner. Yanıtı sadece JSON olarak döndür:

{
  "mainRole": {
    "title": "Ana rol başlığı",
    "description": "Ana rolün detaylı açıklaması (2-3 cümle)",
    "matchScore": 95,
    "responsibilities": ["Sorumluluk 1", "Sorumluluk 2", "Sorumluluk 3"],
    "requirements": ["Gereksinim 1", "Gereksinim 2", "Gereksinim 3"],
    "salary": "Maaş aralığı (örn: 15.000-25.000 TL)"
  },
  "backupRoles": [
    {
      "title": "Yedek rol 1 başlığı",
      "description": "Yedek rol 1 açıklaması",
      "matchScore": 85,
      "responsibilities": ["Sorumluluk 1", "Sorumluluk 2"],
      "requirements": ["Gereksinim 1", "Gereksinim 2"],
      "salary": "Maaş aralığı"
    }
  ],
  "analysis": {
    "strengths": ["Güçlü yön 1", "Güçlü yön 2", "Güçlü yön 3"],
    "developmentAreas": ["Gelişim alanı 1", "Gelişim alanı 2"],
    "careerPath": ["Kariyer adımı 1", "Kariyer adımı 2", "Kariyer adımı 3"]
  }
}

Uzmanlık verileri: ${expertiseData}
${discData ? `DISC verileri: ${discData}` : ''}

Lütfen şu kurallara uy:
1. MainRole: En yüksek uyum skoruna sahip ana rol (matchScore: 90-100)
2. BackupRoles: 4 farklı yedek rol (matchScore: 70-89)
3. Her rol için gerçekçi sorumluluklar ve gereksinimler
4. Türkiye piyasasına uygun maaş aralıkları
5. Kişilik ve uzmanlık verilerini birleştirerek analiz yap
6. Kariyer yolu önerileri ekle

Yanıtı sadece JSON formatında ver, başka açıklama ekleme.`;
    } else {
      prompt = `Below are a user's expertise analysis results and DISC personality inventory data. Analyze this data to recommend 1 main role and 4 backup job roles. Return only JSON:

{
  "mainRole": {
    "title": "Main role title",
    "description": "Detailed description of the main role (2-3 sentences)",
    "matchScore": 95,
    "responsibilities": ["Responsibility 1", "Responsibility 2", "Responsibility 3"],
    "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
    "salary": "Salary range (e.g., $50,000-$80,000)"
  },
  "backupRoles": [
    {
      "title": "Backup role 1 title",
      "description": "Backup role 1 description",
      "matchScore": 85,
      "responsibilities": ["Responsibility 1", "Responsibility 2"],
      "requirements": ["Requirement 1", "Requirement 2"],
      "salary": "Salary range"
    }
  ],
  "analysis": {
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "developmentAreas": ["Development area 1", "Development area 2"],
    "careerPath": ["Career step 1", "Career step 2", "Career step 3"]
  }
}

Expertise data: ${expertiseData}
${discData ? `DISC data: ${discData}` : ''}

Please follow these rules:
1. MainRole: Primary role with highest match score (matchScore: 90-100)
2. BackupRoles: 4 different backup roles (matchScore: 70-89)
3. Realistic responsibilities and requirements for each role
4. Market-appropriate salary ranges
5. Combine personality and expertise data for analysis
6. Include career path suggestions

Return only JSON format, no additional explanation.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      try {
        const parsed = JSON.parse(response);
        if (typeof parsed === 'object' && parsed.mainRole) {
          console.log('AI Uzmanlık raporu başarıyla oluşturuldu:', parsed);
          return parsed;
        }
      } catch (e) {
        console.error('AI Uzmanlık yanıtı JSON parse edilemedi:', response);
        console.error('Parse hatası:', e);
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating expertise profile:', error);
    return null;
  }
};

export const generateRoleSimulation = async (
  roleTitle: string,
  roleDescription: string,
  language: 'tr' | 'en' = 'tr'
): Promise<AISimulationScenario | null> => {
  try {
    let prompt = '';
    if (language === 'tr') {
      prompt = `Aşağıda bir iş rolü verilmiştir. Bu role özel, gerçekçi ve iş dünyasına uygun bir vaka/simülasyon/görev hazırla. DomiX örneğindeki gibi detaylı, adım adım görevler, vaka açıklaması, değerlendirme kriterleri ve kısa bir analiz içersin. Yanıtı sadece JSON olarak döndür:\n\n{\n  "title": "Görev başlığı",\n  "description": "Vaka/görev açıklaması (2-3 cümle)",\n  "steps": ["Adım 1", "Adım 2", "Adım 3"],\n  "evaluationCriteria": ["Kriter 1", "Kriter 2", "Kriter 3"],\n  "analysis": "Kısa analiz ve öneriler"\n}\n\nRol adı: ${roleTitle}\nRol açıklaması: ${roleDescription}\n\nYanıtı sadece JSON formatında ver, başka açıklama ekleme.`;
    } else {
      prompt = `Below is a job role. Create a realistic, business-oriented case/simulation/task for this role, similar in quality to the DomiX example. Include a detailed scenario, step-by-step tasks, evaluation criteria, and a short analysis. Return only JSON:\n\n{\n  "title": "Task title",\n  "description": "Case/task description (2-3 sentences)",\n  "steps": ["Step 1", "Step 2", "Step 3"],\n  "evaluationCriteria": ["Criterion 1", "Criterion 2", "Criterion 3"],\n  "analysis": "Short analysis and suggestions"\n}\n\nRole title: ${roleTitle}\nRole description: ${roleDescription}\n\nReturn only JSON, no extra explanation.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      try {
        const parsed = JSON.parse(response);
        if (typeof parsed === 'object' && parsed.title) {
          return parsed;
        }
      } catch (e) {
        console.error('AI Simülasyon yanıtı JSON parse edilemedi:', response);
        console.error('Parse hatası:', e);
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating role simulation:', error);
    return null;
  }
}; 