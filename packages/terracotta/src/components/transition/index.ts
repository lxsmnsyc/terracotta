import { createDynamic } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createContext,
  createEffect,
  createSignal,
  merge,
  omit,
  untrack,
  useContext,
} from 'solid-js';
import assert from '../../utils/assert';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import type { HeadlessPropsWithRef } from '../../utils/dynamic-prop';
import { createForwardRef } from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';
import { waitForTransition } from '../../utils/wait-for-transition';

export interface TransitionRootBaseProps {
  show: boolean;
}

interface TransitionCounter {
  register(): void;
  unregister(): void;
  done(): boolean;
}

const TransitionRootContext = createContext<TransitionRootBaseProps>();
const TransitionCounterContext = createContext<{ value?: TransitionCounter }>(
  {},
);

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

export type TransitionChildProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, TransitionBaseChildProps>;

type TransitionStates =
  | 'enter-from'
  | 'enter-to'
  | 'entered'
  | 'leave-from'
  | 'leave-to';

export function TransitionChild<T extends ValidComponent = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TransitionChild');
  // Transitions pending on parent
  const transitionParent = useContext(TransitionCounterContext).value;
  // Transitions pending underneath element
  const transitionChildren = createTransitionCounter();

  const [state, setState] = createSignal<TransitionStates>();
  const [visible, setVisible] = createSignal(untrack(() => values.show));
  const [internalRef, setInternalRef] = createForwardRef(props);

  // Step 1: write through internal visibility state based on `show`
  createEffect(
    () => values.show,
    shouldShow => {
      if (shouldShow) {
        setVisible(true);
      }
    },
  );

  // Step 2: transition-in when visible
  createEffect(
    () => [internalRef(), visible()],
    ([element, flag]) => {
      if (element instanceof HTMLElement && flag) {
        const enter = getClassList(props.enter);
        const enterFrom = getClassList(props.enterFrom);
        const enterTo = getClassList(props.enterTo);
        const entered = getClassList(props.entered);

        if (props.beforeEnter) {
          props.beforeEnter();
        }
        setState('enter-from');
        addClassList(element, enter);
        addClassList(element, enterFrom);

        const raf = requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          setState('enter-to');
          addClassList(element, enterTo);

          waitForTransition(element).then(() => {
            removeClassList(element, enter);
            removeClassList(element, enterTo);
            setState('entered');
            addClassList(element, entered);
            if (props.afterEnter) {
              props.afterEnter();
            }
          });
        });

        return () => {
          cancelAnimationFrame(raf);
          // removeClassList(element, enter);
          // removeClassList(element, enterTo);
          // removeClassList(element, enterFrom);
          // removeClassList(element, entered);
        };
      }
      return undefined;
    },
  );

  // Step 3: when `show` becomes false, and no children is transitioning, transition out
  createEffect(
    () => [internalRef(), !values.show, transitionChildren.done()],
    ([element, flag, done]) => {
      if (element instanceof HTMLElement && flag && done) {
        const leave = getClassList(props.leave);
        const leaveFrom = getClassList(props.leaveFrom);
        const leaveTo = getClassList(props.leaveTo);
        const entered = getClassList(props.entered);
        if (props.beforeLeave) {
          props.beforeLeave();
        }
        transitionParent?.register();
        removeClassList(element, entered);
        setState('leave-from');
        addClassList(element, leave);
        addClassList(element, leaveFrom);

        const raf = requestAnimationFrame(() => {
          removeClassList(element, leaveFrom);
          setState('leave-to');
          addClassList(element, leaveTo);

          waitForTransition(element).then(() => {
            removeClassList(element, leave);
            removeClassList(element, leaveTo);
            setVisible(false);
            transitionParent?.unregister();
            if (props.afterLeave) {
              props.afterLeave();
            }
          });
        });

        return () => {
          cancelAnimationFrame(raf);
          // removeClassList(element, leave);
          // removeClassList(element, leaveTo);
          // removeClassList(element, leaveFrom);
        };
      }
      return undefined;
    },
  );

  return createComponent(TransitionCounterContext, {
    value: { value: transitionChildren },
    get children() {
      return createUnmountable(props, visible, () =>
        createDynamic(
          () => props.as || ('div' as T),
          merge(
            omit(
              props,
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
            ),
            {
              ref: setInternalRef,
              get 'tc-transition'() {
                return state();
              },
            },
          ) as ComponentProps<T>,
        ),
      );
    },
  });
}

export type TransitionProps<T extends ValidComponent = 'div'> = Prettify<
  TransitionRootBaseProps & TransitionChildProps<T>
>;

export function Transition<T extends ValidComponent = 'div'>(
  props: TransitionProps<T>,
): JSX.Element {
  return createComponent(TransitionRootContext, {
    value: props,
    get children() {
      return createComponent(
        TransitionChild,
        omit(props, 'show') as unknown as TransitionChildProps<T>,
      );
    },
  });
}
