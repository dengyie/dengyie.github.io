import { defaultAuthor } from '@/data/publishing/authors';
import { categoryPublishingImages, defaultPublishingValues } from '@/data/publishing/defaults';
import { getPublishingCategoryBySlug } from '@/data/publishing/categories';
import type {
  PublishedArticleBody,
  PublishedPost,
  PublishingFallbackUsage,
  PublishingImageSet,
  PublishingSurface,
  PublishingVisualKind,
} from '@/data/publishing/types';
import { PublishingWarningCollector } from './warnings';

export interface PublishingPostInput {
  slug: string;
  title: string;
  date: string;
  dateLabel?: string;
  category: string;
  excerpt: string;
  readingTime?: string;
  visualKind?: PublishingVisualKind;
  surface?: PublishingSurface;
  featured?: boolean;
  published?: boolean;
  body: PublishedArticleBody;
  tags?: string[];
  relatedPosts?: string[];
  seoTitle?: string;
  seoDescription?: string;
  summaryQuote?: string;
  images?: Partial<PublishingImageSet>;
}

function formatDateLabel(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

function estimateReadingTime(body: PublishedArticleBody) {
  const text = [
    ...body.intro,
    ...body.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    body.quote ?? '',
  ].join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function recordFallback(
  collector: PublishingWarningCollector | undefined,
  slug: string,
  field: string,
  fallback: string,
  surface: PublishingFallbackUsage['surface']
) {
  const usage: PublishingFallbackUsage = { field, fallback, surface };
  collector?.add(slug, `${field} is missing`, usage);
  return usage;
}

function resolveImages(input: PublishingPostInput, categorySlug: string, collector?: PublishingWarningCollector) {
  const categoryDefaults = categoryPublishingImages[categorySlug] ?? {};
  const fallbackUsage: PublishingFallbackUsage[] = [];

  const resolveImage = (field: keyof PublishingImageSet, surface: PublishingFallbackUsage['surface']) => {
    const articleImage = input.images?.[field];

    if (articleImage) {
      return articleImage;
    }

    const categoryImage = categoryDefaults[field];

    if (categoryImage) {
      fallbackUsage.push(recordFallback(collector, input.slug, field, categoryImage, surface));
      return categoryImage;
    }

    const siteImage = defaultPublishingValues.images[field] ?? defaultPublishingValues.images.hero;
    fallbackUsage.push(recordFallback(collector, input.slug, field, siteImage, surface));
    return siteImage;
  };

  const hero = resolveImage('hero', 'detail');

  return {
    images: {
      thumbnail: resolveImage('thumbnail', 'card'),
      hero,
      og: resolveImage('og', 'og'),
      mobileHero: input.images?.mobileHero ?? hero,
    },
    fallbackUsage,
  };
}

export function resolvePublishedPost(input: PublishingPostInput, collector?: PublishingWarningCollector): PublishedPost {
  const category = getPublishingCategoryBySlug(input.category);

  if (!category) {
    throw new Error(`Unknown publishing category slug for ${input.slug}: ${input.category}`);
  }

  const { images, fallbackUsage } = resolveImages(input, category.slug, collector);
  const readingTime = input.readingTime ?? estimateReadingTime(input.body);

  if (!input.readingTime) {
    fallbackUsage.push(recordFallback(collector, input.slug, 'readingTime', readingTime, 'metadata'));
  }

  return {
    slug: input.slug,
    title: input.title,
    date: input.date,
    dateLabel: input.dateLabel ?? formatDateLabel(input.date),
    category: category.name,
    categorySlug: category.slug,
    categoryLabel: category.name,
    excerpt: input.excerpt,
    readingTime,
    author: defaultAuthor,
    published: input.published ?? true,
    featured: input.featured ?? false,
    visualKind: input.visualKind ?? category.icon ?? defaultPublishingValues.visual.visualKind,
    surface: input.surface ?? defaultPublishingValues.visual.surface,
    body: input.body,
    tags: input.tags ?? [],
    relatedPosts: input.relatedPosts ?? [],
    seoTitle: input.seoTitle ?? `${input.title} | ${defaultPublishingValues.seoSuffix}`,
    seoDescription: input.seoDescription ?? input.excerpt,
    canonicalUrl: `/posts/${input.slug}`,
    summaryQuote: input.summaryQuote ?? input.body.quote,
    images,
    fallbackUsage,
  };
}

export function resolvePackageBody(content: string, summaryQuote?: string): PublishedArticleBody {
  const paragraphs = content
    .split(/\r?\n\r?\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const intro = paragraphs.slice(0, 2);
  const remaining = paragraphs.slice(2);

  return {
    intro,
    sections: remaining.length
      ? [
          {
            heading: 'Notes',
            paragraphs: remaining,
          },
        ]
      : [],
    quote: summaryQuote,
    toc: remaining.length ? ['Notes'] : [],
  };
}
