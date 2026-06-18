import Link from 'next/link';
import styles from './folk.module.css';

export default function FolkFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerCorner} aria-hidden="true" />
      <div className={styles.footerLinks}>
        <Link href="https://github.com/dengyie">GitHub</Link>
        <span className={styles.footerDivider} aria-hidden="true" />
        <Link href="/rss.xml">RSS</Link>
        <span className={styles.footerDivider} aria-hidden="true" />
        <Link href="/submit">Submit</Link>
        <span className={styles.footerDivider} aria-hidden="true" />
        <span>Built with Next.js</span>
      </div>
      <span className={styles.footerCornerRight} aria-hidden="true" />
    </footer>
  );
}
