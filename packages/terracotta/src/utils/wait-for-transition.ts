/**
 * Resolves once `el` has no animation left running, which is how the
 * transition-aware components wait for a CSS transition or animation to finish
 * without listening for `transitionend`.
 *
 * Environments without `getAnimations` (older browsers, jsdom) resolve
 * immediately rather than throwing.
 */
export default async function waitForTransition(el: Element): Promise<void> {
  // `getAnimations` flushes style, so reading it straight away would freeze the
  // current styles of every element that has not applied its own classes yet —
  // a sibling that has just mounted would then transition *into* its starting
  // state before transitioning out of it. Yielding first lets the whole group
  // apply its classes against the same style baseline.
  await Promise.resolve();
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
