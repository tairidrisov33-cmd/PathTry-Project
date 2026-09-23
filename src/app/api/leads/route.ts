import { NextResponse } from 'next/server';
import { normalizeContact } from '@/lib/leads';
import { badRequest, isShortString, rateLimit, readJson, tooManyRequests } from '@/lib/security';

// Lead capture for roadmap requests (students) and partnership requests (universities, EdTech).
// Set RESEND_API_KEY + LEADS_EMAIL_TO to receive leads by email, and/or LEADS_WEBHOOK_URL
// (Make, Zapier, Google Apps Script, a Telegram bot…) to receive them as JSON.
export async function POST(request: Request) {
  const limit = rateLimit(request, 'leads', 5);
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  const payload = await readJson(request);
  if (!payload || !isShortString(payload.contact, 120)) return badRequest();
  // Honeypot: real users never see or fill this field.
  if (payload.website) return NextResponse.json({ ok: true });

  const contact = normalizeContact(payload.contact);
  if (!contact) return NextResponse.json({ ok: false, error: 'contact' }, { status: 422 });

  const lead = {
    type: payload.type === 'partner' ? 'partner' : 'roadmap',
    contact: contact.value,
    channel: contact.kind,
    profession: isShortString(payload.profession, 60) ? payload.profession : undefined,
    match: typeof payload.match === 'number' && Number.isFinite(payload.match) ? Math.round(payload.match) : undefined,
    organization: isShortString(payload.organization, 120) ? payload.organization : undefined,
    language: payload.language === 'ru' ? 'ru' : 'en',
    createdAt: new Date().toISOString()
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const inbox = process.env.LEADS_EMAIL_TO;
  const deliveries: Promise<void>[] = [];
  if (webhook) deliveries.push(post(webhook, {}, lead, 'Webhook'));
  if (resendKey && inbox) deliveries.push(post('https://api.resend.com/emails', { Authorization: `Bearer ${resendKey}` }, {
    from: process.env.LEADS_EMAIL_FROM || 'PathTry <onboarding@resend.dev>',
    to: inbox.split(',').map((address) => address.trim()),
    subject: lead.type === 'partner' ? `PathTry: partner request${lead.organization ? ` — ${lead.organization}` : ''}` : `PathTry: roadmap request — ${lead.profession ?? 'profession'}`,
    ...(lead.channel === 'email' ? { reply_to: lead.contact } : {}),
    html: `<h2>New PathTry lead</h2><table cellpadding="6">${Object.entries(lead).filter(([, value]) => value !== undefined).map(([key, value]) => `<tr><td><b>${key}</b></td><td>${escapeHtml(String(value))}</td></tr>`).join('')}</table>`
  }, 'Email'));

  if (!deliveries.length) {
    console.info('New lead', { type: lead.type, channel: lead.channel, profession: lead.profession });
    return NextResponse.json({ ok: true, delivered: false });
  }
  // The lead counts as received if at least one channel accepted it.
  const results = await Promise.allSettled(deliveries);
  if (results.every((result) => result.status === 'rejected')) return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
  return NextResponse.json({ ok: true, delivered: true });
}

async function post(url: string, headers: Record<string, string>, body: unknown, label: string) {
  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body), signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`responded ${response.status}`);
  } catch (error) {
    console.error(`Lead ${label} delivery failed`, error instanceof Error ? error.message : 'unknown error');
    throw error;
  }
}

function escapeHtml(value: string) { return value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&#39;', '"': '&quot;' })[character] || character); }
