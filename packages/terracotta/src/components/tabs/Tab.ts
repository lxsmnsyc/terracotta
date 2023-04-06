import {
  createComponent,
  createEffect,
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
  createARIADisabledState,
  createARIASelectedState,
  createDisabledState,
  createSelectedState,
} from '../../utils/state-props';
import { Prettify } from '../../utils/types';
import {
  useTabGroupContext,
} from './TabGroupContext';
import { useTabListContext } from './TabListContext';
import { TAB_TAG } from './tags';
import { Button } from '../button';

export type TabBaseProps<V> = Prettify<
  & SelectOptionStateOptions<V>
  & SelectOptionStateRenderProps
>;

export type TabProps<V, T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, TabBaseProps<V>>;

export function Tab<V, T extends ValidConstructor = 'div'>(
  props: TabProps<V, T>,
): JSX.Element {
  const rootContext = useTabGroupContext('Tab');
  const listContext = useTabListContext('Tab');

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
  return createComponent(Button, mergeProps(
    omitProps(props, [
      'as',
      'children',
      'value',
      'disabled',
      'ref',
    ]),
    TAB_TAG,
    createOwnerAttribute(listContext.getId()),
    {
      get as() {
        return props.as || ('div' as T);
      },
      role: 'tab',
      ref: setInternalRef,
      get id() {
        return rootContext.getId('tab', props.value);
      },
      get 'aria-controls'() {
        return rootContext.getId('tab-panel', props.value);
      },
      get tabindex() {
        const selected = state.isSelected();
        return (state.disabled() || !selected) ? -1 : 0;
      },
      get children() {
        return createComponent(SelectOptionStateProvider, {
          state,
          get children() {
            return props.children;
          },
        });
      },
    },
    createDisabledState(() => state.disabled()),
    createARIADisabledState(() => state.disabled()),
    createSelectedState(() => state.isSelected()),
    createARIASelectedState(() => state.isSelected()),
    createActiveState(() => state.isActive()),
  ) as DynamicProps<T>);
}
