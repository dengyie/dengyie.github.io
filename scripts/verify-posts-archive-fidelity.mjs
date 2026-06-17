import fs from 'node:fs';
import path from 'node:path';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const postsHtmlPath = path.join(process.cwd(), 'out', 'posts.html');

assert(fs.existsSync(postsHtmlPath), `Missing exported archive page: ${postsHtmlPath}`);

const html = fs.readFileSync(postsHtmlPath, 'utf8');
const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');

const expectedSnippets = [
  'Memory Maps for Modern Java',
  'Jun 13, 2026',
  '8 min read',
  'RecyclerView: What Actually Gets Reused',
  'May 25, 2026',
  '6 min read',
  'C++ Grammar Notes from the Workbench',
  'Markdown as a Thinking Tool',
  'Stack and Heap: A Field Guide',
  'Designing Static Sites That Feel Alive',
];

for (const snippet of expectedSnippets) {
  assert(visibleHtml.includes(snippet), `Expected /posts export to include: ${snippet}`);
}

const forbiddenSnippets = [
  'HashMap, Hashtable, and ConcurrentHashMap',
  'RecyclerView Caching Strategy Explained',
];

for (const snippet of forbiddenSnippets) {
  assert(!visibleHtml.includes(snippet), `Did not expect /posts export to include canonical archive copy: ${snippet}`);
}

const featuredOrder = [
  'Memory Maps for Modern Java',
  'RecyclerView: What Actually Gets Reused',
];

const featuredPositions = featuredOrder.map((snippet) => visibleHtml.indexOf(snippet));

for (const [index, position] of featuredPositions.entries()) {
  assert(position >= 0, `Missing featured archive title: ${featuredOrder[index]}`);
}

assert(
  featuredPositions[0] < featuredPositions[1],
  'Expected Memory Maps for Modern Java to appear before RecyclerView: What Actually Gets Reused on /posts'
);

console.log('Posts archive fidelity verification passed.');
