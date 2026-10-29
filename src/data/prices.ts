export type PriceRow = { title: string; price: number };

export const prices: PriceRow[] = [
  { title: 'Разовое занятие', price: 650 },
  { title: 'Взрослый · 8 занятий', price: 2800 },
  { title: 'Взрослый · 12 занятий', price: 3200 },
  { title: 'Детский · 8 занятий', price: 2800 },
  { title: 'Детский · 12 занятий', price: 3100 },
];

export const unlimited = {
  title: 'Безлимитный',
  price: 4000,
  text: 'Все направления и столько занятий, сколько выдержит тело.',
};

/** ПЛЕЙСХОЛДЕР: стоимость пробного занятия (null — не показывается) */
export const trialPrice: number | null = null;

/** 2800 → «2 800 ₽» (неразрывные пробелы, одинаково на сервере и клиенте) */
export function formatRub(value: number): string {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
}
