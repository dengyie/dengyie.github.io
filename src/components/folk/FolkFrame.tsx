import type { ReactNode } from 'react';
import FolkFooter from './FolkFooter';
import FolkHeader from './FolkHeader';
import FolkRail from './FolkRail';
import styles from './folk.module.css';

interface FolkFrameProps {
  children: ReactNode;
  active?: 'home' | 'posts' | 'categories' | 'about';
  sideRails?: boolean;
  className?: string;
}

export default function FolkFrame({ children, active, sideRails = true, className = '' }: FolkFrameProps) {
  return (
    <main className={styles.stage}>
      <section className={`${styles.frame} ${sideRails ? styles.withRails : ''} ${className}`}>
        {sideRails ? (
          <>
            <FolkRail orientation="vertical" dense className={styles.leftRail} />
            <FolkRail orientation="vertical" dense className={styles.rightRail} />
          </>
        ) : null}
        <div className={styles.frameInner}>
          <FolkHeader active={active} />
          {children}
          <FolkFooter />
        </div>
      </section>
    </main>
  );
}
