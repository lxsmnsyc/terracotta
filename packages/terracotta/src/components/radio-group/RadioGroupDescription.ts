import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_DESCRIPTION_TAG } from './tags';

export type RadioGroupDescriptionProps<T extends ValidComponent = 'div'> = HeadlessProps<T>;

/**
 * The accessible description of a `RadioGroup` or of one `RadioGroupOption`,
 * depending on which it is nested in. Wired up through `aria-describedby`.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
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
