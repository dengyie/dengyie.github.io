import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, getPostsByCategory } from '@/lib/posts';
import BentoCard from '@/components/ui/BentoCard/BentoCard';
import FancyUnderline from '@/components/ui/FancyUnderline/FancyUnderline';
import PostCard from '@/components/ui/PostCard/PostCard';
import styles from './page.module.css';

const categoryDescriptions: Record<string, string> = {
  android: 'Articles about Android interfaces, RecyclerView behavior, and mobile implementation notes.',
  java: 'Articles about Java collections, memory models, and everyday runtime reasoning.',
  'c++': 'Articles about C++ grammar, fundamentals, and practical language details.',
  other: 'Loose field notes about writing, markup, and small technical workflows.',
};

function normalizeCategory(category: string) {
  return decodeURIComponent(category).toLowerCase();
}

function displayCategory(category: string, posts: ReturnType<typeof getPostsByCategory>) {
  return posts[0]?.category || decodeURIComponent(category);
}

export function generateStaticParams() {
  const categories = [...new Set(getPosts().map((post) => post.category.toLowerCase()))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const posts = getPostsByCategory(normalizeCategory(category));
  const name = displayCategory(category, posts);

  return {
    title: `${name} | Folklore & Code`,
    description: categoryDescriptions[normalizeCategory(category)] || `Articles about ${name}.`,
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
  const normalized = normalizeCategory(category);
  const posts = getPostsByCategory(normalized);
  const name = displayCategory(category, posts);
  const description = categoryDescriptions[normalized] || `Articles about ${name}.`;

  return (
    <main className={styles.page}>
      <Link href="/posts" className={styles.backLink}>
        ← All Categories
      </Link>

      <BentoCard variant="teal" ornamentalBorder className={styles.banner}>
        <div className={styles.bannerContent}>
          <p className={styles.kicker}>{posts.length} articles</p>
          <h1 className={styles.title}>{name}</h1>
          <FancyUnderline width="96px" />
          <p className={styles.description}>{description}</p>
        </div>
      </BentoCard>

      {posts.length > 0 ? (
        <section className={styles.grid} aria-label={`${name} posts`}>
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} layout="vertical" variant="default" />
          ))}
        </section>
      ) : (
        <blockquote className={styles.empty}>No articles yet.</blockquote>
      )}
    </main>
  );
}
