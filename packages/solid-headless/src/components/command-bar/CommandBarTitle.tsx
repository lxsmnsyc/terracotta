import {
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
  DynamicComponent,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useCommandBarContext,
} from './CommandBarContext';

export type CommandBarTitleProps<T extends ValidConstructor = 'h2'> =
  & DynamicComponent<T>
  & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function CommandBarTitle<T extends ValidConstructor = 'h2'>(
  props: CommandBarTitleProps<T>,
): JSX.Element {
  const context = useCommandBarContext('CommandBarTitle');
  return (
    <Dynamic
      component={(props.as ?? 'h2') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.titleID}
      data-sh-command-bar-title={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}
