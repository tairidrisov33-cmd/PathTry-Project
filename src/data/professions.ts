import type { Language } from '@/data/translations';
import type { ProfessionDef } from '@/data/catalog/types';
import { tech } from '@/data/catalog/tech';
import { health } from '@/data/catalog/health';
import { creative } from '@/data/catalog/creative';
import { society } from '@/data/catalog/society';

export * from '@/data/catalog/helpers';

export const professions: ProfessionDef[] = [...tech, ...health, ...creative, ...society];

// Editorial catalogue badges. "High demand" marks fields widely reported as fast-growing.
export type Badge = 'popular' | 'demand' | 'fast' | 'new';
export const badges: Record<string, Badge[]> = {
  'software-developer': ['popular', 'demand'], 'data-analyst': ['demand'], 'cybersecurity-specialist': ['demand', 'new'], 'game-developer': ['popular', 'new'],
  doctor: ['popular'], psychologist: ['popular'], nurse: ['demand', 'new'], veterinarian: ['new'],
  designer: ['fast'], journalist: ['fast'], filmmaker: ['new'], teacher: ['fast'], entrepreneur: ['popular']
};

export const FEATURED_SLUG = 'software-developer';
export const TOTAL_TASKS = professions.reduce((total, profession) => total + profession.tasks.length, 0);
export function getProfession(slug: string) { return professions.find((profession) => profession.slug === slug); }

// Another profession from the same field, suggested on the result page.
export function relatedProfession(slug: string) {
  const current = getProfession(slug);
  const index = professions.findIndex((profession) => profession.slug === slug);
  return professions.find((profession) => profession.category === current?.category && profession.slug !== slug) ?? professions[(index + 1) % professions.length];
}

export function professionTitle(slug: string, language: Language) {
  const profession = getProfession(slug);
  return profession ? profession.title[language === 'ru' ? 1 : 0] : slug;
}

// A light index (no task texts) so the result page can score every experiment a student has tried.
export type ProfessionSummary = Pick<ProfessionDef, 'slug' | 'title' | 'color'> & { tasks: { id: string; type: 'choice' | 'text'; skill: ProfessionDef['tasks'][number]['skill'] }[] };
export function professionIndex(): ProfessionSummary[] {
  return professions.map(({ slug, title, color, tasks }) => ({ slug, title, color, tasks: tasks.map(({ id, type, skill }) => ({ id, type, skill })) }));
}
