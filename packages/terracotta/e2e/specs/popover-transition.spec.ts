import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

/**
 * Samples the panel's opacity over the first frames after it is opened.
 *
 * The click has to happen inside the page, between two frames of the sampler,
 * so that the very first painted frame of the panel is captured. Playwright's
 * own click would settle before anything could be read.
 */
async function openAndSample(page: Page, buttonId: string, panelId: string): Promise<number[]> {
  return page.evaluate(
    async ({ buttonId, panelId }) => {
      const button = document.querySelector<HTMLElement>(`[data-testid="${buttonId}"]`);
      if (!button) {
        throw new Error(`No button ${buttonId}`);
      }

      const opacities: number[] = [];
      const done = new Promise<void>((resolve) => {
        let frame = 0;
        function step(): void {
          const panel = document.querySelector<HTMLElement>(`[data-testid="${panelId}"]`);
          opacities.push(panel ? Number(getComputedStyle(panel).opacity) : -1);
          frame += 1;
          if (frame < 6) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(step);
      });

      button.click();
      await done;
      return opacities;
    },
    { buttonId, panelId },
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=popover-transition');
});

/**
 * The panel used to be painted at full opacity and then transition *down* to
 * its `enterFrom` state before entering, because the starting state was applied
 * in the same change as the class carrying the `transition` declaration.
 */
for (const [name, ids] of [
  ['a panel inside a transition', { button: 'wrapped-button', panel: 'wrapped-transition' }],
  ['a panel that is the transition', { button: 'polymorphic-button', panel: 'polymorphic-panel' }],
  ['a panel mounted on open', { button: 'unmounting-button', panel: 'unmounting-panel' }],
] as const) {
  test(`enters ${name} from its starting state, without flashing first`, async ({ page }) => {
    const opacities = await openAndSample(page, ids.button, ids.panel);

    // Never painted at anything but its starting state...
    expect(opacities[0]).toBeLessThan(0.2);
    // ...and every frame moves towards being visible, never away from it.
    for (let i = 1; i < opacities.length; i += 1) {
      expect(opacities[i]).toBeGreaterThanOrEqual(opacities[i - 1]);
    }
    expect(opacities[opacities.length - 1]).toBeGreaterThan(opacities[0]);
  });
}
