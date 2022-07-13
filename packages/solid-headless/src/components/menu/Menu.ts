import {
  createComponent,
  mergeProps,
  JSX,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createMenuItemFocusNavigator,
  MenuContext,
} from './MenuContext';

export type MenuProps<T extends ValidConstructor = 'ul'> = HeadlessPropsWithRef<T>;

export function Menu<T extends ValidConstructor = 'ul'>(
  props: MenuProps<T>,
): JSX.Element {
  const controller = createMenuItemFocusNavigator();

  return createComponent(MenuContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref']),
          {
            id: controller.getId(),
            'data-sh-menu': controller.getId(),
            role: 'menu',
            ref: createRef(props, (e) => {
              controller.setRef(e);
            }),
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
