import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>&larr; Home</Link>
        <h1 className={styles.title}>All Posts</h1>
        <p className={styles.subtitle}>{posts.length} articles and counting</p>
      </div>

      <div className={styles.list}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.cardMeta}>
              <span className={styles.category}>{post.category}</span>
              <time className={styles.date}>{post.date}</time>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
