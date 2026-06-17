import { getAllPackagePostSlugs, getAllPackagePosts, getPackagePostBySlug } from './publishing/loadPackagePosts';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl?: string;
  readingTime?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPostSlugs(): string[] {
  return getAllPackagePostSlugs();
}

export function getAllPosts(): PostMeta[] {
  return getAllPackagePosts();
}

export function getPostBySlug(slug: string): Post | null {
  return getPackagePostBySlug(slug);
}

export function getPosts(): PostMeta[] {
  return getAllPosts();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
