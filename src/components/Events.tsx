import type { CSSProperties } from 'react';
import { events, splitDate } from '@/data/events';
import styles from './Events.module.css';

export default function Events() {
  if (events.length === 0) return null;

  return (
    <section className={`container ${styles.section}`} aria-labelledby="events-title">
      <div className={styles.head}>
        <h2 id="events-title" className={styles.title} data-reveal="mask">
          Афиша
        </h2>
        <span className={styles.subtitle}>Культурно-образовательная программа</span>
      </div>

      <ul className={styles.grid}>
        {events.map((event, i) => {
          const { day, month } = splitDate(event.date);
          return (
            <li
              key={`${event.date}-${event.title}`}
              className={`${styles.card} ${event.dark ? `${styles.cardDark} dark` : ''}`}
              data-reveal="up"
              style={{ '--i': i } as CSSProperties}
            >
              <time dateTime={event.date} className={styles.date}>
                <span className={styles.day}>{day}</span>
                <span className={styles.month}>{month}</span>
              </time>
              <div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.text}>{event.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
