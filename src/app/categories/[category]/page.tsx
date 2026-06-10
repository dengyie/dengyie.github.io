import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import styles from "./page.module.css";

const categoryMarks: Record<string, string> = {
  android: "AD",
  "c++": "C++",
  java: "JV",
  other: "MD",
};

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: cat.name.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const displayName = posts[0]?.category || category;

  return {
    title: `${displayName} Notes | Little Lighthouse`,
    description: `Technical notes in the ${displayName} category.`,
    alternates: {
      canonical: `/categories/${category}`,
    },
  };
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
  const mark = categoryMarks[category.toLowerCase()] || "NT";

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>Back home</Link>
          <span className={styles.icon}>{mark}</span>
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
      </main>
      <Footer />
    </>
  );
}
