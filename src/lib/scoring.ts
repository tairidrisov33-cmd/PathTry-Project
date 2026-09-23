// The single source of truth for a result: every number, verdict and label on the result page,
// share card, PDF and PathFinder breakdown comes from scoreExperiment(), so they always agree.
// Pure functions only (no React, no browser APIs), so they run on the server and in unit tests.
import type { Skill } from '@/data/catalog/types';
import type { Verdict } from '@/lib/grader';

export type EnjoymentKey = 'yes' | 'so-so' | 'no' | 'skipped';
export type SavedAnswer = { taskId: string; choice: number | null; score: number; enjoyment: EnjoymentKey; text: string; verdict?: Verdict };
export type ScoringTask = { id: string; type: 'choice' | 'text'; skill: Skill };
export type ResultVerdict = 'good' | 'explore' | 'probably';
export type StepStatus = 'good' | 'partial' | 'miss' | 'empty';

export type ExperimentScore = {
  total: number;
  answered: number;
  complete: boolean;
  /** Points earned: a pro move is 1, a partly-there written answer is 0.5. */
  proMoves: number;
  /** proMoves / total, 0–1. Unanswered tasks count as 0. */
  performance: number;
  /** Average of rated tasks (0–100), or null when nothing was rated. */
  energy: number | null;
  ratedTasks: number;
  matchPercent: number;
  verdict: ResultVerdict;
  skills: { skill: Skill; value: number; answered: number }[];
  /** The two strongest skills, best first. */
  strengths: Skill[];
  steps: { taskId: string; status: StepStatus; enjoyment: EnjoymentKey | null; verdict?: Verdict }[];
};

export const SKILL_ORDER: Skill[] = ['solve', 'people', 'analyze', 'create', 'pressure'];
export const SKILL_LABELS: Record<Skill, readonly [string, string]> = { solve: ['Problem Solving', 'Решение задач'], people: ['Empathy & Communication', 'Эмпатия и общение'], analyze: ['Analytical Thinking', 'Аналитика'], create: ['Creativity & Vision', 'Креативность'], pressure: ['Stress Resilience', 'Стрессоустойчивость'] };

const ENERGY_VALUE: Record<string, number> = { yes: 100, 'so-so': 55, no: 15 };
const MOOD_SHIFT: Record<string, number> = { yes: 8, 'so-so': 0, no: -8 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const validScore = (score: unknown) => (typeof score === 'number' && Number.isFinite(score) ? clamp(score, 0, 1) : 0);

/** Average energy of the rated tasks only; skipped tasks never pull the number down. */
export function energyLevel(ratings: readonly string[]) {
  const rated = ratings.filter((rating) => rating in ENERGY_VALUE);
  return rated.length ? Math.round(rated.reduce((sum, rating) => sum + ENERGY_VALUE[rating], 0) / rated.length) : null;
}

export function scoreExperiment(answers: readonly SavedAnswer[], tasks: readonly ScoringTask[]): ExperimentScore {
  // Only the latest answer per known task counts, so stale or tampered storage cannot inflate the score.
  const byTask = new Map<string, SavedAnswer>();
  for (const answer of answers) if (tasks.some((task) => task.id === answer?.taskId)) byTask.set(answer.taskId, answer);
  const counted = [...byTask.values()];

  const total = tasks.length;
  const proMoves = counted.reduce((sum, answer) => sum + validScore(answer.score), 0);
  const performance = total ? proMoves / total : 0;
  const ratings = counted.map((answer) => answer.enjoyment);
  const energy = energyLevel(ratings);
  const ratedTasks = ratings.filter((rating) => rating in ENERGY_VALUE).length;

  const skills = SKILL_ORDER.map((skill) => {
    const related = tasks.filter((task) => task.skill === skill).map((task) => byTask.get(task.id)).filter((answer): answer is SavedAnswer => Boolean(answer));
    const ratio = related.length ? related.reduce((sum, answer) => sum + validScore(answer.score), 0) / related.length : 0.5;
    const mood = related.reduce((sum, answer) => sum + (MOOD_SHIFT[answer.enjoyment] ?? 0), 0) / Math.max(1, related.length);
    return { skill, value: Math.round(clamp(32 + ratio * 58 + mood, 15, 98)), answered: related.length };
  });
  // Skills the student actually exercised rank above ones with no evidence.
  const strengths = [...skills].sort((a, b) => Number(b.answered > 0) - Number(a.answered > 0) || b.value - a.value).slice(0, 2).map((item) => item.skill);

  const matchPercent = Math.round(clamp(energy === null ? 38 + performance * 56 : 30 + performance * 44 + energy * 0.24, 25, 98));
  const verdict: ResultVerdict = performance >= 0.75 && (energy === null || energy >= 60) ? 'good' : performance >= 0.5 || (energy !== null && energy >= 55) ? 'explore' : 'probably';

  const steps = tasks.map((task) => {
    const answer = byTask.get(task.id);
    if (!answer) return { taskId: task.id, status: 'empty' as const, enjoyment: null };
    const score = validScore(answer.score);
    return { taskId: task.id, status: score >= 1 ? 'good' as const : score > 0 ? 'partial' as const : 'miss' as const, enjoyment: answer.enjoyment in ENERGY_VALUE ? answer.enjoyment : null, verdict: answer.verdict };
  });

  return { total, answered: counted.length, complete: counted.length >= total, proMoves, performance, energy, ratedTasks, matchPercent, verdict, skills, strengths, steps };
}

const formatPoints = (value: number, ru: boolean) => (Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.', ru ? ',' : '.'));

/** Rule-based PathFinder breakdown: used when the AI is unavailable, slow, or not configured. */
export function describeResult(score: ExperimentScore, profession: string, language: 'en' | 'ru') {
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  const [first, second] = score.strengths.map((skill) => SKILL_LABELS[skill][lang]);
  const points = formatPoints(score.proMoves, ru);
  const sentences: string[] = [];

  sentences.push(ru
    ? `Ты набрал(а) ${points} из ${score.total} профессиональных решений в профессии «${profession}» — это ${score.matchPercent}% совпадения с рабочим стилем.`
    : `You made ${points} of ${score.total} pro moves in the ${profession} experiment, which gives a ${score.matchPercent}% work-style match.`);
  if (first) sentences.push(ru ? `Сильнее всего проявились ${first.toLowerCase()}${second ? ` и ${second.toLowerCase()}` : ''}.` : `Your strongest signals were ${first.toLowerCase()}${second ? ` and ${second.toLowerCase()}` : ''}.`);
  if (score.energy === null) sentences.push(ru ? 'Ты не отмечал(а), как тебе задания, поэтому интерес мы не учитывали — в следующий раз оцени хотя бы пару задач.' : 'You did not rate how the tasks felt, so interest is not part of this result — rate a few next time.');
  else sentences.push(score.energy >= 60
    ? (ru ? `Задания тебя заряжали (энергия ${score.energy}%, оценено задач: ${score.ratedTasks}) — это важный сигнал.` : `The work gave you energy (${score.energy}% across ${score.ratedTasks} rated task${score.ratedTasks === 1 ? '' : 's'}) — an important signal.`)
    : (ru ? `Энергия получилась ${score.energy}% (оценено задач: ${score.ratedTasks}) — посмотри, какие задания утомили, это тоже подсказка.` : `Energy came out at ${score.energy}% across ${score.ratedTasks} rated task${score.ratedTasks === 1 ? '' : 's'} — notice which tasks drained you; that is a clue too.`));
  if (!score.complete) sentences.push(ru ? `Пройдено ${score.answered} из ${score.total} заданий — закончи эксперимент для точного результата.` : `You completed ${score.answered} of ${score.total} tasks — finish the experiment for a full result.`);
  else sentences.push({
    good: ru ? 'Следующий шаг — попробовать эту работу вживую: кружок, волонтёрство или разговор со специалистом.' : 'Next step: try this work for real — a club, volunteering, or a chat with a professional.',
    explore: ru ? 'Сравни с похожей профессией ниже, чтобы понять, что откликается сильнее.' : 'Compare with the related profession below to see what resonates more.',
    probably: ru ? 'Это не приговор — попробуй другую профессию и сравни, где энергии больше.' : 'This is not a final answer — try another profession and compare where your energy is higher.'
  }[score.verdict]);
  return sentences.join(' ');
}
