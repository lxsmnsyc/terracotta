import type { JSX } from 'solid-js';
import { createEffect, mergeProps } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
} from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';

const BUTTON_TAG = createTag('button');

interface ButtonBaseProps {
  disabled?: boolean;
}

export type ButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, ButtonBaseProps>;

export function Button<T extends ValidConstructor = 'button'>(
  props: ButtonProps<T>,
): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      // This behavior is redundant for buttons
      if (current.tagName !== 'BUTTON') {
        useEventListener(current, 'keydown', e => {
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
  });

  return createDynamic(
    () => props.as || ('button' as T),
    mergeProps(
      {
        get tabindex() {
          return props.disabled ? -1 : 0;
        },
        role: 'button',
      },
      createDisabledState(() => props.disabled),
      createARIADisabledState(() => props.disabled),
      omitProps(props, ['as', 'ref']),
      BUTTON_TAG,
      {
        ref: setInternalRef,
      },
    ) as DynamicProps<T>,
  );
}
