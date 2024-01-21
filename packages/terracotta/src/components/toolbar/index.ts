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
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { createTag } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';

const TOOLBAR_TAG = createTag('toolbar');

export type ToolbarProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, { horizontal?: boolean }>;

export function Toolbar<T extends ValidConstructor = 'div'>(
  props: ToolbarProps<T>,
): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isHorizontal = (): boolean =>
    props.horizontal == null ? true : props.horizontal;

  let focusedElement: HTMLElement | undefined;

  function getNextFocusable(): void {
    const ref = internalRef();
    if (
      ref instanceof HTMLElement &&
      document.activeElement &&
      ref.contains(document.activeElement)
    ) {
      focusNext(
        getFocusableElements(ref),
        document.activeElement as HTMLElement,
        false,
        false,
      );
    }
  }

  function getPrevFocusable(): void {
    const ref = internalRef();
    if (
      ref instanceof HTMLElement &&
      document.activeElement &&
      ref.contains(document.activeElement)
    ) {
      focusPrev(
        getFocusableElements(ref),
        document.activeElement as HTMLElement,
        false,
        false,
      );
    }
  }

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      useEventListener(current, 'keydown', e => {
        switch (e.key) {
          case 'ArrowLeft': {
            if (isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          }
          case 'ArrowUp': {
            if (!isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          }
          case 'ArrowRight': {
            if (isHorizontal()) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          }
          case 'ArrowDown': {
            if (!isHorizontal()) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          }
          case 'Home': {
            if (focusFirst(getFocusableElements(current), false)) {
              e.preventDefault();
            }
            break;
          }
          case 'End': {
            if (focusLast(getFocusableElements(current), false)) {
              e.preventDefault();
            }
            break;
          }
        }
      });
      useEventListener(current, 'focus', () => {
        if (focusedElement) {
          focusedElement.focus();
        } else {
          focusFirst(getFocusableElements(current), false);
        }
      });
      useEventListener(current, 'focusin', e => {
        if (e.target && e.target !== current) {
          focusedElement = e.target as HTMLElement;
        }
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(omitProps(props, ['as', 'horizontal', 'ref']), TOOLBAR_TAG, {
      role: 'toolbar',
      tabindex: 0,
      ref: setInternalRef,
      get 'aria-orientation'() {
        return isHorizontal() ? 'horizontal' : 'vertical';
      },
    }) as DynamicProps<T>,
  );
}
