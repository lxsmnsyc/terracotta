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
  HeadlessToggleChildProps,
  HeadlessToggleChild,
} from '../../headless/toggle/HeadlessToggleChild';
import {
  DynamicComponent,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import {
  useCheckboxContext,
} from './CheckboxContext';

export type CheckboxDescriptionProps<T extends ValidConstructor = 'p'> =
  OmitAndMerge<DynamicComponent<T> & HeadlessToggleChildProps, DynamicProps<T>>;

export function CheckboxDescription<T extends ValidConstructor = 'p'>(
  props: CheckboxDescriptionProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...omitProps(props, [
        'as',
        'children',
      ])}
      id={context.descriptionID}
      data-sh-checkbox-description={context.ownerID}
    >
      <HeadlessToggleChild>
        {props.children}
      </HeadlessToggleChild>
    </Dynamic>
  );
}
