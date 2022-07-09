import {
  createSignal,
  createEffect,
  onCleanup,
  Show,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  omitProps,
} from 'solid-use';
import {
  HeadlessDisclosureChildProps,
  HeadlessDisclosureChild,
} from '../../headless/disclosure/HeadlessDisclosureChild';
import {
  useHeadlessDisclosureProperties,
} from '../../headless/disclosure/HeadlessDisclosureContext';
import {
  createRef,
  DynamicComponentWithRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import getFocusableElements from '../../utils/get-focusable-elements';
import {
  OmitAndMerge,
} from '../../utils/types';
import {
  useContextMenuContext,
} from './ContextMenuContext';

export type ContextMenuPanelProps<T extends ValidConstructor = 'div'> = {
  unmount?: boolean;
} & OmitAndMerge<DynamicComponentWithRef<T> & HeadlessDisclosureChildProps, DynamicProps<T>>;

export function ContextMenuPanel<T extends ValidConstructor = 'div'>(
  props: ContextMenuPanelProps<T>,
): JSX.Element {
  const context = useContextMenuContext('ContextMenuPanel');
  const properties = useHeadlessDisclosureProperties();

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      if (properties.isOpen()) {
        const onKeyDown = (e: KeyboardEvent) => {
          if (!props.disabled) {
            if (e.key === 'Tab') {
              e.preventDefault();

              const nodes = getFocusableElements(ref);
              if (e.shiftKey) {
                if (!document.activeElement || !ref.contains(document.activeElement)) {
                  nodes[nodes.length - 1].focus();
                } else {
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
              } else if (!document.activeElement || !ref.contains(document.activeElement)) {
                nodes[0].focus();
              } else {
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
            } else if (e.key === 'Escape') {
              properties.setState(false);
            }
          }
        };

        const onClickOutside = (e: FocusEvent) => {
          if (!ref.contains(e.target as Node)) {
            properties.setState(false);
          }
        };

        ref.addEventListener('keydown', onKeyDown);
        document.addEventListener('click', onClickOutside);
        onCleanup(() => {
          ref.removeEventListener('keydown', onKeyDown);
          document.removeEventListener('click', onClickOutside);
        });
      }
    }
  });

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'unmount',
            'children',
            'ref',
          ])}
          id={context.panelID}
          data-sh-context-menu-panel={context.ownerID}
          ref={createRef(props, (e) => {
            setInternalRef(() => e);
          })}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      )}
    >
      <Show when={properties.isOpen()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...omitProps(props, [
            'as',
            'unmount',
            'children',
            'ref',
          ])}
          id={context.panelID}
          data-sh-context-menu-panel={context.ownerID}
          ref={createRef(props, (e) => {
            setInternalRef(() => e);
          })}
        >
          <HeadlessDisclosureChild>
            {props.children}
          </HeadlessDisclosureChild>
        </Dynamic>
      </Show>
    </Show>
  );
}
