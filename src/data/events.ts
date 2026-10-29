export type StageEvent = {
  /** Дата в формате ГГГГ-ММ-ДД */
  date: string;
  title: string;
  text: string;
  /** Чёрная карточка */
  dark?: boolean;
};

/**
 * Афиша. Чтобы обновить — поменяйте массив и сделайте push:
 * ONREZA пересоберёт сайт автоматически.
 */
export const events: StageEvent[] = [
  {
    date: '2026-11-28',
    title: 'Интенсив по партнерингу',
    text: '3 часа практики с Елизаветой Тарабановой (PRAVILA DVЖIENIA, Санкт-Петербург). Всего 30 мест.',
  },
  {
    date: '2026-11-29',
    title: 'Вечер современного танца',
    text: 'Компания «Полуночники» (Санкт-Петербург), спектакль «LOOP».',
    dark: true,
  },
];

const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function splitDate(iso: string): { day: number; month: string } {
  const [, m, d] = iso.split('-').map(Number);
  return { day: d, month: MONTHS_GENITIVE[m - 1] };
}
