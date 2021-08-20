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

export interface HeadlessTransitionOptions {
  appear?: boolean;
  show?: boolean;
  beforeEnterDuration?: number;
  duringEnterDuration?: number;
  afterEnterDuration?: number;
  beforeLeaveDuration?: number;
  duringLeaveDuration?: number;
  afterLeaveDuration?: number;
}

export type TransitionStates =
  | 'before-enter'
  | 'during-enter'
  | 'after-enter'
  | 'before-leave'
  | 'during-leave'
  | 'after-leave';

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

    function applyTransition(
      current: keyof States<any>,
      duration: States<number | undefined>,
      newState: States<TransitionStates>,
    ): void {
      if (timeout) {
        clearTimeout(timeout);
      }
      const currentDuration = duration[current];
      const target = newState[current];
      timeout = setTimeout(() => {
        setSignal(target);
        if (current === 'before') {
          applyTransition('during', duration, newState);
        } else if (current === 'during') {
          applyTransition('after', duration, newState);
        }
      }, currentDuration ?? 0);
    }

    if (cond) {
      applyTransition(
        'before',
        {
          before: options.show ? options.beforeEnterDuration : options.beforeLeaveDuration,
          during: options.show ? options.duringEnterDuration : options.duringLeaveDuration,
          after: options.show ? options.afterEnterDuration : options.afterLeaveDuration,
        },
        {
          before: options.show ? 'before-enter' : 'before-leave',
          during: options.show ? 'during-enter' : 'during-leave',
          after: options.show ? 'after-enter' : 'after-leave',
        },
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

const TransitionRootContext = createContext<HeadlessTransitionOptions | undefined>(undefined);

export interface TransitionRootProps extends HeadlessTransitionOptions {
  children: JSX.Element
}

export function TransitionRoot(props: TransitionRootProps): JSX.Element {
  return (
    <TransitionRootContext.Provider
      value={props}
    >
      {props.children}
    </TransitionRootContext.Provider>
  );
}

export function useTransitionRoot(): HeadlessTransitionOptions | undefined {
  return useContext(TransitionRootContext);
}

export function useTransitionChild(
  options: HeadlessTransitionOptions = {},
): () => TransitionStates {
  const root = useTransitionRoot();

  if (root) {
    return useHeadlessTransition({
      get appear() {
        return options.appear ?? root!.appear;
      },
      get show() {
        return options.show ?? root!.show;
      },
      get beforeEnterDuration() {
        return options.beforeEnterDuration ?? root!.beforeEnterDuration;
      },
      get duringEnterDuration() {
        return options.duringEnterDuration ?? root!.duringEnterDuration;
      },
      get afterEnterDuration() {
        return options.afterEnterDuration ?? root!.afterEnterDuration;
      },
      get beforeLeaveDuration() {
        return options.beforeLeaveDuration ?? root!.beforeLeaveDuration;
      },
      get duringLeaveDuration() {
        return options.duringLeaveDuration ?? root!.duringLeaveDuration;
      },
      get afterLeaveDuration() {
        return options.afterLeaveDuration ?? root!.afterLeaveDuration;
      },
    });
  }

  return useHeadlessTransition(options);
}

export interface TransitionChildProps extends HeadlessTransitionOptions {
  children: (state: () => TransitionStates) => JSX.Element;
}

export function TransitionChild(props: TransitionChildProps): JSX.Element {
  const state = useTransitionChild(props);
  return props.children(state);
}
