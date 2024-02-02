import type { JSX } from 'solid-js';
import {
  createComponent,
  createEffect,
  mergeProps,
  onCleanup,
  onMount,
  untrack,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import { useDisclosureState } from '../../states/create-disclosure-state';
import type { SelectStateRenderProps } from '../../states/create-select-state';
import {
  SelectStateProvider,
  useSelectState,
} from '../../states/create-select-state';
import createDynamic from '../../utils/create-dynamic';
import createTypeAhead from '../../utils/create-type-ahead';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { SELECTED_NODE } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
  createExpandedState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { useListboxContext } from './ListboxContext';
import {
  ListboxOptionsContext,
  createListboxOptionsFocusNavigator,
} from './ListboxOptionsContext';
import { LISTBOX_OPTIONS_TAG } from './tags';

export type ListboxOptionsBaseProps<V> = Prettify<
  UnmountableProps & SelectStateRenderProps<V>
>;

export type ListboxOptionsProps<
  V,
  T extends ValidConstructor = 'ul',
> = HeadlessPropsWithRef<T, ListboxOptionsBaseProps<V>>;

export function ListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useListboxContext('ListboxOptions');
  const selectState = useSelectState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const controller = createListboxOptionsFocusNavigator(context.optionsID);

  const pushCharacter = createTypeAhead(value => {
    controller.setFirstMatch(value);
  });

  // This is a potential bug. The reason is that
  // the ListboxOptions is focusing too early in such
  // a way that the ListboxOption has yet to register
  // the focus event
  onMount(() => {
    createEffect(() => {
      const current = internalRef();
      if (current instanceof HTMLElement && disclosureState.isOpen()) {
        controller.setRef(current);
        onCleanup(() => {
          controller.clearRef();
        });

        if (untrack(() => selectState.hasSelected())) {
          controller.setFirstChecked(SELECTED_NODE);
        } else {
          controller.setFirstChecked();
        }

        useEventListener(current, 'keydown', e => {
          if (!selectState.disabled()) {
            switch (e.key) {
              case 'Escape': {
                disclosureState.close();
                break;
              }
              case 'ArrowLeft': {
                if (context.horizontal) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              }
              case 'ArrowUp': {
                if (!context.horizontal) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              }
              case 'ArrowRight': {
                if (context.horizontal) {
                  e.preventDefault();
                  controller.setNextChecked(true);
                }
                break;
              }
              case 'ArrowDown': {
                if (!context.horizontal) {
                  e.preventDefault();
                  controller.setNextChecked(true);
                }
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
          }
        });
        useEventListener(current, 'focusout', e => {
          if (context.buttonHovering || context.optionsHovering) {
            return;
          }
          if (!(e.relatedTarget && current.contains(e.relatedTarget as Node))) {
            disclosureState.close();
          }
        });
        useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        });
        useEventListener(current, 'mouseenter', () => {
          context.optionsHovering = true;
        });
        useEventListener(current, 'mouseleave', () => {
          context.optionsHovering = false;
        });
      }
    });
  });

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () =>
      createComponent(ListboxOptionsContext.Provider, {
        value: controller,
        get children() {
          return createDynamic(
            () => props.as || ('ul' as T),
            mergeProps(
              omitProps(props, ['as', 'children', 'ref']),
              LISTBOX_OPTIONS_TAG,
              {
                id: context.optionsID,
                role: 'listbox',
                'aria-multiselectable': context.multiple,
                'aria-labelledby': context.buttonID,
                ref: setInternalRef,
                get 'aria-orientation'() {
                  return context.horizontal ? 'horizontal' : 'vertical';
                },
                get tabindex() {
                  return selectState.disabled() ? -1 : 0;
                },
              },
              createDisabledState(() => selectState.disabled()),
              createARIADisabledState(() => selectState.disabled()),
              createExpandedState(() => disclosureState.isOpen()),
              createHasSelectedState(() => selectState.hasSelected()),
              createHasActiveState(() => selectState.hasActive()),
              {
                get children() {
                  return createComponent(SelectStateProvider, {
                    state: selectState,
                    get children() {
                      return props.children;
                    },
                  });
                },
              },
            ) as DynamicProps<T>,
          );
        },
      }),
  );
}
