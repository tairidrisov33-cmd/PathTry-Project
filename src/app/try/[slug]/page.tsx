import { notFound } from 'next/navigation';
import { getProfession } from '@/data/professions';
import TaskRunner from '@/components/TaskRunner';
import TryIntro from '@/components/TryIntro';

export default async function TryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profession = getProfession(slug);
  if (!profession) notFound();
  return <main className="try-shell"><TryIntro profession={profession} /><TaskRunner profession={profession} /></main>;
}
