'use client';

import Link from 'next/link';
import { useState } from 'react';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider/OrnamentalDivider';
import styles from './Header.module.css';

const navItems = [
  { href: '/posts', label: 'Posts' },
  { href: '/categories/java', label: 'Categories' },
  { href: '/#about', label: 'About' },
  { href: '/rss.xml', label: 'RSS' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          Folklore & Code
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isOpen ? styles.open : ''}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <OrnamentalDivider variant="diamonds" />
    </header>
  );
}
