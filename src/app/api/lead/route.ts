import { directionOptions } from '@/data/directions';
import {
  type LeadPayload,
  type LeadResponse,
  NAME_MAX,
  isValidName,
  isValidPhone,
  normalizeName,
  phoneDigits,
} from '@/lib/lead';

const json = (body: LeadResponse, status = 200) => Response.json(body, { status });

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  // 1. Разбор тела
  let body: Partial<LeadPayload>;
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 10_000) {
      return json({ ok: false, error: 'Слишком большой запрос.' }, 413);
    }
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return json({ ok: false, error: 'Некорректный запрос.' }, 400);
  }

  // 2. Honeypot: бот заполнил скрытое поле — делаем вид, что всё хорошо
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true });
  }

  // 3. Валидация
  const name = typeof body.name === 'string' ? normalizeName(body.name) : '';
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const directionId = typeof body.direction === 'string' ? body.direction : '';

  if (!isValidName(name)) {
    return json(
      {
        ok: false,
        field: 'name',
        error: `Укажите имя: от 2 до ${NAME_MAX} букв.`,
      },
      422,
    );
  }
  if (!isValidPhone(phone)) {
    return json(
      { ok: false, field: 'phone', error: 'Проверьте номер: нужен телефон в формате +7 (XXX) XXX-XX-XX.' },
      422,
    );
  }
  const direction = directionOptions.find((d) => d.id === directionId);
  if (!direction) {
    return json({ ok: false, field: 'direction', error: 'Выберите направление.' }, 422);
  }
  if (body.consent !== true) {
    return json(
      { ok: false, field: 'consent', error: 'Нужно согласие на обработку персональных данных.' },
      422,
    );
  }

  // 4. Отправка в Telegram
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы');
    return json(
      { ok: false, error: 'Форма временно не работает.' },
      503,
    );
  }

  const d = phoneDigits(phone);
  const prettyPhone = `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  const text = [
    '<b>Новая заявка на пробное — STAGE</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> <a href="tel:+7${d}">${prettyPhone}</a>`,
    `<b>Направление:</b> ${escapeHtml(direction.label)}`,
    '',
    `<i>${time} (МСК), сайт</i>`,
  ].join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });

    if (!res.ok) {
      const details = await res.text().catch(() => '');
      console.error('[lead] Telegram API error', res.status, details.slice(0, 300));
      return json(
        { ok: false, error: 'Не удалось отправить заявку.' },
        502,
      );
    }
  } catch (err) {
    console.error('[lead] Telegram request failed', err);
    return json(
      { ok: false, error: 'Не удалось отправить заявку.' },
      502,
    );
  }

  return json({ ok: true });
}
