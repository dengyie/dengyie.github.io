import type { PublishingCategoryDefinition } from './types';

export const publishingCategories: PublishingCategoryDefinition[] = [
  {
    slug: 'java',
    name: 'Java',
    description: 'Objects, references, runtime memory, and practical engineering maps.',
    icon: 'sprig',
  },
  {
    slug: 'android',
    name: 'Android',
    description: 'Mobile interfaces, RecyclerView behavior, and field notes from UI systems.',
    icon: 'horse',
  },
  {
    slug: 'c-plus-plus',
    name: 'C++',
    description: 'Grammar, rules, and workbench notes from modern C++.',
    icon: 'diamond',
    aliases: ['cpp', 'c++'],
  },
  {
    slug: 'design-notes',
    name: 'Design Notes',
    description: 'Notes about the places where design craft meets practical engineering.',
    icon: 'rosette',
    aliases: ['design', 'static-web'],
    groupedArticleCategories: ['design-notes', 'static-web'],
  },
];

export function getPublishingCategoryBySlug(slug: string) {
  const normalized = slug.trim().toLowerCase();
  return publishingCategories.find((category) => {
    if (category.slug === normalized) {
      return true;
    }
    return category.aliases?.includes(normalized);
  });
}
