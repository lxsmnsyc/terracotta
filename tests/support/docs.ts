import { type ConsoleMessage, type FrameLocator, type Page, expect } from '@playwright/test';

/**
 * The themes the site ships, and the two colour schemes each has to support.
 *
 * These are duplicated from `src/themes/index.ts` rather than imported: that
 * module pulls in every theme stylesheet, which a test runner cannot load.
 * `theme-picker.spec.ts` asserts the two lists agree, so the duplication cannot
 * drift silently.
 */
export const THEMES = [
  'terracotta',
  'brutalist',
  'glass',
  'terminal',
  'blueprint',
  'x-ray',
  'editorial',
  'bloom',
  'bevel',
] as const;
export const SCHEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];
export type Scheme = (typeof SCHEMES)[number];

export const THEME_STORAGE_KEY = 'tc-docs-theme';
export const SCHEME_STORAGE_KEY = 'tc-docs-scheme';

/** A representative slice of the site: home, a popup-heavy page, a modal page. */
export const SAMPLE_PATHS = ['/', '/components/listbox', '/components/alert-dialog'];

/*
 * Vite re-optimises dependencies the first time a route pulls in a module it
 * has not seen, and serves a 504 to whatever was in flight. It is a dev-server
 * artefact, it resolves itself on the next request, and it says nothing about
 * the site — so it is the one thing the console sweep ignores.
 */
const DEV_SERVER_NOISE = [
  /Outdated Optimize Dep/,
  /Failed to fetch dynamically imported module/,
  /Hydration module preload failed/,
];

/**
 * Writes the appearance into storage before the first navigation, which is
 * where the boot script in `Document.tsx` reads it. Setting it afterwards would
 * race the provider effect that writes the same key back.
 */
export async function useAppearance(page: Page, theme: Theme, scheme: Scheme): Promise<void> {
  await page.addInitScript(
    (appearance: { theme: string; scheme: string; themeKey: string; schemeKey: string }) => {
      try {
        localStorage.setItem(appearance.themeKey, appearance.theme);
        localStorage.setItem(appearance.schemeKey, appearance.scheme);
      } catch {
        // Private browsing. The test will fall back to the default appearance.
      }
    },
    { theme, scheme, themeKey: THEME_STORAGE_KEY, schemeKey: SCHEME_STORAGE_KEY },
  );
}

/**
 * Collects everything the page reports as an error. Hydration failures surface
 * here and nowhere else — the page still renders, it just stops responding —
 * so an empty list is the main evidence that the site is alive.
 */
export function watchForErrors(page: Page, where?: () => string): string[] {
  const errors: string[] = [];
  const record = (text: string): void => {
    if (!DEV_SERVER_NOISE.some((pattern) => pattern.test(text))) {
      const line = text.split('\n')[0] ?? text;
      errors.push(where ? `${where()}: ${line}` : line);
    }
  };
  page.on('pageerror', (error: Error) => {
    record(error.message);
  });
  page.on('console', (message: ConsoleMessage) => {
    if (message.type() === 'error') {
      record(message.text());
    }
  });
  return errors;
}

/**
 * Clicks a control that opens a popup, and waits for the popup rather than for
 * the click.
 *
 * The control is server-rendered, so it exists — and Playwright will happily
 * click it — before hydration has attached anything to it, and under a loaded
 * dev server that window is wide enough to lose the first click. Retrying is
 * safe because the trigger publishes `tc-expanded`: a second click only happens
 * while the popup is still closed, so this can never toggle it shut.
 *
 * Takes a page or a frame, because half the things worth clicking on this site
 * live inside a demo iframe.
 */
export async function openPopup(
  scope: Page | FrameLocator,
  trigger: string,
  item: string,
  options?: { button?: 'left' | 'right' },
): Promise<void> {
  await expect(async () => {
    if ((await scope.locator(`${trigger}[tc-expanded]`).count()) === 0) {
      await scope.locator(trigger).first().click(options);
    }
    await expect(scope.locator(item).first()).toBeVisible({ timeout: 1500 });
  }).toPass({ timeout: 25_000 });
}

/**
 * Clicks until the page reflects it, for controls whose state is idempotent —
 * picking an already-picked radio changes nothing, so a repeat is free. Same
 * pre-hydration race as `openPopup`.
 */
export async function clickUntil(
  page: Page,
  selector: string,
  settled: () => Promise<unknown>,
): Promise<void> {
  await expect(async () => {
    await page.click(selector);
    await settled();
  }).toPass({ timeout: 15_000 });
}

/** Every documentation page, read from the sidebar rather than hard-coded. */
export async function docPaths(page: Page): Promise<string[]> {
  await page.goto('/');
  const paths = await page.$$eval('.sidebar-link', (links) =>
    links.map((link) => link.getAttribute('href') ?? ''),
  );
  return paths.filter(Boolean);
}
