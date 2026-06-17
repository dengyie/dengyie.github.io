import styles from './folk.module.css';

interface FolkRailProps {
  orientation?: 'horizontal' | 'vertical';
  dense?: boolean;
  className?: string;
}

export default function FolkRail({ orientation = 'horizontal', dense = false, className = '' }: FolkRailProps) {
  return (
    <div
      className={`${styles.rail} ${styles[orientation]} ${dense ? styles.denseRail : ''} ${className}`}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
