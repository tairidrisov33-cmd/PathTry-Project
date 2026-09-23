'use client';

import { useState } from 'react';
import type { Language } from '@/data/translations';
import { normalizeContact } from '@/lib/leads';
import Icon from '@/components/Icon';

type Props = { language: Language; type: 'roadmap' | 'partner'; profession?: string; professionTitle?: string; match?: number };

export default function LeadCapture({ language, type, profession, professionTitle, match }: Props) {
  const ru = language === 'ru';
  const [contact, setContact] = useState('');
  const [organization, setOrganization] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const partner = type === 'partner';
  const t = ru ? {
    kicker: partner ? 'Для вузов и EdTech' : 'Персональная дорожная карта',
    title: partner ? 'Станьте партнёром PathTry' : `Хочешь дорожную карту по профессии «${professionTitle}»?`,
    text: partner ? 'Оставьте контакт — пришлём демо аналитики и условия пилота.' : 'Пришлём план на 3 месяца: вузы и программы, онлайн-курсы, проекты для портфолио и людей, с которыми стоит поговорить.',
    bullets: partner ? [] : ['Подборка вузов и курсов', 'Проекты для портфолио', 'План на 12 недель'],
    placeholder: 'Email или @username в Telegram', org: 'Вуз или компания', send: partner ? 'Запросить демо' : 'Получить дорожную карту', sending: 'Отправляем…',
    invalid: 'Введи корректный email или Telegram-ник (например, @pathtry_user).', failed: 'Не получилось отправить. Попробуй ещё раз.',
    done: partner ? 'Спасибо! Мы свяжемся с вами в течение двух рабочих дней.' : 'Готово! Дорожная карта придёт на', consent: 'Никакого спама — только то, что ты запросил(а). Отписаться можно в любой момент.'
  } : {
    kicker: partner ? 'For universities & EdTech' : 'Personal roadmap',
    title: partner ? 'Become a PathTry partner' : `Want a personal roadmap for ${professionTitle}?`,
    text: partner ? 'Leave a contact and we will send an analytics demo and pilot terms.' : 'Get a 3-month plan: universities and programmes, online courses, portfolio projects, and people worth talking to.',
    bullets: partner ? [] : ['Universities & courses', 'Portfolio projects', '12-week plan'],
    placeholder: 'Email or Telegram @username', org: 'University or company', send: partner ? 'Request a demo' : 'Get my roadmap', sending: 'Sending…',
    invalid: 'Enter a valid email or Telegram username (e.g. @pathtry_user).', failed: 'Could not send. Please try again.',
    done: partner ? 'Thank you! We will get back to you within two business days.' : 'Done! Your roadmap is on its way to', consent: 'No spam — only what you asked for. Unsubscribe any time.'
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeContact(contact);
    if (!normalized) { setError(t.invalid); return; }
    setError(''); setStatus('sending');
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, contact: normalized.value, profession, match, organization: organization || undefined, language, website }) });
      if (!response.ok) throw new Error('lead failed');
      setContact(normalized.value);
      setStatus('done');
    } catch { setStatus('error'); setError(t.failed); }
  };

  return <section className={`lead-card ${partner ? 'is-partner' : ''}`} aria-live="polite">
    <div className="lead-copy"><span className="panel-kicker"><Icon name={partner ? 'building' : 'map'} size={14} />{t.kicker}</span><h2>{t.title}</h2><p>{t.text}</p>{t.bullets.length > 0 && <ul className="lead-bullets">{t.bullets.map((item) => <li key={item}><Icon name="check" size={13} strokeWidth={2.6} />{item}</li>)}</ul>}</div>
    {status === 'done' ? <div className="lead-done" role="status"><span className="lead-done-icon"><Icon name="check" size={22} strokeWidth={2.6} /></span><p>{t.done}{!partner && <> <b>{contact}</b></>}</p></div> : <form className="lead-form" onSubmit={submit} noValidate>
      {partner && <input className="lead-input" value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder={t.org} aria-label={t.org} autoComplete="organization" />}
      <div className="lead-row"><span className="lead-field"><Icon name="mail" size={17} /><input value={contact} onChange={(event) => { setContact(event.target.value); if (error) setError(''); }} placeholder={t.placeholder} aria-label={t.placeholder} aria-invalid={Boolean(error)} autoComplete="email" inputMode="email" /></span><button className="btn btn-primary" type="submit" disabled={status === 'sending' || !contact.trim()}>{status === 'sending' ? t.sending : t.send}<Icon name="send" size={15} /></button></div>
      <input className="lead-honeypot" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} aria-hidden="true" />
      {error ? <p className="lead-error" role="alert">{error}</p> : <p className="lead-consent">{t.consent}</p>}
    </form>}
  </section>;
}
