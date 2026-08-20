import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=toolbar');
});

test('moves focus to the first action when tabbed into', async ({ page }) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', { name: 'Bold' })).toBeFocused();
});

test('moves focus with the horizontal arrow keys', async ({ page }) => {
  await page.getByRole('button', { name: 'Bold' }).focus();

  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Italic' })).toBeFocused();

  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('button', { name: 'Bold' })).toBeFocused();
});

test('jumps to the first and last action with Home and End', async ({ page }) => {
  await page.getByRole('button', { name: 'Italic' }).focus();

  await page.keyboard.press('End');
  await expect(page.getByRole('button', { name: 'Underline' })).toBeFocused();

  await page.keyboard.press('Home');
  await expect(page.getByRole('button', { name: 'Bold' })).toBeFocused();
});
