export type Task = {
  id: string;
  type: 'choice' | 'text';
  prompt: string;
  context?: string;
  options?: string[];
  answer?: number;
  explanation?: string;
  placeholder?: string;
};

export type Profession = {
  slug: string;
  title: string;
  eyebrow: string;
  icon: string;
  color: string;
  description: string;
  reality: string;
  subjects: string[];
  exams: string[];
  majors: string[];
  nextSteps: string[];
  tasks: Task[];
};

export const professions: Profession[] = [
  { slug: 'software-developer', title: 'Software Developer', eyebrow: 'Build what people use', icon: '</>', color: 'coral', description: 'Turn messy problems into tools, products, and experiences that work.', reality: 'A lot of the day is reading, asking precise questions, testing ideas, and improving small details.', subjects: ['Mathematics', 'Computer science', 'Physics'], exams: ['SAT / ACT Math', 'A-Levels Mathematics', 'IB Math AA', 'IELTS / TOEFL'], majors: ['Computer Science', 'Software Engineering', 'Information Systems'], nextSteps: ['Build a tiny website or automation for a real person.', 'Try a beginner coding course and finish one project.', 'Interview a developer about a normal Tuesday.'], tasks: [
    { id: 'debug', type: 'choice', prompt: 'A signup button works on your laptop but not for some users. What is the best first move?', options: ['Rewrite the whole page', 'Ask for steps and check the browser error', 'Tell users to try again tomorrow', 'Add more colors to the button'], answer: 1, explanation: 'Great debugging starts with a reproducible example and evidence, not a guess.' },
    { id: 'priority', type: 'choice', prompt: 'Your team can fix a typo, speed up checkout, or add a fun animation. Which should you prioritize?', options: ['The animation', 'The typo', 'The checkout speed', 'Whichever is easiest'], answer: 2, explanation: 'Developers balance user impact, risk, and effort. A slower checkout can affect every customer.' },
    { id: 'explain', type: 'text', prompt: 'Explain a simple everyday process as if you were giving instructions to a computer.', context: 'For example: making toast, borrowing a library book, or finding a bus.', placeholder: 'First, the computer should...' }
  ] },
  { slug: 'doctor', title: 'Doctor', eyebrow: 'Care with curiosity', icon: '+', color: 'teal', description: 'Combine science, judgement, and human connection when people need help.', reality: 'Medicine means careful listening, uncertain decisions, teamwork, and staying calm when the stakes are high.', subjects: ['Biology', 'Chemistry', 'Mathematics'], exams: ['MCAT / UCAT', 'A-Levels Biology & Chemistry', 'IB Biology & Chemistry', 'IELTS / TOEFL'], majors: ['Medicine', 'Biomedical Sciences', 'Public Health'], nextSteps: ['Volunteer in a care or community setting.', 'Learn basic biology beyond memorising labels.', 'Ask a clinician what surprised them about the job.'], tasks: [
    { id: 'triage', type: 'choice', prompt: 'A patient says they feel tired. What is the most useful next question?', options: ['“You need more sleep.”', '“When did it start, and what else have you noticed?”', '“Do you want a scan?”', '“Is anyone else tired?”'], answer: 1, explanation: 'Good care begins by listening for timing, context, and associated symptoms before jumping to conclusions.' },
    { id: 'safety', type: 'choice', prompt: 'Two medicines look similar on a busy chart. What should you do?', options: ['Choose the one you remember', 'Ask a colleague to guess', 'Pause and verify the name and dose', 'Give both, just in case'], answer: 2, explanation: 'Safety habits matter. Verification is a professional skill, not a sign of uncertainty.' },
    { id: 'empathy', type: 'text', prompt: 'Write one sentence you could say to a nervous patient before asking a difficult question.', placeholder: 'I can see this is difficult...' }
  ] },
  { slug: 'lawyer', title: 'Lawyer', eyebrow: 'Make the case clear', icon: '§', color: 'gold', description: 'Find the relevant facts, build a reasoned argument, and help people move forward.', reality: 'Law is reading-heavy: you sort evidence, spot ambiguity, write clearly, and negotiate under pressure.', subjects: ['English / Literature', 'History', 'Economics'], exams: ['LSAT / LNAT', 'A-Levels English & History', 'IB English & History', 'IELTS / TOEFL'], majors: ['Law', 'Politics', 'International Relations'], nextSteps: ['Read a short court judgment and summarise the decision.', 'Join debate or model United Nations.', 'Ask a lawyer how much of their week is writing.'], tasks: [
    { id: 'evidence', type: 'choice', prompt: 'Which fact is strongest evidence that a contract was accepted?', options: ['A friend heard about it', 'A signed copy was returned', 'Someone liked a post about it', 'The price seemed fair'], answer: 1, explanation: 'Strong arguments use facts that directly connect to the legal question and can be supported.' },
    { id: 'clarity', type: 'choice', prompt: 'A client says, “I want justice.” What should you do first?', options: ['Promise a win', 'Ask what outcome they need and what happened', 'Quote a complex law', 'Tell them the case is easy'], answer: 1, explanation: 'Lawyers translate a broad concern into facts, goals, risks, and possible routes.' },
    { id: 'argument', type: 'text', prompt: 'Give one clear reason why a school should offer a quiet study room.', placeholder: 'The school should offer it because...' }
  ] },
  { slug: 'psychologist', title: 'Psychologist', eyebrow: 'Understand people', icon: '◌', color: 'lilac', description: 'Use evidence and empathy to help people understand patterns and make change possible.', reality: 'The work asks for deep listening, careful notes, ethical boundaries, and comfort with slow progress.', subjects: ['Biology', 'Psychology', 'Statistics'], exams: ['GRE (some programs)', 'A-Levels Psychology', 'IB Psychology', 'IELTS / TOEFL'], majors: ['Psychology', 'Counselling', 'Neuroscience'], nextSteps: ['Take an introductory psychology course.', 'Practise listening without immediately fixing.', 'Read how psychologists use research, not just personality quizzes.'], tasks: [
    { id: 'listen', type: 'choice', prompt: 'A person says, “I keep putting off everything.” What is the best response?', options: ['“Stop procrastinating.”', '“That sounds frustrating. When does it happen most?”', '“Everyone does that.”', '“Here is a five-step cure.”'], answer: 1, explanation: 'Curiosity and a non-judgemental question can reveal patterns before offering an intervention.' },
    { id: 'research', type: 'choice', prompt: 'A study finds a link between two behaviours. What can you safely conclude?', options: ['One causes the other', 'They are associated in this study', 'The result applies to everyone', 'The study must be wrong'], answer: 1, explanation: 'Correlation can be a useful clue, but it does not prove causation.' },
    { id: 'reflect', type: 'text', prompt: 'Write a neutral observation about a busy room, without guessing what anyone feels.', placeholder: 'I notice that...' }
  ] },
  { slug: 'designer', title: 'Designer', eyebrow: 'Shape better choices', icon: '✦', color: 'blue', description: 'Make complex things feel clear, useful, and human through visual thinking.', reality: 'Designers ask many questions, make rough versions, take feedback, and solve constraints with taste and logic.', subjects: ['Art / Design', 'English', 'Technology'], exams: ['Portfolio review', 'A-Levels Art & Design', 'IB Visual Arts', 'IELTS / TOEFL'], majors: ['Graphic Design', 'UX / Product Design', 'Industrial Design'], nextSteps: ['Redesign one confusing everyday object or screen.', 'Make a small portfolio with process, not just final images.', 'Ask someone to use your design while you observe silently.'], tasks: [
    { id: 'user', type: 'choice', prompt: 'People cannot find the “Pay” button. What should you do first?', options: ['Make it neon', 'Watch a few people try and ask what they expected', 'Add three more buttons', 'Blame the users'], answer: 1, explanation: 'Design starts with observing real behaviour and expectations, then testing a focused change.' },
    { id: 'constraint', type: 'choice', prompt: 'A poster must work in black and white and be readable from far away. What matters most?', options: ['Tiny decorative details', 'Clear hierarchy and strong contrast', 'Using every available font', 'Adding a long paragraph'], answer: 1, explanation: 'Good design respects constraints and makes the important message easy to see.' },
    { id: 'sketch', type: 'text', prompt: 'Describe one small change that would make a confusing bus stop easier to use.', placeholder: 'I would change...' }
  ] }
];

export function getProfession(slug: string) { return professions.find((profession) => profession.slug === slug); }
