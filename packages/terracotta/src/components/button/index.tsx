import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import { createTag } from '../../utils/namespace';
import { createARIADisabledState, createDisabledState } from '../../utils/state-props';
import useEventListener from '../../utils/use-event-listener';

const BUTTON_TAG = createTag('button');

const NATIVE_INPUT_BUTTONS = new Set(['button', 'submit', 'reset', 'image']);

function isNativeButton(el: HTMLElement): boolean {
  if (el.tagName === 'BUTTON') {
    return true;
  }
  return el.tagName === 'INPUT' && NATIVE_INPUT_BUTTONS.has((el as HTMLInputElement).type);
}

// Links with an `href` already turn Enter into a click.
function activatesOnEnter(el: HTMLElement): boolean {
  return (el.tagName === 'A' || el.tagName === 'AREA') && el.hasAttribute('href');
}

interface ButtonBaseProps {
  disabled?: boolean;
}

export type ButtonProps<T extends ValidComponent = 'button'> = HeadlessPropsWithRef<
  T,
  ButtonBaseProps
>;

/**
 * Button behaviour on any element. On a real `<button>` this only adds the
 * disabled handling. On anything else it also supplies `role="button"`,
 * `tabindex`, <kbd>Enter</kbd>/<kbd>Space</kbd> activation, and blocks clicks
 * while disabled.
 *
 * Renders a `<button>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/button.md}
 */
export function Button<T extends ValidComponent = 'button'>(props: ButtonProps<T>): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, (current) => {
    // Native controls already handle the keyboard and the `disabled` attribute.
    if (current instanceof HTMLElement && !isNativeButton(current)) {
      // Space activates on keyup, as on a native button.
      let spacePressed = false;
      return mergeFunc(
        // `disabled` does nothing on a `<div>` or an `<a>`, so block clicks here.
        // The listener runs in the capture phase so that it runs first.
        useEventListener(
          current,
          'click',
          (e) => {
            if (props.disabled) {
              e.preventDefault();
              e.stopImmediatePropagation();
            }
          },
          true,
        ),
        useEventListener(current, 'keydown', (e) => {
          // Keys pressed inside a nested field belong to that field.
          if (e.target !== current) {
            return;
          }
          switch (e.key) {
            case 'Enter': {
              if (!activatesOnEnter(current)) {
                e.preventDefault();
                if (!props.disabled) {
                  current.click();
                }
              }
              break;
            }
            case ' ': {
              // Stops the page from scrolling.
              e.preventDefault();
              spacePressed = true;
              break;
            }
          }
        }),
        useEventListener(current, 'keyup', (e) => {
          if (e.key === ' ' && spacePressed) {
            spacePressed = false;
            e.preventDefault();
            if (!props.disabled && e.target === current) {
              current.click();
            }
          }
        }),
        useEventListener(current, 'blur', () => {
          spacePressed = false;
        }),
      );
    }
    return undefined;
  });

  const disabledState = createDisabledState(() => props.disabled);
  const ariaDisabledState = createARIADisabledState(() => props.disabled);
  const rest = omit(props, 'as', 'ref');
  const Root = dynamic(() => props.as || 'button');
  return (
    <Root
      {...BUTTON_TAG}
      tabindex={props.disabled ? -1 : 0}
      role="button"
      {...disabledState}
      {...ariaDisabledState}
      {...rest}
      ref={setInternalRef}
    />
  );
}
