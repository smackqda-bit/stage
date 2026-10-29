export type ScheduleRow = { group: string; time: string };

export type Direction = {
  id: string;
  num: string;
  title: string;
  /** Короткое название для чипа в форме */
  label: string;
  /** Чёрная карточка */
  dark?: boolean;
  description?: string;
  schedule?: ScheduleRow[];
  /** Чип внизу карточки. Квадратные скобки = плейсхолдер */
  tag: string;
};

const PLACEHOLDER_TAG = '[возраст · расписание]';

export const directions: Direction[] = [
  {
    id: 'hiphop',
    num: '01',
    title: 'Hip-hop',
    label: 'Hip-hop',
    schedule: [
      { group: 'Начинающие, 8–11', time: 'Вт/Чт 17:00–18:00' },
      { group: 'Команда, 9–14', time: 'Вт/Чт 18:00–19:30' },
    ],
    tag: 'баттлы',
  },
  {
    id: 'vogue',
    num: '02',
    title: 'Vogue',
    label: 'Vogue',
    description: 'Подача, позинг, манерность и уверенность в каждом движении.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'contemporary',
    num: '03',
    title: 'Contemporary',
    label: 'Contemporary',
    dark: true,
    description: 'Современная хореография: работа с телом, импровизация, партнеринг.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'break',
    num: '04',
    title: 'Break dance',
    label: 'Break dance',
    description: 'Ритм, силовые элементы и акробатика — танец, который развивает всё тело.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'heels',
    num: '05',
    title: 'High Heels',
    label: 'High Heels',
    description: 'Пластика, женственность и уверенная походка на каблуках.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'ballet',
    num: '06',
    title: 'Балет',
    label: 'Балет',
    dark: true,
    description: 'Классическая база: осанка, выворотность, точность и чистота линий.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'stretch',
    num: '07',
    title: 'Растяжка',
    label: 'Растяжка',
    description: 'Гибкость и подвижность суставов — основа для любого стиля.',
    tag: PLACEHOLDER_TAG,
  },
  {
    id: 'acting',
    num: '08',
    title: 'Актёрское мастерство',
    label: 'Актёрское мастерство',
    description: 'Сценическое присутствие, эмоция и работа с образом.',
    tag: PLACEHOLDER_TAG,
  },
];

export const UNSURE_ID = 'unsure';

/** Варианты для формы записи: 8 направлений + «Пока не знаю» */
export const directionOptions: { id: string; label: string }[] = [
  ...directions.map(({ id, label }) => ({ id, label })),
  { id: UNSURE_ID, label: 'Пока не знаю' },
];
