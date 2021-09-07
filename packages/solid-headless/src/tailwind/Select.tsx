import {
  createContext,
  createEffect,
  createUniqueId,
  onCleanup,
  useContext,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic } from 'solid-js/web';
import {
  HeadlessSelectChild,
  HeadlessSelectOption,
  HeadlessSelectOptionProps,
  HeadlessSelectRoot,
  HeadlessSelectRootProps,
  useHeadlessSelectChild,
} from '../headless/Select';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import { TailwindButton } from './Button';

interface TailwindSelectContext {
  ownerID: string;
  horizontal: boolean;
  setChecked: (node: Element) => void;
  setPrevChecked: (node: Element) => void;
  setNextChecked: (node: Element) => void;
  setFirstChecked: () => void;
  setLastChecked: () => void;
  setFirstMatch: (character: string) => void;
}

const TailwindSelectContext = createContext<TailwindSelectContext>();

function useTailwindSelectContext(componentName: string): TailwindSelectContext {
  const context = useContext(TailwindSelectContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindSelect>`);
}

export type TailwindSelectProps<V, T extends ValidConstructor = 'ul'> = {
  as?: T;
  horizontal?: boolean;
}
  & HeadlessSelectRootProps<V>
  & Omit<DynamicProps<T>, keyof HeadlessSelectRootProps<V>>;

export function TailwindSelect<V, T extends ValidConstructor = 'ul'>(
  props: TailwindSelectProps<V, T>,
): JSX.Element {
  const ownerID = createUniqueId();

  let internalRef: HTMLElement;

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

  function setNextChecked(node: Element) {
    const radios = internalRef.querySelectorAll(`[data-sh-select-option="${ownerID}"]`);
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

  function setPrevChecked(node: Element) {
    const radios = internalRef.querySelectorAll(`[data-sh-select-option="${ownerID}"]`);
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

  function setFirstChecked() {
    const radios = internalRef.querySelectorAll(`[data-sh-select-option="${ownerID}"]`);
    setChecked(radios[0]);
  }

  function setLastChecked() {
    const radios = internalRef.querySelectorAll(`[data-sh-select-option="${ownerID}"]`);
    setChecked(radios[radios.length - 1]);
  }

  function setFirstMatch(character: string) {
    const lower = character.toLowerCase();
    const radios = internalRef.querySelectorAll(`[data-sh-select-option="${ownerID}"]`);
    for (let i = 0, l = radios.length; i < l; i += 1) {
      if (radios[i].textContent?.toLowerCase().startsWith(lower)) {
        setChecked(radios[i]);
        return;
      }
    }
  }

  return (
    <TailwindSelectContext.Provider
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
        ])}
        id={ownerID}
        role="listbox"
        aria-multiselectable={props.multiple}
        aria-orientation={props.horizontal ? 'horizontal' : 'vertical'}
        data-sh-select={ownerID}
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
    </TailwindSelectContext.Provider>
  );
}

export type TailwindSelectOptionProps<V, T extends ValidConstructor = 'li'> = {
  as?: T;
}
  & HeadlessSelectOptionProps<V>
  & Omit<TailwindButtonProps<T>, keyof HeadlessSelectOptionProps<V>>;

export function TailwindSelectOption<V, T extends ValidConstructor = 'li'>(
  props: TailwindSelectOptionProps<V, T>,
): JSX.Element {
  const context = useTailwindSelectContext('TailwindSelect');
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
          case 'ArrowLeft':
            if (context.horizontal && e.key !== 'ArrowLeft') {
              break;
            }
            context.setPrevChecked(internalRef);
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            if (context.horizontal && e.key !== 'ArrowRight') {
              break;
            }
            context.setNextChecked(internalRef);
            break;
          case ' ':
          case 'Enter':
            if (internalRef.tagName === 'BUTTON') {
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

  return (
    <Dynamic
      component={TailwindButton}
      as={props.as ?? 'li'}
      {...excludeProps(props, [
        'as',
        'children',
        'value',
      ])}
      disabled={props.disabled}
      role="option"
      aria-selected={properties.isSelected(props.value)}
      tabindex={-1}
      data-sh-select-option={context.ownerID}
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
