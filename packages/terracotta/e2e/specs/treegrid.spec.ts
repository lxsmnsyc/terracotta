import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=treegrid');
});

test('opens a row and walks into it with the arrow keys', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');
  const inbox = page.getByRole('row', { name: 'Inbox' });
  await expect(inbox).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(inbox).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('row', { name: 'Lunch' })).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Reply' })).toBeFocused();
});

test('Tab moves through the widgets of the focused row, then leaves', async ({ page }) => {
  await page.getByRole('row', { name: 'Inbox' }).focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Mark read' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Archive' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
});
