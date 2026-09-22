import { notFound } from 'next/navigation';
import { getProfession, professions } from '@/data/professions';
import ResultClient from '@/components/ResultClient';

export function generateStaticParams() { return professions.map(({ slug }) => ({ slug })); }
export default async function ResultPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const profession = getProfession(slug); if (!profession) notFound(); return <main className="result-shell"><ResultClient profession={profession} /></main>; }
