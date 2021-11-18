import {
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  onCleanup,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import getFocusableElements from '../utils/get-focusable-elements';

export type ToolbarProps<T extends ValidConstructor = 'div'> = {
  as?: T,
  horizontal?: boolean;
} & Omit<DynamicProps<T>, 'as'> & WithRef<T>;

export function Toolbar<T extends ValidConstructor = 'div'>(
  props: ToolbarProps<T>,
): JSX.Element {
  const toolbarID = createUniqueId();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();
  let focusedElement: HTMLElement | undefined;

  function getNextFocusable(): void {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const nodes = getFocusableElements(ref);
      if (document.activeElement
        && ref.contains(document.activeElement)
      ) {
        for (let i = 0, len = nodes.length; i < len; i += 1) {
          if (document.activeElement === nodes[i]) {
            if (i === len - 1) {
              nodes[0].focus();
            } else {
              nodes[i + 1].focus();
            }
            break;
          }
        }
      }
    }
  }

  function getPrevFocusable(): void {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const nodes = getFocusableElements(ref);
      if (document.activeElement
        && ref.contains(document.activeElement)
      ) {
        for (let i = 0, len = nodes.length; i < len; i += 1) {
          if (document.activeElement === nodes[i]) {
            if (i === 0) {
              nodes[len - 1].focus();
            } else {
              nodes[i - 1].focus();
            }
            break;
          }
        }
      }
    }
  }

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':
            if (props.horizontal) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case 'ArrowUp':
            if (!props.horizontal) {
              e.preventDefault();
              getPrevFocusable();
            }
            break;
          case 'ArrowRight':
            if (props.horizontal) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case 'ArrowDown':
            if (!props.horizontal) {
              e.preventDefault();
              getNextFocusable();
            }
            break;
          case 'Home': {
            const nodes = getFocusableElements(ref);
            if (nodes.length) {
              e.preventDefault();
              nodes[0].focus();
            }
          }
            break;
          case 'End': {
            const nodes = getFocusableElements(ref);
            if (nodes.length) {
              e.preventDefault();
              nodes[nodes.length - 1].focus();
            }
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
          const nodes = getFocusableElements(ref);
          if (nodes.length) {
            nodes[0].focus();
          }
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

  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...omitProps(props, [
        'as',
        'horizontal',
        'ref',
      ])}
      role="toolbar"
      id={toolbarID}
      aria-orientation={(props.horizontal ?? true) ? 'horizontal' : 'vertical'}
      tabindex={0}
      ref={createRef(props, (e) => {
        setInternalRef(() => e);
      })}
      data-sh-toolbar={toolbarID}
    />
  );
}
