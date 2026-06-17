import { folkCategories, folkPosts } from '@/data/folkShowcase';
import type { PublishedPost, PublishingCategoryDefinition, RouteArchiveCopy } from '@/data/publishing/types';
import { publishingCategories } from '@/data/publishing/categories';
import { loadPackagePosts } from './loadPackagePosts';
import { assertUniquePublishedSlugs, validatePublishedPost } from './validatePublishedPost';

export interface RoutePost extends PublishedPost, RouteArchiveCopy {}

export interface RouteCategory extends PublishingCategoryDefinition {
  count: number;
  routeSlug: string;
}

function getRouteSlugForCategory(slug: string) {
  if (slug === 'c-plus-plus') {
    return 'c++';
  }

  return slug;
}

function sortPostsByDateDescending<T extends PublishedPost>(posts: T[]) {
  return [...posts].sort((a, b) => {
    if (a.date === b.date) {
      return a.slug.localeCompare(b.slug);
    }

    return a.date < b.date ? 1 : -1;
  });
}

function buildMergedRoutePosts(): RoutePost[] {
  const { posts: packagePosts } = loadPackagePosts();
  const publishedPackagePosts = packagePosts.filter((post) => post.published);
  const showcaseBySlug = new Map(folkPosts.map((post) => [post.slug, post]));
  const packageSlugs = new Set(publishedPackagePosts.map((post) => post.slug));
  const routeBackedPackagePosts: RoutePost[] = publishedPackagePosts.map((post) => {
    const showcaseMatch = showcaseBySlug.get(post.slug);

    if (!showcaseMatch) {
      return post;
    }

    return {
      ...post,
      featured: post.featured || showcaseMatch.featured,
      visualKind: showcaseMatch.visualKind,
      surface: showcaseMatch.surface,
      archiveTitle: showcaseMatch.title,
      archiveExcerpt: showcaseMatch.excerpt,
      archiveDateLabel: showcaseMatch.dateLabel,
      archiveReadingTime: showcaseMatch.readingTime,
    };
  });
  const showcaseOnlyPosts = folkPosts.filter((post) => post.published && !packageSlugs.has(post.slug));
  const mergedShowcasePosts: RoutePost[] = showcaseOnlyPosts.map((post) => ({
    ...post,
    archiveTitle: post.title,
    archiveExcerpt: post.excerpt,
    archiveDateLabel: post.dateLabel,
    archiveReadingTime: post.readingTime,
  }));
  const mergedPosts = sortPostsByDateDescending([...routeBackedPackagePosts, ...mergedShowcasePosts]);

  assertUniquePublishedSlugs(mergedPosts);

  const validationErrors = mergedPosts.flatMap((post) => validatePublishedPost(post).errors);

  if (validationErrors.length > 0) {
    throw new Error(`Route publishing validation failed:\n${validationErrors.join('\n')}`);
  }

  return mergedPosts;
}

function buildArchiveRoutePosts(mergedPosts: RoutePost[]): RoutePost[] {
  const mergedBySlug = new Map(mergedPosts.map((post) => [post.slug, post]));
  const archiveSlugs = new Set<string>();

  const showcaseOrderedPosts = folkPosts
    .filter((post) => post.published)
    .map((post) => {
      const routePost = mergedBySlug.get(post.slug);

      if (!routePost) {
        throw new Error(`Archive route missing published post for slug: ${post.slug}`);
      }

      archiveSlugs.add(routePost.slug);
      return routePost;
    });

  const packageOnlyPosts = mergedPosts.filter((post) => !archiveSlugs.has(post.slug));

  return [...showcaseOrderedPosts, ...packageOnlyPosts];
}

function buildRouteCategories(posts: RoutePost[]): RouteCategory[] {
  const counts = posts.reduce<Map<string, number>>((map, post) => {
    map.set(post.categorySlug, (map.get(post.categorySlug) ?? 0) + 1);
    return map;
  }, new Map());

  const showcaseCategoryOrder = new Map(folkCategories.map((category, index) => [category.slug, index]));

  return publishingCategories
    .filter((category) => counts.has(category.slug))
    .map((category) => ({
      ...category,
      count: counts.get(category.slug) ?? 0,
      routeSlug: getRouteSlugForCategory(category.slug),
    }))
    .sort((a, b) => {
      const aOrder = showcaseCategoryOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const bOrder = showcaseCategoryOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      return a.name.localeCompare(b.name);
    });
}

function buildRouteCollection() {
  const posts = buildMergedRoutePosts();
  const categories = buildRouteCategories(posts);
  const archivePosts = buildArchiveRoutePosts(posts);

  return {
    posts,
    categories,
    archivePosts,
  };
}

let cachedRouteCollection: ReturnType<typeof buildRouteCollection> | null = null;

function getRouteCollection() {
  if (!cachedRouteCollection) {
    cachedRouteCollection = buildRouteCollection();
  }

  return cachedRouteCollection;
}

export function getRoutePosts(): RoutePost[] {
  return getRouteCollection().posts;
}

export function getRouteArchivePosts(): RoutePost[] {
  return getRouteCollection().archivePosts;
}

export function getRouteFeaturedPosts(): RoutePost[] {
  return getRoutePosts().filter((post) => post.featured);
}

export function getRouteRecentPosts(): RoutePost[] {
  return getRoutePosts().filter((post) => !post.featured).slice(0, 5);
}

export function getRoutePostBySlug(slug: string): RoutePost | undefined {
  return getRoutePosts().find((post) => post.slug === slug);
}

export function getRouteCategories() {
  return getRouteCollection().categories;
}

export function getRouteCategory(slug: string) {
  const normalized = decodeURIComponent(slug).toLowerCase();

  return getRouteCategories().find(
    (category) =>
      category.slug === normalized ||
      category.routeSlug === normalized ||
      category.name.toLowerCase() === normalized
  );
}

export function getRouteCategoryCount(slug: string) {
  return getRoutePostsByCategory(slug).length;
}

export function getRoutePostsByCategory(slug: string): RoutePost[] {
  const category = getRouteCategory(slug);

  if (!category) {
    return [];
  }

  return getRoutePosts().filter((post) => post.categorySlug === category.slug);
}

export function getRouteTotalCount() {
  return getRoutePosts().length;
}

export function getRouteRelatedPosts(slug: string, relatedSlugs: string[], limit = 3): RoutePost[] {
  const currentPost = getRoutePostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  const posts = getRoutePosts();
  const preferred = relatedSlugs
    .map((relatedSlug) => posts.find((post) => post.slug === relatedSlug && post.slug !== slug))
    .filter((post): post is RoutePost => Boolean(post));

  if (preferred.length >= limit) {
    return preferred.slice(0, limit);
  }

  const used = new Set(preferred.map((post) => post.slug));
  const fallback = posts.filter(
    (post) =>
      post.slug !== slug &&
      post.categorySlug === currentPost.categorySlug &&
      !used.has(post.slug)
  );

  return [...preferred, ...fallback].slice(0, limit);
}
