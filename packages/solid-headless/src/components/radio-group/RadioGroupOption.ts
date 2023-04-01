import {
  createComponent,
  createEffect,
  createUniqueId,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import {
  createSelectOptionState,
  SelectOptionStateOptions,
  SelectOptionStateProvider,
  SelectOptionStateRenderProps,
} from '../../states/create-select-option-state';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActive,
  createChecked,
  createDisabled,
} from '../../utils/state-props';
import { Prettify } from '../../utils/types';
import {
  RadioGroupContext,
} from './RadioGroupContext';
import {
  useRadioGroupRootContext,
} from './RadioGroupRootContext';
import { RADIO_GROUP_OPTION_TAG } from './tags';

export type RadioGroupOptionBaseProps<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type RadioGroupOptionProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, RadioGroupOptionBaseProps<V>>;

export function RadioGroupOption<V, T extends ValidConstructor = 'div'>(
  props: RadioGroupOptionProps<V, T>,
): JSX.Element {
  const context = useRadioGroupRootContext('RadioGroupOption');

  const descriptionID = createUniqueId();
  const labelID = createUniqueId();

  const [internalRef, setInternalRef] = createForwardRef(props);
  const state = createSelectOptionState(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (!state.disabled()) {
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
        state.select();
      };
      const onFocus = () => {
        state.focus();
        state.select();
      };
      const onBlur = () => {
        state.blur();
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
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, [
            'as',
            'children',
            'value',
            'disabled',
            'ref',
          ]),
          RADIO_GROUP_OPTION_TAG,
          createOwnerAttribute(context.getId()),
          {
            role: 'radio',
            'aria-labelledby': labelID,
            'aria-describedby': descriptionID,
            ref: setInternalRef,
            get tabindex() {
              const selected = state.isSelected();
              return (state.disabled() || !selected) ? -1 : 0;
            },
          },
          createDisabled(() => state.disabled()),
          createChecked(() => state.isSelected()),
          createActive(() => state.isActive()),
          {
            get children() {
              return createComponent(SelectOptionStateProvider, {
                state,
                get children() {
                  return props.children;
                },
              });
            },
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
