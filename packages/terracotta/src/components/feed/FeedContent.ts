import {
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use/props';
import createDynamic from '../../utils/create-dynamic';
import {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createForwardRef,
} from '../../utils/dynamic-prop';
import {
  createFeedArticleFocusNavigator,
  FeedContentContext,
} from './FeedContentContext';
import {
  useFeedContext,
} from './FeedContext';
import { FEED_CONTENT_TAG } from './tags';

export type FeedContentProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T>;

export function FeedContent<T extends ValidConstructor = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');
  const controller = createFeedArticleFocusNavigator(context.ownerID);

  const [internalRef, setInternalRef] = createForwardRef(props);

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      controller.setRef(ref);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
          switch (e.key) {
            case 'Home':
              e.preventDefault();
              context.focusPrev();
              break;
            case 'End':
              e.preventDefault();
              context.focusNext();
              break;
            default:
              break;
          }
        }
        switch (e.key) {
          case 'PageUp':
            e.preventDefault();
            controller.setPrevChecked(false);
            break;
          case 'PageDown':
            e.preventDefault();
            controller.setNextChecked(false);
            break;
          default:
            break;
        }
      };

      const onFocusIn = (e: FocusEvent) => {
        if (e.target && e.target !== ref) {
          controller.setCurrent(e.target as HTMLElement);
        }
      };
      ref.addEventListener('keydown', onKeyDown);
      ref.addEventListener('focusin', onFocusIn);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
        ref.removeEventListener('focusin', onFocusIn);
      });
    }
  });

  return createComponent(FeedContentContext.Provider, {
    value: controller,
    get children() {
      return createDynamic(
        () => props.as || ('div' as T),
        mergeProps(
          omitProps(props, ['as']),
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
        ) as DynamicProps<T>,
      );
    },
  });
}
