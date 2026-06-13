import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.marquee} aria-hidden="true">
        <span>Android notes</span>
        <span>Java memory</span>
        <span>C++ grammar</span>
        <span>Markdown maps</span>
        <span>Static first</span>
      </div>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span>LL-01</span>
            Personal technical field notes
          </p>
          <h1 className={styles.title}>
            Little
            <span>Lighthouse</span>
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
          <div className={styles.stats} aria-label="Blog status">
            <div>
              <strong>05</strong>
              <span>notes online</span>
            </div>
            <div>
              <strong>04</strong>
              <span>topic lanes</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>tiny discoveries</span>
            </div>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.controlCard}>
            <span className={styles.cardLabel}>Signal map</span>
            <span className={styles.cardLine} />
            <span className={styles.cardLineShort} />
          </div>
          <div className={styles.beam} />
          <div className={styles.lighthouse}>
            <span className={styles.cap}>LL</span>
            <span className={styles.lantern} />
            <span className={styles.windowOne} />
            <span className={styles.windowTwo} />
            <span className={styles.tower} />
            <span className={styles.base} />
          </div>
          <span className={`${styles.fragment} ${styles.fragmentOne}`}>HashMap</span>
          <span className={`${styles.fragment} ${styles.fragmentTwo}`}>RecyclerView cache</span>
          <span className={`${styles.fragment} ${styles.fragmentThree}`}>Stack / Heap</span>
          <span className={`${styles.fragment} ${styles.fragmentFour}`}>C++ basics</span>
          <span className={styles.signalLine} />
        </div>
      </div>
    </section>
  );
}
