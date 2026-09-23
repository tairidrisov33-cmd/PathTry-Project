'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import type { Language } from '@/data/translations';
import Icon, { type IconName } from '@/components/Icon';

type Answer = 'yes' | 'a-little' | 'no';

// One-tap question that measures whether the experiment actually changed how a student sees the career.
export default function ViewFeedback({ slug, language }: { slug: string; language: Language }) {
  const ru = language === 'ru';
  const key = `pathtry-feedback-${slug}`;
  const [answer, setAnswer] = useState<Answer | null>(null);
  useEffect(() => { try { setAnswer(localStorage.getItem(key) as Answer | null); } catch { /* storage may be blocked */ } }, [key]);
  const options: { value: Answer; label: string; icon: IconName }[] = [
    { value: 'yes', label: ru ? 'Да' : 'Yes', icon: 'sparkle' },
    { value: 'a-little', label: ru ? 'Немного' : 'A little', icon: 'route' },
    { value: 'no', label: ru ? 'Нет' : 'No', icon: 'meh' }
  ];
  const choose = (value: Answer) => {
    if (answer) return;
    setAnswer(value);
    try { localStorage.setItem(key, value); } catch { /* storage may be blocked */ }
    track('feedback_answer', { profession: slug, answer: value, language });
  };
  return <section className="view-feedback" aria-live="polite">
    <p><Icon name="eye" size={16} />{ru ? 'Эксперимент изменил твой взгляд на эту профессию?' : 'Did this change how you see this profession?'}</p>
    {answer ? <span className="view-feedback-thanks"><Icon name="check" size={14} strokeWidth={3} />{ru ? 'Спасибо! Это помогает нам делать задания точнее.' : 'Thank you! This helps us make the tasks more accurate.'}</span>
      : <div className="view-feedback-options">{options.map((option) => <button type="button" key={option.value} onClick={() => choose(option.value)}><Icon name={option.icon} size={15} />{option.label}</button>)}</div>}
  </section>;
}
