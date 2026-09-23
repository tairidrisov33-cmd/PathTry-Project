import type { Language } from '@/data/translations';

export type Verdict = 'strong' | 'partial' | 'offtopic' | 'empty';
export type Review = { verdict: Verdict; score: number; feedback: string; tip: string; source: 'ai' | 'rubric' };
export type GradableTask = { prompt: string; criteria: string; hint: string; keywords: string[] };

export const verdictScore: Record<Verdict, number> = { strong: 1, partial: 0.5, offtopic: 0, empty: 0 };

const VOWELS = /[aeiouyаеёиоуыэюя]/i;
const MASH = /(qwer|asdf|zxcv|hjkl|йцук|фыва|ячсм|олдж|1234|абвг)/i;
const REASON = /\b(because|so that|therefore|since|which means|in order to)\b|потому|чтобы|так как|поэтому|значит|из-за того/i;
const SPECIFIC = /\d|\b(first|then|next|for example|e\.g\.|such as|after)\b|сначала|затем|потом|например|после|во-первых/i;

// Detects keyboard mashing and strings that are not real words, in either language.
function isGibberish(text: string, words: string[]) {
  const letters = text.replace(/[^\p{L}]/gu, '');
  if (letters.length < 8 || new Set(letters.toLowerCase()).size < 5) return true;
  if (/(.)\1{3,}/u.test(text) || MASH.test(text)) return true;
  const voiceless = words.filter((word) => word.replace(/[^\p{L}]/gu, '').length > 3 && !VOWELS.test(word)).length;
  return voiceless / Math.max(1, words.length) > 0.4;
}

// Content-word stems from the task prompt, so answers that engage with the question count as relevant.
function promptStems(prompt: string) {
  return [...new Set(prompt.toLowerCase().split(/[^\p{L}]+/u).filter((word) => word.length >= 5).map((word) => word.slice(0, 5)))];
}

export function gradeOffline(answer: string, task: GradableTask, language: Language): Review {
  const ru = language === 'ru';
  const clean = answer.trim();
  const lower = clean.toLowerCase();
  const words = clean.split(/\s+/).filter((word) => /\p{L}|\d/u.test(word));

  if (words.length < 3 || isGibberish(clean, words)) {
    return { verdict: 'empty', score: 0, source: 'rubric',
      feedback: ru ? 'Пока не получается оценить ответ: он слишком короткий или не похож на связный текст.' : 'I cannot review this yet: it is too short or does not read as a real answer.',
      tip: ru ? `Напиши хотя бы одно полное предложение. Подсказка: ${task.hint}` : `Write at least one full sentence. Hint: ${task.hint}` };
  }

  const matched = task.keywords.filter((keyword) => lower.includes(keyword.toLowerCase()));
  const overlap = promptStems(task.prompt).filter((stem) => lower.includes(stem)).length;
  // Short, generic stems ("for", "how", "?") are weak evidence on their own; longer, topic-specific ones count fully.
  const weight = (keyword: string) => { const size = keyword.replace(/[^\p{L}\d]/gu, '').length; return size >= 5 ? 1 : size === 4 ? 0.67 : 0.34; };
  const relevance = matched.reduce((sum, keyword) => sum + weight(keyword), 0) + Math.min(2, overlap);
  const reasoned = REASON.test(clean);
  const specific = SPECIFIC.test(clean);

  // A taster for school students, not an exam: long, coherent answers get the benefit of the doubt.
  if (relevance < 0.5 && words.length < 15) {
    return { verdict: 'offtopic', score: 0, source: 'rubric',
      feedback: ru ? 'Похоже, ответ не связан с заданием — в нём нет ничего о том, о чём спрашивали.' : 'This does not seem to answer the task — it does not touch on what was asked.',
      tip: ru ? `Перечитай задание. ${task.hint}` : `Re-read the task. ${task.hint}` };
  }

  const strong = (relevance >= 1 && words.length >= 6) || (relevance >= 0.5 && words.length >= 15) || (relevance >= 2 && words.length >= 4);
  // Quote the student's own words that matched, not the internal keyword stems.
  const tokens = clean.split(/[^\p{L}\d-]+/u).filter(Boolean);
  const shown = [...new Set(matched.map((keyword) => keyword.replace(/[^\p{L}\d ]/gu, '').trim().toLowerCase()).filter((keyword) => keyword.length >= 3).map((keyword) => tokens.find((token) => token.toLowerCase().includes(keyword))).filter((word): word is string => Boolean(word)))].slice(0, 3);
  const covered = shown.length ? (ru ? ` Ты затрагиваешь: ${shown.map((word) => `«${word}»`).join(', ')}.` : ` You cover: ${shown.map((word) => `"${word}"`).join(', ')}.`) : '';

  if (strong) {
    const extra = !reasoned ? (ru ? ' Чтобы звучать ещё профессиональнее, добавь «почему» — одну причину.' : ' To sound even more professional, add a “why” — one reason.') : !specific ? (ru ? ' Можно усилить конкретикой: пример, число или порядок шагов.' : ' You could add a concrete detail: an example, a number, or the order of steps.') : '';
    return { verdict: 'strong', score: 1, source: 'rubric',
      feedback: (ru ? 'Сильный ответ по делу.' : 'Strong, on-point answer.') + covered,
      tip: extra.trim() || (ru ? 'Так рассуждают специалисты — сравни с примером ниже.' : 'That is how professionals reason — compare with the example below.') };
  }

  const missing = words.length < 6 ? (ru ? 'Разверни мысль: сейчас ответ слишком короткий для оценки по сути.' : 'Expand the thought: right now it is too brief to judge on substance.') : !reasoned && !specific ? (ru ? 'Добавь причину («потому что…») или конкретный пример.' : 'Add a reason (“because…”) or a concrete example.') : (ru ? 'Добавь ещё одну деталь, которая прямо отвечает на задание.' : 'Add one more detail that directly answers the task.');
  return { verdict: 'partial', score: 0.5, source: 'rubric',
    feedback: (ru ? 'Направление верное, но ответ пока неполный.' : 'Right direction, but not complete yet.') + covered,
    tip: `${missing} ${ru ? 'Что ищут в хорошем ответе:' : 'What a strong answer includes:'} ${task.criteria}` };
}
