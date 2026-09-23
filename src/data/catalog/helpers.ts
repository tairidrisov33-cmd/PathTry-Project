// Catalog helpers with no catalog data, so client pages that show one profession stay small.
import type { Language } from '@/data/translations';
import type { CategoryKey, ColorKey, L, ProfessionDef, Skill } from '@/data/catalog/types';

export type { CategoryKey, ColorKey, ProfessionDef, Skill } from '@/data/catalog/types';

export type Task = {
  id: string;
  type: 'choice' | 'text';
  skill: Skill;
  prompt: string;
  context?: string;
  hint: string;
  options?: string[];
  answer?: number;
  explanation?: string;
  placeholder?: string;
  criteria?: string;
  sample?: string;
  keywords?: string[];
};

export type Profession = {
  slug: string;
  category: CategoryKey;
  color: ColorKey;
  title: string;
  description: string;
  reality: string;
  subjects: string[];
  exams: string[];
  majors: string[];
  nextSteps: string[];
  tasks: Task[];
};

export const categories: { key: CategoryKey; label: L }[] = [
  { key: 'tech', label: ['Tech & Data', 'Технологии и данные'] },
  { key: 'health', label: ['Healthcare & Science', 'Здоровье и наука'] },
  { key: 'creative', label: ['Creative & Media', 'Творчество и медиа'] },
  { key: 'society', label: ['Humanities & Law', 'Гуманитарные науки и право'] }
];

// Bumped when the task set changes so progress saved for an older version is ignored.
export const storageKey = (slug: string) => `pathtry-v2-${slug}`;


const pick = (value: L, language: Language) => value[language === 'ru' ? 1 : 0];

// Deterministic per-task shuffle, so the correct option never sits in a predictable slot
// and every page (task, result, recap) sees the same order.
function seededOrder(seed: string, length: number) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619);
  const random = () => { hash = Math.imul(hash ^ (hash >>> 15), 2246822507); hash = Math.imul(hash ^ (hash >>> 13), 3266489909); return ((hash ^= hash >>> 16) >>> 0) / 4294967296; };
  const order = Array.from({ length }, (_, index) => index);
  for (let i = length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return order;
}

export function localize(profession: ProfessionDef, language: Language): Profession {
  const lang = language === 'ru' ? 1 : 0;
  return {
    slug: profession.slug,
    category: profession.category,
    color: profession.color,
    title: profession.title[lang],
    description: profession.description[lang],
    reality: profession.reality[lang],
    subjects: profession.subjects.map((item) => item[lang]),
    exams: profession.exams.map((item) => item[lang]),
    majors: profession.majors.map((item) => item[lang]),
    nextSteps: profession.nextSteps.map((item) => item[lang]),
    tasks: profession.tasks.map((task) => {
      const base = { id: task.id, type: task.type, skill: task.skill, prompt: pick(task.prompt, language), context: task.context && pick(task.context, language), hint: pick(task.hint, language) };
      if (task.type === 'text') return { ...base, placeholder: pick(task.placeholder, language), criteria: pick(task.criteria, language), sample: pick(task.sample, language), keywords: [...task.keywords[lang]] };
      const order = seededOrder(`${profession.slug}:${task.id}`, task.options.length);
      return { ...base, options: order.map((index) => pick(task.options[index], language)), answer: order.indexOf(0), explanation: pick(task.explanation, language) };
    })
  };
}

export function categoryLabel(key: CategoryKey, language: Language) {
  const category = categories.find((item) => item.key === key);
  return category ? pick(category.label, language) : key;
}

