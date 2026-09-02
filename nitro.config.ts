import { fileURLToPath } from 'node:url';
import { defineNitroConfig } from 'nitropack/config';

const here = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

/**
 * Nitro turns the two bundles `vite build` produces into something deployable.
 *
 * The Solid plugin's start mode owns dev and the build, and stops there: it
 * emits client assets to `dist/client` and a server bundle to
 * `dist/server/server.js` whose default export is a Fetchable,
 * `{ fetch(request) }`. After that it is somebody else's problem to listen on a
 * port, serve the
 * assets, and package the result for a host. That is exactly Nitro's job, and
 * the Fetchable shape is one it already speaks, so the whole integration is the
 * catch-all route in `server/routes`.
 *
 * Swapping hosts is then a preset rather than a rewrite: `vercel` here,
 * `node-server` for local preview (`pnpm build:node`), and `netlify`,
 * `cloudflare-module`, `deno-deploy` and the rest by changing one word.
 */
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-09-01',

  /*
   * Vercel's Build Output API: `nitro build` writes `.vercel/output`, which the
   * platform picks up with no framework detection and no dashboard settings.
   * `NITRO_PRESET` overrides this from the environment, which is how the local
   * scripts get a plain Node server out of the same source. See `build:node`.
   */
  preset: 'vercel',

  /*
   * The client build is served straight off disk. Everything in `assets/` is
   * content-hashed by Vite, so it is immutable for a year; anything else here
   * keeps a short cache.
   */
  publicAssets: [
    {
      baseURL: '/assets',
      dir: here('./dist/client/assets'),
      maxAge: 60 * 60 * 24 * 365,
    },
    {
      baseURL: '/',
      dir: here('./dist/client'),
      maxAge: 60 * 60,
    },
  ],

  // The SSR bundle is a build artefact, so the route imports it by alias
  // rather than by reaching up out of `server/` with a relative path.
  alias: {
    '#solid-ssr': here('./dist/server/server.js'),
  },
});
