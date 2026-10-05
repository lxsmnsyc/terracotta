import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=menu-button');
});

test('focuses the first item when the menu opens', async ({ page }) => {
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect(page.getByRole('menuitem', { name: 'Duplicate' })).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Rename' })).toBeFocused();
});

test('opens on the first item with Down and the last item with Up', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Actions' });
  await button.focus();

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Duplicate' })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();

  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
});

test('closes on Tab', async ({ page }) => {
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect(page.getByRole('menu')).toBeVisible();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('menu')).toHaveCount(0);
});

test('closes when an item is activated', async ({ page }) => {
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(page.getByTestId('activated')).toHaveText('Rename');
  await expect(page.getByRole('menu')).toHaveCount(0);
});
