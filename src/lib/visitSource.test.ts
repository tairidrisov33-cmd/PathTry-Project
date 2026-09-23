import { describe, expect, it } from 'vitest';
import { classSlug, isVisitSource } from '@/lib/visitSource';

describe('class links', () => {
  it('turns a Russian or Kazakh class name into a safe ?ref= slug', () => {
    expect(classSlug('Школа 17, 10А')).toBe('shkola-17-10a');
    expect(classSlug('Қазақ гимназиясы 5 «Ә»')).toBe('qazaq-gimnaziyasy-5-a');
    expect(classSlug('  School #3 — 11B  ')).toBe('school-3-11b');
  });

  it('never produces a slug the server would reject', () => {
    for (const name of ['Школа 17, 10А', 'a'.repeat(80), 'Лицей №1 им. Абая, 9 «Б» класс']) expect(isVisitSource(classSlug(name))).toBe(true);
  });

  it('rejects anything that is not a short slug', () => {
    expect(isVisitSource('school-17')).toBe(true);
    expect(isVisitSource('<script>')).toBe(false);
    expect(isVisitSource('a'.repeat(41))).toBe(false);
    expect(isVisitSource(42)).toBe(false);
  });
});
