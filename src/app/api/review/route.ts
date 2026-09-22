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
  const clean = answer.trim();
  const longEnough = clean.length >= 20;
  const hasReason = /because|so that|therefore|потому что|чтобы|так как/i.test(clean);
  const hasSpecific = /\d|first|then|после|сначала|затем|конкрет/i.test(clean);
  if (language === 'ru') {
    if (!clean) return 'Начни с одной конкретной мысли. Даже короткая попытка поможет понять, как тебе подходит этот тип работы.';
    if (hasReason && hasSpecific) return 'Хорошо: в ответе есть причина и конкретика. Следующий шаг — проверить, действительно ли это решение помогает человеку или пользователю.';
    if (hasReason) return 'Ты объяснил причину, это сильная основа. Добавь один пример или наблюдаемый результат, чтобы мысль стала убедительнее.';
    if (hasSpecific || longEnough) return 'В ответе уже есть полезная деталь. Уточни, для кого это важно и какой результат можно будет заметить.';
    return 'Хорошее начало. Добавь причину: почему ты выбрал именно такой подход?';
  }
  if (!clean) return 'Start with one concrete thought. Even a short attempt helps you notice whether this kind of work feels natural.';
  if (hasReason && hasSpecific) return 'Strong structure: you included a reason and a concrete detail. Next, check whether the idea actually helps a person or user.';
  if (hasReason) return 'You explained a reason, which is a useful foundation. Add one example or observable result to make it more convincing.';
  if (hasSpecific || longEnough) return 'There is a useful detail here. Clarify who it matters to and what result someone could notice.';
  return 'Good start. Add one reason: why did you choose this approach?';
}
