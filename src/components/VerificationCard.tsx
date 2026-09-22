'use client';

import { useEffect, useRef, useState } from 'react';
import type { SkillPoint } from '@/components/RadarSkillChart';
import Icon from '@/components/Icon';

export default function VerificationCard({ profession, match, strongest, skills, language, onClose }: { profession: string; match: number; strongest: string; skills: SkillPoint[]; language: 'en' | 'ru'; onClose: () => void }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const ru = language === 'ru';
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [onClose]);
  const shareUrl = typeof window === 'undefined' ? 'https://pathtry.vercel.app' : window.location.href;
  const copyLink = async () => { await navigator.clipboard?.writeText(shareUrl); setStatus(ru ? 'Ссылка скопирована' : 'Link copied'); };
  const copyImage = async () => {
    const card = cardRef.current;
    if (!card) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520"><rect width="900" height="520" rx="28" fill="#17211f"/><text x="55" y="75" fill="#f16d59" font-family="Arial" font-size="20" font-weight="700">PATHTRY</text><text x="55" y="155" fill="#f1f4ed" font-family="Arial" font-size="42" font-weight="700">${escapeXml(name || (ru ? 'Мой профиль' : 'My profile'))}</text><text x="55" y="205" fill="#aab7b0" font-family="Arial" font-size="22">${escapeXml(profession)}</text><text x="55" y="340" fill="#f8c66e" font-family="Arial" font-size="76" font-weight="700">${match}%</text><text x="55" y="385" fill="#f1f4ed" font-family="Arial" font-size="20">${ru ? 'совпадение с рабочим стилем' : 'work style match'}</text><text x="55" y="455" fill="#aab7b0" font-family="Arial" font-size="18">${escapeXml(strongest)}</text></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    try { if (navigator.clipboard && 'ClipboardItem' in window) await navigator.clipboard.write([new ClipboardItem({ 'image/svg+xml': blob })]); } catch { /* download remains the reliable fallback */ }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'pathtry-verification.svg'; link.click(); URL.revokeObjectURL(url);
    setStatus(ru ? 'Карточка скачана' : 'Card downloaded');
  };
  const share = async () => { const text = ru ? `Мой PathTry-профиль: ${profession} — ${match}% совпадения.` : `My PathTry profile: ${profession} — ${match}% match.`; if (navigator.share) await navigator.share({ title: 'PathTry', text, url: shareUrl }); else { await navigator.clipboard?.writeText(`${text} ${shareUrl}`); setStatus(ru ? 'Текст для публикации скопирован' : 'Share text copied'); } };
  return <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={ru ? 'Карточка подтверждения' : 'Verification card'}><div className="verification-modal"><button className="modal-close" type="button" onClick={onClose} aria-label={ru ? 'Закрыть' : 'Close'}><Icon name="x" size={16} strokeWidth={2.4} /></button><div className="verification-card" ref={cardRef}><div className="verification-brand"><Icon name="sparkle" size={15} />PATHTRY<span className="verified-chip"><Icon name="check" size={11} strokeWidth={3} />{ru ? 'Проверено' : 'Verified'}</span></div><div className="verification-name">{name || (ru ? 'Твой профиль' : 'Your profile')}</div><div className="verification-profession">{profession}</div><div className="verification-divider" /><div className="verification-stat"><strong>{match}%</strong><span>{ru ? 'совпадение рабочего стиля' : 'work style match'}</span></div><div className="verification-skill"><Icon name="trophy" size={14} />{ru ? 'Сильная сторона' : 'Strength'}: <b>{strongest}</b></div><div className="verification-bars">{skills.map((skill) => <span key={skill.label} title={`${skill.label}: ${skill.value}`}><i style={{ height: `${skill.value}%` }} /></span>)}</div><div className="verification-qr"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(shareUrl)}`} alt="QR code" /></div></div><label className="verification-name-input">{ru ? 'Имя на карточке' : 'Name on card'}<input value={name} onChange={(event) => setName(event.target.value)} placeholder={ru ? 'Например, Анна' : 'For example, Alex'} /></label><div className="verification-actions"><button className="btn btn-primary" type="button" onClick={copyImage}><Icon name="download" size={15} />{ru ? 'Скопировать карточку' : 'Copy Image / Link'}</button><button className="btn btn-outline" type="button" onClick={copyLink}><Icon name="link" size={15} />{ru ? 'Скопировать ссылку' : 'Copy Link'}</button><button className="btn btn-outline" type="button" onClick={share}><Icon name="share" size={15} />{ru ? 'Поделиться' : 'Share to Socials'}</button></div>{status && <p className="modal-status" role="status"><Icon name="check" size={13} strokeWidth={3} />{status}</p>}</div></div>;
}

function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] || character); }
