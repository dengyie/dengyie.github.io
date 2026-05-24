import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import styles from "./FeaturedPosts.module.css";

export default function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="posts" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Posts</h2>
          <p className={styles.sectionSubtitle}>Recent notes &amp; discoveries</p>
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
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <span className={styles.cardLink}>
                    Read more &rarr;
                  </span>
                </Link>
              ))}
            </div>
            <div className={styles.viewAll}>
              <Link href="/posts" className={styles.viewAllLink}>
                View all posts &rarr;
              </Link>
            </div>
          </>
        ) : (
          <p className={styles.empty}>No posts yet — check back soon!</p>
        )}
      </div>
    </section>
  );
}
