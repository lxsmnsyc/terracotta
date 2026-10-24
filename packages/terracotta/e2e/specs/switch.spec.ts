import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=switch');
});

test('flips with Space and Enter', async ({ page }) => {
  const control = page.getByRole('switch', { name: 'Aeroplane mode' });
  await control.focus();

  await page.keyboard.press('Space');
  await expect(control).toHaveAttribute('aria-checked', 'true');

  await page.keyboard.press('Enter');
  await expect(control).toHaveAttribute('aria-checked', 'false');
});

test('is in the tab sequence', async ({ page }) => {
  await page.keyboard.press('Tab');

  await expect(page.getByRole('switch', { name: 'Aeroplane mode' })).toBeFocused();
});
