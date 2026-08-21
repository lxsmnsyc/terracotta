import { fileURLToPath } from 'node:url';
import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';

// The harness imports the library from source so that `pnpm test:e2e` never
// depends on a stale `dist`.
export default defineConfig({
  root: fileURLToPath(new URL('./app', import.meta.url)),
  resolve: {
    alias: [
      // The package has no root entry any more; every component is its own
      // subpath, so map `terracotta/<name>` onto the matching source folder.
      {
        find: /^terracotta\/(.*)$/,
        replacement: fileURLToPath(new URL('../src/components/$1', import.meta.url)),
      },
    ],
  },
  plugins: [solid()],
  server: {
    port: 4321,
    strictPort: true,
  },
  preview: {
    port: 4321,
    strictPort: true,
  },
});
