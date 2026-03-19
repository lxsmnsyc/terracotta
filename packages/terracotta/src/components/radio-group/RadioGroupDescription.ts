import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { merge } from 'solid-js';
import { omitProps } from 'solid-use/props';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_DESCRIPTION_TAG } from './tags';

export type RadioGroupDescriptionProps<T extends ValidComponent = 'div'> =
  HeadlessProps<T>;

export function RadioGroupDescription<T extends ValidComponent = 'div'>(
  props: RadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupDescription');

  return createDynamic(
    () => props.as || ('div' as T),
    merge(
      RADIO_GROUP_DESCRIPTION_TAG,
      {
        id: context.descriptionID,
      },
      omitProps(props, ['as']),
    ) as ComponentProps<T>,
  );
}
