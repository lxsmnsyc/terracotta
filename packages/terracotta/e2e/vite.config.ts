import { fileURLToPath } from 'node:url';
import solid from 'vite-plugin-solid';
import { defineConfig } from 'vite';

// The harness imports the library from source so that `pnpm test:e2e` never
// depends on a stale `dist`.
export default defineConfig({
  root: fileURLToPath(new URL('./app', import.meta.url)),
  resolve: {
    alias: {
      terracotta: fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
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
