import { waitForTransition } from '../utils/wait-for-transition';

export interface TransitionClasses {
  enter: string[];
  enterFrom: string[];
  enterTo: string[];
  entered: string[];
  leave: string[];
  leaveFrom: string[];
  leaveTo: string[];
}

export interface TransitionHooks {
  onTransition?: (state: TransitionStates) => void;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
}

export type TransitionStates = 'enter-from' | 'enter-to' | 'entered' | 'leave-from' | 'leave-to';

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

export class TransitionState {
  constructor(
    public visible: () => boolean,
    private hooks: TransitionHooks,
  ) {}

  private children = new Set<TransitionState>();

  register(child: TransitionState) {
    this.children.add(child);
  }

  unregister(child: TransitionState) {
    this.children.delete(child);
  }

  private element?: HTMLElement;

  setElement(element: HTMLElement) {
    this.element = element;
  }

  private classes?: TransitionClasses;

  setClasses(classes: TransitionClasses) {
    this.classes = classes;
  }

  private showing?: Promise<void>;

  private async _show(element: HTMLElement, classes?: TransitionClasses) {
    this.hooks.beforeEnter?.();
    this.hooks.onTransition?.('enter-from');
    if (classes) {
      addClassList(element, classes.enter);
      addClassList(element, classes.enterFrom);
    }
    await waitForTransition(element);
    if (classes) {
      removeClassList(element, classes.enterFrom);
    }
    this.hooks.onTransition?.('enter-to');
    if (classes) {
      addClassList(element, classes.enterTo);
    }
    await waitForTransition(element);
    if (classes) {
      removeClassList(element, classes.enter);
      removeClassList(element, classes.enterTo);
    }
    this.hooks.onTransition?.('entered');
    if (classes) {
      addClassList(element, classes.entered);
    }
    await waitForTransition(element);
    this.hooks.afterEnter?.();

    await Promise.all([...this.children].map((state) => state.show()));
    this.showing = undefined;
  }

  async show() {
    // TODO check for interuption
    const element = this.element;
    if (!element || this.hiding) {
      return;
    }
    // FIXME prevent ahead call
    if (!this.showing) {
      this.showing = this._show(element, this.classes);
    }
    return this.showing;
  }

  private hiding?: Promise<void>;

  private async _hide(element: HTMLElement, classes?: TransitionClasses) {
    this.hooks.beforeLeave?.();
    // TODO check for interuption
    await Promise.all([...this.children].map((state) => state.hide()));

    if (classes) {
      removeClassList(element, classes.entered);
    }
    this.hooks.onTransition?.('leave-from');
    if (classes) {
      addClassList(element, classes.leave);
      addClassList(element, classes.leaveFrom);
    }
    await waitForTransition(element);

    if (classes) {
      removeClassList(element, classes.leaveFrom);
    }
    this.hooks.onTransition?.('leave-to');
    if (classes) {
      addClassList(element, classes.leaveTo);
    }
    await waitForTransition(element);
    if (classes) {
      removeClassList(element, classes.leave);
      removeClassList(element, classes.leaveTo);
    }
    this.hooks.afterLeave?.();

    this.hiding = undefined;
  }

  async hide() {
    const element = this.element;
    if (!element || this.showing) {
      return;
    }
    if (!this.hiding) {
      this.hiding = this._hide(element, this.classes);
    }
    return this.hiding;
  }
}
