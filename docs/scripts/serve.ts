/**
 * Serves the prerendered site in `dist/client` the way Vercel does, for
 * `pnpm preview` and `pnpm test:prod`. A path is a file, or a directory with
 * an `index.html`. Anything else gets `404.html` with a 404 status. The query
 * string is ignored, since the pages read it in the browser.
 *
 * Usage: `node scripts/serve.ts` after `pnpm build`. `PORT` sets the port,
 * 4173 by default.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CLIENT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'client');
const PORT = Number(process.env.PORT ?? 4173);

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

/** The file a path is served from, or nothing when it is not in the build. */
function resolve(pathname: string): string | undefined {
  const target = path.normalize(path.join(CLIENT, decodeURIComponent(pathname)));
  // Never step outside the build.
  if (!target.startsWith(CLIENT)) {
    return undefined;
  }
  for (const candidate of [target, path.join(target, 'index.html')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return undefined;
}

createServer((request, response) => {
  const { pathname } = new URL(request.url ?? '/', 'http://localhost');
  const file = resolve(pathname);
  const served = file ?? path.join(CLIENT, '404.html');
  response.writeHead(file ? 200 : 404, {
    'content-type': TYPES[path.extname(served)] ?? 'application/octet-stream',
  });
  createReadStream(served).pipe(response);
}).listen(PORT, () => {
  process.stdout.write(`Serving dist/client on http://localhost:${PORT}\n`);
});
