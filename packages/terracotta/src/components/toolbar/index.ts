import {
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  createForwardRef,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  focusFirst,
  focusLast,
  focusNext,
  focusPrev,
} from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { createTag } from '../../utils/namespace';

const TOOLBAR_TAG = createTag('toolbar');

export type ToolbarProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, { horizontal?: boolean; }>;

export function Toolbar<T extends ValidConstructor = 'div'>(
  props: ToolbarProps<T>,
): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isHorizontal = () => (props.horizontal == null ? true : props.horizontal);

  let focusedElement: HTMLElement | undefined;

  function getNextFocusable(): void {
    const ref = internalRef();
    if (
      ref instanceof HTMLElement
      && document.activeElement
      && ref.contains(document.activeElement)
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
      ref instanceof HTMLElement
      && document.activeElement
      && ref.contains(document.activeElement)
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
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':
            if (isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case 'ArrowUp':
            if (!isHorizontal()) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case 'ArrowRight':
            if (isHorizontal()) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case 'ArrowDown':
            if (!isHorizontal()) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case 'Home':
            if (focusFirst(getFocusableElements(ref), false)) {
              e.preventDefault();
            }
            break;
          case 'End':
            if (focusLast(getFocusableElements(ref), false)) {
              e.preventDefault();
            }
            break;
          default:
            break;
        }
      };

      const onFocus = () => {
        if (focusedElement) {
          focusedElement.focus();
        } else {
          focusFirst(getFocusableElements(ref), false);
        }
      };

      const onFocusIn = (e: FocusEvent) => {
        if (e.target && e.target !== ref) {
          focusedElement = e.target as HTMLElement;
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('focus', onFocus);
      ref.addEventListener('focusin', onFocusIn);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('focus', onFocus);
        ref.removeEventListener('focusin', onFocusIn);
      });
    }
  });

  return createDynamic(
    () => props.as || ('div' as T),
    mergeProps(
      omitProps(props, [
        'as',
        'horizontal',
        'ref',
      ]),
      TOOLBAR_TAG,
      {
        role: 'toolbar',
        tabindex: 0,
        ref: setInternalRef,
        get 'aria-orientation'() {
          return isHorizontal() ? 'horizontal' : 'vertical';
        },
      },
    ) as DynamicProps<T>,
  );
}
