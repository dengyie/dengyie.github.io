import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.lighthouseGraphic}>
          <div className={styles.lighthouseGlow} />
          <span className={styles.lighthouseEmoji}>&#128675;</span>
        </div>
        <h1 className={styles.title}>
          Welcome to{' '}
          <span className={styles.titleAccent}>Little Lighthouse</span>
        </h1>
        <p className={styles.tagline}>
          A cozy corner for thoughts, code snippets, and discoveries. 
          Like a lighthouse beam cutting through fog — small signals, big directions.
        </p>
        <div className={styles.ctaRow}>
          <a href="#posts" className={styles.btnPrimary}>
            Read the Blog &#8595;
          </a>
          <a href="#categories" className={styles.btnSecondary}>
            Explore Topics
          </a>
        </div>
      </div>
    </section>
  );
}
