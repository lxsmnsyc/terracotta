import waitForTransition from '../utils/wait-for-transition';

/**
 * The class names for one transition, already split into lists.
 *
 * `enter` and `leave` carry the CSS `transition` or `animation` declaration and
 * stay on for the whole of their phase; the `*From` and `*To` pairs are the
 * start and end states swapped between them. `entered` is the resting state,
 * applied once entering has finished.
 */
export interface TransitionClasses {
  enter: string[];
  enterFrom: string[];
  enterTo: string[];
  entered: string[];
  leave: string[];
  leaveFrom: string[];
  leaveTo: string[];
}

/**
 * Callbacks fired around a transition.
 *
 * A run that gets interrupted never reaches its `afterEnter` or `afterLeave`,
 * which is what keeps a caller from unmounting an element that is on its way
 * back in.
 */
export interface TransitionHooks {
  /** Fired for every phase change, including the ones a caller cannot hook. */
  onTransition?: (state: TransitionStates) => void;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
}

/** The phase a transition is in, published as the `tc-transition` attribute. */
export type TransitionStates = 'enter-from' | 'enter-to' | 'entered' | 'leave-from' | 'leave-to';

// `classList` rejects the empty string, and splitting an empty class prop on
// spaces produces exactly that, so both helpers drop empty entries first.
function addClassList(ref: HTMLElement, classes: string[]): void {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref: HTMLElement, classes: string[]): void {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}

/**
 * Runs one element's enter and leave transitions.
 *
 * The state holds no reactivity of its own: a caller feeds it an element and a
 * set of classes, calls {@link show} or {@link hide}, and observes progress
 * through {@link TransitionHooks}. That is what lets the same machinery drive
 * both a `<Transition>` and a `<TransitionChild>`.
 *
 * Each step waits on the element's running animations rather than on a
 * `transitionend` listener, so an element with nothing to animate simply moves
 * on to the next step instead of waiting for an event that never arrives.
 *
 * States nest: a parent enters before its children and leaves after them, so a
 * group animates in from the outside and out from the inside.
 */
export class TransitionState {
  /**
   * @param visible Whether this state has finished entering. Children read it to
   * decide when they may mount.
   * @param hooks Called as the transition progresses.
   */
  constructor(
    public visible: () => boolean,
    private readonly hooks: TransitionHooks,
  ) {}

  private readonly children = new Set<TransitionState>();

  register(child: TransitionState): void {
    this.children.add(child);
  }

  unregister(child: TransitionState): void {
    this.children.delete(child);
  }

  private element?: HTMLElement;

  /**
   * The element to transition. It arrives after construction, because the
   * caller only has a ref once its element has rendered, and it changes again
   * whenever an `unmount`ing element is rebuilt.
   */
  setElement(element: HTMLElement): void {
    this.element = element;
  }

  private classes?: TransitionClasses;

  /**
   * Classes are re-read on every transition rather than captured once, so
   * changing a class prop applies to the next transition instead of restarting
   * the current one.
   */
  setClasses(classes: TransitionClasses): void {
    this.classes = classes;
  }

  /**
   * Bumped whenever a transition starts. A run whose token no longer matches
   * has been superseded by one going the other way, and stops at its next step
   * instead of finishing and undoing the newer transition.
   */
  private token = 0;

  // The transition currently running in each direction, kept so that repeated
  // calls join the run in flight instead of restarting it, and cleared by the
  // opposite direction when it interrupts.
  private showing?: Promise<void>;

  private hiding?: Promise<void>;

  /**
   * Enters, then lets the children enter behind it.
   *
   * Every wait is followed by a token check: if a leave has started in the
   * meantime, this run abandons its remaining steps rather than putting classes
   * back on an element that is now going the other way.
   */
  private async _show(
    token: number,
    element: HTMLElement,
    classes?: TransitionClasses,
  ): Promise<void> {
    this.hooks.beforeEnter?.();
    if (classes) {
      // A leave that was interrupted part-way through still has its classes on
      // the element.
      removeClassList(element, classes.leave);
      removeClassList(element, classes.leaveFrom);
      removeClassList(element, classes.leaveTo);
    }
    this.hooks.onTransition?.('enter-from');
    if (classes) {
      addClassList(element, classes.enter);
      addClassList(element, classes.enterFrom);
    }
    await waitForTransition(element);
    if (this.token !== token) {
      return;
    }
    if (classes) {
      removeClassList(element, classes.enterFrom);
    }
    this.hooks.onTransition?.('enter-to');
    if (classes) {
      addClassList(element, classes.enterTo);
    }
    await waitForTransition(element);
    if (this.token !== token) {
      return;
    }
    if (classes) {
      removeClassList(element, classes.enter);
      removeClassList(element, classes.enterTo);
    }
    this.hooks.onTransition?.('entered');
    if (classes) {
      addClassList(element, classes.entered);
    }
    await waitForTransition(element);
    if (this.token !== token) {
      return;
    }
    this.hooks.afterEnter?.();

    await Promise.all([...this.children].map(async (state) => state.show()));
    if (this.token !== token) {
      return;
    }
    this.showing = undefined;
  }

  /**
   * Enters, interrupting a leave if one is running.
   *
   * Resolves once this element and everything nested inside it has entered, or
   * as soon as the run is superseded by a {@link hide}.
   */
  async show(): Promise<void> {
    const element = this.element;
    if (!element) {
      return;
    }
    if (this.showing) {
      return this.showing;
    }
    // Interrupts a leave that is still running, so that showing something again
    // mid-transition takes effect now rather than after it has finished hiding.
    this.token += 1;
    this.hiding = undefined;
    this.showing = this._show(this.token, element, this.classes);
    return this.showing;
  }

  /**
   * Lets the children leave first, then leaves.
   *
   * Waiting for the children is what keeps a group together: the parent is
   * still on screen, and still animating, until the last thing inside it has
   * gone.
   */
  private async _hide(
    token: number,
    element: HTMLElement,
    classes?: TransitionClasses,
  ): Promise<void> {
    this.hooks.beforeLeave?.();
    await Promise.all([...this.children].map(async (state) => state.hide()));
    if (this.token !== token) {
      return;
    }

    if (classes) {
      // An enter that was interrupted part-way through still has its classes on
      // the element.
      removeClassList(element, classes.enter);
      removeClassList(element, classes.enterFrom);
      removeClassList(element, classes.enterTo);
      removeClassList(element, classes.entered);
    }
    this.hooks.onTransition?.('leave-from');
    if (classes) {
      addClassList(element, classes.leave);
      addClassList(element, classes.leaveFrom);
    }
    await waitForTransition(element);
    if (this.token !== token) {
      return;
    }

    if (classes) {
      removeClassList(element, classes.leaveFrom);
    }
    this.hooks.onTransition?.('leave-to');
    if (classes) {
      addClassList(element, classes.leaveTo);
    }
    await waitForTransition(element);
    if (this.token !== token) {
      return;
    }
    if (classes) {
      removeClassList(element, classes.leave);
      removeClassList(element, classes.leaveTo);
    }
    this.hooks.afterLeave?.();

    this.hiding = undefined;
  }

  /**
   * Leaves, interrupting an enter if one is running.
   *
   * Resolves once everything nested inside has left and this element has
   * finished its own leave, or as soon as the run is superseded by a
   * {@link show}.
   */
  async hide(): Promise<void> {
    const element = this.element;
    if (!element) {
      return;
    }
    if (this.hiding) {
      return this.hiding;
    }
    // Interrupts an enter that is still running, so that hiding something
    // mid-transition takes effect now rather than after it has finished showing.
    this.token += 1;
    this.showing = undefined;
    this.hiding = this._hide(this.token, element, this.classes);
    return this.hiding;
  }
}
