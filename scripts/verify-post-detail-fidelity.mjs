import fs from 'node:fs';
import path from 'node:path';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const detailHtmlPath = path.join(process.cwd(), 'out', 'posts', 'java-map-comparison.html');

assert(fs.existsSync(detailHtmlPath), `Missing exported detail page: ${detailHtmlPath}`);

const html = fs.readFileSync(detailHtmlPath, 'utf8');
const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i);

assert(mainMatch, 'Expected exported detail page to include a <main> region.');

const visibleHtml = mainMatch[0]
  .replace(/<script\b[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[\s\S]*?<\/style>/gi, '');

const expectedSnippets = [
  'Memory Maps for Modern Java',
  'Jun 13, 2026',
  '8 min read',
  'A compact tour through objects, references, and the small traps hiding in memory diagrams.',
  'Objects, references, and the quiet map',
  'Reachability and GC roots',
  'A good memory model is less a diagram and more a lantern for debugging.',
  'Stack and Heap: A Field Guide',
  'Markdown as a Thinking Tool',
  'C++ Grammar Notes from the Workbench',
];

for (const snippet of expectedSnippets) {
  assert(visibleHtml.includes(snippet), `Expected /posts/java-map-comparison export to include: ${snippet}`);
}

const forbiddenSnippets = [
  'HashMap, Hashtable, and ConcurrentHashMap',
  'Java Stack and Heap Memory Explained',
];

for (const snippet of forbiddenSnippets) {
  assert(!visibleHtml.includes(snippet), `Did not expect detail export to include canonical display copy: ${snippet}`);
}

const relatedOrder = [
  'Stack and Heap: A Field Guide',
  'Markdown as a Thinking Tool',
  'C++ Grammar Notes from the Workbench',
];

const relatedPositions = relatedOrder.map((snippet) => visibleHtml.indexOf(snippet));

for (const [index, position] of relatedPositions.entries()) {
  assert(position >= 0, `Missing related detail title: ${relatedOrder[index]}`);
}

assert(
  relatedPositions[0] < relatedPositions[1] && relatedPositions[1] < relatedPositions[2],
  'Expected related detail titles to appear in the mockup-facing order on /posts/java-map-comparison'
);

console.log('Post detail fidelity verification passed.');
