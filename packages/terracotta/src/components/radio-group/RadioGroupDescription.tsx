import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
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
  context.description.register();

  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'div');
  return <Root {...RADIO_GROUP_DESCRIPTION_TAG} id={context.descriptionID} {...rest} />;
}
