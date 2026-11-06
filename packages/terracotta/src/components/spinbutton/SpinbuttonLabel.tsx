import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { useSpinbuttonContext } from './SpinbuttonContext';
import { SPINBUTTON_LABEL_TAG } from './tags';

export type SpinbuttonLabelProps<T extends ValidComponent = 'label'> = HeadlessPropsWithRef<T>;

/**
 * The visible label of a `Spinbutton`. The field points `aria-labelledby` at
 * it, and clicking it focuses the field.
 *
 * Renders a `<label>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/spinbutton.md}
 */
export function SpinbuttonLabel<T extends ValidComponent = 'label'>(
  props: SpinbuttonLabelProps<T>,
): JSX.Element {
  const context = useSpinbuttonContext('SpinbuttonLabel');
  context.label.register();

  const rest = omit(props, 'as');
  const Root = dynamic(() => props.as || 'label');
  return <Root {...SPINBUTTON_LABEL_TAG} id={context.labelID} for={context.inputID} {...rest} />;
}
