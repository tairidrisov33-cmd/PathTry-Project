import { describe, expect, it } from 'vitest';
import { getProfession, localize } from '@/data/professions';
import { describeResult, energyLevel, scoreExperiment, type EnjoymentKey, type SavedAnswer } from '@/lib/scoring';

const doctor = localize(getProfession('doctor')!, 'en');
const tasks = doctor.tasks;
const answer = (taskId: string, score: number, enjoyment: EnjoymentKey = 'skipped', verdict?: SavedAnswer['verdict']): SavedAnswer => ({ taskId, score, enjoyment, choice: null, text: '', verdict });

describe('scoreExperiment', () => {
  it('all correct and energising: strong fit with the maximum match', () => {
    const result = scoreExperiment(tasks.map((task) => answer(task.id, 1, 'yes')), tasks);
    expect(result).toMatchObject({ total: 10, answered: 10, complete: true, proMoves: 10, performance: 1, energy: 100, ratedTasks: 10, matchPercent: 98, verdict: 'good' });
    expect(result.steps.every((step) => step.status === 'good')).toBe(true);
  });

  it('none correct and nothing rated: energy is not rated, never zero', () => {
    const result = scoreExperiment(tasks.map((task) => answer(task.id, 0)), tasks);
    expect(result).toMatchObject({ proMoves: 0, performance: 0, energy: null, ratedTasks: 0, matchPercent: 38, verdict: 'probably' });
    expect(result.steps.every((step) => step.status === 'miss' && step.enjoyment === null)).toBe(true);
  });

  it('two pro moves out of an unfinished run are counted, not shown as zero', () => {
    const result = scoreExperiment([answer(tasks[0].id, 1), answer(tasks[1].id, 1)], tasks);
    expect(result).toMatchObject({ answered: 2, complete: false, proMoves: 2, matchPercent: 49, verdict: 'probably' });
    expect(result.steps.slice(0, 2).map((step) => step.status)).toEqual(['good', 'good']);
    expect(result.steps.slice(2).every((step) => step.status === 'empty')).toBe(true);
  });

  it('mixed choices with partly-there written answers count half points', () => {
    let written = 0;
    const answers = tasks.map((task) => task.type === 'text'
      ? answer(task.id, 0.5, (['yes', 'no', 'no'] as const)[written++ % 3], 'partial')
      : answer(task.id, 1));
    const textTasks = tasks.filter((task) => task.type === 'text').length;
    const result = scoreExperiment(answers, tasks);
    expect(result.proMoves).toBe(10 - textTasks * 0.5);
    expect(result.ratedTasks).toBe(textTasks);
    expect(result.steps.filter((step) => step.status === 'partial')).toHaveLength(textTasks);
    // 8.5 of 10 but only moderate energy: worth exploring, not yet a strong fit.
    expect(result.verdict).toBe('explore');
    expect(result.matchPercent).toBe(Math.round(30 + result.performance * 44 + result.energy! * 0.24));
  });

  it('ignores unknown tasks, keeps the latest duplicate and clamps tampered scores', () => {
    const result = scoreExperiment([answer('not-a-task', 1), answer(tasks[0].id, 0), answer(tasks[0].id, 7, 'yes')], tasks);
    expect(result).toMatchObject({ answered: 1, proMoves: 1, energy: 100, ratedTasks: 1 });
  });

  it('ranks skills the student actually practised as strengths', () => {
    const result = scoreExperiment([answer(tasks[0].id, 1, 'yes')], tasks);
    expect(result.strengths[0]).toBe(tasks[0].skill);
  });
});

describe('energyLevel', () => {
  it('averages only rated tasks', () => {
    expect(energyLevel(['yes', 'skipped', 'no'])).toBe(58);
    expect(energyLevel(['skipped', 'skipped'])).toBeNull();
  });
});

describe('describeResult', () => {
  it('uses the same numbers as the score and stays within 3–4 sentences', () => {
    const result = scoreExperiment([answer(tasks[0].id, 1, 'yes'), answer(tasks[1].id, 1)], tasks);
    const text = describeResult(result, doctor.title, 'en');
    expect(text).toContain('2 of 10 pro moves');
    expect(text).toContain(`${result.matchPercent}%`);
    expect(text).toContain('2 of 10 tasks');
    expect(text.split(/(?<=[.!?])\s+/).length).toBeGreaterThanOrEqual(3);
    expect(text.split(/(?<=[.!?])\s+/).length).toBeLessThanOrEqual(4);
    expect(describeResult(result, 'Врач', 'ru')).toContain('2 из 10');
  });
});
