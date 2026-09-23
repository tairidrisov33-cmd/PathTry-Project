import type { CSSProperties } from 'react';

// Hand-tuned 24×24 stroke icons so every glyph shares one visual weight.
const paths = {
  code: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13.5 5-3 14" /></>,
  stethoscope: <><path d="M5 3H4v5a5 5 0 0 0 10 0V3h-1" /><path d="M9 13v1a5.5 5.5 0 0 0 11 0v-2" /><circle cx="20" cy="10" r="2" /></>,
  scale: <><path d="M12 3v18" /><path d="M8 21h8" /><path d="M5 7h14" /><path d="m5 7-3 7a3 3 0 0 0 6 0Z" /><path d="m19 7-3 7a3 3 0 0 0 6 0Z" /></>,
  chatHeart: <><path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3.5 21l1.3-4.6A8.5 8.5 0 1 1 21 12Z" /><path d="M12 15.6s-3.4-2-3.4-4.3a1.7 1.7 0 0 1 3.4-.6 1.7 1.7 0 0 1 3.4.6c0 2.3-3.4 4.3-3.4 4.3Z" /></>,
  pen: <><path d="m12 19 7-7 3 3-7 7Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18Z" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><path d="M12 18v4" /><path d="M8 22h8" /></>,
  compass: <><circle cx="12" cy="5" r="2" /><path d="m11 7-6 14" /><path d="m13 7 6 14" /><path d="M5 14.5a10 10 0 0 0 14 0" /></>,
  cap: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3.3 2 8.7 2 12 0v-5" /><path d="M22 10v5" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a2.1 2.1 0 0 0-3-3Z" /><path d="m12 15-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2Z" /><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0" /><path d="M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" /></>,
  chart: <><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /><circle cx="19" cy="8" r=".6" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />,
  sparkle: <><path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7Z" /><path d="M19 16c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  bulb: <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2Z" /><path d="M4 20a2 2 0 0 0 2 2h14v-4" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>,
  route: <><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  hand: <><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M11 11.5v-8a1.5 1.5 0 0 1 3 0V12" /><path d="M14 5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 8.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.5-2.7L3.3 16a1.6 1.6 0 0 1 2.5-2L8 16" /></>,
  smile: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  meh: <><circle cx="12" cy="12" r="9" /><path d="M8.5 15h7" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  frown: <><circle cx="12" cy="12" r="9" /><path d="M15.5 16a4.5 4.5 0 0 0-7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
  download: <><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>,
  printer: <><path d="M7 9V3h10v6" /><rect x="3" y="9" width="18" height="8" rx="2" /><path d="M7 14h10v7H7Z" /></>,
  badge: <><circle cx="12" cy="9" r="6" /><path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7" /><path d="m9.8 9 1.5 1.5 3-3" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" /><path d="M4 3v5h5" /><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" /><path d="M20 21v-5h-5" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />,
  puzzle: <><path d="M9 3h6v3a1.5 1.5 0 1 0 3 0V3h3v6h-3a1.5 1.5 0 1 0 0 3h3v9h-6v-3a1.5 1.5 0 1 0-3 0v3H3v-9h3a1.5 1.5 0 1 0 0-3H3V3Z" /></>,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.4-1.9-.4-1.2.4-2.1 1.6-2.1H18a3 3 0 0 0 3-3c0-6-4-11-9-11Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>,
  keyboard: <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" /></>,
  pencil: <><path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></>,
  trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M17 5h3v2a3 3 0 0 1-3 3" /><path d="M7 5H4v2a3 3 0 0 0 3 3" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /><circle cx="12" cy="16" r="1.2" /></>,
  gamepad: <><path d="M6 8h12a4 4 0 0 1 3.9 4.9l-1 4.3a2.5 2.5 0 0 1-4.3 1.1L14.5 16h-5l-2.1 2.3a2.5 2.5 0 0 1-4.3-1.1l-1-4.3A4 4 0 0 1 6 8Z" /><path d="M7.5 11v3M6 12.5h3" /><path d="M15.5 12h.01M17.5 13.5h.01" /></>,
  pulse: <><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 1-.2 1.9-.6 2.8" /><path d="M3 13h4l2-3 3 6 2-3h7" /></>,
  paw: <><circle cx="6.5" cy="10" r="1.8" /><circle cx="10" cy="6" r="1.8" /><circle cx="14" cy="6" r="1.8" /><circle cx="17.5" cy="10" r="1.8" /><path d="M12 11c-2.5 0-5 3.2-5 5.8 0 1.6 1.2 2.7 2.8 2.7 1 0 1.5-.5 2.2-.5s1.2.5 2.2.5c1.6 0 2.8-1.1 2.8-2.7C17 14.2 14.5 11 12 11Z" /></>,
  film: <><rect x="3" y="9" width="18" height="12" rx="2" /><path d="m3 9 16.5-4.5.8 3L3 12" /><path d="m8.5 7.5 2 3M14 6l2 3" /></>,
  flame: <path d="M12 21c3.9 0 7-2.7 7-6.6 0-3.1-2-5.2-3.5-6.9-.4 1.6-1.3 2.7-2.5 3.1.4-2.7-.4-5.8-3.5-7.6.2 2.6-1.1 4.4-2.6 6C5.6 10.4 5 12 5 14.4 5 18.3 8.1 21 12 21Z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
  building: <><path d="M4 21V5l8-3 8 3v16" /><path d="M2 21h20" /><path d="M9 21v-4h6v4" /><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  compassNav: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M18.5 14.2A6.5 6.5 0 0 1 21.5 20" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 20, strokeWidth = 1.9, className, style, title }: { name: IconName; size?: number; strokeWidth?: number; className?: string; style?: CSSProperties; title?: string }) {
  return <svg className={`icon ${className || ''}`} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>{title && <title>{title}</title>}{paths[name]}</svg>;
}

export const professionIcons: Record<string, IconName> = {
  'software-developer': 'code', doctor: 'stethoscope', lawyer: 'scale', psychologist: 'chatHeart', designer: 'pen',
  journalist: 'mic', architect: 'compass', teacher: 'cap', entrepreneur: 'rocket', 'data-analyst': 'chart',
  'cybersecurity-specialist': 'lock', 'game-developer': 'gamepad', nurse: 'pulse', veterinarian: 'paw', filmmaker: 'film'
};

export const professionColors: Record<string, string> = { coral: '#f16d59', teal: '#2a9d8f', gold: '#e1a33f', lilac: '#9b82c8', blue: '#3867db', green: '#3f9b5f', rose: '#d6577c' };
