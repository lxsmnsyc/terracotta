import type { JSX } from 'solid-js';
import {
  createEffect,
  onCleanup,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  createForwardRef,
} from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import {
  createARIADisabledState,
  createDisabledState,
} from '../../utils/state-props';

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
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      // This behavior is redundant for buttons
      if (ref.tagName !== 'BUTTON') {
        const onKeyDown = (e: KeyboardEvent): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            ref.click();
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
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
      omitProps(props, [
        'as',
        'ref',
      ]),
      BUTTON_TAG,
      {
        ref: setInternalRef,
      },
    ) as DynamicProps<T>,
  );
}
