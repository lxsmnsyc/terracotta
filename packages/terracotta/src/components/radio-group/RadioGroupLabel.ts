import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_LABEL_TAG } from './tags';

export type RadioGroupLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T>;

export function RadioGroupLabel<T extends ValidComponent = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');

  return createDynamic(
    () => props.as || ('label' as T),
    merge(
      RADIO_GROUP_LABEL_TAG,
      {
        id: context.labelID,
      },
      omitProps(props, ['as']),
    ) as ComponentProps<T>,
  );
}
