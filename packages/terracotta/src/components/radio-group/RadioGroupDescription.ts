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
import { RADIO_GROUP_DESCRIPTION_TAG } from './tags';

export type RadioGroupDescriptionProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T>;

export function RadioGroupDescription<T extends ValidConstructor = 'div'>(
  props: RadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupDescription');

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(omitProps(props, ['as']), RADIO_GROUP_DESCRIPTION_TAG, {
      id: context.descriptionID,
    }) as DynamicProps<T>,
  );
}
