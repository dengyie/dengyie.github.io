import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FolkFrame from '@/components/folk/FolkFrame';
import FolkIllustration from '@/components/folk/FolkIllustration';
import FolkPostCard from '@/components/folk/FolkPostCard';
import FolkRail from '@/components/folk/FolkRail';
import { CategoryChips, LoadMorePagination } from '@/components/folk/FolkControls';
import { getFolkPostBySlug } from '@/data/folkShowcase';
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

  const categories = getRouteCategories();
  const posts = getRoutePostsByCategory(folkCategory.slug);
  const featuredPosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 5);
  const displayCategoryName = folkCategory.name === 'Design Notes' ? 'Craft & Code' : folkCategory.name;
  const categoryDescription =
    folkCategory.slug === 'design-notes'
      ? 'Notes about the places where design craft meets practical engineering.'
      : folkCategory.description;
  const updatedLabel = folkCategory.slug === 'design-notes' ? 'Jun 2026' : 'Current';
  const categoryCountLabel = getRouteCategoryCount(folkCategory.slug);

  const toDisplayCard = (post: (typeof posts)[number]) => {
    const showcasePost = getFolkPostBySlug(post.slug);

    return {
      post,
      displayCategory: showcasePost?.categoryLabel ?? post.category,
      displayTitle: showcasePost?.title,
      displayExcerpt: showcasePost?.excerpt,
      displayDateLabel: showcasePost?.dateLabel,
      displayReadingTime: showcasePost?.readingTime,
    };
  };

  const featuredCards = featuredPosts.map(toDisplayCard);
  const smallCards = smallPosts.map(toDisplayCard);

  return (
    <FolkFrame active="categories">
      <section className={styles.categoryHero} aria-labelledby="category-title">
        <Link href="/posts" className={styles.backLink}>
          <span aria-hidden="true">&lt;-</span>
          <span>All Categories</span>
        </Link>
        <h1 id="category-title" className={styles.categoryTitle}>
          {displayCategoryName}
        </h1>
        <div className={styles.redBrush} aria-hidden="true" />
        <p className={styles.categoryHeroNote}>{categoryDescription}</p>
        <CategoryChips categories={categories} active={folkCategory.slug} />
      </section>

      <section className={styles.summaryBand} aria-label={`${displayCategoryName} summary`}>
        <div className={styles.categoryMedallion}>
          <FolkIllustration kind={folkCategory.icon} compact surface="charcoal" label={`${displayCategoryName} mark`} />
        </div>
        <p>{categoryDescription}</p>
        <div className={styles.stat}>
          <strong>{categoryCountLabel}</strong>
          <span>Posts</span>
        </div>
        <div className={styles.stat}>
          <strong>{updatedLabel}</strong>
          <span>Updated</span>
        </div>
      </section>

      <FolkRail dense />

      <section className={styles.categoryGrid} aria-label={`${displayCategoryName} posts`}>
        <div className={styles.categoryFeatured}>
          {featuredCards.map((item, index) => (
            <FolkPostCard
              key={`${item.post.slug}-${item.post.title}`}
              post={item.post}
              variant="featured"
              highlight={index === 0}
              featuredIndex={index}
              displayCategory={item.displayCategory}
              displayTitle={item.displayTitle}
              displayExcerpt={item.displayExcerpt}
              displayDateLabel={item.displayDateLabel}
              displayReadingTime={item.displayReadingTime}
            />
          ))}
        </div>
        <div className={styles.categorySmall}>
          {smallCards.map((item, index) => (
            <FolkPostCard
              key={`${item.post.slug}-${item.post.title}`}
              post={item.post}
              variant="row"
              highlight={index === 1}
              displayCategory={item.displayCategory}
              displayTitle={item.displayTitle}
              displayExcerpt={item.displayExcerpt}
              displayDateLabel={item.displayDateLabel}
              displayReadingTime={item.displayReadingTime}
            />
          ))}
        </div>
        <LoadMorePagination />
      </section>
    </FolkFrame>
  );
}
