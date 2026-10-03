import type { JSX, ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import { Button, type ButtonProps } from '../button';
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

  const ownerAttribute = createOwnerAttribute(context.getId());
  const disabledState = createDisabledState(() => props.disabled);
  const ariaDisabledState = createARIADisabledState(() => props.disabled);
  const rest = omit(props, 'as', 'disabled', 'ref', 'children') as ButtonProps<T>;
  return (
    <Button
      {...MENU_ITEM_TAG}
      {...ownerAttribute}
      as={props.as || ('li' as T)}
      role="menuitem"
      tabindex={-1}
      ref={setInternalRef}
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
    >
      <MenuChild disabled={props.disabled}>{props.children}</MenuChild>
    </Button>
  );
}
