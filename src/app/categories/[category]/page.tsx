import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { LoadMorePagination } from '@/components/folk/FolkControls';
import {
  getRouteCategories,
  getRouteCategory,
  getRouteCategoryCount,
  getRoutePostsByCategory,
} from '@/lib/publishing';
import styles from '@/components/folk/folk.module.css';

function normalizeCategory(category: string) {
  return decodeURIComponent(category).toLowerCase();
}

export function generateStaticParams() {
  return getRouteCategories().map((category) => ({ category: category.routeSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const folkCategory = getRouteCategory(normalizeCategory(category));

  if (!folkCategory) {
    return {
      title: 'Category not found',
    };
  }

  return {
    title: folkCategory.name,
    description: folkCategory.description,
    alternates: {
      canonical: `/categories/${category}`,
    },
    openGraph: {
      title: `${folkCategory.name} | Little Lighthouse`,
      description: folkCategory.description,
      url: `https://dengyie.github.io/categories/${category}`,
      siteName: 'Little Lighthouse',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${folkCategory.name} | Little Lighthouse`,
      description: folkCategory.description,
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
  const folkCategory = getRouteCategory(normalized);

  if (!folkCategory) {
    return notFound();
  }

  const posts = getRoutePostsByCategory(folkCategory.slug);
  const featuredPosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 5);

  return (
    <FolkFrame active="categories">
      <section className={styles.categoryHero} aria-labelledby="category-title">
        <Link href="/posts" className={styles.backLink}>
          &lt;- All Categories
        </Link>
        <h1 id="category-title" className={styles.categoryTitle}>
          {folkCategory.name === 'Design Notes' ? 'Craft & Code' : folkCategory.name}
        </h1>
        <div className={styles.redBrush} aria-hidden="true" />
      </section>

      <section className={styles.summaryBand} aria-label={`${folkCategory.name} summary`}>
        <FolkIllustration kind={folkCategory.icon} compact surface="charcoal" label={`${folkCategory.name} mark`} />
        <p>{folkCategory.description}</p>
        <div className={styles.stat}>
          <strong>{getRouteCategoryCount(folkCategory.slug)}</strong>
          <span>Posts</span>
        </div>
        <div className={styles.stat}>
          <strong>Jun 2026</strong>
          <span>Updated</span>
        </div>
      </section>

      <FolkRail dense />

      <section className={styles.categoryGrid} aria-label={`${folkCategory.name} posts`}>
        <div className={styles.categoryFeatured}>
          {featuredPosts.map((post, index) => (
            <FolkPostCard key={`${post.slug}-${post.title}`} post={post} variant="featured" highlight={index === 0} />
          ))}
        </div>
        <div className={styles.categorySmall}>
          {smallPosts.map((post) => (
            <FolkPostCard key={`${post.slug}-${post.title}`} post={post} variant="row" />
          ))}
        </div>
        <LoadMorePagination />
      </section>
    </FolkFrame>
  );
}
