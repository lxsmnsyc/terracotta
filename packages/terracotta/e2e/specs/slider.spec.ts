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

test('keeps the thumbs of a range in tab order, and moves the nearest one', async ({ page }) => {
  const low = page.getByRole('slider', { name: 'Minimum price' });
  const high = page.getByRole('slider', { name: 'Maximum price' });

  await low.focus();
  await page.keyboard.press('Tab');
  await expect(high).toBeFocused();

  const track = page.getByTestId('range-track');
  const box = await track.boundingBox();
  if (!box) {
    throw new Error('The track has no box');
  }
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2);
  await page.mouse.down();
  await expect(low).toHaveAttribute('aria-valuenow', '30');
  await expect(low).toBeFocused();

  // The low thumb stops at the high one.
  await page.mouse.move(box.x + box.width * 0.95, box.y + box.height / 2);
  await expect(low).toHaveAttribute('aria-valuenow', '80');
  await page.mouse.up();
});
