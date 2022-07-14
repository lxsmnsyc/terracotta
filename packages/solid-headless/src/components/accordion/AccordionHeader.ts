import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOptionChildProps,
  createHeadlessSelectOptionChildProps,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import { useAccordionItemContext } from './AccordionItemContext';
import { ACCORDION_HEADER_TAG } from './tags';

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> =
  HeadlessProps<T, HeadlessSelectOptionChildProps>;

export function AccordionHeader<T extends ValidConstructor = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  useAccordionItemContext('AccordionHeader');
  return createDynamic<T>(
    () => props.as ?? ('h3' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      ACCORDION_HEADER_TAG,
      createHeadlessSelectOptionChildProps(props),
    ) as DynamicProps<T>,
  );
}
