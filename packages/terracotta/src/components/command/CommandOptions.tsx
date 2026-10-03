import { Dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { AutocompleteStateRenderProps } from '../../states/create-autocomplete-state';
import {
  AutocompleteStateChild,
  useAutocompleteState,
} from '../../states/create-autocomplete-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
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

export type CommandOptionsProps<V, T extends ValidComponent = 'ul'> = HeadlessPropsWithRef<
  T,
  AutocompleteStateRenderProps<V>
>;

/**
 * The list of results in a `Command`.
 *
 * Renders a `<ul>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command.md}
 */
export function CommandOptions<V, T extends ValidComponent = 'ul'>(
  props: CommandOptionsProps<V, T>,
): JSX.Element {
  const context = useCommandContext('CommandOptions');
  const state = useAutocompleteState();

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      context.controller.setRef(current);
      context.optionsHovering = false;
      return mergeFunc(
        () => {
          context.controller.clearRef();
        },
        useEventListener(current, 'focusin', () => {
          if (context.anchor) {
            context.anchor.focus();
          }
        }),
        useEventListener(current, 'mouseenter', () => {
          context.optionsHovering = true;
        }),
        useEventListener(current, 'mouseleave', () => {
          context.optionsHovering = false;
        }),
        () => {
          context.optionsHovering = false;
        },
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  const rest = omit(props, 'as', 'children', 'ref');
  return (
    <Dynamic
      component={props.as || 'ul'}
      {...COMMAND_OPTIONS_TAG}
      id={context.optionsID}
      role="listbox"
      aria-multiselectable={context.multiple ? 'true' : 'false'}
      ref={setInternalRef}
      aria-orientation="vertical"
      tabindex={-1}
      {...disabledState}
      {...ariaDisabledState}
      {...hasSelectedState}
      {...hasActiveState}
      {...hasQueryState}
      {...rest}
    >
      <AutocompleteStateChild>{props.children}</AutocompleteStateChild>
    </Dynamic>
  );
}
