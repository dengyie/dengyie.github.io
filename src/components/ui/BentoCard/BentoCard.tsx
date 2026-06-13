import type { ReactNode } from 'react';
import styles from './BentoCard.module.css';

export interface BentoCardProps {
  variant?: 'default' | 'parchment' | 'teal';
  ornamentalBorder?: boolean;
  className?: string;
  children: ReactNode;
}

export default function BentoCard({
  variant = 'default',
  ornamentalBorder = false,
  className,
  children,
}: BentoCardProps) {
  const classNames = [
    styles.card,
    styles[variant],
    ornamentalBorder ? styles.ornamentalBorder : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}

