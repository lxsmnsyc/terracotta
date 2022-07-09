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
  HeadlessSelectSingleControlledOptions,
} from '../../headless/select/useHeadlessSelectSingle';
import {
  createRef,
  DynamicComponentWithRef,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionSingleControlledBaseProps<V, T extends ValidConstructor = 'div'> =
  & DynamicComponentWithRef<T>
  & HeadlessSelectSingleControlledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionSingleControlledProps<V, T extends ValidConstructor = 'div'> =
  OmitAndMerge<AccordionSingleControlledBaseProps<V, T>, DynamicProps<T>>;

export function AccordionSingleControlled<V, T extends ValidConstructor = 'div'>(
  props: AccordionSingleControlledProps<V, T>,
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
        <HeadlessSelectRoot
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
