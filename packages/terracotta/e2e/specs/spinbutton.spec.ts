import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=spinbutton');
});

test('only the field is in the tab sequence', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('spinbutton', { name: 'Adults' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
});

test('steps with the arrow keys and takes typed text', async ({ page }) => {
  const field = page.getByRole('spinbutton', { name: 'Adults' });
  await field.focus();

  await page.keyboard.press('ArrowUp');
  await expect(field).toHaveValue('3');

  await field.fill('8');
  await expect(field).toHaveAttribute('aria-valuenow', '8');

  await field.fill('99');
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await page.keyboard.press('Tab');
  await expect(field).toHaveValue('10');
});

test('the buttons step the value and leave focus in the field', async ({ page }) => {
  const field = page.getByRole('spinbutton', { name: 'Adults' });
  await field.focus();

  await page.getByRole('button', { name: 'Increase' }).click();
  await expect(field).toHaveValue('3');
  await expect(field).toBeFocused();

  await page.getByRole('button', { name: 'Decrease' }).click();
  await expect(field).toHaveValue('2');
  await expect(field).toBeFocused();
});
