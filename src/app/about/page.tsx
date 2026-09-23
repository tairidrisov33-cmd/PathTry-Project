import type { Metadata } from 'next';
import { professions, TOTAL_TASKS } from '@/data/professions';
import { serverLanguage } from '@/lib/serverLanguage';
import AboutContent from '@/app/about/AboutContent';

export async function generateMetadata(): Promise<Metadata> {
  return (await serverLanguage()) === 'ru' ? { title: 'О проекте — PathTry' } : { title: 'About — PathTry' };
}

export default function AboutPage() {
  return <AboutContent professionCount={professions.length} taskCount={TOTAL_TASKS} />;
}
