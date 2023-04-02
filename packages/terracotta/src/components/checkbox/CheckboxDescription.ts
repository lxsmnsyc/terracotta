import {
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';
import { CHECKBOX_DESCRIPTION } from './tags';
import { CheckStateChild, CheckStateRenderProps } from '../../states/create-check-state';

export type CheckboxDescriptionProps<T extends ValidConstructor = 'p'> =
  HeadlessProps<T, CheckStateRenderProps>;

export function CheckboxDescription<T extends ValidConstructor = 'p'>(
  props: CheckboxDescriptionProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxDescription');
  return createDynamic(
    () => props.as || ('p' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      CHECKBOX_DESCRIPTION,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(CheckStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
    ) as DynamicProps<T>,
  );
}