import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type { DynamicProps, HeadlessProps, ValidConstructor } from '../../utils/dynamic-prop';
import { useRadioGroupContext } from './RadioGroupContext';
import { RADIO_GROUP_LABEL_TAG } from './tags';

export type RadioGroupLabelProps<T extends ValidConstructor = 'label'> = HeadlessProps<T>;

/**
 * The accessible name of a `RadioGroup` or of one `RadioGroupOption`,
 * depending on which it is nested in. Wired up through `aria-labelledby`.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
export function RadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');

  return createDynamic(
    () => props.as ?? ('label' as T),
    mergeProps(
      RADIO_GROUP_LABEL_TAG,
      {
        id: context.labelID,
      },
      omitProps(props, ['as']),
    ) as DynamicProps<T>,
  );
}
