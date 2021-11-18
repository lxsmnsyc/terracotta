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
  omitProps,
} from 'solid-use';
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
  queryAccordionButtons,
} from '../utils/query-nodes';
import {
  Button,
  ButtonProps,
} from './Button';

interface AccordionContext {
  ownerID: string;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
}

const AccordionContext = createContext<AccordionContext>();

function useAccordionContext(componentName: string): AccordionContext {
  const context = useContext(AccordionContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Accordion>`);
}

interface AccordionItemContext {
  buttonID: string;
  panelID: string;
}

const AccordionItemContext = createContext<AccordionItemContext>();

function useAccordionItemContext(componentName: string): AccordionItemContext {
  const context = useContext(AccordionItemContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <AccordionItem>`);
}

export type AccordionProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & Omit<HeadlessSelectRootProps<V>, 'CONTROLLED'>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function Accordion<V, T extends ValidConstructor = 'div'>(
  props: AccordionProps<V, T>,
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
    <AccordionContext.Provider
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
        {...omitProps(props, [
          'as',
          'children',
          'disabled',
          'defaultValue',
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
          CONTROLLED={'value' in props}
          multiple={props.multiple}
          value={props.value}
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

export type AccordionItemProps<V, T extends ValidConstructor = 'div'> = {
  as?: T;
} & HeadlessSelectOptionProps<V>
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;

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

export type AccordionHeaderProps<T extends ValidConstructor = 'h3'> = {
  as?: T;
} & HeadlessSelectOptionChildProps
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;

export function AccordionHeader<T extends ValidConstructor = 'h3'>(
  props: AccordionHeaderProps<T>,
): JSX.Element {
  return (
    <Dynamic
      component={props.as ?? 'h3'}
      {...omitProps(props, [
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

export type AccordionButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
} & HeadlessSelectOptionChildProps
  & WithRef<T>
  & Omit<ButtonProps<T>, keyof HeadlessSelectOptionChildProps>;

export function AccordionButton<T extends ValidConstructor = 'button'>(
  props: AccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useAccordionContext('AccordionButton');
  const itemContext = useAccordionItemContext('AccordionButton');
  const properties = useHeadlessSelectOptionChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();

    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case 'ArrowUp':
              e.preventDefault();
              rootContext.setPrevChecked(ref);
              break;
            case 'ArrowDown':
              e.preventDefault();
              rootContext.setNextChecked(ref);
              break;
            case 'Home':
              e.preventDefault();
              rootContext.setFirstChecked();
              break;
            case 'End':
              e.preventDefault();
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
      component={Button}
      {...omitProps(props, [
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

export type AccordionPanelProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
} & HeadlessSelectOptionChildProps
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionChildProps>;

export function AccordionPanel<T extends ValidConstructor = 'div'>(
  props: AccordionPanelProps<T>,
): JSX.Element {
  const context = useAccordionItemContext('AccordionPanel');
  const properties = useHeadlessSelectOptionChild();

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
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
          {...omitProps(props, [
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
