import {
  createComponent,
  mergeProps,
  JSX,
  createEffect,
  onCleanup,
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

  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            controller.setPrevChecked(true);
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            controller.setNextChecked(true);
            break;
          case 'Home':
            e.preventDefault();
            controller.setFirstChecked();
            break;
          case 'End':
            e.preventDefault();
            controller.setLastChecked();
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            break;
          default:
            if (e.key.length === 1) {
              characters = `${characters}${e.key}`;
              if (timeout) {
                clearTimeout(timeout);
              }
              timeout = setTimeout(() => {
                controller.setFirstMatch(characters);
                characters = '';
              }, 100);
            }
            break;
        }
      };

      const onFocusIn = (e: FocusEvent) => {
        if (e.target && e.target !== current) {
          controller.setCurrent(e.target as HTMLElement);
        }
      };

      current.addEventListener('keydown', onKeyDown);
      current.addEventListener('focusin', onFocusIn);
      onCleanup(() => {
        current.removeEventListener('keydown', onKeyDown);
        current.removeEventListener('focusin', onFocusIn);
      });
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
