import { choice, open, type ProfessionDef } from '@/data/catalog/types';

export const creative: ProfessionDef[] = [
  {
    slug: 'designer', category: 'creative', color: 'blue',
    title: ['Designer', 'Дизайнер'],
    description: ['Make complex things feel clear, useful, and human through visual thinking.', 'Делает сложные вещи понятными, полезными и человечными.'],
    reality: ['Designers ask many questions, make rough versions, take feedback, and solve constraints with taste and logic.', 'Дизайнеры задают много вопросов, делают черновики, принимают обратную связь и решают ограничения вкусом и логикой.'],
    subjects: [['Art / Design', 'Искусство и дизайн'], ['English', 'Английский язык'], ['Technology', 'Технологии']],
    exams: [['UNT (Kazakhstan) + creative exams', 'ЕНТ + творческие экзамены'], ['Portfolio review', 'Просмотр портфолио'], ['A-Levels Art & Design', 'A-Levels: искусство и дизайн'], ['IB Visual Arts', 'IB: визуальное искусство'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Graphic Design', 'Графический дизайн'], ['UX / Product Design', 'UX / продуктовый дизайн'], ['Industrial Design', 'Промышленный дизайн']],
    nextSteps: [['Redesign one confusing everyday object or screen.', 'Переделай один непонятный предмет или экран.'], ['Build a small portfolio that shows process, not just final images.', 'Собери портфолио с процессом, а не только с финальными картинками.'], ['Ask someone to use your design while you observe silently.', 'Попроси кого-то воспользоваться твоим дизайном и молча понаблюдай.']],
    tasks: [
      choice('user', 'people', ['People cannot find the “Pay” button. What should you do first?', 'Люди не могут найти кнопку «Оплатить». Что сделать первым?'], [
        ['Watch a few people try, and ask what they expected', 'Посмотреть, как несколько человек ищут её, и спросить, чего они ожидали'],
        ['Make it bright neon', 'Сделать её ярко-неоновой'],
        ['Add three more buttons next to it', 'Добавить рядом ещё три кнопки'],
        ['Copy the button from a competitor', 'Скопировать кнопку у конкурента'],
        ['Decide the users are not paying attention', 'Решить, что пользователи просто невнимательны']
      ], ['Design starts with observing real behaviour and expectations, then testing a focused change.', 'Дизайн начинается с наблюдения за реальным поведением и ожиданиями, а потом — проверки точечного изменения.'], ['Do you know why they miss it yet?', 'Ты уже знаешь, почему они её не находят?']),
      choice('constraint', 'create', ['A poster must work in black and white and be readable from far away. What matters most?', 'Плакат должен работать в чёрно-белом варианте и читаться издалека. Что важнее всего?'], [
        ['Clear hierarchy and strong contrast', 'Чёткая иерархия и сильный контраст'],
        ['Tiny decorative details', 'Мелкие декоративные детали'],
        ['Using as many fonts as possible', 'Как можно больше разных шрифтов'],
        ['A long explanatory paragraph', 'Длинный поясняющий абзац'],
        ['Subtle grey gradients', 'Тонкие серые градиенты']
      ], ['Good design respects constraints and makes the most important message easy to see.', 'Хороший дизайн уважает ограничения и делает главное сообщение заметным.'], ['What survives when colour is gone and the viewer is 10 metres away?', 'Что останется заметным, если убрать цвет и отойти на 10 метров?']),
      open('sketch', 'create', ['Describe one small change that would make a confusing bus stop easier to use.', 'Опиши одно небольшое изменение, которое сделает непонятную автобусную остановку удобнее.'], ['I would change...', 'Я бы изменил(а)...'], ['Pick one specific problem a passenger has and one change that solves it.', 'Выбери одну конкретную проблему пассажира и одно изменение, которое её решает.'], ['One concrete, specific change tied to a real passenger problem, with a reason it helps.', 'Одно конкретное изменение, связанное с реальной проблемой пассажира, и причина, почему оно помогает.'], ['I would add a large, simple map showing which bus goes where, with the stop you are at marked “You are here”, because tourists and new riders cannot read the tiny timetable.', 'Я бы добавил(а) крупную простую схему маршрутов с отметкой «Вы здесь», потому что туристы и новые пассажиры не могут разобраться в мелком расписании.'], [['map', 'sign', 'timetable', 'schedule', 'number', 'bigger', 'light', 'screen', 'arrival', 'route', 'because', 'bench', 'shelter'], ['схем', 'карт', 'табличк', 'расписан', 'номер', 'крупн', 'свет', 'табло', 'прибыт', 'маршрут', 'потому', 'скамей', 'навес']]),
      choice('feedback', 'people', ['A user dislikes your first design. What is the most useful response?', 'Пользователю не понравился твой первый вариант. Как отреагировать полезнее всего?'], [
        ['Ask what was difficult and look for a pattern across users', 'Спросить, что было сложно, и поискать повторяющиеся проблемы у разных людей'],
        ['Defend every pixel', 'Защищать каждый пиксель'],
        ['Delete the whole project', 'Удалить весь проект'],
        ['Stop testing with users', 'Перестать тестировать с пользователями'],
        ['Change everything they mentioned immediately', 'Сразу поменять всё, что он упомянул']
      ], ['Feedback is evidence about the experience, not a personal verdict — and one person is not yet a pattern.', 'Обратная связь — это данные об опыте, а не приговор тебе; а мнение одного человека — ещё не закономерность.'], ['Is one opinion enough to redesign everything?', 'Достаточно ли одного мнения, чтобы всё переделать?']),
      choice('contrast', 'analyze', ['A website uses light grey text on a white background. What is the main problem?', 'На сайте светло-серый текст на белом фоне. В чём главная проблема?'], [
        ['Low contrast makes it hard to read, especially for people with weaker eyesight', 'Низкий контраст мешает читать, особенно людям со слабым зрением'],
        ['It looks too modern', 'Выглядит слишком современно'],
        ['The font size is too big', 'Слишком крупный шрифт'],
        ['It needs more colours', 'Не хватает цветов'],
        ['There are too few words', 'Слишком мало слов']
      ], ['Accessibility guidelines set minimum contrast levels; readable text is not a style choice.', 'Стандарты доступности задают минимальный контраст; читаемость текста — не вопрос вкуса.'], ['Try reading grey-on-white on a phone in sunlight.', 'Попробуй прочитать серое на белом с телефона на солнце.']),
      choice('client', 'people', ['A client keeps asking to make the logo bigger on every page. What is the best move?', 'Клиент постоянно просит сделать логотип крупнее на каждой странице. Как лучше поступить?'], [
        ['Ask what they want to achieve and show options that solve it', 'Спросить, какой цели он хочет добиться, и показать варианты, которые её решают'],
        ['Just make it huge everywhere', 'Просто сделать его огромным везде'],
        ['Refuse — you are the designer', 'Отказаться — дизайнер здесь ты'],
        ['Pretend you changed it', 'Сделать вид, что изменил(а)'],
        ['Make it smaller to prove a point', 'Сделать меньше, чтобы доказать свою правоту']
      ], ['Behind a requested solution is a real goal (for example, brand recognition); designers solve the goal.', 'За просьбой клиента стоит реальная цель (например, узнаваемость бренда); дизайнер решает именно её.'], ['What problem is “bigger logo” trying to fix?', 'Какую проблему пытается решить «логотип побольше»?']),
      open('prototype', 'solve', ['Describe the simplest version of an idea you could test this afternoon.', 'Опиши самую простую версию идеи, которую можно проверить уже сегодня.'], ['A quick test could be...', 'Быстрый тест может быть таким...'], ['Paper, a quick sketch, or a fake screen is enough — what would you learn from it?', 'Бумаги, наброска или «фейкового» экрана достаточно — что ты из этого узнаешь?'], ['A cheap, fast prototype (paper, mock-up, fake door) plus who tests it and what question it answers.', 'Дешёвый быстрый прототип (бумага, макет, «фальшивая дверь»), кто его проверит и на какой вопрос он ответит.'], ['I would draw the app’s three main screens on paper and ask five classmates to “tap” through booking a study room, to see where they hesitate.', 'Я бы нарисовал(а) три главных экрана приложения на бумаге и попросил(а) пятерых одноклассников «пройти» бронирование учебной комнаты, чтобы увидеть, где они сомневаются.'], [['paper', 'sketch', 'draw', 'mock', 'test', 'people', 'friends', 'classmates', 'ask', 'see', 'learn', 'quick', 'five'], ['бумаг', 'набросок', 'нарису', 'макет', 'тест', 'провер', 'люд', 'друз', 'одноклассник', 'спрош', 'увидеть', 'быстр', 'пят']]),
      choice('consistency', 'solve', ['An app has five different button styles. What is the best fix?', 'В приложении пять разных стилей кнопок. Как лучше это исправить?'], [
        ['Create a small shared set of components and use it everywhere', 'Сделать небольшой общий набор компонентов и использовать его везде'],
        ['Add a sixth, better style', 'Добавить шестой, более удачный стиль'],
        ['Let each developer choose', 'Пусть каждый разработчик выбирает сам'],
        ['Remove buttons where possible', 'Убрать кнопки, где можно'],
        ['Pick a random style for each screen', 'Случайно выбирать стиль для каждого экрана']
      ], ['Design systems keep products consistent and faster to build — users learn one pattern once.', 'Дизайн-системы делают продукт единообразным и ускоряют работу — пользователь учит один паттерн один раз.'], ['What would make the next new screen consistent automatically?', 'Что сделает следующий новый экран единообразным автоматически?']),
      choice('lastminute', 'pressure', ['A client changes the brief one day before the deadline. What do you do?', 'Клиент меняет задание за день до дедлайна. Что делать?'], [
        ['Clarify what is essential for the deadline and agree what changes come later', 'Уточнить, что критично к сроку, и договориться, какие изменения будут позже'],
        ['Silently redo everything overnight', 'Молча переделать всё за ночь'],
        ['Refuse every change', 'Отказаться от любых изменений'],
        ['Ignore the message and deliver the old version', 'Проигнорировать сообщение и сдать старую версию'],
        ['Start over from a blank page', 'Начать всё с чистого листа']
      ], ['Professionals renegotiate scope openly instead of burning out or ignoring the client.', 'Профессионалы открыто пересогласовывают объём работы вместо выгорания или игнорирования клиента.'], ['What can realistically be done well by tomorrow?', 'Что реально сделать хорошо к завтрашнему дню?']),
      open('critique', 'analyze', ['Describe one thing that makes an app or website you use every day easy or hard to use, and why.', 'Опиши одну вещь, которая делает приложение или сайт, которым ты пользуешься каждый день, удобным или неудобным, и объясни почему.'], ['In ... the ... is easy because...', 'В ... удобно/неудобно то, что...'], ['Name the product, the exact element, and its effect on you.', 'Назови продукт, конкретный элемент и то, как он на тебя влияет.'], ['Names a specific product and interface element, describes the effect on the user, and explains the reason (clarity, steps, feedback, placement).', 'Называет конкретный продукт и элемент интерфейса, описывает, как он влияет на пользователя, и объясняет причину (понятность, количество шагов, обратная связь, расположение).'], ['In my bank app, sending money takes only three taps and shows the recipient’s name before confirming, so I feel sure I am not sending it to the wrong person.', 'В моём банковском приложении перевод занимает всего три нажатия и перед подтверждением показывает имя получателя, поэтому я уверен(а), что не отправлю деньги не тому человеку.'], [['app', 'button', 'menu', 'screen', 'tap', 'click', 'easy', 'hard', 'because', 'find', 'search', 'steps', 'so'], ['приложен', 'кнопк', 'меню', 'экран', 'нажат', 'удобн', 'неудобн', 'потому', 'найти', 'поиск', 'шаг', 'поэтому']])
    ]
  },
  {
    slug: 'journalist', category: 'creative', color: 'coral',
    title: ['Journalist', 'Журналист'],
    description: ['Ask sharp questions, verify information, and tell stories people can trust.', 'Задаёт точные вопросы, проверяет информацию и рассказывает истории, которым можно доверять.'],
    reality: ['Journalism involves research, interviews, deadlines, editing, and separating a strong claim from a supported one.', 'Журналистика — это исследование, интервью, сроки, редактура и умение отличить громкое заявление от подтверждённого.'],
    subjects: [['English / Literature', 'Русский язык и литература'], ['History', 'История'], ['Media studies', 'Медиаграмотность']],
    exams: [['UNT (Kazakhstan) + creative exam', 'ЕНТ + творческий экзамен'], ['A-Levels English & History', 'A-Levels: английский и история'], ['IB Language & Literature', 'IB: язык и литература'], ['Writing portfolio', 'Портфолио публикаций'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Journalism', 'Журналистика'], ['Media and Communications', 'Медиакоммуникации'], ['International Relations', 'Международные отношения']],
    nextSteps: [['Report a small local story using two sources.', 'Подготовь небольшую местную новость с двумя источниками.'], ['Compare how different outlets cover the same event.', 'Сравни, как разные СМИ освещают одно событие.'], ['Practise writing headlines without exaggerating.', 'Тренируйся писать заголовки без преувеличений.']],
    tasks: [
      choice('source', 'analyze', ['A viral post makes a serious claim. What should you do first?', 'Вирусный пост содержит серьёзное утверждение. Что сделать первым?'], [
        ['Find the original source and look for independent confirmation', 'Найти первоисточник и независимое подтверждение'],
        ['Publish quickly before competitors', 'Быстро опубликовать, пока не опередили'],
        ['Quote the most popular comment', 'Процитировать самый популярный комментарий'],
        ['Assume it is false and ignore it', 'Решить, что это ложь, и не обращать внимания'],
        ['Count the likes to judge credibility', 'Оценить достоверность по количеству лайков']
      ], ['Verification means tracing a claim to its origin and checking it against reliable evidence.', 'Проверка — это найти, откуда пришло утверждение, и сверить его с надёжными доказательствами.'], ['Where did this claim first appear, and who else can confirm it?', 'Где это утверждение появилось впервые и кто ещё может его подтвердить?']),
      choice('interview', 'people', ['An interviewee gives a vague answer. What is the best follow-up?', 'Собеседник отвечает расплывчато. Как лучше уточнить?'], [
        ['Ask for a specific example or date', 'Попросить конкретный пример или дату'],
        ['Change the subject', 'Сменить тему'],
        ['Suggest the answer you want to hear', 'Подсказать ответ, который хочешь услышать'],
        ['End the interview', 'Закончить интервью'],
        ['Repeat the same question louder', 'Повторить тот же вопрос громче']
      ], ['Specific follow-ups turn broad statements into information readers can check and understand.', 'Конкретные уточнения превращают общие слова в информацию, которую читатель может понять и проверить.'], ['What detail would make the answer checkable?', 'Какая деталь сделает ответ проверяемым?']),
      open('headline', 'create', ['Write a factual headline about a school adding a free breakfast programme.', 'Напиши фактологичный заголовок о том, что школа ввела бесплатные завтраки.'], ['School...', 'Школа...'], ['Who did what? Keep it accurate, short, and free of hype.', 'Кто что сделал? Точно, коротко и без громких слов.'], ['Short, accurate headline stating who did what (ideally with a detail like who benefits or when), without exaggeration or clickbait.', 'Короткий точный заголовок: кто что сделал (желательно с деталью — для кого или когда), без преувеличений и кликбейта.'], ['Riverside School starts free breakfasts for all 600 students from Monday', 'Школа № 5 с понедельника вводит бесплатные завтраки для всех 600 учеников'], [['school', 'free', 'breakfast', 'student', 'launch', 'start', 'introduce', 'offer', 'pupil', 'from', 'programme', 'program'], ['школ', 'бесплатн', 'завтрак', 'ученик', 'ввод', 'запуска', 'начина', 'с понедельника', 'програм', 'дет']]),
      choice('fairness', 'people', ['Your story includes criticism of a named person. What is fair practice?', 'В статье есть критика конкретного человека. Что будет честной практикой?'], [
        ['Give the person a real chance to respond before publishing', 'Дать человеку реальную возможность ответить до публикации'],
        ['Publish only the criticism', 'Опубликовать только критику'],
        ['Add anonymous rumours for balance', 'Добавить анонимные слухи для баланса'],
        ['Remove all context to keep it short', 'Убрать весь контекст для краткости'],
        ['Contact them after the story is out', 'Связаться с ним уже после публикации']
      ], ['Fair reporting gives the people involved a meaningful opportunity to respond.', 'Честная журналистика даёт упомянутым людям реальную возможность ответить.'], ['How would you want to be treated if the story were about you?', 'Как бы ты хотел(а), чтобы поступили, если бы статья была о тебе?']),
      choice('numbers', 'analyze', ['A press release says “Crime up 100%!” — cases went from 2 to 4. How should you report it?', 'В пресс-релизе написано «Преступность выросла на 100%!» — было 2 случая, стало 4. Как об этом написать?'], [
        ['Give the actual numbers and context', 'Привести реальные числа и контекст'],
        ['Use the press release headline as it is', 'Использовать заголовок пресс-релиза как есть'],
        ['Say crime has exploded in the area', 'Написать, что преступность в районе резко взлетела'],
        ['Leave the numbers out entirely', 'Вообще не упоминать цифры'],
        ['Add your own estimate for next year', 'Добавить свой прогноз на следующий год']
      ], ['Percentages on tiny numbers can mislead; readers deserve the real counts.', 'Проценты от очень маленьких чисел вводят в заблуждение; читатели заслуживают реальных цифр.'], ['Does “100%” feel the same as “two more cases”?', '«100%» звучит так же, как «на два случая больше»?']),
      choice('anonymous', 'pressure', ['A source will only talk if they stay anonymous. What is responsible?', 'Источник готов говорить, только если останется анонимным. Как поступить ответственно?'], [
        ['Verify their information independently and agree clearly how they will be described', 'Независимо проверить их информацию и чётко договориться, как их будут описывать'],
        ['Promise anonymity and publish without checking', 'Пообещать анонимность и опубликовать без проверки'],
        ['Reveal their name later if the story gets big', 'Раскрыть имя позже, если история станет громкой'],
        ['Refuse all anonymous sources', 'Отказываться от любых анонимных источников'],
        ['Invent a fake name and job for them', 'Придумать им вымышленное имя и профессию']
      ], ['Anonymity can protect people, but it raises the bar for verification and must be honoured.', 'Анонимность может защитить человека, но повышает требования к проверке, и обещание нужно соблюдать.'], ['What protects both the source and the readers?', 'Что защитит и источник, и читателей?']),
      open('lead', 'create', ['Write the first sentence of a news story about a student-led recycling project.', 'Напиши первое предложение новости о проекте учеников по переработке отходов.'], ['Students at...', 'Ученики...'], ['A news lead answers who, what, and ideally why it matters — in one sentence.', 'Первое предложение новости отвечает на вопросы кто, что и, желательно, почему это важно.'], ['One clear sentence answering who and what, with a concrete detail (numbers, place, result) and no opinion.', 'Одно ясное предложение: кто и что сделал, с конкретной деталью (цифры, место, результат) и без оценок.'], ['Ninth-graders at Lincoln High have collected more than 2 tonnes of plastic in six weeks after placing sorting bins in every corridor.', 'Девятиклассники школы № 12 за шесть недель собрали более 2 тонн пластика, установив контейнеры для сортировки в каждом коридоре.'], [['student', 'school', 'recycl', 'collect', 'plastic', 'bin', 'week', 'tonne', 'project', 'started', 'kilo', 'waste'], ['ученик', 'школ', 'переработ', 'собрал', 'пластик', 'контейнер', 'недел', 'тонн', 'проект', 'запуст', 'кило', 'отход']]),
      choice('correction', 'pressure', ['You discover that your published article contains a factual error. What do you do?', 'Ты обнаружил(а) фактическую ошибку в уже опубликованной статье. Что делать?'], [
        ['Correct it openly and add a note explaining the correction', 'Открыто исправить и добавить пометку об исправлении'],
        ['Quietly edit the text and say nothing', 'Тихо поправить текст и промолчать'],
        ['Delete the whole article', 'Удалить всю статью'],
        ['Leave it — few people will notice', 'Оставить — мало кто заметит'],
        ['Blame the source publicly', 'Публично обвинить источник']
      ], ['Transparent corrections are how newsrooms keep trust — hiding mistakes destroys it.', 'Открытые исправления сохраняют доверие к редакции, а сокрытие ошибок его разрушает.'], ['What would make readers trust you more, not less?', 'Что заставит читателей доверять тебе больше, а не меньше?']),
      choice('deadline', 'pressure', ['Thirty minutes to deadline, one key fact is still unconfirmed. What is the right call?', 'До дедлайна тридцать минут, один ключевой факт не подтверждён. Как правильно поступить?'], [
        ['Publish only what is confirmed and hold back that detail', 'Опубликовать только подтверждённое, а эту деталь отложить'],
        ['Publish it with the word “reportedly”', 'Опубликовать с пометкой «по некоторым данным»'],
        ['Fill the gap with a likely guess', 'Заполнить пробел правдоподобной догадкой'],
        ['Drop the whole story', 'Отказаться от всего материала'],
        ['Copy what another outlet wrote', 'Взять то, что написало другое издание']
      ], ['Speed matters, but accuracy matters more — a story can be updated when the fact is confirmed.', 'Скорость важна, но точность важнее: материал можно дополнить, когда факт подтвердится.'], ['What happens if the unconfirmed fact turns out to be wrong?', 'Что будет, если неподтверждённый факт окажется ложным?']),
      open('questions', 'people', ['Write two questions you would ask a school principal about a new ban on phones in class.', 'Напиши два вопроса, которые ты задал(а) бы директору школы о новом запрете телефонов на уроках.'], ['1. Why...', '1. Почему...'], ['Good interview questions are open, specific, and dig for reasons and evidence.', 'Хорошие вопросы для интервью открытые, конкретные и выясняют причины и доказательства.'], ['Two open, specific questions (why, how, what evidence, what exceptions or consequences), not yes/no and not leading.', 'Два открытых конкретных вопроса (почему, как, какие доказательства, какие исключения или последствия), не «да/нет» и не наводящие.'], ['1. What problem made you introduce the ban, and what evidence did you see? 2. How will you handle students who need a phone for medical or family reasons?', '1. Какая проблема привела к запрету и на какие данные вы опирались? 2. Как будут решаться случаи, когда телефон нужен ученику по медицинским или семейным причинам?'], [['why', 'how', 'what', 'evidence', 'problem', 'exception', 'student', 'parents', 'ban', 'phone', '?'], ['почему', 'как ', 'что ', 'какие', 'данн', 'проблем', 'исключен', 'ученик', 'родител', 'запрет', 'телефон', '?']])
    ]
  },
  {
    slug: 'architect', category: 'creative', color: 'gold',
    title: ['Architect', 'Архитектор'],
    description: ['Shape spaces by balancing people, materials, safety, beauty, and constraints.', 'Проектирует пространства, соединяя людей, материалы, безопасность, красоту и ограничения.'],
    reality: ['Architecture mixes creative ideas with measurements, codes, budgets, revisions, and collaboration.', 'Архитектура сочетает идеи с измерениями, нормами, бюджетом, правками и командной работой.'],
    subjects: [['Mathematics', 'Математика'], ['Physics', 'Физика'], ['Art / Design', 'Искусство и дизайн']],
    exams: [['UNT (Kazakhstan): Mathematics + creative exam (drawing)', 'ЕНТ: математика + творческий экзамен (рисунок)'], ['Portfolio review', 'Просмотр портфолио'], ['A-Levels Mathematics & Art', 'A-Levels: математика и искусство'], ['IB Mathematics & Visual Arts', 'IB: математика и визуальное искусство'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Architecture', 'Архитектура'], ['Interior Architecture', 'Архитектура интерьера'], ['Urban Planning', 'Градостроительство']],
    nextSteps: [['Measure and redraw a room you use every day.', 'Измерь и перерисуй комнату, которой пользуешься каждый день.'], ['Make a small model from recyclable material.', 'Сделай небольшой макет из вторсырья.'], ['Visit a building and notice how people move through it.', 'Сходи в какое-нибудь здание и понаблюдай, как люди в нём перемещаются.']],
    tasks: [
      choice('brief', 'people', ['A client says they need “a welcoming room.” What should you ask next?', 'Клиент говорит, что ему нужна «уютная комната». Что спросить дальше?'], [
        ['Who uses it, how, and what must fit inside', 'Кто и как будет ей пользоваться и что должно в ней поместиться'],
        ['Which colour they want, then start drawing', 'Какой цвет они хотят — и сразу рисовать'],
        ['Nothing — you know what welcoming means', 'Ничего — ты и так знаешь, что такое уют'],
        ['Which famous room they would like copied', 'Какую известную комнату скопировать'],
        ['How big the budget is, and nothing else', 'Какой бюджет — и больше ничего']
      ], ['A brief turns a feeling into users, activities, constraints, and measurable needs.', 'Техническое задание превращает ощущение в пользователей, действия, ограничения и измеримые потребности.'], ['What would you need to know to draw the first line?', 'Что нужно знать, чтобы провести первую линию?']),
      choice('access', 'people', ['A beautiful entrance has stairs but no step-free route. What matters most?', 'У красивого входа есть лестница, но нет пути без ступеней. Что важнее всего?'], [
        ['Provide an equally dignified step-free route', 'Сделать равноценный удобный вход без ступеней'],
        ['Keep it — the stairs look great', 'Оставить — лестница выглядит отлично'],
        ['Add a sign saying “Sorry”', 'Повесить табличку «Извините»'],
        ['Put a ramp at the back by the bins', 'Сделать пандус сзади, у мусорных баков'],
        ['Remove the entrance altogether', 'Вообще убрать этот вход']
      ], ['Inclusive design treats access as a core requirement, and a back-door ramp is not equal access.', 'Инклюзивный дизайн считает доступность базовым требованием, а пандус у мусорки — не равный доступ.'], ['Would everyone enter the building with the same dignity?', 'Смогут ли все входить в здание одинаково достойно?']),
      open('space', 'solve', ['Describe one change that could make a crowded classroom easier to move through.', 'Опиши изменение, которое упростит движение в переполненном классе.'], ['I would...', 'Я бы...'], ['Picture where people get stuck and why.', 'Представь, где люди застревают и почему.'], ['A concrete spatial change (layout, aisle, storage, door, furniture) linked to where and why people get stuck.', 'Конкретное пространственное изменение (расстановка, проход, хранение, дверь, мебель), связанное с тем, где и почему люди застревают.'], ['I would move the bag shelves from the aisle to the back wall and arrange desks in rows with a 1-metre central aisle, because bags on the floor block the path to the door.', 'Я бы перенёс(ла) полки для рюкзаков из прохода к задней стене и расставил(а) парты рядами с центральным проходом в 1 метр, потому что рюкзаки на полу перекрывают путь к двери.'], [['desk', 'aisle', 'door', 'move', 'bag', 'shelf', 'row', 'space', 'wall', 'furniture', 'metre', 'because', 'path'], ['парт', 'проход', 'двер', 'перенес', 'рюкзак', 'полк', 'ряд', 'простран', 'стен', 'мебел', 'метр', 'потому', 'путь']]),
      choice('revision', 'pressure', ['A structural engineer raises a safety concern about your design. What do you do?', 'Инженер-конструктор указал на риск безопасности в твоём проекте. Что делать?'], [
        ['Revise the design together with the team', 'Переработать проект вместе с командой'],
        ['Keep the design — the concept matters most', 'Оставить проект — концепция важнее'],
        ['Hide the concern from the client', 'Скрыть замечание от клиента'],
        ['Find a different engineer who agrees with you', 'Найти другого инженера, который с тобой согласится'],
        ['Make the drawings prettier', 'Сделать чертежи красивее']
      ], ['Built work is collaborative: safety and feasibility guide creative revisions.', 'Строительство — командная работа: безопасность и реализуемость направляют творческие правки.'], ['Who carries the risk if the building fails?', 'Кто пострадает, если конструкция не выдержит?']),
      choice('scale', 'analyze', ['A drawing is at 1:100 scale. A wall measures 5 cm on paper. How long is it in reality?', 'Чертёж в масштабе 1:100. Стена на бумаге — 5 см. Какой она длины на самом деле?'], [
        ['5 metres', '5 метров'],
        ['50 centimetres', '50 сантиметров'],
        ['50 metres', '50 метров'],
        ['500 metres', '500 метров'],
        ['1 metre', '1 метр']
      ], ['5 cm × 100 = 500 cm = 5 m. Architects convert scales constantly.', '5 см × 100 = 500 см = 5 м. Архитекторы постоянно пересчитывают масштаб.'], ['Multiply by 100, then convert centimetres to metres.', 'Умножь на 100, затем переведи сантиметры в метры.']),
      choice('sunlight', 'create', ['Classroom windows face the sun and rooms overheat every afternoon. What is the best design response?', 'Окна класса выходят на солнце, и после обеда в кабинете очень жарко. Какое архитектурное решение лучше?'], [
        ['Add external shading such as overhangs or louvres', 'Добавить наружное затенение — козырьки или ламели'],
        ['Paint the walls white', 'Покрасить стены в белый'],
        ['Brick up the windows', 'Заложить окна кирпичом'],
        ['Add more windows for air', 'Добавить больше окон для воздуха'],
        ['Move lessons to the morning', 'Перенести уроки на утро']
      ], ['Shading outside the glass blocks heat before it enters while keeping daylight and views.', 'Затенение снаружи задерживает тепло до того, как оно попадёт внутрь, и сохраняет дневной свет и вид.'], ['Where is it best to stop the sun: before or after it passes the glass?', 'Где лучше остановить солнце: до стекла или после?']),
      open('observe', 'analyze', ['Describe how people use a public space you know, without judging their behaviour.', 'Опиши, как люди используют знакомое тебе общественное место, не оценивая их поведение.'], ['I notice that...', 'Я замечаю, что...'], ['Where do people walk, sit, wait, or avoid? What does that tell you about the space?', 'Где люди ходят, сидят, ждут или что обходят стороной? О чём это говорит?'], ['Specific observations of movement, gathering, or avoidance in a named place, without value judgements; ideally one insight about the design.', 'Конкретные наблюдения о движении, скоплении или избегании в названном месте, без оценок; желательно — один вывод о планировке.'], ['In the park near my school, people cut diagonally across the grass instead of using the path, and the benches in the shade fill up first while sunny ones stay empty — the path does not follow where people want to go.', 'В парке у школы люди срезают по газону по диагонали вместо дорожки, а скамейки в тени занимают первыми, солнечные пустуют, — дорожка не совпадает с тем, куда людям нужно идти.'], [['people', 'walk', 'sit', 'bench', 'path', 'wait', 'shade', 'crowd', 'corner', 'avoid', 'park', 'square', 'notice'], ['люд', 'ход', 'сид', 'скамей', 'дорожк', 'ждут', 'тен', 'толп', 'угол', 'обход', 'парк', 'площад', 'замеча']]),
      choice('budget', 'pressure', ['The project is 20% over budget. What is the professional approach?', 'Проект вышел за бюджет на 20%. Как поступить профессионально?'], [
        ['Review with the client which elements add least value and find alternatives', 'Вместе с клиентом разобрать, что даёт меньше всего пользы, и найти альтернативы'],
        ['Cut safety features first', 'Первым делом урезать системы безопасности'],
        ['Hide the overrun until construction starts', 'Скрывать перерасход до начала стройки'],
        ['Use the cheapest materials everywhere', 'Везде взять самые дешёвые материалы'],
        ['Stop the project entirely', 'Полностью остановить проект']
      ], ['Value engineering keeps the essentials and safety intact while finding savings together with the client.', 'Оптимизация проекта сохраняет главное и безопасность, а экономию ищут вместе с клиентом.'], ['What can change without hurting safety or the core idea?', 'Что можно поменять, не навредив безопасности и главной идее?']),
      choice('energy', 'solve', ['Which decision reduces a building’s energy use the most over decades?', 'Какое решение сильнее всего снизит энергопотребление здания на десятилетия?'], [
        ['Good insulation and orientation to the sun', 'Хорошая теплоизоляция и правильная ориентация по сторонам света'],
        ['A larger car park', 'Большая парковка'],
        ['Glass walls on every side', 'Стеклянные стены со всех сторон'],
        ['A grand lobby with high ceilings', 'Роскошное лобби с высокими потолками'],
        ['More elevators', 'Больше лифтов']
      ], ['Early passive decisions — orientation, insulation, shading — save energy every day for the building’s whole life.', 'Ранние «пассивные» решения — ориентация, утепление, затенение — экономят энергию каждый день на протяжении всей жизни здания.'], ['What works without switching anything on?', 'Что работает без включения каких-либо приборов?']),
      open('concept', 'create', ['In two sentences, describe an idea for a small outdoor space at a school: who uses it and one key design feature.', 'Двумя предложениями опиши идею небольшого пространства во дворе школы: кто им пользуется и одна главная особенность.'], ['A space for...', 'Пространство для...'], ['Start from the people and what they need, then add one feature that serves them.', 'Начни с людей и их потребностей, затем добавь одну особенность, которая им служит.'], ['Names the users and their activity, one concrete design feature, and how that feature serves the users.', 'Называет пользователей и их занятие, одну конкретную особенность и то, как она им помогает.'], ['A quiet reading corner for students who want a break from the noisy yard. Curved wooden benches under a pergola with climbing plants give shade and make it feel separate without walls.', 'Тихий уголок для чтения для учеников, которым нужен отдых от шумного двора. Изогнутые деревянные скамейки под перголой с вьющимися растениями дают тень и отделяют уголок без стен.'], [['student', 'teacher', 'space', 'bench', 'shade', 'tree', 'plant', 'quiet', 'play', 'for', 'area', 'garden', 'feature'], ['ученик', 'учител', 'простран', 'скамей', 'тен', 'дерев', 'растен', 'тих', 'игр', 'для', 'зон', 'сад', 'особенн']])
    ]
  },
  {
    slug: 'filmmaker', category: 'creative', color: 'rose',
    title: ['Filmmaker', 'Режиссёр'],
    description: ['Tell stories with images, sound, and timing — and lead a crew to make them real.', 'Рассказывает истории через изображение, звук и ритм и ведёт съёмочную группу к результату.'],
    reality: ['Filmmaking is mostly planning, problem-solving on set, directing people, and many hours in the edit.', 'Кино — это в основном планирование, решение проблем на площадке, работа с людьми и долгие часы монтажа.'],
    subjects: [['English / Literature', 'Литература'], ['Art / Design', 'Искусство'], ['Media studies', 'Медиа'], ['Physics (optics, sound)', 'Физика (оптика, звук)']],
    exams: [['UNT (Kazakhstan) + creative exams', 'ЕНТ + творческие экзамены'], ['Short film portfolio', 'Портфолио короткометражек'], ['A-Levels Film Studies', 'A-Levels: киноведение'], ['IB Film', 'IB: кино'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Film Production', 'Кинопроизводство'], ['Directing', 'Режиссура'], ['Screenwriting', 'Сценарное мастерство']],
    nextSteps: [['Shoot a one-minute film on your phone with a clear beginning and end.', 'Сними на телефон минутный фильм с чётким началом и концом.'], ['Rewatch a favourite scene and write down every cut.', 'Пересмотри любимую сцену и запиши каждую склейку.'], ['Volunteer on a student or local film set.', 'Поработай волонтёром на студенческих или местных съёмках.']],
    tasks: [
      choice('story', 'create', ['You are making a 3-minute short film. Which plan works best?', 'Ты снимаешь 3-минутный короткометражный фильм. Какой план лучше?'], [
        ['One main character, one clear conflict, one or two locations', 'Один главный герой, один понятный конфликт, одна-две локации'],
        ['An epic with ten locations', 'Эпопея с десятью локациями'],
        ['Eight characters, each with a backstory', 'Восемь героев, у каждого своя предыстория'],
        ['No conflict — just beautiful shots', 'Без конфликта — просто красивые кадры'],
        ['Three minutes of dialogue explaining the plot', 'Три минуты диалога, объясняющего сюжет']
      ], ['Short films shine with focus: one person wanting something and an obstacle in the way.', 'Короткий метр силён фокусом: один человек чего-то хочет, и ему что-то мешает.'], ['What can an audience care about in just three minutes?', 'Что зритель успеет полюбить и понять за три минуты?']),
      choice('shot', 'analyze', ['You want the audience to feel a character is small and alone. Which shot helps most?', 'Нужно, чтобы зритель почувствовал, что герой маленький и одинокий. Какой кадр поможет больше всего?'], [
        ['A wide shot with lots of empty space around them', 'Общий план с большим пустым пространством вокруг героя'],
        ['An extreme close-up of their eyes', 'Сверхкрупный план глаз'],
        ['Fast cuts between many angles', 'Быстрый монтаж с множеством ракурсов'],
        ['Bright, saturated colours', 'Яркие насыщенные цвета'],
        ['A shot of the crowd cheering', 'Кадр ликующей толпы']
      ], ['Framing carries emotion: empty space around a small figure reads as isolation.', 'Кадрирование передаёт эмоцию: пустота вокруг маленькой фигуры читается как одиночество.'], ['How big is the person compared with the space around them?', 'Насколько человек велик по сравнению с пространством вокруг?']),
      open('logline', 'create', ['Write a one-sentence logline for a short film about a missed bus.', 'Напиши логлайн (одно предложение) для короткометражки об опоздании на автобус.'], ['When a ... misses the bus, ...', 'Когда ... опаздывает на автобус, ...'], ['A logline names a character, what they want, and what stands in the way.', 'В логлайне есть герой, его цель и то, что ему мешает.'], ['One sentence with a specific character, a goal, an obstacle or stakes, and a hint of what makes it interesting.', 'Одно предложение: конкретный герой, цель, препятствие или ставки и намёк на то, чем это интересно.'], ['When a shy teenager misses the last bus to her audition, she has 40 minutes to cross the city — and the only person who can help is the rival she has avoided all year.', 'Когда застенчивая школьница опаздывает на последний автобус до прослушивания, у неё 40 минут, чтобы пересечь город, — и помочь может только соперница, которую она избегала весь год.'], [['when', 'miss', 'bus', 'must', 'has to', 'only', 'but', 'minutes', 'girl', 'boy', 'man', 'woman', 'teen', 'to get'], ['когда', 'опазд', 'автобус', 'должен', 'должна', 'нужно', 'только', 'но ', 'минут', 'девоч', 'мальчик', 'мужчин', 'женщин', 'подрост', 'чтобы']]),
      choice('weather', 'pressure', ['It rains on the only day you can shoot an outdoor scene. What is the best call?', 'В единственный день съёмки уличной сцены идёт дождь. Как лучше поступить?'], [
        ['Adapt: shoot indoor scenes now, or write the rain into the scene', 'Подстроиться: снять сейчас сцены в помещении или вписать дождь в сцену'],
        ['Cancel the whole film', 'Отменить весь фильм'],
        ['Shoot anyway and risk the equipment', 'Всё равно снимать, рискуя техникой'],
        ['Wait all day for the rain to stop', 'Весь день ждать, пока дождь кончится'],
        ['Send everyone home without a plan', 'Отпустить всех домой без плана']
      ], ['Sets rarely go to plan; good directors turn problems into options — sometimes into better scenes.', 'На площадке редко всё идёт по плану; хорошие режиссёры превращают проблемы в варианты, а иногда и в лучшие сцены.'], ['What can you still do today with the people and places you have?', 'Что можно сделать сегодня с теми людьми и местами, которые есть?']),
      choice('actor', 'people', ['An actor’s performance feels flat. What is the most useful direction?', 'Актёр играет «плоско». Какое указание будет самым полезным?'], [
        ['Give a specific intention: what the character wants from the other person right now', 'Дать конкретную задачу: чего герой прямо сейчас хочет от партнёра'],
        ['“Be more emotional!”', '«Больше эмоций!»'],
        ['Shout so they feel the pressure', 'Накричать, чтобы почувствовал давление'],
        ['Replace the actor on the spot', 'Сразу заменить актёра'],
        ['Do fifty takes without comment', 'Сделать пятьдесят дублей без комментариев']
      ], ['Actors respond to playable actions and goals, not to vague results like “more emotion”.', 'Актёры откликаются на играбельные действия и цели, а не на размытый результат вроде «больше эмоций».'], ['What could the actor actually do differently in the next take?', 'Что актёр сможет реально сделать иначе в следующем дубле?']),
      open('opening', 'create', ['Describe the first 10 seconds of your film: what we see and what we hear.', 'Опиши первые 10 секунд своего фильма: что мы видим и что слышим.'], ['We see... We hear...', 'Мы видим... Мы слышим...'], ['Think in images and sound, not explanations — what hooks the viewer?', 'Думай образами и звуками, а не объяснениями: что зацепит зрителя?'], ['Concrete visual details and sound, a clear mood or question that hooks the viewer, written as what is on screen.', 'Конкретные визуальные детали и звук, понятное настроение или вопрос, который цепляет зрителя; описано как то, что на экране.'], ['Black screen. We hear a phone vibrating on a wooden table. Fade in: a close-up of the screen — 23 missed calls from “Mum” — and a hand that turns it face down.', 'Чёрный экран. Слышно, как на деревянном столе вибрирует телефон. Из затемнения — крупный план экрана: 23 пропущенных от «Мама» — и рука, которая переворачивает телефон экраном вниз.'], [['see', 'hear', 'close-up', 'wide', 'sound', 'music', 'silence', 'dark', 'light', 'camera', 'screen', 'shot', 'we '], ['видим', 'слыш', 'крупн', 'общий', 'звук', 'музык', 'тишин', 'темн', 'свет', 'камер', 'экран', 'кадр', 'мы ']]),
      choice('edit', 'analyze', ['At a test screening the audience gets bored in the middle. What should you try first?', 'На тестовом показе зрителям становится скучно в середине. Что попробовать первым?'], [
        ['Tighten or cut scenes that repeat information', 'Сократить или вырезать сцены, которые повторяют информацию'],
        ['Make the music louder', 'Сделать музыку громче'],
        ['Add more scenes to explain things', 'Добавить сцен с объяснениями'],
        ['Add on-screen text describing the plot', 'Добавить титры, пересказывающие сюжет'],
        ['Ignore it — that audience did not get it', 'Не обращать внимания — эти зрители не поняли']
      ], ['“Kill your darlings”: in the edit, pacing improves most by removing what the audience already knows.', '«Убей своих любимцев»: темп в монтаже лучше всего улучшается, если убрать то, что зритель уже знает.'], ['Does each scene show the audience something new?', 'Показывает ли каждая сцена зрителю что-то новое?']),
      choice('sound', 'solve', ['Dialogue was recorded next to a busy road and is hard to hear. What is the best fix for the next shoot?', 'Диалог записали у шумной дороги, и его плохо слышно. Как лучше исправить на следующей съёмке?'], [
        ['Get a directional microphone close to the actors, or move to a quieter spot', 'Поставить направленный микрофон ближе к актёрам или перейти в тихое место'],
        ['Rely on fixing it in editing every time', 'Каждый раз рассчитывать исправить при монтаже'],
        ['Add subtitles instead', 'Вместо этого добавить субтитры'],
        ['Put loud music over it', 'Наложить громкую музыку'],
        ['Ask actors to shout their lines', 'Попросить актёров кричать реплики']
      ], ['Audiences forgive rough images more than bad sound; clean recording on set beats rescue in post.', 'Зрители легче прощают неидеальную картинку, чем плохой звук; чистая запись на площадке лучше спасения на монтаже.'], ['Where is it easiest to solve the problem: on set or later?', 'Где проблему решить проще: на площадке или потом?']),
      choice('permission', 'people', ['You want to film a scene in a local café. What do you do?', 'Ты хочешь снять сцену в местном кафе. Что сделать?'], [
        ['Ask the owner for permission and agree on a time', 'Попросить разрешения у владельца и договориться о времени'],
        ['Film secretly with a phone', 'Снять тайком на телефон'],
        ['Just show up with the crew', 'Просто прийти со съёмочной группой'],
        ['Film first, ask later', 'Сначала снять, потом спросить'],
        ['Film customers without telling them', 'Снимать посетителей, не предупреждая их']
      ], ['Locations, releases, and consent are part of professional filmmaking — and protect your film from legal trouble.', 'Разрешения на локации и согласие людей — часть профессионального кино и защита фильма от юридических проблем.'], ['Whose place and whose faces are in the shot?', 'Чьё это место и чьи лица попадут в кадр?']),
      open('filmfeedback', 'people', ['Give feedback on a friend’s short film: one real strength and one specific suggestion.', 'Дай обратную связь на короткометражку друга: одна настоящая сильная сторона и одно конкретное предложение.'], ['What worked well was...', 'Лучше всего получилось...'], ['Be specific about a moment, and make the suggestion something they can actually do.', 'Говори о конкретном моменте, а предложение сделай выполнимым.'], ['Names a specific strength (a scene, shot, sound, performance) and one concrete, actionable suggestion with a reason; respectful tone.', 'Называет конкретную сильную сторону (сцену, кадр, звук, игру) и одно конкретное выполнимое предложение с причиной; уважительный тон.'], ['The long silent shot of the empty kitchen really made me feel the loss. I’d suggest cutting the phone call scene by half — we already understand she is angry, so it slows the ending.', 'Долгий молчаливый кадр пустой кухни очень передал ощущение потери. Я бы предложил(а) сократить вдвое сцену с телефонным звонком — мы уже понимаем, что она злится, и концовка из-за этого затягивается.'], [['scene', 'shot', 'sound', 'music', 'ending', 'beginning', 'actor', 'suggest', 'could', 'cut', 'because', 'felt', 'liked'], ['сцен', 'кадр', 'звук', 'музык', 'концовк', 'начал', 'актёр', 'предлож', 'можно', 'сократ', 'потому', 'почувств', 'понрав']])
    ]
  }
];
