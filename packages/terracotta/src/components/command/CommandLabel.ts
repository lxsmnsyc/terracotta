import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { merge, omit } from 'solid-js';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useCommandContext } from './CommandContext';
import { COMMAND_LABEL_TAG } from './tags';

export type CommandLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T>;

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

  return createDynamic(
    () => props.as || ('label' as T),
    merge(
      omit(props, 'as'),
      COMMAND_LABEL_TAG,
      {
        id: context.labelID,
      },
      createDisabledState(() => state.disabled()),
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
    ) as ComponentProps<T>,
  );
}
