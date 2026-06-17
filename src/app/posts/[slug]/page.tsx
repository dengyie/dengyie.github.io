import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { folkPosts, getFolkPostBySlug } from '@/data/folkShowcase';
import styles from '@/components/folk/folk.module.css';

export function generateStaticParams() {
  return [...new Set(folkPosts.map((post) => post.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getFolkPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://dengyie.github.io/posts/${post.slug}`,
      siteName: 'Little Lighthouse',
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getFolkPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = folkPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <FolkFrame active="posts">
      <article>
        <header className={styles.detailHero}>
          <div>
            <h1 className={styles.detailTitle}>{post.title}</h1>
            <div className={styles.heroAccent} aria-hidden="true" />
            <p className={styles.detailExcerpt}>{post.excerpt}</p>
            <div className={styles.detailMeta}>
              <time>{post.dateLabel}</time>
              <span>{post.category}</span>
              <time>{post.readingTime}</time>
            </div>
          </div>
          <FolkIllustration kind={post.visualKind} surface={post.surface} label={`${post.title} illustration`} />
        </header>

        <section className={styles.detailLayout}>
          <div className={styles.articlePanel}>
            {post.body.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {post.body.sections.map((section, sectionIndex) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {sectionIndex === 0 ? <blockquote className={styles.quote}>{post.body.quote}</blockquote> : null}
              </section>
            ))}
          </div>

          <aside className={styles.detailSide}>
            <div className={styles.sidePanel}>
              <h3>On this page</h3>
              <ul>
                {post.body.toc.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.sidePanel}>
              <h3>Table of Contents</h3>
              <ul>
                {post.body.sections.map((section) => (
                  <li key={section.heading}>{section.heading}</li>
                ))}
              </ul>
            </div>
            <div className={styles.authorMini}>
              <FolkIllustration kind="horse" compact surface="ochre" label="Author mark" />
              <div>
                <h3>Written by Deng Yi</h3>
                <p>Collecting practical notes on systems, UI, and programming language details.</p>
              </div>
            </div>
          </aside>

          <section className={styles.relatedDock} aria-labelledby="related-posts">
            <h2 id="related-posts">Related Posts</h2>
            <FolkRail dense />
            <div className={styles.relatedGrid}>
              {relatedPosts.map((item, index) => (
                <FolkPostCard
                  key={`${item.slug}-${item.title}`}
                  post={item}
                  variant="related"
                  highlight={index === 1}
                />
              ))}
            </div>
          </section>
        </section>
      </article>
    </FolkFrame>
  );
}
