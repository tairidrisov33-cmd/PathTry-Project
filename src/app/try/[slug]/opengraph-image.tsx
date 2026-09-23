import { getProfession } from '@/data/professions';
import { renderOgImage } from '@/lib/ogImage';

export const alt = 'Try a profession in 10 minutes on PathTry';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Each profession gets its own preview, so a shared link says exactly what the friend will try.
export default async function ProfessionImage({ params }: { params: Promise<{ slug: string }> }) {
  const profession = getProfession((await params).slug);
  const title = profession?.title[0].replace(/\u00ad/g, '');
  return renderOgImage(title ? `Try being ${/^[AEIOU]/.test(title) ? 'an' : 'a'} ${title} in 10 minutes` : 'Try a profession in 10 minutes before you choose it', '10 real tasks · AI mentor PathFinder · free, no sign-up');
}
