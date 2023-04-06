import {
  createComponent,
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  SelectStateChild,
  SelectStateRenderProps,
  useSelectState,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { useTabGroupContext } from './TabGroupContext';
import {
  createTabFocusNavigator,
  TabListContext,
} from './TabListContext';
import { TAB_LIST_TAG } from './tags';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createHasSelectedState,
  createHasActiveState,
} from '../../utils/state-props';

export type TabListProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, SelectStateRenderProps<V>>;

export function TabList<V, T extends ValidConstructor = 'div'>(
  props: TabListProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabList');
  const controller = createTabFocusNavigator();
  const state = useSelectState();
  const [ref, setRef] = createForwardRef(props);

  createEffect(() => {
    const current = ref();
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      onCleanup(() => {
        controller.clearRef();
      });

      const onKeyDown = (e: KeyboardEvent) => {
        if (!state.disabled()) {
          switch (e.key) {
            case 'ArrowUp':
              if (!rootContext.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            case 'ArrowLeft':
              if (rootContext.horizontal) {
                e.preventDefault();
                controller.setPrevChecked(true);
              }
              break;
            case 'ArrowDown':
              if (!rootContext.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            case 'ArrowRight':
              if (rootContext.horizontal) {
                e.preventDefault();
                controller.setNextChecked(true);
              }
              break;
            case 'Home':
              e.preventDefault();
              controller.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
              controller.setLastChecked();
              break;
            default:
              break;
          }
        }
      };

      current.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        current.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  createEffect(() => {
    if (!state.hasSelected()) {
      controller.setFirstChecked();
    } else {
      controller.setFirstChecked(SELECTED_NODE);
    }
  });

  return createComponent(TabListContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as', 'ref', 'children']),
          TAB_LIST_TAG,
          {
            role: 'tablist',
            get 'aria-orientation'() {
              return rootContext.horizontal ? 'horizontal' : 'vertical';
            },
            ref: setRef,
            get children() {
              return createComponent(SelectStateChild, {
                get children() {
                  return props.children;
                },
              });
            },
          },
          createHasSelectedState(() => state.hasSelected()),
          createHasActiveState(() => state.hasActive()),
        ) as DynamicProps<T>,
      );
    },
  });
}
