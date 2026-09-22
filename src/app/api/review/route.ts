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

const feedbackVariants = {
  ru: {
    empty: ['Начни с одной конкретной мысли. Даже короткая попытка поможет понять, как тебе подходит этот тип работы.', 'Попробуй записать первое, что приходит в голову, — черновик лучше пустой страницы.', 'Одна честная фраза уже даст сигнал. С чего бы ты начал в реальной ситуации?'],
    strong: ['Хорошо: в ответе есть причина и конкретика. Следующий шаг — проверить, действительно ли это решение помогает человеку или пользователю.', 'Сильная структура: ты объяснил «почему» и показал «как». Подумай, что может пойти не так и как ты это заметишь.', 'Так рассуждают специалисты: причина плюс конкретный шаг. Можно добавить, как ты поймёшь, что решение сработало.'],
    reason: ['Ты объяснил причину, это сильная основа. Добавь один пример или наблюдаемый результат, чтобы мысль стала убедительнее.', 'Логика понятна. Теперь назови конкретное действие — что именно ты сделаешь первым?', 'Хорошее «почему». Чтобы ответ стал практичнее, опиши один шаг, который можно проверить.'],
    specific: ['В ответе уже есть полезная деталь. Уточни, для кого это важно и какой результат можно будет заметить.', 'Конкретика — это плюс. Добавь, почему выбран именно такой порядок действий.', 'Есть рабочая деталь. Объясни, зачем она нужна, — так ответ станет убедительнее.'],
    short: ['Хорошее начало. Добавь причину: почему ты выбрал именно такой подход?', 'Идея есть — разверни её на одно предложение: что, для кого и зачем.', 'Направление верное. Попробуй добавить пример из жизни, чтобы мысль стала осязаемой.']
  },
  en: {
    empty: ['Start with one concrete thought. Even a short attempt helps you notice whether this kind of work feels natural.', 'Try writing the first thing that comes to mind — a rough draft beats a blank page.', 'One honest sentence already gives a signal. Where would you start in a real situation?'],
    strong: ['Strong structure: you included a reason and a concrete detail. Next, check whether the idea actually helps a person or user.', 'You explained the why and showed the how. Now think about what could go wrong and how you would notice.', 'That is how professionals reason: a reason plus a concrete step. You could add how you would know it worked.'],
    reason: ['You explained a reason, which is a useful foundation. Add one example or observable result to make it more convincing.', 'The logic is clear. Now name a concrete action — what exactly would you do first?', 'Good "why". To make it more practical, describe one step someone could check.'],
    specific: ['There is a useful detail here. Clarify who it matters to and what result someone could notice.', 'Concrete detail is a plus. Add why you chose this order of steps.', 'You have a working detail. Explain why it matters — that makes the answer more convincing.'],
    short: ['Good start. Add one reason: why did you choose this approach?', 'The idea is there — expand it into one sentence: what, for whom, and why.', 'Right direction. Try adding a real-life example so the thought feels tangible.']
  }
};

function fallback(answer: string, language: 'en' | 'ru') {
  const clean = answer.trim();
  const longEnough = clean.length >= 20;
  const hasReason = /because|so that|therefore|потому что|чтобы|так как/i.test(clean);
  const hasSpecific = /\d|first|then|после|сначала|затем|конкрет/i.test(clean);
  const kind = !clean ? 'empty' : hasReason && hasSpecific ? 'strong' : hasReason ? 'reason' : hasSpecific || longEnough ? 'specific' : 'short';
  const options = feedbackVariants[language][kind];
  return options[Math.floor(Math.random() * options.length)];
}
