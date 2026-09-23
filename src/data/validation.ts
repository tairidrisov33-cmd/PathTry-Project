// Results of testing PathTry with real students. Fill these in from your own survey.
// The "Tested with real students" section appears on the home and About pages only when
// testers > 0, and each number is shown only when it is filled in (0 or null = hidden).
// Never put estimates or placeholder numbers here.

export type Quote = {
  /** What the student said, in the language they said it. */
  text: string;
  /** Optional English or Russian translation shown to visitors of the other language. */
  translation?: string;
  /** Short attribution without a full name, e.g. "Grade 11 student, Almaty". */
  author: string;
};

export const validation = {
  /** Number of students who tried PathTry and answered the survey. */
  testers: 0,
  /** Average self-rated understanding of the profession before trying (1–10 scale). */
  understandingBefore: null as number | null,
  /** Average self-rated understanding after trying (1–10 scale). */
  understandingAfter: null as number | null,
  /** % of testers who said they learned something new about the profession. */
  learnedNewPercent: null as number | null,
  /** % of testers who realised a profession is NOT for them (a useful outcome). */
  notForMePercent: null as number | null,
  /** Average rating of how realistic the tasks felt (1–5 scale). */
  realismScore: null as number | null,
  /** Average rating of how easy the site was to use (1–5 scale). */
  usabilityScore: null as number | null,
  quotes: [] as Quote[]
};
