import fs from 'node:fs';
import path from 'node:path';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const categoryHtmlPath = path.join(process.cwd(), 'out', 'categories', 'design-notes.html');

assert(fs.existsSync(categoryHtmlPath), `Missing exported category page: ${categoryHtmlPath}`);

const html = fs.readFileSync(categoryHtmlPath, 'utf8');
const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');

const expectedSnippets = [
  'Craft &amp; Code',
  'All Categories',
  'Notes about the places where design craft meets practical engineering.',
  '8',
  'Jun 2026',
  'Load More Posts',
  'Designing Static Sites That Feel Alive',
  'Markdown as a Thinking Tool',
  'Interfaces With Memory',
  'A Small System for Better Notes',
  'Why Constraints Make Better Pages',
];

for (const snippet of expectedSnippets) {
  assert(visibleHtml.includes(snippet), `Expected /categories/design-notes export to include: ${snippet}`);
}

const cardLinks = [...visibleHtml.matchAll(/href="\/posts\/[^"]+"/g)];
assert(cardLinks.length >= 5, 'Expected at least five post links on /categories/design-notes');

const highlightClassCount = (visibleHtml.match(/highlightCard/g) ?? []).length;
assert(highlightClassCount >= 1, 'Expected at least one emphasized card on the category page');

console.log('Category page fidelity verification passed.');
