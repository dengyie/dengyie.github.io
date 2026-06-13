import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/posts';
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

export default async function HomePage() {
  const posts = getPosts();
  const latest = posts[0];
  const recentPosts = posts.slice(1, 7);
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <main className={styles.page}>
      {latest ? (
        <section className={styles.hero} aria-labelledby="latest-story">
          <BentoCard variant="parchment" ornamentalBorder className={styles.heroCard}>
            {latest.imageUrl ? (
              <Link href={`/posts/${latest.slug}`} className={styles.heroImageLink}>
                <div className={styles.heroImage}>
                  <Image
                    src={latest.imageUrl}
                    alt={latest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className={styles.image}
                    priority
                  />
                  <span className={styles.imageOverlay} aria-hidden="true" />
                </div>
              </Link>
            ) : (
              <Link href={`/posts/${latest.slug}`} className={styles.heroImageLink}>
                <div className={styles.placeholderImage}>
                  <span>Latest Story</span>
                </div>
              </Link>
            )}

            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Latest Story</p>
              <CategoryPill label={latest.category} href={categoryHref(latest.category)} />
              <Link href={`/posts/${latest.slug}`} className={styles.heroTitleLink}>
                <h1 id="latest-story" className={styles.heroTitle}>
                  {latest.title}
                </h1>
              </Link>
              <FancyUnderline width="96px" />
              <time className={styles.date} dateTime={latest.date}>
                {formatDate(latest.date)}
              </time>
              <p className={styles.excerpt}>{latest.excerpt}</p>
            </div>
          </BentoCard>
        </section>
      ) : null}

      <OrnamentalDivider variant="diamonds" />

      <section className={styles.section} aria-labelledby="recent-posts">
        <div className={styles.sectionHeader}>
          <h2 id="recent-posts" className={styles.sectionTitle}>
            Recent Posts
          </h2>
          <FancyUnderline />
        </div>

        <div className={styles.grid}>
          {recentPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              {...post}
              layout={index === 2 || index === 5 ? 'compact' : 'vertical'}
              variant={index % 3 === 1 ? 'teal' : 'default'}
              className={index === 0 ? styles.featuredPost : undefined}
            />
          ))}
        </div>
      </section>

      <section id="categories" className={styles.section} aria-labelledby="browse-category">
        <div className={styles.sectionHeader}>
          <h2 id="browse-category" className={styles.sectionTitle}>
            Browse by Category
          </h2>
          <FancyUnderline />
        </div>
        <div className={styles.categoryCloud}>
          {categories.map((category) => (
            <CategoryPill key={category} label={category} href={categoryHref(category)} />
          ))}
        </div>
      </section>
    </main>
  );
}
