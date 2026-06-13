import Link from 'next/link';
import styles from './CategoryPill.module.css';

export interface CategoryPillProps {
  label: string;
  href?: string;
  className?: string;
}

export default function CategoryPill({ label, href, className }: CategoryPillProps) {
  const classNames = [styles.pill, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {label}
      </Link>
    );
  }

  return <span className={classNames}>{label}</span>;
}

