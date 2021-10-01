import {
  createContext,
  createUniqueId,
  useContext,
  Show,
  createEffect,
  onCleanup,
  createSignal,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import {
  Dynamic,
} from 'solid-js/web';
import {
  HeadlessSelectOption,
  HeadlessSelectOptionChild,
  HeadlessSelectOptionChildProps,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  useHeadlessSelectOptionChild,
} from '../headless/Select';
import {
  DynamicProps,
  ValidConstructor,
  WithRef,
  createRef,
  DynamicNode,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';
import {
  queryAccordionButtons,
} from '../utils/query-nodes';
import {
  TailwindButton,
  TailwindButtonProps,
} from './Button';

interface TailwindAccordionContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
}

const TailwindAccordionContext = createContext<TailwindAccordionContext>();

function useTailwindAccordionContext(componentName: string): TailwindAccordionContext {
  const context = useContext(TailwindAccordionContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindAccordion>`);
}

interface TailwindAccordionItemContext {
  buttonID: string;
  panelID: string;
}

const TailwindAccordionItemContext = createContext<TailwindAccordionItemContext>();

function useTailwindAccordionItemContext(componentName: string): TailwindAccordionItemContext {
  const context = useContext(TailwindAccordionItemContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindAccordionItem>`);
}

export type TailwindAccordionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectRootProps<V>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function TailwindAccordion<V, T extends ValidConstructor = 'div'>(
  props: TailwindAccordionProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
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
      const radios = queryAccordionButtons(internalRef, ownerID);
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

  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      setChecked(radios[0]);
    }
  }

  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const radios = queryAccordionButtons(internalRef, ownerID);
      setChecked(radios[radios.length - 1]);
    }
  }

  return (
    <TailwindAccordionContext.Provider
      value={{
        ownerID,
        setChecked,
        setNextChecked,
        setPrevChecked,
        setFirstChecked,
        setLastChecked,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'as',
          'children',
          'disabled',
          'onChange',
          'multiple',
          'toggleable',
          'value',
          'ref',
        ])}
        ref={createRef(props, (e) => {
          internalRef = e;
        })}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        data-sh-disabled={props.disabled}
        data-sh-accordion={ownerID}
      >
        <HeadlessSelectRoot
          multiple={props.multiple}
          toggleable={props.toggleable}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
        >
          {props.children}
        </HeadlessSelectRoot>
      </Dynamic>
    </TailwindAccordionContext.Provider>
  );
}

export type TailwindAccordionItemProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectOptionProps<V>
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function TailwindAccordionItem<V, T extends ValidConstructor = 'div'>(
  props: TailwindAccordionItemProps<V, T>,
): JSX.Element {
  const buttonID = createUniqueId();
  const panelID = createUniqueId();

  return (
    <TailwindAccordionItemContext.Provider
      value={{
        buttonID,
        panelID,
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
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
    </TailwindAccordionItemContext.Provider>
  );
}

export type TailwindAccordionHeaderProps<T extends ValidConstructor = 'h3'> = {
  as?: T;
} & HeadlessSelectOptionChildProps
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;

export function TailwindAccordionHeader<T extends ValidConstructor = 'h3'>(
  props: TailwindAccordionHeaderProps<T>,
): JSX.Element {
  return (
    <Dynamic
      component={props.as ?? 'h3'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}

export type TailwindAccordionButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessSelectOptionChildProps
  & WithRef<T>
  & Omit<TailwindButtonProps<T>, keyof HeadlessSelectOptionChildProps>;

export function TailwindAccordionButton<T extends ValidConstructor = 'button'>(
  props: TailwindAccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useTailwindAccordionContext('TailwindAccordionButton');
  const itemContext = useTailwindAccordionItemContext('TailwindAccordionButton');
  const properties = useHeadlessSelectOptionChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case 'ArrowUp':
              rootContext.setPrevChecked(ref);
              break;
            case 'ArrowDown':
              rootContext.setNextChecked(ref);
              break;
            case 'Home':
              rootContext.setFirstChecked();
              break;
            case 'End':
              rootContext.setLastChecked();
              break;
            default:
              break;
          }
        }
      };
      const onClick = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.select();
        }
      };
      const onFocus = () => {
        if (!(properties.disabled() || props.disabled)) {
          properties.focus();
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
    <Dynamic
      component={TailwindButton}
      {...excludeProps(props, [
        'children',
        'ref',
        'disabled',
        'as',
      ])}
      id={itemContext.buttonID}
      aria-expanded={properties.isSelected()}
      aria-controls={properties.isSelected() && itemContext.panelID}
      aria-disabled={properties.disabled() || props.disabled}
      data-sh-disabled={properties.disabled() || props.disabled}
      data-sh-expanded={properties.isSelected()}
      data-sh-active={properties.isActive()}
      disabled={properties.disabled() || props.disabled}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
      data-sh-accordion-button={rootContext.ownerID}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}

export type TailwindAccordionPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
} & HeadlessSelectOptionChildProps
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;

export function TailwindAccordionPanel<T extends ValidConstructor = 'div'>(
  props: TailwindAccordionPanelProps<T>,
): JSX.Element {
  const context = useTailwindAccordionItemContext('TailwindAccordionPanel');
  const properties = useHeadlessSelectOptionChild();

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'children',
            'unmount',
          ])}
          id={context.panelID}
          aria-labelledby={context.buttonID}
        >
          <HeadlessSelectOptionChild>
            {props.children}
          </HeadlessSelectOptionChild>
        </Dynamic>
      )}
    >
      <Show when={properties.isSelected()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
            'as',
            'children',
            'unmount',
          ])}
          id={context.panelID}
          aria-labelledby={context.buttonID}
        >
          <HeadlessSelectOptionChild>
            {props.children}
          </HeadlessSelectOptionChild>
        </Dynamic>
      </Show>
    </Show>
  );
}
