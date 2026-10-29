import Script from 'next/script';

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

/**
 * Яндекс.Метрика. Подключается, только если задан NEXT_PUBLIC_YM_ID.
 * Цель «lead_submit» отправляется из SignupForm после успешной заявки —
 * создайте в Метрике JavaScript-цель с этим идентификатором.
 */
export default function YandexMetrika() {
  if (!YM_ID || !/^\d+$/.test(YM_ID)) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="lazyOnload">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${YM_ID}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });`}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
