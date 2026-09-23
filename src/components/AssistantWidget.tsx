'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { ASK_EVENT, getTaskContext } from '@/lib/taskContext';
import Icon from '@/components/Icon';

type Message = { role: 'user' | 'assistant'; content: string };

const suggestions = {
  en: { home: ['Which profession suits a curious person?', 'How does PathTry work?'], try: ['What does this task test?', 'How do I write a strong answer?'], result: ['What should I do next?', 'How should I read my result?'] },
  ru: { home: ['Какая профессия подойдёт любознательному?', 'Как работает PathTry?'], try: ['Что проверяет это задание?', 'Как написать сильный ответ?'], result: ['Что мне делать дальше?', 'Как понимать мой результат?'] }
};

export default function AssistantWidget() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ru = language === 'ru';
  const page = pathname.startsWith('/result') ? 'result' : pathname.startsWith('/try') ? 'try' : 'home';

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = useCallback(async (preset?: string) => {
    const question = (preset ?? input).trim();
    if (!question || loading) return;
    setInput('');
    setOpen(true);
    const history = [...messages, { role: 'user' as const, content: question }];
    setMessages(history);
    setLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history, language, context: window.location.pathname, task: getTaskContext() }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.answer || (ru ? 'Попробуй сформулировать вопрос чуть иначе.' : 'Try asking that in a slightly different way.') }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: ru ? 'PathFinder временно недоступен. Ты всё равно можешь продолжить эксперимент.' : 'PathFinder is temporarily unavailable. You can still continue your experiment.' }]);
    } finally { setLoading(false); }
  }, [input, loading, messages, language, ru]);

  // "Ask PathFinder" buttons elsewhere on the page open the chat with a prepared question.
  useEffect(() => {
    const onAsk = (event: Event) => send((event as CustomEvent<string>).detail);
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, [send]);

  return <div className={`assistant-widget ${open ? 'is-open' : ''}`}>
    {open && <div className="assistant-panel" role="dialog" aria-label="PathFinder">
      <div className="assistant-panel-head"><span className="assistant-avatar"><Icon name="compassNav" size={18} /></span><div><strong>PathFinder</strong><small><span className="online-dot" />{ru ? 'AI-наставник: подскажу, но не решу за тебя' : 'AI mentor: I guide, you decide'}</small></div><button type="button" onClick={() => setOpen(false)} aria-label={ru ? 'Закрыть PathFinder' : 'Close PathFinder'}><Icon name="x" size={15} strokeWidth={2.4} /></button></div>
      <div className="assistant-messages" ref={listRef} aria-live="polite">
        {messages.length === 0 && <div className="assistant-empty"><p className="assistant-welcome">{ru ? 'Привет! Я PathFinder. Спроси о профессии, задании или своём результате.' : 'Hi! I am PathFinder. Ask about a profession, a task, or your result.'}</p><div className="assistant-suggestions">{suggestions[language][page].map((item) => <button type="button" key={item} onClick={() => send(item)}><Icon name="sparkle" size={13} />{item}</button>)}</div></div>}
        {messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
        {loading && <div className="assistant-message assistant typing-dots" aria-label={ru ? 'Думаю' : 'Thinking'}><i /><i /><i /></div>}
      </div>
      <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); send(); }}><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder={ru ? 'Например: что проверяет это задание?' : 'For example: what does this task test?'} /><button type="submit" disabled={!input.trim() || loading} aria-label={ru ? 'Отправить' : 'Send'}><Icon name="send" size={16} /></button></form>
    </div>}
    <button className="assistant-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={ru ? 'Открыть PathFinder' : 'Open PathFinder'}><span className="assistant-spark"><Icon name={open ? 'x' : 'compassNav'} size={17} /></span><span>PathFinder</span></button>
  </div>;
}
