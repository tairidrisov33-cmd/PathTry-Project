import { renderOgImage } from '@/lib/ogImage';

export const alt = 'PathTry — Try a profession in 10 minutes before you choose it';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderOgImage('Try a profession in 10 minutes before you choose it', '15 professions · 150 real tasks · AI mentor PathFinder');
}
