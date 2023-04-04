import {
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
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
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { createExpandedState } from '../../utils/state-props';

export type CommandBarTitleProps<T extends ValidConstructor = 'h2'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function CommandBarTitle<T extends ValidConstructor = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('h2' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      COMMAND_BAR_TITLE_TAG,
      {
        id: context.titleID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createExpandedState(() => state.isOpen()),
    ) as DynamicProps<T>,
  );
}
