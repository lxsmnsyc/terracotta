import {
  createEffect,
  createUniqueId,
  JSX,
  onCleanup,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { DynamicProps, ValidConstructor } from '../utils/dynamic-prop';
import { excludeProps } from '../utils/exclude-props';
import getFocusableElements from '../utils/get-focusable-elements';

export type TailwindToolbarProps<T extends ValidConstructor = 'div'> = {
  as?: T,
  horizontal?: boolean;
} & Omit<DynamicProps<T>, 'as'>;

export function TailwindToolbar<T extends ValidConstructor = 'div'>(
  props: TailwindToolbarProps<T>,
): JSX.Element {
  const toolbarID = createUniqueId();

  let internalRef: HTMLElement;
  let focusedElement: HTMLElement | undefined;

  createEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const nodes = getFocusableElements(internalRef);
        if (props.horizontal
          && document.activeElement
          && internalRef.contains(document.activeElement)
        ) {
          for (let i = 0, len = nodes.length; i < len; i += 1) {
            if (document.activeElement === nodes[i]) {
              if (i === 0) {
                nodes[len - 1].focus();
              } else {
                nodes[i - 1].focus();
              }
            }
          }
        }
      } else if (e.key === 'ArrowRight') {
        const nodes = getFocusableElements(internalRef);
        if (props.horizontal
          && document.activeElement
          && internalRef.contains(document.activeElement)
        ) {
          for (let i = 0, len = nodes.length; i < len; i += 1) {
            if (document.activeElement === nodes[i]) {
              if (i === len - 1) {
                nodes[0].focus();
              } else {
                nodes[i + 1].focus();
              }
            }
          }
        }
      } else if (e.key === 'Home') {
        const nodes = getFocusableElements(internalRef);
        if (nodes.length) {
          nodes[0].focus();
        }
      } else if (e.key === 'End') {
        const nodes = getFocusableElements(internalRef);
        if (nodes.length) {
          nodes[nodes.length - 1].focus();
        }
      }
    };

    const onFocus = (e: FocusEvent) => {
      if (e.target !== internalRef) {
        focusedElement = e.target as HTMLElement;
      } else if (focusedElement) {
        focusedElement.focus();
      } else {
        const nodes = getFocusableElements(internalRef);
        console.log(nodes);
        if (nodes.length) {
          nodes[0].focus();
        }
      }
    };

    internalRef.addEventListener('keydown', onKeyDown);
    internalRef.addEventListener('focus', onFocus);
    onCleanup(() => {
      internalRef.removeEventListener('keydown', onKeyDown);
      internalRef.removeEventListener('focus', onFocus);
    });
  });

  return (
    <Dynamic
      component={props.as ?? 'div'}
      {...excludeProps(props, [
        'as',
        'horizontal',
      ])}
      role="toolbar"
      id={toolbarID}
      aria-orientation={(props.horizontal ?? true) ? 'horizontal' : 'vertical'}
      tabindex={0}
      ref={(e) => {
        const outerRef = props.ref;
        if (typeof outerRef === 'function') {
          outerRef(e);
        } else {
          props.ref = e;
        }
        internalRef = e;
      }}
      data-sh-toolbar={toolbarID}
    />
  );
}
