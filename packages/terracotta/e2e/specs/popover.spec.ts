import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=popover');
});

test('opens on click and moves focus into the panel', async ({ page }) => {
  await page.getByRole('button', { name: 'Options' }).click();

  await expect(page.getByTestId('panel')).toBeVisible();
  await expect(page.getByTestId('rename')).toBeFocused();
});

test('traps Tab inside the open panel', async ({ page }) => {
  await page.getByRole('button', { name: 'Options' }).click();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('duplicate')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('rename')).toBeFocused();
});

test('closes on Escape', async ({ page }) => {
  await page.getByRole('button', { name: 'Options' }).click();

  await page.keyboard.press('Escape');

  await expect(page.getByTestId('panel')).toBeHidden();
});

test('closes when focus moves outside the panel', async ({ page }) => {
  // Opened from the keyboard on purpose: the library keeps the panel open while
  // the pointer still hovers the trigger, so a mouse-opened panel would not
  // close on a focus change.
  await page.getByRole('button', { name: 'Options' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('panel')).toBeVisible();

  await page.getByTestId('outside').focus();

  await expect(page.getByTestId('panel')).toBeHidden();
});
