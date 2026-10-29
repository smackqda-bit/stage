import Arrow from './Arrow';
import SplitText from './SplitText';
import styles from './Hero.module.css';

/**
 * Фото пока заглушки. Когда появятся ч/б снимки — положите их в /public/hero/
 * и замените <div className={styles.oval}> на <Image fill className={styles.photo} …>.
 */
const ovals = [
  { cls: styles.ovalA, parallax: '0.05' },
  { cls: styles.ovalB, parallax: '0.12' },
  { cls: styles.ovalC, parallax: '0.08' },
];

export default function Hero() {
  return (
    <section id="top" className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <p className={`eyebrow ${styles.eyebrow}`}>
        <span className={styles.dot} aria-hidden="true" />
        Учим танцевать с 2009 года
      </p>

      <h1 id="hero-title" className={styles.title}>
        <SplitText text="Stage" mode="load" delay={0.15} step={0.07} />
        <span className="visually-hidden">Stage — центр современной хореографии в Пскове</span>
      </h1>

      <p className={styles.slogan}>
        <span>Тело</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.sloganMuted}>которое ты не узнаешь</span>
      </p>

      <div className={styles.ovals} aria-hidden="true">
        {ovals.map((o, i) => (
          <div key={i} className={styles.ovalSlot} data-parallax={o.parallax}>
            <div className={`${styles.oval} ${o.cls}`}>Фото ч/б</div>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p className={styles.lead}>
          Танцевальный центр с опытными преподавателями и системным подходом. Группы для детей,
          подростков и взрослых — от первого шага до сцены.
        </p>
        <a href="#signup" className="btn btn-accent btn-lg">
          Записаться на пробное
          <Arrow />
        </a>
      </div>
    </section>
  );
}
