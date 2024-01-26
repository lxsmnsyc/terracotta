import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps, onCleanup } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { AutocompleteStateRenderProps } from '../../states/create-autocomplete-state';
import {
  AutocompleteStateChild,
  useAutocompleteState,
} from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';
import { useCommandContext } from './CommandContext';
import { COMMAND_OPTIONS_TAG } from './tags';

export type CommandOptionsProps<
  V,
  T extends ValidConstructor = 'ul',
> = HeadlessPropsWithRef<T, AutocompleteStateRenderProps<V>>;

export function CommandOptions<V, T extends ValidConstructor = 'ul'>(
  props: CommandOptionsProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOptions');
  const state = useAutocompleteState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      onCleanup(() => {
        context.controller.clearRef();
      });
      useEventListener(current, 'focusin', () => {
        if (context.anchor) {
          context.anchor.focus();
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

  return createDynamic(
    () => props.as || ('ul' as T),
    mergeProps(
      omitProps(props, ['as', 'children', 'ref']),
      COMMAND_OPTIONS_TAG,
      {
        id: context.optionsID,
        role: 'listbox',
        'aria-multiselectable': context.multiple,
        ref: setInternalRef,
        // TODO should Command support "horizontal"?
        'aria-orientation': 'vertical',
        tabindex: -1,
      },
      createDisabledState(() => state.disabled()),
      createARIADisabledState(() => state.disabled()),
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
      {
        get children() {
          return createComponent(AutocompleteStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
