import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import type { SplitterStateRenderProps } from './SplitterContext';
import { SplitterStateChild, useSplitterContext } from './SplitterContext';
import { SPLITTER_PANE_TAG } from './tags';

export type SplitterPaneProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  SplitterStateRenderProps
>;

/**
 * The primary pane, whose size is the splitter's value. The separator points
 * `aria-controls` at it. The other pane needs no component.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/splitter.md}
 */
export function SplitterPane<T extends ValidComponent = 'div'>(
  props: SplitterPaneProps<T>,
): JSX.Element {
  const context = useSplitterContext('SplitterPane');
  context.pane.register(() => props.id);

  const rest = omit(props, 'as', 'children');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...SPLITTER_PANE_TAG}
      id={props.id ?? context.pane.id()}
      tc-collapsed={context.state.collapsed() ? '' : undefined}
      {...rest}
    >
      <SplitterStateChild>{props.children}</SplitterStateChild>
    </Root>
  );
}
