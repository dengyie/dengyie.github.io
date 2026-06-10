import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "All Posts | Little Lighthouse",
  description: "All technical notes from Little Lighthouse.",
  alternates: {
    canonical: "/posts",
  },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>Back home</Link>
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
      </main>
      <Footer />
    </>
  );
}
