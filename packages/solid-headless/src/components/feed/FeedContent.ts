import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  createComponent,
  mergeProps,
} from 'solid-js';
import {
  omitProps,
} from 'solid-use';
import createDynamic from '../../utils/create-dynamic';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import {
  queryFeedArticles,
} from '../../utils/query-nodes';
import {
  FeedContentContext,
} from './FeedContentContext';
import {
  useFeedContext,
} from './FeedContext';

export type FeedContentProps<T extends ValidConstructor = 'div'> = HeadlessPropsWithRef<T>;

function setChecked(node: Element) {
  (node as HTMLElement).focus();
}

export function FeedContent<T extends ValidConstructor = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  function focusNext(node: Element) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const articles = queryFeedArticles(ref, context.ownerID);
      for (let i = 0, len = articles.length; i < len; i += 1) {
        if (node === articles[i] && i + 1 < len) {
          setChecked(articles[i + 1]);
          break;
        }
      }
    }
  }

  function focusPrev(node: Element) {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const articles = queryFeedArticles(ref, context.ownerID);
      for (let i = 0, len = articles.length; i < len; i += 1) {
        if (node === articles[i] && i - 1 >= 0) {
          setChecked(articles[i - 1]);
          break;
        }
      }
    }
  }

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
          switch (e.key) {
            case 'Home':
              context.focusPrev();
              break;
            case 'End':
              context.focusNext();
              break;
            default:
              break;
          }
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  return createComponent(FeedContentContext.Provider, {
    value: { focusNext, focusPrev },
    get children() {
      return createDynamic(
        () => props.as ?? ('div' as T),
        mergeProps(
          omitProps(props, ['as']),
          {
            id: context.contentID,
            'data-sh-feed-content': context.ownerID,
            role: 'feed',
            'aria-labelledby': context.labelID,
            get 'aria-busy'() {
              return context.busy;
            },
            ref: createRef<T>(props, (e) => {
              setInternalRef(() => e);
            }),
          },
        ) as DynamicProps<T>,
      );
    },
  });
}
