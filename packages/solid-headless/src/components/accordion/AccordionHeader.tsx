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
  HeadlessSelectOptionChildProps,
  HeadlessSelectOptionChild,
} from '../../headless/select/HeadlessSelectOption';
import { ValidConstructor, DynamicProps } from '../../utils/dynamic-prop';

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> = {
  as?: T;
} & HeadlessSelectOptionChildProps
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;

export function AccordionHeader<T extends ValidConstructor = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  return (
    <Dynamic
      component={props.as ?? 'h3'}
      {...omitProps(props, [
        'as',
        'children',
      ])}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}
