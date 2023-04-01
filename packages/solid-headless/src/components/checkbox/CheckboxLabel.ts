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
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';
import { CHECKBOX_LABEL } from './tags';
import {
  CheckStateRenderProps,
  CheckStateChild,
} from '../../states/create-check-state';

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, CheckStateRenderProps>;

export function CheckboxLabel<T extends ValidConstructor = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  return createDynamic(
    () => props.as || ('label' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      CHECKBOX_LABEL,
      {
        id: context.labelID,
        for: context.indicatorID,
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
