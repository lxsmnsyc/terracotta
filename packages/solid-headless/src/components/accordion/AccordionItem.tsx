import {
  createUniqueId,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionProps,
} from '../../headless/select/HeadlessSelectOption';
import {
  ValidConstructor,
  DynamicProps,
  DynamicComponent,
} from '../../utils/dynamic-prop';
import {
  OmitAndMerge,
} from '../../utils/types';
import {
  AccordionItemContext,
} from './AccordionItemContext';

export type AccordionItemProps<V, T extends ValidConstructor = 'div'> =
  OmitAndMerge<DynamicComponent<T> & HeadlessSelectOptionProps<V>, DynamicProps<T>>;

export function AccordionItem<V, T extends ValidConstructor = 'div'>(
  props: AccordionItemProps<V, T>,
): JSX.Element {
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <AccordionItemContext.Provider
      value={{
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...omitProps(props, [
          'as',
          'children',
          'value',
          'disabled',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
      >
        <HeadlessSelectOption
          value={props.value}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessSelectOption>
      </Dynamic>
    </AccordionItemContext.Provider>
  );
}
