import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=slider');
});

test('is one tab stop on the thumb, and moves with the arrow keys', async ({ page }) => {
  await page.keyboard.press('Tab');
  const thumb = page.getByRole('slider', { name: 'Volume' });
  await expect(thumb).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(thumb).toHaveAttribute('aria-valuenow', '51');

  await page.keyboard.press('End');
  await expect(thumb).toHaveAttribute('aria-valuenow', '100');
});

test('sets the value from a press and a drag on the track', async ({ page }) => {
  const track = page.getByTestId('track');
  const box = await track.boundingBox();
  if (!box) {
    throw new Error('The track has no box');
  }
  const thumb = page.getByRole('slider', { name: 'Volume' });

  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2);
  await page.mouse.down();
  await expect(thumb).toHaveAttribute('aria-valuenow', '25');
  await expect(thumb).toBeFocused();

  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height / 2);
  await expect(thumb).toHaveAttribute('aria-valuenow', '90');

  // Past the end of the track, the value stays at the maximum.
  await page.mouse.move(box.x + box.width * 2, box.y + box.height / 2);
  await expect(thumb).toHaveAttribute('aria-valuenow', '100');
  await page.mouse.up();
});

test('clicking the label focuses the thumb', async ({ page }) => {
  await page.getByText('Volume').click();

  await expect(page.getByRole('slider', { name: 'Volume' })).toBeFocused();
});
