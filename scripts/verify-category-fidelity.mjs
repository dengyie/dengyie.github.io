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
const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);

assert(mainMatch, 'Expected exported category page to include a <main> region.');

const visibleHtml = mainMatch[0]
  .replace(/<script\b[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[\s\S]*?<\/style>/gi, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const expectedSnippets = [
  'Craft & Code',
  'Notes about the places where design craft meets practical engineering.',
  'Jun 2026',
  'Designing Static Sites That Feel Alive',
  'Markdown as a Thinking Tool',
  'Interfaces With Memory',
  'A Small System for Better Notes',
  'Why Constraints Make Better Pages',
  '8',
  'Posts',
];

for (const snippet of expectedSnippets) {
  assert(visibleHtml.includes(snippet), `Expected /categories/design-notes export to include: ${snippet}`);
}

const forbiddenSnippets = [
  'Common Markdown Syntax Quick Reference',
  'C++ Grammar Basics',
];

for (const snippet of forbiddenSnippets) {
  assert(!visibleHtml.includes(snippet), `Did not expect category export to include non-mockup visible copy: ${snippet}`);
}

const orderedTitles = [
  'Designing Static Sites That Feel Alive',
  'Markdown as a Thinking Tool',
  'Interfaces With Memory',
  'A Small System for Better Notes',
  'Why Constraints Make Better Pages',
];

const orderedPositions = orderedTitles.map((snippet) => visibleHtml.indexOf(snippet));

for (const [index, position] of orderedPositions.entries()) {
  assert(position >= 0, `Missing category title: ${orderedTitles[index]}`);
}

for (let index = 1; index < orderedPositions.length; index += 1) {
  assert(
    orderedPositions[index - 1] < orderedPositions[index],
    'Expected category titles to appear in the mockup-facing order on /categories/design-notes'
  );
}

console.log('Category fidelity verification passed.');
