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

const answerVariants = {
  ru: {
    career: ['Начни с реальности: какие задачи специалист выполняет каждый день, с кем работает и какие компромиссы принимает. После эксперимента сравни не только баллы, но и свою энергию.', 'Представь обычный вторник в этой профессии: что радует, а что утомляет? Если утомляющее тебя не пугает — это хороший знак.', 'Сравни две профессии по трём вопросам: с кем работаешь, как выглядит результат, как часто нужно решать без полной информации.'],
    task: ['Посмотри на глагол в вопросе: нужно объяснить, сравнить, проверить или предложить? Сначала дай конкретный факт, затем коротко объясни ход мысли.', 'Хороший ответ — это «что» плюс «почему». Назови действие и одним предложением объясни, зачем оно.', 'Спроси себя, что бы сделал опытный специалист первым делом. Обычно это сбор фактов, а не быстрый вывод.'],
    result: ['Результат — ориентир, а не приговор. Выбери один следующий шаг и проверь интерес через реальную маленькую практику.', 'Смотри не только на баллы, но и на то, какие задания давали энергию. Именно это лучше всего подсказывает направление.', 'Попробуй ещё одну профессию из похожей категории и сравни ощущения — так картина станет яснее.'],
    general: ['Я могу помочь разобрать задание, сравнить профессии или придумать следующий шаг. Что именно сейчас вызывает сомнение?', 'Расскажи, что тебе интересно или что смущает, — подскажу, с какого эксперимента начать.', 'Можем разобрать любое задание или профессию. С чего начнём?']
  },
  en: {
    career: ['Start with the reality: what does this person do each day, who do they work with, and what trade-offs do they make? After the experiment, compare your energy as well as your score.', 'Picture a normal Tuesday in this job: what would energise you and what would drain you? If the draining part does not scare you, that is a good sign.', 'Compare two professions on three questions: who you work with, what the result looks like, and how often you decide without full information.'],
    task: ['Look at the action word in the question: explain, compare, check, or propose? Start with one concrete detail, then briefly explain your reasoning.', 'A strong answer is a "what" plus a "why". Name the action, then say in one sentence why it matters.', 'Ask what an experienced professional would do first. Usually it is gathering facts, not jumping to a conclusion.'],
    result: ['Your result is a signal, not a verdict. Choose one next step and test your interest through a small real-world experience.', 'Look beyond the score: which tasks gave you energy? That is often the best hint about direction.', 'Try one more profession from a similar category and compare how it felt — the picture gets clearer fast.'],
    general: ['I can help unpack a task, compare professions, or choose a next step. What feels uncertain right now?', 'Tell me what interests you or what feels confusing, and I will suggest where to start.', 'We can break down any task or profession. Where would you like to begin?']
  }
};

function fallback(question: string, language: 'en' | 'ru', context: string) {
  const lower = question.toLowerCase();
  const isCareer = language === 'ru' ? lower.includes('професс') || lower.includes('карьер') : lower.includes('profession') || lower.includes('career');
  const isTask = language === 'ru' ? lower.includes('ответ') || lower.includes('задани') : lower.includes('answer') || lower.includes('task');
  const kind = isCareer ? 'career' : isTask ? 'task' : context.includes('/result/') ? 'result' : 'general';
  const options = answerVariants[language][kind];
  return options[Math.floor(Math.random() * options.length)];
}
