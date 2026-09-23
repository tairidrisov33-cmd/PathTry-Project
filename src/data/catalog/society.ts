import { choice, open, type ProfessionDef } from '@/data/catalog/types';

export const society: ProfessionDef[] = [
  {
    slug: 'lawyer', category: 'society', color: 'gold',
    title: ['Lawyer', 'Юрист'],
    description: ['Find the relevant facts, build a reasoned argument, and help people move forward.', 'Находит важные факты, строит аргументы и помогает людям двигаться дальше.'],
    reality: ['Law is reading-heavy: you sort evidence, spot ambiguity, write clearly, and negotiate under pressure.', 'Право — это много чтения: разбирать доказательства, замечать неоднозначность, ясно писать и вести переговоры под давлением.'],
    subjects: [['English / Literature', 'Русский язык и литература'], ['History', 'История'], ['Social studies / Economics', 'Обществознание и экономика']],
    exams: [['UNT (Kazakhstan): World History + Fundamentals of Law', 'ЕНТ: всемирная история + основы права'], ['LSAT / LNAT', 'LSAT / LNAT'], ['A-Levels English & History', 'A-Levels: английский и история'], ['IB English & History', 'IB: английский и история'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Law', 'Юриспруденция'], ['Politics', 'Политология'], ['International Relations', 'Международные отношения']],
    nextSteps: [['Read a short court judgment and summarise the decision.', 'Прочитай короткое судебное решение и перескажи его.'], ['Join a debate club or Model United Nations.', 'Вступи в дебатный клуб или Model United Nations.'], ['Ask a lawyer how much of their week is writing.', 'Спроси юриста, сколько времени в неделю он пишет документы.']],
    tasks: [
      choice('evidence', 'analyze', ['Which fact is the strongest evidence that a contract was accepted?', 'Какой факт сильнее всего подтверждает, что договор был принят?'], [
        ['A signed copy was returned', 'Вернули подписанный экземпляр'],
        ['A friend heard about the deal', 'Друг слышал о сделке'],
        ['Someone liked a post about it', 'Кто-то лайкнул пост об этом'],
        ['The price seemed fair to both sides', 'Цена казалась справедливой обеим сторонам'],
        ['The parties had lunch together afterwards', 'Стороны потом вместе пообедали']
      ], ['Strong arguments use facts that directly connect to the legal question and can be proven.', 'Сильный аргумент опирается на факт, который напрямую связан с юридическим вопросом и может быть доказан.'], ['Which fact could you show a judge as a document?', 'Какой факт можно показать судье в виде документа?']),
      choice('clarity', 'people', ['A client says, “I want justice.” What should you do first?', 'Клиент говорит: «Я хочу справедливости». Что сделать сначала?'], [
        ['Ask what happened and what outcome they actually need', 'Спросить, что произошло и какой результат ему действительно нужен'],
        ['Promise that you will win', 'Пообещать победу'],
        ['Quote a complex law to impress them', 'Процитировать сложный закон, чтобы впечатлить'],
        ['Tell them the case is easy', 'Сказать, что дело простое'],
        ['Start writing a lawsuit immediately', 'Сразу начать писать иск']
      ], ['Lawyers translate a broad feeling into facts, goals, risks, and possible routes.', 'Юрист превращает общее чувство в факты, цели, риски и возможные пути.'], ['What does “justice” mean for this particular client?', 'Что значит «справедливость» для этого конкретного клиента?']),
      open('argument', 'analyze', ['Give one clear, reasoned argument for why a school should offer a quiet study room.', 'Приведи один ясный обоснованный аргумент, почему в школе должна быть тихая комната для занятий.'], ['The school should offer it because...', 'Школе стоит это сделать, потому что...'], ['A strong argument has a claim, a reason, and ideally evidence or an example.', 'В сильном аргументе есть утверждение, причина и, желательно, доказательство или пример.'], ['States a clear claim, gives a specific reason linked to students’ needs, and supports it with evidence, an example, or a likely effect.', 'Чёткое утверждение, конкретная причина, связанная с потребностями учеников, и подкрепление фактом, примером или вероятным результатом.'], ['The school should offer a quiet room because many students share noisy homes and have nowhere to concentrate; giving them one calm space after classes could improve homework completion and exam preparation.', 'Школе стоит открыть тихую комнату, потому что у многих учеников дома шумно и негде сосредоточиться; одно спокойное место после уроков может помочь им лучше делать домашние задания и готовиться к экзаменам.'], [['because', 'student', 'focus', 'concentrat', 'noise', 'quiet', 'home', 'study', 'exam', 'grade', 'help', 'space'], ['потому', 'ученик', 'сосредоточ', 'концентр', 'шум', 'тих', 'дом', 'учёб', 'учеб', 'экзамен', 'оценк', 'помо']]),
      choice('ambiguity', 'analyze', ['A client uses a word that could mean two different things. What should you do?', 'Клиент использует слово, у которого два возможных значения. Что делать?'], [
        ['Ask a clarifying question and write the answer down', 'Задать уточняющий вопрос и записать ответ'],
        ['Pick the meaning that helps the case', 'Выбрать значение, выгодное для дела'],
        ['Skip the word', 'Пропустить это слово'],
        ['Assume it is obvious', 'Решить, что всё очевидно'],
        ['Look it up in a dictionary and decide alone', 'Посмотреть в словаре и решить самому']
      ], ['Legal work depends on precise language and a clear record of what people meant.', 'Юридическая работа требует точного языка и чёткой записи того, что имели в виду люди.'], ['Who is the only person who knows what they meant?', 'Кто единственный знает, что он имел в виду?']),
      choice('clause', 'analyze', ['A lease says: “The tenant may keep a pet with the landlord’s written consent.” The landlord said “sure” on the phone. What is the risk?', 'В договоре аренды: «Арендатор может держать животное с письменного согласия арендодателя». Арендодатель сказал «конечно» по телефону. В чём риск?'], [
        ['The written-consent condition may not be met — get it in writing', 'Условие о письменном согласии может быть не выполнено — нужно получить его письменно'],
        ['No risk — a verbal “yes” is the same', 'Никакого — устное «да» то же самое'],
        ['Pets are completely forbidden', 'Животные полностью запрещены'],
        ['The landlord is now obliged to buy the pet food', 'Теперь арендодатель обязан покупать корм'],
        ['The whole contract is now invalid', 'Теперь весь договор недействителен']
      ], ['Lawyers read every condition literally: if the contract requires writing, a phone call may not be enough.', 'Юристы читают каждое условие буквально: если договор требует письменной формы, звонка может не хватить.'], ['Which exact word in the clause matters most?', 'Какое именно слово в пункте важнее всего?']),
      choice('conflict', 'people', ['You are asked to act against a company owned by your close friend. What should you do?', 'Тебя просят вести дело против компании, которой владеет твой близкий друг. Что делать?'], [
        ['Disclose the conflict of interest and most likely decline', 'Сообщить о конфликте интересов и, скорее всего, отказаться'],
        ['Take the case and say nothing', 'Взяться за дело и промолчать'],
        ['Ask your friend for inside information', 'Попросить у друга внутреннюю информацию'],
        ['Take it and quietly go easy on your friend', 'Взяться и тихо подыгрывать другу'],
        ['Let your friend decide whether you take it', 'Пусть друг решит, браться ли тебе']
      ], ['Clients must be able to trust that their lawyer’s loyalty is undivided.', 'Клиент должен быть уверен, что юрист полностью на его стороне.'], ['Could the client fully trust you in this situation?', 'Сможет ли клиент полностью доверять тебе в такой ситуации?']),
      open('summary', 'people', ['Summarise a disagreement you know in one neutral sentence, without taking sides.', 'Опиши знакомый тебе спор одним нейтральным предложением, не занимая ничью сторону.'], ['The two sides disagree about...', 'Стороны не согласны в том, что...'], ['Name both positions fairly and what exactly they disagree about.', 'Честно назови обе позиции и суть разногласия.'], ['Names both sides and the specific point of disagreement in balanced, neutral words — no loaded language or verdict.', 'Называет обе стороны и конкретный предмет спора сбалансированно и нейтрально — без оценочных слов и вердикта.'], ['Neighbours disagree about the new playground: some want it open until 10 pm for working families, while others want it closed at 8 pm to reduce evening noise.', 'Соседи спорят о новой площадке: одни хотят, чтобы она работала до 22:00 для работающих семей, другие — чтобы закрывалась в 20:00 из-за вечернего шума.'], [['disagree', 'while', 'others', 'some', 'want', 'side', 'whether', 'both', 'one', 'argue', 'think'], ['спор', 'не соглас', 'одни', 'другие', 'хотят', 'сторон', 'ли ', 'обе', 'счита', 'тогда как', 'а другие']]),
      choice('negotiate', 'people', ['In a negotiation the other side makes an offer. What should you do before responding?', 'На переговорах другая сторона сделала предложение. Что сделать, прежде чем отвечать?'], [
        ['Understand their interests and check your client’s priorities', 'Понять их интересы и свериться с приоритетами клиента'],
        ['Accept immediately to seem friendly', 'Сразу согласиться, чтобы казаться дружелюбным'],
        ['Reject it loudly to show strength', 'Громко отвергнуть, чтобы показать силу'],
        ['Walk out of the room', 'Выйти из комнаты'],
        ['Counter with double your client’s real demand', 'Ответить вдвое большим требованием, чем реально нужно клиенту']
      ], ['Good negotiators look for interests behind positions — that is where agreements are found.', 'Хорошие переговорщики ищут интересы за позициями — там и находятся договорённости.'], ['Why might they be offering exactly this?', 'Почему они предлагают именно это?']),
      choice('deadline', 'pressure', ['A court filing is due tomorrow and your client is not answering. What do you do?', 'Документы в суд нужно подать завтра, а клиент не отвечает. Что делать?'], [
        ['Keep trying all agreed channels, record your attempts, and prepare everything you can', 'Продолжать связываться по всем согласованным каналам, фиксировать попытки и подготовить всё возможное'],
        ['Let the deadline pass — it is the client’s fault', 'Пропустить срок — клиент сам виноват'],
        ['Guess the client’s answers and file', 'Додумать ответы клиента и подать'],
        ['Hand the case to a random colleague', 'Передать дело случайному коллеге'],
        ['Wait until the client calls back', 'Ждать, пока клиент перезвонит']
      ], ['Deadlines in law are strict; professionals act early, document everything, and never invent a client’s instructions.', 'Процессуальные сроки строгие; профессионал действует заранее, всё фиксирует и никогда не придумывает указания клиента.'], ['What can you do now that does not need the client’s decision?', 'Что можно сделать уже сейчас без решения клиента?']),
      open('clientmail', 'people', ['In two plain-language sentences, tell a client that the court hearing has been postponed and what happens next.', 'Двумя простыми предложениями сообщи клиенту, что заседание суда перенесли, и что будет дальше.'], ['Your hearing...', 'Ваше заседание...'], ['Include the new date, what it means for them, and whether they need to do anything.', 'Укажи новую дату, что это значит для клиента и нужно ли ему что-то делать.'], ['Clear, jargon-free message with the change (12 May → 3 June), what it means, and a next step or reassurance.', 'Понятное сообщение без юридических терминов: перенос (12 мая → 3 июня), что это значит и следующий шаг или успокоение.'], ['Your hearing has been moved from 12 May to 3 June; nothing about your case has changed. We will meet on 27 May to prepare, so please keep that afternoon free.', 'Ваше заседание перенесли с 12 мая на 3 июня; по существу в деле ничего не изменилось. Встретимся 27 мая, чтобы подготовиться, — пожалуйста, оставьте этот день свободным.'], [['hearing', 'moved', 'postponed', '3 june', 'june', '12 may', 'next', 'prepare', 'meet', 'nothing', 'need', 'please'], ['заседан', 'перенес', 'перенос', '3 июня', 'июн', '12 мая', 'далее', 'подготов', 'встрет', 'ничего', 'нужно', 'пожалуйста']], ['The hearing moved from 12 May to 3 June.', 'Заседание перенесли с 12 мая на 3 июня.'])
    ]
  },
  {
    slug: 'teacher', category: 'society', color: 'teal',
    title: ['Teacher', 'Учитель'],
    description: ['Make ideas understandable, notice where learners are stuck, and build confidence.', 'Делает знания понятными, замечает, где ученики застряли, и поддерживает их уверенность.'],
    reality: ['Teaching is planning, explaining, listening, adapting, giving feedback, and managing many needs at once.', 'Преподавание — это планирование, объяснение, умение слушать, адаптация, обратная связь и много разных потребностей одновременно.'],
    subjects: [['English / Literature', 'Русский язык и литература'], ['Mathematics', 'Математика'], ['A subject you love', 'Любимый предмет']],
    exams: [['UNT (Kazakhstan): subjects of your specialisation', 'ЕНТ: профильные предметы специальности'], ['Teacher training assessment', 'Экзамены для педагогического вуза'], ['A-Levels / IB subject results', 'Результаты A-Levels / IB по предмету'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Education', 'Педагогика'], ['Subject Education', 'Педагогическое образование по предмету'], ['Child Development', 'Психология развития']],
    nextSteps: [['Tutor or mentor someone younger.', 'Позанимайся с кем-то младше тебя.'], ['Explain one difficult idea in two different ways.', 'Объясни одну сложную идею двумя разными способами.'], ['Observe a lesson and notice how feedback changes participation.', 'Понаблюдай за уроком и заметь, как обратная связь меняет активность учеников.']],
    tasks: [
      choice('misconception', 'analyze', ['A student gets the same maths step wrong twice. What is most useful first?', 'Ученик дважды ошибся в одном и том же шаге задачи. Что полезнее всего сделать сначала?'], [
        ['Ask them to explain their thinking out loud', 'Попросить объяснить ход мыслей вслух'],
        ['Tell them to be more careful', 'Сказать быть внимательнее'],
        ['Give them a harder problem', 'Дать задачу посложнее'],
        ['Show the correct answer and move on', 'Показать правильный ответ и идти дальше'],
        ['Give them ten more of the same problems', 'Дать ещё десять таких же задач']
      ], ['A learner’s explanation reveals the misconception, so the teacher can choose the right next explanation.', 'Объяснение ученика показывает, в чём ошибочная идея, и помогает выбрать следующий способ объяснения.'], ['Do you know yet why the mistake happens?', 'Ты уже знаешь, почему возникает ошибка?']),
      choice('feedback', 'people', ['Which piece of feedback on an essay is most useful?', 'Какая обратная связь на сочинение полезнее всего?'], [
        ['“Your opening claim is clear; add evidence in the second paragraph.”', '«Главная мысль во вступлении ясная; добавь доказательство во второй абзац»'],
        ['“Good job!”', '«Молодец!»'],
        ['“Try harder next time.”', '«В следующий раз старайся больше»'],
        ['“This is wrong.”', '«Это неправильно»'],
        ['“7/10”', '«7 из 10»']
      ], ['Specific feedback names what works and one concrete next step.', 'Конкретная обратная связь называет, что уже получилось, и один понятный следующий шаг.'], ['Which comment tells the student exactly what to do next?', 'Какой комментарий говорит ученику, что именно делать дальше?']),
      open('explain', 'people', ['Explain a difficult idea to a 12-year-old using one everyday comparison.', 'Объясни сложную идею двенадцатилетнему ребёнку через одно бытовое сравнение.'], ['Imagine that...', 'Представь, что...'], ['Name the idea, then connect it to something a child sees every day.', 'Назови идею и свяжи её с тем, что ребёнок видит каждый день.'], ['Names the concept, uses a fitting everyday comparison, and connects the comparison back to the idea accurately.', 'Называет понятие, использует подходящее бытовое сравнение и точно связывает сравнение с идеей.'], ['Electricity in a wire is like water in a pipe: the battery is the pump pushing it, and a thin wire is like a narrow pipe, so less flows through.', 'Электрический ток в проводе похож на воду в трубе: батарейка — это насос, который её толкает, а тонкий провод — как узкая труба: через него проходит меньше.'], [['like', 'imagine', 'as if', 'similar', 'think of', 'just as', 'same way', 'is a'], ['как ', 'представь', 'словно', 'похож', 'будто', 'так же', 'это как']]),
      choice('inclusive', 'people', ['One student rarely speaks during group work. What could you try?', 'Один ученик почти не говорит во время групповой работы. Что можно попробовать?'], [
        ['Offer different ways to contribute and check in privately', 'Предложить разные способы участия и поговорить наедине'],
        ['Assume they do not care', 'Решить, что ему всё равно'],
        ['Make them present to the whole class tomorrow', 'Заставить завтра выступить перед классом'],
        ['Move them to work alone permanently', 'Навсегда перевести на индивидуальную работу'],
        ['Lower their grade for participation', 'Снизить оценку за участие']
      ], ['Inclusive teaching creates several ways to participate and looks for context without labelling a learner.', 'Инклюзивное обучение даёт несколько способов участвовать и ищет причину, не навешивая ярлыков.'], ['What might make speaking hard for this student?', 'Что может мешать этому ученику говорить?']),
      choice('check', 'analyze', ['You have two minutes to check whether the whole class understood. What works best?', 'Есть две минуты, чтобы проверить, понял ли весь класс. Что лучше всего сработает?'], [
        ['Everyone answers one question on cards or mini-boards at the same time', 'Все одновременно отвечают на один вопрос на карточках или мини-досках'],
        ['Ask “Any questions?”', 'Спросить: «Есть вопросы?»'],
        ['Ask the strongest student', 'Спросить самого сильного ученика'],
        ['Wait for the end-of-term test', 'Дождаться итоговой контрольной'],
        ['Assume they understood if nobody complains', 'Считать, что поняли, раз никто не жалуется']
      ], ['Quick whole-class checks show who needs help now, not weeks later.', 'Быстрая проверка всего класса показывает, кому нужна помощь сейчас, а не через несколько недель.'], ['Which option gets an answer from every single student?', 'Какой вариант даёт ответ от каждого ученика?']),
      choice('behaviour', 'pressure', ['Two students keep chatting while you explain. What is the best first step?', 'Двое учеников болтают, пока ты объясняешь. Какой первый шаг лучше?'], [
        ['Calmly move closer or give a quiet reminder, then talk privately if it continues', 'Спокойно подойти ближе или тихо напомнить, а если продолжится — поговорить отдельно'],
        ['Shout at them in front of the class', 'Накричать при всём классе'],
        ['Send them out immediately', 'Сразу выгнать из класса'],
        ['Punish the whole class', 'Наказать весь класс'],
        ['Ignore it for the rest of the term', 'Не обращать внимания до конца четверти']
      ], ['Low-key interventions keep the lesson going and protect relationships; escalation comes later if needed.', 'Мягкие меры сохраняют ход урока и отношения; более жёсткие — только при необходимости.'], ['What is the smallest action that could solve it?', 'Какое самое маленькое действие может это решить?']),
      open('plan', 'analyze', ['Write one observable learning goal for a 20-minute lesson.', 'Напиши одну наблюдаемую цель для 20-минутного урока.'], ['By the end, students can...', 'К концу урока ученики смогут...'], ['Use an action verb you could see or check (explain, solve, compare), not “understand”.', 'Используй глагол действия, который можно увидеть или проверить (объяснить, решить, сравнить), а не «понять».'], ['A specific, checkable goal with an action verb and topic, ideally with a measurable standard.', 'Конкретная проверяемая цель с глаголом действия и темой, желательно с измеримым критерием.'], ['By the end, students can calculate the area of a rectangle and explain in one sentence why we multiply length by width.', 'К концу урока ученики смогут вычислить площадь прямоугольника и одним предложением объяснить, почему длину умножают на ширину.'], [['by the end', 'students', 'can', 'will', 'solve', 'explain', 'calculate', 'compare', 'identify', 'write', 'name'], ['к концу', 'ученик', 'смогут', 'смогут', 'реш', 'объясн', 'вычисл', 'сравн', 'определ', 'напис', 'назв']]),
      choice('parent', 'people', ['A parent is angry about their child’s low grade. What is the best approach?', 'Родитель недоволен низкой оценкой ребёнка. Как лучше поступить?'], [
        ['Listen, show the criteria and the actual work, and agree on next steps', 'Выслушать, показать критерии и саму работу и договориться о следующих шагах'],
        ['Defend yourself and end the conversation', 'Защищаться и закончить разговор'],
        ['Raise the grade to keep the peace', 'Повысить оценку, чтобы не ссориться'],
        ['Avoid the parent until they calm down', 'Избегать родителя, пока не успокоится'],
        ['Blame the student in front of the parent', 'Обвинить ученика при родителе']
      ], ['Transparent criteria and a shared plan turn conflict into cooperation for the child’s benefit.', 'Понятные критерии и общий план превращают конфликт в сотрудничество ради ребёнка.'], ['What do you and the parent both want?', 'Чего хотите и ты, и родитель?']),
      choice('pace', 'solve', ['Half the class has finished the task; the other half is struggling. What do you do?', 'Половина класса уже сделала задание, а другая половина ещё не справляется. Что делать?'], [
        ['Give finishers an extension task and support the others in a small group', 'Дать тем, кто закончил, задание посложнее, а остальным помочь в небольшой группе'],
        ['Move on to the next topic', 'Перейти к следующей теме'],
        ['Re-explain everything to the whole class', 'Заново объяснить всё всему классу'],
        ['Let the finishers leave early', 'Отпустить тех, кто закончил, пораньше'],
        ['Collect the work and grade it now', 'Собрать работы и сразу поставить оценки']
      ], ['Differentiation keeps everyone learning at the right level of challenge.', 'Дифференциация позволяет каждому учиться на подходящем уровне сложности.'], ['How can both groups keep learning at the same time?', 'Как обеим группам продолжать учиться одновременно?']),
      open('deepq', 'analyze', ['Write one question that checks whether students understand fractions — not just remember a rule.', 'Напиши вопрос, который проверяет, понимают ли ученики дроби, а не просто помнят правило.'], ['Which is bigger...', 'Что больше...'], ['Good understanding questions ask “why” or apply the idea in a new situation.', 'Вопросы на понимание спрашивают «почему» или просят применить идею в новой ситуации.'], ['A question that requires reasoning, comparison, explanation, or applying fractions to a new situation — not recall of a rule.', 'Вопрос, требующий рассуждения, сравнения, объяснения или применения дробей в новой ситуации, — а не воспроизведения правила.'], ['Which is bigger, 3/4 or 4/5 of the same pizza — and how could you explain your answer with a drawing?', 'Что больше — 3/4 или 4/5 одной и той же пиццы — и как объяснить ответ с помощью рисунка?'], [['why', 'explain', 'bigger', 'smaller', 'which', 'how', 'draw', 'compare', 'pizza', 'half', '/'], ['почему', 'объясн', 'больше', 'меньше', 'какая', 'как ', 'нарису', 'сравн', 'пицц', 'половин', '/']])
    ]
  },
  {
    slug: 'entrepreneur', category: 'society', color: 'lilac',
    title: ['Entrepreneur', 'Предприниматель'],
    description: ['Find a real problem, test an idea, and make thoughtful decisions with limited information.', 'Находит реальную проблему, проверяет идеи и принимает решения в условиях неопределённости.'],
    reality: ['Entrepreneurship means talking to people, prioritising, handling uncertainty, and learning quickly when an idea changes.', 'Предпринимательство — это разговоры с людьми, приоритеты, риск и быстрые выводы, когда идея меняется.'],
    subjects: [['Mathematics', 'Математика'], ['Economics', 'Экономика'], ['English', 'Английский язык']],
    exams: [['UNT (Kazakhstan): Mathematics + Geography', 'ЕНТ: математика + география'], ['SAT / ACT', 'SAT / ACT'], ['A-Levels Business & Mathematics', 'A-Levels: бизнес и математика'], ['IB Business Management', 'IB: управление бизнесом'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Business', 'Бизнес'], ['Economics', 'Экономика'], ['Innovation & Entrepreneurship', 'Инновации и предпринимательство'], ['Marketing', 'Маркетинг']],
    nextSteps: [['Interview three people about one problem they share.', 'Поговори с тремя людьми об общей для них проблеме.'], ['Create the smallest version of a useful solution.', 'Сделай самую маленькую версию полезного решения.'], ['Keep a simple record of what changed after feedback.', 'Записывай, что меняется после обратной связи.']],
    tasks: [
      choice('problem', 'analyze', ['You have an idea for a study app. What should you learn first?', 'У тебя идея приложения для учёбы. Что нужно выяснить в первую очередь?'], [
        ['Whether students really have this problem and how they solve it now', 'Есть ли у студентов эта проблема на самом деле и как они решают её сейчас'],
        ['What colour the logo should be', 'Какого цвета должен быть логотип'],
        ['How to make a 40-slide pitch deck', 'Как сделать презентацию на 40 слайдов'],
        ['Which office to rent', 'Какой офис арендовать'],
        ['How to register a company abroad', 'Как зарегистрировать компанию за границей']
      ], ['Strong ideas start with a real problem and evidence from the people affected.', 'Сильная идея начинается с реальной проблемы и фактов от людей, которых она касается.'], ['What would make this idea pointless, no matter how well it is built?', 'Что сделает идею бесполезной, как бы хорошо её ни сделали?']),
      choice('priority', 'solve', ['You have time to improve only one part of a small project. What should guide you?', 'Есть время улучшить только одну часть небольшого проекта. Чем руководствоваться?'], [
        ['The biggest user need and the project goal', 'Самой важной потребностью пользователей и целью проекта'],
        ['Your favourite detail', 'Любимой деталью'],
        ['The most technically complex option', 'Самым технически сложным вариантом'],
        ['A random online opinion', 'Случайным мнением из интернета'],
        ['What competitors did last week', 'Тем, что конкуренты сделали на прошлой неделе']
      ], ['Prioritising means spending limited time where the value is clearest.', 'Расставлять приоритеты — значит тратить ограниченное время туда, где польза яснее всего.'], ['Which improvement would users notice and care about most?', 'Какое улучшение пользователи заметят и оценят больше всего?']),
      open('pitch', 'create', ['Explain a useful idea in one sentence: who is it for, and what problem does it solve?', 'Объясни полезную идею одним предложением: для кого она и какую проблему решает?'], ['For ... who ..., this helps...', 'Для ..., которые ..., это помогает...'], ['Name a specific audience, their pain, and how your idea helps.', 'Назови конкретную аудиторию, её проблему и как твоя идея помогает.'], ['Specific target audience, a concrete problem, and how the idea solves it — in one clear sentence.', 'Конкретная аудитория, конкретная проблема и способ её решения — в одном ясном предложении.'], ['For students who forget which homework is due, a bot in the class chat sends a reminder the evening before each deadline.', 'Для школьников, которые забывают о сроках домашних заданий, бот в классном чате присылает напоминание вечером накануне каждого дедлайна.'], [['for', 'who', 'help', 'problem', 'student', 'people', 'so that', 'app', 'service', 'save', 'instead'], ['для', 'котор', 'помога', 'проблем', 'студент', 'школьник', 'люд', 'чтобы', 'приложен', 'сервис', 'экономит', 'вместо']]),
      choice('feedback', 'people', ['Someone says they would never use your idea. What is a productive response?', 'Кто-то говорит, что никогда не стал бы пользоваться твоей идеей. Как ответить продуктивно?'], [
        ['Ask what they do instead and what would change their mind', 'Спросить, что он делает вместо этого и что могло бы изменить его мнение'],
        ['Argue until they agree', 'Спорить, пока не согласится'],
        ['Ignore all criticism', 'Игнорировать любую критику'],
        ['Give up on the idea immediately', 'Сразу отказаться от идеи'],
        ['Offer them money to use it', 'Предложить деньги за использование']
      ], ['Specific objections reveal a better problem, audience, or version of the idea.', 'Конкретные возражения помогают найти более точную проблему, аудиторию или версию идеи.'], ['What can you learn from a “no”?', 'Что можно узнать из «нет»?']),
      choice('metric', 'analyze', ['Which number best shows that people truly value your app?', 'Какая цифра лучше всего показывает, что людям действительно нужно твоё приложение?'], [
        ['How many users come back and use it every week', 'Сколько пользователей возвращаются и пользуются им каждую неделю'],
        ['The number of downloads', 'Количество скачиваний'],
        ['Likes on your social media posts', 'Лайки под постами в соцсетях'],
        ['One-time visits to the website', 'Разовые заходы на сайт'],
        ['The number of features you built', 'Количество сделанных функций']
      ], ['Retention shows real value; downloads and likes can be curiosity — so-called vanity metrics.', 'Удержание показывает реальную ценность; скачивания и лайки могут быть просто любопытством — «метрики тщеславия».'], ['Which number is hard to fake with a good advert?', 'Какую цифру трудно «накрутить» удачной рекламой?']),
      choice('pricing', 'analyze', ['It costs you 300 to make a product. Competitors sell at 1,000, and customers say they would pay about 700. What is a sensible first step?', 'Производство товара стоит тебе 300. Конкуренты продают за 1000, а покупатели говорят, что заплатили бы около 700. Какой разумный первый шаг?'], [
        ['Test a price around 700 with real customers', 'Проверить цену около 700 на реальных покупателях'],
        ['Sell at 250 to beat everyone', 'Продавать за 250, чтобы обойти всех'],
        ['Charge 2,000 to look premium', 'Поставить 2000, чтобы выглядеть премиально'],
        ['Copy the competitors’ price without thinking', 'Не думая скопировать цену конкурентов'],
        ['Give it away free forever', 'Навсегда раздавать бесплатно']
      ], ['Price sits between your cost and customers’ willingness to pay — and what people say must be tested with real purchases.', 'Цена находится между себестоимостью и готовностью платить, а слова покупателей нужно проверять реальными покупками.'], ['Which price covers your costs and matches what customers value?', 'Какая цена покрывает затраты и соответствует ценности для покупателей?']),
      open('risk', 'solve', ['Name one assumption your project depends on and how you could test it cheaply.', 'Назови одно предположение, от которого зависит проект, и дешёвый способ его проверить.'], ['I assume that..., so I could test it by...', 'Я предполагаю, что..., поэтому проверю это так...'], ['Pick the belief that would sink the project if it were false.', 'Выбери убеждение, которое погубит проект, если окажется ложным.'], ['States a specific, risky assumption and a concrete, low-cost test with a way to measure the result.', 'Называет конкретное рискованное предположение и конкретный дешёвый тест со способом измерить результат.'], ['I assume parents will pay for weekend coding classes, so I will post one class with a sign-up form in two school chats and see if 10 families register within a week.', 'Я предполагаю, что родители готовы платить за занятия по программированию по выходным, поэтому размещу анонс с формой записи в двух школьных чатах и посмотрю, запишутся ли 10 семей за неделю.'], [['assume', 'test', 'check', 'ask', 'survey', 'post', 'sign', 'if', 'see', 'week', 'cheap', 'people', 'pay'], ['предполага', 'провер', 'тест', 'спрош', 'опрос', 'размещ', 'запис', 'если', 'посмотр', 'недел', 'дёшев', 'дешев', 'люд', 'заплат']]),
      choice('cofounder', 'people', ['Your co-founder disagrees with you about the product direction. What is the best way forward?', 'Сооснователь не согласен с тобой насчёт направления продукта. Как лучше поступить?'], [
        ['Agree on the goal and design a small test to decide with evidence', 'Договориться о цели и придумать небольшой тест, чтобы решить на основе данных'],
        ['Split up the company immediately', 'Сразу разделить компанию'],
        ['Let friends vote on it', 'Устроить голосование среди друзей'],
        ['Secretly build your version', 'Тайно сделать свой вариант'],
        ['Avoid the topic and hope it passes', 'Избегать темы и надеяться, что само пройдёт']
      ], ['Disagreements are normal; turning opinions into testable questions keeps the team together.', 'Разногласия — это нормально; если превратить мнения в проверяемый вопрос, команда сохранится.'], ['How could data, not ego, settle this?', 'Как решить спор с помощью данных, а не самолюбия?']),
      choice('cash', 'pressure', ['Your startup will run out of money in two months. What is the most responsible move?', 'Через два месяца у стартапа закончатся деньги. Какой шаг самый ответственный?'], [
        ['Cut non-essential spending and focus on what brings revenue fastest', 'Сократить необязательные расходы и сосредоточиться на том, что быстрее принесёт выручку'],
        ['Hire more people to grow faster', 'Нанять ещё людей, чтобы расти быстрее'],
        ['Launch an expensive advertising campaign', 'Запустить дорогую рекламную кампанию'],
        ['Ignore it and keep building features', 'Не думать об этом и продолжать делать функции'],
        ['Borrow from friends without a plan', 'Занять у друзей без плана']
      ], ['Runway is survival: founders extend it by cutting costs and chasing the quickest proven revenue.', 'Запас денег — это выживание: основатели продлевают его, сокращая расходы и добиваясь самой быстрой подтверждённой выручки.'], ['What keeps the company alive longest?', 'Что дольше всего сохранит компанию живой?']),
      open('interviewq', 'people', ['Write one question for a potential customer that does not push them to say “yes, I would use it”.', 'Напиши один вопрос потенциальному клиенту, который не подталкивает его ответить «да, я бы пользовался».'], ['Tell me about the last time...', 'Расскажи, как в последний раз...'], ['Ask about past behaviour and real situations, not opinions about your idea.', 'Спрашивай о прошлом поведении и реальных ситуациях, а не о мнении про твою идею.'], ['An open question about the person’s real past behaviour or current solution, not mentioning or promoting the idea, not hypothetical.', 'Открытый вопрос о реальном прошлом поведении человека или его текущем решении, без упоминания или рекламы идеи и без гипотетики.'], ['Tell me about the last time you forgot a homework deadline — what happened and what did you do about it?', 'Расскажи, как в последний раз ты забыл(а) о сроке домашнего задания — что произошло и что ты сделал(а)?'], [['last time', 'tell me', 'how do you', 'currently', 'what do you', 'when', 'what happened', 'usually', '?'], ['в последний раз', 'расскажи', 'как ты', 'сейчас', 'что ты', 'когда', 'что произошло', 'обычно', '?']])
    ]
  }
];
