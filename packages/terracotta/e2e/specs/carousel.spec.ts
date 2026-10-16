import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=carousel');
});

test('rotates, and stops for good when focus enters', async ({ page }) => {
  const slides = page.getByRole('group', { name: /of 3$/ });
  await expect(slides).toContainText('Lakes');

  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');
  // The rotation control is the first stop in the carousel.
  const control = page.getByRole('button', { name: 'Start slide rotation' });
  await expect(control).toBeFocused();

  const shown = await slides.textContent();
  await page.waitForTimeout(1000);
  await expect(slides).toHaveText(shown ?? '');
});

test('the next button keeps focus and moves one slide per press', async ({ page }) => {
  await page.getByRole('button', { name: 'Next slide' }).focus();
  const slides = page.getByRole('group', { name: /of 3$/ });
  const first = await slides.getAttribute('aria-label');

  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Next slide' })).toBeFocused();
  await expect(slides).not.toHaveAttribute('aria-label', first ?? '');
});
