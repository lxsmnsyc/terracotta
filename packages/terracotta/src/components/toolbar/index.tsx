import { dynamic, type JSX, type ValidComponent } from '@solidjs/web';
import { createEffect, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusFirst, focusLast, focusNext, focusPrev } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { mergeFunc } from '../../utils/merge-func';
import { createTag, DISABLED_NODE } from '../../utils/namespace';
import useEventListener from '../../utils/use-event-listener';

const TOOLBAR_TAG = createTag('toolbar');

export type ToolbarProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  { horizontal?: boolean }
>;

/**
 * A group of controls that share one tab stop. The arrow keys move between
 * them, so a toolbar of ten buttons costs the keyboard user one `Tab` instead
 * of ten.
 *
 * Renders a `<div>` by default.
 *
 * @see {@link https://github.com/lxsmnsyc/terracotta/blob/main/docs/components/toolbar.md}
 */
export function Toolbar<T extends ValidComponent = 'div'>(props: ToolbarProps<T>): JSX.Element {
  const [internalRef, setInternalRef] = createForwardRef(props);

  const isHorizontal = (): boolean => (props.horizontal == null ? true : props.horizontal);

  let focusedElement: HTMLElement | undefined;

  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      const root = current;
      // The controls are whatever the consumer renders, so the roving tabindex
      // is kept on the DOM. `demoted` maps each control set to `-1` to the
      // tabindex it had before, so the query can see it again.
      const demoted = new Map<HTMLElement, string | null>();

      function restore(): void {
        for (const [element, value] of demoted) {
          if (value == null) {
            element.removeAttribute('tabindex');
          } else {
            element.setAttribute('tabindex', value);
          }
        }
        demoted.clear();
      }

      function getItems(): HTMLElement[] {
        restore();
        return getFocusableElements(root);
      }

      function pickStop(items: HTMLElement[]): HTMLElement | undefined {
        const active = document.activeElement;
        if (active instanceof HTMLElement && items.includes(active)) {
          return active;
        }
        if (focusedElement && items.includes(focusedElement)) {
          return focusedElement;
        }
        return items.find((item) => !item.matches(DISABLED_NODE)) ?? items[0];
      }

      const observer = new MutationObserver((records) => {
        for (const record of records) {
          // A tabindex the consumer changed on a demoted control is the value
          // to restore later.
          const target = record.target as HTMLElement;
          if (record.attributeName === 'tabindex' && demoted.has(target)) {
            demoted.set(target, target.getAttribute('tabindex'));
          }
        }
        update();
      });
      observer.observe(current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['tabindex', 'disabled', 'hidden', 'inert', 'tc-disabled'],
      });

      // Leaves one control in the tab sequence: the focused one, else the last
      // focused one, else the first enabled one.
      function update(items = getItems()): void {
        const stop = pickStop(items);
        for (const item of items) {
          if (item !== stop) {
            demoted.set(item, item.getAttribute('tabindex'));
            item.setAttribute('tabindex', '-1');
          }
        }
        // Drop the records for the writes above.
        observer.takeRecords();
      }

      function move(
        navigate: (items: HTMLElement[], target: HTMLElement) => HTMLElement | undefined,
      ): boolean {
        const items = getItems();
        const target = document.activeElement;
        const result =
          target instanceof HTMLElement && root.contains(target)
            ? navigate(items, target)
            : undefined;
        update(items);
        return !!result;
      }

      update();

      return mergeFunc(
        () => {
          observer.disconnect();
          restore();
        },
        useEventListener(current, 'keydown', (e) => {
          switch (e.key) {
            case 'ArrowLeft': {
              if (isHorizontal()) {
                e.preventDefault();
                move((items, target) => focusPrev(items, target, false, false));
              }
              break;
            }
            case 'ArrowUp': {
              if (!isHorizontal()) {
                e.preventDefault();
                move((items, target) => focusPrev(items, target, false, false));
              }
              break;
            }
            case 'ArrowRight': {
              if (isHorizontal()) {
                e.preventDefault();
                move((items, target) => focusNext(items, target, false, false));
              }
              break;
            }
            case 'ArrowDown': {
              if (!isHorizontal()) {
                e.preventDefault();
                move((items, target) => focusNext(items, target, false, false));
              }
              break;
            }
            case 'Home': {
              if (move((items) => focusFirst(items, false))) {
                e.preventDefault();
              }
              break;
            }
            case 'End': {
              if (move((items) => focusLast(items, false))) {
                e.preventDefault();
              }
              break;
            }
          }
        }),
        useEventListener(current, 'focusin', (e) => {
          if (e.target instanceof HTMLElement && e.target !== current) {
            const items = getItems();
            if (items.includes(e.target)) {
              focusedElement = e.target;
            }
            update(items);
          }
        }),
      );
    }
    return undefined;
  });

  const rest = omit(props, 'as', 'horizontal', 'ref');
  const Root = dynamic(() => props.as || 'div');
  return (
    <Root
      {...TOOLBAR_TAG}
      role="toolbar"
      ref={setInternalRef}
      aria-orientation={isHorizontal() ? 'horizontal' : 'vertical'}
      {...rest}
    />
  );
}
