import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createEffect,
  createSignal,
  Show,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { excludeProps } from '../utils/exclude-props';
import {
  DynamicProps,
  ValidConstructor,
} from '../utils/dynamic-prop';

interface TransitionRootContext {
  show: boolean;
}

const TransitionRootContext = createContext<TransitionRootContext>();

function useTransitionRootContext(componentName: string): TransitionRootContext {
  const context = useContext(TransitionRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindTransition>`);
}

export type TailwindTransitionBaseChildProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
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
};

function addClassList(ref: HTMLElement, classes: string[]) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref: HTMLElement, classes: string[]) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}

export type TailwindTransitionChildProps<T extends ValidConstructor = 'div'> =
  TailwindTransitionBaseChildProps<T>
    & Omit<DynamicProps<T>, keyof TailwindTransitionBaseChildProps<T>>;

export function TailwindTransitionChild<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TailwindTransitionChild');

  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createSignal<HTMLElement>();

  let initial = true;

  function transition(element: HTMLElement, shouldEnter: boolean): void {
    if (shouldEnter) {
      if (initial) {
        const enter = props.enter?.split(' ') ?? [];
        const enterFrom = props.enterFrom?.split(' ') ?? [];
        const enterTo = props.enterTo?.split(' ') ?? [];
        const entered = props.entered?.split(' ') ?? [];

        const endTransition = () => {
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          props.afterEnter?.();
        };

        props.beforeEnter?.();
        addClassList(element, enter);
        addClassList(element, enterFrom);

        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);
          element.addEventListener('transitionend', endTransition, { once: true });
          element.addEventListener('animationend', endTransition, { once: true });
        });
      }
    } else {
      const leave = props.leave?.split(' ') ?? [];
      const leaveFrom = props.leaveFrom?.split(' ') ?? [];
      const leaveTo = props.leaveTo?.split(' ') ?? [];
      const entered = props.entered?.split(' ') ?? [];
      props.beforeLeave?.();
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        props.afterLeave?.();
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
    if (internalRef) {
      transition(internalRef, shouldShow);
    } else {
      // Ref is missing, reset initial
      initial = true;
    }
  });

  return (
    <Show
      when={props.unmount ?? true}
      fallback={(
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
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
          ])}
          ref={(e) => {
            const outerRef = props.ref;
            if (typeof outerRef === 'function') {
              outerRef(e);
            } else {
              props.ref = e;
            }
            setRef(e);
          }}
        >
          {props.children}
        </Dynamic>
      )}
    >
      <Show when={visible()}>
        <Dynamic
          component={props.as ?? 'div'}
          {...excludeProps(props, [
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
          ])}
          ref={(e) => {
            const outerRef = props.ref;
            if (typeof outerRef === 'function') {
              outerRef(e);
            } else {
              props.ref = e;
            }
            setRef(e);
          }}
        >
          {props.children}
        </Dynamic>
      </Show>
    </Show>
  );
}

export type TailwindTransitionProps<T extends ValidConstructor = 'div'> = {
  show: boolean;
  appear?: boolean;
} & TailwindTransitionChildProps<T>;

export function TailwindTransition<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionProps<T>,
): JSX.Element {
  return (
    <TransitionRootContext.Provider
      value={{
        get show() {
          return props.show;
        },
      }}
    >
      <TailwindTransitionChild
        {...excludeProps(props, [
          'appear',
          'show',
        ])}
      />
    </TransitionRootContext.Provider>
  );
}
