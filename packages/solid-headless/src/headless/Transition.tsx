import {
  createContext,
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  untrack,
  useContext,
} from 'solid-js';

interface States<T> {
  before: T;
  during: T;
  after: T;
}

export interface HeadlessTransitionDuration {
  enter?: Partial<States<number>>;
  leave?: Partial<States<number>>;
}

export interface HeadlessTransitionCallback {
  enter?: Partial<States<() => void>>;
  leave?: Partial<States<() => void>>;
}

export interface HeadlessTransitionOptions {
  appear?: boolean;
  show?: boolean;
  duration?: HeadlessTransitionDuration;
  on?: HeadlessTransitionCallback;
}

export type TransitionStates =
  | 'before-enter'
  | 'during-enter'
  | 'after-enter'
  | 'before-leave'
  | 'during-leave'
  | 'after-leave';

const ENTER: States<TransitionStates> = {
  before: 'before-enter',
  during: 'during-enter',
  after: 'after-enter',
};

const LEAVE: States<TransitionStates> = {
  before: 'before-leave',
  during: 'during-leave',
  after: 'after-leave',
};

export function useHeadlessTransition(
  options: HeadlessTransitionOptions = {},
): () => TransitionStates {
  const shouldShow = untrack(() => options.show);
  const shouldAppear = untrack(() => options.appear ?? false);

  let initialState: TransitionStates;

  if (shouldShow) {
    if (shouldAppear) {
      initialState = 'after-leave';
    } else {
      initialState = 'after-enter';
    }
  } else if (shouldAppear) {
    initialState = 'after-enter';
  } else {
    initialState = 'after-leave';
  }

  const [signal, setSignal] = createSignal<TransitionStates>(initialState);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  createEffect(() => {
    const currentState = untrack(signal);

    const cond = options.show
      ? currentState.includes('leave')
      : currentState.includes('enter');

    const baseDuration = options.show
      ? options.duration?.enter
      : options.duration?.leave;

    const handlers = options.show
      ? options.on?.enter
      : options.on?.leave;

    function applyTransition(
      current: keyof States<any>,
      newState: States<TransitionStates>,
      duration?: Partial<States<number | undefined>>,
    ): void {
      if (timeout) {
        clearTimeout(timeout);
      }
      const currentDuration = duration?.[current];
      const target = newState[current];
      function sync() {
        setSignal(target);
        handlers?.[current]?.();
        if (current === 'before') {
          applyTransition('during', newState, duration);
        } else if (current === 'during') {
          applyTransition('after', newState, duration);
        }
      }
      if (currentDuration) {
        timeout = setTimeout(sync, currentDuration);
      } else {
        sync();
      }
    }

    if (cond) {
      applyTransition(
        'before',
        options.show ? ENTER : LEAVE,
        baseDuration,
      );
    }
  });

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return () => signal();
}

const HeadlessTransitionRootContext = createContext<HeadlessTransitionOptions>();

export interface HeadlessTransitionRootProps extends HeadlessTransitionOptions {
  children?: JSX.Element
}

export function HeadlessTransitionRoot(props: HeadlessTransitionRootProps): JSX.Element {
  return (
    <HeadlessTransitionRootContext.Provider
      value={props}
    >
      {props.children}
    </HeadlessTransitionRootContext.Provider>
  );
}

export function useHeadlessTransitionRoot(): HeadlessTransitionOptions | undefined {
  return useContext(HeadlessTransitionRootContext);
}

export function useHeadlessTransitionChild(
  options: HeadlessTransitionOptions = {},
): () => TransitionStates {
  const root = useHeadlessTransitionRoot();

  if (root) {
    return useHeadlessTransition({
      get appear() {
        return options.appear ?? root!.appear;
      },
      get show() {
        return options.show ?? root!.show;
      },
      get duration() {
        return options.duration;
      },
    });
  }

  throw new Error('`useTransitionChild` must be used within a TransitionRoot.');
}

const HeadlessTransitionContext = createContext<() => TransitionStates>();

export type HeadlessTransitionConsumerRenderProp = (state: () => TransitionStates) => JSX.Element;

export interface HeadlessTransitionConsumerProps {
  children?: HeadlessTransitionConsumerRenderProp | JSX.Element;
}

function isHeadlessTransitionConsumerProps(
  children: HeadlessTransitionConsumerRenderProp | JSX.Element,
): children is HeadlessTransitionConsumerRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export function HeadlessTransitionConsumer(
  props: HeadlessTransitionConsumerProps,
): JSX.Element {
  const state = useContext(HeadlessTransitionContext);

  if (!state) {
    throw new Error('<HeadlessTransitionConsumer> must be used inside a <HeadlessTransitionChild>');
  }

  const body = props.children;
  if (isHeadlessTransitionConsumerProps(body)) {
    return body(state);
  }
  return body;
}
export interface HeadlessTransitionChildProps extends HeadlessTransitionOptions {
  children?: HeadlessTransitionConsumerRenderProp | JSX.Element;
}

export function HeadlessTransitionChild(props: HeadlessTransitionChildProps): JSX.Element {
  const state = useHeadlessTransitionChild(props);
  return (
    <HeadlessTransitionContext.Provider value={state}>
      <HeadlessTransitionConsumer>
        {props.children}
      </HeadlessTransitionConsumer>
    </HeadlessTransitionContext.Provider>
  );
}
