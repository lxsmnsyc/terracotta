import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=nesting');
  await page.getByTestId('before').click();
  await page.getByTestId('popover-button').click();
  await expect(page.getByTestId('viewer')).toBeFocused();
});

test('cycles a real Tab inside the popover, not the dialog', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('editor')).toBeFocused();

  // Wrapping stays inside the popover: the dialog traps Tab as well, and its
  // own next stop would be `done`.
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('viewer')).toBeFocused();
  await expect(page.getByTestId('popover-panel')).toBeVisible();
});

test('closes one layer per Escape', async ({ page }) => {
  await page.keyboard.press('Escape');

  await expect(page.getByTestId('popover-panel')).toBeHidden();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByTestId('popover-button')).toBeFocused();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByTestId('before')).toBeFocused();
});

test('closes the popover when focus returns to the dialog', async ({ page }) => {
  await page.getByTestId('done').click();

  await expect(page.getByTestId('popover-panel')).toBeHidden();
  await expect(page.getByRole('dialog')).toBeVisible();
});
