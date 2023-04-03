import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useCommandContext,
} from './CommandContext';
import { COMMAND_LABEL_TAG } from './tags';

export type CommandLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T>;

export function CommandLabel<T extends ValidConstructor = 'label'>(
  props: CommandLabelProps<T>,
): JSX.Element {
  const context = useCommandContext('CommandLabel');

  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, [
        'as',
      ]),
      COMMAND_LABEL_TAG,
      {
        id: context.labelID,
      },
    ) as DynamicProps<T>,
  );
}
