import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import styles from './FeaturedPosts.module.css';

export default function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="posts" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Selected signals</p>
          <h2 className={styles.sectionTitle}>Latest Notes</h2>
          <p className={styles.sectionSubtitle}>Fresh technical fragments, sorted by usefulness.</p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryBadge}>{post.category}</span>
                    <time className={styles.date}>{post.date}</time>
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <span className={styles.cardLink}>Open note</span>
                </Link>
              ))}
            </div>
            <div className={styles.viewAll}>
              <Link href="/posts" className={styles.viewAllLink}>
                View all posts
              </Link>
            </div>
          </>
        ) : (
          <p className={styles.empty}>No posts yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}
