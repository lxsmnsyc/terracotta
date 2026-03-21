import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import { createComponent, createEffect, merge, omit } from 'solid-js';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import { mergeFunc } from '../../utils/merge-func';
import useEventListener from '../../utils/use-event-listener';
import {
  createFeedArticleFocusNavigator,
  FeedContentContext,
} from './FeedContentContext';
import { useFeedContext } from './FeedContext';
import { FEED_CONTENT_TAG } from './tags';

export type FeedContentProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T>;

export function FeedContent<T extends ValidComponent = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');
  const controller = createFeedArticleFocusNavigator(context.ownerID);

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(internalRef, current => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);

      return mergeFunc(
        () => {
          controller.clearRef();
        },
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
        }),
        useEventListener(current, 'focusin', e => {
          if (e.target && e.target !== current) {
            controller.setCurrent(e.target as HTMLElement);
          }
        }),
      );
    }
    return undefined;
  });

  return createComponent(FeedContentContext, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        merge(
          FEED_CONTENT_TAG,
          {
            id: context.contentID,
            role: 'feed',
            'aria-labelledby': context.labelID,
            get 'aria-busy'() {
              return context.busy;
            },
            ref: setInternalRef,
          },
          omit(props, 'as'),
        ) as ComponentProps<T>,
      );
    },
  });
}
