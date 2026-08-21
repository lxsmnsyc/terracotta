import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, merge, omit } from 'solid-js';
import type { CheckStateRenderProps } from '../../states/create-check-state';
import { CheckStateChild, useCheckState } from '../../states/create-check-state';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessProps } from '../../utils/dynamic-prop';
import { createCheckedState, createDisabledState } from '../../utils/state-props';
import { useCheckboxContext } from './CheckboxContext';
import { CHECKBOX_DESCRIPTION } from './tags';

export type CheckboxDescriptionProps<T extends ValidComponent = 'p'> = HeadlessProps<
  T,
  CheckStateRenderProps
>;

/**
 * The accessible description of a `Checkbox`, wired up through `aria-
 * describedby`.
 *
 * Renders a `<p>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/checkbox.md}
 */
export function CheckboxDescription<T extends ValidComponent = 'p'>(
  props: CheckboxDescriptionProps<T>,
): JSX.Element {
  const context = useCheckboxContext('CheckboxDescription');
  const state = useCheckState();
  return createDynamic(
    () => props.as || ('p' as T),
    merge(
      omit(props, 'as', 'children'),
      CHECKBOX_DESCRIPTION,
      {
        id: context.descriptionID,
        get children() {
          return createComponent(CheckStateChild, {
            get children() {
              return props.children;
            },
          });
        },
      },
      createDisabledState(() => state.disabled()),
      createCheckedState(() => state.checked()),
    ) as ComponentProps<T>,
  );
}
