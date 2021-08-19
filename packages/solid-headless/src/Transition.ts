import {
  createEffect,
  createSignal,
  onCleanup,
  untrack,
} from 'solid-js';

export interface HeadlessTransitionOptions {
  appear?: (() => boolean) | boolean;
  show?: (() => boolean) | boolean;
  enterDuration?: number;
  leaveDuration?: number;
}

export type TransitionStates =
  | 'entering'
  | 'entered'
  | 'leaving'
  | 'left';

export type TransitionResult = () => TransitionStates;

export function useHeadlessTransition(
  options: HeadlessTransitionOptions = {},
): () => TransitionStates {
  const shouldAppear = options?.appear ?? false;
  const shouldShow = options?.show ?? false;
  const enterDuration = options.enterDuration ?? 0;
  const leaveDuration = options.leaveDuration ?? 0;

  const initialShouldShow = typeof shouldShow === 'function'
    ? untrack(shouldShow)
    : shouldShow;
  const initialShouldAppear = typeof shouldAppear === 'function'
    ? untrack(shouldAppear)
    : shouldAppear;

  let initialState: TransitionStates;

  if (initialShouldShow) {
    if (initialShouldAppear) {
      initialState = 'left';
    } else {
      initialState = 'entered';
    }
  } else if (initialShouldAppear) {
    initialState = 'entered';
  } else {
    initialState = 'left';
  }

  const [signal, setSignal] = createSignal<TransitionStates>(initialState);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  createEffect(() => {
    const show = typeof shouldShow === 'function' ? shouldShow() : shouldShow;
    const currentState = untrack(signal);

    const cond = show
      ? (currentState === 'leaving' || currentState === 'left')
      : (currentState === 'entering' || currentState === 'entered');
    const duration = show ? enterDuration : leaveDuration;
    const from = show ? 'entering' : 'leaving';
    const to = show ? 'entered' : 'left';

    if (cond) {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (duration > 0) {
        setSignal(from);
        timeout = setTimeout(() => {
          setSignal(to);
          timeout = undefined;
        }, duration);
      } else {
        setSignal(to);
      }
    }
  });

  onCleanup(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return () => signal();
}
