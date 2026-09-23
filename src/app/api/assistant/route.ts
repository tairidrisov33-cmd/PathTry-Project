import { NextResponse } from 'next/server';
import type { Language } from '@/data/translations';
import { chatWithClaude } from '@/lib/pathfinder';
import type { TaskContext } from '@/lib/taskContext';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const language: Language = payload?.language === 'ru' ? 'ru' : 'en';
  const page = typeof payload?.context === 'string' ? payload.context.slice(0, 120) : '/';
  const history: ChatMessage[] = Array.isArray(payload?.messages)
    ? payload.messages.filter((message: ChatMessage) => (message?.role === 'user' || message?.role === 'assistant') && typeof message.content === 'string').map((message: ChatMessage) => ({ role: message.role, content: message.content.slice(0, 1500) }))
    : [];
  while (history.length && history[0].role !== 'user') history.shift();
  const task: TaskContext | null = payload?.task && typeof payload.task.prompt === 'string' ? payload.task : null;
  const question = history.at(-1)?.role === 'user' ? history.at(-1)!.content : '';
  if (!question.trim()) return NextResponse.json({ answer: fallback('', language, page, task) });

  try {
    const answer = await chatWithClaude(history, language, page, task);
    if (answer) return NextResponse.json({ answer, source: 'ai' });
  } catch (error) {
    console.error('PathFinder chat failed, using fallback', error);
  }
  return NextResponse.json({ answer: fallback(question, language, page, task), source: 'fallback' });
}

const answerVariants = {
  ru: {
    career: ['Начни с реальности: какие задачи специалист решает каждый день, с кем работает и какие компромиссы принимает. После эксперимента сравни не только баллы, но и свою энергию.', 'Представь обычный вторник в этой профессии: что радует, а что утомляет? Если утомляющее тебя не пугает — это хороший знак.', 'Сравни две профессии по трём вопросам: с кем работаешь, как выглядит результат, как часто нужно решать без полной информации.'],
    result: ['Результат — ориентир, а не приговор. Выбери один следующий шаг и проверь интерес маленькой реальной практикой.', 'Смотри не только на баллы, но и на то, какие задания давали энергию. Это лучше всего подсказывает направление.', 'Попробуй ещё одну профессию из той же категории и сравни ощущения — картина станет яснее.'],
    general: ['Я PathFinder. Могу разобрать задание, сравнить профессии или помочь выбрать следующий шаг. Что сейчас вызывает сомнение?', 'Расскажи, что тебе интересно или что смущает, — подскажу, с какого эксперимента начать.', 'Можем разобрать любое задание или профессию. С чего начнём?']
  },
  en: {
    career: ['Start with the reality: what does this person do each day, who do they work with, and what trade-offs do they make? After the experiment, compare your energy as well as your score.', 'Picture a normal Tuesday in this job: what would energise you and what would drain you? If the draining part does not scare you, that is a good sign.', 'Compare two professions on three questions: who you work with, what the result looks like, and how often you decide without full information.'],
    result: ['Your result is a signal, not a verdict. Pick one next step and test your interest with a small real-world experience.', 'Look beyond the score: which tasks gave you energy? That is often the best hint about direction.', 'Try one more profession from the same category and compare how it felt — the picture gets clearer fast.'],
    general: ['I am PathFinder. I can unpack a task, compare professions, or help you choose a next step. What feels uncertain right now?', 'Tell me what interests you or what feels confusing, and I will suggest where to start.', 'We can break down any task or profession. Where would you like to begin?']
  }
};

function fallback(question: string, language: Language, page: string, task: TaskContext | null) {
  const ru = language === 'ru';
  const lower = question.toLowerCase();
  if (task) {
    const intro = ru ? 'Подсказка к текущему заданию: ' : 'A hint for this task: ';
    const method = task.type === 'choice'
      ? (ru ? ' Отбрось варианты, которые действуют до того, как собраны факты, или перекладывают проблему на других.' : ' Rule out options that act before gathering facts or push the problem onto someone else.')
      : (ru ? ' Хороший ответ — это «что» плюс «почему»: конкретное действие и одна причина.' : ' A strong answer is a “what” plus a “why”: one concrete action and one reason.');
    return intro + task.hint + method;
  }
  const isCareer = ru ? /професс|карьер|подойд|выбр/.test(lower) : /profession|career|suit|choose/.test(lower);
  const kind = isCareer ? 'career' : page.includes('/result/') ? 'result' : 'general';
  const options = answerVariants[language][kind];
  return options[Math.floor(Math.random() * options.length)];
}
