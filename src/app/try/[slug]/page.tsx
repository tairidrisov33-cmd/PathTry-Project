import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfession } from '@/data/professions';
import { serverLanguage } from '@/lib/serverLanguage';
import { pageAlternates } from '@/lib/seo';
import TaskRunner from '@/components/TaskRunner';
import TryIntro from '@/components/TryIntro';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const definition = getProfession((await params).slug);
  if (!definition) return {};
  const ru = (await serverLanguage()) === 'ru';
  const title = definition.title[ru ? 1 : 0].replace(/­/g, '');
  const pageTitle = ru ? `${title}: попробуй профессию за 10 минут — PathTry` : `Try being ${/^[AEIOU]/.test(title) ? 'an' : 'a'} ${title} in 10 minutes — PathTry`;
  const description = definition.description[ru ? 1 : 0];
  const path = `/try/${definition.slug}`;
  return { title: pageTitle, description, alternates: pageAlternates(path), openGraph: { type: 'website', siteName: 'PathTry', title: pageTitle, description, url: path, locale: ru ? 'ru_RU' : 'en_US' }, twitter: { card: 'summary_large_image', title: pageTitle, description } };
}

export default async function TryPage({ params }: Params) {
  const definition = getProfession((await params).slug);
  if (!definition) notFound();
  return <main className="try-shell"><TryIntro definition={definition} /><TaskRunner definition={definition} /></main>;
}
