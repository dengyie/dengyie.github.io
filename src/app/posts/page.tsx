import type { Metadata } from 'next';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { CategoryChips, CategoryControls, LoadMorePagination } from '@/components/folk/FolkControls';
import {
  getRouteCategories,
  getRouteCategoryCount,
  getRouteFeaturedPosts,
  getRoutePosts,
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
  const routePosts = getRoutePosts();
  const featuredPosts = getRouteFeaturedPosts();
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug));
  const smallPosts = routePosts.filter((post) => !featuredSlugs.has(post.slug)).slice(0, 4);

  return (
    <FolkFrame active="posts" sideRails={false}>
      <section className={styles.postsLayout}>
        <aside className={styles.postsSidebar}>
          <h1 className={styles.pageTitle}>All Posts</h1>
          <p className={styles.pageSubtitle}>Collected notes on systems, craft, memory, and making.</p>
          <div className={styles.postsOrnaments} aria-hidden="true" />
          <CategoryChips categories={categories} />
          <h2 className={styles.sidebarTitle}>Categories</h2>
          <CategoryControls
            categories={categories}
            totalCount={getRouteTotalCount()}
            getCategoryCount={getRouteCategoryCount}
          />
          <div className={styles.workshopNote}>
            <FolkIllustration kind="horse" compact surface="charcoal" label="Workshop horse mark" />
            <p>
              Notes from the workshop.
              <br />
              <span>Made with care.</span>
            </p>
          </div>
        </aside>

        <div className={styles.postsMain}>
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post) => (
              <FolkPostCard key={`${post.slug}-${post.title}`} post={post} variant="featured" />
            ))}
          </div>
          <div className={styles.smallGrid}>
            {smallPosts.map((post, index) => (
              <FolkPostCard key={`${post.slug}-${post.title}`} post={post} highlight={index === 1} />
            ))}
          </div>
          <FolkRail dense />
          <LoadMorePagination />
        </div>
      </section>
    </FolkFrame>
  );
}
