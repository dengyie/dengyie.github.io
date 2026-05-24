import Link from "next/link";
import { getAllCategories } from "@/lib/posts";
import styles from "./CategoryExplorer.module.css";

const categoryIcons: Record<string, string> = {
  android: "\u{1F916}",
  "c++": "\u2699\uFE0F",
  java: "\u2615",
  other: "\u{1F4E6}",
};

export default function CategoryExplorer() {
  const categories = getAllCategories();

  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore by Topic</h2>
          <p className={styles.sectionSubtitle}>Browse notes organized by category</p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${cat.name.toLowerCase()}`}
              className={styles.card}
            >
              <span className={styles.icon}>
                {categoryIcons[cat.name.toLowerCase()] || "\u{1F4C2}"}
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
