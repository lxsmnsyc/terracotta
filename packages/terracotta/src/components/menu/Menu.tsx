import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import createTypeAhead from '../../utils/create-type-ahead';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { DATA_SET_NAMESPACE, DISABLED_NODE } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';
import type FocusNavigator from '../../utils/focus-navigator';
import { createMenuItemFocusNavigator, MenubarContext, MenuContext } from './MenuContext';
import { MENU_TAG } from './tags';

const OWNER_ATTRIBUTE = `${DATA_SET_NAMESPACE}-owner`;

/**
 * Finds the next enabled item whose text starts with `value`.
 * - A single character searches from the item after the focused one, so
 *   pressing it again moves to the next match.
 * - A longer string searches from the focused item, so it stays put while it
 *   still matches.
 * - The search wraps around to the first item.
 */
function findMatch(root: HTMLElement, ownerID: string, value: string): HTMLElement | undefined {
  const items = Array.from(
    root.querySelectorAll<HTMLElement>(`[${OWNER_ATTRIBUTE}="${ownerID}"]:not(${DISABLED_NODE})`),
  );
  const focused = document.activeElement;
  const index = items.findIndex((item) => item === focused || item.contains(focused));
  let start = 0;
  if (index !== -1) {
    start = value.length === 1 ? index + 1 : index;
  }
  const query = value.toLowerCase();
  for (let i = 0, len = items.length; i < len; i += 1) {
    const item = items[(start + i) % len];
    if (item.textContent.trim().toLowerCase().startsWith(query)) {
      return item;
    }
  }
  return undefined;
}

export interface MenuKeyboardOptions {
  /**
   * Which arrow keys move between items. A menu takes both pairs. A menubar
   * takes only the pair that matches its orientation.
   */
  orientation: () => 'both' | 'horizontal' | 'vertical';
}

/**
 * Wires the keyboard of a menu or menubar root: the arrow keys, Home and End,
 * and type-ahead.
 */
export function createMenuKeyboard(
  ref: () => unknown,
  controller: FocusNavigator,
  options: MenuKeyboardOptions,
): void {
  const pushCharacter = createTypeAhead((value) => {
    const current = ref();
    if (current instanceof HTMLElement) {
      const match = findMatch(current, controller.getId(), value);
      if (match) {
        controller.setChecked(match);
      }
    }
  });

  function accepts(axis: 'horizontal' | 'vertical'): boolean {
    const orientation = options.orientation();
    return orientation === 'both' || orientation === axis;
  }

  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', (e) => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowLeft': {
              if (accepts(e.key === 'ArrowUp' ? 'vertical' : 'horizontal')) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            }
            case 'ArrowDown':
            case 'ArrowRight': {
              if (accepts(e.key === 'ArrowDown' ? 'vertical' : 'horizontal')) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            }
            case 'Home': {
              e.preventDefault();
              controller.setFirstChecked();
              break;
            }
            case 'End': {
              e.preventDefault();
              controller.setLastChecked();
              break;
            }
            case ' ':
            case 'Enter': {
              e.preventDefault();
              break;
            }
            default: {
              // Shortcuts such as Ctrl+C are not type-ahead.
              if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                pushCharacter(e.key);
              }
              break;
            }
          }
        }),
        useEventListener(current, 'focusin', (e) => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });
}

export type MenuProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<T>;

/**
 * A menu of actions, navigated with the arrow keys and type-ahead. It has no
 * open state of its own; put it inside a `Popover` or `ContextMenu` for that.
 *
 * Per the ARIA menu pattern every item sits at `tabindex="-1"`, so the menu has
 * no tab stop. `Popover` and `ContextMenu` move focus to its first item when
 * they open. For a list of actions that stays on screen, use `Menubar`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function Menu<T extends ValidComponent = 'div'>(props: MenuProps<T>): JSX.Element {
  const controller = createMenuItemFocusNavigator();

  const [ref, setRef] = createForwardRef(props);

  createMenuKeyboard(ref, controller, { orientation: () => 'both' });

  const controllerId = controller.getId();
  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <MenuContext value={controller}>
      {/* A menu nested in a menubar keeps its items out of the tab sequence. */}
      <MenubarContext value={null}>
        <Root {...MENU_TAG} id={controllerId} role="menu" ref={setRef} {...rest} />
      </MenubarContext>
    </MenuContext>
  );
}
