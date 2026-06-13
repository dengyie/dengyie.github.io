import styles from './FancyUnderline.module.css';

export interface FancyUnderlineProps {
  width?: string;
  className?: string;
}

export default function FancyUnderline({
  width = '60px',
  className,
}: FancyUnderlineProps) {
  const classNames = [styles.underline, className].filter(Boolean).join(' ');

  return (
    <span
      className={classNames}
      style={{ '--underline-width': width } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

