import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessSelectOptionChildProps,
  useHeadlessSelectOptionProperties,
  createHeadlessSelectOptionChildProps,
} from '../../headless/select';
import {
  ValidConstructor,
  DynamicNode,
  createRef,
  HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import {
  createDisabled,
  createExpanded,
} from '../../utils/state-props';
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

export type AccordionButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, HeadlessSelectOptionChildProps & ButtonProps<T>>;

export function AccordionButton<T extends ValidConstructor = 'button'>(
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

  return createComponent(Button, mergeProps(
    omitProps(props, ['children', 'ref', 'disabled']),
    {
      id: itemContext.buttonID,
      ref: createRef(props, (e) => {
        setInternalRef(() => e);
      }),
      'data-sh-accordion-button': rootContext.getId(),
      get 'aria-controls'() {
        return properties.isSelected() && itemContext.panelID;
      },
    },
    createDisabled(() => properties.disabled() || props.disabled),
    createExpanded(() => properties.isSelected()),
    createHeadlessSelectOptionChildProps(props),
  ) as ButtonProps<T>);
}
