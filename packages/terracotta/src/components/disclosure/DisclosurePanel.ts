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
  createUnmountable,
  UnmountableProps,
} from '../../utils/create-unmountable';
import {
  useDisclosureContext,
} from './DisclosureContext';
import { DISCLOSURE_PANEL_TAG } from './tags';
import {
  DisclosureStateChild,
  DisclosureStateRenderProps,
  useDisclosureState,
} from '../../states/create-disclosure-state';
import { Prettify } from '../../utils/types';
import { createExpandedState } from '../../utils/state-props';

export type DisclosurePanelBaseProps = Prettify<
  & DisclosureStateRenderProps
  & UnmountableProps
>;

export type DisclosurePanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, DisclosurePanelBaseProps>;

export function DisclosurePanel<T extends ValidConstructor = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const state = useDisclosureState();

  return createUnmountable(
    props,
    () => state.isOpen(),
    () => createDynamic(
      () => props.as || ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'unmount',
          'children',
        ]),
        DISCLOSURE_PANEL_TAG,
        {
          id: context.panelID,
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
    ),
  );
}
