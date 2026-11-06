import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=radio-group');
});

test('Tab focuses the first option when nothing is checked, without checking it', async ({
  page,
}) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');

  const small = page.getByRole('radio', { name: 'Small' });
  await expect(small).toBeFocused();
  await expect(small).not.toBeChecked();
});

test('the arrow keys check the option they move to', async ({ page }) => {
  await page.getByTestId('before').focus();
  await page.keyboard.press('Tab');

  await page.keyboard.press('ArrowDown');

  const medium = page.getByRole('radio', { name: 'Medium' });
  await expect(medium).toBeFocused();
  await expect(medium).toBeChecked();

  // The group is a single tab stop.
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByTestId('before')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(medium).toBeFocused();
});
