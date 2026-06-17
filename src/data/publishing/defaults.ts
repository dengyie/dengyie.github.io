import { defaultAuthor } from './authors';
import type { PublishingImageSet, PublishingSurface, PublishingVisualKind } from './types';

export const defaultPublishingSeoSuffix = 'Little Lighthouse';

export const defaultPublishingImages: PublishingImageSet = {
  thumbnail: '/ornaments/folk/diamond.svg',
  hero: '/ornaments/folk/forest.svg',
  og: '/ornaments/folk/rosette.svg',
  mobileHero: '/ornaments/folk/forest.svg',
};

export const categoryPublishingImages: Record<string, Partial<PublishingImageSet>> = {
  java: {
    thumbnail: '/ornaments/folk/sprig.svg',
    hero: '/ornaments/folk/forest.svg',
  },
  android: {
    thumbnail: '/ornaments/folk/horse.svg',
    hero: '/ornaments/folk/flower.svg',
  },
  'c-plus-plus': {
    thumbnail: '/ornaments/folk/diamond.svg',
    hero: '/ornaments/folk/diamond.svg',
  },
  'design-notes': {
    thumbnail: '/ornaments/folk/rosette.svg',
    hero: '/ornaments/folk/flower.svg',
  },
};

export const defaultPublishingVisual: {
  visualKind: PublishingVisualKind;
  surface: PublishingSurface;
} = {
  visualKind: 'rosette',
  surface: 'charcoal',
};

export const defaultPublishingValues = {
  author: defaultAuthor,
  seoSuffix: defaultPublishingSeoSuffix,
  images: defaultPublishingImages,
  visual: defaultPublishingVisual,
};
