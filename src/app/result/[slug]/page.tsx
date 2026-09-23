import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfession, relatedProfession } from '@/data/professions';
import { serverLanguage } from '@/lib/serverLanguage';
import ResultClient from '@/components/ResultClient';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const definition = getProfession((await params).slug);
  if (!definition) return {};
  const ru = (await serverLanguage()) === 'ru';
  const title = definition.title[ru ? 1 : 0].replace(/­/g, '');
  return { title: ru ? `Мой результат: ${title} — PathTry` : `My result: ${title} — PathTry` };
}

export default async function ResultPage({ params }: Params) {
  const { slug } = await params;
  const definition = getProfession(slug);
  if (!definition) notFound();
  return <main className="result-shell"><ResultClient definition={definition} alternative={relatedProfession(slug)} /></main>;
}
