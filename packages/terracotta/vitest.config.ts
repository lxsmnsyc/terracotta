import solid from '@solidjs/vite-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// `focus-query` exists to predict what the browser will let the user tab to,
// so it runs in one. jsdom has no `checkVisibility` and no opinion of its own
// about focusability, which left the module asserting against a stub of the
// platform it is supposed to be modelling.
const BROWSER_TESTS = ['test/focus-query.test.tsx'];

const shared = {
  // The library is JSX now, so the Solid plugin compiles it here, and by
  // default adds its HMR wrappers to every component it compiles. Consumers
  // never get those on Terracotta: the plugin skips them for anything under
  // `node_modules`. Leaving them on would test wrapped components no one
  // ships, and they change ownership enough to break an offscreen transition.
  plugins: [solid({ refresh: { disabled: true } })],
  resolve: {
    conditions: ['development', 'browser'],
  },
};

export default defineConfig({
  ...shared,
  test: {
    projects: [
      {
        ...shared,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./test/setup.ts'],
          include: ['test/**/*.test.{ts,tsx}'],
          exclude: BROWSER_TESTS,
        },
      },
      {
        ...shared,
        test: {
          name: 'browser',
          globals: true,
          setupFiles: ['./test/setup.ts'],
          include: BROWSER_TESTS,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
