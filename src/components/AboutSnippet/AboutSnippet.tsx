import styles from './AboutSnippet.module.css';

export default function AboutSnippet() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.panel}>
          <span className={styles.emoji}>&#9997;&#65039;</span>
          <h2 className={styles.heading}>About This Blog</h2>
          <p className={styles.text}>
            Hi! I&apos;m a developer who loves exploring how things work under the hood.
            Little Lighthouse is my personal space to capture notes, code snippets,
            and lessons learned along the way. If something here helps you — even better!
          </p>
        </div>
      </div>
    </section>
  );
}
