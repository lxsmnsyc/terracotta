import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
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
      omit(props, 'as'),
    ) as ComponentProps<T>,
  );
}
