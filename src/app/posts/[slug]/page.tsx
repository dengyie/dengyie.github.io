import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { getFolkPostBySlug } from '@/data/folkShowcase';
import { getRoutePostBySlug, getRoutePosts, getRouteRelatedPosts } from '@/lib/publishing';
import styles from '@/components/folk/folk.module.css';

const detailDisplayRelatedSlugs: Record<string, string[]> = {
  'java-map-comparison': ['java-stack-heap', 'markdown-syntax', 'cpp-grammar-basics'],
};

export function generateStaticParams() {
  return [...new Set(getRoutePosts().map((post) => post.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getRoutePostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.seoDescription,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.date,
      url: `https://dengyie.github.io/posts/${post.slug}`,
      siteName: 'Little Lighthouse',
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.seoDescription,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getRoutePostBySlug(slug);

  if (!post) {
    notFound();
  }

  const showcasePost = getFolkPostBySlug(post.slug);
  const displayPost = showcasePost
    ? {
        ...post,
        title: showcasePost.title,
        excerpt: showcasePost.excerpt,
        dateLabel: showcasePost.dateLabel,
        readingTime: showcasePost.readingTime,
        visualKind: showcasePost.visualKind,
        surface: showcasePost.surface,
        body: showcasePost.body,
        summaryQuote: showcasePost.summaryQuote ?? post.summaryQuote,
      }
    : post;
  const canonicalRelatedPosts = getRouteRelatedPosts(post.slug, post.relatedPosts);
  const displayRelatedPosts = (detailDisplayRelatedSlugs[post.slug] ?? canonicalRelatedPosts.map((item) => item.slug))
    .map((relatedSlug) => getRoutePostBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);
  const relatedCards = displayRelatedPosts.map((item) => {
    const relatedShowcasePost = getFolkPostBySlug(item.slug);

    return {
      post: item,
      displayTitle: relatedShowcasePost?.title,
      displayExcerpt: relatedShowcasePost?.excerpt,
      displayDateLabel: relatedShowcasePost?.dateLabel,
      displayReadingTime: relatedShowcasePost?.readingTime,
    };
  });

  return (
    <FolkFrame active="posts">
      <article>
        <header className={styles.detailHero}>
          <div className={styles.detailHeroCopy}>
            <h1 className={styles.detailTitle}>{displayPost.title}</h1>
            <div className={styles.heroAccent} aria-hidden="true" />
            <p className={styles.detailExcerpt}>{displayPost.excerpt}</p>
            <div className={styles.detailMeta}>
              <div className={styles.detailMetaItem}>
                <span className={styles.detailMetaMark} aria-hidden="true">
                  {`<>`}
                </span>
                <time>{displayPost.dateLabel}</time>
              </div>
              <span className={styles.detailMetaPill}>{displayPost.category}</span>
              <div className={styles.detailMetaItem}>
                <span className={styles.detailMetaDot} aria-hidden="true">
                  *
                </span>
                <time>{displayPost.readingTime}</time>
              </div>
            </div>
          </div>
          <div className={styles.detailHeroArt}>
            <FolkIllustration kind={displayPost.visualKind} surface={displayPost.surface} label={`${displayPost.title} illustration`} />
          </div>
        </header>

        <section className={styles.detailLayout}>
          <div className={styles.articlePanel}>
            <div className={styles.articleIntro}>
              {displayPost.body.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {displayPost.body.sections.map((section, sectionIndex) => (
              <section key={section.heading} className={styles.articleSection}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {sectionIndex === 0 ? (
                  <blockquote className={styles.quote}>
                    <span className={styles.quoteRail} aria-hidden="true" />
                    <span>{displayPost.body.quote}</span>
                  </blockquote>
                ) : null}
              </section>
            ))}
          </div>

          <aside className={styles.detailSide}>
            <div className={styles.sidePanel}>
              <h3>On this page</h3>
              <ul className={styles.sideList}>
                {displayPost.body.toc.map((item, index) => (
                  <li key={item} className={index === 0 ? styles.sideListActive : ''}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.sidePanel} ${styles.sidePanelCompact}`}>
              <div className={styles.tocStrip}>
                <h3>Table of Contents</h3>
                <span aria-hidden="true">^</span>
              </div>
            </div>
            <div className={styles.authorMini}>
              <div className={styles.authorMiniArt}>
                <FolkIllustration kind="horse" compact surface="ochre" label="Author mark" />
              </div>
              <div className={styles.authorMiniCopy}>
                <p className={styles.authorMiniKicker}>Written by Deng Yi</p>
                <h3>Written by Deng Yi</h3>
                <p>{displayPost.author.bio}</p>
                <a href="#related-posts" className={styles.authorMiniLink}>
                  About the author <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </div>
          </aside>

          <section className={styles.relatedDock} aria-labelledby="related-posts">
            <div className={styles.relatedHeader}>
              <div className={styles.relatedHeaderRow}>
                <h2 id="related-posts">Related Posts</h2>
                <span className={styles.relatedKicker} aria-hidden="true">
                  **
                </span>
              </div>
              <FolkRail dense />
            </div>
            <div className={styles.relatedGrid}>
              {relatedCards.map((item, index) => (
                <FolkPostCard
                  key={`${item.post.slug}-${item.post.title}`}
                  post={item.post}
                  variant="related"
                  highlight={index === 1}
                  displayTitle={item.displayTitle}
                  displayExcerpt={item.displayExcerpt}
                  displayDateLabel={item.displayDateLabel}
                  displayReadingTime={item.displayReadingTime}
                />
              ))}
            </div>
          </section>
        </section>
      </article>
    </FolkFrame>
  );
}
