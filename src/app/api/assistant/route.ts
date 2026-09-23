import { NextResponse } from 'next/server';
import type { Language } from '@/data/translations';
import { chatWithClaude } from '@/lib/pathfinder';
import { offlineReply } from '@/lib/pathfinderOffline';
import { badRequest, isShortString, MAX_HISTORY, MAX_MESSAGE_LENGTH, rateLimit, readJson, tooManyRequests } from '@/lib/security';
import type { TaskContext } from '@/lib/taskContext';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(request: Request) {
  const limit = rateLimit(request, 'assistant');
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  const payload = await readJson(request);
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
    const answer = await chatWithClaude(history, language, page, task);
    if (answer) return NextResponse.json({ answer, source: 'ai' });
  } catch (error) {
    console.error('PathFinder chat failed, using offline mode', error instanceof Error ? error.message : 'unknown error');
  }
  return NextResponse.json({ answer: offlineReply(question.content, language, page, task), source: 'offline' });
}

// The task context comes from the browser, so every field is type- and length-checked.
function parseTask(value: unknown): TaskContext | null {
  const task = value as Partial<TaskContext> | null;
  if (!task || !isShortString(task.prompt, 500) || !isShortString(task.profession, 80) || !isShortString(task.hint, 500) || (task.type !== 'choice' && task.type !== 'text')) return null;
  const options = Array.isArray(task.options) ? task.options.filter((option): option is string => isShortString(option, 300)).slice(0, 5) : undefined;
  return { prompt: task.prompt, profession: task.profession, hint: task.hint, type: task.type, options, submitted: task.submitted === true };
}
