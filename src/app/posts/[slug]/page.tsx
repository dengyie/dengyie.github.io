import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import styles from "./post.module.css";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Little Lighthouse",
    };
  }

  return {
    title: `${post.title} | Little Lighthouse`,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://dengyie.github.io/posts/${post.slug}`,
    },
  };
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
    <>
      <Header />
      <article className={styles.article}>
        <header className={styles.header}>
          <Link href="/posts" className={styles.backLink}>
            All Posts
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
      <Footer />
    </>
  );
}
