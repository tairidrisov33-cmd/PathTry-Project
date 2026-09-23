import { NextResponse } from 'next/server';
import { normalizeContact } from '@/lib/leads';

// Lead capture for roadmap requests (students) and partnership requests (universities, EdTech).
// Set LEADS_WEBHOOK_URL (Make, Zapier, Google Apps Script, a Telegram bot…) to receive leads in real time.
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload.contact !== 'string') return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  // Honeypot: real users never see or fill this field.
  if (payload.website) return NextResponse.json({ ok: true });

  const contact = normalizeContact(payload.contact);
  if (!contact) return NextResponse.json({ ok: false, error: 'contact' }, { status: 422 });

  const lead = {
    type: payload.type === 'partner' ? 'partner' : 'roadmap',
    contact: contact.value,
    channel: contact.kind,
    profession: typeof payload.profession === 'string' ? payload.profession.slice(0, 60) : undefined,
    match: Number.isFinite(payload.match) ? Math.round(payload.match) : undefined,
    organization: typeof payload.organization === 'string' ? payload.organization.slice(0, 120) : undefined,
    language: payload.language === 'ru' ? 'ru' : 'en',
    createdAt: new Date().toISOString()
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error('Lead webhook failed', error);
      return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
    }
  } else {
    console.info('New lead', lead);
  }
  return NextResponse.json({ ok: true, delivered: Boolean(webhook) });
}
