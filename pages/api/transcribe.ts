import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // In a real implementation, you would parse the file and run speech-to-text here
  // For demo, just return a dummy transcript
  if (req.method === 'POST') {
    res.status(200).json({ transcript: 'Bu bir demo transkripttir. (Gerçek transcript burada görünecek.)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 