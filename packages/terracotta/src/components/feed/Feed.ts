import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { createComponent, createUniqueId, merge, omit } from 'solid-js';
import createDynamic from '../../utils/create-dynamic';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { focusNext, focusPrev } from '../../utils/focus-navigation';
import getFocusableElements from '../../utils/focus-query';
import { FeedContext } from './FeedContext';
import { FEED_TAG } from './tags';

export interface FeedBaseProps {
  size: number;
  busy?: boolean;
}

export type FeedProps<T extends ValidComponent = 'div'> = HeadlessPropsWithRef<
  T,
  FeedBaseProps
>;

export function Feed<T extends ValidComponent = 'div'>(
  props: FeedProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const contentID = createUniqueId();

  const [ref, setRef] = createForwardRef(props);

  return createComponent(FeedContext, {
    value: {
      ownerID,
      labelID,
      contentID,
      getSize() {
        return props.size;
      },
      isBusy() {
        return !!props.busy;
      },
      focusNext() {
        const current = ref();
        if (current instanceof HTMLElement) {
          focusNext(
            getFocusableElements(document.documentElement),
            current,
            false,
            false,
          );
        }
      },
      focusPrev() {
        const current = ref();
        if (current instanceof HTMLElement) {
          focusPrev(
            getFocusableElements(document.documentElement),
            current,
            false,
            false,
          );
        }
      },
    },
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          FEED_TAG,
          {
            id: ownerID,
            ref: setRef,
          },
          omit(props, 'as', 'busy', 'size'),
        ) as ComponentProps<T>,
      );
    },
  });
}
