import type { Locator } from '@playwright/test';

/** WCAG AA for body text. Every label this suite checks has to clear it. */
export const CONTRAST_FLOOR = 4.5;

/**
 * Contrast between an element's text and the ground it actually sits on.
 *
 * The ground is rarely the element's own background: half the themes leave
 * controls transparent, and `glass` makes every surface translucent on purpose.
 * So backgrounds are composited down the ancestor chain until one is opaque,
 * and anything still translucent at the root is composited over white or black
 * according to the colour scheme. That last step is an approximation — a themed
 * wash is not pure white — but it errs towards reporting *less* contrast than
 * there is, which is the safe direction for a floor.
 */
export async function textContrast(locator: Locator): Promise<number> {
  return locator.evaluate((element: Element) => {
    /*
     * Resolved through a canvas rather than by reading the numbers out of the
     * string. Computed colours are not always `rgb()`: a colour mid-transition
     * comes back as `oklab(...)`, `color-mix()` results as `color(srgb ...)`,
     * and a hand-rolled parser silently read an oklab lightness of 0.75 as 0.75
     * of 255 — reporting a bright red button as nearly black.
     */
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    const parse = (value: string): [number, number, number, number] | null => {
      if (!context) {
        return null;
      }
      context.globalCompositeOperation = 'copy';
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const [r = 0, g = 0, b = 0, a = 0] = context.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };

    // Source-over. The composited alpha matters: a translucent layer over
    // another translucent layer is still translucent, and treating the result
    // as opaque stops the walk at the wrong ancestor.
    const over = (
      top: [number, number, number, number],
      bottom: [number, number, number, number],
    ): [number, number, number, number] => {
      const alpha = top[3] + bottom[3] * (1 - top[3]);
      if (alpha === 0) {
        return [0, 0, 0, 0];
      }
      const channel = (index: 0 | 1 | 2): number =>
        (top[index] * top[3] + bottom[index] * bottom[3] * (1 - top[3])) / alpha;
      return [channel(0), channel(1), channel(2), alpha];
    };

    const luminance = ([r, g, b]: [number, number, number, number]): number => {
      const channel = (value: number): number => {
        const v = value / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    const dark = document.documentElement.classList.contains('dark');
    const base: [number, number, number, number] = dark ? [0, 0, 0, 1] : [255, 255, 255, 1];

    let ground: [number, number, number, number] = [0, 0, 0, 0];
    for (let node: Element | null = element; node; node = node.parentElement) {
      const layer = parse(getComputedStyle(node).backgroundColor);
      if (!layer || layer[3] === 0) {
        continue;
      }
      ground = ground[3] === 0 ? layer : over(ground, layer);
      if (ground[3] > 0.999) {
        break;
      }
    }
    if (ground[3] <= 0.999) {
      ground = over(ground, base);
    }

    const text = parse(getComputedStyle(element).color) ?? [0, 0, 0, 1];
    const foreground = over(text, ground);

    const a = luminance(foreground);
    const b = luminance(ground);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
}
