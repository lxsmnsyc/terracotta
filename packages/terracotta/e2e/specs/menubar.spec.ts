import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=menubar');
});

test('is one stop in the tab sequence', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('menuitem', { name: 'File' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('menuitem', { name: 'File' })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Before' })).toBeFocused();
});

test('moves with Left and Right, and Tab returns to the last focused item', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');

  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused();

  // `View` is disabled, so the next step lands on `Help`.
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'Help' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('menuitem', { name: 'Help' })).toBeFocused();
});

test('activates the focused item with Enter', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await expect(page.getByTestId('activated')).toHaveText('File');
});
