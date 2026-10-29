import type { Metadata, Viewport } from 'next';
import { Manrope, Oswald } from 'next/font/google';
import Motion from '@/components/Motion';
import YandexMetrika from '@/components/YandexMetrika';
import { site } from '@/data/site';
import './globals.css';

const oswald = Oswald({
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

/** Ставит html.motion до первой отрисовки (без мигания). Если основной JS не загрузился
 *  за 3 с — класс снимается, и весь контент просто виден. */
const motionBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},3000)}catch(e){}})();`;

const title = 'Танцы в Пскове — STAGE, центр современной хореографии';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: '%s — STAGE, Псков',
  },
  description: site.description,
  keywords: [
    'танцы Псков',
    'школа танцев Псков',
    'хип-хоп для детей Псков',
    'танцы для детей Псков',
    'contemporary Псков',
    'high heels Псков',
    'балет для детей Псков',
    'растяжка Псков',
    'break dance Псков',
    'vogue Псков',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: site.fullName,
    title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0E0E0E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ru"
      className={`${oswald.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        {children}
        <Motion />
        <YandexMetrika />
      </body>
    </html>
  );
}
