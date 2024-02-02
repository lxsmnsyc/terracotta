import type { JSX } from 'solid-js';
import { createComponent, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createARIADisabledState,
  createDisabledState,
} from '../../utils/state-props';
import { Button } from '../button';
import type { MenuChildProps } from './MenuChild';
import { MenuChild } from './MenuChild';
import { useMenuContext } from './MenuContext';
import { MENU_ITEM_TAG } from './tags';

export type MenuItemProps<T extends ValidConstructor = 'li'> =
  HeadlessPropsWithRef<T, MenuChildProps>;

export function MenuItem<T extends ValidConstructor = 'li'>(
  props: MenuItemProps<T>,
): JSX.Element {
  const context = useMenuContext('MenuItem');

  return createComponent(
    Button,
    mergeProps(
      omitProps(props, ['as', 'disabled', 'ref', 'children']),
      MENU_ITEM_TAG,
      createOwnerAttribute(context.getId()),
      {
        get as() {
          return props.as || ('li' as T);
        },
        role: 'menuitem',
        tabindex: -1,
      },
      createDisabledState(() => props.disabled),
      createARIADisabledState(() => props.disabled),
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
    ) as DynamicProps<T>,
  );
}
