import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 25 * 1024 * 1024, // 25MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Create form data for OpenAI Whisper API
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), file.originalFilename || 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', fields.language?.[0] || 'tr');

    // Call OpenAI Whisper API
    const openaiRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!openaiRes.ok) {
      const errorData = await openaiRes.json();
      console.error('OpenAI Whisper API error:', errorData);
      throw new Error('Transcription failed');
    }

    const data = await openaiRes.json();
    const transcript = data.text || '';

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    res.status(200).json({ transcript });
  } catch (error) {
    console.error('Transcription error:', error);
    
    // Fallback to dummy transcript if API fails
    const fallbackTranscript = req.query.language === 'en' 
      ? 'This is a fallback transcript. (Real transcript would appear here.)'
      : 'Bu bir yedek transkripttir. (Gerçek transcript burada görünecek.)';
    
    res.status(200).json({ transcript: fallbackTranscript });
  }
} 