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
import { COMMAND_BAR_DESCRIPTION_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import {
  createDisabledState,
  createExpandedState,
} from '../../utils/state-props';

export type CommandBarDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, DisclosureStateRenderProps>;

export function CommandBarDescription<T extends ValidConstructor = 'p'>(
  props: CommandBarDescriptionProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarDescription');
  const state = useDisclosureState();
  return createDynamic(
    () => props.as || ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      COMMAND_BAR_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(DisclosureStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      createExpandedState(() => state.isOpen()),
    ) as DynamicProps<T>,
  );
}
