export async function waitForTransition(el: Element): Promise<void> {
  try {
    const animations = el.getAnimations();
    if (animations.length > 0) {
      await Promise.all(animations.map((animation) => animation.finished));
    }
  } catch {
    // do nothing
  }
}
