'use client';

import { useEffect, useRef, useState } from 'react';
import { professions } from '@/data/professions';
import type { Language } from '@/data/translations';
import Icon, { professionColors, professionIcons } from '@/components/Icon';

// Rotating preview tasks from the featured profession (Software Developer), matching the hero banner.
const samples: Record<Language, { slug: string; step: number; prompt: string; wrong: string; right: string }[]> = {
  en: [
    { slug: 'software-developer', step: 1, prompt: 'Signup works on your laptop but fails for some users. First move?', wrong: 'Rewrite the whole page', right: 'Ask for steps and the error' },
    { slug: 'software-developer', step: 2, prompt: 'Fix a typo, speed up a slow checkout, or add an animation?', wrong: 'Add the animation', right: 'Speed up the checkout' },
    { slug: 'software-developer', step: 7, prompt: 'The site breaks right after your release. What first?', wrong: 'Patch it live until it works', right: 'Roll back, then investigate' }
  ],
  ru: [
    { slug: 'software-developer', step: 1, prompt: 'Регистрация работает у тебя, но не у части пользователей. С чего начнёшь?', wrong: 'Перепишу всю страницу', right: 'Узнаю шаги и текст ошибки' },
    { slug: 'software-developer', step: 2, prompt: 'Опечатка, медленная оплата или новая анимация — что первым?', wrong: 'Добавлю анимацию', right: 'Ускорю оплату' },
    { slug: 'software-developer', step: 7, prompt: 'Сразу после релиза сайт сломался. Что делаешь первым?', wrong: 'Чиню прямо на живом сайте', right: 'Откатываю, потом разбираюсь' }
  ]
};

const CYCLE_MS = 5000;

export default function HeroArt({ language, timer, taskLabel }: { language: Language; timer: string; taskLabel: (step: number) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const sample = samples[language][index];

  // Rotate samples and run CSS loops only while the hero is on screen and the tab is visible.
  useEffect(() => {
    const hero = ref.current?.closest('.hero');
    if (!hero) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true, id = 0;
    const sync = () => {
      const active = visible && !document.hidden;
      hero.classList.toggle('is-paused', !active);
      if (reduced) return;
      if (active && !id) id = window.setInterval(() => setIndex((current) => (current + 1) % samples.en.length), CYCLE_MS);
      if (!active && id) { window.clearInterval(id); id = 0; }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(hero);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); window.clearInterval(id); };
  }, []);

  // Pointer-driven tilt and parallax, eased toward the target each frame.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0, x = 0, y = 0, tx = 0, ty = 0;
    const tick = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      el.style.setProperty('--px', x.toFixed(4));
      el.style.setProperty('--py', y.toFixed(4));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = (event.clientX - rect.left) / rect.width - 0.5;
      ty = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--gx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--gy', `${event.clientY - rect.top}px`);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = () => { tx = 0; ty = 0; if (!frame) frame = requestAnimationFrame(tick); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame); };
  }, []);

  return <div className="hero-art" ref={ref} aria-hidden="true">
    <div className="hero-grid" />
    <div className="hero-glow" />
    <div className="hero-orbit">{professions.map((profession, i) => <span className={`orbit-chip ${profession.slug === sample.slug ? 'is-active' : ''}`} key={profession.slug} style={{ '--i': i, '--n': professions.length, '--c': professionColors[profession.color] } as React.CSSProperties}><Icon name={professionIcons[profession.slug]} size={17} /></span>)}</div>
    <div className="hero-timer"><Icon name="clock" size={16} />{timer}</div>
    <div className="hero-mock-wrap">
      <div className="hero-mock" key={`${language}-${index}`}>
        <div className="hero-mock-head"><span>{taskLabel(sample.step)}</span><span className="hero-mock-dots">{Array.from({ length: 10 }, (_, index) => index + 1).map((dot) => <i className={dot <= sample.step ? 'on' : ''} key={dot} />)}</span></div>
        <strong>{sample.prompt}</strong>
        <div className="hero-mock-option"><span>{sample.wrong}</span></div>
        <div className="hero-mock-option is-correct"><span>{sample.right}</span><Icon name="check" size={14} strokeWidth={2.6} /></div>
      </div>
    </div>
  </div>;
}
