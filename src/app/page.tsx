import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { CategoryControls } from '@/components/folk/FolkControls';
import { folkCategories, getFolkCategoryCount, getFolkFeaturedPosts, getFolkRecentPosts, getFolkTotalCount } from '@/data/folkShowcase';
import styles from '@/components/folk/folk.module.css';

export default function HomePage() {
  const featured = getFolkFeaturedPosts()[0];
  const secondary = getFolkFeaturedPosts()[1];
  const recentPosts = getFolkRecentPosts();

  return (
    <FolkFrame active="home">
      <section className={styles.homeHero} aria-labelledby="home-title">
        <div>
          <h1 id="home-title" className={styles.heroTitle}>
            Small Notes, Better Systems
          </h1>
          <div className={styles.heroAccent} aria-hidden="true" />
          <p className={styles.heroSubtitle}>
            Technical field notes with a hand-painted soul.
          </p>
        </div>

        <article className={styles.heroFeature}>
          <FolkIllustration kind="flower" surface="charcoal" label="Painted botanical feature" />
          <div className={styles.postCopy}>
            <span className={styles.featuredLabel}>Featured</span>
            <h2>{featured.title}</h2>
            <p className={styles.postMeta}>
              {featured.dateLabel} <span>*</span> {featured.category}
            </p>
            <p className={styles.postExcerpt}>{featured.excerpt}</p>
            <span className={styles.readMore}>Read more -&gt;</span>
            <FolkRail />
            <h2>{secondary.title}</h2>
            <p className={styles.postMeta}>
              {secondary.dateLabel} <span>*</span> {secondary.category}
            </p>
          </div>
        </article>
      </section>

      <FolkRail dense />

      <section className={styles.contentBand} aria-label="Recent posts and categories">
        <div>
          <h2 className={styles.sectionTitle}>Recent Posts</h2>
          <div className={styles.recentGrid}>
            {recentPosts.map((post) => (
              <FolkPostCard key={`${post.slug}-${post.title}`} post={post} />
            ))}
          </div>
        </div>

        <aside>
          <h2 className={styles.sidebarTitle}>Browse Categories</h2>
          <CategoryControls
            categories={folkCategories}
            totalCount={getFolkTotalCount()}
            getCategoryCount={getFolkCategoryCount}
          />
        </aside>
      </section>
    </FolkFrame>
  );
}
