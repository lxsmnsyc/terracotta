import { type Page, expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=context-menu');
});

async function open(page: Page): Promise<void> {
  await page.getByTestId('boundary').focus();
  await page.getByTestId('boundary').click({ button: 'right' });
  await expect(page.getByTestId('panel')).toBeVisible();
}

test('focuses the first menu item when it opens', async ({ page }) => {
  await open(page);

  await expect(page.getByRole('menuitem', { name: 'Cut' })).toBeFocused();
});

test('closes on Tab and returns focus to where it was', async ({ page }) => {
  await open(page);

  await page.keyboard.press('Tab');

  await expect(page.getByTestId('panel')).toHaveCount(0);
  await expect(page.getByTestId('boundary')).toBeFocused();
});

test('closes on Shift+Tab too', async ({ page }) => {
  await open(page);

  await page.keyboard.press('Shift+Tab');

  await expect(page.getByTestId('panel')).toHaveCount(0);
});

test('activates an item with Enter and closes', async ({ page }) => {
  await open(page);
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Copy' })).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.getByTestId('activated')).toHaveText('Copy');
  await expect(page.getByTestId('panel')).toHaveCount(0);
});

test('does not activate or close for a disabled item', async ({ page }) => {
  await open(page);

  await page.getByRole('menuitem', { name: 'Paste' }).click({ force: true });

  await expect(page.getByTestId('activated')).toHaveText('');
  await expect(page.getByTestId('panel')).toBeVisible();
});
