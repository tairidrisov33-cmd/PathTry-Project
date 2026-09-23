import { NextResponse } from 'next/server';
import type { Language } from '@/data/translations';
import { getProfession, localize } from '@/data/professions';
import { breakdownWithAI, chatWithAI } from '@/lib/pathfinder';
import { offlineReply } from '@/lib/pathfinderOffline';
import { describeResult, scoreExperiment, SKILL_LABELS, type SavedAnswer } from '@/lib/scoring';
import { badRequest, isShortString, MAX_HISTORY, MAX_MESSAGE_LENGTH, rateLimit, readJson, tooManyRequests } from '@/lib/security';
import type { TaskContext } from '@/lib/taskContext';

const BREAKDOWN_TIMEOUT_MS = 9_000;
const ENJOYMENT = new Set(['yes', 'so-so', 'no', 'skipped']);

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(request: Request) {
  const limit = rateLimit(request, 'assistant');
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  const payload = await readJson(request);
  if (payload?.mode === 'breakdown') return breakdown(payload);
  if (!payload || !Array.isArray(payload.messages) || payload.messages.length === 0 || payload.messages.length > 40) return badRequest();
  const language: Language = payload.language === 'ru' ? 'ru' : 'en';
  const page = isShortString(payload.context, 120) ? payload.context : '/';

  const history: ChatMessage[] = [];
  for (const message of payload.messages.slice(-MAX_HISTORY) as unknown[]) {
    const item = message as Partial<ChatMessage> | null;
    if (!item || (item.role !== 'user' && item.role !== 'assistant') || typeof item.content !== 'string') return badRequest();
    history.push({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_LENGTH * 2) });
  }
  while (history.length && history[0].role !== 'user') history.shift();
  const question = history.at(-1);
  if (!question || question.role !== 'user' || !question.content.trim()) return badRequest();
  if (question.content.length > MAX_MESSAGE_LENGTH) return badRequest(language === 'ru' ? 'Сообщение слишком длинное (максимум 1000 символов).' : 'Message is too long (1000 characters max).');

  const task = parseTask(payload.task);
  try {
    const answer = await chatWithAI(history, language, page, task);
    if (answer) return NextResponse.json({ answer, source: 'ai' });
  } catch (error) {
    console.error('PathFinder chat failed, using offline mode', error instanceof Error ? error.message : 'unknown error');
  }
  return NextResponse.json({ answer: offlineReply(question.content, language, page, task), source: 'offline' });
}

// Result breakdown: the score is recomputed here from the server-side catalog, so the model only
// ever sees numbers that match the result page. Falls back to the rule-based summary.
async function breakdown(payload: Record<string, unknown>) {
  const language: Language = payload.language === 'ru' ? 'ru' : 'en';
  const definition = isShortString(payload.slug, 60) ? getProfession(payload.slug) : undefined;
  if (!definition || !Array.isArray(payload.answers) || payload.answers.length === 0 || payload.answers.length > 20) return badRequest();
  const answers: SavedAnswer[] = [];
  for (const value of payload.answers as unknown[]) {
    const item = value as Partial<SavedAnswer> | null;
    if (!item || !isShortString(item.taskId, 60) || typeof item.score !== 'number' || !Number.isFinite(item.score) || item.score < 0 || item.score > 1 || !ENJOYMENT.has(String(item.enjoyment))) return badRequest();
    answers.push({ taskId: item.taskId, score: item.score, enjoyment: item.enjoyment as SavedAnswer['enjoyment'], choice: null, text: '' });
  }

  const profession = localize(definition, language);
  const result = scoreExperiment(answers, profession.tasks);
  const lang = language === 'ru' ? 1 : 0;
  const status = { good: 'pro move', partial: 'partly there', miss: 'missed', empty: 'not answered' };
  const summary = [
    `Profession: ${profession.title}`,
    `Pro moves: ${result.proMoves} of ${result.total} (answered ${result.answered} of ${result.total})`,
    `Work-style match: ${result.matchPercent}%`,
    `Energy: ${result.energy === null ? 'not rated' : `${result.energy}% based on ${result.ratedTasks} rated tasks`}`,
    `Strongest skills: ${result.strengths.map((skill) => SKILL_LABELS[skill][lang]).join(', ')}`,
    'Tasks:',
    ...profession.tasks.map((task, index) => `- ${task.prompt} → ${status[result.steps[index].status]}${result.steps[index].enjoyment ? `, felt: ${result.steps[index].enjoyment}` : ''}`)
  ].join('\n');

  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), BREAKDOWN_TIMEOUT_MS));
    const answer = await Promise.race([breakdownWithAI(summary, language), timeout]);
    if (answer) return NextResponse.json({ answer, source: 'ai' });
  } catch (error) {
    console.error('PathFinder breakdown failed, using rules', error instanceof Error ? error.message : 'unknown error');
  }
  return NextResponse.json({ answer: describeResult(result, profession.title, language), source: 'rules' });
}

// The task context comes from the browser, so every field is type- and length-checked.
function parseTask(value: unknown): TaskContext | null {
  const task = value as Partial<TaskContext> | null;
  if (!task || !isShortString(task.prompt, 500) || !isShortString(task.profession, 80) || !isShortString(task.hint, 500) || (task.type !== 'choice' && task.type !== 'text')) return null;
  const options = Array.isArray(task.options) ? task.options.filter((option): option is string => isShortString(option, 300)).slice(0, 5) : undefined;
  return { prompt: task.prompt, profession: task.profession, hint: task.hint, type: task.type, options, submitted: task.submitted === true };
}
