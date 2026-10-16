import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=grid');
});

test('is one tab stop, and the arrow keys move between cells', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('columnheader', { name: 'Name' })).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  const link = page.getByRole('link', { name: "Ada's profile" });
  await expect(link).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

  // Tab returns to the cell that last had focus.
  await page.keyboard.press('Shift+Tab');
  await expect(link).toBeFocused();
});

test('Enter on a link cell follows the link', async ({ page }) => {
  await page.getByRole('link', { name: "Grace's profile" }).focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#Grace$/);
});
