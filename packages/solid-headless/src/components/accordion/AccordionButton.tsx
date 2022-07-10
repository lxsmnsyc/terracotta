import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import { HeadlessSelectOptionChild, HeadlessSelectOptionChildProps } from '../../headless/select/HeadlessSelectOption';
import {
  useHeadlessSelectOptionProperties,
} from '../../headless/select/useHeadlessSelectOption';
import {
  ValidConstructor,
  DynamicNode,
  createRef,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import {
  ButtonProps,
  Button,
} from '../button';
import {
  useAccordionContext,
} from './AccordionContext';
import {
  useAccordionItemContext,
} from './AccordionItemContext';

export type AccordionButtonProps<T extends ValidConstructor = typeof Button> =
  HeadlessPropsWithRef<T, HeadlessSelectOptionChildProps & ButtonProps<T>>;

export function AccordionButton<T extends ValidConstructor = typeof Button>(
  props: AccordionButtonProps<T>,
): JSX.Element {
  const rootContext = useAccordionContext('AccordionButton');
  const itemContext = useAccordionItemContext('AccordionButton');
  const properties = useHeadlessSelectOptionProperties();

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
      data-sh-accordion-button={rootContext.getId()}
    >
      <HeadlessSelectOptionChild>
        {props.children}
      </HeadlessSelectOptionChild>
    </Dynamic>
  );
}
