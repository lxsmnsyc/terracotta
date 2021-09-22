import { JSX } from 'solid-js/jsx-runtime';
import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  Show,
  untrack,
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

interface TransitioningContext {
  mounted: boolean;
}

const TransitionRootContext = createContext<TransitionRootContext>();
const TransitioningContext = createContext<TransitioningContext>();

function useTransitionRootContext(componentName: string): TransitionRootContext {
  const context = useContext(TransitionRootContext);

  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <TailwindTransiiton>`);
}

export type TransitionStates =
  | 'before-enter'
  | 'during-enter'
  | 'after-enter'
  | 'before-leave'
  | 'during-leave'
  | 'after-leave';

export type TailwindTransitionBaseChildProps<T extends ValidConstructor = 'div'> = {
  as?: T;
  unmount?: boolean;
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
};

function toggleClassList(ref: HTMLElement, classes: string[]) {
  for (let i = 0, len = classes.length; i < len; i++) {
    if (classes[i]) {
      ref.classList.toggle(classes[i]);
    }
  }
}

export type TailwindTransitionChildProps<T extends ValidConstructor = 'div'> =
  TailwindTransitionBaseChildProps<T>
    & Omit<DynamicProps<T>, keyof TailwindTransitionBaseChildProps<T>>;

export function TailwindTransitionChild<T extends ValidConstructor = 'div'>(
  props: TailwindTransitionChildProps<T>,
): JSX.Element {
  const values = useTransitionRootContext('TailwindTransitionChild');
  const parent = useContext(TransitioningContext);

  const [mounted, setMounted] = createSignal(false);
  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createSignal<HTMLElement>();

  let initial = true;

  createEffect(() => {
    if (parent?.mounted ?? true) {
      const shouldShow = values.show;

      if (shouldShow) {
        setVisible(true);
      }

      const internalRef = ref();
      // Check for the ref
      if (internalRef) {
        console.log(internalRef, internalRef.getBoundingClientRect());
        const previous = untrack(() => visible());
        // Check if we should show
        if (shouldShow) {
          const shouldAppear = props.appear ?? false;
          // If it is the initial show or a switch of state, make sure to transition first
          if ((initial && shouldAppear) || !previous) {
            const allClass = `${props.enter ?? ''} ${props.enterFrom ?? ''}`;
            toggleClassList(internalRef, allClass.split(' '));
            initial = false;
            console.log(internalRef.getBoundingClientRect());
          }
          const allClass = `${props.enter ?? ''} ${props.enterTo ?? ''}`;
          toggleClassList(internalRef, allClass.split(' '));
        } else {
          if (previous) {
            const allClass = `${props.leave ?? ''} ${props.leaveFrom ?? ''}`;
            toggleClassList(internalRef, allClass.split(' '));
            internalRef.getBoundingClientRect();
          }
          const allClass = `${props.leave ?? ''} ${props.leaveTo ?? ''}`;
          toggleClassList(internalRef, allClass.split(' '));
        }

        if (!props.enter && shouldShow) {
          setMounted(true);
        }
        const onTransitionRun = () => {
          // clearTimeout(timeout);
        };
        const onTransitionEnd = () => {
          if (shouldShow) {
            setMounted(true);
          } else {
            setVisible(false);
            setMounted(false);
          }
        };
        internalRef.addEventListener('transitionrun', onTransitionRun, false);
        internalRef.addEventListener('transitionend', onTransitionEnd, false);
        onCleanup(() => {
          internalRef.removeEventListener('transitionrun', onTransitionRun, false);
          internalRef.removeEventListener('transitionend', onTransitionEnd, false);
        });
      } else {
        // Ref is missing, reset initial
        initial = true;
      }
    }
  });

  return (
    <TransitioningContext.Provider
      value={{
        get mounted() {
          return mounted();
        },
      }}
    >
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
    </TransitioningContext.Provider>
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
