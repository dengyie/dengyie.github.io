import type { ReactNode } from 'react';
import styles from './DropCap.module.css';

export interface DropCapProps {
  children: ReactNode;
  className?: string;
}

export default function DropCap({ children, className }: DropCapProps) {
  const classNames = [styles.dropCap, className].filter(Boolean).join(' ');

  return <span className={classNames}>{children}</span>;
}

