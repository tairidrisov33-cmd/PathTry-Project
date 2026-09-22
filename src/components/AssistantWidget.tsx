'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AssistantWidget() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const ru = language === 'ru';

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;
    setInput('');
    setOpen(true);
    setMessages((current) => [...current, { role: 'user', content: question }]);
    setLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, language, context: window.location.pathname }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.answer || (ru ? 'Попробуй сформулировать вопрос чуть иначе.' : 'Try asking that in a slightly different way.') }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: ru ? 'Помощник временно недоступен. Ты всё равно можешь продолжить эксперимент.' : 'The guide is temporarily unavailable. You can still continue your experiment.' }]);
    } finally { setLoading(false); }
  };

  return <div className={`assistant-widget ${open ? 'is-open' : ''}`}>
    {open && <div className="assistant-panel"><div className="assistant-panel-head"><div><strong>{ru ? 'PathTry помощник' : 'PathTry guide'}</strong><small>{ru ? 'Подскажу, но не буду выбирать за тебя' : 'I can guide you without choosing for you'}</small></div><button type="button" onClick={() => setOpen(false)} aria-label={ru ? 'Закрыть помощника' : 'Close guide'}>×</button></div><div className="assistant-messages">{messages.length === 0 && <p className="assistant-welcome">{ru ? 'Спроси о профессии, задании или результате.' : 'Ask about a profession, a task, or your result.'}</p>}{messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}{loading && <div className="assistant-message assistant">{ru ? 'Думаю...' : 'Thinking...'}</div>}</div><div className="assistant-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder={ru ? 'Например: что проверяет это задание?' : 'For example: what does this task test?'} /><button type="button" onClick={send} disabled={!input.trim() || loading} aria-label={ru ? 'Отправить' : 'Send'}>↑</button></div></div>}
    <button className="assistant-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-label={ru ? 'Открыть помощника' : 'Open guide'}><span className="assistant-spark">✦</span><span>{ru ? 'Помощник' : 'Guide'}</span></button>
  </div>;
}
