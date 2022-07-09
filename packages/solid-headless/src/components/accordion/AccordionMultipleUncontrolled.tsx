import { JSX } from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectRoot,
  HeadlessSelectRootChildren,
} from '../../headless/select/HeadlessSelectRoot';
import {
  HeadlessSelectMultipleUncontrolledOptions,
} from '../../headless/select/useHeadlessSelectMultiple';
import {
  createRef,
  DynamicComponentWithRef,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { OmitAndMerge } from '../../utils/types';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionMultipleUncontrolledBaseProps<V, T extends ValidConstructor = 'div'> =
  & DynamicComponentWithRef<T>
  & HeadlessSelectMultipleUncontrolledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionMultipleUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  OmitAndMerge<AccordionMultipleUncontrolledBaseProps<V, T>, DynamicProps<T>>;

export function AccordionMultipleUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: AccordionMultipleUncontrolledProps<V, T>,
): JSX.Element {
  const controller = new AccordionController<T>();

  return (
    <AccordionContext.Provider value={controller}>
      <Dynamic
        component={props.as ?? 'div'}
        {...omitProps(props, [
          'as',
          'children',
          'disabled',
          'onChange',
          'toggleable',
          'defaultValue',
          'multiple',
          'ref',
        ])}
        ref={createRef(props, (e) => {
          controller.setRef(e);
        })}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-accordion={controller.getId()}
      >
        <HeadlessSelectRoot<V>
          multiple
          defaultValue={props.defaultValue}
          toggleable={props.toggleable}
          disabled={props.disabled}
          onChange={props.onChange}
        >
          {props.children}
        </HeadlessSelectRoot>
      </Dynamic>
    </AccordionContext.Provider>
  );
}
