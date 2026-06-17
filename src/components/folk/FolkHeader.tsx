'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './folk.module.css';

interface FolkHeaderProps {
  active?: 'home' | 'posts' | 'categories' | 'about';
}

const navItems = [
  { href: '/posts', label: 'Posts', key: 'posts' },
  { href: '/categories/java', label: 'Categories', key: 'categories' },
  { href: '/#about', label: 'About', key: 'about' },
  { href: '/rss.xml', label: 'RSS', key: 'rss' },
];

export default function FolkHeader({ active = 'home' }: FolkHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Little Lighthouse home">
        <span className={styles.brandFlower} aria-hidden="true" />
        <span>Little Lighthouse</span>
      </Link>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="folk-primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="folk-primary-navigation"
        className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={active === item.key ? styles.activeNav : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
