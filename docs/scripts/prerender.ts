/**
 * Prerenders every page of the built site into static HTML. `vite build`
 * writes the server handler to `dist/server`. This calls it for each route and
 * writes the answer into `dist/client`, which is what Vercel serves. The
 * client then hydrates the HTML.
 *
 * The routes are the same ones the site has: the landing page, every page in
 * `content/nav.json`, and a frame for every demo in `src/demos`. A path no
 * route matches renders the "not found" page, which is written to `404.html`.
 *
 * Usage: `node scripts/prerender.ts` after `vite build`. `pnpm build` runs both.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIENT = path.join(ROOT, 'dist', 'client');
const SERVER = path.join(ROOT, 'dist', 'server', 'server.js');
const DEMOS = path.join(ROOT, 'src', 'demos');

interface Handler {
  handleRequest(request: Request, options?: { renderMode?: 'stream' | 'async' }): Promise<Response>;
}

function isHandler(value: unknown): value is Handler {
  return (
    typeof value === 'object' &&
    value !== null &&
    'handleRequest' in value &&
    typeof value.handleRequest === 'function'
  );
}

/** Every page the sidebar lists, as `/<slug>`. */
function pagePaths(): string[] {
  const nav: unknown = JSON.parse(readFileSync(path.join(ROOT, 'content', 'nav.json'), 'utf8'));
  if (!Array.isArray(nav)) {
    throw new TypeError('content/nav.json is not a list of sections');
  }
  const paths: string[] = [];
  for (const section of nav as { pages: string[] }[]) {
    for (const slug of section.pages) {
      paths.push(`/${slug}`);
    }
  }
  return paths;
}

/** Every demo frame, as `/demo/<id>`, where the id is the file's path under `src/demos`. */
function demoPaths(directory = DEMOS): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      paths.push(...demoPaths(full));
    } else if (entry.name.endsWith('.tsx')) {
      const id = path.relative(DEMOS, full).replace(/\.tsx$/, '').split(path.sep).join('/');
      paths.push(`/demo/${id}`);
    }
  }
  return paths;
}

async function render(handler: Handler, route: string): Promise<Response> {
  // `async` waits for every boundary, so the file holds the whole page and no
  // streaming scripts.
  return handler.handleRequest(new Request(new URL(route, 'http://localhost')), {
    renderMode: 'async',
  });
}

function write(file: string, html: string): void {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const handler: unknown = await import(pathToFileURL(SERVER).href);
if (!isHandler(handler)) {
  throw new TypeError(`${SERVER} has no handleRequest`);
}

const routes = ['/', ...pagePaths(), ...demoPaths()];
for (const route of routes) {
  const response = await render(handler, route);
  if (!response.ok) {
    throw new Error(`Prerendering ${route} failed: the handler answered ${response.status}`);
  }
  write(path.join(CLIENT, route, 'index.html'), await response.text());
}

const missing = await render(handler, '/404');
write(path.join(CLIENT, '404.html'), await missing.text());

process.stdout.write(`Prerendered ${routes.length} pages and 404.html into dist/client\n`);
