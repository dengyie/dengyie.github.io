import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerText}>&copy; {new Date().getFullYear()} Little Lighthouse. Static notes, built with Next.js.</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/dengyie" className={styles.footerLink} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
