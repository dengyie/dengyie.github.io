import type { ReactNode } from 'react';
import styles from './PullQuote.module.css';

export interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  className?: string;
}

export default function PullQuote({ children, author, className }: PullQuoteProps) {
  const classNames = [styles.quote, className].filter(Boolean).join(' ');

  return (
    <blockquote className={classNames}>
      <p className={styles.text}>{children}</p>
      {author ? <footer className={styles.author}>- {author}</footer> : null}
    </blockquote>
  );
}

