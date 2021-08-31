import {
  createContext,
  createEffect,
  createUniqueId,
  onCleanup,
  untrack,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import {
  HeadlessSelectChild,
  HeadlessSelectChildProps,
  HeadlessSelectOption,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  useHeadlessSelectChild,
} from '../headless/Select';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import Fragment from '../utils/Fragment';
import {
  HeadlessDisclosureChild,
  HeadlessDisclosureChildProps,
  HeadlessDisclosureRoot,
  HeadlessDisclosureRootProps,
  useHeadlessDisclosureChild,
} from '../headless/Disclosure';
import useClickOutside from '../utils/use-click-outside';

interface TailwindListboxContext {
  horizontal?: boolean;
  multiple?: boolean;
  ownerID: string;
  labelID: string;
  buttonID: string;
  optionsID: string;
}

const TailwindListboxContext = createContext<TailwindListboxContext>();

function useTailwindListboxContext(componentName: string): TailwindListboxContext {
  const context = useContext(TailwindListboxContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindListbox>`);
}

interface TailwindListboxOptionsContext {
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

const TailwindListboxOptionsContext = createContext<TailwindListboxOptionsContext>();

function useTailwindListboxOptionsContext(componentName: string): TailwindListboxOptionsContext {
  const context = useContext(TailwindListboxOptionsContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindListboxOptions>`);
}

export type TailwindListboxProps<V, T extends ValidConstructor = typeof Fragment> = {
  as?: T;
  horizontal?: boolean;
} & Omit<HeadlessSelectRootProps<V>, 'children'>
  & HeadlessDisclosureRootProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureRootProps | keyof HeadlessSelectRootProps<V>>;

export function TailwindListbox<V, T extends ValidConstructor = typeof Fragment>(
  props: TailwindListboxProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const buttonID = createUniqueId();
  const optionsID = createUniqueId();

  return (
    <TailwindListboxContext.Provider
      value={{
        horizontal: props.horizontal,
        multiple: props.multiple,
        ownerID,
        labelID,
        buttonID,
        optionsID,
      }}
    >
      <Dynamic
        component={props.as ?? Fragment}
        {...excludeProps(props, [
          'as',
          'children',
          'disabled',
          'onChange',
          'multiple',
          'toggleable',
          'value',
        ])}
        aria-labelledby={labelID}
        data-sh-listbox={ownerID}
      >
        <HeadlessSelectRoot
          multiple={props.multiple}
          toggleable={props.toggleable}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
        >
          <HeadlessDisclosureRoot
            isOpen={props.isOpen}
            disabled={props.disabled}
          >
            {props.children}
          </HeadlessDisclosureRoot>
        </HeadlessSelectRoot>
      </Dynamic>
    </TailwindListboxContext.Provider>
  );
}

export type TailwindListboxLabelProps<T extends ValidConstructor = 'label'> = {
  as?: T;
}
  & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindListboxLabel<T extends ValidConstructor = 'label'>(
  props: TailwindListboxLabelProps<T>,
): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxLabel');

  return (
    <Dynamic
      component={props.as ?? 'label'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.labelID}
      data-sh-listbox-label={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindListboxButtonProps<T extends ValidConstructor = 'button'> = {
  as?: T;
}
  & HeadlessDisclosureChildProps
  & Omit<DynamicProps<T>, keyof HeadlessDisclosureChildProps>;

export function TailwindListboxButton<T extends ValidConstructor = 'button'>(
  props: TailwindListboxButtonProps<T>,
): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxButton');
  const properties = useHeadlessDisclosureChild();

  let internalRef: HTMLElement;

  createEffect(() => {
    const toggle = () => {
      if (!properties.disabled()) {
        properties.setState(!properties.isOpen());
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!properties.disabled()) {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
          case ' ':
          case 'Enter':
            if (internalRef.tagName === 'BUTTON') {
              e.preventDefault();
            }
            toggle();
            break;
          default:
            break;
        }
      }
    };

    internalRef.addEventListener('click', toggle);
    internalRef.addEventListener('keydown', onKeyDown);

    onCleanup(() => {
      internalRef.removeEventListener('click', toggle);
      internalRef.removeEventListener('keydown', onKeyDown);
    });
  });

  return (
    <Dynamic
      component={props.as ?? 'button'}
      {...excludeProps(props, [
        'as',
        'children',
      ])}
      id={context.buttonID}
      aria-haspopup="listbox"
      aria-expanded={properties.isOpen()}
      aria-controls={context.optionsID}
      disabled={properties.disabled()}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
      data-sh-listbox-button={context.ownerID}
    >
      <HeadlessDisclosureChild>
        {props.children}
      </HeadlessDisclosureChild>
    </Dynamic>
  );
}

export type TailwindListboxOptionsProps<V, T extends ValidConstructor = 'ul'> = {
  as?: T;
}
  & HeadlessSelectChildProps<V>
  & Omit<DynamicProps<T>, keyof HeadlessSelectChildProps<V>>;

export function TailwindListboxOptions<V, T extends ValidConstructor = 'ul'>(
  props: TailwindListboxOptionsProps<V, T>,
): JSX.Element {
  const context = useTailwindListboxContext('TailwindListboxOptions');
  const selectProperties = useHeadlessSelectChild();
  const properties = useHeadlessDisclosureChild();

  let internalRef: HTMLElement;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    const radios = internalRef.querySelectorAll(`[data-sh-listbox-option="${context.ownerID}"]`);
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
    const radios = internalRef.querySelectorAll(`[data-sh-listbox-option="${context.ownerID}"]`);
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
    const radios = internalRef.querySelectorAll(`[data-sh-listbox-option="${context.ownerID}"]`);
    setChecked(radios[0]);
  }

  function setLastChecked() {
    const radios = internalRef.querySelectorAll(`[data-sh-listbox-option="${context.ownerID}"]`);
    setChecked(radios[radios.length - 1]);
  }

  function setFirstMatch(character: string) {
    const lower = character.toLowerCase();
    const radios = internalRef.querySelectorAll(`[data-sh-listbox-option="${context.ownerID}"]`);
    for (let i = 0, l = radios.length; i < l; i += 1) {
      if (radios[i].textContent?.toLowerCase().startsWith(lower)) {
        setChecked(radios[i]);
        return;
      }
    }
  }

  createEffect(() => {
    if (!selectProperties.hasSelected()) {
      setFirstChecked();
    }
  });

  useClickOutside(() => internalRef, () => {
    properties.setState(false);
  });

  return (
    <TailwindListboxOptionsContext.Provider
      value={{
        setChecked,
        setFirstChecked,
        setLastChecked,
        setNextChecked,
        setPrevChecked,
        setFirstMatch,
      }}
    >
      <Dynamic
        component={props.as ?? 'ul'}
        {...excludeProps(props, [
          'as',
          'children',
        ])}
        id={context.optionsID}
        role="listbox"
        disabled={properties.disabled()}
        aria-multiselectable={context.multiple}
        aria-labelledby={context.buttonID}
        aria-orientation={context.horizontal ? 'horizontal' : 'vertical'}
        data-sh-listbox-options={context.ownerID}
        ref={(e) => {
          const outerRef = props.ref;
          if (typeof outerRef === 'function') {
            outerRef(e);
          } else {
            props.ref = e;
          }
          internalRef = e;
        }}
      >
        <HeadlessSelectChild>
          {props.children}
        </HeadlessSelectChild>
      </Dynamic>
    </TailwindListboxOptionsContext.Provider>
  );
}

export type TailwindListboxOptionProps<V, T extends ValidConstructor = 'li'> = {
  as?: T;
}
  & HeadlessSelectOptionProps<V>
  & Omit<DynamicProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function TailwindListboxOption<V, T extends ValidConstructor = 'li'>(
  props: TailwindListboxOptionProps<V, T>,
): JSX.Element {
  const rootContext = useTailwindListboxContext('TailwindListboxOptions');
  const context = useTailwindListboxOptionsContext('TailwindListboxOptions');
  const disclosure = useHeadlessDisclosureChild();
  const properties = useHeadlessSelectChild();

  let internalRef: HTMLElement;

  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  createEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(properties.disabled() || props.disabled)) {
        switch (e.key) {
          case 'ArrowUp':
            if (!rootContext.horizontal) {
              context.setPrevChecked(internalRef);
            }
            break;
          case 'ArrowDown':
            if (!rootContext.horizontal) {
              context.setNextChecked(internalRef);
            }
            break;
          case 'ArrowLeft':
            if (rootContext.horizontal) {
              context.setPrevChecked(internalRef);
            }
            break;
          case 'ArrowRight':
            if (rootContext.horizontal) {
              context.setNextChecked(internalRef);
            }
            break;
          case ' ':
          case 'Enter':
            if (internalRef.tagName === 'BUTTON') {
              e.preventDefault();
            }
            properties.select(props.value);
            if (!rootContext.multiple) {
              disclosure.setState(false);
            }
            break;
          case 'Home':
            context.setFirstChecked();
            break;
          case 'End':
            context.setLastChecked();
            break;
          default:
            if (e.key.length === 1) {
              characters = `${characters}${e.key}`;
              if (timeout) {
                clearTimeout(timeout);
              }
              timeout = setTimeout(() => {
                context.setFirstMatch(characters);
                characters = '';
              }, 100);
            }
            break;
        }
      }
    };
    const onClick = () => {
      if (!(properties.disabled() || props.disabled)) {
        properties.select(props.value);
        if (!rootContext.multiple) {
          disclosure.setState(false);
        }
      }
    };
    const onFocus = () => {
      if (!(properties.disabled() || props.disabled)) {
        properties.focus(props.value);
      }
    };
    const onBlur = () => {
      if (!(properties.disabled() || props.disabled)) {
        properties.blur();
      }
    };
    const onMouseEnter = () => {
      if (!(properties.disabled() || props.disabled)) {
        internalRef.focus();
      }
    };
    const onMouseLeave = () => {
      if (!(properties.disabled() || props.disabled)) {
        internalRef.blur();
      }
    };

    internalRef.addEventListener('keydown', onKeyDown);
    internalRef.addEventListener('click', onClick);
    internalRef.addEventListener('focus', onFocus);
    internalRef.addEventListener('blur', onBlur);
    internalRef.addEventListener('mouseenter', onMouseEnter);
    internalRef.addEventListener('mouseleave', onMouseLeave);
    onCleanup(() => {
      internalRef.removeEventListener('keydown', onKeyDown);
      internalRef.removeEventListener('click', onClick);
      internalRef.removeEventListener('focus', onFocus);
      internalRef.removeEventListener('blur', onBlur);
      internalRef.removeEventListener('mouseenter', onMouseEnter);
      internalRef.removeEventListener('mouseleave', onMouseLeave);
    });
  });

  createEffect(() => {
    if (disclosure.isOpen()
      && untrack(() => properties.isSelected(props.value))
      && !(properties.disabled() || props.disabled)
    ) {
      internalRef.focus();
    }
  });

  return (
    <Dynamic
      component={props.as ?? 'li'}
      {...excludeProps(props, [
        'as',
        'children',
        'value',
        'disabled',
      ])}
      role="option"
      aria-selected={properties.isSelected(props.value)}
      tabindex={-1}
      data-sh-listbox-option={rootContext.ownerID}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
    >
      <HeadlessSelectOption
        value={props.value}
        disabled={props.disabled}
      >
        {props.children}
      </HeadlessSelectOption>
    </Dynamic>
  );
}
