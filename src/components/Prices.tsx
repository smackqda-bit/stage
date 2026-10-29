import type { CSSProperties } from 'react';
import { formatRub, prices, unlimited } from '@/data/prices';
import styles from './Prices.module.css';

export default function Prices() {
  return (
    <section id="prices" className={`container ${styles.section}`} aria-labelledby="prices-title">
      <h2 id="prices-title" className="h2" data-reveal="mask">
        Абонементы
      </h2>

      <div className={styles.layout}>
        <dl className={styles.list}>
          {prices.map((row, i) => (
            <div
              key={row.title}
              className={styles.row}
              data-reveal="up"
              style={{ '--i': i } as CSSProperties}
            >
              <dt className={styles.name}>{row.title}</dt>
              <dd className={styles.price}>{formatRub(row.price)}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.card} data-reveal="up" style={{ '--i': 2 } as CSSProperties}>
          <div>
            <p className="eyebrow">{unlimited.title}</p>
            <p className={styles.cardPrice}>{formatRub(unlimited.price)}</p>
            <p className={styles.cardText}>{unlimited.text}</p>
          </div>
          <a href="#signup" className="btn btn-white btn-md">
            Начать с пробного
          </a>
        </div>
      </div>
    </section>
  );
}
