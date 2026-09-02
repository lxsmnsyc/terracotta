import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm dev --port ${PORT} --strictPort`,
    /*
     * Not `/`. The plugin's start mode only answers a document request when the
     * client asks for HTML, and Playwright's readiness probe does not,
     * so it gets a 404. `@vite/client` is served to anyone and is a
     * reliable signal that the dev server is up.
     */
    url: `http://localhost:${PORT}/@vite/client`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
