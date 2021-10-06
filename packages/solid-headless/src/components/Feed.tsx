import {
  createContext,
  createEffect,
  createUniqueId,
  useContext,
  onCleanup,
  createSignal,
  JSX,
} from 'solid-js';
import {
  Dynamic,
} from 'solid-js/web';
import {
  createRef,
  DynamicNode,
  DynamicProps,
  ValidConstructor,
  WithRef,
} from '../utils/dynamic-prop';
import {
  excludeProps,
} from '../utils/exclude-props';
import getFocusableElements from '../utils/get-focusable-elements';
import { queryFeedArticles } from '../utils/query-nodes';

interface FeedContext {
  ownerID: string;
  labelID: string;
  contentID: string;
  size: number;
  busy: boolean;
  focusPrev: () => void;
  focusNext: () => void;
}

const FeedContext = createContext<FeedContext>();

function useFeedContext(componentName: string): FeedContext {
  const context = useContext(FeedContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Feed>`);
}

interface FeedContentContext {
  focusPrev: (el: Element) => void;
  focusNext: (el: Element) => void;
}

const FeedContentContext = createContext<FeedContentContext>();

function useFeedContentContext(componentName: string): FeedContentContext {
  const context = useContext(FeedContentContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedContent>`);
}

interface FeedArticleContext {
  ownerID: string;
  labelID: string;
  descriptionID: string;
}

const FeedArticleContext = createContext<FeedArticleContext>();

function useFeedArticleContext(componentName: string): FeedArticleContext {
  const context = useContext(FeedArticleContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <FeedArticle>`);
}

export type FeedProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  size: number;
  busy?: boolean;
} & WithRef<T> & Omit<DynamicProps<T>, 'size' | 'busy'>;

export function Feed<T extends ValidConstructor = 'div'>(
  props: FeedProps<T>,
): JSX.Element {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const contentID = createUniqueId();

  let internalRef: DynamicNode<T>;

  return (
    <FeedContext.Provider
      value={{
        ownerID,
        labelID,
        contentID,
        get size() {
          return props.size;
        },
        get busy() {
          return !!props.busy;
        },
        focusNext() {
          const nodes = getFocusableElements(document.documentElement);
          for (let i = 0, len = nodes.length; i < len; i += 1) {
            if (internalRef === nodes[i]) {
              if (i === len - 1) {
                nodes[0].focus();
              } else {
                nodes[i + 1].focus();
              }
              break;
            }
          }
        },
        focusPrev() {
          const nodes = getFocusableElements(document.documentElement);
          for (let i = 0, len = nodes.length; i < len; i += 1) {
            if (internalRef === nodes[i]) {
              if (i === 0) {
                nodes[len - 1].focus();
              } else {
                nodes[i - 1].focus();
              }
              break;
            }
          }
        },
      }}
    >
      <Dynamic
        component={props.as ?? 'div'}
        {...excludeProps(props, [
          'as',
          'busy',
          'size',
        ])}
        id={ownerID}
        data-sh-feed={ownerID}
        ref={createRef(props, (e) => {
          internalRef = e;
        })}
      />
    </FeedContext.Provider>
  );
}

export type FeedLabelProps<T extends ValidConstructor = 'span'> = {
  as?: T;
} & DynamicProps<T>;

export function FeedLabel<T extends ValidConstructor = 'span'>(
  props: FeedLabelProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedLabel');
  return (
    <Dynamic
      component={(props.as ?? 'span') as T}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.labelID}
      data-sh-feed-label={context.ownerID}
    />
  );
}

export type FeedContentProps<T extends ValidConstructor = 'div'> = {
  as?: T;
} & WithRef<T> & DynamicProps<T>;

export function FeedContent<T extends ValidConstructor = 'div'>(
  props: FeedContentProps<T>,
): JSX.Element {
  const context = useFeedContext('FeedContent');

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  function setChecked(node: Element) {
    (node as HTMLElement).focus();
  }

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

  return (
    <FeedContentContext.Provider
      value={{
        focusNext,
        focusPrev,
      }}
    >
      <Dynamic
        component={(props.as ?? 'div') as T}
        {...excludeProps(props, [
          'as',
        ])}
        id={context.contentID}
        role="feed"
        aria-labelledby={context.labelID}
        aria-busy={context.busy}
        data-sh-feed-content={context.ownerID}
        ref={createRef<T>(props, (e) => {
          setInternalRef(() => e);
        })}
      />
    </FeedContentContext.Provider>
  );
}

export type FeedArticleProps<T extends ValidConstructor = 'article'> = {
  as?: T;
  index: number;
} & WithRef<T> & Omit<DynamicProps<T>, 'index'>;

export function FeedArticle<T extends ValidConstructor = 'article'>(
  props: FeedArticleProps<T>,
): JSX.Element {
  const rootContext = useFeedContext('FeedArticle');
  const contentContext = useFeedContentContext('FeedArticle');

  const [internalRef, setInternalRef] = createSignal<DynamicNode<T>>();

  createEffect(() => {
    const ref = internalRef();
    if (ref instanceof HTMLElement) {
      const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'PageUp':
            contentContext.focusPrev(ref);
            break;
          case 'PageDown':
            contentContext.focusNext(ref);
            break;
          default:
            break;
        }
      };

      ref.addEventListener('keydown', onKeyDown);
      onCleanup(() => {
        ref.removeEventListener('keydown', onKeyDown);
      });
    }
  });

  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const descriptionID = createUniqueId();

  return (
    <FeedArticleContext.Provider
      value={{
        ownerID,
        labelID,
        descriptionID,
      }}
    >
      <Dynamic
        component={props.as ?? 'article'}
        {...excludeProps(props, [
          'as',
        ])}
        id={ownerID}
        aria-posinset={props.index + 1}
        aria-setsize={rootContext.size}
        aria-labelledby={labelID}
        aria-describedby={descriptionID}
        data-sh-feed-article={rootContext.ownerID}
        tabindex={0}
        ref={createRef<T>(props, (e) => {
          setInternalRef(() => e);
        })}
      />
    </FeedArticleContext.Provider>
  );
}

export type FeedArticleLabelProps<T extends ValidConstructor = 'span'> = {
  as?: T;
} & DynamicProps<T>;

export function FeedArticleLabel<T extends ValidConstructor = 'span'>(
  props: FeedArticleLabelProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleLabel');
  return (
    <Dynamic
      component={(props.as ?? 'span') as T}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.labelID}
      data-sh-feed-article-label={context.ownerID}
    />
  );
}

export type FeedArticleDescriptionProps<T extends ValidConstructor = 'p'> = {
  as?: T;
} & DynamicProps<T>;

export function FeedArticleDescription<T extends ValidConstructor = 'p'>(
  props: FeedArticleDescriptionProps<T>,
): JSX.Element {
  const context = useFeedArticleContext('FeedArticleDescription');
  return (
    <Dynamic
      component={(props.as ?? 'p') as T}
      {...excludeProps(props, [
        'as',
      ])}
      id={context.descriptionID}
      role="feed"
      data-sh-feed-article-description={context.ownerID}
    />
  );
}
