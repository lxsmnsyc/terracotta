import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=modal');
});

test('focuses a panel with nothing focusable, so Escape closes it', async ({ page }) => {
  await page.getByTestId('open-plain').click();
  await expect(page.getByTestId('plain-panel')).toBeFocused();

  // A real Tab press stays on the panel instead of reaching the page.
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('plain-panel')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByTestId('open-plain')).toBeFocused();
});

test('makes the page inert while a modal is open', async ({ page }) => {
  await page.getByTestId('open-alert').click();
  await expect(page.getByTestId('alert-dismiss')).toBeFocused();

  // The trigger is still on screen, but inert content cannot take focus.
  await page.getByTestId('open-plain').focus();
  await expect(page.getByTestId('alert-dismiss')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('open-plain')).not.toHaveAttribute('inert');
  await page.getByTestId('open-plain').focus();
  await expect(page.getByTestId('open-plain')).toBeFocused();
});

test('returns focus to the trigger of an AlertDialog', async ({ page }) => {
  await page.getByTestId('open-alert').click();
  await expect(page.getByRole('alertdialog')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('alertdialog')).toBeHidden();
  await expect(page.getByTestId('open-alert')).toBeFocused();
});

test('returns focus to the trigger of a CommandBar', async ({ page }) => {
  await page.getByTestId('open-command').click();
  await expect(page.getByTestId('command-first')).toBeFocused();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByTestId('open-command')).toBeFocused();
});

test('restores stacked dialogs one layer at a time', async ({ page }) => {
  await page.getByTestId('open-outer').click();
  await page.getByTestId('open-inner').click();
  await expect(page.getByTestId('inner-button')).toBeFocused();

  // The outer dialog sits under the inner one, so it is inert until then.
  const outer = page.getByRole('dialog', { name: 'Outer' });
  const isInert = (el: Element): boolean => el.closest('[inert]') !== null;
  expect(await outer.evaluate(isInert)).toBe(true);
  await page.getByTestId('open-inner').focus();
  await expect(page.getByTestId('inner-button')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('open-inner')).toBeFocused();
  expect(await outer.evaluate(isInert)).toBe(false);
  // The outer dialog is still open, so the page stays inert.
  expect(await page.getByTestId('open-outer').evaluate(isInert)).toBe(true);

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('open-outer')).toBeFocused();
});

test('returns focus when the dialog is removed while open', async ({ page }) => {
  await page.getByTestId('open-mounted').click();
  await expect(page.getByTestId('unmount')).toBeFocused();

  await page.getByTestId('unmount').click();

  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('open-mounted')).not.toHaveAttribute('inert');
  await expect(page.getByTestId('open-mounted')).toBeFocused();
});
