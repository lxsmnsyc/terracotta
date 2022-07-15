import {
  JSX, mergeProps,
} from 'solid-js';
import { omitProps } from 'solid-use';
import {
  createHeadlessSelectOptionProps,
  HeadlessSelectOptionProps, useHeadlessSelectProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  DynamicProps,
  HeadlessProps,
} from '../../utils/dynamic-prop';
import { createUnmountable } from '../../utils/Unmountable';
import {
  useTabGroupContext,
} from './TabGroupContext';
import { TAB_PANEL_TAG } from './tags';

interface TabPanelBaseProps<V> extends Exclude<HeadlessSelectOptionProps<V>, 'disabled'> {
  unmount?: boolean;
}

export type TabPanelProps<V, T extends ValidConstructor = 'div'> =
  HeadlessProps<T, TabPanelBaseProps<V>>;

export function TabPanel<V, T extends ValidConstructor = 'div'>(
  props: TabPanelProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('TabPanel');
  const properties = useHeadlessSelectProperties<V>();

  return createUnmountable(
    props,
    () => properties.isSelected(props.value),
    () => createDynamic(
      () => props.as ?? ('div' as T),
      mergeProps(
        omitProps(props, ['as', 'children', 'disabled', 'unmount', 'value']),
        TAB_PANEL_TAG,
        {
          role: 'tabpanel',
          get tabindex() {
            return properties.isSelected(props.value) ? 0 : -1;
          },
          get id() {
            return rootContext.getId('tab-panel', props.value);
          },
          get 'aria-labelledby'() {
            return rootContext.getId('tab', props.value);
          },
        },
        createHeadlessSelectOptionProps(props),
      ) as DynamicProps<T>,
    ),
  );
}
