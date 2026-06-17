import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://dengyie.github.io';
const root = process.cwd();
const publicDir = path.join(root, 'public');
const postsDir = path.join(root, 'content', 'posts');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const publishingCategories = [
  { slug: 'java', name: 'Java', aliases: [] },
  { slug: 'android', name: 'Android', aliases: [] },
  { slug: 'c++', name: 'C++', aliases: ['cpp', 'c-plus-plus'] },
  { slug: 'design-notes', name: 'Design Notes', aliases: ['design', 'static-web', 'static web', 'other'] },
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeCategorySlug(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase();

  const category = publishingCategories.find(
    (item) => item.slug === normalized || item.aliases.includes(normalized)
  );

  if (category) {
    return category.slug;
  }

  return normalized.replace(/\s+/g, '-');
}

function getCategoryBySlug(slug) {
  return publishingCategories.find((category) => category.slug === slug);
}

function getPublicCategoryRouteSlug(slug) {
  if (slug === 'c++') {
    return 'c++';
  }

  return slug;
}

function assertUniqueSlugs(posts) {
  const seen = new Set();
  const duplicates = new Set();

  for (const post of posts) {
    if (seen.has(post.slug)) {
      duplicates.add(post.slug);
    }
    seen.add(post.slug);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate publishing package post slugs: ${[...duplicates].join(', ')}`);
  }
}

function getMarkdownSlugs() {
  if (!fs.existsSync(postsDir)) {
    throw new Error(`Missing content posts directory: ${postsDir}`);
  }

  return fs
    .readdirSync(postsDir)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function validatePackagePost(post, knownSlugs) {
  const errors = [];

  if (!post.slug) errors.push('slug is required');
  if (post.slug && !slugPattern.test(post.slug)) {
    errors.push(`${post.slug}: slug must use lowercase letters, numbers, and hyphens only`);
  }
  if (!post.title) errors.push(`${post.slug}: title is required`);
  if (!post.date || Number.isNaN(new Date(post.date).getTime())) errors.push(`${post.slug}: valid date is required`);
  if (!post.categorySlug || !getCategoryBySlug(post.categorySlug)) {
    errors.push(`${post.slug}: known category is required`);
  }
  if (!post.excerpt) errors.push(`${post.slug}: excerpt is required`);
  if (!post.body.trim()) errors.push(`${post.slug}: Markdown body is empty`);

  for (const relatedSlug of post.relatedPosts) {
    if (relatedSlug === post.slug) {
      errors.push(`${post.slug}: relatedPosts cannot include self`);
    }

    if (!knownSlugs.has(relatedSlug)) {
      errors.push(`${post.slug}: relatedPosts references missing slug ${relatedSlug}`);
    }
  }

  return errors;
}

function readPublishingPackages() {
  const slugs = getMarkdownSlugs();
  const knownSlugs = new Set(slugs);
  const posts = slugs.map((slug) => {
    const markdownPath = path.join(postsDir, `${slug}.md`);
    const metaPath = path.join(postsDir, `${slug}.meta.json`);

    if (!fs.existsSync(metaPath)) {
      throw new Error(`Missing companion metadata file for ${slug}: ${metaPath}`);
    }

    const meta = readJson(metaPath);

    if (meta.slug !== slug) {
      throw new Error(`Publishing metadata slug mismatch for ${slug}: meta.slug is ${meta.slug}`);
    }

    const categorySlug = normalizeCategorySlug(meta.category);
    const category = getCategoryBySlug(categorySlug);

    const markdownFile = fs.readFileSync(markdownPath, 'utf8');
    const { content } = matter(markdownFile);

    return {
      slug: meta.slug,
      title: meta.title,
      date: meta.date,
      category: category?.name ?? meta.category,
      categorySlug,
      excerpt: meta.excerpt,
      published: meta.published ?? true,
      relatedPosts: Array.isArray(meta.relatedPosts) ? meta.relatedPosts : [],
      body: content,
    };
  });

  assertUniqueSlugs(posts);

  const validationErrors = posts.flatMap((post) => validatePackagePost(post, knownSlugs));

  if (validationErrors.length > 0) {
    throw new Error(`Static metadata publishing validation failed:\n${validationErrors.join('\n')}`);
  }

  const publishedPosts = posts.filter((post) => post.published).sort((a, b) => (a.date < b.date ? 1 : -1));
  const publishedCategorySlugs = new Set(publishedPosts.map((post) => post.categorySlug));
  const categories = publishingCategories.filter((category) => publishedCategorySlugs.has(category.slug));

  return {
    posts: publishedPosts,
    categories,
  };
}

function writeRss(posts) {
  const lastBuildDate = new Date(posts[0]?.date || Date.now()).toUTCString();
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Little Lighthouse</title>
    <link>${siteUrl}</link>
    <description>A personal technical blog for notes, thoughts, and code.</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
}

function writeSitemap(posts, categories) {
  const urls = [
    { loc: siteUrl, priority: '1.0' },
    { loc: `${siteUrl}/posts`, priority: '0.8' },
    ...categories.map((category) => ({
      loc: `${siteUrl}/categories/${getPublicCategoryRouteSlug(category.slug)}`,
      priority: '0.7',
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}/posts/${encodeURIComponent(post.slug)}`,
      lastmod: post.date,
      priority: '0.9',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
}

function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
}

fs.mkdirSync(publicDir, { recursive: true });
const { posts, categories } = readPublishingPackages();
writeRss(posts);
writeSitemap(posts, categories);
writeRobots();

console.log(`Generated RSS, sitemap, and robots for ${posts.length} published package posts.`);
