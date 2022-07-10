import {
  createEffect,
  createSignal,
  createUniqueId,
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

interface ButtonBaseProps {
  disabled?: boolean;
}

export type ButtonProps<T extends ValidConstructor = 'button'> =
  HeadlessPropsWithRef<T, ButtonBaseProps>;

export function Button<T extends ValidConstructor = 'button'>(
  props: ButtonProps<T>,
): JSX.Element {
  const buttonID = createUniqueId();

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
        id: buttonID,
        tabindex: 0,
        role: 'button',
        get disabled() {
          return props.disabled;
        },
      },
      omitProps(props, [
        'as',
        'disabled',
        'ref',
      ]),
      {
        'data-sh-button': buttonID,
        get 'aria-disabled'() {
          return props.disabled;
        },
        get 'data-sh-disabled'() {
          return props.disabled;
        },
        ref: createRef(props, (e) => {
          setInternalRef(() => e);
        }),
      },
    ) as DynamicProps<T>,
  );
}
