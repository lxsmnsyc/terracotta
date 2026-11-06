import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=button');
});

test('activates a non-button element once per Enter and once per Space', async ({ page }) => {
  await page.getByRole('button', { name: 'Save' }).focus();

  await page.keyboard.press('Enter');
  await expect(page.getByTestId('count')).toHaveText('1');

  await page.keyboard.press('Space');
  await expect(page.getByTestId('count')).toHaveText('2');
});

test('does not scroll the page on Space', async ({ page }) => {
  await page.getByRole('button', { name: 'Save' }).focus();

  await page.keyboard.press('Space');

  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('does not activate while disabled', async ({ page }) => {
  const disabled = page.getByRole('button', { name: 'Disabled' });
  await disabled.focus();

  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await disabled.click({ force: true });

  await expect(page.getByTestId('count')).toHaveText('0');
});
