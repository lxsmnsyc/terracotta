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

interface TailwindRadioGroupRootContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
}

const TailwindRadioGroupRootContext = createContext<TailwindRadioGroupRootContext>();

function useTailwindRadioGroupRootContext(componentName: string): TailwindRadioGroupRootContext {
  const context = useContext(TailwindRadioGroupRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindRadioGroup>`);
}

export type TailwindRadioGroupProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'multiple' | 'toggleable'>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function TailwindRadioGroup<V, T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupProps<V, T>,
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
    <TailwindRadioGroupRootContext.Provider
      value={{
        ownerID,
        setChecked,
        setNextChecked,
        setPrevChecked,
      }}
    >
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
            'ref',
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
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
          >
            {props.children}
          </HeadlessSelectRoot>
        </Dynamic>
      </TailwindRadioGroupContext.Provider>
    </TailwindRadioGroupRootContext.Provider>
  );
}

export type TailwindRadioGroupOptionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectOptionProps<V>, 'multiple'>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function TailwindRadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useTailwindRadioGroupRootContext('TailwindRadioGroupOption');
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
    </TailwindRadioGroupContext.Provider>
  );
}

export type TailwindRadioGroupLabelProps<T extends ValidConstructor = 'label'> = {
  as?: T;
} & Omit<DynamicProps<T>, 'as'>;

export function TailwindRadioGroupLabel<T extends ValidConstructor = 'label'>(
  props: TailwindRadioGroupLabelProps<T>,
): JSX.Element {
  const context = useTailwindRadioGroupContext('TailwindRadioGroupLabel');
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

export type TailwindRadioGroupDescriptionProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<DynamicProps<T>, 'as'>;

export function TailwindRadioGroupDescription<T extends ValidConstructor = 'div'>(
  props: TailwindRadioGroupDescriptionProps<T>,
): JSX.Element {
  const context = useTailwindRadioGroupContext('TailwindRadioGroupLabel');
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