import type { Metadata } from 'next';
import { serverLanguage } from '@/lib/serverLanguage';
import { OG_IMAGE, pageAlternates } from '@/lib/seo';
import SchoolsContent from '@/app/schools/SchoolsContent';

export async function generateMetadata(): Promise<Metadata> {
  const ru = (await serverLanguage()) === 'ru';
  const title = ru ? 'Урок профориентации за 45 минут — PathTry для школ' : 'A 45-minute career lesson — PathTry for schools';
  const description = ru ? 'Бесплатный пилот для школ: ученики пробуют две профессии через реальные задачи. План урока, ссылка и QR-код для класса.' : 'A free pilot for schools: students try two professions through real tasks. Lesson plan, class link and QR code.';
  return { title, description, alternates: pageAlternates('/schools'), openGraph: { type: 'website', siteName: 'PathTry', title, description, url: '/schools', images: [OG_IMAGE] }, twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] } };
}

export default function SchoolsPage() {
  return <SchoolsContent />;
}
