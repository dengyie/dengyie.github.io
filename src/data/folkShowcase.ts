import showcase from './folkShowcase.json';

export type FolkVisualKind = 'flower' | 'rosette' | 'sprig' | 'horse' | 'diamond' | 'forest';
export type FolkSurface = 'charcoal' | 'teal' | 'redGlow' | 'ochre';

export interface FolkArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface FolkArticleBody {
  intro: string[];
  sections: FolkArticleSection[];
  quote: string;
  toc: string[];
}

export interface FolkPost {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  excerpt: string;
  readingTime: string;
  visualKind: FolkVisualKind;
  surface: FolkSurface;
  featured?: boolean;
  body: FolkArticleBody;
}

export interface FolkCategory {
  slug: string;
  name: string;
  count: number;
  description: string;
  icon: FolkVisualKind;
}

interface FolkShowcaseData {
  posts: FolkPost[];
  categories: FolkCategory[];
}

const folkShowcase = showcase as FolkShowcaseData;

const designNotesGroup = new Set(['Design Notes', 'Static Web']);

function assertUniqueSlugs(posts: FolkPost[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const post of posts) {
    if (seen.has(post.slug)) {
      duplicates.add(post.slug);
    }
    seen.add(post.slug);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate Folk Showcase post slugs: ${[...duplicates].join(', ')}`);
  }
}

function assertPostCategories(posts: FolkPost[], categories: FolkCategory[]) {
  const allowedNames = new Set(categories.map((category) => category.name));
  allowedNames.add('Static Web');
  const missing = posts.filter((post) => !allowedNames.has(post.category)).map((post) => post.category);

  if (missing.length > 0) {
    throw new Error(`Unknown Folk Showcase post categories: ${[...new Set(missing)].join(', ')}`);
  }
}

assertUniqueSlugs(folkShowcase.posts);
assertPostCategories(folkShowcase.posts, folkShowcase.categories);

export const folkPosts = folkShowcase.posts;
export const folkCategories = folkShowcase.categories;

export function getFolkFeaturedPosts() {
  return folkPosts.filter((post) => post.featured);
}

export function getFolkRecentPosts() {
  return folkPosts.slice(2, 7);
}

export function getFolkCategory(slug: string) {
  const normalized = decodeURIComponent(slug).toLowerCase();
  return folkCategories.find((category) => category.slug === normalized || category.name.toLowerCase() === normalized);
}

export function getFolkCategoryCount(slug: string) {
  const category = getFolkCategory(slug);

  if (!category) {
    return 0;
  }

  if (category.slug === 'design-notes') {
    return folkPosts.filter((post) => designNotesGroup.has(post.category)).length;
  }

  return folkPosts.filter((post) => post.category.toLowerCase() === category.name.toLowerCase()).length;
}

export function getFolkTotalCount() {
  return folkPosts.length;
}

export function getFolkPostsByCategory(slug: string) {
  const category = getFolkCategory(slug);

  if (!category) {
    return [];
  }

  if (category.slug === 'design-notes') {
    return folkPosts.filter((post) => designNotesGroup.has(post.category));
  }
  return folkPosts.filter((post) => post.category.toLowerCase() === category.name.toLowerCase());
}

export function getFolkPostBySlug(slug: string) {
  return folkPosts.find((post) => post.slug === slug);
}
