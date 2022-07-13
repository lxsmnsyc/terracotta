import {
  JSX, mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useRadioGroupContext,
} from './RadioGroupContext';

export type RadioGroupLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T>;

export function RadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');

  return createDynamic(
    () => props.as ?? ('label' as T),
    mergeProps(
      omitProps(props, ['as']),
      {
        id: context.labelID,
      },
    ) as DynamicProps<T>,
  );
}
