import type { Metadata } from 'next';
import { getAllCategories, getPosts } from '@/lib/posts';
import CategoryPill from '@/components/ui/CategoryPill/CategoryPill';
import FancyUnderline from '@/components/ui/FancyUnderline/FancyUnderline';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider/OrnamentalDivider';
import PostCard from '@/components/ui/PostCard/PostCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'All Posts | Folklore & Code',
  description: 'All technical notes from Folklore & Code.',
  alternates: {
    canonical: '/posts',
  },
};

function categoryHref(category: string) {
  return `/categories/${encodeURIComponent(category.toLowerCase())}`;
}

export default function PostsPage() {
  const posts = getPosts();
  const categories = getAllCategories();

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>Archive</p>
        <h1 className={styles.title}>All Posts</h1>
        <FancyUnderline width="92px" />
        <p className={styles.subtitle}>
          Collected notes on systems, craft, memory, and making.
        </p>
        <div className={styles.filters} aria-label="Browse posts by category">
          {categories.map((category) => (
            <CategoryPill
              key={category.name}
              label={`${category.name} (${category.count})`}
              href={categoryHref(category.name)}
            />
          ))}
        </div>
      </section>

      <OrnamentalDivider variant="diamonds" />

      <section className={styles.grid} aria-label="All posts">
        {posts.map((post, index) => (
          <PostCard
            key={post.slug}
            {...post}
            layout="vertical"
            variant={index % 4 === 1 ? 'teal' : 'default'}
          />
        ))}
      </section>
    </main>
  );
}
