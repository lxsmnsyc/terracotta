import { isServer } from '@solidjs/web';
import type { Accessor } from 'solid-js';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import type { DisclosureStateProperties } from '../states/create-disclosure-state';
import { createDependencyList } from './create-dependency-list';
import { focusFirst } from './focus-navigation';
import getFocusableElements from './focus-query';
import useFocusStartPoint from './use-focus-start-point';
import { afterTransition } from './wait-for-transition';

/**
 * Behaviour shared by the modal components: `Dialog`, `AlertDialog` and
 * `CommandBar`.
 */

/**
 * How many open modals made this element inert. It is kept on the element, not
 * in a module-level map. Each entry point bundles its own copy of this module,
 * and a `Dialog` and an `AlertDialog` open at once still have to agree on it.
 */
const INERT_COUNT = Symbol.for('terracotta.inert-count');

interface InertTracked {
  [INERT_COUNT]?: number;
}

/**
 * A closed modal kept mounted with `unmount={false}` marks itself `inert`
 * through its own props. Releasing must leave that in place.
 */
const CLOSED_MODAL = [
  '[tc-dialog]:not([tc-expanded])',
  '[tc-alert-dialog]:not([tc-expanded])',
  '[tc-command-bar]:not([tc-expanded])',
].join(', ');

/**
 * A live region outside the modal is left alone. Making it inert would silence
 * the toasts and alerts it announces while the modal is open.
 */
const LIVE_REGION = '[aria-live], [role="status"], [role="alert"], [role="log"]';

function claim(el: HTMLElement, claimed: HTMLElement[]): void {
  const tracked = el as HTMLElement & InertTracked;
  const count = tracked[INERT_COUNT] ?? 0;
  if (count === 0) {
    // Inert content that this module did not mark belongs to someone else.
    if (el.hasAttribute('inert') || el.matches(LIVE_REGION)) {
      return;
    }
    // A live region deeper inside, such as a `Toaster` in the app root, is
    // kept out by marking the children around it instead.
    if (el.querySelector(LIVE_REGION)) {
      for (const child of Array.from(el.children)) {
        if (child instanceof HTMLElement) {
          claim(child, claimed);
        }
      }
      return;
    }
    el.setAttribute('inert', '');
  }
  tracked[INERT_COUNT] = count + 1;
  claimed.push(el);
}

function release(el: HTMLElement): void {
  const tracked = el as HTMLElement & InertTracked;
  const count = (tracked[INERT_COUNT] ?? 1) - 1;
  if (count > 0) {
    tracked[INERT_COUNT] = count;
    return;
  }
  tracked[INERT_COUNT] = 0;
  if (!el.matches(CLOSED_MODAL)) {
    el.removeAttribute('inert');
  }
}

/**
 * Marks everything outside `modal` as `inert`, as `aria-modal` asks for. It
 * walks from `modal` up to `<body>` and marks the siblings at each level, so
 * it works wherever the modal is rendered, portal or not.
 *
 * Returns a function that undoes it. Each element counts how many modals
 * claimed it, so stacked modals can close in any order.
 */
export function inertOutside(modal: HTMLElement): () => void {
  const claimed: HTMLElement[] = [];
  let current: HTMLElement = modal;
  while (current !== document.body && current.parentElement) {
    const parent: HTMLElement = current.parentElement;
    for (const sibling of Array.from(parent.children)) {
      if (sibling !== current && sibling instanceof HTMLElement) {
        claim(sibling, claimed);
      }
    }
    current = parent;
  }
  return () => {
    for (const el of claimed) {
      release(el);
    }
  };
}

/**
 * Moves focus into an open panel. A panel with nothing focusable inside gets
 * `tabindex="-1"` and takes focus itself, so its <kbd>Escape</kbd> and
 * <kbd>Tab</kbd> handling still runs.
 *
 * Returns a function that removes the `tabindex` again if this added it.
 */
export function focusPanel(panel: HTMLElement): () => void {
  if (focusFirst(getFocusableElements(panel), false)) {
    return () => {
      // nothing to undo
    };
  }
  const added = !panel.hasAttribute('tabindex');
  if (added) {
    panel.setAttribute('tabindex', '-1');
  }
  panel.focus();
  return () => {
    if (added) {
      panel.removeAttribute('tabindex');
    }
  };
}

/**
 * Runs {@link focusPanel} once the panel has finished its enter transition.
 * Returns a function that cancels a pending focus and undoes a finished one.
 */
export function focusPanelAfterTransition(panel: HTMLElement): () => void {
  let active = true;
  let undo: (() => void) | undefined;
  afterTransition(panel, () => {
    if (active) {
      undo = focusPanel(panel);
    }
  });
  return () => {
    active = false;
    if (undo) {
      undo();
    }
  };
}

/**
 * The id of the title or description that is currently mounted. The modal
 * points `aria-labelledby` and `aria-describedby` at it, and leaves them out
 * while nothing is mounted, so they never point at a missing element.
 */
export interface MountedID {
  id: Accessor<string | undefined>;
  register: (id: Accessor<string>) => void;
}

export function createMountedID(fallback: string): MountedID {
  // Titles register once they have mounted, which never happens on the server.
  // The server assumes the part is there and points at its generated id.
  if (isServer) {
    return { id: () => fallback, register: () => undefined };
  }
  const [id, setID] = createSignal<string | undefined>();
  return {
    id,
    register(source) {
      createEffect(source, (current) => {
        setID(current);
        return () => {
          setID((previous) => (previous === current ? undefined : previous));
        };
      });
    },
  };
}

/**
 * Saves the focused element when the modal opens and focuses it again when it
 * closes. While the modal is open, everything outside it is `inert`.
 *
 * Both run from one effect because the order matters. The focused element is
 * saved before the page around it turns inert, and the page is no longer inert
 * when focus moves back to it.
 */
export function createModalFocus(state: DisclosureStateProperties, root: Accessor<unknown>): void {
  let inertRoot: HTMLElement | undefined;
  let releaseInert: (() => void) | undefined;

  function restore(): void {
    if (releaseInert) {
      releaseInert();
    }
    releaseInert = undefined;
    inertRoot = undefined;
  }

  const fsp = useFocusStartPoint();
  // Cleanups run in reverse order. Registered after the focus start point, this
  // runs first on unmount, so the page is no longer inert when focus returns.
  onCleanup(restore);
  let saved = false;

  createEffect(
    createDependencyList(() => [state.isOpen(), root()] as const),
    ([isOpen, current]) => {
      if (isOpen) {
        if (!saved) {
          fsp.save();
          saved = true;
        }
        if (current instanceof HTMLElement && current !== inertRoot) {
          restore();
          inertRoot = current;
          // A modal inside a `Portal` can reach the document a moment after
          // this runs, and there is no page around it to mark before then.
          if (current.isConnected) {
            releaseInert = inertOutside(current);
          } else {
            queueMicrotask(() => {
              if (inertRoot === current && !releaseInert && current.isConnected) {
                releaseInert = inertOutside(current);
              }
            });
          }
        }
      } else {
        restore();
        saved = false;
        fsp.load();
      }
    },
  );
}
