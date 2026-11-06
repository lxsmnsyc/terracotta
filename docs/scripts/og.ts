/**
 * Renders `scripts/og.html` to `public/og.png`, the 1200 by 630 image that
 * link previews show. Run it again after changing the page. It uses the
 * Chromium that Playwright installs for the test suite.
 *
 * Usage: `pnpm og`.
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(HERE, '..', 'public', 'og.png');

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(path.join(HERE, 'og.html')).href);
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.screenshot({ path: OUTPUT });
} finally {
  await browser.close();
}
process.stdout.write(`Wrote ${OUTPUT}\n`);
