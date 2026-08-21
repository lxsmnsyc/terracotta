import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=transition');
});

/**
 * The fade runs for 600 ms. Specs that are not about interruption wait on the
 * lifecycle marker so they act on a settled transition rather than racing it.
 */
async function settled(page: Page, state: 'entered' | 'left'): Promise<void> {
  await expect(page.getByTestId('lifecycle')).toHaveText(state);
}

test('leaves the panel interactive once it has entered', async ({ page }) => {
  const panel = page.getByTestId('panel');
  await settled(page, 'entered');

  await expect(panel).not.toHaveAttribute('inert');
  await page.getByTestId('inside').click();

  await expect(page.getByTestId('inside')).toBeFocused();
});

test('marks the panel inert while it leaves, and keeps it inert while hidden', async ({ page }) => {
  const panel = page.getByTestId('panel');
  await settled(page, 'entered');

  await page.getByTestId('toggle').click();

  // Still on screen, fading out, but no longer interactive.
  await expect(panel).toHaveAttribute('tc-transition', /leave-(from|to)/);
  await expect(panel).toHaveAttribute('inert', '');

  // `unmount={false}` keeps it in the DOM afterwards, so it has to stay inert.
  await settled(page, 'left');
  await expect(panel).toHaveAttribute('inert', '');
});

test('skips a hidden panel in the tab order', async ({ page }) => {
  await settled(page, 'entered');
  await page.getByTestId('toggle').click();
  await settled(page, 'left');

  await page.getByTestId('toggle').focus();
  await page.keyboard.press('Tab');

  await expect(page.getByTestId('after')).toBeFocused();
});

test('is interactive again as soon as it starts entering', async ({ page }) => {
  const panel = page.getByTestId('panel');
  await settled(page, 'entered');
  await page.getByTestId('toggle').click();
  await settled(page, 'left');

  await page.getByTestId('toggle').click();

  // Focus can move into a panel while it is still animating in, which is what
  // lets a transitioning dialog or popover focus itself as it opens.
  await expect(panel).toHaveAttribute('tc-transition', /enter-(from|to)/);
  await expect(panel).not.toHaveAttribute('inert');
});

test('reverses a leave when the panel is shown again mid-fade', async ({ page }) => {
  const panel = page.getByTestId('panel');
  await settled(page, 'entered');

  await page.getByTestId('toggle').click();
  await expect(panel).toHaveAttribute('tc-transition', /leave-(from|to)/);

  await page.getByTestId('toggle').click();

  // The leave stops where it is: the panel enters again and is interactive
  // straight away rather than finishing its fade out first.
  await expect(panel).toHaveAttribute('tc-transition', /enter-(from|to)|entered/);
  await expect(panel).not.toHaveAttribute('inert');
  await settled(page, 'entered');
  await page.getByTestId('inside').click();
  await expect(page.getByTestId('inside')).toBeFocused();
});

test('reverses an enter when the panel is hidden again mid-fade', async ({ page }) => {
  const panel = page.getByTestId('panel');
  await settled(page, 'entered');
  await page.getByTestId('toggle').click();
  await settled(page, 'left');

  await page.getByTestId('toggle').click();
  await expect(panel).toHaveAttribute('tc-transition', /enter-(from|to)/);

  await page.getByTestId('toggle').click();

  await expect(panel).toHaveAttribute('tc-transition', /leave-(from|to)/);
  await expect(panel).toHaveAttribute('inert', '');
  await settled(page, 'left');
});
