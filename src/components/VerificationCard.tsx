'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import type { SkillPoint } from '@/components/RadarSkillChart';
import Icon from '@/components/Icon';

// Shareable result card. The link and QR code invite friends to try the same profession.
// All numbers come from the same scoreExperiment() result as the result page.
export default function VerificationCard({ slug, profession, match, proMoves, total, complete, strongest, skills, language, onClose }: { slug: string; profession: string; match: number; proMoves: number; total: number; complete: boolean; strongest: string; skills: SkillPoint[]; language: 'en' | 'ru'; onClose: () => void }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [qr, setQr] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const ru = language === 'ru';
  const points = proMoves.toLocaleString(ru ? 'ru-RU' : 'en-GB', { maximumFractionDigits: 1 });
  const chip = complete ? (ru ? `${total} задач пройдено` : `${total} tasks done`) : (ru ? 'предварительно' : 'preliminary');

  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [onClose]);
  // Generated locally, so no third-party service sees the link.
  useEffect(() => {
    const url = `${window.location.origin}/try/${slug}?ref=card`;
    setShareUrl(url);
    QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }).then(setQr).catch(() => setQr(''));
  }, [slug]);

  const copyLink = async () => { await navigator.clipboard?.writeText(shareUrl); setStatus(ru ? 'Ссылка скопирована' : 'Link copied'); };
  const download = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520"><rect width="900" height="520" rx="28" fill="#17211f"/><text x="55" y="75" fill="#f16d59" font-family="Arial" font-size="20" font-weight="700">PATHTRY</text><text x="55" y="155" fill="#f1f4ed" font-family="Arial" font-size="42" font-weight="700">${escapeXml(name || (ru ? 'Мой профиль' : 'My profile'))}</text><text x="55" y="205" fill="#aab7b0" font-family="Arial" font-size="22">${escapeXml(profession)}</text><text x="55" y="340" fill="#f8c66e" font-family="Arial" font-size="76" font-weight="700">${match}%</text><text x="55" y="385" fill="#f1f4ed" font-family="Arial" font-size="20">${ru ? 'совпадение с рабочим стилем' : 'work style match'}</text><text x="55" y="455" fill="#aab7b0" font-family="Arial" font-size="18">${escapeXml(strongest)} · ${points}/${total} ${ru ? 'проф. решений' : 'pro moves'}</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a'); link.href = url; link.download = 'pathtry-result.svg'; link.click(); URL.revokeObjectURL(url);
    setStatus(ru ? 'Карточка скачана' : 'Card downloaded');
  };
  const share = async () => {
    const text = ru ? `Мой результат PathTry: ${profession} — ${match}% совпадения. Попробуй сам за 10 минут:` : `My PathTry result: ${profession} — ${match}% match. Try it yourself in 10 minutes:`;
    try {
      if (navigator.share) { await navigator.share({ title: 'PathTry', text, url: shareUrl }); return; }
      await navigator.clipboard?.writeText(`${text} ${shareUrl}`);
      setStatus(ru ? 'Текст для публикации скопирован' : 'Share text copied');
    } catch { /* the user closed the share sheet */ }
  };

  return <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={ru ? 'Карточка результата' : 'Result card'}><div className="verification-modal"><button className="modal-close" type="button" onClick={onClose} aria-label={ru ? 'Закрыть' : 'Close'}><Icon name="x" size={16} strokeWidth={2.4} /></button>
    <div className="verification-card"><div className="verification-brand"><Icon name="sparkle" size={15} />PATHTRY<span className="verified-chip"><Icon name="check" size={11} strokeWidth={3} />{chip}</span></div><div className="verification-name">{name || (ru ? 'Твой профиль' : 'Your profile')}</div><div className="verification-profession">{profession}</div><div className="verification-divider" /><div className="verification-stat"><strong>{match}%</strong><span>{ru ? 'совпадение рабочего стиля' : 'work style match'}</span></div><div className="verification-skill"><Icon name="trophy" size={14} />{ru ? 'Сильная сторона' : 'Strength'}: <b>{strongest}</b></div><div className="verification-skill"><Icon name="check" size={14} />{ru ? 'Проф. решения' : 'Pro moves'}: <b>{points}/{total}</b></div><div className="verification-bars">{skills.map((skill) => <span key={skill.label} title={`${skill.label}: ${skill.value}`}><i style={{ height: `${skill.value}%` }} /></span>)}</div>{qr && <div className="verification-qr" role="img" aria-label={ru ? 'QR-код: попробовать эту профессию' : 'QR code: try this profession'} dangerouslySetInnerHTML={{ __html: qr }} />}</div>
    <label className="verification-name-input">{ru ? 'Имя на карточке' : 'Name on card'}<input value={name} maxLength={40} onChange={(event) => setName(event.target.value)} placeholder={ru ? 'Например, Анна' : 'For example, Alex'} /></label>
    <div className="verification-actions"><button className="btn btn-primary" type="button" onClick={download}><Icon name="download" size={15} />{ru ? 'Скачать карточку' : 'Download card'}</button><button className="btn btn-outline" type="button" onClick={copyLink}><Icon name="link" size={15} />{ru ? 'Скопировать ссылку' : 'Copy link'}</button><button className="btn btn-outline" type="button" onClick={share}><Icon name="share" size={15} />{ru ? 'Поделиться' : 'Share'}</button></div>
    {status && <p className="modal-status" role="status"><Icon name="check" size={13} strokeWidth={3} />{status}</p>}
  </div></div>;
}

function escapeXml(value: string) { return value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] || character); }
