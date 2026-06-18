import type { Metadata } from 'next';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkRail from '@/components/folk/FolkRail';
import styles from '@/components/folk/folk.module.css';

export const metadata: Metadata = {
  title: 'Submit a Post',
  description: 'How to prepare a Little Lighthouse article for the AI-assisted publishing workflow.',
  alternates: {
    canonical: '/submit',
  },
};

const minimumTemplate = `# Article Title

Article body...`;

const recommendedTemplate = `title: Article Title
category: Java
tags: java, memory
published: true

# Article Title

Article body...`;

const publisherTasks = [
  'turn the article into the standard Markdown plus metadata package',
  'apply category, image, SEO, and related-post fallbacks when needed',
  'validate the post across detail, archive, category, RSS, and sitemap output',
  'run the production build and review gate before committing',
];

export default function SubmitPage() {
  return (
    <FolkFrame>
      <section className={styles.submitHero} aria-labelledby="submit-title">
        <p className={styles.submitKicker}>AI-assisted publishing</p>
        <h1 id="submit-title" className={styles.pageTitle}>
          Submit a Post
        </h1>
        <div className={styles.heroAccent} aria-hidden="true" />
        <p className={styles.pageSubtitle}>
          Bring the article text and any images you already have. The publishing assistant handles the package,
          validation, build, review, and commit work.
        </p>
      </section>

      <FolkRail dense />

      <section className={styles.submitGrid} aria-label="Submission workflow">
        <article className={styles.submitPanel}>
          <span className={styles.submitStep}>01</span>
          <h2>Minimum input</h2>
          <p>
            A Markdown article is enough to start. If metadata is missing, the AI publisher will propose a title,
            slug, category, excerpt, tags, and publication state for confirmation.
          </p>
          <pre className={styles.submitCodeBlock}>
            <code>{minimumTemplate}</code>
          </pre>
        </article>

        <article className={styles.submitPanel}>
          <span className={styles.submitStep}>02</span>
          <h2>Recommended input</h2>
          <p>
            Add simple metadata when you know it. The canonical publishing fields still live in the generated
            `.meta.json`; this block is only a contributor-friendly handoff format.
          </p>
          <pre className={styles.submitCodeBlock}>
            <code>{recommendedTemplate}</code>
          </pre>
        </article>

        <article className={styles.submitPanel}>
          <span className={styles.submitStep}>03</span>
          <h2>Optional resources</h2>
          <p>
            Images are welcome but not required. Missing assets use category or site defaults, so lack of artwork
            never blocks publication.
          </p>
          <ul className={styles.submitList}>
            <li>
              <strong>thumbnail.png</strong>
              <span>Card-safe image for archive and category surfaces.</span>
            </li>
            <li>
              <strong>hero.png</strong>
              <span>Wider image for the article detail hero.</span>
            </li>
            <li>
              <strong>og.png</strong>
              <span>Social preview image, ideally 1200 by 630.</span>
            </li>
          </ul>
        </article>

        <article className={styles.submitPanel}>
          <span className={styles.submitStep}>04</span>
          <h2>What the AI publisher does</h2>
          <ul className={styles.submitList}>
            {publisherTasks.map((task) => (
              <li key={task}>
                <strong>Done by AI</strong>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.submitNotice} aria-label="GitHub Pages boundary">
        <h2>No web CMS here</h2>
        <p>
          This GitHub Pages site is static. The submit page does not accept GitHub tokens, store uploads, or publish
          directly from the browser. Send the article materials to the AI publishing workflow; it will make the
          repository changes in the local workspace and run the release checks.
        </p>
      </section>
    </FolkFrame>
  );
}
