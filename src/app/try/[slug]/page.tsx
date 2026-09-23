import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfession } from '@/data/professions';
import { serverLanguage } from '@/lib/serverLanguage';
import TaskRunner from '@/components/TaskRunner';
import TryIntro from '@/components/TryIntro';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const definition = getProfession((await params).slug);
  if (!definition) return {};
  const ru = (await serverLanguage()) === 'ru';
  const title = definition.title[ru ? 1 : 0].replace(/­/g, '');
  return { title: ru ? `${title}: попробуй профессию за 10 минут — PathTry` : `Try being a ${title} in 10 minutes — PathTry`, description: definition.description[ru ? 1 : 0] };
}

export default async function TryPage({ params }: Params) {
  const definition = getProfession((await params).slug);
  if (!definition) notFound();
  return <main className="try-shell"><TryIntro definition={definition} /><TaskRunner definition={definition} /></main>;
}
