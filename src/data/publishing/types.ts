export type PublishingSurface = 'charcoal' | 'teal' | 'redGlow' | 'ochre';

export type PublishingVisualKind = 'flower' | 'rosette' | 'sprig' | 'horse' | 'diamond' | 'forest';

export interface PublishingAuthor {
  slug: string;
  name: string;
  bio: string;
}

export interface PublishingCategoryDefinition {
  slug: string;
  name: string;
  description: string;
  icon: PublishingVisualKind;
  aliases?: string[];
  groupedArticleCategories?: string[];
}

export interface PublishingArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime?: string;
  author?: string;
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  relatedPosts?: string[];
  seoTitle?: string;
  seoDescription?: string;
  summaryQuote?: string;
  imageUrl?: string;
}

export interface PublishingImageSet {
  thumbnail: string;
  hero: string;
  og: string;
  mobileHero?: string;
}

export interface PublishingFallbackUsage {
  field: string;
  fallback: string;
  surface: 'card' | 'detail' | 'og' | 'rss' | 'metadata';
}

export interface PublishingValidationIssue {
  level: 'error' | 'warning';
  slug: string;
  message: string;
}

export interface PublishedArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface PublishedArticleBody {
  intro: string[];
  sections: PublishedArticleSection[];
  quote?: string;
  toc: string[];
}

export interface PublishedPost {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  categorySlug: string;
  categoryLabel: string;
  excerpt: string;
  readingTime: string;
  author: PublishingAuthor;
  published: boolean;
  featured: boolean;
  visualKind: PublishingVisualKind;
  surface: PublishingSurface;
  body: PublishedArticleBody;
  tags: string[];
  relatedPosts: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  summaryQuote?: string;
  images: PublishingImageSet;
  fallbackUsage: PublishingFallbackUsage[];
  contentHtml?: string;
}
