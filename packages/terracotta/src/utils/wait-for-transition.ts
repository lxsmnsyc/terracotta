/**
 * Resolves once `el` has no animation left running, which is how the
 * transition-aware components wait for a CSS transition or animation to finish
 * without listening for `transitionend`.
 *
 * Environments without `getAnimations` (older browsers, jsdom) resolve
 * immediately rather than throwing.
 */
export default async function waitForTransition(el: Element): Promise<void> {
  try {
    const animations = el.getAnimations();
    if (animations.length > 0) {
      const finished: Promise<Animation>[] = [];
      for (const animation of animations) {
        finished.push(animation.finished);
      }
      await Promise.all(finished);
    }
  } catch {
    // do nothing
  }
}

/**
 * Runs `callback` once `el` has finished animating.
 *
 * `waitForTransition` swallows its own failures, so the rejection handler is
 * only there to keep the promise from floating.
 */
export function afterTransition(el: Element, callback: () => void): void {
  waitForTransition(el).then(callback, () => {
    // `waitForTransition` never rejects
  });
}
