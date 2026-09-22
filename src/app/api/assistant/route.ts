import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let language: 'en' | 'ru' = 'en';
  try {
    const payload = await request.json();
    const question = typeof payload.question === 'string' ? payload.question.trim() : '';
    language = payload.language === 'ru' ? 'ru' : 'en';
    const context = typeof payload.context === 'string' ? payload.context : '/';
    if (!question) return NextResponse.json({ answer: fallback('', language, context) });

    const key = process.env.AI_API_KEY;
    if (!key) return NextResponse.json({ answer: fallback(question, language, context) });

    const base = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
    const response = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        temperature: 0.65,
        max_tokens: 180,
        messages: [
          { role: 'system', content: `You are PathTry, a concise and kind career exploration guide. Reply in ${language === 'ru' ? 'Russian' : 'English'}. Help a student understand a profession or task, ask a useful follow-up when needed, and never claim that a short exercise can diagnose their future. Current page: ${context}. Keep replies under 80 words.` },
          { role: 'user', content: question }
        ]
      })
    });
    if (!response.ok) throw new Error('Assistant request failed');
    const data = await response.json();
    return NextResponse.json({ answer: data.choices?.[0]?.message?.content || fallback(question, language, context) });
  } catch {
    return NextResponse.json({ answer: fallback('', language, '/') });
  }
}

function fallback(question: string, language: 'en' | 'ru', context: string) {
  const lower = question.toLowerCase();
  if (language === 'ru') {
    if (lower.includes('професс') || lower.includes('карьер')) return 'Начни с реальности: какие задачи специалист выполняет каждый день, с кем работает и какие компромиссы принимает. После эксперимента сравни не только баллы, но и свою энергию.';
    if (lower.includes('ответ') || lower.includes('задани')) return 'Посмотри на глагол в вопросе: нужно объяснить, сравнить, проверить или предложить? Сначала дай конкретный факт, затем коротко объясни ход мысли.';
    if (context.includes('/result/')) return 'Результат — ориентир, а не приговор. Выбери один следующий шаг и проверь интерес через реальную маленькую практику.';
    return 'Я могу помочь разобрать задание, сравнить профессии или придумать следующий шаг. Что именно сейчас вызывает сомнение?';
  }
  if (lower.includes('profession') || lower.includes('career')) return 'Start with the reality: what does this person do each day, who do they work with, and what trade-offs do they make? After the experiment, compare your energy as well as your score.';
  if (lower.includes('answer') || lower.includes('task')) return 'Look at the action word in the question: explain, compare, check, or propose? Start with one concrete detail, then briefly explain your reasoning.';
  if (context.includes('/result/')) return 'Your result is a signal, not a verdict. Choose one next step and test your interest through a small real-world experience.';
  return 'I can help unpack a task, compare professions, or choose a next step. What feels uncertain right now?';
}
