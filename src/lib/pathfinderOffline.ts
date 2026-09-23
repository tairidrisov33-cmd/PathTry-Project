import { localize, professions, type Profession } from '@/data/professions';
import type { Language } from '@/data/translations';
import type { TaskContext } from '@/lib/taskContext';

// PathFinder without an AI key: understands the common questions and answers from the catalog itself.

const synonyms: Record<string, RegExp> = {
  'software-developer': /программист|разработчик(?!\S* игр)|айтишник|кодер|software|programm|coder|developer(?! of games)/,
  'data-analyst': /аналитик|данн[ыо]|data|analyst|статистик/,
  'cybersecurity-specialist': /кибер|безопасн|хакер|security|hacker|cyber/,
  'game-developer': /игр|геймдев|game/,
  doctor: /врач|доктор|медик|медицин|хирург|doctor|physician|medic/,
  psychologist: /психолог|психотерап|psycholog|therap/,
  nurse: /медсестр|медбрат|медсёстр|nurse/,
  veterinarian: /ветеринар|ветврач|vet\b|veterinar/,
  designer: /дизайн|design/,
  journalist: /журналист|репортёр|репортер|журналистик|journalis|reporter/,
  architect: /архитект|architect/,
  filmmaker: /режисс|кино|фильм|видеограф|film|director|movie/,
  lawyer: /юрист|адвокат|юриспруд|(^|\s)прав[оа]|lawyer|attorney|law\b/,
  teacher: /учител|педагог|преподават|teacher|teaching/,
  entrepreneur: /предприним|бизнес|стартап|entrepreneur|startup|business/
};

const interests: [RegExp, string[]][] = [
  [/рис|рисов|искусств|творч|красив|draw|art|creative|design/, ['designer', 'architect', 'filmmaker']],
  [/люд|общ|помога|забот|people|help|care|talk/, ['psychologist', 'nurse', 'teacher']],
  [/биолог|медицин|здоров|лечить|biology|health|medicine/, ['doctor', 'nurse', 'veterinarian']],
  [/животн|кошк|собак|animal|pet|dog|cat/, ['veterinarian']],
  [/компьютер|програм|код|техник|технолог|computer|code|coding|tech/, ['software-developer', 'cybersecurity-specialist', 'game-developer']],
  [/игр|game|gaming/, ['game-developer']],
  [/математ|числ|цифр|логик|анализ|math|numbers|logic|data/, ['data-analyst', 'software-developer', 'architect']],
  [/писать|текст|слов|истори|write|writing|story|stories/, ['journalist', 'filmmaker', 'lawyer']],
  [/спор|дебат|справедлив|закон|argue|debate|justice/, ['lawyer', 'journalist']],
  [/объясн|учить|дет|explain|teach|kids/, ['teacher', 'psychologist']],
  [/деньг|бизнес|идеи|лидер|money|business|ideas|lead/, ['entrepreneur', 'data-analyst']],
  [/видео|кино|фото|video|film|photo/, ['filmmaker', 'designer']],
  [/строит|здани|город|build|city|house/, ['architect']]
];

const intents = {
  harmful: /оружи|бомб|взрыв|террор|наркот|убить|отрав|сделать яд|взлом(ать|ай) (чуж|аккаунт|страниц)|weapon|bomb|explosive|drugs|kill|poison|hack (someone|an account)/,
  crisis: /суицид|покончить с собой|не хочу жить|навредить себе|самоповрежд|suicid|kill myself|hurt myself|self-harm/,
  greeting: /^(привет|здравствуй|здравствуйте|добрый|hi|hello|hey)(?=$|[\s!,.?])/,
  about: /как работает|что такое pathtry|что это за сайт|how does (pathtry|this) work|what is pathtry/,
  result: /результат|балл|совпаден|процент|score|result|match/,
  compare: /сравн|разниц|отлича|или |vs|versus|compare|difference/,
  recommend: /подойд|подходит|посовет|рекоменд|кем стать|какую профессию|какая профессия|выбрать профессию|suit|recommend|which (career|profession)|what (career|profession)|should i (be|become)/,
  study: /предмет|экзамен|сдава|сдать|егэ|огэ|вуз|универ|поступ|учиться|выучи|какие курсы|специальност|subject|exam|university|college|major|degree|study|learn/,
  start: /как стать|с чего начать|начать|первые шаги|что делать дальше|следующий шаг|how (do i|to) become|get started|start|next step/,
  salary: /зарплат|сколько (получ|плат|зарабат)|доход|salary|earn|pay\b|paid/,
  describe: /чем занима|что делает|кто так|расскажи|опиши|как выглядит|какая работа|день|what does|what do .* do|tell me|describe|day in/,
  task: /задани|подсказ|помоги|помочь|не понимаю|как ответить|сильный ответ|что проверяет|вариант|task|hint|help|stuck|strong answer|what does this|option|answer/
};

const pick = <T,>(items: T[], seed: string) => items[[...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % items.length];
const firstSentence = (text: string) => text.split(/(?<=[.!?])\s/)[0];

function findProfessions(text: string) {
  // Ordered by where each profession is mentioned, so "compare A and B" keeps A first.
  return professions.map((profession) => ({ profession, at: text.search(synonyms[profession.slug]) })).filter((item) => item.at >= 0).sort((a, b) => a.at - b.at).map((item) => item.profession);
}

export function offlineReply(question: string, language: Language, page: string, task: TaskContext | null) {
  const ru = language === 'ru';
  const q = question.toLowerCase().replace(/ё/g, 'е');
  const local = (slug: string): Profession => localize(professions.find((item) => item.slug === slug)!, language);
  const pageSlug = page.match(/\/(?:try|result)\/([a-z-]+)/)?.[1];
  let found = findProfessions(q).map((item) => item.slug);
  if (!found.length && pageSlug && professions.some((item) => item.slug === pageSlug)) found = [pageSlug];
  const [main, second] = found.map(local);

  if (intents.crisis.test(q)) return ru ? 'Мне жаль, что тебе сейчас так тяжело. Я здесь только для вопросов о профессиях и не могу помочь с этим как специалист. Пожалуйста, поговори прямо сейчас с человеком, которому доверяешь, или позвони на телефон доверия в твоей стране (в России — 8-800-2000-122, бесплатно). Если есть непосредственная опасность — звони 112.' : 'I am sorry you are going through this. I am only built for career questions and cannot help the way a professional can. Please talk to someone you trust right now, or call a local crisis line. If you are in immediate danger, call your local emergency number.';
  if (intents.harmful.test(q)) return ru ? 'С этим я не помогу. Я PathFinder — помогаю разобраться в профессиях, заданиях и следующих шагах. Спроси, например: «Чем занимается специалист по кибербезопасности?»' : 'I cannot help with that. I am PathFinder — I help with professions, tasks, and next steps. Try asking: “What does a cybersecurity specialist do?”';

  // The student is on a task: help with that task first, without giving the answer away.
  if (task && (intents.task.test(q) || (!found.length && !intents.recommend.test(q)))) {
    if (task.submitted) return ru ? `Разбор уже под заданием: сравни свой выбор с «Взглядом профессионала». Главная мысль этого задания: ${task.hint} Если хочешь, спроси, как такие решения выглядят в реальной работе ${main ? `специалиста «${main.title}»` : ''}.` : `The breakdown is right under the task: compare your choice with the “Pro insight”. The key idea here: ${task.hint} Ask me how decisions like this look in real ${main ? `${main.title} ` : ''}work if you like.`;
    const method = task.type === 'choice'
      ? (ru ? 'Сначала отбрось варианты, которые действуют до того, как собраны факты, рискуют чужой безопасностью или перекладывают проблему на других. Из оставшихся выбери тот, что сначала проясняет ситуацию.' : 'First rule out options that act before gathering facts, risk someone’s safety, or push the problem onto others. From what is left, pick the one that clarifies the situation first.')
      : (ru ? 'Сильный письменный ответ — это конкретное действие плюс причина («…, потому что…»). Пиши так, будто объясняешь коллеге, а не учителю.' : 'A strong written answer is one concrete action plus a reason (“…, because…”). Write as if explaining to a colleague, not a teacher.');
    return ru ? `Подсказка: ${task.hint}\n\n${method} Ответ за тебя я не скажу — так эксперимент покажет, как думаешь именно ты.` : `Hint: ${task.hint}\n\n${method} I will not give you the answer — that way the experiment shows how you think.`;
  }

  if (intents.greeting.test(q) && q.length < 40) return ru ? 'Привет! Я PathFinder, AI-наставник PathTry. Могу рассказать, чем занимается специалист, что сдавать и где учиться, сравнить профессии, подобрать направление по интересам или помочь с заданием. С чего начнём?' : 'Hi! I am PathFinder, PathTry’s AI mentor. I can explain what a professional does, what to study, compare careers, suggest a path from your interests, or help with a task. Where shall we start?';
  if (intents.about.test(q)) return ru ? 'Ты выбираешь профессию и проходишь 10 коротких рабочих задач (около 10 минут): 7 с выбором решения и 3 письменных. После каждого ответа видно, как поступил бы профессионал, а письменные ответы я разбираю по критериям. В конце — совпадение с профессией, сильные стороны и следующие шаги. Задачи основаны на O*NET и ESCO.' : 'You pick a profession and work through 10 short tasks (about 10 minutes): 7 decisions and 3 written answers. After each answer you see what a professional would do, and I review written answers against criteria. At the end you get a match score, strengths, and next steps. Tasks are based on O*NET and ESCO.';

  if (intents.compare.test(q) && main && second) {
    return ru ? `${main.title}: ${firstSentence(main.reality)}\n\n${second.title}: ${firstSentence(second.reality)}\n\nЛучший способ сравнить — пройти обе симуляции и посмотреть, где у тебя было больше энергии, а не только баллов.` : `${main.title}: ${firstSentence(main.reality)}\n\n${second.title}: ${firstSentence(second.reality)}\n\nThe best comparison: try both simulations and see where your energy was higher, not just your score.`;
  }

  if (intents.salary.test(q)) return ru ? `Точные цифры зарплат я не называю: они сильно зависят от страны, города и опыта. ${main ? `Для профессии «${main.title}» ` : ''}смотри актуальные вакансии (например, на hh.ru или LinkedIn) и данные O*NET. А в PathTry можно проверить, нравится ли тебе сама работа.` : `I do not quote salaries: they vary a lot by country, city, and experience. ${main ? `For ${main.title}, ` : ''}check current job listings and O*NET wage data. PathTry helps you check whether you enjoy the work itself.`;

  if (main && intents.study.test(q)) return ru ? `${main.title}. Полезные предметы: ${main.subjects.join(', ')}. Экзамены и допуск: ${main.exams.slice(0, 3).join(', ')}. Типичные специальности в вузе: ${main.majors.join(', ')}.` : `${main.title}. Useful subjects: ${main.subjects.join(', ')}. Exams and entry: ${main.exams.slice(0, 3).join(', ')}. Typical university majors: ${main.majors.join(', ')}.`;
  if (main && intents.start.test(q)) return ru ? `Как начать путь «${main.title}»:\n1. ${main.nextSteps[0]}\n2. ${main.nextSteps[1]}\n3. ${main.nextSteps[2]}` : `How to start as a ${main.title}:\n1. ${main.nextSteps[0]}\n2. ${main.nextSteps[1]}\n3. ${main.nextSteps[2]}`;
  if (intents.result.test(q) && !intents.describe.test(q)) return ru ? 'Результат — ориентир, а не приговор. «Проф. решения» показывают, как часто ты поступал(а) как специалист, а «энергия» — насколько задания тебя заряжали. Если решения хорошие, а энергии мало — возможно, стоит попробовать соседнюю профессию. Если наоборот — стоит подтянуть знания, интерес уже есть.' : 'Your result is a signal, not a verdict. “Pro moves” show how often you acted like a professional; “energy” shows how much the tasks energised you. Good moves but low energy? Try a neighbouring profession. High energy but fewer pro moves? The interest is there — skills can be learned.';

  if (intents.recommend.test(q) || (!main && interests.some(([pattern]) => pattern.test(q)))) {
    const suggested = [...new Set(interests.filter(([pattern]) => pattern.test(q)).flatMap(([, slugs]) => slugs))].slice(0, 3).map(local);
    if (suggested.length) return (ru ? 'Судя по твоим интересам, попробуй:\n' : 'Based on your interests, try:\n') + suggested.map((item) => `• ${item.title} — ${firstSentence(item.description)}`).join('\n') + (ru ? '\n\nКаждая симуляция занимает ~10 минут — сравни, где будет больше энергии.' : '\n\nEach simulation takes ~10 minutes — compare where your energy is higher.');
    return ru ? 'Расскажи, что тебе нравится делать: общаться с людьми, разбираться в технике, рисовать, писать, считать, помогать, спорить? По этому подберу 2–3 профессии, которые стоит попробовать первыми.' : 'Tell me what you enjoy: talking to people, tech, drawing, writing, numbers, helping, debating? I will suggest 2–3 professions worth trying first.';
  }

  if (main) {
    const example = main.tasks.find((item) => item.type === 'choice');
    return ru ? `${main.title}. ${main.description} ${main.reality}${example ? `\n\nПример задачи из симуляции: «${example.prompt}»` : ''}\n\nМогу рассказать, что сдавать, где учиться или с чего начать.` : `${main.title}. ${main.description} ${main.reality}${example ? `\n\nA task from the simulation: “${example.prompt}”` : ''}\n\nI can also tell you what to study or how to get started.`;
  }

  return pick(ru ? [
    'Я отвечаю на вопросы о профессиях и о PathTry. Например: «Чем занимается архитектор?», «Что сдавать на врача?», «Что выбрать, если люблю рисовать?», «Сравни юриста и журналиста».',
    'Не совсем понял вопрос. Я могу рассказать о любой из 15 профессий, подсказать предметы и вузы, сравнить направления или помочь с заданием. Что именно интересно?'
  ] : [
    'I answer questions about professions and PathTry. For example: “What does an architect do?”, “What should I study to become a doctor?”, “What should I try if I love drawing?”, “Compare lawyer and journalist.”',
    'I did not quite get that. I can describe any of the 15 professions, suggest subjects and universities, compare paths, or help with a task. What would you like to know?'
  ], q);
}
