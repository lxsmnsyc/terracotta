import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  useContext,
  JSX,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
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
import {
  querySelectOptions,
} from '../utils/query-nodes';
import {
  Button,
  ButtonProps,
} from './Button';

interface SelectContext {
  ownerID: string;
  horizontal: boolean;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

const SelectContext = createContext<SelectContext>();

function useSelectContext(componentName: string): SelectContext {
  const context = useContext(SelectContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Select>`);
}

export type SelectProps<V, T extends ValidConstructor = 'ul'> = {
  as?: T;
  horizontal?: boolean;
}
  & HeadlessSelectRootProps<V>
  & WithRef<T>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function Select<V, T extends ValidConstructor = 'ul'>(
  props: SelectProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: DynamicNode<T>;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === len - 1) {
            setChecked(options[0]);
          } else {
            setChecked(options[i + 1]);
          }
          break;
        }
      }
    }
  }

  function setPrevChecked(node: Element) {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, len = options.length; i < len; i += 1) {
        if (node === options[i]) {
          if (i === 0) {
            setChecked(options[len - 1]);
          } else {
            setChecked(options[i - 1]);
          }
          break;
        }
      }
    }
  }

  function setFirstChecked() {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      setChecked(options[0]);
    }
  }

  function setLastChecked() {
    if (internalRef instanceof HTMLElement) {
      const options = querySelectOptions(internalRef, ownerID);
      setChecked(options[options.length - 1]);
    }
  }

  function setFirstMatch(character: string) {
    if (internalRef instanceof HTMLElement) {
      const lower = character.toLowerCase();
      const options = querySelectOptions(internalRef, ownerID);
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].textContent?.toLowerCase().startsWith(lower)) {
          setChecked(options[i]);
          return;
        }
      }
    }
  }

  return (
    <SelectContext.Provider
      value={{
        horizontal: !!props.horizontal,
        ownerID,
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
          'toggleable',
          'value',
          'onChange',
          'multiple',
          'horizontal',
          'disabled',
          'ref',
        ])}
        id={ownerID}
        role="listbox"
        disabled={props.disabled}
        aria-multiselectable={props.multiple}
        aria-orientation={props.horizontal ? 'horizontal' : 'vertical'}
        aria-disabled={props.disabled}
        data-sh-select={ownerID}
        data-sh-disabled={props.disabled}
        ref={createRef(props, (e) => {
          internalRef = e;
        })}
      >
        <HeadlessSelectRoot
          multiple={props.multiple}
          toggleable={props.toggleable}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.children}
        </HeadlessSelectRoot>
      </Dynamic>
    </SelectContext.Provider>
  );
}

export type SelectOptionProps<V, T extends ValidConstructor = 'li'> = {
  as?: T;
}
  & HeadlessSelectOptionProps<V>
  & WithRef<T>
  & Omit<ButtonProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function SelectOption<V, T extends ValidConstructor = 'li'>(
  props: SelectOptionProps<V, T>,
): JSX.Element {
  const context = useSelectContext('Select');
  const properties = useHeadlessSelectChild();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  let characters = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!(properties.disabled() || props.disabled)) {
          switch (e.key) {
            case 'ArrowUp':
              if (!context.horizontal) {
                context.setPrevChecked(ref);
              }
              break;
            case 'ArrowLeft':
              if (context.horizontal) {
                context.setPrevChecked(ref);
              }
              break;
            case 'ArrowDown':
              if (!context.horizontal) {
                context.setNextChecked(ref);
              }
              break;
            case 'ArrowRight':
              if (context.horizontal) {
                context.setNextChecked(ref);
              }
              break;
            case ' ':
            case 'Enter':
              if (ref.tagName === 'BUTTON') {
                e.preventDefault();
              }
              properties.select(props.value);
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
          ref.focus();
        }
      };
      const onMouseLeave = () => {
        if (!(properties.disabled() || props.disabled)) {
          ref.blur();
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      });
    }
  });

  return (
    <Dynamic
      component={Button}
      as={props.as ?? 'li'}
      {...excludeProps(props, [
        'as',
        'children',
        'value',
        'ref',
      ])}
      disabled={props.disabled}
      role="option"
      tabindex={-1}
      aria-selected={properties.isSelected(props.value)}
      aria-disabled={props.disabled}
      data-sh-select-option={context.ownerID}
      data-sh-selected={properties.isSelected(props.value)}
      data-sh-disabled={props.disabled}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
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
