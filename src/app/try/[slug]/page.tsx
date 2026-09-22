import { notFound } from 'next/navigation';
import { getProfession } from '@/data/professions';
import TaskRunner from '@/components/TaskRunner';

export default async function TryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profession = getProfession(slug);
  if (!profession) notFound();
  return <main className="try-shell"><a className="back" href="/">← All professions</a><div className="try-title"><div className="kicker">Your 10-minute experiment</div><h1>{profession.title}</h1><p className="muted">{profession.reality}</p></div><TaskRunner profession={profession} /></main>;
}
