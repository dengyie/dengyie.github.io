import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { resolvePackageBody, resolvePublishedPost } from './resolvePublishedPost';
import { assertUniquePublishedSlugs, validatePublishedPost } from './validatePublishedPost';
import { PublishingWarningCollector } from './warnings';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

interface PackageMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author?: string;
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  relatedPosts?: string[];
  seoTitle?: string;
  seoDescription?: string;
  summaryQuote?: string;
}

function getMarkdownSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));
}

function readPackageMeta(slug: string): PackageMeta {
  const metaPath = path.join(postsDirectory, `${slug}.meta.json`);

  if (!fs.existsSync(metaPath)) {
    throw new Error(`Missing companion metadata file for ${slug}: ${metaPath}`);
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as PackageMeta;

  if (meta.slug !== slug) {
    throw new Error(`Publishing metadata slug mismatch for ${slug}: meta.slug is ${meta.slug}`);
  }

  return meta;
}

function parseMarkdown(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing Markdown file for ${slug}: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    frontmatter: data,
    content,
  };
}

function normalizePublishingValue(key: string, value: unknown) {
  if (typeof value !== 'string') {
    return value;
  }

  if (key === 'category') {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'c++') {
      return 'c-plus-plus';
    }

    if (normalized === 'other' || normalized === 'static web') {
      return 'design-notes';
    }

    return normalized.replace(/\s+/g, '-');
  }

  return value;
}

function normalizeCategoryInput(value: string) {
  const normalized = normalizePublishingValue('category', value);

  if (typeof normalized !== 'string') {
    throw new Error(`Publishing category must resolve to a string, received: ${String(value)}`);
  }

  return normalized;
}

function assertFrontmatterDoesNotConflict(slug: string, frontmatter: Record<string, unknown>, meta: PackageMeta) {
  const keys = ['slug', 'title', 'date', 'category', 'excerpt', 'author', 'published', 'featured'];

  for (const key of keys) {
    const frontmatterValue = frontmatter[key];
    const metaValue = meta[key as keyof PackageMeta];

    if (
      frontmatterValue !== undefined &&
      metaValue !== undefined &&
      normalizePublishingValue(key, frontmatterValue) !== normalizePublishingValue(key, metaValue)
    ) {
      throw new Error(`Publishing field conflict for ${slug}: frontmatter.${key} != meta.${key}`);
    }
  }
}

function renderContentHtml(content: string) {
  const processor = remark().use(remarkRehype).use(rehypeHighlight).use(rehypeStringify);
  const result = processor.processSync(content);
  return result.toString();
}

export interface PackagePostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl?: string;
  readingTime?: string;
}

export interface PackagePost extends PackagePostMeta {
  contentHtml: string;
}

export function loadPackagePosts() {
  const collector = new PublishingWarningCollector();
  const posts = getMarkdownSlugs().map((slug) => {
    const meta = readPackageMeta(slug);
    const { frontmatter, content } = parseMarkdown(slug);
    assertFrontmatterDoesNotConflict(slug, frontmatter as Record<string, unknown>, meta);

    return resolvePublishedPost(
      {
        slug: meta.slug,
        title: meta.title,
        date: meta.date,
        category: normalizeCategoryInput(meta.category),
        excerpt: meta.excerpt,
        readingTime: typeof frontmatter.readingTime === 'string' ? frontmatter.readingTime : undefined,
        published: meta.published,
        featured: meta.featured,
        tags: meta.tags,
        relatedPosts: meta.relatedPosts,
        seoTitle: meta.seoTitle,
        seoDescription: meta.seoDescription,
        summaryQuote: meta.summaryQuote,
        body: resolvePackageBody(content, meta.summaryQuote),
      },
      collector
    );
  });

  assertUniquePublishedSlugs(posts);

  const knownSlugs = new Set(posts.map((post) => post.slug));
  const validationErrors = posts.flatMap((post) => {
    const postErrors = validatePublishedPost(post).errors;
    const relatedPostErrors = post.relatedPosts
      .filter((relatedSlug) => !knownSlugs.has(relatedSlug))
      .map((relatedSlug) => `${post.slug}: relatedPosts references missing slug ${relatedSlug}`);
    return [...postErrors, ...relatedPostErrors];
  });

  if (validationErrors.length > 0) {
    throw new Error(`Package publishing validation failed:\n${validationErrors.join('\n')}`);
  }

  return {
    posts,
    warnings: collector.toSummaryLines(),
  };
}

export function getAllPackagePostSlugs() {
  return loadPackagePosts()
    .posts.filter((post) => post.published)
    .map((post) => post.slug);
}

export function getAllPackagePosts(): PackagePostMeta[] {
  const { posts } = loadPackagePosts();
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
      excerpt: post.excerpt,
      imageUrl: post.images.thumbnail,
      readingTime: post.readingTime,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPackagePostBySlug(slug: string): PackagePost | null {
  const { posts } = loadPackagePosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post || !post.published) {
    return null;
  }

  const { content } = parseMarkdown(slug);
  const contentHtml = renderContentHtml(content);

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    imageUrl: post.images.thumbnail,
    readingTime: post.readingTime,
    contentHtml,
  };
}
