import type { CSSProperties } from 'react';
import { facts } from '@/data/site';
import styles from './Facts.module.css';

export default function Facts() {
  return (
    <section className={styles.strip} aria-label="STAGE в цифрах">
      <dl className={`container ${styles.grid}`}>
        {facts.map((fact, i) => (
          <div
            key={fact.value}
            className={styles.item}
            data-reveal="up"
            style={{ '--i': i } as CSSProperties}
          >
            <dt className={styles.value} data-count="">
              {fact.value}
            </dt>
            <dd className={styles.label}>{fact.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
