import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  createHeadlessDisclosureChildProps,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useCommandBarContext,
} from './CommandBarContext';
import { COMMAND_BAR_TITLE_TAG } from './tags';

export type CommandBarTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessProps<T, HeadlessDisclosureChildProps>;

export function CommandBarTitle<T extends ValidConstructor = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  return createDynamic(
    () => props.as ?? ('h2' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      COMMAND_BAR_TITLE_TAG,
      {
        id: context.titleID,
      },
      createHeadlessDisclosureChildProps(props),
    ) as DynamicProps<T>,
  );
}
