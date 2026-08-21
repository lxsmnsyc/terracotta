import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=transition-group');
});

/**
 * Siblings of one transition have to apply their starting classes against the
 * same style baseline. Reading `getAnimations()` flushes style, so a sibling
 * that had not applied its classes yet would be measured in its resting state
 * and then animate *into* its starting state — fading out before fading in,
 * a phase behind the sibling that went first.
 */
test('advances both children of a transition together', async ({ page }) => {
  const first = page.getByTestId('first');
  const second = page.getByTestId('second');

  await page.getByTestId('toggle').click();

  await expect(first).toHaveAttribute('tc-transition', 'enter-to');

  // Once the first child is fading in, the second has to be fading in too. A
  // lagging sibling reaches this phase as well, but only after a whole fade
  // spent animating into its starting state, so the timeout is what separates
  // the two.
  await expect(second).toHaveAttribute('tc-transition', 'enter-to', { timeout: 300 });
});

test('leaves both children together', async ({ page }) => {
  const first = page.getByTestId('first');
  const second = page.getByTestId('second');
  await page.getByTestId('toggle').click();
  await expect(first).toHaveAttribute('tc-transition', 'entered');
  await expect(second).toHaveAttribute('tc-transition', 'entered');

  await page.getByTestId('toggle').click();

  await expect(first).toHaveAttribute('tc-transition', 'leave-to');
  await expect(second).toHaveAttribute('tc-transition', 'leave-to', { timeout: 300 });
});
