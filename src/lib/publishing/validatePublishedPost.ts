import type { PublishedPost } from '@/data/publishing/types';

export interface PublishingValidationResult {
  errors: string[];
  warnings: string[];
}

export function validatePublishedPost(post: PublishedPost): PublishingValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!post.slug) errors.push('slug is required');
  if (!post.title) errors.push(`${post.slug}: title is required`);
  if (!post.date || Number.isNaN(new Date(post.date).getTime())) errors.push(`${post.slug}: valid date is required`);
  if (!post.categorySlug) errors.push(`${post.slug}: categorySlug is required`);
  if (!post.excerpt) errors.push(`${post.slug}: excerpt is required`);
  if (post.published && post.body.intro.length === 0 && post.body.sections.length === 0) {
    errors.push(`${post.slug}: published post body is empty`);
  }
  if (!post.images.thumbnail) warnings.push(`${post.slug}: thumbnail is missing`);
  if (!post.images.hero) warnings.push(`${post.slug}: hero image is missing`);
  if (!post.images.og) warnings.push(`${post.slug}: OG image is missing`);
  if (post.relatedPosts.some((slug) => slug === post.slug)) {
    errors.push(`${post.slug}: relatedPosts cannot include self`);
  }

  return { errors, warnings };
}

export function assertUniquePublishedSlugs(posts: PublishedPost[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const post of posts) {
    if (seen.has(post.slug)) {
      duplicates.add(post.slug);
    }
    seen.add(post.slug);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate published post slugs: ${[...duplicates].join(', ')}`);
  }
}
