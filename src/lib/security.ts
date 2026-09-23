import { NextResponse } from 'next/server';

export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_HISTORY = 10;
const WINDOW_MS = 60_000;

// Simple in-memory sliding-window limiter. Each serverless instance keeps its own window,
// which is enough to stop casual abuse without an external store.
const hits = new Map<string, number[]>();

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(request: Request, bucket: string, limit = 20) {
  const now = Date.now();
  const key = `${bucket}:${clientIp(request)}`;
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.size > 5000) for (const [entry, times] of hits) if (!times.some((time) => now - time < WINDOW_MS)) hits.delete(entry);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false as const, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true as const, retryAfter: 0 };
}

// Error bodies never include stack traces, provider messages, or configuration details.
export const tooManyRequests = (retryAfter: number) => NextResponse.json({ error: 'Too many requests. Please wait a minute and try again.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
export const badRequest = (message = 'Invalid request.') => NextResponse.json({ error: message }, { status: 400 });

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get('content-length') ?? 0) > 20_000) return null;
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body as Record<string, unknown> : null;
  } catch { return null; }
}

export const isShortString = (value: unknown, max: number): value is string => typeof value === 'string' && value.length <= max;
