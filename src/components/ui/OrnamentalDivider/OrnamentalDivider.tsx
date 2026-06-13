import styles from './OrnamentalDivider.module.css';

export interface OrnamentalDividerProps {
  variant?: 'diamonds' | 'weave';
  className?: string;
}

export default function OrnamentalDivider({
  variant = 'diamonds',
  className,
}: OrnamentalDividerProps) {
  const classNames = [
    styles.divider,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role="separator"
      aria-orientation="horizontal"
    >
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.ornament} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
    </div>
  );
}

