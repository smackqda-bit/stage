import { navLinks } from '@/data/site';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`container ${styles.header}`}>
      <a href="#top" className={styles.brand}>
        <span className={styles.logo}>STAGE</span>
        <span className={styles.tagline}>
          центр современной
          <br />
          хореографии · Псков
        </span>
      </a>
      <nav className={styles.nav} aria-label="Основное меню">
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a href="#signup" className="btn btn-ink btn-sm">
        Пробное занятие
      </a>
    </header>
  );
}
