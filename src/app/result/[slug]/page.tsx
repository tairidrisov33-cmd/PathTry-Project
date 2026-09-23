import { notFound } from 'next/navigation';
import { getProfession, professions, relatedProfession } from '@/data/professions';
import ResultClient from '@/components/ResultClient';

export function generateStaticParams() { return professions.map(({ slug }) => ({ slug })); }
export default async function ResultPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const definition = getProfession(slug); if (!definition) notFound(); return <main className="result-shell"><ResultClient definition={definition} alternative={relatedProfession(slug)} /></main>; }
