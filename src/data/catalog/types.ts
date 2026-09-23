// Bilingual source format for the profession catalog. Every user-facing string is an [English, Russian] pair.
export type L = readonly [en: string, ru: string];

export type Skill = 'solve' | 'people' | 'analyze' | 'create' | 'pressure';
export type CategoryKey = 'tech' | 'health' | 'creative' | 'society';
export type ColorKey = 'coral' | 'teal' | 'gold' | 'lilac' | 'blue' | 'green' | 'rose';

type TaskBase = { id: string; skill: Skill; prompt: L; context?: L; hint: L };
// The first option is the correct one; the display order is shuffled deterministically per task.
export type ChoiceTaskDef = TaskBase & { type: 'choice'; options: readonly L[]; explanation: L };
// Open answers are graded against `criteria`; `keywords` are lowercase stems the offline grader looks for.
export type TextTaskDef = TaskBase & { type: 'text'; placeholder: L; criteria: L; sample: L; keywords: readonly [en: readonly string[], ru: readonly string[]] };
export type TaskDef = ChoiceTaskDef | TextTaskDef;

export type ProfessionDef = {
  slug: string;
  category: CategoryKey;
  color: ColorKey;
  title: L;
  description: L;
  reality: L;
  subjects: readonly L[];
  exams: readonly L[];
  majors: readonly L[];
  nextSteps: readonly L[];
  tasks: readonly TaskDef[];
};

export const choice = (id: string, skill: Skill, prompt: L, options: readonly L[], explanation: L, hint: L, context?: L): ChoiceTaskDef =>
  ({ id, type: 'choice', skill, prompt, options, explanation, hint, context });

export const open = (id: string, skill: Skill, prompt: L, placeholder: L, hint: L, criteria: L, sample: L, keywords: readonly [readonly string[], readonly string[]], context?: L): TextTaskDef =>
  ({ id, type: 'text', skill, prompt, placeholder, hint, criteria, sample, keywords, context });
