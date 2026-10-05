import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createMemo, createSignal, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { DATA_SET_NAMESPACE } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';
import { createMenuKeyboard } from './Menu';
import { createMenuItemFocusNavigator, MenubarContext, MenuContext } from './MenuContext';
import { MENUBAR_TAG } from './tags';

const OWNER_ATTRIBUTE = `${DATA_SET_NAMESPACE}-owner`;

interface MenubarItem {
  element: HTMLElement;
  disabled: () => boolean;
}

export type MenubarProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  { horizontal?: boolean }
>;

/**
 * A list of actions that stays on screen. It takes `MenuItem`s like a `Menu`,
 * but it is one stop in the tab sequence: <kbd>Tab</kbd> moves focus to the
 * last focused item, or to the first enabled one, and the arrow keys move from
 * there.
 *
 * Horizontal by default, so <kbd>Left</kbd> and <kbd>Right</kbd> move between
 * items. Pass `horizontal={false}` for <kbd>Up</kbd> and <kbd>Down</kbd>.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function Menubar<T extends ValidComponent = 'div'>(props: MenubarProps<T>): JSX.Element {
  const controller = createMenuItemFocusNavigator();
  const controllerId = controller.getId();

  const [ref, setRef] = createForwardRef(props);
  const [items, setItems] = createSignal<MenubarItem[]>([]);
  const [focused, setFocused] = createSignal<HTMLElement>();

  // The focused item keeps the tab stop, so Tab returns to it. Before any item
  // has focus, or once it is removed, the first enabled item has it.
  const stop = createMemo((): HTMLElement | undefined => {
    const list = items();
    const current = focused();
    if (current && list.some((item) => item.element === current)) {
      return current;
    }
    const sorted = [...list].sort((a, b) =>
      a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    return (sorted.find((item) => !item.disabled()) ?? sorted.at(0))?.element;
  });

  const isHorizontal = (): boolean => props.horizontal ?? true;

  createMenuKeyboard(ref, controller, {
    orientation: () => (isHorizontal() ? 'horizontal' : 'vertical'),
  });

  // The focused item keeps the tab stop, so Tab returns to it.
  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      return useEventListener(current, 'focusin', (e) => {
        const target = e.target;
        if (
          target instanceof HTMLElement &&
          target.getAttribute(OWNER_ATTRIBUTE) === controllerId
        ) {
          setFocused(target);
        }
      });
    }
    return undefined;
  });

  const rest = omit(props, 'as', 'horizontal', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <MenuContext value={controller}>
      <MenubarContext
        value={{
          stop,
          register(element, disabled): () => void {
            const item = { element, disabled };
            setItems((list) => [...list, item]);
            return () => {
              setItems((list) => list.filter((entry) => entry !== item));
            };
          },
        }}
      >
        <Root
          {...MENUBAR_TAG}
          id={controllerId}
          role="menubar"
          aria-orientation={isHorizontal() ? 'horizontal' : 'vertical'}
          ref={setRef}
          {...rest}
        />
      </MenubarContext>
    </MenuContext>
  );
}
