import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=listbox');
});

test('opens from the keyboard and focuses the selected option', async ({ page }) => {
  await page.getByRole('button', { name: 'Pick one' }).focus();

  await page.keyboard.press('ArrowDown');

  await expect(page.getByRole('listbox')).toBeVisible();
  await expect(page.getByRole('option', { name: 'apple' })).toBeFocused();
});

test('walks the options with the arrow keys and skips disabled ones', async ({ page }) => {
  await page.getByRole('button', { name: 'Pick one' }).click();

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { name: 'banana' })).toBeFocused();

  // `cherry` is disabled, so the next step lands on `durian`.
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { name: 'durian' })).toBeFocused();
});

test('supports type-ahead search', async ({ page }) => {
  await page.getByRole('button', { name: 'Pick one' }).click();

  await page.keyboard.type('du');

  await expect(page.getByRole('option', { name: 'durian' })).toBeFocused();
});

test('commits the selection and closes on click', async ({ page }) => {
  await page.getByRole('button', { name: 'Pick one' }).click();

  await page.getByRole('option', { name: 'banana' }).click();

  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(page.getByTestId('selection')).toHaveText('banana');
});

test('closes on Escape without changing the selection', async ({ page }) => {
  await page.getByRole('button', { name: 'Pick one' }).click();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(page.getByTestId('selection')).toHaveText('apple');
});

test('closes when focus leaves the popup', async ({ page }) => {
  // Opened from the keyboard on purpose: the library keeps the popup open while
  // the pointer still hovers the trigger, so a mouse-opened popup would not
  // close on a focus change.
  await page.getByRole('button', { name: 'Pick one' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('listbox')).toBeVisible();

  await page.getByTestId('before').focus();

  await expect(page.getByRole('listbox')).toBeHidden();
});
