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
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../../utils/dynamic-prop';
import {
  AccordionContext,
} from './AccordionContext';
import AccordionController from './AccordionController';

export type AccordionSingleControlledProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectSingleControlledOptions<V>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectSingleControlledOptions<V>>
  & HeadlessSelectRootChildren<V>;

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
