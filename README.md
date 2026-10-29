# STAGE — лендинг центра современной хореографии (Псков)

Одностраничный сайт с записью на пробное занятие. Next.js 16 (App Router) + TypeScript, CSS Modules, без UI-библиотек.

- Главная `/` и `/privacy` — **статические** страницы (собираются заранее, сервер их не рендерит).
- Единственная серверная часть — `POST /api/lead`: принимает заявку и отправляет её в Telegram.
- Заявки приходят в Telegram, запасной канал — ссылка «Написать ВКонтакте».

## Быстрый старт

Нужен Node.js 22+.

```bash
npm install
cp .env.example .env.local   # заполните токен бота и chat_id
npm run dev                  # http://localhost:3000
```

Проверки перед публикацией:

```bash
npm run lint
npm run typecheck
npm run build                # в списке маршрутов «/» и «/privacy» должны быть со значком ○ (Static)
```

## Структура

```
src/
  app/
    layout.tsx          шрифты (next/font), метаданные, Open Graph, Метрика
    page.tsx            главная + JSON-LD (DanceSchool)
    privacy/page.tsx    политика ПДн (плейсхолдер текста)
    api/lead/route.ts   приём заявки → Telegram Bot API
    sitemap.ts, robots.ts, icon.svg, favicon.ico, apple-icon.png, opengraph-image.png
    globals.css         дизайн-токены (CSS-переменные) и кнопки
  components/           Header, Hero, Facts, Directions, Trial, Prices, Events,
                        Signup + SignupForm (единственный клиентский компонент), Footer
  data/                 site.ts (контакты, факты, шаги), directions.ts, prices.ts, events.ts
  lib/lead.ts           общая валидация и маска телефона (клиент + сервер)
```

**Как менять контент:** всё лежит в `src/data/*.ts`. Например, новое событие в афише — добавьте объект в массив `events` в `src/data/events.ts` (дата в формате `ГГГГ-ММ-ДД`), сделайте commit и push — ONREZA пересоберёт сайт.

## Telegram-бот для заявок

1. **Создайте бота.** В Telegram откройте [@BotFather](https://t.me/BotFather) → `/newbot` → придумайте имя и username (оканчивается на `bot`). BotFather пришлёт токен вида `123456789:AA…` — это `TELEGRAM_BOT_TOKEN`. Никому его не показывайте и не коммитьте в репозиторий.
2. **Выберите, куда приходят заявки.**
   - *Лично вам:* найдите своего бота и нажмите **Start**.
   - *В рабочую группу администраторов:* создайте группу, добавьте туда бота и напишите в группе любое сообщение.
3. **Узнайте chat_id.** Откройте в браузере
   `https://api.telegram.org/bot<ТОКЕН>/getUpdates`
   и найдите в ответе `"chat":{"id": …}`. Это `TELEGRAM_CHAT_ID` (у групп число отрицательное, например `-1001234567890`). Если ответ пустой — отправьте боту/в группу ещё одно сообщение и обновите страницу.
4. **Проверьте локально:** заполните `.env.local`, запустите `npm run dev` и отправьте форму — в Telegram должна прийти заявка.

Защита от спама: скрытое поле-ловушка (honeypot), серверная проверка имени, телефона (+7, 10 цифр) и согласия на обработку ПДн, ограничение размера запроса. Токен используется только в `route.ts` и в браузер не попадает.

## Деплой на ONREZA

Документация платформы: <https://docs.onreza.ru/> (платформа активно развивается — перед деплоем сверьтесь с ней). Next.js определяется автоматически, Dockerfile не нужен.

### Вариант 1. GitHub + автодеплой (рекомендуется)

1. Создайте репозиторий на GitHub и запушьте проект:
   ```bash
   git init
   git add -A && git commit -m "STAGE landing"
   git branch -M main
   git remote add origin https://github.com/<вы>/stage.git
   git push -u origin main
   ```
2. В ONREZA: **Account → Settings → Authentication** — привяжите GitHub (если ещё не привязан).
3. **Workspace → Settings → Git → Install GitHub App** — дайте доступ к репозиторию.
4. Создайте проект и импортируйте репозиторий. Проверьте настройки сборки: Install `npm ci`, Build `npm run build`, Node.js **22**.
5. **Project → Settings → Environment Variables → Add Variable** — добавьте:
   | Key | Secret | Значение |
   |---|---|---|
   | `TELEGRAM_BOT_TOKEN` | да | токен от BotFather |
   | `TELEGRAM_CHAT_ID` | нет | chat_id |
   | `NEXT_PUBLIC_YM_ID` | нет | номер счётчика Метрики |
   | `NEXT_PUBLIC_SITE_URL` | нет | `https://ваш-домен` |

   Scope — *All Environments*. Переменные применяются **при следующем деплое**: после добавления сделайте Redeploy. `NEXT_PUBLIC_*` вшиваются в сборку, поэтому после их изменения нужна пересборка.
6. Каждый push в `main` — продакшн-деплой. Push в другие ветки деплоится только в настроенные Preview-окружения.

### Вариант 2. CLI

```bash
npm i -g @onreza/nrz
nrz login
nrz init            # или nrz link — привязать папку к существующему проекту
printf %s "123456789:AA…" | nrz env set TELEGRAM_BOT_TOKEN --stdin --secret --all
nrz env set TELEGRAM_CHAT_ID --value 123456789 --all
nrz deploy --prod
```

### Домен

В проекте ONREZA добавьте домен (раздел Domains), пропишите DNS-записи по подсказке и дождитесь выпуска SSL. После этого обновите `NEXT_PUBLIC_SITE_URL` и сделайте Redeploy.

### Почему это дёшево по кредитам

Страницы статические и отдаются без участия сервера; серверный процесс работает только на `POST /api/lead`.

## Яндекс.Метрика

1. Создайте счётчик на <https://metrika.yandex.ru/>, номер счётчика запишите в `NEXT_PUBLIC_YM_ID`.
2. В счётчике: **Цели → Добавить цель → JavaScript-событие**, идентификатор `lead_submit`. Цель отправляется после успешной заявки.
3. Если переменная пустая — скрипт Метрики на сайт не добавляется.

## Плейсхолдеры — что нужно получить от студии

| Что | Где поменять |
|---|---|
| 3 ч/б фото для hero (вертикальные, ≥ 900×1400) | `src/components/Hero.tsx` — сейчас серые овалы-заглушки; фото положить в `public/hero/` и вывести через `next/image` |
| Фото для направлений (по желанию) | `src/components/Directions.tsx` |
| Возраст и расписание по 7 направлениям (кроме Hip-hop) | `src/data/directions.ts`, поле `tag` (сейчас `[возраст · расписание]`); можно заменить на `schedule`, как у Hip-hop |
| Время закрытия студии | `src/data/site.ts` → `contacts.closes` |
| Стоимость пробного занятия | `src/data/prices.ts` → `trialPrice` (пока не выводится) |
| Токен Telegram-бота и chat_id | переменные окружения ONREZA |
| ID Яндекс.Метрики | `NEXT_PUBLIC_YM_ID` |
| Текст политики обработки ПДн и реквизиты оператора | `src/app/privacy/page.tsx` |
| Боевой домен | `NEXT_PUBLIC_SITE_URL` (по умолчанию `https://stage60.ru` — заменить) |

## Примечание для разработки

Шрифты Oswald и Manrope подключены через `next/font/google` — при сборке нужен доступ к Google Fonts (на ONREZA он есть). Если сборка падает с «Failed to fetch … from Google Fonts», проблема в сети машины, где идёт сборка.
