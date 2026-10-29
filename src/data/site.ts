export const site = {
  name: 'STAGE',
  fullName: 'STAGE — центр современной хореографии',
  /** Замените на боевой домен после подключения в ONREZA */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stage60.ru',
  city: 'Псков',
  foundedYear: 2009,
  description:
    'Центр современной хореографии STAGE в Пскове: хип-хоп, vogue, contemporary, break dance, high heels, балет, растяжка и актёрское мастерство для детей, подростков и взрослых. Запишитесь на пробное занятие.',
} as const;

export const contacts = {
  phone: '+7 (921) 211-61-72',
  phoneHref: 'tel:+79212116172',
  vk: 'https://vk.com/stage60',
  vkLabel: 'vk.com/stage60',
  addressCity: 'Псков',
  addressStreet: 'Рижский пр-т, 17',
  addressNote: 'здание «Этажи», вход с торца',
  opens: '16:00',
  /** ПЛЕЙСХОЛДЕР: уточнить время закрытия */
  closes: null as string | null,
};

export const navLinks = [
  { href: '#directions', label: 'Направления' },
  { href: '#trial', label: 'Пробное' },
  { href: '#prices', label: 'Цены' },
  { href: '#contacts', label: 'Контакты' },
] as const;

export type Fact = { value: string; label: string };

export const facts: Fact[] = [
  { value: '2009', label: 'год основания студии' },
  { value: '7,5K', label: 'человек в сообществе' },
  { value: '8 стилей', label: 'от хип-хопа до балета' },
  { value: 'Центр', label: 'Рижский пр-т, 17, «Этажи»' },
];

export type TrialStep = { num: string; title: string; text: string };

export const trialSteps: TrialStep[] = [
  {
    num: '01',
    title: 'Оставьте заявку',
    text: 'Через форму ниже или в сообщения сообщества ВКонтакте.',
  },
  {
    num: '02',
    title: 'Подберём группу',
    text: 'Администратор свяжется, уточнит возраст и опыт и предложит удобное время.',
  },
  {
    num: '03',
    title: 'Приходите танцевать',
    text: 'Удобная одежда и вода — всё, что нужно. Остальное покажем в зале.',
  },
];
