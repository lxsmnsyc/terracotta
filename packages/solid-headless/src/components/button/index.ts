import {
  createEffect,
  createSignal,
  onCleanup,
  JSX,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createTag } from '../../utils/namespace';
import {
  createDisabled,
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
  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      // This behavior is redundant for buttons
      if (ref.tagName !== 'BUTTON') {
        const onKeyDown = (e: KeyboardEvent) => {
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
    () => props.as ?? ('button' as T),
    mergeProps(
      {
        tabindex: 0,
        role: 'button',
      },
      createDisabled(() => props.disabled),
      omitProps(props, [
        'as',
        'ref',
      ]),
      {
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
      BUTTON_TAG,
    ) as DynamicProps<T>,
  );
}
