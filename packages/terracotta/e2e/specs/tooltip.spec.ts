import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=tooltip');
});

test('opens when Tab reaches the trigger, and closes when focus leaves', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');

  const trigger = page.getByRole('button', { name: 'Save' });
  await expect(trigger).toBeFocused();
  await expect(page.getByRole('tooltip')).toHaveText('Saves the file');
  await expect(trigger).toHaveAccessibleDescription('Saves the file');

  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('closes on Escape and keeps focus on the trigger', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Save' });
  await trigger.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('opens on hover, and stays open while the pointer is on the tooltip', async ({ page }) => {
  await page.getByRole('button', { name: 'Save' }).hover();
  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toBeVisible();

  await tooltip.hover();
  await page.waitForTimeout(300);
  await expect(tooltip).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(tooltip).toHaveCount(0);
});
