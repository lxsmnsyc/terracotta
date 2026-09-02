import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import { demosPlugin } from './vite/demos';
import { contentIndexPlugin, markdownPlugin } from './vite/markdown';

export default defineConfig({
  plugins: [
    markdownPlugin(),
    contentIndexPlugin(),
    demosPlugin(),
    solid({ start: true, ssr: true }),
  ],

  /*
   * Every demo is loaded lazily, so Vite does not see the Terracotta subpaths
   * they import until the first visit to a component page — at which point it
   * re-optimises mid-flight, 504s whatever was in the air, and the page that
   * was hydrating dies with it. Crawling the demos up front means the
   * dependency set is settled before the first request.
   */
  optimizeDeps: {
    entries: ['src/**/*.tsx'],
  },
});
