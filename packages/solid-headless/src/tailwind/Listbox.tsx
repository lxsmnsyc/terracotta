import { createContext, createUniqueId, useContext } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import { HeadlessSelectChild, HeadlessSelectChildProps, HeadlessSelectRoot, HeadlessSelectRootProps } from '../headless/Select';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import Fragment from '../utils/Fragment';

export type TailwindListboxProps<V, T extends ValidConstructor = typeof Fragment> = {
  as?: T;
} & HeadlessSelectRootProps<V> & Omit<DynamicProps<T>, 'children'>;

interface TailwindListboxContext {
  label: string;
}

const TailwindListboxContext = createContext<TailwindListboxContext>();

function useTailwindListboxContext(componentName: string): TailwindListboxContext {
  const context = useContext(TailwindListboxContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindListbox>`);
}

export function TailwindListbox<V, T extends ValidConstructor = typeof Fragment>(
  props: TailwindListboxProps<V, T>,
): JSX.Element {
  const labelID = createUniqueId();
  return (
    <TailwindListboxContext.Provider
      value={{
        label: labelID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...excludeProps(props, [
          'as',
          'children',
          'value',
          'onChange',
          'disabled',
        ])}
      >
        <HeadlessSelectRoot
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessSelectRoot>
      </Dynamic>
    </TailwindListboxContext.Provider>
  );
}

export type TailwindListboxLabelProps<V, T extends ValidConstructor = 'label'> = {
  as?: T,
} & HeadlessSelectChildProps<V> & Omit<DynamicProps<T>, 'children'>;

export function TailwindListboxLabel<V, T extends ValidConstructor = 'label'>(
  props: TailwindListboxLabelProps<V, T>,
): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxLabel');

  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.label}
    >
      <HeadlessSelectChild>
        {props.children}
      </HeadlessSelectChild>
    </Dynamic>
  );
}

export type TailwindListboxButtonProps<V, T extends ValidConstructor = 'label'> = {
  as?: T,
} & HeadlessSelectChildProps<V> & Omit<DynamicProps<T>, 'children'>;

export function TailwindListboxButton<V, T extends ValidConstructor = 'button'>(
  props: TailwindListboxButtonProps<V, T>,
): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxButton');

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      aria-labelledby={context.label}
    >
      <HeadlessSelectChild>
        {props.children}
      </HeadlessSelectChild>
    </Dynamic>
  );
}

export type TailwindListboxOptionsProps<V, T extends ValidConstructor = 'label'> = {
  as?: T,
} & HeadlessSelectChildProps<V> & Omit<DynamicProps<T>, 'children'>;

export function TailwindListboxOptions<V, T extends ValidConstructor = 'label'>(): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxOptions');

}

export function TailwindListboxOption(): JSX.Element {

}