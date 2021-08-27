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
  enter: Partial<States<number>>;
  leave: Partial<States<number>>;
}

export interface HeadlessTransitionOptions {
  appear?: boolean;
  show?: boolean;
  duration?: HeadlessTransitionDuration;
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
      timeout = setTimeout(() => {
        setSignal(target);
        if (current === 'before') {
          applyTransition('during', newState, duration);
        } else if (current === 'during') {
          applyTransition('after', newState, duration);
        }
      }, currentDuration ?? 0);
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
        const durationBase = options.duration;
        const durationRoot = root?.duration;
        return {
          get enter() {
            const enterBase = durationBase?.enter;
            const enterRoot = durationRoot?.enter;
            return {
              get before() {
                return enterBase?.before ?? enterRoot?.before;
              },
              get during() {
                return enterBase?.during ?? enterRoot?.during;
              },
              get after() {
                return enterBase?.after ?? enterRoot?.after;
              },
            };
          },
          get leave() {
            const leaveBase = durationBase?.leave;
            const leaveRoot = durationRoot?.leave;
            return {
              get before() {
                return leaveBase?.before ?? leaveRoot?.before;
              },
              get during() {
                return leaveBase?.during ?? leaveRoot?.during;
              },
              get after() {
                return leaveBase?.after ?? leaveRoot?.after;
              },
            };
          },
        };
      },
    });
  }

  throw new Error('`useTransitionChild` must be used within a TransitionRoot.');
}

export type HeadlessTransitionChildRenderProp = (state: () => TransitionStates) => JSX.Element;

export interface HeadlessTransitionChildProps extends HeadlessTransitionOptions {
  children?: HeadlessTransitionChildRenderProp | JSX.Element;
}

function isHeadlessTransitionChildRenderProp(
  children: HeadlessTransitionChildRenderProp | JSX.Element,
): children is HeadlessTransitionChildRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export function HeadlessTransitionChild(props: HeadlessTransitionChildProps): JSX.Element {
  const state = useHeadlessTransitionChild(props);
  const body = props.children;
  if (isHeadlessTransitionChildRenderProp(body)) {
    return body(state);
  }
  return body;
}
