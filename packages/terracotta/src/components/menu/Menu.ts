import {
  createComponent,
  mergeProps,
  JSX,
  createEffect,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createMenuItemFocusNavigator,
  MenuContext,
} from './MenuContext';
import { MENU_TAG } from './tags';

export type MenuProps<T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T>;

export function Menu<T extends ValidConstructor = 'ul'>(
  props: MenuProps<T>,
): JSX.Element {
  const controller = createMenuItemFocusNavigator();

  const [ref, setRef] = createForwardRef(props);

  createEffect(() => {
    const current = ref();
    if (current) {
      controller.setRef(current);
    }
  });

  return createComponent(MenuContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref']),
          MENU_TAG,
          {
            id: controller.getId(),
            role: 'menu',
            ref: setRef,
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
