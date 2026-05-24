'use client';

import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import styles from './Header.module.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>&#128675;</span>
          Little Lighthouse
        </a>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="#posts" className={styles.navLink}>Posts</a>
          <a href="#categories" className={styles.navLink}>Categories</a>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '\u263E' : '\u2600'}
          </button>
        </nav>
      </div>
    </header>
  );
}
