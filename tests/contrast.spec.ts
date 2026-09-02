import { expect, test } from '@playwright/test';
import { CONTRAST_FLOOR, textContrast } from './support/contrast';
import { SCHEMES, THEMES, useAppearance } from './support/docs';

/**
 * Filled controls and filled rows are where themes go wrong. The fill comes
 * from one rule and the label from another, and a theme that repaints only the
 * fill leaves the text stranded — which is exactly how a red "delete" button
 * ended up grey with a white label, and how a hovered option in the theme
 * picker turned black under a near-black description.
 *
 * These run against the demo routes directly rather than through the docs
 * chrome: same components, no iframe, a fraction of the time.
 */
for (const theme of THEMES) {
  for (const scheme of SCHEMES) {
    const appearance = `?theme=${theme}&scheme=${scheme}`;

    test(`${theme} / ${scheme}: a destructive button stays legible, idle and hovered`, async ({
      page,
    }) => {
      await useAppearance(page, theme, scheme);
      await page.goto(`/demo/alert-dialog/destructive${appearance}`);

      const button = page.locator('.button-danger').first();
      await expect(button).toBeVisible();
      expect(await textContrast(button)).toBeGreaterThanOrEqual(CONTRAST_FLOOR);

      await button.hover();
      expect(await textContrast(button)).toBeGreaterThanOrEqual(CONTRAST_FLOOR);
    });

    test(`${theme} / ${scheme}: an active option stays legible`, async ({ page }) => {
      await useAppearance(page, theme, scheme);
      await page.goto(`/demo/listbox/basic${appearance}`);

      await page.click('.listbox-button');
      const option = page.locator('.listbox-option[tc-active]').first();
      await expect(option).toBeVisible();
      expect(await textContrast(option)).toBeGreaterThanOrEqual(CONTRAST_FLOOR);
    });

    test(`${theme} / ${scheme}: the current sidebar entry stays legible`, async ({ page }) => {
      await useAppearance(page, theme, scheme);
      await page.goto('/components/listbox');

      // The only filled row in the chrome that carries text of its own.
      const current = page.locator('.sidebar-link[aria-current="page"]');
      await expect(current).toBeVisible();
      expect(await textContrast(current)).toBeGreaterThanOrEqual(CONTRAST_FLOOR);
    });
  }
}
