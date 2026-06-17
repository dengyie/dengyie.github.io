import type { Metadata } from 'next';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { CategoryChips, CategoryControls, LoadMorePagination } from '@/components/folk/FolkControls';
import {
  getRouteCategories,
  getRouteCategoryCount,
  getRouteArchivePosts,
  getRouteTotalCount,
} from '@/lib/publishing';
import styles from '@/components/folk/folk.module.css';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'All technical notes from Little Lighthouse.',
  alternates: {
    canonical: '/posts',
  },
};

export default function PostsPage() {
  const categories = getRouteCategories();
  const routePosts = getRouteArchivePosts();
  const featuredPosts = routePosts.filter((post) => post.featured);
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug));
  const smallPosts = routePosts.filter((post) => !featuredSlugs.has(post.slug)).slice(0, 4);

  return (
    <FolkFrame active="posts" sideRails={false}>
      <section className={styles.postsLayout}>
        <aside className={styles.postsSidebar}>
          <div className={styles.archiveSidebarStack}>
            <div className={styles.postsSidebarIntro}>
              <h1 className={styles.pageTitle}>All Posts</h1>
              <p className={styles.pageSubtitle}>Collected notes on systems, craft, memory, and making.</p>
            </div>
            <div className={styles.postsOrnaments} aria-hidden="true" />
            <CategoryChips categories={categories} />
            <div className={styles.sidebarCategoryBlock}>
              <h2 className={styles.sidebarTitle}>Categories</h2>
              <CategoryControls
                categories={categories}
                totalCount={getRouteTotalCount()}
                getCategoryCount={getRouteCategoryCount}
              />
            </div>
            <div className={styles.workshopNote}>
              <FolkIllustration kind="horse" compact surface="charcoal" label="Workshop horse mark" />
              <p>
                Notes from the workshop.
                <br />
                <span>Made with care.</span>
              </p>
            </div>
          </div>
        </aside>

        <div className={styles.postsMain}>
          <div className={styles.featuredGrid}>
            {featuredPosts.slice(0, 2).map((post, index) => (
              <FolkPostCard
                key={`${post.slug}-${post.title}`}
                post={post}
                variant="featured"
                featuredIndex={index}
                displayTitle={post.archiveTitle}
                displayExcerpt={post.archiveExcerpt}
                displayDateLabel={post.archiveDateLabel}
                displayReadingTime={post.archiveReadingTime}
              />
            ))}
          </div>
          <div className={styles.smallGrid}>
            {smallPosts.map((post, index) => (
              <FolkPostCard
                key={`${post.slug}-${post.title}`}
                post={post}
                highlight={index === 1}
                variant="small"
                compactIndex={index}
                displayTitle={post.archiveTitle}
                displayExcerpt={post.archiveExcerpt}
                displayDateLabel={post.archiveDateLabel}
                displayReadingTime={post.archiveReadingTime}
              />
            ))}
          </div>
          <div className={styles.postsArchiveRail}>
            <FolkRail dense />
          </div>
          <LoadMorePagination />
        </div>
      </section>
    </FolkFrame>
  );
}
