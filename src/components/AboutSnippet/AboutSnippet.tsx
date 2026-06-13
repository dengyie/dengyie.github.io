import styles from './AboutSnippet.module.css';

export default function AboutSnippet() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Manifesto</p>
            <h2 className={styles.heading}>Small notes. Better context.</h2>
            <p className={styles.text}>
              Little Lighthouse keeps useful engineering ideas close: implementation
              notes, memory models, UI patterns, and the tiny details that make the
              next problem easier to reason about.
            </p>
          </div>
          <div className={styles.beacon} aria-hidden="true">
            <span />
          </div>
          <div className={styles.principles}>
            <span>Readable first</span>
            <span>Static by design</span>
            <span>Built for recall</span>
          </div>
        </div>
      </div>
    </section>
  );
}
