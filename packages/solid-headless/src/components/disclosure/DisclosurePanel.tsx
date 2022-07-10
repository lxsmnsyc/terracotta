import {
  Show,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
import {
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useDisclosureContext,
} from './DisclosureContext';

export type DisclosurePanelProps<T extends ValidConstructor = 'div'> =
  HeadlessProps<T, HeadlessDisclosureChildProps & { unmount?: boolean }>;

export function DisclosurePanel<T extends ValidConstructor = 'div'>(
  props: DisclosurePanelProps<T>,
): JSX.Element {
  const context = useDisclosureContext('DisclosurePanel');
  const properties = useHeadlessDisclosureProperties();
  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'unmount',
            'children',
          ])}
          id={context.panelID}
          data-sh-disclosure-panel={context.ownerID}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      )}
    >
      <Show when={properties.isOpen()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'unmount',
            'children',
          ])}
          id={context.panelID}
          data-sh-disclosure-panel={context.ownerID}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      </Show>
    </Show>
  );
}
