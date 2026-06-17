import showcase from './folkShowcase.json';
import { defaultAuthor } from './publishing/authors';
import { categoryPublishingImages, defaultPublishingValues } from './publishing/defaults';
import { getPublishingCategoryBySlug } from './publishing/categories';
import type {
  PublishedArticleBody,
  PublishedPost,
  PublishingCategoryDefinition,
  PublishingImageSet,
  PublishingSurface,
  PublishingVisualKind,
} from './publishing/types';

export type FolkVisualKind = PublishingVisualKind;
export type FolkSurface = PublishingSurface;
export type FolkArticleBody = PublishedArticleBody;
export type FolkPost = PublishedPost;

export interface FolkCategory extends PublishingCategoryDefinition {
  count: number;
}

interface FolkShowcaseData {
  posts: RawFolkShowcasePost[];
  categories: RawFolkShowcaseCategory[];
}

interface RawFolkShowcasePost {
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

interface RawFolkShowcaseCategory {
  slug: string;
  name: string;
  count: number;
  description: string;
  icon: FolkVisualKind;
}

const folkShowcase = showcase as FolkShowcaseData;

const designNotesGroup = new Set(['Design Notes', 'Static Web']);

function toPublishingCategorySlug(categoryName: string) {
  const normalized = categoryName.trim().toLowerCase();

  if (normalized === 'c++') {
    return 'c-plus-plus';
  }

  if (normalized === 'static web') {
    return 'design-notes';
  }

  return normalized.replace(/\s+/g, '-');
}

function buildPublishingImages(categorySlug: string): PublishingImageSet {
  const categoryDefaults = categoryPublishingImages[categorySlug] ?? {};

  return {
    thumbnail: categoryDefaults.thumbnail ?? defaultPublishingValues.images.thumbnail,
    hero: categoryDefaults.hero ?? defaultPublishingValues.images.hero,
    og: categoryDefaults.og ?? defaultPublishingValues.images.og,
    mobileHero: categoryDefaults.mobileHero ?? categoryDefaults.hero ?? defaultPublishingValues.images.mobileHero,
  };
}

function assertUniqueSlugs(posts: RawFolkShowcasePost[]) {
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

function assertPostCategories(posts: RawFolkShowcasePost[], categories: RawFolkShowcaseCategory[]) {
  const allowedNames = new Set(categories.map((category) => category.name));
  allowedNames.add('Static Web');
  const missing = posts.filter((post) => !allowedNames.has(post.category)).map((post) => post.category);

  if (missing.length > 0) {
    throw new Error(`Unknown Folk Showcase post categories: ${[...new Set(missing)].join(', ')}`);
  }
}

assertUniqueSlugs(folkShowcase.posts);
assertPostCategories(folkShowcase.posts, folkShowcase.categories);

export const folkPosts: FolkPost[] = folkShowcase.posts.map((post) => {
  const categorySlug = toPublishingCategorySlug(post.category);
  const categoryDefinition = getPublishingCategoryBySlug(categorySlug);

  if (!categoryDefinition) {
    throw new Error(`Unknown normalized publishing category slug: ${categorySlug}`);
  }

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    dateLabel: post.dateLabel,
    category: post.category,
    categorySlug,
    categoryLabel: post.category,
    excerpt: post.excerpt,
    readingTime: post.readingTime,
    visualKind: post.visualKind,
    surface: post.surface,
    featured: post.featured ?? false,
    published: true,
    author: defaultAuthor,
    tags: [],
    relatedPosts: [],
    seoTitle: `${post.title} | ${defaultPublishingValues.seoSuffix}`,
    seoDescription: post.excerpt,
    canonicalUrl: `/posts/${post.slug}`,
    summaryQuote: post.body.quote,
    body: post.body,
    images: buildPublishingImages(categorySlug),
    fallbackUsage: [],
  };
});

export const folkCategories: FolkCategory[] = folkShowcase.categories.map((category) => {
  const normalized = getPublishingCategoryBySlug(category.slug) ?? getPublishingCategoryBySlug(category.name);

  if (!normalized) {
    throw new Error(`Unknown publishing category mapping for showcase category: ${category.slug}`);
  }

  return {
    ...normalized,
    count: category.count,
  };
});

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
    return folkPosts.filter((post) => designNotesGroup.has(post.categoryLabel)).length;
  }

  return folkPosts.filter((post) => post.categorySlug === category.slug).length;
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
    return folkPosts.filter((post) => designNotesGroup.has(post.categoryLabel));
  }
  return folkPosts.filter((post) => post.categorySlug === category.slug);
}

export function getFolkPostBySlug(slug: string) {
  return folkPosts.find((post) => post.slug === slug);
}
