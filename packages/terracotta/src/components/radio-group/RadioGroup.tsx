import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, createUniqueId, omit } from 'solid-js';
import type {
  SelectStateRenderProps,
  SingleSelectStateControlledOptions,
  SingleSelectStateUncontrolledOptions,
} from '../../states/create-select-state';
import { createSingleSelectState, SelectStateProvider } from '../../states/create-select-state';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import {
  createARIADisabledState,
  createDisabledState,
  createHasActiveState,
  createHasSelectedState,
} from '../../utils/state-props';
import type { Prettify } from '../../utils/types';
import useEventListener from '../../utils/use-event-listener';
import { RadioGroupContext } from './RadioGroupContext';
import {
  createRadioGroupOptionFocusNavigator,
  createRadioGroupRoot,
  RadioGroupRootContext,
} from './RadioGroupRootContext';
import { RADIO_GROUP_TAG } from './tags';
import { createPresence } from '../../utils/create-presence';

export type RadioGroupControlledBaseProps<V> = Prettify<
  SingleSelectStateControlledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupControlledProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  RadioGroupControlledBaseProps<V>
>;

export type RadioGroupUncontrolledBaseProps<V> = Prettify<
  SingleSelectStateUncontrolledOptions<V> & SelectStateRenderProps<V>
>;

export type RadioGroupUncontrolledProps<V, T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  RadioGroupUncontrolledBaseProps<V>
>;

export type RadioGroupProps<V, T extends ValidComponent = 'div'> =
  | RadioGroupControlledProps<V, T>
  | RadioGroupUncontrolledProps<V, T>;

function isRadioGroupUncontrolled<V, T extends ValidComponent = 'div'>(
  props: RadioGroupProps<V, T>,
): props is RadioGroupUncontrolledProps<V, T> {
  return 'defaultValue' in props;
}

/**
 * A single-choice group. The whole group is one tab stop; the arrow keys move
 * between options and select as they go.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/radio-group.md}
 */
export function RadioGroup<V, T extends ValidComponent = 'div'>(
  props: RadioGroupProps<V, T>,
): JSX.Element {
  const controller = createRadioGroupOptionFocusNavigator();
  const descriptionID = createUniqueId();
  const labelID = createUniqueId();
  const label = createPresence();
  const description = createPresence();
  const root = createRadioGroupRoot(controller);
  const state = createSingleSelectState(props);

  const [ref, setRef] = createForwardRef(props);

  createEffect(ref, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      // Arrow keys check the option they move to. Focus alone does not check
      // an option, so Tab can enter a group that has nothing checked yet.
      const checkFocused = (): void => {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && focused !== current && current.contains(focused)) {
          focused.click();
        }
      };

      return mergeFunc(
        () => {
          controller.clearRef();
        },
        useEventListener(current, 'keydown', (e) => {
          if (!state.disabled()) {
            switch (e.key) {
              case 'ArrowLeft':
              case 'ArrowUp': {
                e.preventDefault();
                controller.setPrevChecked(true);
                checkFocused();
                break;
              }
              case 'ArrowRight':
              case 'ArrowDown': {
                e.preventDefault();
                controller.setNextChecked(true);
                checkFocused();
                break;
              }
            }
          }
        }),
        useEventListener(current, 'focusin', (e) => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => state.disabled());
  const ariaDisabledState = createARIADisabledState(() => state.disabled());
  const hasActiveState = createHasActiveState(() => state.hasActive());
  const hasSelectedState = createHasSelectedState(() => state.hasSelected());
  const rest = isRadioGroupUncontrolled(props)
    ? omit(
        props,
        'as',
        'by',
        'children',
        'defaultValue',
        'disabled',
        'multiple',
        'onChange',
        'ref',
        'toggleable',
      )
    : omit(
        props,
        'as',
        'by',
        'children',
        'value',
        'disabled',
        'multiple',
        'onChange',
        'ref',
        'toggleable',
      );
  const Root = dynamic(() => props.as || 'div');
  return (
    <RadioGroupRootContext value={root}>
      <RadioGroupContext
        value={{
          descriptionID,
          labelID,
          label,
          description,
        }}
      >
        <Root
          {...RADIO_GROUP_TAG}
          role="radiogroup"
          aria-labelledby={label.isPresent() ? labelID : undefined}
          aria-describedby={description.isPresent() ? descriptionID : undefined}
          ref={setRef}
          {...disabledState}
          {...ariaDisabledState}
          {...hasActiveState}
          {...hasSelectedState}
          {...rest}
        >
          <SelectStateProvider state={state}>{props.children}</SelectStateProvider>
        </Root>
      </RadioGroupContext>
    </RadioGroupRootContext>
  );
}
