import type { JSX } from 'solid-js';
import { createComponent, createEffect, mergeProps, onCleanup } from 'solid-js';
import { omitProps } from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import useEventListener from '../../utils/use-event-listener';
import {
  FeedContentContext,
  createFeedArticleFocusNavigator,
} from './FeedContentContext';
import { useFeedContext } from './FeedContext';
import { FEED_CONTENT_TAG } from './tags';

export type FeedContentProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T>;

export function FeedContent<T extends ValidConstructor = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');
  const controller = createFeedArticleFocusNavigator(context.ownerID);

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const current = internalRef();
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      onCleanup(() => {
        controller.clearRef();
      });
      useEventListener(current, 'keydown', e => {
        if (e.ctrlKey) {
          switch (e.key) {
            case 'Home': {
              e.preventDefault();
              context.focusPrev();
              break;
            }
            case 'End': {
              e.preventDefault();
              context.focusNext();
              break;
            }
            default:
              break;
          }
        }
        switch (e.key) {
          case 'PageUp': {
            e.preventDefault();
            controller.setPrevChecked(false);
            break;
          }
          case 'PageDown': {
            e.preventDefault();
            controller.setNextChecked(false);
            break;
          }
          default:
            break;
        }
      });
      useEventListener(current, 'focusin', e => {
        if (e.target && e.target !== current) {
          controller.setCurrent(e.target as HTMLElement);
        }
      });
    }
  });

  return createComponent(FeedContentContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(omitProps(props, ['as']), FEED_CONTENT_TAG, {
          id: context.contentID,
          role: 'feed',
          'aria-labelledby': context.labelID,
          get 'aria-busy'() {
            return context.busy;
          },
          ref: setInternalRef,
        }) as DynamicProps<T>,
      );
    },
  });
}
