import {
  createComponent,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import {
  createHeadlessSelectOptionProps,
  HeadlessSelectOptionProps,
  useHeadlessSelectProperties,
} from '../../headless/select';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createChecked,
  createDisabled,
} from '../../utils/state-props';
import {
  RadioGroupContext,
} from './RadioGroupContext';
import {
  useRadioGroupRootContext,
} from './RadioGroupRootContext';

export type RadioGroupOptionProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, HeadlessSelectOptionProps<V>>;

export function RadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');
  const properties = useHeadlessSelectProperties<V>();

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
              e.preventDefault();
              context.setPrevChecked(ref);
              break;
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
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

  return createComponent(RadioGroupContext.Provider, {
    value: { descriptionID, labelID },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'value',
            'disabled',
            'ref',
          ]),
          {
            role: 'radio',
            'aria-labelledby': labelID,
            'aria-describedby': descriptionID,
            'data-sh-radio-group-option': context.getId(),
            ref: createRef(props, (e) => {
              setInternalRef(() => e);
            }),
            get tabindex() {
              return properties.isSelected(props.value) ? 0 : -1;
            },
          },
          createDisabled(() => props.disabled),
          createChecked(() => properties.isSelected(props.value)),
          createHeadlessSelectOptionProps(props),
        ) as DynamicProps<T>,
      );
    },
  });
}
