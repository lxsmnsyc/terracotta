export async function waitForTransition(el: Element): Promise<void> {
  try {
    const animations = el.getAnimations();
    const length = animations.length;

    if (length > 0) {
      await Promise.all(animations.map(animation => animation.finished));
    }
  } catch {
    // do nothing
  }
}
