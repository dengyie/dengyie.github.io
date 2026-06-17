import Link from 'next/link';
import FolkIllustration from './FolkIllustration';
import styles from './folk.module.css';
import type { RoutePost } from '@/lib/publishing';

interface FolkPostCardProps {
  post: RoutePost;
  variant?: 'featured' | 'small' | 'row' | 'related';
  highlight?: boolean;
}

export default function FolkPostCard({ post, variant = 'small', highlight = false }: FolkPostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`${styles.postCard} ${styles[`post-${variant}`]} ${highlight ? styles.highlightCard : ''}`}
    >
      <FolkIllustration
        kind={post.visualKind}
        surface={post.surface}
        compact={variant !== 'featured'}
        label={`${post.title} illustration`}
      />
      <div className={styles.postCopy}>
        {post.featured ? <span className={styles.featuredLabel}>Featured</span> : null}
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
