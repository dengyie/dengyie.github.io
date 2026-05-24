import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./post.module.css";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Link href="/posts" className={styles.backLink}>
          &larr; All Posts
        </Link>
        <div className={styles.meta}>
          <Link href={`/categories/${post.category.toLowerCase()}`} className={styles.category}>
            {post.category}
          </Link>
          <time className={styles.date}>{post.date}</time>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
      </header>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
