import type { PublishedPost } from '@/data/publishing/types';
import { PublishingWarningCollector } from './warnings';
import { getRoutePosts } from './routeCollection';
import { assertUniquePublishedSlugs, validatePublishedPost } from './validatePublishedPost';

export interface PublishedPostCollection {
  posts: PublishedPost[];
  warnings: string[];
}

export function loadPublishedPostsFromShowcase(): PublishedPostCollection {
  const collector = new PublishingWarningCollector();
  const posts = getRoutePosts().filter((post) => post.published);
  assertUniquePublishedSlugs(posts);

  const validationErrors = posts.flatMap((post) => validatePublishedPost(post).errors);

  if (validationErrors.length > 0) {
    throw new Error(`Publishing validation failed:\n${validationErrors.join('\n')}`);
  }

  return {
    posts,
    warnings: collector.toSummaryLines(),
  };
}
