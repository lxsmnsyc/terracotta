import {
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionChild,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
} from '../headless/Select';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';

interface TailwindRadioGroupContext {
  labelID: string;
  descriptionID: string;
}

const TailwindRadioGroupContext = createContext<TailwindRadioGroupContext>();

function useTailwindRadioGroupContext(componentName: string): TailwindRadioGroupContext {
  const context = useContext(TailwindRadioGroupContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindRadioGroup> or <TailwindRadioGroupOption>`);
}

export type TailwindRadioGroupProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'type'> & Omit<DynamicProps<T>, 'children' | 'onChange'>;

export function TailwindRadioGroup<V, T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupProps<V, T>,
): JSX.Element {
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  return (
    <TailwindRadioGroupContext.Provider
      value={{
        descriptionID,
        labelID,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'as',
          'children',
          'value',
          'disabled',
          'onChange',
        ])}
        role="radiogroup"
        aria-labelledby={labelID}
        aria-describedby={descriptionID}
      >
        <HeadlessSelectRoot
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
        >
          {props.children}
        </HeadlessSelectRoot>
      </Dynamic>
    </TailwindRadioGroupContext.Provider>
  );
}

export type TailwindRadioGroupOptionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectOptionProps<V>, 'type'> & Omit<DynamicProps<T>, 'children'>;

export function TailwindRadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupOptionProps<V, T>,
): JSX.Element {
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  return (
    <TailwindRadioGroupContext.Provider
      value={{
        descriptionID,
        labelID,
      }}
    >
      <HeadlessSelectOption
        value={props.value}
        disabled={props.disabled}
      >
        {(isSelected, toggleSelected, disabled) => (
          <Dynamic
            component={props.as ?? 'div'}
            {...excludeProps(props, [
              'as',
              'children',
              'value',
              'disabled',
            ])}
            role="radio"
            aria-checked={isSelected()}
            aria-labelledby={labelID}
            aria-describedby={descriptionID}
            disabled={disabled()}
            onClick={(e) => {
              if (props.as && typeof props.as !== 'function' && 'onClick' in props) {
                props.onClick(e);
              }
              toggleSelected();
            }}
          >
            <HeadlessSelectOptionChild>
              {props.children}
            </HeadlessSelectOptionChild>
          </Dynamic>
        )}
      </HeadlessSelectOption>
    </TailwindRadioGroupContext.Provider>
  );
}

export type TailwindRadioGroupLabelProps<T extends ValidConstructor = 'label'> = {
  as?: T;
} & DynamicProps<T>;

export function TailwindRadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: TailwindRadioGroupLabelProps<T>,
): JSX.Element {
  const context = useTailwindRadioGroupContext('TailwindRadioGroupLabel');
  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.labelID}
    >
      {props.children}
    </Dynamic>
  );
}

export type TailwindRadioGroupDescriptionProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & DynamicProps<T>;

export function TailwindRadioGroupDescription<T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useTailwindRadioGroupContext('TailwindRadioGroupLabel');
  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.descriptionID}
    >
      {props.children}
    </Dynamic>
  );
}
