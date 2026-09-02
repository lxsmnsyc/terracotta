import { expect, test } from '@playwright/test';
import { docPaths, watchForErrors } from './support/docs';

/**
 * The whole site, in the default appearance. A page that fails to hydrate
 * still *renders* — it simply stops responding — so the console is the only
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
  await page.goto('/components/listbox');

  const hero = page.locator('.page-header + .demo');
  await expect(hero).toBeVisible();
  await expect(hero.locator('iframe.demo-frame')).toHaveAttribute('src', /^\/demo\//);
});

test('demo frames carry the appearance they are asked for', async ({ page }) => {
  await page.goto('/demo/listbox/basic?theme=brutalist&scheme=dark');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'brutalist');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('.listbox-button')).toBeVisible();
});
