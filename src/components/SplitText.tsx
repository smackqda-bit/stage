import type { CSSProperties } from 'react';

/**
 * Текст по буквам: каждая буква выезжает снизу из-под маски.
 * mode="load"   — сразу при загрузке (первый экран);
 * mode="reveal" — когда блок попадает в экран (нужен родитель с data-reveal="split").
 * Для скринридеров буквы скрыты — рядом должен быть обычный текст (или aria-label у родителя).
 */
export default function SplitText({
  text,
  mode,
  delay = 0,
  step = 0.06,
}: {
  text: string;
  mode: 'load' | 'reveal';
  delay?: number;
  step?: number;
}) {
  return (
    <span className={`split split-${mode}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="ch">
          <span style={{ '--d': `${(delay + i * step).toFixed(2)}s` } as CSSProperties}>
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
