import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=dialog');
});

test('moves focus into the panel when opened', async ({ page }) => {
  await page.getByTestId('before').click();

  await expect(page.getByTestId('cancel')).toBeFocused();
});

test('traps a real Tab press inside the panel', async ({ page }) => {
  await page.getByTestId('before').click();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('reason')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('confirm')).toBeFocused();

  // Wrapping past the last focusable element returns to the first one instead
  // of escaping to the browser chrome or the buttons behind the dialog.
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('cancel')).toBeFocused();
});

test('walks backwards with Shift+Tab without leaving the panel', async ({ page }) => {
  await page.getByTestId('before').click();

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByTestId('confirm')).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByTestId('reason')).toBeFocused();
});

test('closes on Escape and restores focus to the trigger', async ({ page }) => {
  await page.getByTestId('before').click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByTestId('before')).toBeFocused();
});

test('keeps clicks inside the panel from closing the dialog', async ({ page }) => {
  await page.getByTestId('before').click();

  // The overlay covers the viewport and closes on click, so the panel has to
  // paint above it. Clicking the panel itself, not one of its buttons, is what
  // catches the overlay stealing the click.
  await page.getByTestId('panel').click({ position: { x: 4, y: 4 } });

  await expect(page.getByRole('dialog')).toBeVisible();
});

test('closes when the overlay is clicked', async ({ page }) => {
  await page.getByTestId('before').click();

  await page.getByTestId('overlay').click();

  await expect(page.getByRole('dialog')).toBeHidden();
});

test('exposes a modal dialog that is named and described', async ({ page }) => {
  await page.getByTestId('before').click();

  await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
    - dialog "Delete file":
      - heading "Delete file"
      - paragraph: This action cannot be undone
      - button "Cancel"
      - textbox
      - button "Confirm"
  `);
});
