import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import { demosPlugin } from './vite/demos';
import { contentIndexPlugin, markdownPlugin, searchIndexPlugin } from './vite/markdown';

// Link previews need absolute URLs. Vercel sets the production domain at
// build time. `SITE_URL` overrides it, for a preview or another host.
const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://terracotta-docs.vercel.app');

export default defineConfig({
  define: {
    'import.meta.env.SITE_URL': JSON.stringify(SITE_URL),
  },
  plugins: [
    markdownPlugin(),
    contentIndexPlugin(),
    searchIndexPlugin(),
    demosPlugin(),
    solid({ start: true, ssr: true }),
  ],

  /*
   * Every demo is loaded lazily, so Vite does not see the Terracotta subpaths
   * they import until the first visit to a component page, at which point it
   * re-optimises mid-flight, 504s whatever was in the air, and the page that
   * was hydrating dies with it. Crawling the demos up front means the
   * dependency set is settled before the first request.
   */
  optimizeDeps: {
    entries: ['src/**/*.tsx'],
  },
});
