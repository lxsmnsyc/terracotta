import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  useContext,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  HeadlessToggleChild,
  HeadlessToggleChildProps,
  HeadlessToggleRoot,
  HeadlessToggleRootProps,
  useHeadlessToggleChild,
} from '../headless/Toggle';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import Fragment from '../utils/Fragment';

interface CheckboxContext {
  ownerID: string;
  labelID: string;
  indicatorID: string;
  descriptionID: string;
}

const CheckboxContext = createContext<CheckboxContext>();

function useCheckboxContext(componentName: string): CheckboxContext {
  const context = useContext(CheckboxContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Checkbox>`);
}

export type CheckboxProps<T extends ValidConstructor = typeof Fragment> = {
  as?: T;
} & HeadlessToggleRootProps
  & Omit<DynamicProps<T>, keyof HeadlessToggleRootProps>;

export function Checkbox<T extends ValidConstructor = typeof Fragment>(
  props: CheckboxProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const indicatorID = createUniqueId();
  const descriptionID = createUniqueId();

  return (
    <CheckboxContext.Provider
      value={{
        ownerID,
        labelID,
        indicatorID,
        descriptionID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...excludeProps(props, [
          'checked',
          'as',
          'children',
          'disabled',
          'defaultChecked',
          'onChange',
        ])}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-checkbox={ownerID}
      >
        <HeadlessToggleRoot
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
          defaultChecked={props.defaultChecked}
        >
          {props.children}
        </HeadlessToggleRoot>
      </Dynamic>
    </CheckboxContext.Provider>
  );
}

export type CheckboxIndicatorProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessToggleChildProps
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;

export function CheckboxIndicator<T extends ValidConstructor = 'button'>(
  props: CheckboxIndicatorProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxIndicator');
  const state = useHeadlessToggleChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const toggle = () => {
        state.setState(!state.checked());
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') {
          toggle();
        }
      };

      ref.addEventListener('click', toggle);
      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('click', toggle);
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...excludeProps(props, [
        'as',
        'children',
        'ref',
      ])}
      id={context.indicatorID}
      role="checkbox"
      data-sh-checkbox-indicator={context.ownerID}
      aria-labelledby={context.labelID}
      aria-describedby={context.descriptionID}
      aria-disabled={state.disabled()}
      aria-checked={state.checked() == null ? 'mixed' : state.checked()}
      data-sh-disabled={state.disabled()}
      data-sh-checked={state.checked()}
      disabled={state.disabled()}
      tabindex={0}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
    >
      <HeadlessToggleChild>
        {props.children}
      </HeadlessToggleChild>
    </Dynamic>
  );
}

export type CheckboxLabelProps<T extends ValidConstructor = 'label'> = {
  as?: T;
} & HeadlessToggleChildProps
  & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;

export function CheckboxLabel<T extends ValidConstructor = 'label'>(
  props: CheckboxLabelProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxLabel');
  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.labelID}
      for={context.indicatorID}
      data-sh-checkbox-label={context.ownerID}
    >
      {props.children}
    </Dynamic>
  );
}

export type CheckboxDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & HeadlessToggleChildProps
  & Omit<DynamicProps<T>, keyof HeadlessToggleChildProps>;

export function CheckboxDescription<T extends ValidConstructor = 'p'>(
  props: CheckboxDescriptionProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxDescription');

  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...excludeProps(props, [
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
