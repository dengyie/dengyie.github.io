import Link from 'next/link';
import FolkIllustration from './FolkIllustration';
import styles from './folk.module.css';
import type { RoutePost } from '@/lib/publishing';

interface FolkPostCardProps {
  post: RoutePost;
  variant?: 'featured' | 'small' | 'row' | 'related';
  highlight?: boolean;
  featuredIndex?: number;
  compactIndex?: number;
  displayCategory?: string;
  displayTitle?: string;
  displayExcerpt?: string;
  displayDateLabel?: string;
  displayReadingTime?: string;
}

export default function FolkPostCard({
  post,
  variant = 'small',
  highlight = false,
  featuredIndex,
  compactIndex,
  displayCategory,
  displayTitle,
  displayExcerpt,
  displayDateLabel,
  displayReadingTime,
}: FolkPostCardProps) {
  const category = displayCategory ?? post.category;
  const title = displayTitle ?? post.title;
  const excerpt = displayExcerpt ?? post.excerpt;
  const dateLabel = displayDateLabel ?? post.dateLabel;
  const readingTime = displayReadingTime ?? post.readingTime;
  const cardClassName = [
    styles.postCard,
    styles[`post-${variant}`],
    highlight ? styles.highlightCard : '',
    variant === 'featured' && featuredIndex === 1 ? styles.featuredAlt : '',
    variant === 'small' && compactIndex === 0 ? styles.compactTall : '',
    variant === 'small' && compactIndex === 3 ? styles.compactDense : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={`/posts/${post.slug}`} className={cardClassName}>
      <FolkIllustration
        kind={post.visualKind}
        surface={post.surface}
        compact={variant !== 'featured'}
        label={`${title} illustration`}
      />
      <div className={styles.postCopy}>
        {variant === 'featured' ? <span className={styles.featuredLabel}>Featured</span> : null}
        <p className={styles.postCategory}>{category}</p>
        <h2>{title}</h2>
        <p className={styles.postMeta}>
          {dateLabel} <span aria-hidden="true">/</span> {readingTime}
        </p>
        <p className={styles.postExcerpt}>{excerpt}</p>
        <span className={styles.readMore}>Read more</span>
      </div>
    </Link>
  );
}
