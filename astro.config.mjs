import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dengyie.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  // 旧版链接兼容，见 docs/DEVELOPMENT.md 第 5 节
  redirects: {
    '/categories/java': '/tags/java/',
    '/categories/android': '/tags/android/',
    '/categories/cpp': '/tags/cpp/',
    '/categories/other': '/tags/',
    '/submit': '/',
  },
});