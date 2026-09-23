// The task currently on screen, shared with the PathFinder chat so it can help with that exact task.
export type TaskContext = { profession: string; prompt: string; type: 'choice' | 'text'; options?: string[]; submitted: boolean; hint: string };

let current: TaskContext | null = null;
export const setTaskContext = (context: TaskContext | null) => { current = context; };
export const getTaskContext = () => current;

// Opens the PathFinder chat with a prepared question (used by the "Ask PathFinder" button on tasks).
export const ASK_EVENT = 'pathfinder:ask';
export const askPathfinder = (question: string) => window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: question }));
