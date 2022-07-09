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
  HeadlessSelectOptionChild,
  HeadlessSelectOptionChildProps,
} from '../../headless/select/HeadlessSelectOption';
import {
  useHeadlessSelectOptionProperties,
} from '../../headless/select/useHeadlessSelectOption';
import {
  ValidConstructor,
  DynamicProps,
  DynamicComponent,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import {
  useAccordionItemContext,
} from './AccordionItemContext';

type AccordionPanelBaseProps<T extends ValidConstructor = 'div'> = {
  unmount?: boolean;
}
  & DynamicComponent<T>
  & HeadlessSelectOptionChildProps;

export type AccordionPanelProps<T extends ValidConstructor = 'div'> =
  OmitAndMerge<AccordionPanelBaseProps<T>, DynamicProps<T>>;

export function AccordionPanel<T extends ValidConstructor = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const properties = useHeadlessSelectOptionProperties();

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'children',
            'unmount',
          ])}
          id={context.panelID}
          aria-labelledby={context.buttonID}
        >
          <HeadlessSelectOptionChild>
            {props.children}
          </HeadlessSelectOptionChild>
        </Dynamic>
      )}
    >
      <Show when={properties.isSelected()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'children',
            'unmount',
          ])}
          id={context.panelID}
          aria-labelledby={context.buttonID}
        >
          <HeadlessSelectOptionChild>
            {props.children}
          </HeadlessSelectOptionChild>
        </Dynamic>
      </Show>
    </Show>
  );
}
