import { expect, test } from '@playwright/test';
import { SCHEMES, THEMES, useAppearance } from './support/docs';

test('the picker offers exactly the themes this suite knows about', async ({ page }) => {
  await page.goto('/');
  await page.click('.theme-picker-button');

  const names = await page.$$eval('.theme-picker-option-name', (els) =>
    els.map((el) => el.textContent.trim().toLowerCase()),
  );
  expect(names).toEqual([...THEMES]);
});

/**
 * The server cannot know which theme is in the visitor's storage, so it renders
 * the default name — and hydration reuses the server's text node, rewriting it
 * only when the value *changes*. Without a deliberate change the button read
 * "Terracotta" while the whole site was painted in something else.
 */
for (const theme of THEMES) {
  test(`the picker button names the stored theme on first paint (${theme})`, async ({ page }) => {
    await useAppearance(page, theme, 'light');
    await page.goto('/components/listbox');

    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('.theme-picker-value')).toHaveText(new RegExp(theme, 'i'));
  });
}

test('a chosen theme survives a reload', async ({ page }) => {
  await page.goto('/');

  await page.click('.theme-picker-button');
  await page.locator('.theme-picker-option', { hasText: 'Terminal' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'terminal');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'terminal');
  await expect(page.locator('.theme-picker-value')).toHaveText(/terminal/i);
});

for (const scheme of SCHEMES) {
  test(`the appearance switch selects ${scheme} and the demo frame follows`, async ({ page }) => {
    await page.goto('/components/listbox');

    await page.locator('.scheme-picker-option', { hasText: new RegExp(scheme, 'i') }).click();
    const frame = page.frameLocator('.demo-frame >> nth=0');

    if (scheme === 'dark') {
      await expect(page.locator('html')).toHaveClass(/dark/);
      await expect(frame.locator('html')).toHaveClass(/dark/);
    } else {
      await expect(page.locator('html')).not.toHaveClass(/dark/);
      await expect(frame.locator('html')).not.toHaveClass(/dark/);
    }
  });
}
