import { describe, expect, it } from 'vitest';
import { getProfession, localize } from '@/data/professions';
import { gradeOffline } from '@/lib/grader';

const writtenTask = (slug: string, language: 'en' | 'ru') => {
  const task = localize(getProfession(slug)!, language).tasks.find((item) => item.type === 'text')!;
  return { prompt: task.prompt, criteria: task.criteria ?? '', hint: task.hint, keywords: task.keywords ?? [] };
};

describe('gradeOffline', () => {
  it('rejects keyboard mashing and one-word answers', () => {
    const task = writtenTask('doctor', 'en');
    expect(gradeOffline('asdfgh qwerty zxcv', task, 'en').verdict).toBe('empty');
    expect(gradeOffline('ok', task, 'en').verdict).toBe('empty');
  });

  it('marks a clearly unrelated answer as off the task', () => {
    expect(gradeOffline('I like pizza and football on weekends', writtenTask('doctor', 'en'), 'en').verdict).toBe('offtopic');
  });

  it('accepts a short, relevant answer as strong (a taster, not an exam)', () => {
    const task = writtenTask('doctor', 'en');
    const answer = `I would start with ${task.keywords[0]} and explain it to them calmly.`;
    expect(gradeOffline(answer, task, 'en')).toMatchObject({ verdict: 'strong', score: 1 });
  });

  it('works for Russian answers', () => {
    const task = writtenTask('teacher', 'ru');
    const answer = `Я бы начал с того, что ${task.keywords[0]} — это главное, и объяснил бы спокойно.`;
    expect(gradeOffline(answer, task, 'ru').verdict).toBe('strong');
  });
});
