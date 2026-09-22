import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let answer = '';
  let language: 'en' | 'ru' = 'en';

  try {
    const payload = await request.json();
    answer = typeof payload.answer === 'string' ? payload.answer : '';
    const profession = typeof payload.profession === 'string' ? payload.profession : 'this profession';
    language = payload.language === 'ru' ? 'ru' : 'en';
    const fallbackScore = answer.trim().length >= 20 ? 1 : 0;
    const key = process.env.AI_API_KEY;

    if (!key) {
      return NextResponse.json({ feedback: fallback(answer, language), score: fallbackScore });
    }

    const base = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
    const response = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        temperature: 0.4,
        messages: [
          { role: 'system', content: `Give brief, encouraging feedback in ${language === 'ru' ? 'Russian' : 'English'} on a student's answer to a ${profession} task. Mention one strength and one way to make it more concrete. Never score their personality.` },
          { role: 'user', content: answer }
        ]
      })
    });

    if (!response.ok) throw new Error('AI review failed');
    const data = await response.json();
    return NextResponse.json({ feedback: data.choices?.[0]?.message?.content || fallback(answer, language), score: fallbackScore });
  } catch {
    return NextResponse.json({ feedback: fallback(answer, language), score: answer.trim().length >= 20 ? 1 : 0 });
  }
}

function fallback(answer: string, language: 'en' | 'ru') {
  if (language === 'ru') return answer.trim().length >= 20
    ? 'Ты дал содержательный ответ. Заметь, как ты сделал выбор и ясно его объяснил.'
    : 'Ты начал рассуждать. Одна конкретная деталь сделает твою мысль понятнее для действия.';
  return answer.trim().length >= 20
    ? 'You gave a considered response. Notice how you made a choice and explained it clearly.'
    : 'You made a start. In real work, adding one specific detail would make your thinking easier to act on.';
}
