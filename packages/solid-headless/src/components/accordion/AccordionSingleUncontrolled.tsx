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
  HeadlessSelectSingleUncontrolledOptions,
} from '../../headless/select/useHeadlessSelectSingle';
import {
  createRef,
  ValidConstructor,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionSingleUncontrolledBaseProps<V> =
  & HeadlessSelectSingleUncontrolledOptions<V>
  & HeadlessSelectRootChildren<V>;

export type AccordionSingleUncontrolledProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, AccordionSingleUncontrolledBaseProps<V>>;

export function AccordionSingleUncontrolled<V, T extends ValidConstructor = 'div'>(
  props: AccordionSingleUncontrolledProps<V, T>,
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
