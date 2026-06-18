import fs from 'node:fs';
import path from 'node:path';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripNonVisibleHtml(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[\s\S]*?<\/style>/gi, '')
  );
}

function readUtf8(filePath) {
  assert(fs.existsSync(filePath), `Missing file: ${filePath}`);
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readUtf8(filePath));
}

function normalizeCategorySlug(value) {
  const normalized = String(value ?? '').trim().toLowerCase();

  if (normalized === 'c++' || normalized === 'cpp') {
    return 'c-plus-plus';
  }

  if (normalized === 'static web' || normalized === 'static-web' || normalized === 'design') {
    return 'design-notes';
  }

  return normalized.replace(/\s+/g, '-');
}

function getCategoryRouteSlug(categorySlug) {
  if (categorySlug === 'c-plus-plus') {
    return 'c++';
  }

  return categorySlug;
}

function getExpectedDetailPath(slug) {
  return path.join(process.cwd(), 'out', 'posts', `${slug}.html`);
}

const slug = process.argv[2];

try {
  assert(slug, 'Usage: node scripts/verify-blog-package.mjs <slug>');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), `Invalid slug format: ${slug}`);

  const root = process.cwd();
  const metaPath = path.join(root, 'content', 'posts', `${slug}.meta.json`);
  const markdownPath = path.join(root, 'content', 'posts', `${slug}.md`);
  const detailPath = getExpectedDetailPath(slug);
  const postsPath = path.join(root, 'out', 'posts.html');
  const rssPath = path.join(root, 'public', 'rss.xml');
  const sitemapPath = path.join(root, 'public', 'sitemap.xml');

  const meta = readJson(metaPath);
  const markdown = readUtf8(markdownPath);

  assert(meta.slug === slug, `Expected meta.slug to equal ${slug}, received ${meta.slug}`);
  assert(meta.title, `${slug}: meta.title is required`);
  assert(meta.category, `${slug}: meta.category is required`);
  assert(meta.excerpt, `${slug}: meta.excerpt is required`);
  assert(markdown.trim().length > 0, `${slug}: Markdown body is empty`);

  if (meta.published === false) {
    console.log(`Blog package verification skipped public output checks for draft: ${slug}`);
    process.exit(0);
  }

  const categorySlug = normalizeCategorySlug(meta.category);
  const categoryRouteSlug = getCategoryRouteSlug(categorySlug);
  const categoryPath = path.join(root, 'out', 'categories', `${categoryRouteSlug}.html`);

  const detailHtml = stripNonVisibleHtml(readUtf8(detailPath));
  const postsHtml = stripNonVisibleHtml(readUtf8(postsPath));
  const categoryHtml = stripNonVisibleHtml(readUtf8(categoryPath));
  const rssXml = decodeHtml(readUtf8(rssPath));
  const sitemapXml = decodeHtml(readUtf8(sitemapPath));

  assert(detailHtml.includes(meta.title) || detailHtml.includes(slug), `Expected detail export to include title or slug: ${slug}`);
  assert(detailHtml.includes(meta.excerpt) || detailHtml.includes('Little Lighthouse'), `Expected detail export to include excerpt or site frame: ${slug}`);
  assert(postsHtml.includes(`/posts/${slug}`) || postsHtml.includes(meta.title), `Expected posts archive to include ${slug}`);
  assert(categoryHtml.includes(`/posts/${slug}`) || categoryHtml.includes(meta.title), `Expected category archive to include ${slug}`);
  assert(rssXml.includes(`/posts/${slug}`) || rssXml.includes(meta.title), `Expected RSS to include ${slug}`);
  assert(sitemapXml.includes(`/posts/${slug}`), `Expected sitemap to include ${slug}`);

  console.log(`Blog package verification passed for ${slug}.`);
} catch (error) {
  console.error(`Blog package verification failed: ${error.message}`);
  process.exit(1);
}
