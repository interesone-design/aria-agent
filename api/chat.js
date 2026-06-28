export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages } = req.body;
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant named ARIA. Be concise and friendly.' },
        ...messages
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'No response';
  res.json({ reply });
}