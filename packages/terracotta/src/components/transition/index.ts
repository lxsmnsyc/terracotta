import type { JSX } from 'solid-js';
import {
  createComponent,
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  useContext,
} from 'solid-js';
import { omitProps } from 'solid-use/props';
import assert from '../../utils/assert';
import createDynamic from '../../utils/create-dynamic';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
} from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';

export interface TransitionRootBaseProps {
  show: boolean;
}

interface TransitionCounter {
  register(): void;
  unregister(): void;
  done(): boolean;
}

const TransitionRootContext = createContext<TransitionRootBaseProps>();
const TransitionCounterContext = createContext<TransitionCounter>();

function useTransitionRootContext(
  componentName: string,
): TransitionRootBaseProps {
  const context = useContext(TransitionRootContext);
  assert(
    context,
    new Error(`<${componentName}> must be used inside a <Transition>`),
  );
  return context;
}

function createTransitionCounter(): TransitionCounter {
  // Set of currently transitioning TransitionChilds nested within a TransitionChild
  const [size, setSize] = createSignal(0);

  return {
    // Reactive set
    register(): void {
      setSize(c => c + 1);
    },
    unregister(): void {
      setSize(c => c - 1);
    },
    done(): boolean {
      return size() === 0;
    },
  };
}

export interface TransitionBaseChildProps extends UnmountableProps {
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
}

function getClassList(classes?: string): string[] {
  return classes ? classes.split(' ') : [];
}

function addClassList(ref: HTMLElement, classes: string[]): void {
  const filtered = classes.filter(value => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref: HTMLElement, classes: string[]): void {
  const filtered = classes.filter(value => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}

export type TransitionChildProps<T extends ValidConstructor = 'div'> =
  HeadlessPropsWithRef<T, TransitionBaseChildProps>;

type TransitionStates =
  | 'enter-from'
  | 'enter-to'
  | 'entered'
  | 'leave-from'
  | 'leave-to';

export function TransitionChild<T extends ValidConstructor = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TransitionChild');
  // Transitions pending on parent
  const transitionParent = useContext(TransitionCounterContext);
  // Transitions pending underneath element
  const transitionChildren = createTransitionCounter();

  const [state, setState] = createSignal<TransitionStates>();
  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createForwardRef(props);
  let initial = true;

  function transition(element: HTMLElement, shouldEnter: boolean): void {
    if (shouldEnter) {
      if (initial) {
        const enter = getClassList(props.enter);
        const enterFrom = getClassList(props.enterFrom);
        const enterTo = getClassList(props.enterTo);
        const entered = getClassList(props.entered);

        const endTransition = (): void => {
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          setState('entered');
          addClassList(element, entered);
          if (props.afterEnter) {
            props.afterEnter();
          }
        };

        if (props.beforeEnter) {
          props.beforeEnter();
        }
        setState('enter-from');
        addClassList(element, enter);
        addClassList(element, enterFrom);

        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          setState('enter-to');
          addClassList(element, enterTo);
          element.addEventListener('transitionend', endTransition, {
            once: true,
          });
          element.addEventListener('animationend', endTransition, {
            once: true,
          });
        });
      }
    } else {
      const leave = getClassList(props.leave);
      const leaveFrom = getClassList(props.leaveFrom);
      const leaveTo = getClassList(props.leaveTo);
      const entered = getClassList(props.entered);
      if (props.beforeLeave) {
        props.beforeLeave();
      }
      if (transitionParent) {
        transitionParent.register();
      }
      removeClassList(element, entered);
      setState('leave-from');
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        setState('leave-to');
        addClassList(element, leaveTo);
      });
      const endTransition = (): void => {
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        if (transitionParent) {
          transitionParent.unregister();
        }
        if (props.afterLeave) {
          props.afterLeave();
        }
      };
      element.addEventListener('transitionend', endTransition, { once: true });
      element.addEventListener('animationend', endTransition, { once: true });
    }
  }

  createEffect(() => {
    const shouldShow = values.show;
    if (shouldShow) {
      setVisible(true);
    }
    const internalRef = ref();
    if (internalRef instanceof HTMLElement) {
      if (shouldShow) {
        transition(internalRef, true);
      } else if (transitionChildren.done()) {
        transition(internalRef, false);
      }
    } else {
      // Ref is missing, reset initial
      initial = true;
    }
  });

  return createComponent(TransitionCounterContext.Provider, {
    value: transitionChildren,
    get children() {
      return createUnmountable(props, visible, () =>
        createDynamic(
          () => props.as || ('div' as T),
          mergeProps(
            omitProps(props, [
              'as',
              'enter',
              'enterFrom',
              'enterTo',
              'leave',
              'leaveFrom',
              'leaveTo',
              'unmount',
              'afterEnter',
              'afterLeave',
              'appear',
              'beforeEnter',
              'beforeLeave',
              'entered',
              'ref',
            ]),
            {
              ref: setRef,
              get 'tc-transition'() {
                return state();
              },
            },
          ) as DynamicProps<T>,
        ),
      );
    },
  });
}

export type TransitionProps<T extends ValidConstructor = 'div'> = Prettify<
  TransitionRootBaseProps & TransitionChildProps<T>
>;

export function Transition<T extends ValidConstructor = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  return createComponent(TransitionRootContext.Provider, {
    value: props,
    get children() {
      return createComponent(
        TransitionChild,
        omitProps(props, ['show']) as TransitionChildProps<T>,
      );
    },
  });
}
