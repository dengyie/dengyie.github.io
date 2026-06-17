import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://dengyie.github.io';
const root = process.cwd();
const publicDir = path.join(root, 'public');
const showcasePath = path.join(root, 'src', 'data', 'folkShowcase.json');

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
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
    throw new Error(`Duplicate Folk Showcase post slugs: ${[...duplicates].join(', ')}`);
  }
}

function readShowcase() {
  const raw = fs.readFileSync(showcasePath, 'utf8');
  const data = JSON.parse(raw);
  const posts = [...data.posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  assertUniqueSlugs(posts);

  return {
    posts,
    categories: data.categories,
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
      loc: `${siteUrl}/categories/${encodeURIComponent(category.slug)}`,
      priority: '0.7',
    })),
    ...posts.map((post) => ({
      loc: `${siteUrl}/posts/${post.slug}`,
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
const { posts, categories } = readShowcase();
writeRss(posts);
writeSitemap(posts, categories);
writeRobots();

console.log(`Generated RSS, sitemap, and robots for ${posts.length} Folk Showcase posts.`);
