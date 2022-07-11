import {
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessToggleChildProps,
} from '../../headless/toggle';
import createDynamic from '../../utils/create-dynamic';
import {
  ValidConstructor,
  HeadlessProps,
  DynamicProps,
} from '../../utils/dynamic-prop';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> =
  HeadlessProps<T, HeadlessToggleChildProps>;

export function CheckboxLabel<T extends ValidConstructor = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  return createDynamic(
    () => props.as ?? ('label' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'children',
      ]),
      {
        id: context.labelID,
        for: context.indicatorID,
        'data-sh-checkbox-label': context.ownerID,
        get children() {
          return props.children;
        },
      },
    ) as DynamicProps<T>,
  );
}
