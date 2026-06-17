import Link from 'next/link';
import FolkIllustration from './FolkIllustration';
import styles from './folk.module.css';
import type { FolkCategory } from '@/data/folkShowcase';

interface CategoryControlsProps {
  categories: FolkCategory[];
  active?: string;
  totalCount?: number;
  getCategoryCount?: (slug: string) => number;
}

export function CategoryControls({
  categories,
  active = 'all',
  totalCount = 0,
  getCategoryCount,
}: CategoryControlsProps) {
  return (
    <div className={styles.categoryControls} aria-label="Browse categories">
      <Link className={active === 'all' ? styles.activeCategory : ''} href="/posts">
        <span>All Posts</span>
        <strong>{totalCount}</strong>
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          className={active === category.slug ? styles.activeCategory : ''}
          href={`/categories/${category.slug}`}
        >
          <FolkIllustration kind={category.icon} compact surface="charcoal" label="" />
          <span>{category.name}</span>
          <strong>{getCategoryCount ? getCategoryCount(category.slug) : category.count}</strong>
        </Link>
      ))}
    </div>
  );
}

export function CategoryChips({ categories, active = 'all' }: CategoryControlsProps) {
  return (
    <div className={styles.categoryChips} aria-label="Category filters">
      <Link className={active === 'all' ? styles.activeChip : ''} href="/posts">
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          className={active === category.slug ? styles.activeChip : ''}
          href={`/categories/${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export function LoadMorePagination() {
  return (
    <div className={styles.loadMore} aria-label="Pagination">
      <div className={styles.pageDots} aria-hidden="true">
        <span>&lt;</span>
        <strong>1</strong>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>4</span>
        <span>&gt;</span>
      </div>
      <button type="button">Load More Posts</button>
    </div>
  );
}
