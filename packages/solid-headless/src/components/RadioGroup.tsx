import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  useContext,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  useHeadlessSelectChild,
} from '../headless/Select';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';
import { queryRadios } from '../utils/query-nodes';

interface RadioGroupContext {
  labelID: string;
  descriptionID: string;
}

const RadioGroupContext = createContext<RadioGroupContext>();

function useRadioGroupContext(componentName: string): RadioGroupContext {
  const context = useContext(RadioGroupContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup> or <RadioGroupOption>`);
}

interface RadioGroupRootContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
}

const RadioGroupRootContext = createContext<RadioGroupRootContext>();

function useRadioGroupRootContext(componentName: string): RadioGroupRootContext {
  const context = useContext(RadioGroupRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <RadioGroup>`);
}

export type RadioGroupProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'multiple' | 'toggleable' | 'CONTROLLED'>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function RadioGroup<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryRadios(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === len - 1) {
            setChecked(radios[0]);
          } else {
            setChecked(radios[i + 1]);
          }
          break;
        }
      }
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryRadios(internalRef, ownerID);
      for (let i = 0, len = radios.length; i < len; i += 1) {
        if (node === radios[i]) {
          if (i === 0) {
            setChecked(radios[len - 1]);
          } else {
            setChecked(radios[i - 1]);
          }
          break;
        }
      }
    }
  }

  return (
    <RadioGroupRootContext.Provider
      value={{
        ownerID,
        setChecked,
        setNextChecked,
        setPrevChecked,
      }}
    >
      <RadioGroupContext.Provider
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
            'ref',
            'defaultValue',
          ])}
          role="radiogroup"
          aria-labelledby={labelID}
          aria-describedby={descriptionID}
          aria-disabled={props.disabled}
          data-sh-disabled={props.disabled}
          disabled={props.disabled}
          ref={createRef(props, (e) => {
            internalRef = e;
          })}
          data-sh-radiogroup={ownerID}
        >
          <HeadlessSelectRoot
            CONTROLLED={'value' in props}
            defaultValue={props.defaultValue}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
          >
            {props.children}
          </HeadlessSelectRoot>
        </Dynamic>
      </RadioGroupContext.Provider>
    </RadioGroupRootContext.Provider>
  );
}

export type RadioGroupOptionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectOptionProps<V>, 'multiple'>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function RadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');
  const properties = useHeadlessSelectChild<V>();

  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
              context.setPrevChecked(ref);
              break;
            case 'ArrowRight':
            case 'ArrowDown':
              context.setNextChecked(ref);
              break;
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              context.setChecked(ref);
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select(props.value);
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus(props.value);
          properties.select(props.value);
        }
      };
      const onBlur = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.blur();
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  return (
    <RadioGroupContext.Provider
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
          'ref',
        ])}
        ref={createRef(props, (e) => {
          setInternalRef(() => e);
        })}
        role="radio"
        disabled={props.disabled}
        tabindex={properties.isSelected(props.value) ? 0 : -1}
        aria-disabled={props.disabled}
        aria-checked={properties.isSelected(props.value)}
        aria-labelledby={labelID}
        aria-describedby={descriptionID}
        data-sh-radio={context.ownerID}
        data-sh-checked={properties.isSelected(props.value)}
        data-sh-disabled={props.disabled}
      >
        <HeadlessSelectOption
          value={props.value}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessSelectOption>
      </Dynamic>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupLabelProps<T extends ValidConstructor = 'label'> = {
  as?: T;
} & Omit<DynamicProps<T>, 'as'>;

export function RadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: RadioGroupLabelProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');
  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.labelID}
    >
      {props.children}
    </Dynamic>
  );
}

export type RadioGroupDescriptionProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<DynamicProps<T>, 'as'>;

export function RadioGroupDescription<T extends ValidConstructor = 'div'>(
  props: RadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useRadioGroupContext('RadioGroupLabel');
  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.descriptionID}
    >
      {props.children}
    </Dynamic>
  );
}
