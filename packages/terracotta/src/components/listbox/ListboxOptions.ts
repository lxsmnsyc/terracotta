import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
  untrack,
  onMount,
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
  createDisabledState, createExpandedState, createHasActiveState, createHasSelectedState,
} from '../../utils/state-props';
import {
  useListboxContext,
} from './ListboxContext';
import {
  createListboxOptionsFocusNavigator,
  ListboxOptionsContext,
} from './ListboxOptionsContext';
import { LISTBOX_OPTIONS_TAG } from './tags';
import {
  SelectStateProvider,
  SelectStateRenderProps,
  useSelectState,
} from '../../states/create-select-state';
import { useDisclosureState } from '../../states/create-disclosure-state';
import { SELECTED_NODE } from '../../utils/namespace';
import createTypeAhead from '../../utils/create-type-ahead';
import { Prettify } from '../../utils/types';
import { UnmountableProps, createUnmountable } from '../../utils/create-unmountable';

export type ListboxOptionsBaseProps<V> = Prettify<
  & UnmountableProps
  & SelectStateRenderProps<V>
>;

export type ListboxOptionsProps<V, T extends ValidConstructor = 'ul'> =
  HeadlessPropsWithRef<T, ListboxOptionsBaseProps<V>>;

export function ListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: ListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useListboxContext('ListboxOptions');
  const selectState = useSelectState();
  const disclosureState = useDisclosureState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  const controller = createListboxOptionsFocusNavigator(context.optionsID);

  const pushCharacter = createTypeAhead((value) => {
    controller.setFirstMatch(value);
  });

  // This is a potential bug. The reason is that
  // the ListboxOptions is focusing too early in such
  // a way that the ListboxOption has yet to register
  // the focus event
  onMount(() => {
    createEffect(() => {
      const ref = internalRef();
      if (ref instanceof HTMLElement) {
        controller.setRef(ref);

        if (!untrack(() => selectState.hasSelected())) {
          controller.setFirstChecked();
        } else {
          controller.setFirstChecked(SELECTED_NODE);
        }

        const onKeyDown = (e: KeyboardEvent) => {
          if (!disclosureState.disabled() && e.key === 'Escape') {
            disclosureState.close();
          }
          if (!selectState.disabled()) {
            switch (e.key) {
              case 'ArrowLeft':
                if (context.horizontal) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              case 'ArrowUp':
                if (!context.horizontal) {
                  e.preventDefault();
                  controller.setPrevChecked(true);
                }
                break;
              case 'ArrowRight':
                if (context.horizontal) {
                  e.preventDefault();
                  controller.setNextChecked(true);
                }
                break;
              case 'ArrowDown':
                if (!context.horizontal) {
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
              case ' ':
              case 'Enter':
                e.preventDefault();
                break;
              default:
                if (e.key.length === 1) {
                  pushCharacter(e.key);
                }
                break;
            }
          }
        };
        const onBlur = (e: FocusEvent) => {
          if (context.hovering) {
            return;
          }
          if (!e.relatedTarget || !ref.contains(e.relatedTarget as Node)) {
            disclosureState.close();
          }
        };
        const onFocusIn = (e: FocusEvent) => {
          if (e.target && e.target !== ref) {
            controller.setCurrent(e.target as HTMLElement);
          }
        };
        ref.addEventListener('keydown', onKeyDown);
        ref.addEventListener('focusout', onBlur);
        ref.addEventListener('focusin', onFocusIn);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          ref.removeEventListener('focusin', onFocusIn);
          ref.removeEventListener('focusout', onBlur);
        });
      }
    });
  });

  return createUnmountable(
    props,
    () => disclosureState.isOpen(),
    () => createComponent(ListboxOptionsContext.Provider, {
      value: controller,
      get children() {
        return createDynamic(
          () => props.as || ('ul' as T),
          mergeProps(
            omitProps(props, [
              'as',
              'children',
              'ref',
            ]),
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
