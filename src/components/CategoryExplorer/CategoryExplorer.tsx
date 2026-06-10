import Link from "next/link";
import { getAllCategories } from "@/lib/posts";
import styles from "./CategoryExplorer.module.css";

const categoryMarks: Record<string, string> = {
  android: 'AD',
  'c++': 'C++',
  java: 'JV',
  other: 'MD',
};

export default function CategoryExplorer() {
  const categories = getAllCategories();

  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore by Topic</h2>
          <p className={styles.sectionSubtitle}>Jump into the stack you are thinking about today.</p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${cat.name.toLowerCase()}`}
              className={styles.card}
            >
              <span className={styles.icon}>
                {categoryMarks[cat.name.toLowerCase()] || 'NT'}
              </span>
              <span className={styles.name}>{cat.name}</span>
              <span className={styles.count}>
                {cat.count} post{cat.count !== 1 ? "s" : ""}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
