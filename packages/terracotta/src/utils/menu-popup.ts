import { DISABLED_NODE } from './namespace';

/**
 * Behaviour a popup panel takes on when it holds a `Menu`, following the
 * ARIA menu pattern. `Popover` and `ContextMenu` use it.
 */

const MENU_ITEM = ['menuitem', 'menuitemcheckbox', 'menuitemradio']
  .map((role) => `[role="${role}"]:not(${DISABLED_NODE}):not([aria-disabled="true"])`)
  .join(', ');

/** Whether the panel holds a menu. */
export function hasMenu(panel: HTMLElement): boolean {
  return panel.querySelector('[role="menu"]') != null;
}

/**
 * Focuses the first enabled menu item in the panel, or the last one when
 * `last` is set. Menu items sit at `tabindex="-1"`, so the focusable query
 * skips them. Returns whether an item took focus.
 */
export function focusMenuItem(panel: HTMLElement, last = false): boolean {
  const items = Array.from(panel.querySelectorAll<HTMLElement>(MENU_ITEM));
  const item = last ? items.at(-1) : items.at(0);
  if (item) {
    item.focus();
    return true;
  }
  return false;
}

/**
 * Whether a click inside the panel activated a menu item. Activating an item
 * closes the menu. An item that opens a submenu does not count.
 */
export function isMenuItemActivation(panel: HTMLElement, target: EventTarget | null): boolean {
  if (target instanceof Element) {
    const item = target.closest('[role="menuitem"]');
    return (
      item != null &&
      panel.contains(item) &&
      !item.matches(DISABLED_NODE) &&
      !item.hasAttribute('aria-haspopup')
    );
  }
  return false;
}
