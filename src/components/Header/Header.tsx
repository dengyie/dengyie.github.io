'use client';

import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import styles from './Header.module.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/" className={styles.logo} aria-label="Little Lighthouse home">
          <span className={styles.logoMark}>LL</span>
          <span className={styles.logoText}>Little Lighthouse</span>
        </a>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/#posts" className={styles.navLink}>Posts</a>
          <a href="/#categories" className={styles.navLink}>Categories</a>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className={styles.toggleIcon} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
