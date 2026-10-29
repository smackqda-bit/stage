import type { CSSProperties } from 'react';
import { contacts } from '@/data/site';
import SignupForm from './SignupForm';
import styles from './Signup.module.css';

export default function Signup() {
  return (
    <section id="signup" className={styles.section} aria-labelledby="signup-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside}>
          <h2 id="signup-title" className={styles.title} data-reveal="mask">
            Запишись
            <br />
            на пробное
          </h2>
          <p className={styles.text} data-reveal="up" style={{ '--i': 2 } as CSSProperties}>
            Оставьте контакты — перезвоним, подберём группу и время. Или напишите нам в сообщения
            сообщества.
          </p>
          <div className={styles.links} data-reveal="up" style={{ '--i': 3 } as CSSProperties}>
            <a
              href={contacts.vk}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать ВКонтакте
            </a>
            <a href={contacts.phoneHref} className="btn btn-outline btn-sm">
              {contacts.phone}
            </a>
          </div>
        </div>

        <div className={styles.formCol} data-reveal="up" style={{ '--i': 2 } as CSSProperties}>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}
