import Link from 'next/link';
import type { CSSProperties } from 'react';
import { contacts } from '@/data/site';
import SplitText from './SplitText';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contacts" className={`dark ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div data-reveal="up" style={{ '--i': 0 } as CSSProperties}>
            <span className={styles.logo} aria-hidden="true">
              STAGE
            </span>
          </div>

          <div data-reveal="up" style={{ '--i': 1 } as CSSProperties}>
            <h2 className={styles.label}>Адрес</h2>
            <address className={styles.value}>
              {contacts.addressCity}, {contacts.addressStreet}
              <br />
              {contacts.addressNote}
            </address>
          </div>

          <div data-reveal="up" style={{ '--i': 2 } as CSSProperties}>
            <h2 className={styles.label}>Связь</h2>
            <p className={styles.value}>
              <a href={contacts.phoneHref}>{contacts.phone}</a>
              <br />
              <a href={contacts.vk} target="_blank" rel="noopener noreferrer">
                {contacts.vkLabel}
              </a>
            </p>
          </div>

          <div data-reveal="up" style={{ '--i': 3 } as CSSProperties}>
            <h2 className={styles.label}>Часы</h2>
            <p className={styles.value}>
              Ежедневно с {contacts.opens}
              <br />
              {contacts.closes ? `до ${contacts.closes}` : '[уточнить время закрытия]'}
            </p>
          </div>
        </div>

        <p className={styles.giant} aria-hidden="true" data-reveal="split">
          <SplitText text="Stage" mode="reveal" step={0.08} />
        </p>

        <div className={styles.bottom}>
          <span>Центр современной хореографии · с 2009</span>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <span>© STAGE Dance Center</span>
        </div>
      </div>
    </footer>
  );
}
