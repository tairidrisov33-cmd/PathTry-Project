// Results of the pilot survey with real participants (Google Forms, September 2026).
// The "Tested with real students" section appears on the home and About pages only when
// testers > 0, and each number is shown only when it is filled in (null = hidden).
// Only real answers go here: no estimates, placeholders or invented quotes.

export type Quote = {
  /** What the participant wrote, verbatim, in the language they wrote it. */
  text: string;
  /** Translation shown to visitors of the other language. */
  translation?: string;
  /** Short attribution without a name, e.g. "School student, grades 8–9". */
  author: readonly [string, string];
};

export const validation = {
  /** Participants who tried PathTry and answered the survey. */
  testers: 8,
  /** How many of them are school students (the rest: other ages or university). */
  schoolStudents: 7,
  /** Scale the survey used for self-rated understanding. */
  understandingScale: 5,
  /** Average self-rated understanding of the profession before trying (1–understandingScale). */
  understandingBefore: 4.0 as number | null,
  /** Average self-rated understanding after trying. */
  understandingAfter: 4.4 as number | null,
  /** % who said they learned something new about the real work. */
  learnedNewPercent: 100 as number | null,
  /** % who found the profession more interesting afterwards. */
  moreInterestedPercent: 75 as number | null,
  /** % who realised the profession is probably not for them (a useful outcome). */
  notForMePercent: 12.5 as number | null,
  /** % who would recommend PathTry to a friend choosing a career. */
  recommendPercent: 75 as number | null,
  /** Average rating of how realistic the tasks felt (1–5). */
  realismScore: 4.1 as number | null,
  /** Average rating of how easy the site was to use (1–5). */
  usabilityScore: 4.3 as number | null,
  /** Average usefulness of PathFinder among participants who used it (1–5). */
  pathfinderScore: 4.3 as number | null,
  /** Verbatim quotes from participants who agreed to be quoted (none published). */
  quotes: [] as Quote[],
  /** The team's summary of the open answers (not quotes). */
  liked: [['Clear, convenient interface and design', 'Понятный и удобный интерфейс, оформление'], ['Good questions in the tasks', 'Хорошие вопросы в заданиях']] as [string, string][],
  improving: [['PathFinder occasionally failed to answer — made more reliable, with a fallback', 'PathFinder иногда не отвечал — сделали стабильнее, с запасным режимом'], ['More realistic situations in tasks — next content update', 'Больше реалистичных ситуаций в заданиях — в следующем обновлении']] as [string, string][]
};
