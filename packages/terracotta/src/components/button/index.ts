import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createEffect, merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';

const BUTTON_TAG = createTag('button');

interface ButtonBaseProps {
  disabled?: boolean;
}

export type ButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  ButtonBaseProps
>;

/**
 * Button behaviour on any element. On a real `<button>` this only adds the
 * disabled handling; on anything else it also supplies `role="button"`,
 * `tabindex`, and <kbd>Enter</kbd>/<kbd>Space</kbd> activation.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/button.md}
 */
export function Button<T extends ValidComponent = 'button'>(props: ButtonProps<T>): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      // This behavior is redundant for buttons
      if (current.tagName !== 'BUTTON') {
        return useEventListener(current, 'keydown', (e) => {
          switch (e.key) {
            case 'Enter':
            case ' ': {
              current.click();
              break;
            }
          }
        });
      }
    }
    return undefined;
  });

  return createDynamic(
    () => props.as || ('button' as T),
    merge(
      BUTTON_TAG,
      {
        get tabindex() {
          return props.disabled ? -1 : 0;
        },
        role: 'button',
      },
      createDisabledState(() => props.disabled),
      createARIADisabledState(() => props.disabled),
      omit(props, 'as', 'ref'),
      {
        ref: setInternalRef,
      },
    ) as ComponentProps<T>,
  );
}
