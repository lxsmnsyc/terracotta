import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createTypeAhead from '../../utils/create-type-ahead';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import useEventListener from '../../utils/use-event-listener';
import { createMenuItemFocusNavigator, MenuContext } from './MenuContext';
import { MENU_TAG } from './tags';

export type MenuProps<T extends ValidComponent = 'ul'> =
  HeadlessPropsWithRef<T>;

export function Menu<T extends ValidComponent = 'ul'>(
  props: MenuProps<T>,
): JSX.Element {
  const controller = createMenuItemFocusNavigator();

  const [ref, setRef] = createForwardRef(props);

  const pushCharacter = createTypeAhead(value => {
    controller.setFirstMatch(value);
  });

  createEffect(ref, current => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', e => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowLeft': {
              e.preventDefault();
              controller.setPrevChecked(true);
              break;
            }
            case 'ArrowDown':
            case 'ArrowRight': {
              e.preventDefault();
              controller.setNextChecked(true);
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
              if (e.key.length === 1) {
                pushCharacter(e.key);
              }
              break;
            }
          }
        }),
        useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(MenuContext, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          MENU_TAG,
          {
            id: controller.getId(),
            role: 'menu',
            ref: setRef,
          },
          omitProps(props, ['as', 'ref']),
        ) as ComponentProps<T>,
      );
    },
  });
}
