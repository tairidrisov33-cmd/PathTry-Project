import type { Metadata } from 'next';
import { professions, TOTAL_TASKS } from '@/data/professions';
import { serverLanguage } from '@/lib/serverLanguage';
import { OG_IMAGE, pageAlternates } from '@/lib/seo';
import AboutContent from '@/app/about/AboutContent';

export async function generateMetadata(): Promise<Metadata> {
  const language = await serverLanguage();
  const ru = language === 'ru';
  const title = ru ? 'О проекте — PathTry' : 'About — PathTry';
  const description = ru ? 'Проблема, решение, PathFinder AI, дорожная карта, бизнес-модель и команда PathTry.' : 'The problem, the solution, PathFinder AI, roadmap, business model and team behind PathTry.';
  return { title, description, alternates: pageAlternates('/about', language), openGraph: { type: 'website', siteName: 'PathTry', title, description, url: '/about', images: [OG_IMAGE] }, twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] } };
}

export default function AboutPage() {
  return <AboutContent professionCount={professions.length} taskCount={TOTAL_TASKS} />;
}
