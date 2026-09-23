const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM = /^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/;

// Accepts an email address or a Telegram username (with or without @). Shared by the form and the API.
export function normalizeContact(value: string): { kind: 'email' | 'telegram'; value: string } | null {
  const contact = value.trim();
  if (EMAIL.test(contact)) return { kind: 'email', value: contact.toLowerCase() };
  if (TELEGRAM.test(contact)) return { kind: 'telegram', value: `@${contact.replace(/^@/, '')}` };
  return null;
}
