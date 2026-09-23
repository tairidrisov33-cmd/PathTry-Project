import { NextResponse } from 'next/server';
import { getProfession, localize } from '@/data/professions';
import { gradeOffline } from '@/lib/grader';
import { gradeWithClaude } from '@/lib/pathfinder';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const language = payload?.language === 'ru' ? 'ru' : 'en';
  const answer = typeof payload?.answer === 'string' ? payload.answer : '';
  const definition = typeof payload?.slug === 'string' ? getProfession(payload.slug) : undefined;
  if (!definition) return NextResponse.json({ error: 'Unknown profession' }, { status: 400 });

  // Criteria and reference answers come from the server-side catalog, never from the client.
  const profession = localize(definition, language);
  const task = profession.tasks.find((item) => item.id === payload?.taskId && item.type === 'text');
  if (!task) return NextResponse.json({ error: 'Unknown task' }, { status: 400 });
  const gradable = { prompt: task.prompt, criteria: task.criteria ?? '', hint: task.hint, keywords: task.keywords ?? [] };

  const offline = gradeOffline(answer, gradable, language);
  // Obvious non-answers never need a model call.
  if (offline.verdict === 'empty') return NextResponse.json(offline);

  try {
    const review = await gradeWithClaude(answer, { ...gradable, sample: task.sample ?? '', profession: profession.title }, language);
    if (review) return NextResponse.json(review);
  } catch (error) {
    console.error('PathFinder review failed, using rubric', error);
  }
  return NextResponse.json(offline);
}
