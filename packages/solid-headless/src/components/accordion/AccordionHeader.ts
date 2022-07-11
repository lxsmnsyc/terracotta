import {
  createComponent,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOptionChildProps,
  HeadlessSelectOptionChild,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> =
  HeadlessProps<T, HeadlessSelectOptionChildProps>;

export function AccordionHeader<T extends ValidConstructor = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  return createDynamic<T>(
    () => props.as ?? ('h3' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      {
        get children() {
          return createComponent(HeadlessSelectOptionChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}
