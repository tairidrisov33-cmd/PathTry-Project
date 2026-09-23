import { NextResponse } from 'next/server';
import { getProfession, localize } from '@/data/professions';
import { gradeOffline } from '@/lib/grader';
import { gradeWithClaude } from '@/lib/pathfinder';
import { badRequest, isShortString, MAX_MESSAGE_LENGTH, rateLimit, readJson, tooManyRequests } from '@/lib/security';

export async function POST(request: Request) {
  const limit = rateLimit(request, 'review');
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  const payload = await readJson(request);
  if (!payload || !isShortString(payload.slug, 60) || !isShortString(payload.taskId, 60) || typeof payload.answer !== 'string') return badRequest();
  const language = payload.language === 'ru' ? 'ru' : 'en';
  if (payload.answer.length > MAX_MESSAGE_LENGTH) return badRequest(language === 'ru' ? 'Ответ слишком длинный (максимум 1000 символов).' : 'Answer is too long (1000 characters max).');
  const definition = getProfession(payload.slug);
  if (!definition) return badRequest('Unknown profession.');

  // Criteria and reference answers come from the server-side catalog, never from the client.
  const profession = localize(definition, language);
  const task = profession.tasks.find((item) => item.id === payload.taskId && item.type === 'text');
  if (!task) return badRequest('Unknown task.');
  const gradable = { prompt: task.prompt, criteria: task.criteria ?? '', hint: task.hint, keywords: task.keywords ?? [] };

  const offline = gradeOffline(payload.answer, gradable, language);
  // Obvious non-answers never need a model call.
  if (offline.verdict === 'empty') return NextResponse.json(offline);

  try {
    const review = await gradeWithClaude(payload.answer, { ...gradable, sample: task.sample ?? '', profession: profession.title }, language);
    if (review) return NextResponse.json(review);
  } catch (error) {
    console.error('PathFinder review failed, using rubric', error instanceof Error ? error.message : 'unknown error');
  }
  return NextResponse.json(offline);
}
