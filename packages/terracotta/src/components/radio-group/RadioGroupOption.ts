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
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createOwnerAttribute } from '../../utils/focus-navigator';
import {
  createActiveState,
  createARIACheckedState,
  createARIADisabledState,
  createCheckedState,
  createDisabledState,
} from '../../utils/state-props';
import { Prettify } from '../../utils/types';
import {
  RadioGroupContext,
} from './RadioGroupContext';
import {
  useRadioGroupRootContext,
} from './RadioGroupRootContext';
import { RADIO_GROUP_OPTION_TAG } from './tags';
import { Button } from '../button';

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

      ref.addEventListener('click', onClick);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('blur', onBlur);
      onCleanup(() => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('blur', onBlur);
      });
    }
  });

  return createComponent(RadioGroupContext.Provider, {
    value: { descriptionID, labelID },
    get children() {
      return createComponent(Button, mergeProps(
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
          get as() {
            return props.as || ('div' as T);
          },
          role: 'radio',
          'aria-labelledby': labelID,
          'aria-describedby': descriptionID,
          ref: setInternalRef,
          get tabindex() {
            const selected = state.isSelected();
            return (state.disabled() || !selected) ? -1 : 0;
          },
        },
        createDisabledState(() => state.disabled()),
        createARIADisabledState(() => state.disabled()),
        createCheckedState(() => state.isSelected()),
        createARIACheckedState(() => state.isSelected()),
        createActiveState(() => state.isActive()),
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
      ) as DynamicProps<T>);
    },
  });
}
