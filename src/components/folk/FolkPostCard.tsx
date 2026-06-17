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
}

export default function FolkPostCard({
  post,
  variant = 'small',
  highlight = false,
  featuredIndex,
  compactIndex,
}: FolkPostCardProps) {
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
        label={`${post.title} illustration`}
      />
      <div className={styles.postCopy}>
        {variant === 'featured' ? <span className={styles.featuredLabel}>Featured</span> : null}
        <p className={styles.postCategory}>{post.category}</p>
        <h2>{post.title}</h2>
        <p className={styles.postMeta}>
          {post.dateLabel} <span aria-hidden="true">/</span> {post.readingTime}
        </p>
        <p className={styles.postExcerpt}>{post.excerpt}</p>
        <span className={styles.readMore}>Read more</span>
      </div>
    </Link>
  );
}
