import { NextResponse } from 'next/server';
import { normalizeContact } from '@/lib/leads';
import { badRequest, isShortString, rateLimit, readJson, tooManyRequests } from '@/lib/security';

// Lead capture for roadmap requests (students) and partnership requests (universities, EdTech).
// Set LEADS_WEBHOOK_URL (Make, Zapier, Google Apps Script, a Telegram bot…) to receive leads in real time.
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
  if (webhook) {
    try {
      const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error('Lead webhook failed', error instanceof Error ? error.message : 'unknown error');
      return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
    }
  } else {
    console.info('New lead', { type: lead.type, channel: lead.channel, profession: lead.profession });
  }
  return NextResponse.json({ ok: true, delivered: Boolean(webhook) });
}
