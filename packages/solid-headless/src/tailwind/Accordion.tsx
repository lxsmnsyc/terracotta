import {
  createContext,
  createUniqueId,
  useContext,
  Show,
  createEffect,
  onCleanup,
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
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';

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
} & HeadlessSelectRootProps<V> & Omit<DynamicProps<T>, 'children' | 'onChange'>;

export function TailwindAccordion<V, T extends ValidConstructor = 'div'>(
  props: TailwindAccordionProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: HTMLElement;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    const radios = internalRef.querySelectorAll(`[data-sh-accordion-button="${ownerID}"]`);
    for (let i = 0, len = radios.length; i < len; i += 1) {
      if (node === radios[i]) {
        if (i === len - 1) {
          setChecked(radios[0]);
        } else {
          setChecked(radios[i + 1]);
        }
      }
    }
  }

  function setPrevChecked(node: Element) {
    const radios = internalRef.querySelectorAll(`[data-sh-accordion-button="${ownerID}"]`);
    for (let i = 0, len = radios.length; i < len; i += 1) {
      if (node === radios[i]) {
        if (i === 0) {
          setChecked(radios[len - 1]);
        } else {
          setChecked(radios[i - 1]);
        }
      }
    }
  }

  function setFirstChecked() {
    const radios = internalRef.querySelectorAll(`[data-sh-accordion-button="${ownerID}"]`);
    setChecked(radios[0]);
  }

  function setLastChecked() {
    const radios = internalRef.querySelectorAll(`[data-sh-accordion-button="${ownerID}"]`);
    setChecked(radios[radios.length - 1]);
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
        ])}
        ref={(e) => {
          const outerRef = props.ref;
          if (typeof outerRef === 'function') {
            outerRef(e);
          } else {
            props.ref = e;
          }
          internalRef = e;
        }}
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
} & HeadlessSelectOptionProps<V> & Omit<DynamicProps<T>, 'children'>;

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
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

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
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionButton<T extends ValidConstructor = 'button'>(
  props: TailwindAccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useTailwindAccordionContext('TailwindAccordionButton');
  const itemContext = useTailwindAccordionItemContext('TailwindAccordionButton');
  const [isSelected, addSelected, disabled] = useHeadlessSelectOptionChild();

  let internalRef: HTMLElement;

  createEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(disabled() || props.disabled)) {
        switch (e.key) {
          case 'ArrowUp':
            rootContext.setPrevChecked(internalRef);
            break;
          case 'ArrowDown':
            rootContext.setNextChecked(internalRef);
            break;
          case ' ':
          case 'Enter':
            rootContext.setChecked(internalRef);
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
      if (!(disabled() || props.disabled)) {
        addSelected();
      }
    };

    internalRef.addEventListener('keydown', onKeyDown);
    internalRef.addEventListener('click', onClick);
    onCleanup(() => {
      internalRef.removeEventListener('keydown', onKeyDown);
      internalRef.removeEventListener('click', onClick);
    });
  });

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={itemContext.buttonID}
      aria-expanded={isSelected()}
      aria-controls={isSelected() && itemContext.panelID}
      disabled={disabled()}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
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
} & HeadlessSelectOptionChildProps & Omit<DynamicProps<T>, 'children'>;

export function TailwindAccordionPanel<T extends ValidConstructor = 'div'>(
  props: TailwindAccordionPanelProps<T>,
): JSX.Element {
  const context = useTailwindAccordionItemContext('TailwindAccordionPanel');
  const [isSelected] = useHeadlessSelectOptionChild();

  return (
    <>
      {(() => {
        const constructor = (props.as ?? 'div') as T;
        const unmount = props.unmount ?? true;
        if (unmount) {
          return (
            <Show when={isSelected()}>
              <Dynamic
                component={constructor}
                {...excludeProps(props, [
                  'as',
                  'children',
                ])}
                id={context.panelID}
                aria-labelledby={context.buttonID}
              >
                <HeadlessSelectOptionChild>
                  {props.children}
                </HeadlessSelectOptionChild>
              </Dynamic>
            </Show>
          );
        }
        return (
          <Dynamic
            component={constructor}
            {...excludeProps(props, [
              'as',
              'children',
            ])}
            id={context.panelID}
            aria-labelledby={context.buttonID}
          >
            <HeadlessSelectOptionChild>
              {props.children}
            </HeadlessSelectOptionChild>
          </Dynamic>
        );
      })()}
    </>
  );
}
