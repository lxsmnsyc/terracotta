import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=tabs');
});

test('takes a single Tab stop for the whole tab list', async ({ page }) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('tab', { name: 'alpha tab' })).toBeFocused();

  // The unselected tabs are skipped, so the next Tab leaves the widget.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('after')).toBeFocused();
});

test('moves the selection with the arrow keys', async ({ page }) => {
  await page.getByRole('tab', { name: 'alpha tab' }).focus();

  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'beta tab' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toHaveText('beta panel');

  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'alpha tab' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toHaveText('alpha panel');
});

test('jumps to the first and last tab with Home and End', async ({ page }) => {
  await page.getByRole('tab', { name: 'beta tab' }).focus();

  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'gamma tab' })).toBeFocused();

  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'alpha tab' })).toBeFocused();
});

test('renders only the selected panel', async ({ page }) => {
  await expect(page.getByRole('tabpanel')).toHaveCount(1);

  await page.getByRole('tab', { name: 'gamma tab' }).click();

  await expect(page.getByRole('tabpanel')).toHaveText('gamma panel');
});

test('reports the tab list to assistive technology', async ({ page }) => {
  await expect(page.getByRole('tablist')).toMatchAriaSnapshot(`
    - tablist:
      - tab "alpha tab" [selected]
      - tab "beta tab"
      - tab "gamma tab"
  `);
});
