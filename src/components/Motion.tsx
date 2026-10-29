'use client';

import { useEffect } from 'react';

/**
 * Анимации при прокрутке — без библиотек, ничего не рендерит.
 *  [data-reveal]        — появляется, когда попадает в экран (класс .is-in, стили в globals.css)
 *  [data-count]         — число «досчитывается» от нуля: 2009, 7,5K, 8 стилей
 *  [data-parallax="k"]  — сдвигается при прокрутке со скоростью k (только в пределах первого экрана)
 * Класс html.motion ставит скрипт в <head> (layout.tsx); при prefers-reduced-motion его нет —
 * тогда всё сразу видно и ничего не двигается.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    (window as Window & { __motionReady?: boolean }).__motionReady = true;
    if (!root.classList.contains('motion')) return;

    // --- появление при прокрутке ---
    // Заголовки с маской (clip-path) сами по себе «невидимы» для IntersectionObserver,
    // поэтому за ними следим через родителя.
    const targets = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          for (const el of targets.get(e.target) ?? []) {
            el.classList.add('is-in');
            if (el.dataset.count !== undefined) countUp(el);
          }
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-count]').forEach((el) => {
      const watch = el.dataset.reveal === 'mask' ? (el.parentElement ?? el) : el;
      targets.set(watch, [...(targets.get(watch) ?? []), el]);
      io.observe(watch);
    });

    // --- параллакс фото на первом экране ---
    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y > window.innerHeight * 1.5) return;
        for (const el of layers) {
          el.style.translate = `0 ${(-y * Number(el.dataset.parallax)).toFixed(1)}px`;
        }
      });
    };
    if (layers.length) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/** «2009» → 0…2009, «7,5K» → 0,0K…7,5K, «8 стилей» → 0…8 стилей. */
function countUp(el: HTMLElement) {
  const final = el.textContent ?? '';
  const m = final.match(/^(\d+)(?:,(\d+))?([^]*)$/);
  if (!m) return;
  const decimals = m[2]?.length ?? 0;
  const target = Number(`${m[1]}.${m[2] ?? 0}`);
  const tail = m[3];
  // год считаем не с нуля, а с «разгона» — выглядит спокойнее
  const from = target > 1000 ? target - 60 : 0;
  const dur = 1400;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    const v = from + (target - from) * eased;
    el.textContent = p >= 1 ? final : `${v.toFixed(decimals).replace('.', ',')}${tail}`;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
