import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps, onCleanup } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import createTypeAhead from '../../utils/create-type-ahead';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import useEventListener from '../../utils/use-event-listener';
import { MenuContext, createMenuItemFocusNavigator } from './MenuContext';
import { MENU_TAG } from './tags';

export type MenuProps<T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T>;

export function Menu<T extends ValidConstructor = 'ul'>(
  props: MenuProps<T>,
): JSX.Element {
  const controller = createMenuItemFocusNavigator();

  const [ref, setRef] = createForwardRef(props);

  const pushCharacter = createTypeAhead(value => {
    controller.setFirstMatch(value);
  });

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      onCleanup(() => {
        controller.clearRef();
      });

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
      });
      useEventListener(current, 'focusin', e => {
        if (e.target && e.target !== current) {
          controller.setCurrent(e.target as HTMLElement);
        }
      });
    }
  });

  return createComponent(MenuContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(omitProps(props, ['as', 'ref']), MENU_TAG, {
          id: controller.getId(),
          role: 'menu',
          ref: setRef,
        }) as DynamicProps<T>,
      );
    },
  });
}
