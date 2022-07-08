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
  HeadlessSelectMultipleControlledOptions,
} from '../../headless/select/useHeadlessSelectMultiple';
import {
  createRef,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../../utils/dynamic-prop';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionMultipleControlledProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectMultipleControlledOptions<V>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectMultipleControlledOptions<V>>
  & HeadlessSelectRootChildren<V>;

export function AccordionMultipleControlled<V, T extends ValidConstructor = 'div'>(
  props: AccordionMultipleControlledProps<V, T>,
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
          'value',
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
          value={props.value}
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
