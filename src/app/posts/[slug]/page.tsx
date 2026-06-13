import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getPosts } from '@/lib/posts';
import BentoCard from '@/components/ui/BentoCard/BentoCard';
import CategoryPill from '@/components/ui/CategoryPill/CategoryPill';
import FancyUnderline from '@/components/ui/FancyUnderline/FancyUnderline';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider/OrnamentalDivider';
import PostCard from '@/components/ui/PostCard/PostCard';
import styles from './page.module.css';

function formatDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
}

function categoryHref(category: string) {
  return `/categories/${encodeURIComponent(category.toLowerCase())}`;
}

function estimateReadingTime(contentHtml: string) {
  const text = contentHtml.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found | Folklore & Code',
    };
  }

  return {
    title: `${post.title} | Folklore & Code`,
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
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const fallbackRelated = getPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const displayRelated = relatedPosts.length > 0 ? relatedPosts : fallbackRelated;

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.hero}>
          <CategoryPill label={post.category} href={categoryHref(post.category)} />
          <h1 className={styles.title}>{post.title}</h1>
          <FancyUnderline width="112px" />
          <div className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime || estimateReadingTime(post.contentHtml)}</span>
          </div>
          {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        </header>

        {post.imageUrl ? (
          <figure className={styles.featuredImage}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className={styles.image}
              priority
            />
            <span className={styles.imageOverlay} aria-hidden="true" />
          </figure>
        ) : null}

        <OrnamentalDivider variant="diamonds" />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      <OrnamentalDivider variant="weave" />

      <BentoCard variant="teal" ornamentalBorder className={styles.authorCard}>
        <div className={styles.avatar} aria-hidden="true">
          DY
        </div>
        <div>
          <p className={styles.authorKicker}>Written by</p>
          <h2 className={styles.authorName}>Deng Yi</h2>
          <p className={styles.authorBio}>
            Collecting practical notes on systems, UI, and programming language details.
          </p>
        </div>
      </BentoCard>

      {displayRelated.length > 0 ? (
        <section className={styles.related} aria-labelledby="related-posts">
          <div className={styles.relatedHeader}>
            <h2 id="related-posts">Related Posts</h2>
            <FancyUnderline />
          </div>
          <div className={styles.relatedGrid}>
            {displayRelated.map((item) => (
              <PostCard key={item.slug} {...item} layout="compact" variant="default" />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
