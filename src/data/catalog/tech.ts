import { choice, open, type ProfessionDef } from '@/data/catalog/types';

export const tech: ProfessionDef[] = [
  {
    slug: 'software-developer', category: 'tech', color: 'coral',
    title: ['Software Developer', 'Разработчик ПО'],
    description: ['Turn messy problems into tools, products, and experiences that work.', 'Превращает сложные задачи в полезные инструменты и продукты.'],
    reality: ['A lot of the day is reading, asking precise questions, testing ideas, and improving small details.', 'Большая часть дня — чтение кода, точные вопросы, проверка идей и улучшение деталей.'],
    subjects: [['Mathematics', 'Математика'], ['Computer science', 'Информатика'], ['Physics', 'Физика']],
    exams: [['SAT / ACT Math', 'SAT / ACT: математика'], ['A-Levels Mathematics', 'A-Levels: математика'], ['IB Math AA', 'IB Math AA'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Computer Science', 'Информатика'], ['Software Engineering', 'Программная инженерия'], ['Information Systems', 'Информационные системы']],
    nextSteps: [['Build a tiny website or automation for a real person.', 'Создай небольшой сайт или автоматизацию для реального человека.'], ['Take a beginner coding course and finish one project.', 'Пройди курс по программированию и доведи один проект до конца.'], ['Ask a developer what a normal Tuesday looks like.', 'Спроси разработчика, как выглядит его обычный вторник.']],
    tasks: [
      choice('debug', 'solve', ['A signup button works on your laptop but not for some users. What is the best first move?', 'Кнопка регистрации работает на твоём ноутбуке, но не у части пользователей. С чего начать?'], [
        ['Ask for the exact steps and check the browser error they see', 'Попросить точные шаги и посмотреть ошибку в их браузере'],
        ['Rewrite the page with a newer framework', 'Переписать страницу на более новом фреймворке'],
        ['Tell users to clear their cache and try tomorrow', 'Попросить пользователей очистить кэш и зайти завтра'],
        ['Test it again on your own laptop', 'Ещё раз проверить на своём ноутбуке'],
        ['Add logging everywhere and wait a week', 'Добавить логи везде и подождать неделю']
      ], ['Great debugging starts with a reproducible example and evidence, not a guess.', 'Хорошая отладка начинается с воспроизводимого примера и фактов, а не с догадок.'], ['What do you need before you can fix anything: a guess or a way to see the bug yourself?', 'Что нужно, прежде чем что-то чинить: догадка или способ увидеть ошибку самому?']),
      choice('priority', 'analyze', ['Your team can fix a typo, speed up a slow checkout, or add a fun animation. What comes first?', 'Команда может исправить опечатку, ускорить медленную оплату или добавить анимацию. Что первым?'], [
        ['Speed up the checkout', 'Ускорить оплату'],
        ['Fix the typo — it takes a minute', 'Исправить опечатку — это минута'],
        ['Add the animation — users will love it', 'Добавить анимацию — пользователям понравится'],
        ['Start all three at once', 'Начать все три сразу'],
        ['Whatever the loudest teammate wants', 'То, что хочет самый громкий коллега']
      ], ['Developers weigh user impact, risk, and effort. A slow checkout loses every customer who gives up.', 'Разработчик учитывает пользу, риск и затраты. Медленная оплата теряет каждого, кто не дождался.'], ['Which problem costs the most users or money every single day?', 'Какая проблема каждый день стоит больше всего пользователей или денег?']),
      open('explain', 'solve', ['Explain a simple everyday process as if you were giving instructions to a computer.', 'Объясни простой бытовой процесс так, будто даёшь инструкции компьютеру.'], ['First, the computer should...', 'Сначала компьютер должен...'], ['Computers need every step in order, plus what to do when something goes wrong.', 'Компьютеру нужен каждый шаг по порядку и что делать, если что-то пошло не так.'], ['Clear steps in order, precise actions, and at least one condition (if/then) or check.', 'Чёткие шаги по порядку, точные действия и хотя бы одно условие («если…, то…») или проверка.'], ['1. Take two slices of bread. 2. Put them in the toaster and set the timer to 2 minutes. 3. When it pops, check the colour: if it is still pale, toast for 30 more seconds. 4. Put the toast on a plate.', '1. Возьми два ломтика хлеба. 2. Положи их в тостер и поставь таймер на 2 минуты. 3. Когда тост выскочит, проверь цвет: если он бледный, поджарь ещё 30 секунд. 4. Переложи тост на тарелку.'], [['first', 'then', 'next', 'if', 'step', 'until', 'check', 'after', 'finally', 'bread', 'toast', 'book', 'bus', '1.', '2.'], ['сначала', 'затем', 'потом', 'если', 'шаг', 'пока', 'провер', 'после', 'наконец', 'хлеб', 'тост', 'книг', 'автобус', '1.', '2.']], ['For example: making toast, borrowing a library book, or finding a bus.', 'Например: приготовить тост, взять книгу в библиотеке или найти нужный автобус.']),
      choice('tradeoff', 'analyze', ['A useful feature would take two weeks to build. What should you do next?', 'Полезная функция займёт две недели. Что сделать дальше?'], [
        ['Clarify the user value and look for a smaller first version', 'Уточнить пользу для пользователей и найти меньшую первую версию'],
        ['Start building right away to save time', 'Сразу начать делать, чтобы сэкономить время'],
        ['Quietly promise it in one week', 'Тихо пообещать сделать за неделю'],
        ['Reject it — big features are too risky', 'Отказаться — большие функции слишком рискованны'],
        ['Build it overnight and skip testing', 'Сделать за ночь и пропустить тестирование']
      ], ['Good product decisions make value, scope, and trade-offs visible before anyone writes code.', 'Хорошее продуктовое решение делает пользу, объём и компромиссы видимыми до того, как написан код.'], ['Is there a way to learn whether it is worth two weeks — spending less?', 'Можно ли узнать, стоит ли это двух недель, потратив меньше?']),
      choice('review', 'people', ['A teammate’s code works but is hard to read. What is the most useful review comment?', 'Код коллеги работает, но его трудно читать. Какой комментарий на ревью полезнее всего?'], [
        ['Point to the confusing part and suggest a clearer name or a split', 'Указать на непонятное место и предложить понятное имя или разбиение'],
        ['“This is messy, please rewrite it.”', '«Тут бардак, перепиши»'],
        ['Approve it — it works, so it is fine', 'Одобрить — раз работает, всё нормально'],
        ['Rewrite it yourself without telling them', 'Молча переписать самому'],
        ['Ask the manager to review it instead', 'Попросить менеджера проверить вместо тебя']
      ], ['Useful reviews are specific and kind: they show where and how to improve, not just that something is wrong.', 'Полезное ревью конкретное и уважительное: показывает, где и как улучшить, а не просто «плохо».'], ['Which comment could the teammate act on in five minutes?', 'По какому комментарию коллега сможет что-то исправить за пять минут?']),
      open('handoff', 'people', ['Write one question you would ask before building a new feature for students.', 'Напиши один вопрос, который стоит задать перед созданием новой функции для студентов.'], ['Before building it, I would ask...', 'Перед разработкой я бы спросил(а)...'], ['A good question reveals the real problem, who has it, or how success will be measured.', 'Хороший вопрос раскрывает реальную проблему, у кого она есть или как понять, что всё получилось.'], ['A genuine question about the users’ problem, their current workaround, or how success is measured — not a yes/no about colours or looks.', 'Настоящий вопрос о проблеме пользователей, о том, как они справляются сейчас, или как измерить успех, — не про цвета и внешний вид.'], ['What do students do today when they miss a deadline reminder, and how would we know the new feature actually helped?', 'Что студенты делают сейчас, когда пропускают напоминание о дедлайне, и как мы поймём, что новая функция действительно помогла?'], [['student', 'problem', 'need', 'why', 'how', 'what', 'currently', 'success', 'measure', 'deadline', 'feature', '?'], ['студент', 'проблем', 'нужн', 'почему', 'как ', 'что ', 'польз', 'сейчас', 'успех', 'измер', 'помо', '?']]),
      choice('incident', 'pressure', ['The site breaks right after your release and users are complaining. What do you do first?', 'Сразу после твоего релиза сайт сломался, пользователи жалуются. Что делать первым?'], [
        ['Roll back to the last working version, then investigate', 'Откатиться на последнюю рабочую версию, потом разбираться'],
        ['Keep patching live until it works', 'Чинить прямо на живом сайте, пока не заработает'],
        ['Wait to see whether it recovers by itself', 'Подождать — вдруг само пройдёт'],
        ['Find out whose code caused it', 'Выяснить, чей код виноват'],
        ['Post an apology and log off for the day', 'Написать извинение и уйти до завтра']
      ], ['Under pressure, first restore service for users, then find the cause calmly.', 'Под давлением сначала возвращают работу сервиса для людей, а причину ищут спокойно потом.'], ['What gets users back to a working site fastest and with the least risk?', 'Что быстрее и безопаснее всего вернёт людям рабочий сайт?']),
      choice('tests', 'analyze', ['A function gives a discount to customers under 18. Which test values are most valuable?', 'Функция даёт скидку клиентам младше 18 лет. Какие значения полезнее всего проверить?'], [
        ['17, 18 and 19 — right around the boundary', '17, 18 и 19 — прямо около границы'],
        ['Only 10', 'Только 10'],
        ['30, 40 and 50', '30, 40 и 50'],
        ['A random age on every run', 'Случайный возраст при каждом запуске'],
        ['None — the function is only three lines', 'Никакие — функция всего в три строки']
      ], ['Bugs love boundaries: “less than” versus “less than or equal” is a classic mistake.', 'Ошибки любят границы: «меньше» вместо «меньше или равно» — классическая ошибка.'], ['Where exactly would an off-by-one mistake show up?', 'Где именно проявится ошибка «на единицу»?']),
      choice('learning', 'solve', ['You need a library you have never used before. What is the best approach?', 'Нужна библиотека, с которой ты никогда не работал(а). Как лучше поступить?'], [
        ['Read the official quick start and build a tiny example first', 'Прочитать официальный quick start и сначала собрать маленький пример'],
        ['Paste the first snippet you find on a forum', 'Вставить первый попавшийся кусок кода с форума'],
        ['Avoid it and write everything yourself', 'Обойтись без неё и написать всё самому'],
        ['Ask a teammate to do that part for you', 'Попросить коллегу сделать эту часть за тебя'],
        ['Watch a three-hour course before touching code', 'Посмотреть трёхчасовой курс, прежде чем трогать код']
      ], ['Developers learn constantly; a small working example teaches faster than copying or endless theory.', 'Разработчики учатся постоянно; маленький рабочий пример учит быстрее, чем копирование или бесконечная теория.'], ['What gives you reliable information and quick feedback at the same time?', 'Что даёт надёжную информацию и быструю обратную связь одновременно?']),
      open('bugreport', 'analyze', ['Write a short bug report: what happened, what you expected, and how to reproduce it.', 'Напиши короткий баг-репорт: что произошло, что ожидалось и как это повторить.'], ['Steps: 1)...', 'Шаги: 1)...'], ['A developer should be able to see the bug from your report alone.', 'Разработчик должен увидеть ошибку по одному твоему описанию.'], ['Includes reproduction steps, expected vs actual result, and the device or browser.', 'Есть шаги воспроизведения, ожидаемый и фактический результат, устройство или браузер.'], ['On iPhone 13 (Safari): 1) open a note, 2) type text, 3) tap “Save”. Expected: “Saved” message and the note in the list. Actual: nothing happens, the text is lost after reload.', 'iPhone 13 (Safari): 1) открыть заметку, 2) ввести текст, 3) нажать «Сохранить». Ожидалось: сообщение «Сохранено» и заметка в списке. Фактически: ничего не происходит, после перезагрузки текст пропадает.'], [['step', 'expected', 'actual', 'phone', 'iphone', 'android', 'browser', 'safari', 'chrome', 'tap', 'click', 'save', 'nothing', 'reproduce', '1'], ['шаг', 'ожида', 'фактич', 'телефон', 'iphone', 'android', 'браузер', 'safari', 'chrome', 'нажа', 'сохран', 'ничего', 'повтор', '1']], ['The “Save” button in a notes app does nothing on a phone.', 'Кнопка «Сохранить» в приложении заметок не работает на телефоне.'])
    ]
  },
  {
    slug: 'data-analyst', category: 'tech', color: 'blue',
    title: ['Data Analyst', 'Аналитик данных'],
    description: ['Clean messy information, find meaningful patterns, and explain what the data can and cannot say.', 'Находит в данных закономерности и честно объясняет, что они могут и не могут показать.'],
    reality: ['Analysis is careful questioning, checking assumptions, visualising evidence, and communicating uncertainty.', 'Аналитика — это проверка предположений, визуализация доказательств и честный разговор о неопределённости.'],
    subjects: [['Mathematics', 'Математика'], ['Statistics', 'Статистика'], ['Computer science', 'Информатика']],
    exams: [['SAT / ACT Math', 'SAT / ACT: математика'], ['A-Levels Mathematics', 'A-Levels: математика'], ['IB Math AI', 'IB Math AI'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Statistics', 'Статистика'], ['Economics', 'Экономика'], ['Data Science', 'Наука о данных'], ['Business Analytics', 'Бизнес-аналитика']],
    nextSteps: [['Track one everyday habit and visualise it honestly.', 'Отследи одну привычку и честно покажи её на графике.'], ['Learn spreadsheet formulas and basic statistics.', 'Изучи формулы в таблицах и базовую статистику.'], ['Ask what decision a dataset is supposed to support.', 'Уточняй, какое решение должен поддержать набор данных.']],
    tasks: [
      choice('quality', 'analyze', ['A spreadsheet has several blank values. What should you do before calculating an average?', 'В таблице есть пустые ячейки. Что сделать до расчёта среднего?'], [
        ['Find out why they are missing and document your choice', 'Выяснить, почему они пустые, и записать своё решение'],
        ['Treat blanks as zero', 'Считать пустые ячейки нулями'],
        ['Delete every row with a blank', 'Удалить все строки с пропусками'],
        ['Quietly fill blanks with the average', 'Тихо заполнить пропуски средним значением'],
        ['Hide the column so nobody asks', 'Скрыть столбец, чтобы никто не спрашивал']
      ], ['Missing data can change the meaning of a result; analysts investigate before transforming it.', 'Пропуски могут изменить смысл результата, поэтому аналитик сначала выясняет их причину.'], ['Could the reason for the blanks itself be important information?', 'Может ли сама причина пропусков быть важной информацией?']),
      choice('chart', 'analyze', ['A chart makes a small change look huge. What should you inspect first?', 'График создаёт впечатление огромного изменения. Что проверить первым?'], [
        ['The axis scale and units', 'Шкалу осей и единицы измерения'],
        ['The chart title', 'Заголовок графика'],
        ['The colour palette', 'Цветовую палитру'],
        ['Whether there is a legend', 'Есть ли легенда'],
        ['The number of gridlines', 'Количество линий сетки']
      ], ['An axis that starts at 95 instead of 0 can turn a 2% change into a cliff.', 'Ось, которая начинается с 95, а не с 0, превращает изменение на 2% в обрыв.'], ['What part of a chart decides how big a difference looks?', 'Какая часть графика решает, насколько большой кажется разница?']),
      open('finding', 'analyze', ['Write one cautious sentence describing a trend without claiming it proves a cause.', 'Опиши тренд одним осторожным предложением, не утверждая, что он доказывает причину.'], ['The data shows...', 'Данные показывают...'], ['Describe what moved together — not why it happened.', 'Опиши, что менялось вместе, — а не почему это произошло.'], ['States a pattern with numbers or direction and avoids causal words like “because” or “caused”; may mention other possible explanations.', 'Описывает закономерность (направление или числа) без причинных слов вроде «из-за» или «вызвало»; может упомянуть другие объяснения.'], ['In our survey, students who slept more than 8 hours reported higher test scores on average, but this does not show that sleep caused the difference.', 'В нашем опросе ученики, спавшие больше 8 часов, в среднем сообщали о более высоких оценках, но это не доказывает, что причина именно во сне.'], [['show', 'associated', 'linked', 'correlat', 'tend', 'average', 'higher', 'lower', 'increase', 'decrease', 'not prove', 'may', 'might', '%'], ['показыва', 'связан', 'коррел', 'в среднем', 'выше', 'ниже', 'рост', 'снижен', 'не доказ', 'может', 'возможно', 'тенденц', '%']]),
      choice('question', 'people', ['A manager asks, “What should we do?” What should you clarify first?', 'Менеджер спрашивает: «Что нам делать?» Что уточнить первым?'], [
        ['Which decision they face and how success will be measured', 'Какое решение им нужно принять и как измерить успех'],
        ['Nothing — start building a dashboard', 'Ничего — сразу делать дашборд'],
        ['Which chart type they like', 'Какой тип графиков им нравится'],
        ['Whether the answer should sound exciting', 'Должен ли ответ звучать впечатляюще'],
        ['How many rows of data exist', 'Сколько строк в данных']
      ], ['Useful analysis starts with a decision and a definition of success.', 'Полезный анализ начинается с решения и понятного показателя успеха.'], ['Without knowing the decision, how would you know which numbers matter?', 'Не зная решения, как понять, какие цифры важны?']),
      choice('average', 'analyze', ['Most employees earn about 40,000 a year, and the CEO earns 2,000,000. Which number best describes a typical employee?', 'Большинство сотрудников получают около 40 000 в год, а директор — 2 000 000. Какое число лучше описывает типичного сотрудника?'], [
        ['The median salary', 'Медианная зарплата'],
        ['The mean (average) salary', 'Средняя арифметическая зарплата'],
        ['The highest salary', 'Максимальная зарплата'],
        ['The total payroll', 'Общий фонд зарплаты'],
        ['The range between lowest and highest', 'Разброс между минимумом и максимумом']
      ], ['One extreme value pulls the mean up; the median stays with the typical person.', 'Одно экстремальное значение тянет среднее вверх, а медиана остаётся у типичного человека.'], ['Which measure ignores how extreme the biggest value is?', 'Какая мера не зависит от того, насколько велико самое большое значение?']),
      open('limit', 'analyze', ['Name one limitation you would mention when presenting a small survey.', 'Назови одно ограничение, которое стоит указать, представляя результаты небольшого опроса.'], ['One limitation is...', 'Одно ограничение — это...'], ['Think about who answered, how many, and how the questions were asked.', 'Подумай, кто отвечал, сколько человек и как были заданы вопросы.'], ['Names a concrete limitation (sample size, who was asked, self-reporting, wording) and why it matters for the conclusions.', 'Называет конкретное ограничение (размер выборки, кто отвечал, самоотчёт, формулировки) и почему оно важно для выводов.'], ['Only 25 students from one class answered, so the results may not represent the whole school, and people may have overstated how much they study.', 'Ответили только 25 учеников одного класса, поэтому результаты могут не отражать всю школу, а люди могли преувеличить, сколько они учатся.'], [['sample', 'only', 'small', 'people', 'represent', 'bias', 'self', 'question', 'wording', 'class', 'answer', 'may not'], ['выборк', 'только', 'мало', 'небольш', 'человек', 'представ', 'смещ', 'вопрос', 'формулир', 'класс', 'ответ', 'не отража']]),
      choice('sample', 'analyze', ['A survey about school lunches was shared only in the sports club chat. What is the main problem?', 'Опрос о школьных обедах разослали только в чат спортивной секции. В чём главная проблема?'], [
        ['The sample may not represent all students', 'Выборка может не отражать всех учеников'],
        ['The survey has too many questions', 'В опросе слишком много вопросов'],
        ['Online surveys are always invalid', 'Онлайн-опросы всегда недействительны'],
        ['Nothing, as long as many people answer', 'Никакой, если ответит много людей'],
        ['Chats make people answer too quickly', 'В чатах люди отвечают слишком быстро']
      ], ['Who you ask shapes the answer: athletes may eat differently from other students.', 'От того, кого спрашивают, зависит ответ: спортсмены могут питаться иначе, чем остальные.'], ['Would the answers change if you asked a different group?', 'Изменились бы ответы, если бы спросили другую группу?']),
      choice('stakeholder', 'people', ['Your result contradicts what the director strongly believes. What is the best move?', 'Твой результат противоречит тому, во что твёрдо верит директор. Как лучше поступить?'], [
        ['Show the data and method calmly and discuss what could explain the gap', 'Спокойно показать данные и метод и обсудить, чем может объясняться разница'],
        ['Adjust the result so it matches their view', 'Подправить результат под его мнение'],
        ['Leave the finding out of the report', 'Не включать вывод в отчёт'],
        ['Tell them in the meeting that they are wrong', 'На встрече сказать, что он ошибается'],
        ['Email the result and skip the meeting', 'Отправить результат письмом и пропустить встречу']
      ], ['Analysts protect the truth of the data while staying open about limits and alternative explanations.', 'Аналитик защищает правдивость данных, оставаясь открытым к ограничениям и другим объяснениям.'], ['How can you stay honest and still keep the conversation constructive?', 'Как остаться честным и при этом сохранить конструктивный разговор?']),
      choice('deadline', 'pressure', ['A report is due in one hour and you find an error in the data source. What do you do?', 'Отчёт нужно сдать через час, и ты находишь ошибку в источнике данных. Что делать?'], [
        ['Tell the stakeholder now, fix what you can, and flag what is uncertain', 'Сразу сказать заказчику, исправить что успеешь и отметить, что под вопросом'],
        ['Deliver on time and say nothing', 'Сдать вовремя и промолчать'],
        ['Silently miss the deadline', 'Молча сорвать срок'],
        ['Delete the affected numbers without a note', 'Удалить затронутые цифры без пояснений'],
        ['Blame the data team in the report', 'Обвинить в отчёте команду данных']
      ], ['A late or incomplete report is recoverable; a confident wrong number can drive a bad decision.', 'Опоздание или неполный отчёт можно исправить, а уверенная неверная цифра приводит к плохому решению.'], ['Which is worse for the people using your report: a delay, or a wrong number they trust?', 'Что хуже для тех, кто пользуется отчётом: задержка или неверная цифра, которой они доверяют?']),
      open('explainchart', 'people', ['Online orders rose from 200 to 260 in a month. Explain this in one or two sentences for a shop owner who dislikes numbers.', 'Онлайн-заказы выросли с 200 до 260 за месяц. Объясни это одним-двумя предложениями владельцу магазина, который не любит цифры.'], ['Last month...', 'За последний месяц...'], ['Translate the numbers into something the owner cares about and keep it simple.', 'Переведи цифры в то, что важно владельцу, и говори просто.'], ['Plain-language summary of the change (about 30% or 60 more orders), what it means for the shop, and ideally one caution or next step.', 'Простыми словами описывает изменение (примерно +30% или +60 заказов), что это значит для магазина и, желательно, одну оговорку или следующий шаг.'], ['You received about 60 more online orders than the month before — roughly 2 extra orders a day, a 30% increase. It is worth checking next month whether this growth continues.', 'Онлайн-заказов стало примерно на 60 больше, чем месяцем раньше, — около двух лишних заказов в день, рост на 30%. Стоит проверить в следующем месяце, сохранится ли рост.'], [['more', 'order', 'increase', 'grew', 'rise', '30', '60', 'day', 'customer', 'month', 'shop', 'check'], ['больше', 'заказ', 'рост', 'вырос', 'увелич', '30', '60', 'день', 'клиент', 'месяц', 'магазин', 'провер']])
    ]
  },
  {
    slug: 'cybersecurity-specialist', category: 'tech', color: 'green',
    title: ['Cybersecurity Specialist', 'Специалист по кибер­безопасности'],
    description: ['Protect people and systems by spotting threats early and responding calmly.', 'Защищает людей и системы: замечает угрозы заранее и спокойно реагирует на атаки.'],
    reality: ['Security work is careful investigation, patient explanation to non-experts, and staying calm during incidents.', 'Работа в безопасности — это внимательные расследования, терпеливые объяснения для неспециалистов и спокойствие во время инцидентов.'],
    subjects: [['Computer science', 'Информатика'], ['Mathematics', 'Математика'], ['English', 'Английский язык']],
    exams: [['SAT / ACT Math', 'SAT / ACT: математика'], ['A-Levels Computer Science', 'A-Levels: информатика'], ['IB Computer Science', 'IB: информатика'], ['CompTIA Security+ (later)', 'CompTIA Security+ (позже)']],
    majors: [['Cybersecurity', 'Информационная безопасность'], ['Computer Science', 'Информатика'], ['Network Engineering', 'Сетевые технологии']],
    nextSteps: [['Try a beginner Capture The Flag (CTF) challenge.', 'Попробуй начальный уровень соревнований CTF.'], ['Turn on two-factor authentication for your family’s accounts.', 'Включи двухфакторную аутентификацию в аккаунтах своей семьи.'], ['Learn how the internet works: IP addresses, DNS, HTTPS.', 'Разберись, как устроен интернет: IP-адреса, DNS, HTTPS.']],
    tasks: [
      choice('phishing', 'analyze', ['An email says “Your account will be locked — click here” and comes from support@paypa1.com. What is the most telling sign of phishing?', 'Письмо «Ваш аккаунт будет заблокирован — нажмите здесь» пришло с адреса support@paypa1.com. Какой признак фишинга самый явный?'], [
        ['The sender’s domain is misspelled', 'Домен отправителя написан с ошибкой'],
        ['It includes the company logo', 'В письме есть логотип компании'],
        ['It was sent on a Monday', 'Оно пришло в понедельник'],
        ['It addresses you by your first name', 'В нём обращаются к тебе по имени'],
        ['The message is short', 'Сообщение короткое']
      ], ['“paypa1” with a digit 1 imitates a real brand — look-alike domains are a classic trick, combined with urgency.', '«paypa1» с цифрой 1 имитирует настоящий бренд: похожие домены и срочность — классический приём.'], ['Look closely at each character of the address.', 'Посмотри внимательно на каждый символ адреса.']),
      choice('password', 'solve', ['Which advice would protect staff accounts the most?', 'Какой совет лучше всего защитит аккаунты сотрудников?'], [
        ['Use a password manager and turn on two-factor authentication', 'Пользоваться менеджером паролей и включить двухфакторную аутентификацию'],
        ['Change your password every week', 'Менять пароль каждую неделю'],
        ['Use one very strong password everywhere', 'Использовать один очень сильный пароль везде'],
        ['Add “!” to the end of every password', 'Добавлять «!» в конец каждого пароля'],
        ['Keep passwords on a note under the keyboard', 'Хранить пароли на записке под клавиатурой']
      ], ['Unique passwords stop one leak spreading to every account, and a second factor blocks most stolen-password logins.', 'Уникальные пароли не дают одной утечке затронуть все аккаунты, а второй фактор блокирует большинство входов по украденному паролю.'], ['What happens to all your accounts if one website leaks your password?', 'Что станет со всеми аккаунтами, если один сайт допустит утечку пароля?']),
      choice('ransom', 'pressure', ['A colleague’s laptop suddenly shows a ransom note. What should happen first?', 'На ноутбуке коллеги внезапно появилось требование выкупа. Что сделать первым?'], [
        ['Disconnect it from the network and report to the security team', 'Отключить его от сети и сообщить команде безопасности'],
        ['Pay quickly before the price goes up', 'Быстро заплатить, пока цена не выросла'],
        ['Restart it a few times', 'Несколько раз перезагрузить'],
        ['Delete suspicious files yourself', 'Самостоятельно удалить подозрительные файлы'],
        ['Keep working and hope it goes away', 'Продолжать работать и надеяться, что пройдёт']
      ], ['Containment first: isolating the device stops the malware from spreading, and experts preserve evidence.', 'Сначала — изоляция: отключение от сети не даёт вирусу распространиться, а специалисты сохраняют следы.'], ['What stops the damage from reaching other computers?', 'Что остановит распространение ущерба на другие компьютеры?']),
      open('grandma', 'people', ['Explain to a grandparent why they should never share the code from an SMS with a “bank employee” on the phone.', 'Объясни бабушке или дедушке, почему нельзя сообщать код из СМС «сотруднику банка» по телефону.'], ['The code is like...', 'Этот код — как...'], ['Use a simple comparison and one clear rule they can remember.', 'Используй простое сравнение и одно понятное правило, которое легко запомнить.'], ['Simple language, explains that the code gives access to the account, notes that real banks never ask for it, and gives a clear action (hang up and call the bank).', 'Простые слова; объясняет, что код даёт доступ к счёту, что настоящий банк его никогда не спрашивает, и даёт понятное действие (положить трубку и перезвонить в банк).'], ['That code is like the key to your front door: whoever has it can take your money. A real bank never asks for it. If someone does, hang up and call the number on the back of your card.', 'Этот код — как ключ от квартиры: у кого он есть, тот может забрать деньги. Настоящий банк никогда его не спрашивает. Если просят — положи трубку и позвони по номеру на обратной стороне карты.'], [['code', 'bank', 'never', 'money', 'key', 'hang up', 'call', 'access', 'account', 'scam', 'fraud', 'card'], ['код', 'банк', 'никогда', 'деньг', 'ключ', 'трубк', 'позвон', 'доступ', 'счёт', 'счет', 'мошенн', 'карт']]),
      choice('privilege', 'analyze', ['An intern needs to update blog posts on the company website. What access should they get?', 'Стажёру нужно обновлять статьи в блоге на сайте компании. Какой доступ ему дать?'], [
        ['Blog editing only, for the length of the internship', 'Только редактирование блога и только на время стажировки'],
        ['Full administrator rights to be safe', 'Полные права администратора — на всякий случай'],
        ['Your own admin password', 'Свой собственный пароль администратора'],
        ['The same access as the technical director', 'Такой же доступ, как у технического директора'],
        ['Access to everything, reviewed in a year', 'Доступ ко всему с проверкой через год']
      ], ['Least privilege: give exactly the access a task needs, for as long as it is needed.', 'Принцип минимальных привилегий: ровно тот доступ, который нужен для задачи, и только на нужный срок.'], ['If this account were hacked tomorrow, how much damage could it do?', 'Если этот аккаунт взломают завтра, какой ущерб он сможет нанести?']),
      open('incidentnote', 'analyze', ['Write a short incident note: what happened, when, what was done, and what comes next.', 'Напиши короткую запись об инциденте: что случилось, когда, что сделано и что дальше.'], ['At 14:05...', 'В 14:05...'], ['Stick to facts and times; a colleague should understand it without asking you.', 'Только факты и время; коллега должен понять всё без вопросов к тебе.'], ['Factual timeline with times, the action taken, and a clear next step (check logs, train staff, watch the account).', 'Фактическая хронология со временем, принятое действие и понятный следующий шаг (проверить логи, обучить сотрудников, наблюдать за аккаунтом).'], ['14:05 — an employee entered their password on a fake login page. 14:20 — password reset and all sessions signed out. Next: check the account’s login history for the past 24 hours and warn staff about the fake page.', '14:05 — сотрудник ввёл пароль на поддельной странице входа. 14:20 — пароль сброшен, все сессии завершены. Далее: проверить историю входов за последние сутки и предупредить сотрудников о поддельной странице.'], [['14:05', '14:20', 'password', 'reset', 'link', 'fake', 'next', 'check', 'log', 'account', 'employee', 'warn'], ['14:05', '14:20', 'парол', 'сброс', 'ссылк', 'поддел', 'далее', 'провер', 'лог', 'аккаунт', 'сотрудник', 'предупред']], ['At 14:05 an employee clicked a fake login link and entered their password; you reset it at 14:20.', 'В 14:05 сотрудник перешёл по поддельной ссылке и ввёл пароль; в 14:20 ты его сбросил(а).']),
      choice('update', 'solve', ['A critical security update is released for a system everyone at work uses. What is the best plan?', 'Вышло критическое обновление безопасности для системы, которой пользуются все сотрудники. Какой план лучше?'], [
        ['Test it quickly on a few machines, then roll it out soon with a way back', 'Быстро проверить на нескольких компьютерах, затем скоро установить всем с возможностью отката'],
        ['Install it everywhere this minute without testing', 'Прямо сейчас установить везде без проверки'],
        ['Wait a few months to see whether others have problems', 'Подождать пару месяцев, не будет ли проблем у других'],
        ['Skip it — the system works fine', 'Пропустить — система и так работает'],
        ['Let each employee decide whether to install it', 'Пусть каждый сотрудник сам решит, ставить ли']
      ], ['Security is a balance: critical holes need fast patching, but a quick test prevents breaking everyone’s work.', 'Безопасность — это баланс: критические дыры закрывают быстро, но короткая проверка не даёт сломать работу всем.'], ['Which option is both fast and safe?', 'Какой вариант одновременно быстрый и безопасный?']),
      choice('ethics', 'people', ['You notice a vulnerability in your school’s website that could expose student data. What do you do?', 'Ты заметил(а) уязвимость на сайте школы, через которую можно увидеть данные учеников. Что делать?'], [
        ['Report it privately to the school and do not exploit it', 'Тихо сообщить школе и не пользоваться уязвимостью'],
        ['Post it online so it gets fixed faster', 'Опубликовать в интернете, чтобы быстрее починили'],
        ['Test it by changing a grade', 'Проверить, изменив чью-то оценку'],
        ['Tell your friends about it', 'Рассказать друзьям'],
        ['Ignore it — it is not your job', 'Проигнорировать — это не твоя работа']
      ], ['Responsible disclosure protects people: report privately, never use the hole, give time to fix it.', 'Ответственное раскрытие защищает людей: сообщить лично, не использовать уязвимость, дать время на исправление.'], ['Which option helps without putting anyone’s data at risk?', 'Какой вариант помогает, не подвергая риску чьи-то данные?']),
      choice('logs', 'analyze', ['Logs show 500 failed logins to one account from many countries within ten minutes. What is most likely happening?', 'В логах 500 неудачных попыток входа в один аккаунт из разных стран за десять минут. Что вероятнее всего происходит?'], [
        ['An automated password-guessing attack', 'Автоматический подбор пароля'],
        ['The user forgot their password', 'Пользователь забыл пароль'],
        ['The server clock is wrong', 'На сервере сбились часы'],
        ['Normal traffic for a busy site', 'Обычный трафик популярного сайта'],
        ['The user is travelling a lot', 'Пользователь много путешествует']
      ], ['Hundreds of attempts from many locations in minutes point to a bot, not a person.', 'Сотни попыток из разных мест за минуты — это бот, а не человек.'], ['Could one human really try 50 passwords a minute from different countries?', 'Может ли один человек пробовать 50 паролей в минуту из разных стран?']),
      open('wifi', 'solve', ['Write one simple security rule for a small café’s Wi-Fi and explain why it matters.', 'Сформулируй одно простое правило безопасности для Wi-Fi в небольшом кафе и объясни, зачем оно нужно.'], ['Rule: ...', 'Правило: ...'], ['Think about who connects to the network and what they could reach.', 'Подумай, кто подключается к сети и к чему он может получить доступ.'], ['A concrete, practical rule (separate guest network, changing the password regularly, no access to the cash register) plus the reason — the risk it prevents.', 'Конкретное практичное правило (отдельная гостевая сеть, регулярная смена пароля, нет доступа к кассе) и причина — какой риск оно предотвращает.'], ['Guests use a separate network from the cash register and staff computers, because a stranger on the same network could try to reach payment devices.', 'Гости подключаются к отдельной сети, а не к той, где касса и компьютеры персонала, потому что посторонний в той же сети может попытаться добраться до платёжных устройств.'], [['guest', 'separate', 'password', 'network', 'register', 'payment', 'because', 'access', 'change', 'router', 'staff'], ['гост', 'отдельн', 'парол', 'сет', 'касс', 'оплат', 'потому', 'доступ', 'смен', 'роутер', 'персонал']])
    ]
  },
  {
    slug: 'game-developer', category: 'tech', color: 'lilac',
    title: ['Game Developer', 'Разработчик игр'],
    description: ['Design and build worlds, rules, and moments that make people want to keep playing.', 'Придумывает и создаёт миры, правила и моменты, из-за которых хочется играть дальше.'],
    reality: ['Game development is iteration: prototypes, playtests, bug fixing, tough scope cuts, and close teamwork with artists.', 'Разработка игр — это итерации: прототипы, плейтесты, исправление багов, тяжёлые решения что вырезать и командная работа с художниками.'],
    subjects: [['Mathematics', 'Математика'], ['Computer science', 'Информатика'], ['Physics', 'Физика'], ['Art / Design', 'Искусство и дизайн']],
    exams: [['SAT / ACT Math', 'SAT / ACT: математика'], ['A-Levels Computer Science', 'A-Levels: информатика'], ['Portfolio of small games', 'Портфолио небольших игр'], ['IELTS / TOEFL', 'IELTS / TOEFL']],
    majors: [['Game Development', 'Разработка игр'], ['Computer Science', 'Информатика'], ['Interactive Media', 'Интерактивные медиа']],
    nextSteps: [['Join a weekend game jam and finish a tiny game.', 'Поучаствуй в гейм-джеме на выходных и доделай маленькую игру.'], ['Try a free engine like Godot or Unity with a beginner tutorial.', 'Попробуй бесплатный движок Godot или Unity по начальному уроку.'], ['Watch a friend play your game without helping — take notes.', 'Посмотри, как друг играет в твою игру, не подсказывая, и запиши наблюдения.']],
    tasks: [
      choice('playtest', 'people', ['Many players quit at level 3. What should you do first?', 'Многие игроки бросают игру на третьем уровне. Что сделать первым?'], [
        ['Watch playtests to see where and why they get stuck', 'Посмотреть плейтесты: где и почему они застревают'],
        ['Make level 3 harder so it feels epic', 'Сделать уровень 3 сложнее, чтобы было эпичнее'],
        ['Delete level 3 entirely', 'Полностью удалить уровень 3'],
        ['Add more rewards everywhere', 'Добавить больше наград везде'],
        ['Assume those players are just not good enough', 'Решить, что эти игроки просто недостаточно хороши']
      ], ['Players rarely say what is wrong; watching them play shows the real problem.', 'Игроки редко говорят, что не так; наблюдение за игрой показывает реальную проблему.'], ['Before changing the level, what do you need to know?', 'Что нужно узнать, прежде чем менять уровень?']),
      choice('scope', 'solve', ['You have three weeks for a game jam. Which plan is smartest?', 'На гейм-джем есть три недели. Какой план самый разумный?'], [
        ['One core mechanic, built well and polished', 'Одна главная механика, сделанная хорошо и отполированная'],
        ['A huge open world', 'Огромный открытый мир'],
        ['Online multiplayer for 100 players', 'Онлайн-мультиплеер на 100 игроков'],
        ['All three ideas at once', 'Все три идеи сразу'],
        ['Two weeks writing the story document first', 'Сначала две недели писать сценарий']
      ], ['Small scope finished beats big scope abandoned — most jam winners do one thing very well.', 'Маленькая готовая игра лучше большой брошенной — победители джемов обычно делают одну вещь очень хорошо.'], ['What can a small team actually finish and test in three weeks?', 'Что небольшая команда реально успеет закончить и проверить за три недели?']),
      open('mechanic', 'create', ['Describe one simple game mechanic built around “time”.', 'Опиши одну простую игровую механику, построенную вокруг «времени».'], ['The player can...', 'Игрок может...'], ['Say what the player does, what happens, and what makes it interesting or challenging.', 'Скажи, что делает игрок, что происходит и что делает это интересным или сложным.'], ['Describes a player action, its effect on the game, and a limit or challenge that creates interesting choices.', 'Описывает действие игрока, его эффект в игре и ограничение или вызов, который создаёт интересный выбор.'], ['The player can rewind the last 5 seconds to undo a mistake, but only three times per level, so they must decide when a rewind is really worth it.', 'Игрок может отмотать последние 5 секунд, чтобы исправить ошибку, но только три раза за уровень, поэтому нужно решать, когда перемотка действительно того стоит.'], [['player', 'time', 'rewind', 'slow', 'stop', 'second', 'limit', 'only', 'can', 'level', 'enemy', 'when', 'but'], ['игрок', 'врем', 'перемот', 'замедл', 'останов', 'секунд', 'огранич', 'только', 'может', 'уров', 'враг', 'когда', 'но ']]),
      choice('bugpriority', 'analyze', ['The game ships tomorrow. Which bug must be fixed first?', 'Завтра релиз игры. Какой баг нужно исправить первым?'], [
        ['The game crashes when saving', 'Игра вылетает при сохранении'],
        ['A tree texture flickers slightly', 'Текстура дерева немного мерцает'],
        ['There is a typo in the credits', 'Опечатка в титрах'],
        ['The menu music is a bit quiet', 'Музыка в меню немного тихая'],
        ['One enemy walks a little slowly', 'Один враг ходит чуть медленно']
      ], ['Severity first: losing progress ruins the experience for everyone; cosmetic issues can wait for a patch.', 'Сначала серьёзность: потеря прогресса портит игру всем, косметику можно поправить патчем.'], ['Which bug makes players lose something they cannot get back?', 'Из-за какого бага игроки теряют то, что уже не вернуть?']),
      choice('balance', 'analyze', ['90% of players choose the same weapon. What is the best response?', '90% игроков выбирают одно и то же оружие. Как лучше отреагировать?'], [
        ['Check the data on why, adjust it gradually, and playtest again', 'Посмотреть данные, почему так, аккуратно поправить и снова протестировать'],
        ['Delete the weapon', 'Удалить это оружие'],
        ['Make every weapon identical', 'Сделать всё оружие одинаковым'],
        ['Ignore it — players like it', 'Игнорировать — игрокам же нравится'],
        ['Double its power to make it official', 'Удвоить его силу — пусть будет главным']
      ], ['Balancing is iterative: understand the cause, make small changes, and measure again.', 'Баланс — это итерации: понять причину, внести небольшие изменения и снова измерить.'], ['What should you learn before touching the numbers?', 'Что нужно узнать, прежде чем менять цифры?']),
      open('tutorial', 'create', ['Write the first tutorial hint that teaches a player to jump — without a wall of text.', 'Напиши первую обучающую подсказку, которая учит игрока прыгать, — без стены текста.'], ['Press...', 'Нажми...'], ['Short, action-first, and connected to what the player sees on screen.', 'Коротко, с упором на действие и привязкой к тому, что игрок видит на экране.'], ['One short, clear instruction naming the button and a reason or goal in the game world; ideally teaches by doing.', 'Одна короткая понятная инструкция с названием кнопки и причиной или целью в игровом мире; лучше всего — обучение через действие.'], ['A small gap appears in front of the player with the hint: “Press Space to jump over the gap.” The hint disappears after the first successful jump.', 'Перед игроком появляется небольшая яма и подсказка: «Нажми Пробел, чтобы перепрыгнуть яму». После первого удачного прыжка подсказка исчезает.'], [['press', 'space', 'jump', 'button', 'tap', 'gap', 'over', 'to ', 'key', 'hold'], ['нажм', 'пробел', 'прыг', 'кнопк', 'яму', 'яма', 'через', 'чтобы', 'клавиш', 'удерж']]),
      choice('team', 'people', ['The artist and the programmer disagree about how long a feature will take. What helps most?', 'Художник и программист спорят, сколько займёт новая функция. Что поможет больше всего?'], [
        ['Have both estimate their part and agree on a smaller version together', 'Попросить обоих оценить свою часть и вместе договориться о меньшей версии'],
        ['Side with the artist', 'Встать на сторону художника'],
        ['Side with the programmer', 'Встать на сторону программиста'],
        ['Drop the feature without discussion', 'Убрать функцию без обсуждения'],
        ['Let them argue until someone gives up', 'Пусть спорят, пока кто-то не сдастся']
      ], ['Games are made by mixed teams; shared estimates turn a fight into a plan.', 'Игры делают смешанные команды; общая оценка превращает спор в план.'], ['How can both people’s knowledge end up in the decision?', 'Как сделать так, чтобы в решении учли знания обоих?']),
      choice('crunch', 'pressure', ['The deadline is in two days and three features are unfinished. What do you do?', 'До дедлайна два дня, три функции не доделаны. Что делать?'], [
        ['Cut or postpone the least important ones and ship a stable build', 'Убрать или отложить наименее важные и выпустить стабильную версию'],
        ['Work all night to finish everything', 'Работать ночами и доделать всё'],
        ['Ship everything half-finished with crashes', 'Выпустить всё полусырым, с вылетами'],
        ['Move the deadline without telling anyone', 'Сдвинуть срок, никому не сказав'],
        ['Add a fourth feature to impress players', 'Добавить четвёртую функцию, чтобы впечатлить игроков']
      ], ['Professional teams protect quality by cutting scope, not by burning out.', 'Профессиональные команды сохраняют качество за счёт сокращения объёма, а не выгорания.'], ['What matters more to players: more features or a game that works?', 'Что важнее игрокам: больше функций или игра, которая работает?']),
      choice('colorblind', 'people', ['Colour-blind players cannot tell the red team from the green team. What is the best fix?', 'Игроки с дальтонизмом не отличают красную команду от зелёной. Как лучше исправить?'], [
        ['Add shapes or patterns besides colour, plus a colour-blind mode', 'Добавить формы или узоры помимо цвета и режим для дальтоников'],
        ['Make the colours brighter', 'Сделать цвета ярче'],
        ['Tell players to guess', 'Сказать игрокам угадывать'],
        ['Remove teams from the game', 'Убрать команды из игры'],
        ['Add a warning on the start screen', 'Добавить предупреждение на стартовом экране']
      ], ['Accessibility means never relying on colour alone; many games offer dedicated modes.', 'Доступность означает не полагаться только на цвет; многие игры делают специальные режимы.'], ['How else, apart from colour, can two things look different?', 'Чем ещё, кроме цвета, могут отличаться две вещи?']),
      open('pitch', 'create', ['Pitch a game idea in two sentences: who you play, what the goal is, and why it is fun.', 'Опиши идею игры в двух предложениях: за кого играешь, какая цель и почему это интересно.'], ['You play as...', 'Ты играешь за...'], ['A strong pitch has a clear hero, a goal, and a twist that makes it different.', 'В сильной идее есть понятный герой, цель и изюминка, которая отличает её от других.'], ['Names who the player is, the goal, and a specific hook or twist that explains why it would be fun.', 'Называет, кто игрок, какая цель и конкретную изюминку, объясняющую, почему это будет интересно.'], ['You play a tiny robot cleaning a giant house before the owners wake up. The twist: every noise you make wakes the cat, so you plan quiet routes like a puzzle.', 'Ты играешь за маленького робота, который убирает огромный дом, пока хозяева спят. Изюминка: любой шум будит кота, поэтому тихие маршруты приходится планировать как головоломку.'], [['play', 'player', 'goal', 'must', 'fun', 'twist', 'you ', 'hero', 'enemy', 'world', 'because', 'but'], ['играешь', 'игрок', 'цель', 'нужно', 'интерес', 'изюмин', 'ты ', 'геро', 'враг', 'мир', 'потому', 'но ']])
    ]
  }
];
