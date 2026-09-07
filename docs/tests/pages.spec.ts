import { expect, test } from '@playwright/test';
import { docPaths, openPopup, useAppearance, watchForErrors } from './support/docs';

/**
 * The whole site, in the default appearance. A page that fails to hydrate
 * still *renders* and simply stops responding, so the console is the only
 * place the failure shows up, and an empty console is the assertion that
 * matters most here.
 */
test('every documentation page renders and hydrates without console errors', async ({ page }) => {
  test.slow();

  let current = '/';
  const errors = watchForErrors(page, () => current);
  const paths = await docPaths(page);
  expect(paths.length).toBeGreaterThan(20);

  for (const path of paths) {
    current = path;
    await page.goto(path);
    await expect(page.locator('.page-title')).toBeVisible();
    await expect(page.locator('.page-lede')).not.toBeEmpty();
  }

  expect(errors).toEqual([]);
});

test('component pages lead with a hero demo', async ({ page }) => {
  test.slow();

  const paths = (await docPaths(page)).filter((path) => path.startsWith('/components/'));
  expect(paths.length).toBeGreaterThan(20);

  for (const path of paths) {
    await page.goto(path);
    const hero = page.locator('.page-header + .demo');
    await expect(hero, `${path} has no hero demo`).toBeVisible();
    await expect(hero.locator('iframe.demo-frame')).toHaveAttribute('src', /^\/demo\//);
  }
});

test('demo frames carry the appearance they are asked for', async ({ page }) => {
  await page.goto('/demo/listbox/basic?theme=brutalist&scheme=dark');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'brutalist');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('.listbox-button')).toBeVisible();
});

/**
 * The context-menu overlay is mounted whether or not the menu is open and
 * covers the whole viewport, which inside a demo frame is the demo itself. Left
 * live it swallowed the right-click that opens the menu, and under `glass`,
 * which gives overlays a `backdrop-filter`, it blurred the demo permanently.
 * Both symptoms come back the moment the closed overlay is in the page again,
 * so this runs under `glass`.
 */
test('the context menu opens inside its frame', async ({ page }) => {
  await useAppearance(page, 'glass', 'light');
  await page.goto('/components/context-menu');

  const frame = page.frameLocator('.demo-frame >> nth=0');
  await expect(frame.locator('.contextmenu-boundary')).toBeVisible();
  await expect(frame.locator('.contextmenu-overlay')).toBeHidden();

  await openPopup(frame, '.contextmenu-boundary', '.contextmenu-panel', { button: 'right' });
  await expect(frame.locator('.menu-item').first()).toBeVisible();
  await expect(frame.locator('.contextmenu-overlay')).toBeVisible();
});
