/** Общие правила для формы (клиент) и /api/lead (сервер). */

export const NAME_MAX = 60;

/** Достаёт 10 цифр номера после +7 из любого ввода: «8 921…», «+7 (921)…», «921…». */
export function phoneDigits(input: string): string {
  const raw = input.replace(/\D/g, '');
  const hasCountryCode =
    (raw[0] === '7' || raw[0] === '8') && (raw.length > 10 || input.trim().startsWith('+'));
  return (hasCountryCode ? raw.slice(1) : raw).slice(0, 10);
}

/** Маска ввода: +7 (921) 211-61-72 */
export function formatPhone(input: string): string {
  const raw = input.replace(/\D/g, '');
  if (raw.length === 0) return '';
  // Первая введённая 7/8 — код страны
  const d = raw.length === 1 && (raw === '7' || raw === '8') ? '' : phoneDigits(input);
  let out = '+7';
  if (d.length > 0) out += ` (${d.slice(0, 3)}`;
  // Скобку и пробел добавляем только вместе со следующей цифрой — иначе Backspace «застревает»
  if (d.length > 3) out += `) ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

export function isValidPhone(input: string): boolean {
  const d = phoneDigits(input);
  // 10 цифр, российский номер начинается с 3, 4, 8 или 9
  return d.length === 10 && /^[3489]/.test(d);
}

export function normalizeName(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

export function isValidName(input: string): boolean {
  const n = normalizeName(input);
  return n.length >= 2 && n.length <= NAME_MAX && /^[\p{L}\s'’.-]+$/u.test(n);
}

export type LeadPayload = {
  name: string;
  phone: string;
  direction: string;
  consent: boolean;
  /** honeypot — должно оставаться пустым */
  website?: string;
};

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: string; field?: 'name' | 'phone' | 'direction' | 'consent' };
