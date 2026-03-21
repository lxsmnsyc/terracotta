import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import { useDisclosureState } from '../../states/create-disclosure-state';
import type { SelectStateRenderProps } from '../../states/create-select-state';
import {
  SelectStateProvider,
  useSelectState,
} from '../../states/create-select-state';
import { createDependencyList } from '../../utils/create-dependency-list';
import createTypeAhead from '../../utils/create-type-ahead';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
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
import { waitForTransition } from '../../utils/wait-for-transition';
import { useListboxContext } from './ListboxContext';
import {
  createListboxOptionsFocusNavigator,
  ListboxOptionsContext,
} from './ListboxOptionsContext';
import { LISTBOX_OPTIONS_TAG } from './tags';

export type ListboxOptionsBaseProps<V> = Prettify<
  UnmountableProps & SelectStateRenderProps<V>
>;

export type ListboxOptionsProps<
  V,
  T extends ValidComponent = 'ul',
> = HeadlessPropsWithRef<T, ListboxOptionsBaseProps<V>>;

export function ListboxOptions<V, T extends ValidComponent = 'ul'>(
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
  createEffect(
    createDependencyList(() => [internalRef(), disclosureState.isOpen()]),
    ([current, isOpen]) => {
      if (current instanceof HTMLElement && isOpen) {
        controller.setRef(current);

        waitForTransition(current).then(() => {
          if (selectState.hasSelected()) {
            controller.setFirstChecked(SELECTED_NODE);
          } else {
            controller.setFirstChecked();
          }
        });

        return mergeFunc(
          () => {
            controller.clearRef();
          },

          useEventListener(current, 'keydown', e => {
            if (!selectState.disabled()) {
              switch (e.key) {
                case 'Escape': {
                  disclosureState.close();
                  break;
                }
                case 'ArrowLeft': {
                  if (context.isHorizontal()) {
                    e.preventDefault();
                    controller.setPrevChecked(true);
                  }
                  break;
                }
                case 'ArrowUp': {
                  if (!context.isHorizontal()) {
                    e.preventDefault();
                    controller.setPrevChecked(true);
                  }
                  break;
                }
                case 'ArrowRight': {
                  if (context.isHorizontal()) {
                    e.preventDefault();
                    controller.setNextChecked(true);
                  }
                  break;
                }
                case 'ArrowDown': {
                  if (!context.isHorizontal()) {
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
          }),
          useEventListener(current, 'focusout', e => {
            if (context.buttonHovering || context.optionsHovering) {
              return;
            }
            if (
              !(e.relatedTarget && current.contains(e.relatedTarget as Node))
            ) {
              disclosureState.close();
            }
          }),
          useEventListener(current, 'focusin', e => {
            if (e.target && e.target !== current) {
              controller.setCurrent(e.target as HTMLElement);
            }
          }),
          useEventListener(current, 'mouseenter', () => {
            context.optionsHovering = true;
          }),
          useEventListener(current, 'mouseleave', () => {
            context.optionsHovering = false;
          }),
        );
      }
      return undefined;
    },
  );

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () =>
      createComponent(ListboxOptionsContext, {
        value: controller,
        get children() {
          return createDynamic(
            () => props.as || ('ul' as T),
            merge(
              LISTBOX_OPTIONS_TAG,
              {
                id: context.optionsID,
                role: 'listbox',
                'aria-multiselectable': context.multiple,
                'aria-labelledby': context.buttonID,
                ref: setInternalRef,
                get 'aria-orientation'() {
                  return context.isHorizontal() ? 'horizontal' : 'vertical';
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
              omit(props, 'as', 'children', 'ref'),
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
            ) as ComponentProps<T>,
          );
        },
      }),
  );
}
