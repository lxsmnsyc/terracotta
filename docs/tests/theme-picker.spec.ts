import { expect, test } from '@playwright/test';
import { SCHEMES, THEMES, clickUntil, useAppearance } from './support/docs';

test('the picker is a radio group naming every theme', async ({ page }) => {
  await page.goto('/');

  const group = page.getByRole('radiogroup', { name: /theme/i });
  await expect(group).toBeVisible();

  const ids = await page.$$eval('.theme-swatch', (els) =>
    els.map((el) => el.getAttribute('data-theme-id') ?? ''),
  );
  expect(ids).toEqual([...THEMES]);

  // Each swatch is a colour with no text, so the accessible name is the only
  // name it has.
  for (const id of THEMES) {
    await expect(page.getByRole('radio', { name: new RegExp(id, 'i') })).toBeVisible();
  }
});

/**
 * The server cannot know which theme is in the visitor's storage, so it renders
 * the default as checked. If hydration does not move the mark, the site is
 * painted in one theme while the picker points at another.
 */
for (const theme of THEMES) {
  test(`the checked swatch is the stored theme on first paint (${theme})`, async ({ page }) => {
    await useAppearance(page, theme, 'light');
    await page.goto('/components/listbox');

    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('.theme-swatch[tc-checked]')).toHaveAttribute('data-theme-id', theme);
  });
}

test('choosing a theme applies it at once and survives a reload', async ({ page }) => {
  await page.goto('/');

  await clickUntil(page, '.theme-swatch[data-theme-id="terminal"]', () =>
    expect(page.locator('html')).toHaveAttribute('data-theme', 'terminal'),
  );

  // Still on screen, so the next theme is one click away rather than a round
  // trip through a menu.
  await expect(page.locator('.theme-swatch[data-theme-id="blueprint"]')).toBeVisible();
  await clickUntil(page, '.theme-swatch[data-theme-id="blueprint"]', () =>
    expect(page.locator('html')).toHaveAttribute('data-theme', 'blueprint'),
  );

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'blueprint');
  await expect(page.locator('.theme-swatch[tc-checked]')).toHaveAttribute(
    'data-theme-id',
    'blueprint',
  );
});

test('the picker is operable from the keyboard', async ({ page }) => {
  await page.goto('/');

  // Same pre-hydration race as a click: the swatch is focusable from the
  // server's markup long before it answers a key. Arrowing from the first
  // swatch always lands on the second, so a repeat is harmless.
  await expect(async () => {
    await page.locator('.theme-swatch[data-theme-id="terracotta"]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'brutalist', {
      timeout: 1000,
    });
  }).toPass({ timeout: 15_000 });
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
