import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://dengyie.github.io';
const root = process.cwd();
const postsDir = path.join(root, 'content', 'posts');
const publicDir = path.join(root, 'public');

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function readPosts() {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '2024-01-01',
        category: data.category || 'Notes',
        excerpt: data.excerpt || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function writeRss(posts) {
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
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
}

function writeSitemap(posts) {
  const categories = [...new Set(posts.map((post) => post.category.toLowerCase()))];
  const urls = [
    { loc: siteUrl, priority: '1.0' },
    { loc: `${siteUrl}/posts`, priority: '0.8' },
    ...categories.map((category) => ({
      loc: `${siteUrl}/categories/${encodeURIComponent(category)}`,
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
const posts = readPosts();
writeRss(posts);
writeSitemap(posts);
writeRobots();

console.log(`Generated RSS, sitemap, and robots for ${posts.length} posts.`);
