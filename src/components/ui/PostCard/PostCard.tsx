import Image from 'next/image';
import Link from 'next/link';
import BentoCard from '@/components/ui/BentoCard/BentoCard';
import styles from './PostCard.module.css';

type CardVariant = 'default' | 'parchment' | 'teal';
type CardLayout = 'vertical' | 'horizontal' | 'compact';

export interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  imageUrl?: string;
  layout?: CardLayout;
  variant?: CardVariant;
  className?: string;
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function CategoryPill({ category }: { category: string }) {
  return <span className={styles.categoryPill}>{category}</span>;
}

export default function PostCard({
  slug,
  title,
  date,
  excerpt,
  category = 'Notes',
  imageUrl,
  layout = 'vertical',
  variant = 'default',
  className,
}: PostCardProps) {
  const showImage = Boolean(imageUrl) && layout !== 'compact';
  const showExcerpt = Boolean(excerpt) && layout !== 'compact';
  const formattedDate = formatDate(date);
  const href = `/posts/${slug}`;
  const cardClasses = [
    styles.card,
    styles[layout],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={styles.link} aria-label={`Read ${title}`}>
      <BentoCard
        variant={variant}
        ornamentalBorder={layout !== 'compact'}
        className={cardClasses}
      >
        {showImage ? (
          <div className={styles.imageWrap}>
            <Image
              src={imageUrl as string}
              alt={title}
              fill
              sizes={layout === 'horizontal' ? '280px' : '(max-width: 768px) 100vw, 600px'}
              className={styles.image}
            />
            <span className={styles.imageOverlay} aria-hidden="true" />
          </div>
        ) : null}

        <div className={styles.content}>
          <div className={styles.metaRow}>
            <CategoryPill category={category} />
            <time className={styles.date} dateTime={date}>
              {formattedDate}
            </time>
          </div>

          <h3 className={styles.title}>{title}</h3>

          {showExcerpt ? (
            <p className={styles.excerpt}>{excerpt}</p>
          ) : null}
        </div>
      </BentoCard>
    </Link>
  );
}

