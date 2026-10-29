import type { CSSProperties } from 'react';
import { directions } from '@/data/directions';
import styles from './Directions.module.css';

export default function Directions() {
  return (
    <section id="directions" className={`container ${styles.section}`} aria-labelledby="directions-title">
      <div className={styles.head}>
        <h2 id="directions-title" className="h2" data-reveal="mask">
          Направления
        </h2>
        <p className={styles.intro} data-reveal="up" style={{ '--i': 2 } as CSSProperties}>
          Не знаете, с чего начать? На пробном занятии подберём группу по возрасту и уровню.
        </p>
      </div>

      <ul
        className={styles.levels}
        aria-label="Уровни подготовки"
        data-reveal="up"
        style={{ '--i': 1 } as CSSProperties}
      >
        <li className={styles.levelLight}>
          <b>Stage Basic</b> — для начинающих
        </li>
        <li className={styles.levelDark}>
          <b>Stage Profi</b> — для танцоров с опытом
        </li>
      </ul>

      <ul className={styles.grid}>
        {directions.map((d, i) => (
          <li
            key={d.id}
            className={`${styles.card} ${d.dark ? `${styles.cardDark} dark` : ''}`}
            data-reveal="up"
            style={{ '--i': i % 4 } as CSSProperties}
          >
            <span className={styles.num} aria-hidden="true">
              {d.num}
            </span>
            <h3 className={styles.title}>{d.title}</h3>

            {d.schedule ? (
              <dl className={styles.schedule}>
                {d.schedule.map((row) => (
                  <div key={row.group} className={styles.row}>
                    <dt>{row.group}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className={styles.text}>{d.description}</p>
            )}

            <span className={styles.tag}>{d.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
