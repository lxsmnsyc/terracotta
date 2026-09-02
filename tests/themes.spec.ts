import { expect, test } from '@playwright/test';
import { SAMPLE_PATHS, SCHEMES, THEMES, useAppearance, watchForErrors } from './support/docs';

/**
 * Terracotta writes `tc-` state attributes and never touches `class`, so a
 * theme is nothing but CSS — which means the proof that a theme works is that
 * the site keeps behaving identically while looking completely different.
 */
for (const theme of THEMES) {
  for (const scheme of SCHEMES) {
    test(`${theme} / ${scheme} paints the site and breaks nothing`, async ({ page }) => {
      await useAppearance(page, theme, scheme);
      const errors = watchForErrors(page);

      for (const path of SAMPLE_PATHS) {
        await page.goto(path);

        const root = page.locator('html');
        await expect(root).toHaveAttribute('data-theme', theme);
        if (scheme === 'dark') {
          await expect(root).toHaveClass(/dark/);
        } else {
          await expect(root).not.toHaveClass(/dark/);
        }

        // Every token in the contract has to resolve to something.
        const tokens = await page.evaluate(() => {
          const style = getComputedStyle(document.documentElement);
          return ['--surface-0', '--text-1', '--border', '--accent', '--focus'].map((name) =>
            style.getPropertyValue(name).trim(),
          );
        });
        expect(tokens.every(Boolean), `unset tokens in ${theme}`).toBe(true);

        // And the page has to be painted, not left on the browser's default.
        const ground = await page.evaluate(() => {
          const html = getComputedStyle(document.documentElement);
          const body = getComputedStyle(document.body);
          return {
            htmlColor: html.backgroundColor,
            htmlImage: html.backgroundImage,
            bodyColor: body.backgroundColor,
          };
        });
        // Not a string check: `rgb(0, 0, 0)` also ends in ", 0)".
        const opaque = (value: string): boolean => {
          const parts = value.match(/[\d.]+/g);
          return !!parts && (parts.length < 4 || Number(parts[3]) > 0);
        };
        expect(
          opaque(ground.htmlColor) || ground.htmlImage !== 'none' || opaque(ground.bodyColor),
          `${theme}/${scheme} at ${path} paints no background: ${JSON.stringify(ground)}`,
        ).toBe(true);
      }

      expect(errors).toEqual([]);
    });
  }
}

test('switching theme restyles the chrome and the demos together', async ({ page }) => {
  await page.goto('/components/listbox');

  const before = await page.locator('.sidebar-link[aria-current="page"]').evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );

  await page.click('.theme-picker-button');
  await page.locator('.theme-picker-option', { hasText: 'Blueprint' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'blueprint');
  const after = await page.locator('.sidebar-link[aria-current="page"]').evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(after).not.toBe(before);

  // The demo is a separate document; it follows through the frame bridge.
  const frame = page.frameLocator('.demo-frame >> nth=0');
  await expect(frame.locator('html')).toHaveAttribute('data-theme', 'blueprint');
});
