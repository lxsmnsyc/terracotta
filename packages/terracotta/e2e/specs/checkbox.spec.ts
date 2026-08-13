import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=checkbox');
});

test('toggles on click', async ({ page }) => {
  const checkbox = page.getByRole('checkbox');

  await expect(checkbox).not.toBeChecked();

  await checkbox.click();

  await expect(checkbox).toBeChecked();
  await expect(page.getByTestId('state')).toHaveText('checked');
});

test('toggles from the keyboard', async ({ page }) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('checkbox')).toBeFocused();

  await page.keyboard.press('Space');

  await expect(page.getByRole('checkbox')).toBeChecked();
});

test('names and describes the checkbox for assistive technology', async ({ page }) => {
  await expect(page.getByRole('checkbox')).toMatchAriaSnapshot(`
    - checkbox "Notify me" [checked=false]
  `);
});

test('reports the toggle as a pressed button', async ({ page }) => {
  const toggle = page.getByRole('button', { name: 'Bold' });

  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await toggle.click();

  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});
