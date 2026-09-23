import { notFound } from 'next/navigation';
import { getProfession, professions } from '@/data/professions';
import TaskRunner from '@/components/TaskRunner';
import TryIntro from '@/components/TryIntro';

export function generateStaticParams() { return professions.map(({ slug }) => ({ slug })); }

export default async function TryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const definition = getProfession(slug);
  if (!definition) notFound();
  return <main className="try-shell"><TryIntro definition={definition} /><TaskRunner definition={definition} /></main>;
}
