import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Personal technical field notes</p>
          <h1 className={styles.title}>
            Little <span>Lighthouse</span>
          </h1>
          <p className={styles.tagline}>
            A compact index for Android, Java, C++, Markdown, and the small
            discoveries that make engineering work feel clearer.
          </p>
          <div className={styles.ctaRow}>
            <a href="#posts" className={styles.btnPrimary}>
              Read Notes
            </a>
            <a href="#categories" className={styles.btnSecondary}>
              Explore Topics
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.beam} />
          <div className={styles.lighthouse}>
            <span className={styles.cap} />
            <span className={styles.lantern} />
            <span className={styles.tower} />
            <span className={styles.base} />
          </div>
          <span className={`${styles.fragment} ${styles.fragmentOne}`}>HashMap</span>
          <span className={`${styles.fragment} ${styles.fragmentTwo}`}>RecyclerView</span>
          <span className={`${styles.fragment} ${styles.fragmentThree}`}>C++</span>
          <span className={`${styles.fragment} ${styles.fragmentFour}`}>Markdown</span>
          <span className={styles.signalLine} />
        </div>
      </div>
    </section>
  );
}
