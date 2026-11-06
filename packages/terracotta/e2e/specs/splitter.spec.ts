import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=splitter');
});

test('moves with the keyboard and resizes the primary pane', async ({ page }) => {
  await page.keyboard.press('Tab');
  const separator = page.getByRole('separator', { name: 'Contents' });
  await expect(separator).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(separator).toHaveAttribute('aria-valuenow', '35');

  await page.keyboard.press('Enter');
  await expect(separator).toHaveAttribute('aria-valuenow', '0');
  const pane = page.getByText('Contents');
  await expect(pane).toHaveCSS('flex-basis', '0%');

  await page.keyboard.press('Enter');
  await expect(separator).toHaveAttribute('aria-valuenow', '35');
});

test('follows a drag', async ({ page }) => {
  const box = await page.getByTestId('splitter').boundingBox();
  const handle = await page.getByRole('separator', { name: 'Contents' }).boundingBox();
  if (!box || !handle) {
    throw new Error('Missing a box');
  }
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.6, handle.y + handle.height / 2);
  await page.mouse.up();

  await expect(page.getByRole('separator', { name: 'Contents' })).toHaveAttribute(
    'aria-valuenow',
    '60',
  );
});
