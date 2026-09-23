'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import TransitionLink from '@/components/TransitionLink';
import LeadCapture from '@/components/LeadCapture';
import { useLanguage } from '@/components/LanguageProvider';
import Icon, { type IconName } from '@/components/Icon';
import { classSlug } from '@/lib/visitSource';

export default function SchoolsContent() {
  const { language } = useLanguage();
  const ru = language === 'ru';
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);
  const slug = classSlug(name);

  useEffect(() => {
    if (!slug) { setLink(''); setQr(''); return; }
    const url = `${window.location.origin}/?ref=${slug}`;
    setLink(url); setCopied(false);
    QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }).then(setQr).catch(() => setQr(''));
  }, [slug]);

  const copy = async () => { try { await navigator.clipboard.writeText(link); setCopied(true); } catch { /* clipboard blocked */ } };

  const lesson: { time: string; title: string; body: string }[] = ru ? [
    { time: '5 мин', title: 'Вступление', body: 'Учитель показывает ссылку или QR-код класса. Регистрация не нужна — только телефон или компьютер.' },
    { time: '15 мин', title: 'Первая профессия', body: 'Каждый выбирает профессию и проходит 10 рабочих задач. PathFinder подсказывает, но не выдаёт ответ.' },
    { time: '10 мин', title: 'Вторая профессия', body: 'Ученики пробуют вторую профессию — на странице результата появляется «Карта профессий» со сравнением.' },
    { time: '10 мин', title: 'Обсуждение', body: 'Где было больше энергии? Что удивило? Ученики делятся карточками результата.' },
    { time: '5 мин', title: 'Следующий шаг', body: 'Каждый сохраняет результат в PDF и записывает один шаг: кружок, курс или разговор со специалистом.' }
  ] : [
    { time: '5 min', title: 'Intro', body: 'The teacher shows the class link or QR code. No sign-up — just a phone or a computer.' },
    { time: '15 min', title: 'First profession', body: 'Everyone picks a profession and works through 10 real tasks. PathFinder gives hints, never the answer.' },
    { time: '10 min', title: 'Second profession', body: 'Students try a second one — the result page then shows a “profession map” comparing both.' },
    { time: '10 min', title: 'Discussion', body: 'Where was the energy higher? What surprised you? Students share their result cards.' },
    { time: '5 min', title: 'Next step', body: 'Everyone saves the result as PDF and writes down one next step: a club, a course, or a talk with a professional.' }
  ];
  const benefits: { icon: IconName; title: string; body: string }[] = ru ? [
    { icon: 'shield', title: 'Бесплатно и без регистрации', body: 'Ученикам не нужны аккаунты и личные данные: прогресс хранится только в их браузере.' },
    { icon: 'layers', title: '15 профессий, 150 задач', body: 'Задачи основаны на O*NET и ESCO, для каждой профессии указаны предметы ЕНТ.' },
    { icon: 'chart', title: 'Измеримый пилот', body: 'Ссылка класса помечает прохождения. После урока — короткий опрос до/после и анонимная сводка по классу от нашей команды.' }
  ] : [
    { icon: 'shield', title: 'Free, no sign-up', body: 'Students need no accounts and no personal data: progress stays in their browser.' },
    { icon: 'layers', title: '15 professions, 150 tasks', body: 'Tasks are based on O*NET and ESCO; every profession lists its UNT (ЕНТ) subjects.' },
    { icon: 'chart', title: 'A measurable pilot', body: 'The class link tags the runs. After the lesson: a short before/after survey and an anonymous class summary from our team.' }
  ];

  return <main className="about-shell schools-shell">
    <TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{ru ? 'На главную' : 'Home'}</TransitionLink>
    <div className="about-hero"><div className="kicker" style={{ marginTop: 40 }}>{ru ? 'Для школ и профориентаторов' : 'For schools & career counsellors'}</div><h1>{ru ? 'Урок профориентации за 45 минут' : 'A 45-minute career lesson'}</h1><p>{ru ? 'Каждый ученик пробует две профессии через реальные рабочие задачи и уходит с результатом и следующим шагом. Бесплатно, без регистрации, с телефона.' : 'Every student tries two professions through real work tasks and leaves with a result and a next step. Free, no sign-up, on a phone.'}</p></div>

    <section className="about-section"><h2><span className="section-icon"><Icon name="clock" size={18} /></span>{ru ? 'План урока' : 'Lesson plan'}</h2><ol className="lesson-plan">{lesson.map((step) => <li key={step.title}><span className="lesson-time">{step.time}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></li>)}</ol></section>

    <section className="about-section"><h2><span className="section-icon"><Icon name="link" size={18} /></span>{ru ? 'Ссылка для класса' : 'Class link'}</h2><div className="class-link">
      <label className="class-link-field"><span>{ru ? 'Школа и класс' : 'School and class'}</span><input value={name} maxLength={60} onChange={(event) => setName(event.target.value)} placeholder={ru ? 'Например: Школа 17, 10А' : 'For example: School 17, 10A'} /></label>
      {link ? <div className="class-link-result">
        {qr && <div className="class-link-qr" role="img" aria-label={ru ? 'QR-код ссылки класса' : 'QR code of the class link'} dangerouslySetInnerHTML={{ __html: qr }} />}
        <div><code>{link}</code><button className="btn btn-outline" type="button" onClick={copy}><Icon name={copied ? 'check' : 'link'} size={15} />{copied ? (ru ? 'Скопировано' : 'Copied') : (ru ? 'Скопировать ссылку' : 'Copy link')}</button><p className="muted">{ru ? 'Покажите QR-код на экране или отправьте ссылку в чат класса. Прохождения по ней помечаются, чтобы измерить пилот.' : 'Show the QR code on screen or send the link to the class chat. Runs through it are tagged so the pilot can be measured.'}</p></div>
      </div> : <p className="muted">{ru ? 'Введите название — ссылка и QR-код появятся сразу.' : 'Type a name — the link and QR code appear instantly.'}</p>}
    </div></section>

    <section className="about-section"><h2><span className="section-icon"><Icon name="building" size={18} /></span>{ru ? 'Что получает школа' : 'What the school gets'}</h2><div className="partner-grid">{benefits.map((item) => <div className="partner-card" key={item.title}><span className="step-icon"><Icon name={item.icon} size={20} /></span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></section>

    <LeadCapture language={language} type="partner" />
  </main>;
}
