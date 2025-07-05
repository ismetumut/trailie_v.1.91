import 'dotenv/config';
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const response = await client.chat.completions.create({
    model: "gpt-4", // veya "gpt-3.5-turbo"
    messages: [
      { role: "user", content: "Write a one-sentence bedtime story about a unicorn." }
    ],
  });

  console.log(response.choices[0].message.content);
}

run(); 