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
import {
  ValidConstructor,
  DynamicProps,
  DynamicComponent,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> =
  OmitAndMerge<DynamicComponent<T> & HeadlessSelectOptionChildProps, DynamicProps<T>>;

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
