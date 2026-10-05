import { type Accessor, createContext, createUniqueId, useContext } from 'solid-js';
import assert from '../../utils/assert';
import FocusNavigator from '../../utils/focus-navigator';

export const MenuContext = createContext<FocusNavigator | null>(null);

/**
 * Reads the nearest `Menu`'s internal context, which holds the focus navigator
 * shared by its items. Throws when called outside a `Menu`.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function useMenuContext(componentName: string): FocusNavigator {
  const context = useContext(MenuContext);
  assert(context, new Error(`<${componentName}> must be used inside a <Menu>`));
  return context;
}

export function createMenuItemFocusNavigator(): FocusNavigator {
  return new FocusNavigator(createUniqueId());
}

/**
 * The roving tab stop of a `Menubar`. Exactly one of its items has
 * `tabindex="0"`, so the menubar is one stop in the tab sequence.
 */
export interface MenubarTabStop {
  /** The item that has `tabindex="0"`. */
  stop: Accessor<HTMLElement | undefined>;
  /** Adds an item until the returned function is called. */
  register: (element: HTMLElement, disabled: () => boolean) => () => void;
}

/**
 * Set by `Menubar`, and reset to `null` by a `Menu` inside it, so only the
 * menubar's own items take part in the tab sequence.
 */
export const MenubarContext = createContext<MenubarTabStop | null>(null);
