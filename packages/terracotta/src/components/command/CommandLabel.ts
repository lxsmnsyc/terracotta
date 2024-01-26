import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import { useAutocompleteState } from '../../states/create-autocomplete-state';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createDisabledState,
  createHasActiveState,
  createHasQueryState,
  createHasSelectedState,
} from '../../utils/state-props';
import { useCommandContext } from './CommandContext';
import { COMMAND_LABEL_TAG } from './tags';

export type CommandLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T>;

export function CommandLabel<T extends ValidConstructor = 'label'>(
  props: CommandLabelProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandLabel');
  const state = useAutocompleteState();

  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, ['as']),
      COMMAND_LABEL_TAG,
      {
        id: context.labelID,
      },
      createDisabledState(() => state.disabled()),
      createHasSelectedState(() => state.hasSelected()),
      createHasActiveState(() => state.hasActive()),
      createHasQueryState(() => state.hasQuery()),
    ) as DynamicProps<T>,
  );
}
