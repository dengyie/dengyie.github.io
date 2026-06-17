import type { PublishingAuthor } from './types';

export const defaultAuthor: PublishingAuthor = {
  slug: 'dengyie',
  name: 'Deng Yi',
  bio: 'Collecting practical notes on systems, UI, and programming language details.',
};

export const publishingAuthors: Record<string, PublishingAuthor> = {
  [defaultAuthor.slug]: defaultAuthor,
};
