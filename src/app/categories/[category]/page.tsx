import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import styles from "./page.module.css";

const categoryIcons: Record<string, string> = {
  android: "\u{1F916}",
  "c++": "\u2699\uFE0F",
  java: "\u2615",
  other: "\u{1F4E6}",
};

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: cat.name.toLowerCase(),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  const displayName = posts[0].category;
  const icon = categoryIcons[category.toLowerCase()] || "\u{1F4C2}";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>&larr; Home</Link>
        <span className={styles.icon}>{icon}</span>
        <h1 className={styles.title}>{displayName}</h1>
        <p className={styles.subtitle}>{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
      </div>

      <div className={styles.list}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.cardMeta}>
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
