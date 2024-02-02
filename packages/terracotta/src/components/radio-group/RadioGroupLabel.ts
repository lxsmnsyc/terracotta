import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_LABEL_TAG } from './tags';

export type RadioGroupLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T>;

export function RadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');

  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(omitProps(props, ['as']), RADIO_GROUP_LABEL_TAG, {
      id: context.labelID,
    }) as DynamicProps<T>,
  );
}
