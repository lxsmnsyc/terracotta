import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_LABEL_TAG } from './tags';

export type RadioGroupLabelProps<T extends ValidComponent = 'label'> =
  HeadlessProps<T>;

/**
 * The accessible name of a `RadioGroup` or of one `RadioGroupOption`,
 * depending on which it is nested in. Wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
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
      omit(props, 'as'),
    ) as ComponentProps<T>,
  );
}
