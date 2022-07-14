import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  useHeadlessDisclosureProperties,
  createHeadlessDisclosureChildProps,
} from '../../headless/disclosure';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createUnmountable,
  UnmountableProps,
} from '../../utils/Unmountable';
import {
  useDisclosureContext,
} from './DisclosureContext';
import { DISCLOSURE_PANEL_TAG } from './tags';

export type DisclosurePanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessDisclosureChildProps & UnmountableProps>;

export function DisclosurePanel<T extends ValidConstructor = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const properties = useHeadlessDisclosureProperties();

  return createUnmountable(
    props,
    () => properties.isOpen(),
    () => createDynamic(
      () => props.as ?? ('div' as T),
      mergeProps(
        omitProps(props, [
          'as',
          'unmount',
          'children',
        ]),
        DISCLOSURE_PANEL_TAG,
        {
          id: context.panelID,
        },
        createHeadlessDisclosureChildProps(props),
      ) as DynamicProps<T>,
    ),
  );
}
