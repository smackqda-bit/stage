import type { CSSProperties } from 'react';
import { trialSteps } from '@/data/site';
import styles from './Trial.module.css';

export default function Trial() {
  return (
    <section id="trial" className={`dark ${styles.section}`} aria-labelledby="trial-title">
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`} data-reveal="up">Пробное занятие</p>
        <h2 id="trial-title" className={styles.title} data-reveal="mask">
          Первый шаг — <span className={styles.accent}>самый простой</span>
        </h2>

        <ol className={styles.steps}>
          {trialSteps.map((step, i) => (
            <li
              key={step.num}
              className={styles.step}
              data-reveal="line"
              style={{ '--i': i } as CSSProperties}
            >
              <span className={styles.num} aria-hidden="true">
                {step.num}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta} data-reveal="up">
          <a href="#signup" className="btn btn-white btn-md">
            Хочу на пробное
          </a>
          <span className={styles.note}>Ответим в течение дня</span>
        </div>
      </div>
    </section>
  );
}
