import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import { Button } from '../button';
import type { MenuChildProps } from './MenuChild';
import { MenuChild } from './MenuChild';
import { useMenuContext } from './MenuContext';
import { MENU_ITEM_TAG } from './tags';

export type MenuItemProps<T extends ValidComponent = 'li'> = HeadlessPropsWithRef<
  T,
  MenuChildProps
>;

/**
 * One action in a `Menu`. The arrow keys and type-ahead skip disabled items.
 *
 * Renders an `<li>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/menu.md}
 */
export function MenuItem<T extends ValidComponent = 'li'>(props: MenuItemProps<T>): JSX.Element {
  const context = useMenuContext('MenuItem');

  const [, setInternalRef] = createForwardRef(props);

  return createComponent(
    Button,
    merge(
      MENU_ITEM_TAG,
      createOwnerAttribute(context.getId()),
      {
        get as() {
          return props.as || ('li' as T);
        },
        role: 'menuitem',
        tabindex: -1,
        ref: setInternalRef,
      },
      createDisabledState(() => props.disabled),
      createARIADisabledState(() => props.disabled),
      omit(props, 'as', 'disabled', 'ref', 'children'),
      {
        get children() {
          return createComponent(MenuChild, {
            get disabled() {
              return props.disabled;
            },
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as ComponentProps<T>,
  );
}
