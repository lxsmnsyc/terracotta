import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useCommandContext } from './CommandContext';
import { COMMAND_LABEL_TAG } from './tags';

export type CommandLabelProps<T extends ValidComponent = 'label'> = HeadlessProps<T>;

/**
 * The accessible name of a `Command`, wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/command.md}
 */
export function CommandLabel<T extends ValidComponent = 'label'>(
  props: CommandLabelProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandLabel');
  const state = useAutocompleteState();

  // The input and the list only point at the label while it is mounted.
  context.registerLabel();

  const rest = omit(props, 'as');
  const disabledState = createDisabledState(() => state.disabled());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasQueryState = createHasQueryState(() => state.hasQuery());
  const Root = dynamic(() => props.as || 'label');
  return (
    <Root
      {...rest}
      {...COMMAND_LABEL_TAG}
      id={context.labelID}
      {...disabledState}
      {...hasSelectedState}
      {...hasActiveState}
      {...hasQueryState}
    />
  );
}
