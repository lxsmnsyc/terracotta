import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=menu');
});

test('walks the items with the arrow keys and skips disabled ones', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Cut' }).focus();

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Copy' })).toBeFocused();

  // `Paste` is disabled, so the next step lands on `Delete`.
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();

  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Copy' })).toBeFocused();
});

test('jumps to the first and last item with Home and End', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Copy' }).focus();

  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();

  await page.keyboard.press('Home');
  await expect(page.getByRole('menuitem', { name: 'Cut' })).toBeFocused();
});

test('supports type-ahead search', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Cut' }).focus();

  await page.keyboard.type('de');

  await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
});

test('activates the focused item with Enter', async ({ page }) => {
  await page.getByRole('menuitem', { name: 'Copy' }).focus();

  await page.keyboard.press('Enter');

  await expect(page.getByTestId('activated')).toHaveText('Copy');
});
