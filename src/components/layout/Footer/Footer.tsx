import Link from 'next/link';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider/OrnamentalDivider';
import styles from './Footer.module.css';

const socials = [
  { label: 'Twitter', mark: 'T' },
  { label: 'GitHub', mark: 'G' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <OrnamentalDivider variant="weave" />
      <div className={styles.inner}>
        <p className={styles.copy}>(c) 2026 Little Lighthouse</p>
        <div className={styles.links}>
          {socials.map((social) => (
            <span key={social.label} className={styles.social} aria-label={social.label}>
              {social.mark}
            </span>
          ))}
          <Link href="/rss.xml" className={styles.rss}>
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
