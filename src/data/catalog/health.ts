import { choice, open, type ProfessionDef } from '@/data/catalog/types';

export const health: ProfessionDef[] = [
  {
    slug: 'doctor', category: 'health', color: 'teal',
    title: ['Doctor', 'Врач'],
    description: ['Combine science, judgement, and human connection when people need help.', 'Соединяет науку, решения и человеческое внимание, когда людям нужна помощь.'],
    reality: ['Medicine means careful listening, uncertain decisions, teamwork, and staying calm when the stakes are high.', 'Медицина — это внимательно слушать, решать в условиях неопределённости, работать в команде и сохранять спокойствие.'],
    subjects: [['Biology', 'Биология'], ['Chemistry', 'Химия'], ['Mathematics', 'Математика']],
    exams: [['MCAT / UCAT', 'MCAT / UCAT'], ['A-Levels Biology & Chemistry', 'A-Levels: биология и химия'], ['IB Biology & Chemistry', 'IB: биология и химия'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Medicine', 'Лечебное дело'], ['Biomedical Sciences', 'Биомедицина'], ['Public Health', 'Общественное здоровье']],
    nextSteps: [['Volunteer in a care or community setting.', 'Поучаствуй в волонтёрстве в сфере помощи людям.'], ['Learn biology beyond memorising labels.', 'Изучай биологию не только через запоминание терминов.'], ['Ask a clinician what surprised them about the job.', 'Спроси врача, что удивило его в профессии.']],
    tasks: [
      choice('triage', 'people', ['A patient says they feel tired. What is the most useful next question?', 'Пациент говорит, что чувствует усталость. Какой вопрос полезнее всего?'], [
        ['“When did it start, and what else have you noticed?”', '«Когда это началось и что ещё вы заметили?»'],
        ['“You probably need more sleep.”', '«Вам, наверное, нужно больше спать»'],
        ['“Would you like a full-body scan?”', '«Хотите сделать полное обследование на томографе?»'],
        ['“Is anyone else at home tired too?”', '«Кто-то ещё дома тоже устаёт?»'],
        ['“Try drinking more coffee.”', '«Попробуйте пить больше кофе»']
      ], ['Good care begins by listening for timing, context, and related symptoms before jumping to conclusions.', 'Хорошая помощь начинается со времени появления симптома, контекста и других признаков, а не с поспешных выводов.'], ['Which question gathers the most information without assuming the answer?', 'Какой вопрос собирает больше всего информации, не предполагая ответ заранее?']),
      choice('safety', 'analyze', ['Two medicines with similar names appear on a busy chart. What should you do?', 'В загруженной карте пациента два лекарства с похожими названиями. Что делать?'], [
        ['Pause and verify the name and dose', 'Остановиться и сверить название и дозировку'],
        ['Choose the one you remember best', 'Выбрать то, которое лучше помнишь'],
        ['Ask a colleague to guess quickly', 'Попросить коллегу быстро угадать'],
        ['Give both, just in case', 'Дать оба на всякий случай'],
        ['Give neither and move on', 'Не давать ни одного и идти дальше']
      ], ['Verification is a professional skill, not a sign of uncertainty. Mix-ups of similar names are a known risk.', 'Проверка — профессиональный навык, а не признак неуверенности. Путаница похожих названий — известный риск.'], ['What would a pilot do before take-off if two switches looked alike?', 'Что сделал бы пилот перед взлётом, если бы два переключателя выглядели одинаково?']),
      open('empathy', 'people', ['Write one sentence you could say to a nervous patient before asking a difficult question.', 'Напиши одну фразу для тревожного пациента перед сложным вопросом.'], ['I can see this is difficult...', 'Я вижу, что это непросто...'], ['Acknowledge the feeling, explain why you ask, and give the patient some control.', 'Признай чувство, объясни, зачем спрашиваешь, и дай пациенту немного контроля.'], ['Warm, respectful wording that acknowledges the emotion, explains the reason for the question, and gives permission or choice.', 'Тёплые, уважительные слова: признание эмоции, объяснение, зачем нужен вопрос, и разрешение или выбор для пациента.'], ['I can see this is stressful, so let me explain: I need to ask a personal question to understand what is causing your symptoms, and you can stop me at any time.', 'Я вижу, что вам тревожно, поэтому объясню: мне нужно задать личный вопрос, чтобы понять причину симптомов, и вы можете остановить меня в любой момент.'], [['understand', 'see', 'feel', 'worried', 'nervous', 'okay', 'take your time', 'because', 'need to ask', 'can stop', 'help', 'difficult'], ['понима', 'вижу', 'чувств', 'волну', 'тревож', 'нормально', 'не спеш', 'потому', 'нужно спрос', 'останов', 'помо', 'непрост']]),
      choice('handoff', 'pressure', ['You are unsure whether a symptom is urgent. What is the safest response?', 'Ты не уверен(а), срочный ли симптом. Как поступить безопаснее всего?'], [
        ['Check reliable guidance and ask a senior clinician', 'Свериться с надёжными рекомендациями и спросить старшего врача'],
        ['Wait until tomorrow and see', 'Подождать до завтра и посмотреть'],
        ['Guess confidently so the patient is not worried', 'Уверенно предположить, чтобы пациент не волновался'],
        ['Search social media for similar cases', 'Поискать похожие случаи в соцсетях'],
        ['Send the patient home to rest', 'Отправить пациента домой отдыхать']
      ], ['Clinical work relies on protocols, evidence, and teamwork when uncertainty matters.', 'При неопределённости клиническая работа опирается на протоколы, доказательства и команду.'], ['Who and what could make your decision safer right now?', 'Кто и что может сделать твоё решение безопаснее прямо сейчас?']),
      choice('emergency', 'pressure', ['In the emergency room three patients arrive at once. Who should be seen first?', 'В приёмное отделение одновременно поступили три пациента. Кого осмотреть первым?'], [
        ['A man with chest pain and cold sweat', 'Мужчину с болью в груди и холодным потом'],
        ['A teenager with a sprained ankle', 'Подростка с подвёрнутой лодыжкой'],
        ['A woman with a cough for a week', 'Женщину с кашлем в течение недели'],
        ['Whoever arrived first', 'Того, кто пришёл первым'],
        ['Whoever complains the loudest', 'Того, кто громче всех жалуется']
      ], ['Triage ranks by danger to life, not by arrival order: chest pain with sweating can signal a heart attack.', 'Сортировка идёт по угрозе жизни, а не по очереди: боль в груди с потом может означать инфаркт.'], ['Which condition could become life-threatening in minutes?', 'Какое состояние может стать опасным для жизни за считанные минуты?']),
      choice('consent', 'people', ['A patient refuses a test you recommend. What is the right approach?', 'Пациент отказывается от обследования, которое ты рекомендуешь. Как правильно поступить?'], [
        ['Explain the benefits and risks in plain words and respect their informed choice', 'Простыми словами объяснить пользу и риски и уважать осознанный выбор пациента'],
        ['Do the test anyway while they are distracted', 'Всё равно провести обследование, пока он отвлёкся'],
        ['Tell them they will die without it', 'Сказать, что без него он умрёт'],
        ['Ask the family to pressure them', 'Попросить родственников надавить на него'],
        ['Stop treating them altogether', 'Вообще прекратить лечение']
      ], ['Informed consent is central to medicine: adults decide about their own bodies once they understand the options.', 'Информированное согласие — основа медицины: взрослый человек сам решает о своём теле, если понимает варианты.'], ['Whose body and whose decision is it?', 'Чьё это тело и чьё это решение?']),
      open('notes', 'analyze', ['Write one neutral fact you would record after a patient conversation.', 'Напиши один нейтральный факт, который можно записать после разговора с пациентом.'], ['The patient said...', 'Пациент сообщил...'], ['Record what was said or observed — not your opinion about the person.', 'Записывай то, что сказано или замечено, — а не своё мнение о человеке.'], ['An objective, specific fact (what the patient reported or what was measured), ideally with time or numbers, without judgement.', 'Объективный конкретный факт (что сообщил пациент или что измерили), желательно со временем или цифрами, без оценок.'], ['Patient reports a dry cough for 5 days, worse at night; temperature 37.8 °C at 10:15.', 'Пациент сообщает о сухом кашле в течение 5 дней, хуже ночью; температура 37,8 °C в 10:15.'], [['patient', 'report', 'said', 'day', 'temperature', 'pain', 'since', 'measured', 'at ', 'hours', 'blood'], ['пациент', 'сообщ', 'сказал', 'дн', 'температур', 'бол', 'с ', 'измер', 'в ', 'час', 'давлен']]),
      choice('antibiotics', 'analyze', ['A patient with a common cold asks for antibiotics. What is the best response?', 'Пациент с обычной простудой просит антибиотики. Как лучше ответить?'], [
        ['Explain that antibiotics do not work on viruses and suggest what will help', 'Объяснить, что антибиотики не действуют на вирусы, и подсказать, что поможет'],
        ['Prescribe them to keep the patient happy', 'Выписать, чтобы пациент остался доволен'],
        ['Prescribe half a course as a compromise', 'Выписать половину курса как компромисс'],
        ['Refuse without any explanation', 'Отказать без объяснений'],
        ['Suggest buying them online', 'Посоветовать купить их в интернете']
      ], ['Colds are viral; unnecessary antibiotics cause side effects and resistance. Explaining builds trust.', 'Простуда вызвана вирусами; лишние антибиотики дают побочные эффекты и устойчивость бактерий. Объяснение укрепляет доверие.'], ['What kind of germ causes most colds?', 'Какой тип микробов вызывает большинство простуд?']),
      choice('mistake', 'pressure', ['You realise you gave a patient the wrong timing for their medicine. What do you do?', 'Ты понял(а), что назвал(а) пациенту неправильное время приёма лекарства. Что делать?'], [
        ['Tell the patient and the team promptly, correct it, and report it', 'Сразу сказать пациенту и команде, исправить и сообщить об ошибке'],
        ['Say nothing — it was probably fine', 'Промолчать — наверное, ничего страшного'],
        ['Fix it quietly at the next visit', 'Тихо исправить на следующем приёме'],
        ['Blame the pharmacist', 'Свалить вину на фармацевта'],
        ['Wait to see if anything happens', 'Подождать, случится ли что-нибудь']
      ], ['Safe medicine depends on honesty: early disclosure limits harm and helps the whole system learn.', 'Безопасная медицина держится на честности: раннее признание ошибки снижает вред и помогает всей системе учиться.'], ['What protects the patient most from this moment on?', 'Что с этой минуты лучше всего защитит пациента?']),
      open('explain', 'people', ['Explain “high blood pressure” to a patient in one or two simple sentences.', 'Объясни пациенту, что такое «высокое давление», одним-двумя простыми предложениями.'], ['Your blood pressure...', 'Ваше давление...'], ['Use an everyday comparison and say why it matters.', 'Используй бытовое сравнение и скажи, почему это важно.'], ['Simple, jargon-free explanation of what it is, why it matters (strain on heart/vessels), and ideally one thing the patient can do.', 'Простое объяснение без терминов: что это, почему важно (нагрузка на сердце и сосуды) и, желательно, что пациент может сделать.'], ['It means your blood pushes too hard against the walls of your vessels, like water in a hose under too much pressure. Over time that strains your heart, so we will work on lowering it with less salt, more movement, and possibly medicine.', 'Это значит, что кровь слишком сильно давит на стенки сосудов — как вода в шланге под слишком большим напором. Со временем это перегружает сердце, поэтому будем снижать давление: меньше соли, больше движения и, возможно, лекарства.'], [['blood', 'push', 'vessel', 'heart', 'pressure', 'like', 'strain', 'salt', 'exercise', 'medicine', 'over time', 'hose'], ['кров', 'давит', 'сосуд', 'сердц', 'давлен', 'как ', 'нагруз', 'соль', 'движен', 'лекарств', 'со временем', 'шланг']])
    ]
  },
  {
    slug: 'psychologist', category: 'health', color: 'lilac',
    title: ['Psychologist', 'Психолог'],
    description: ['Use evidence and empathy to help people understand patterns and make change possible.', 'Использует исследования и эмпатию, чтобы людям было легче понять себя и измениться.'],
    reality: ['The work asks for deep listening, careful notes, ethical boundaries, and comfort with slow progress.', 'Работа требует глубокого слушания, аккуратных записей, этических границ и терпения к медленному прогрессу.'],
    subjects: [['Biology', 'Биология'], ['Psychology', 'Психология'], ['Statistics', 'Статистика']],
    exams: [['GRE (some programs)', 'GRE (для некоторых программ)'], ['A-Levels Psychology', 'A-Levels: психология'], ['IB Psychology', 'IB: психология'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Psychology', 'Психология'], ['Counselling', 'Психологическое консультирование'], ['Neuroscience', 'Нейронаука']],
    nextSteps: [['Take an introductory psychology course.', 'Пройди вводный курс по психологии.'], ['Practise listening without immediately fixing.', 'Тренируйся слушать, не пытаясь сразу всё исправить.'], ['Read how psychologists use research, not just personality quizzes.', 'Узнай, как психологи используют исследования, а не тесты из соцсетей.']],
    tasks: [
      choice('listen', 'people', ['A person says, “I keep putting off everything.” What is the best response?', 'Человек говорит: «Я постоянно всё откладываю». Как лучше ответить?'], [
        ['“That sounds frustrating. When does it happen most?”', '«Звучит неприятно. Когда такое бывает чаще всего?»'],
        ['“Just stop procrastinating.”', '«Просто перестань откладывать»'],
        ['“Everyone does that, don’t worry.”', '«Все так делают, не переживай»'],
        ['“Here is my five-step cure.”', '«Вот мой план из пяти шагов, который всё исправит»'],
        ['“You are probably just lazy.”', '«Ты, наверное, просто ленишься»']
      ], ['Curiosity and a non-judgemental question reveal patterns before any advice is given.', 'Любопытный и неосуждающий вопрос помогает увидеть закономерность до любых советов.'], ['Which answer helps you understand the person rather than fix them?', 'Какой ответ помогает понять человека, а не «починить» его?']),
      choice('research', 'analyze', ['A study finds a link between two behaviours. What can you safely conclude?', 'Исследование нашло связь между двумя привычками. Что можно утверждать?'], [
        ['They are associated in this study', 'В этом исследовании они связаны'],
        ['One causes the other', 'Одна вызывает другую'],
        ['The result applies to everyone', 'Результат верен для всех людей'],
        ['The study must be wrong', 'Исследование точно ошибочно'],
        ['The link is strong enough to change the law', 'Связь достаточно сильная, чтобы менять законы']
      ], ['Correlation can be a useful clue, but it does not prove causation.', 'Корреляция — полезная подсказка, но она не доказывает причинно-следственную связь.'], ['Could a third factor explain both behaviours?', 'Может ли третий фактор объяснять обе привычки?']),
      open('reflect', 'analyze', ['Write a neutral observation about a busy room without guessing what anyone feels.', 'Опиши шумную комнату нейтрально, не угадывая, что чувствуют люди.'], ['I notice that...', 'Я замечаю, что...'], ['Describe only what you could see or hear — actions, sounds, numbers.', 'Описывай только то, что можно увидеть или услышать: действия, звуки, количество.'], ['Observable details (actions, sounds, numbers, positions) with no guesses about emotions or intentions.', 'Наблюдаемые детали (действия, звуки, количество, расположение) без догадок об эмоциях или намерениях.'], ['I notice about 15 people, three conversations at once, two people standing by the door looking at their phones, and a phone ringing twice.', 'Я замечаю около 15 человек, три разговора одновременно, двое стоят у двери и смотрят в телефоны, дважды звонит телефон.'], [['notice', 'people', 'talking', 'sitting', 'standing', 'phone', 'door', 'table', 'sound', 'loud', 'two', 'three'], ['замеча', 'человек', 'говор', 'сид', 'сто', 'телефон', 'двер', 'стол', 'звук', 'громк', 'дво', 'три']]),
      choice('ethics', 'people', ['A friend asks you to diagnose them from a short video. What is the responsible reply?', 'Друг просит поставить диагноз по короткому видео. Как ответить ответственно?'], [
        ['Explain that assessment needs context and suggest qualified help', 'Объяснить, что для оценки нужен контекст, и предложить обратиться к специалисту'],
        ['Give a diagnosis right away', 'Сразу поставить диагноз'],
        ['Post the video for others to judge', 'Выложить видео, чтобы другие оценили'],
        ['Say nothing is wrong to reassure them', 'Сказать, что всё в порядке, чтобы успокоить'],
        ['Send a personality quiz link instead', 'Отправить ссылку на тест личности']
      ], ['Professional boundaries protect people from confident conclusions based on too little information.', 'Границы защищают человека от уверенных выводов при недостатке информации.'], ['What would a responsible professional need before any conclusion?', 'Что нужно ответственному специалисту до любого вывода?']),
      choice('goal', 'analyze', ['A client says, “I just want to be happier.” What is a useful next step?', 'Клиент говорит: «Я просто хочу быть счастливее». Какой следующий шаг полезен?'], [
        ['Explore what “happier” would look like in daily life and agree on a small concrete goal', 'Выяснить, как «счастливее» выглядело бы в обычном дне, и договориться о маленькой конкретной цели'],
        ['Hand them a list of hobbies to try', 'Дать список хобби, которые стоит попробовать'],
        ['Tell them happiness is simply a choice', 'Сказать, что счастье — это просто выбор'],
        ['Diagnose depression immediately', 'Сразу диагностировать депрессию'],
        ['Say that goal is too vague to work on', 'Сказать, что цель слишком размытая и с ней нельзя работать']
      ], ['Change becomes possible when a vague wish turns into something observable and small.', 'Изменения становятся возможными, когда размытое желание превращается в маленькое наблюдаемое действие.'], ['How would you and the client know that things are improving?', 'Как вы с клиентом поймёте, что становится лучше?']),
      choice('confidential', 'pressure', ['A client asks you to keep a secret but mentions a plan to seriously hurt themselves. What do you do?', 'Клиент просит сохранить тайну, но упоминает план серьёзно навредить себе. Что делать?'], [
        ['Explain that confidentiality has limits for safety and involve urgent help', 'Объяснить, что у конфиденциальности есть пределы ради безопасности, и привлечь срочную помощь'],
        ['Promise never to tell anyone', 'Пообещать никому не говорить'],
        ['Change the subject to something lighter', 'Перевести разговор на что-то полегче'],
        ['End the session early', 'Досрочно закончить сессию'],
        ['Wait until the next session to discuss it', 'Обсудить это на следующей сессии']
      ], ['Confidentiality is essential, but risk to life is the key exception; psychologists explain this upfront.', 'Конфиденциальность важна, но угроза жизни — главное исключение; психологи заранее говорят об этом клиенту.'], ['What matters more here: a promise or a person’s safety?', 'Что здесь важнее: обещание или безопасность человека?']),
      open('measure', 'analyze', ['Name one observable change that could show whether a new study habit is helping.', 'Назови одно наблюдаемое изменение, которое покажет, помогает ли новая учебная привычка.'], ['We could measure...', 'Можно измерить...'], ['Choose something you can count or compare before and after.', 'Выбери то, что можно посчитать или сравнить «до» и «после».'], ['A concrete, measurable indicator (grades, minutes, completed tasks, sleep) and ideally how to compare it over time.', 'Конкретный измеримый показатель (оценки, минуты, выполненные задания, сон) и, желательно, как сравнить его во времени.'], ['Count how many homework tasks are finished before 9 pm each week, and compare the four weeks before and after starting the habit.', 'Считать, сколько домашних заданий выполнено до 21:00 каждую неделю, и сравнить четыре недели до и после начала привычки.'], [['count', 'number', 'grade', 'score', 'minutes', 'hours', 'week', 'before', 'after', 'compare', 'track', 'finished'], ['посчит', 'количеств', 'оценк', 'балл', 'минут', 'час', 'недел', 'до ', 'после', 'сравн', 'отслеж', 'выполн']]),
      choice('placebo', 'analyze', ['A new app claims to reduce anxiety because users say they feel calmer. What evidence would be most convincing?', 'Новое приложение обещает снижать тревожность, потому что пользователи говорят, что им спокойнее. Какое доказательство было бы самым убедительным?'], [
        ['A comparison with a group using a placebo app', 'Сравнение с группой, использующей приложение-пустышку'],
        ['More five-star reviews', 'Больше отзывов на пять звёзд'],
        ['The developer’s personal story', 'Личная история разработчика'],
        ['The number of downloads', 'Количество скачиваний'],
        ['A celebrity recommendation', 'Рекомендация знаменитости']
      ], ['People often feel better simply because they expect to; a control group separates the real effect from expectation.', 'Людям часто становится лучше просто от ожидания; контрольная группа отделяет реальный эффект от ожиданий.'], ['How would you know people would not have felt calmer anyway?', 'Как понять, что людям не стало бы спокойнее и без приложения?']),
      choice('burnout', 'pressure', ['After a week of emotionally heavy sessions you feel drained. What is the professional move?', 'После недели эмоционально тяжёлых сессий ты чувствуешь опустошение. Что будет профессионально?'], [
        ['Use supervision and protect your recovery time', 'Обратиться к супервизору и защитить своё время на восстановление'],
        ['Take on more clients to stay busy', 'Взять ещё клиентов, чтобы не думать'],
        ['Stop writing session notes to save energy', 'Перестать вести записи сессий, чтобы экономить силы'],
        ['Cancel clients without notice', 'Отменить клиентов без предупреждения'],
        ['Share client stories with friends to vent', 'Выговориться друзьям, пересказывая истории клиентов']
      ], ['Helpers need care too: supervision and rest keep the work safe for clients and for you.', 'Помогающим тоже нужна поддержка: супервизия и отдых делают работу безопасной и для клиентов, и для тебя.'], ['Which option keeps both you and your clients safe?', 'Какой вариант бережёт и тебя, и клиентов?']),
      open('openq', 'people', ['Write one open question to start a conversation with a teenager who seems stressed about exams.', 'Напиши один открытый вопрос, чтобы начать разговор с подростком, который выглядит напряжённым из-за экзаменов.'], ['What...', 'Что...'], ['Open questions cannot be answered with yes or no and do not assume the answer.', 'На открытый вопрос нельзя ответить «да» или «нет», и он не предполагает ответ заранее.'], ['A genuinely open question (starts with what/how/tell me), non-judgemental, focused on the teenager’s experience.', 'Действительно открытый вопрос (начинается с «что», «как», «расскажи»), без оценки, про опыт самого подростка.'], ['What has the run-up to your exams been like for you this week?', 'Как для тебя проходит эта неделя перед экзаменами?'], [['what', 'how', 'tell me', 'like for you', 'feel', 'week', 'exam', 'going', '?'], ['что', 'как ', 'расскажи', 'для тебя', 'чувств', 'недел', 'экзамен', 'проход', '?']])
    ]
  },
  {
    slug: 'nurse', category: 'health', color: 'rose',
    title: ['Nurse', 'Медсестра / медбрат'],
    description: ['Keep patients safe around the clock, notice changes early, and turn care plans into action.', 'Круглосуточно заботится о безопасности пациентов, замечает изменения раньше всех и воплощает план лечения.'],
    reality: ['Nursing is shift work: observing, giving medicines, calming families, documenting precisely, and reacting fast when someone worsens.', 'Работа медсестры — это смены: наблюдение, лекарства, разговоры с родственниками, точные записи и быстрая реакция, если пациенту становится хуже.'],
    subjects: [['Biology', 'Биология'], ['Chemistry', 'Химия'], ['Psychology', 'Психология']],
    exams: [['A-Levels Biology', 'A-Levels: биология'], ['IB Biology', 'IB: биология'], ['NCLEX (later, in the US)', 'NCLEX (позже, в США)'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Nursing', 'Сестринское дело'], ['Midwifery', 'Акушерское дело'], ['Paramedic Science', 'Скорая медицинская помощь']],
    nextSteps: [['Take a first-aid course with practical scenarios.', 'Пройди курс первой помощи с практическими сценариями.'], ['Volunteer in a care home or hospital support role.', 'Поволонтёрь в доме престарелых или больнице.'], ['Ask a nurse what a night shift is really like.', 'Спроси медсестру, какой бывает ночная смена на самом деле.']],
    tasks: [
      choice('handover', 'analyze', ['At shift change, what is most important to pass on to the next nurse?', 'Что важнее всего передать следующей смене при пересменке?'], [
        ['Changes in each patient’s condition, medicines given, and pending tasks', 'Изменения в состоянии каждого пациента, какие лекарства даны и что осталось сделать'],
        ['How busy and tiring your shift was', 'Какой тяжёлой была твоя смена'],
        ['Just “everything is fine”', 'Просто «всё нормально»'],
        ['Nothing — they can read the chart', 'Ничего — пусть прочитают карту'],
        ['Which patients are the most annoying', 'Какие пациенты самые надоедливые']
      ], ['Structured handover prevents missed doses and unnoticed deterioration — a major source of errors.', 'Структурированная передача смены предотвращает пропущенные дозы и незамеченное ухудшение — частую причину ошибок.'], ['What would you need to know if you took over these patients right now?', 'Что тебе нужно было бы знать, если бы ты принял(а) этих пациентов прямо сейчас?']),
      choice('hygiene', 'solve', ['You finish with one patient and move to the next. What must happen in between?', 'Ты закончил(а) с одним пациентом и переходишь к следующему. Что обязательно между ними?'], [
        ['Clean your hands, every single time', 'Обработать руки — каждый раз'],
        ['Only wash if your hands look dirty', 'Мыть руки, только если они выглядят грязными'],
        ['Keep the same gloves on to save time', 'Не менять перчатки, чтобы сэкономить время'],
        ['Clean your hands once an hour', 'Обрабатывать руки раз в час'],
        ['Clean your hands at the end of the shift', 'Обработать руки в конце смены']
      ], ['Hand hygiene is the single most effective way to stop infections spreading between patients.', 'Гигиена рук — самый эффективный способ не переносить инфекции между пациентами.'], ['Can you see germs on your hands?', 'Можно ли увидеть микробы на руках?']),
      open('pain', 'people', ['How would you ask a patient about their pain to get useful details? Write your questions.', 'Как спросить пациента о боли, чтобы получить полезные подробности? Напиши свои вопросы.'], ['On a scale from 0 to 10...', 'По шкале от 0 до 10...'], ['Think: how strong, where, what kind, and since when.', 'Подумай: насколько сильная, где, какая и с какого времени.'], ['Asks about intensity (e.g. 0–10 scale), location, type, and timing or what makes it better/worse, in a kind tone.', 'Спрашивает об интенсивности (например, шкала 0–10), месте, характере и времени или о том, что облегчает/усиливает боль, доброжелательно.'], ['On a scale from 0 to 10, how strong is your pain right now? Where exactly does it hurt, and is it sharp, dull, or burning? When did it start, and does anything make it better or worse?', 'По шкале от 0 до 10, насколько сильна боль сейчас? Где именно болит — боль острая, тупая или жгучая? Когда она началась и что её облегчает или усиливает?'], [['scale', '0', '10', 'where', 'when', 'start', 'sharp', 'dull', 'better', 'worse', 'how strong', 'describe'], ['шкал', '0', '10', 'где', 'когда', 'начал', 'остр', 'туп', 'облегч', 'усилива', 'насколько', 'опиш']]),
      choice('deteriorate', 'pressure', ['A patient suddenly becomes confused and is breathing fast. What do you do?', 'Пациент внезапно стал спутанным и часто дышит. Что делать?'], [
        ['Check vital signs and call the doctor or rapid response team immediately', 'Измерить показатели и немедленно вызвать врача или реанимационную бригаду'],
        ['Let them sleep it off', 'Дать ему выспаться'],
        ['Wait for the morning ward round', 'Подождать утреннего обхода'],
        ['Give them a glass of water and leave', 'Дать стакан воды и уйти'],
        ['Write it down at the end of the shift', 'Записать это в конце смены']
      ], ['New confusion and fast breathing can be early signs of serious illness; early escalation saves lives.', 'Внезапная спутанность и учащённое дыхание могут быть ранними признаками тяжёлого состояния; ранний вызов помощи спасает жизни.'], ['Is this a normal change or a warning sign?', 'Это обычное изменение или тревожный сигнал?']),
      choice('family', 'people', ['An anxious relative is shouting at the nurses’ station. What is the best approach?', 'Встревоженный родственник кричит на посту медсестёр. Как лучше поступить?'], [
        ['Stay calm, listen, acknowledge the worry, and explain what you can', 'Сохранять спокойствие, выслушать, признать тревогу и объяснить, что можешь'],
        ['Shout back so they understand', 'Ответить криком, чтобы понял'],
        ['Ignore them until they calm down', 'Игнорировать, пока не успокоится'],
        ['Promise their relative will be fine', 'Пообещать, что с родственником всё будет хорошо'],
        ['Call security straight away', 'Сразу вызвать охрану']
      ], ['Behind anger there is usually fear; calm listening de-escalates most situations (security is for real danger).', 'За гневом обычно стоит страх; спокойное слушание гасит большинство конфликтов (охрана нужна при реальной угрозе).'], ['What is this person probably feeling underneath the anger?', 'Что этот человек, скорее всего, чувствует под гневом?']),
      choice('dose', 'analyze', ['A prescribed dose looks ten times higher than usual. What should you do?', 'Назначенная доза выглядит в десять раз больше обычной. Что делать?'], [
        ['Pause and check with the prescriber or pharmacist before giving it', 'Остановиться и уточнить у врача или фармацевта до введения'],
        ['Give it as written — the doctor knows best', 'Дать как написано — врачу виднее'],
        ['Give half the dose to be safe', 'Дать половину дозы на всякий случай'],
        ['Skip it without telling anyone', 'Пропустить, никому не сказав'],
        ['Ask the patient what they think', 'Спросить мнение пациента']
      ], ['Nurses are a key safety check: questioning an unusual order is part of the job.', 'Медсестра — важное звено безопасности: задавать вопросы о необычном назначении — часть работы.'], ['Who can confirm whether this is a typo?', 'Кто может подтвердить, опечатка ли это?']),
      open('falls', 'solve', ['Name two changes you would make in a hospital room to reduce the risk of an elderly patient falling.', 'Назови два изменения в палате, которые снизят риск падения пожилого пациента.'], ['First, I would...', 'Во-первых, я бы...'], ['Picture the patient getting up at night to go to the bathroom.', 'Представь, как пациент встаёт ночью в туалет.'], ['Two concrete, practical changes (lighting, clear floor, call bell in reach, bed height, non-slip footwear, walking aid) with a short reason.', 'Два конкретных практичных изменения (свет, свободный пол, кнопка вызова под рукой, высота кровати, нескользкая обувь, ходунки) с короткой причиной.'], ['I would put a night light on the path to the bathroom and keep the call bell and walking frame within reach, so the patient does not have to walk in the dark or stretch.', 'Я бы поставил(а) ночник по пути в туалет и положил(а) кнопку вызова и ходунки в зоне досягаемости, чтобы пациенту не приходилось идти в темноте или тянуться.'], [['light', 'night', 'floor', 'bell', 'call', 'reach', 'bed', 'low', 'rail', 'shoes', 'slip', 'frame', 'walker', 'clear'], ['свет', 'ночник', 'пол', 'кнопк', 'вызов', 'рядом', 'кроват', 'низк', 'поручн', 'обув', 'скольз', 'ходунк', 'свобод']]),
      choice('teachback', 'people', ['A patient is going home with a new inhaler. What is the best way to check they understood how to use it?', 'Пациента выписывают с новым ингалятором. Как лучше проверить, что он понял, как им пользоваться?'], [
        ['Ask them to show you how they will use it', 'Попросить показать, как он будет им пользоваться'],
        ['Ask “Do you understand?”', 'Спросить: «Вам понятно?»'],
        ['Give them a leaflet only', 'Просто дать брошюру'],
        ['Demonstrate once very quickly', 'Один раз быстро показать самому'],
        ['Explain it only to a family member', 'Объяснить только родственнику']
      ], ['“Teach-back” reveals mistakes that a polite “yes, I understand” hides.', 'Метод «покажи сам» выявляет ошибки, которые скрывает вежливое «да, понятно».'], ['Which option lets you actually see whether they can do it?', 'Какой вариант позволяет реально увидеть, получается ли у него?']),
      choice('privacy', 'people', ['A neighbour asks you how a patient they know is doing on your ward. What do you say?', 'Сосед спрашивает, как себя чувствует знакомый ему пациент из твоего отделения. Что ответить?'], [
        ['Politely explain you cannot share patient information', 'Вежливо объяснить, что не можешь рассказывать о пациентах'],
        ['Give a quick, general update', 'Коротко рассказать в общих чертах'],
        ['Share details because they are friends', 'Рассказать подробности — они же друзья'],
        ['Say “they’re fine” to be kind', 'Сказать «всё хорошо», чтобы успокоить'],
        ['Show them the chart on your phone', 'Показать карту на телефоне']
      ], ['Patient confidentiality applies everywhere, even outside work and even to friends.', 'Врачебная тайна действует везде — и вне работы, и в разговоре с друзьями.'], ['Did the patient agree to share their information?', 'Давал ли пациент согласие делиться информацией?']),
      open('objective', 'analyze', ['Rewrite this note objectively: “Patient was being difficult and hardly ate.”', 'Перепиши запись объективно: «Пациент капризничал и почти не ел».'], ['Patient...', 'Пациент...'], ['Replace judgements with what you actually saw, measured, or heard.', 'Замени оценки тем, что ты действительно видел(а), измерил(а) или слышал(а).'], ['Removes judgement words, describes specific behaviour and amounts (e.g. ate a quarter of lunch), ideally quoting what the patient said.', 'Убирает оценочные слова, описывает конкретное поведение и количество (например, съел четверть обеда), желательно с цитатой пациента.'], ['Patient ate about a quarter of lunch and declined dinner, saying “I feel sick.” Refused to walk to the bathroom twice, stating knee pain 6/10.', 'Пациент съел около четверти обеда и отказался от ужина, сказав: «Меня тошнит». Дважды отказался идти в туалет, указав на боль в колене 6/10.'], [['ate', 'quarter', 'half', 'declined', 'refused', 'said', 'stated', 'lunch', 'dinner', 'pain', 'times', '"', '“'], ['съел', 'четверт', 'половин', 'отказ', 'сказал', 'сообщ', 'обед', 'ужин', 'бол', 'раз', '«']])
    ]
  },
  {
    slug: 'veterinarian', category: 'health', color: 'green',
    title: ['Veterinarian', 'Ветеринар'],
    description: ['Diagnose and treat animals who cannot explain what hurts — and support the people who love them.', 'Диагностирует и лечит животных, которые не могут сказать, что болит, и поддерживает их хозяев.'],
    reality: ['Vet work mixes medicine, calm handling of scared animals, hard conversations about cost and loss, and long days.', 'Работа ветеринара — это медицина, спокойное обращение с испуганными животными, трудные разговоры о деньгах и потерях и длинные дни.'],
    subjects: [['Biology', 'Биология'], ['Chemistry', 'Химия'], ['Mathematics', 'Математика']],
    exams: [['A-Levels Biology & Chemistry', 'A-Levels: биология и химия'], ['IB Biology & Chemistry', 'IB: биология и химия'], ['Work experience with animals', 'Опыт работы с животными'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Veterinary Medicine', 'Ветеринария'], ['Animal Science', 'Зоотехния'], ['Biology', 'Биология']],
    nextSteps: [['Volunteer at an animal shelter.', 'Поволонтёрь в приюте для животных.'], ['Shadow a vet clinic for a day.', 'Проведи день в ветеринарной клинике в роли наблюдателя.'], ['Learn basic animal first aid.', 'Изучи основы первой помощи животным.']],
    tasks: [
      choice('history', 'analyze', ['A dog has not eaten for two days. What do you do first?', 'Собака не ест уже два дня. С чего начать?'], [
        ['Ask the owner about recent changes: food, behaviour, vomiting, what it may have eaten', 'Расспросить хозяина о переменах: корм, поведение, рвота, что собака могла съесть'],
        ['Give vitamins and send them home', 'Дать витамины и отпустить домой'],
        ['Prescribe antibiotics straight away', 'Сразу назначить антибиотики'],
        ['Say it is normal for dogs', 'Сказать, что для собак это нормально'],
        ['Recommend a more expensive food brand', 'Посоветовать более дорогой корм']
      ], ['Animals cannot talk, so the owner’s story is the first and most important clue.', 'Животные не могут рассказать о себе, поэтому история от хозяина — первая и главная подсказка.'], ['Who knows what happened to the dog before the visit?', 'Кто знает, что происходило с собакой до визита?']),
      choice('handling', 'solve', ['A frightened cat hisses during the examination. What helps most?', 'Испуганная кошка шипит во время осмотра. Что поможет больше всего?'], [
        ['Slow down, use a towel and a quiet space to reduce stress', 'Не спешить, использовать полотенце и тихое место, чтобы снизить стресс'],
        ['Hold it firmly and hurry up', 'Крепко держать и побыстрее закончить'],
        ['Give up on the exam', 'Отказаться от осмотра'],
        ['Raise your voice to show who is in charge', 'Повысить голос, чтобы показать, кто главный'],
        ['Ask the owner to hold it as tightly as possible', 'Попросить хозяина держать её как можно крепче']
      ], ['Low-stress handling keeps everyone safe and gives more reliable examination results.', 'Бережное обращение безопасно для всех и даёт более надёжные результаты осмотра.'], ['What would make you feel less scared in a strange place?', 'Что помогло бы тебе меньше бояться в незнакомом месте?']),
      open('weight', 'people', ['Kindly explain to an owner why their overweight dog needs a diet — without blaming them.', 'Доброжелательно объясни хозяину, почему его собаке с лишним весом нужна диета, — без обвинений.'], ['Your dog...', 'Ваша собака...'], ['Connect the diet to something the owner cares about and give one practical step.', 'Свяжи диету с тем, что важно хозяину, и дай один практичный шаг.'], ['Non-judgemental tone, explains a health reason (joints, heart, lifespan), and gives at least one concrete, doable step.', 'Тон без осуждения, объясняет причину для здоровья (суставы, сердце, продолжительность жизни) и даёт хотя бы один конкретный выполнимый шаг.'], ['Max clearly loves his food! Carrying 4 extra kilos puts pressure on his joints, so losing weight could keep him playing for more years. Let’s start by measuring his food and swapping treats for pieces of carrot.', 'Видно, что Макс очень любит поесть! Но 4 лишних килограмма нагружают его суставы, и снижение веса поможет ему дольше оставаться активным. Давайте начнём с того, чтобы отмерять корм и заменить лакомства кусочками моркови.'], [['joint', 'heart', 'health', 'longer', 'weight', 'kilo', 'kg', 'food', 'measure', 'treat', 'walk', 'let’s', "let's", 'together'], ['сустав', 'сердц', 'здоров', 'дольше', 'вес', 'килограм', 'кг', 'корм', 'отмер', 'лакомств', 'прогул', 'давайте', 'вместе']]),
      choice('cost', 'people', ['An owner cannot afford the surgery you recommend. What is the best approach?', 'Хозяин не может оплатить рекомендованную операцию. Как лучше поступить?'], [
        ['Discuss options honestly, including cheaper treatments and their risks', 'Честно обсудить варианты, включая более дешёвое лечение и его риски'],
        ['Refuse to treat the animal', 'Отказаться лечить животное'],
        ['Do the surgery anyway and bill them later', 'Всё равно провести операцию и выставить счёт потом'],
        ['Make them feel guilty so they find the money', 'Пристыдить, чтобы нашли деньги'],
        ['Tell them to look for advice online', 'Посоветовать поискать советы в интернете']
      ], ['Vets often work with limited budgets; honest options respect both the animal and the owner.', 'Ветеринары часто работают с ограниченным бюджетом хозяев; честные варианты уважают и животное, и владельца.'], ['Is there more than one way to help this animal?', 'Есть ли больше одного способа помочь этому животному?']),
      choice('zoonosis', 'analyze', ['A farmer’s cattle show signs of a disease that can pass to humans. What should you do?', 'У коров фермера признаки болезни, которая может передаваться людям. Что делать?'], [
        ['Advise protective measures and report it according to the rules', 'Рекомендовать защитные меры и сообщить о случае по установленным правилам'],
        ['Keep quiet to protect the farmer’s business', 'Промолчать, чтобы не навредить бизнесу фермера'],
        ['Suggest selling the cattle quickly', 'Посоветовать быстрее продать скот'],
        ['Treat it secretly', 'Лечить втайне'],
        ['Warn only the neighbours', 'Предупредить только соседей']
      ], ['Vets protect public health too: some animal diseases must be reported to stop outbreaks.', 'Ветеринары защищают и здоровье людей: о некоторых болезнях животных обязательно сообщают, чтобы не было вспышек.'], ['Who else could be at risk besides the animals?', 'Кто ещё, кроме животных, может оказаться под угрозой?']),
      choice('dosage', 'analyze', ['A medicine dose is 2 mg per kg of body weight. The cat weighs 4 kg. What is the dose?', 'Доза лекарства — 2 мг на кг массы тела. Кошка весит 4 кг. Какая нужна доза?'], [
        ['8 mg', '8 мг'],
        ['2 mg', '2 мг'],
        ['4 mg', '4 мг'],
        ['6 mg', '6 мг'],
        ['16 mg', '16 мг']
      ], ['2 mg × 4 kg = 8 mg. Dose calculations are routine — and double-checked every time.', '2 мг × 4 кг = 8 мг. Расчёт доз — рутинная задача, и её каждый раз перепроверяют.'], ['Multiply the dose per kilo by the weight.', 'Умножь дозу на килограмм на вес.']),
      open('puppy', 'solve', ['Name one thing a new puppy owner should do in the first month to keep it healthy, and explain why.', 'Назови одно, что владелец щенка должен сделать в первый месяц, чтобы он был здоров, и объясни зачем.'], ['In the first month...', 'В первый месяц...'], ['Think about prevention: what stops problems before they start?', 'Подумай о профилактике: что предотвращает проблемы до их появления?'], ['A specific preventive action (vaccination schedule, deworming, vet check-up, safe food, socialisation) with the health reason.', 'Конкретное профилактическое действие (прививки по графику, обработка от глистов, осмотр у ветеринара, правильный корм, социализация) и причина для здоровья.'], ['Start the vaccination schedule with a vet visit, because puppies have weak immunity and can catch dangerous diseases like parvovirus before they are protected.', 'Начать прививки по графику после визита к ветеринару, потому что у щенков слабый иммунитет и до вакцинации они могут заразиться опасными болезнями, например парвовирусом.'], [['vaccin', 'vet', 'worm', 'parasite', 'food', 'check', 'because', 'immun', 'disease', 'social', 'flea'], ['привив', 'вакцин', 'ветеринар', 'глист', 'паразит', 'корм', 'осмотр', 'потому', 'иммун', 'болезн', 'социализ', 'блох']]),
      choice('euthanasia', 'people', ['An old dog is suffering and treatment can no longer help. How should you approach the owner?', 'Старая собака страдает, и лечение уже не поможет. Как говорить с хозяином?'], [
        ['Gently explain all options, including humane euthanasia, and support their decision', 'Бережно объяснить все варианты, включая гуманную эвтаназию, и поддержать решение хозяина'],
        ['Push for an expensive surgery that will not help', 'Настаивать на дорогой операции, которая не поможет'],
        ['Decide for them to save them the pain', 'Решить за них, чтобы им не было больно'],
        ['Avoid the topic and give painkillers only', 'Обойти тему и дать только обезболивающее'],
        ['Tell them to decide quickly because the clinic is busy', 'Попросить решить быстрее, потому что в клинике очередь']
      ], ['End-of-life care is part of the job; honesty and compassion help owners make a decision they can live with.', 'Забота в конце жизни — часть работы; честность и сострадание помогают хозяевам принять решение, с которым они смогут жить.'], ['What does the owner need most in this moment?', 'Что сейчас нужнее всего хозяину?']),
      choice('triage', 'pressure', ['Three animals arrive at once. Who is seen first?', 'Одновременно привезли трёх животных. Кого осматривают первым?'], [
        ['A dog hit by a car with pale gums', 'Собаку, сбитую машиной, с бледными дёснами'],
        ['A cat limping on one paw', 'Кошку, которая хромает на одну лапу'],
        ['A rabbit booked for vaccination', 'Кролика, записанного на прививку'],
        ['Whoever arrived first', 'Того, кого привезли первым'],
        ['The animal with the most worried owner', 'Животное с самым взволнованным хозяином']
      ], ['Pale gums after trauma can mean internal bleeding and shock — life-threatening within minutes.', 'Бледные дёсны после травмы могут означать внутреннее кровотечение и шок — угрозу жизни в течение минут.'], ['Which sign points to a problem inside the body you cannot see?', 'Какой признак указывает на невидимую проблему внутри организма?']),
      open('vetnote', 'analyze', ['Write a short, objective note after an examination.', 'Напиши короткую объективную запись после осмотра.'], ['Dog, 5 y...', 'Собака, 5 лет...'], ['Record facts and numbers, then one clear plan.', 'Запиши факты и цифры, а затем один понятный план.'], ['Objective facts with numbers (age, weight and change), relevant history, and a clear plan or recommendation; no judgement of the owner.', 'Объективные факты с цифрами (возраст, вес и его изменение), важный анамнез и понятный план или рекомендация; без оценок хозяина.'], ['Dog, 5 y, 32 kg (+4 kg in 12 months). Owner reports table scraps daily and 10-minute walks. Plan: reduce daily calories, walks to 30 min, weigh again in 4 weeks.', 'Собака, 5 лет, 32 кг (+4 кг за 12 месяцев). По словам хозяина, получает еду со стола ежедневно, гуляет по 10 минут. План: снизить калорийность, прогулки до 30 минут, повторное взвешивание через 4 недели.'], [['kg', '32', '28', '4', 'year', 'walk', 'scraps', 'plan', 'weigh', 'reduce', 'weeks', 'minutes'], ['кг', '32', '28', '4', 'лет', 'год', 'прогул', 'стол', 'план', 'взвес', 'сниз', 'недел', 'минут']], ['Dog, 5 years, 32 kg (28 kg a year ago), eats table scraps, walks 10 minutes a day.', 'Собака, 5 лет, 32 кг (год назад — 28 кг), ест еду со стола, гуляет по 10 минут в день.'])
    ]
  }
];
