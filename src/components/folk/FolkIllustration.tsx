import styles from './folk.module.css';
import type { PublishingSurface, PublishingVisualKind } from '@/data/publishing/types';

const visualAssets: Record<PublishingVisualKind, string> = {
  flower: '/ornaments/folk/flower.svg',
  rosette: '/ornaments/folk/rosette.svg',
  sprig: '/ornaments/folk/sprig.svg',
  horse: '/ornaments/folk/horse.svg',
  diamond: '/ornaments/folk/diamond.svg',
  forest: '/ornaments/folk/forest.svg',
};

interface FolkIllustrationProps {
  kind: PublishingVisualKind;
  surface?: PublishingSurface;
  compact?: boolean;
  label?: string;
}

export default function FolkIllustration({
  kind,
  surface = 'charcoal',
  compact = false,
  label = 'Folk illustration',
}: FolkIllustrationProps) {
  const accessibilityProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true };

  return (
    <div
      className={`${styles.illustration} ${styles[`visual-${kind}`]} ${styles[`surface-${surface}`]} ${
        compact ? styles.compactIllustration : ''
      }`}
      {...accessibilityProps}
    >
      <img className={styles.visualAsset} src={visualAssets[kind]} alt="" aria-hidden="true" />
      <span className={styles.inkWash} aria-hidden="true" />
      <span className={styles.visualStars} aria-hidden="true" />
      <span className={styles.visualCornerA} aria-hidden="true" />
      <span className={styles.visualCornerB} aria-hidden="true" />
      <span className={styles.visualCenter} aria-hidden="true" />
      <span className={styles.visualStem} aria-hidden="true" />
      <span className={styles.visualPetalA} aria-hidden="true" />
      <span className={styles.visualPetalB} aria-hidden="true" />
      <span className={styles.visualPetalC} aria-hidden="true" />
      <span className={styles.visualGround} aria-hidden="true" />
    </div>
  );
}
