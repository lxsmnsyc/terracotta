import { createDynamic, untrack } from '@solidjs/web';
import type { ComponentProps, JSX, ValidComponent } from 'solid-js';
import {
  createComponent,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  merge,
  omit,
  onCleanup,
  useContext,
} from 'solid-js';
import {
  TransitionHooks,
  TransitionState,
  TransitionStates,
} from '../../states/create-transition-state';
import assert from '../../utils/assert';
import { createDependencyList } from '../../utils/create-dependency-list';
import type { UnmountableProps } from '../../utils/create-unmountable';
import { createUnmountable } from '../../utils/create-unmountable';
import {
  createForwardRef,
  type HeadlessPropsWithRef,
} from '../../utils/dynamic-prop';
import type { Prettify } from '../../utils/types';

export interface TransitionRootBaseProps {
  show: boolean;
}

const TransitionRootContext = createContext<TransitionRootBaseProps>();
const TransitionStateContext = createContext<{ value?: TransitionState }>({});

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

export interface TransitionBaseChildProps
  extends UnmountableProps,
    TransitionHooks {
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export type TransitionChildProps<T extends ValidComponent = 'div'> =
  HeadlessPropsWithRef<T, TransitionBaseChildProps>;

function getClassList(classes?: string): string[] {
  return classes ? classes.split(' ') : [];
}

export function TransitionChild<T extends ValidComponent = 'div'>(
  props: TransitionChildProps<T>,
): JSX.Element {
  const root = useTransitionRootContext('TransitionChild');
  const parent = useContext(TransitionStateContext).value;

  const [current, setCurrent] = createSignal<TransitionStates>();
  const [internalRef, setInternalRef] = createForwardRef(props);
  const [visible, setVisible] = createSignal<boolean>(
    untrack(() => {
      if (props.appear) {
        return root.show;
      }
      return false;
    }),
  );

  const [ready, setReady] = createSignal(false);

  const state = new TransitionState(ready, {
    onTransition(state) {
      props.onTransition?.(state);
      setCurrent(state);
    },
    beforeEnter() {
      props.beforeEnter?.();
      setReady(false);
    },
    beforeLeave() {
      props.beforeLeave?.();
    },
    afterEnter() {
      props.afterEnter?.();
      setReady(true);
    },
    afterLeave() {
      props.afterLeave?.();
      setVisible(false);
    },
  });

  createEffect(
    createDependencyList(() => [
      props.enter,
      props.enterFrom,
      props.enterTo,
      props.entered,
      props.leave,
      props.leaveFrom,
      props.leaveTo,
    ]),
    ([enter, enterFrom, enterTo, entered, leave, leaveFrom, leaveTo]) => {
      state.setClasses({
        enter: getClassList(enter),
        enterFrom: getClassList(enterFrom),
        enterTo: getClassList(enterTo),
        entered: getClassList(entered),
        leave: getClassList(leave),
        leaveFrom: getClassList(leaveFrom),
        leaveTo: getClassList(leaveTo),
      });
    },
  );

  if (parent) {
    parent.register(state);

    onCleanup(() => {
      parent.unregister(state);
    });
    createEffect(
      () => root.show && parent.visible(),
      flag => {
        if (flag) {
          setVisible(true);
        }
      },
    );
    createEffect(internalRef, element => {
      if (element instanceof HTMLElement) {
        state.setElement(element);
      }
    });
  } else {
    createEffect(
      () => root.show,
      flag => {
        if (flag) {
          setVisible(true);
        }
      },
    );
  }

  createEffect(
    createDependencyList(() => [internalRef(), root.show]),
    ([element, flag]) => {
      if (element instanceof HTMLElement) {
        state.setElement(element);

        if (flag) {
          state.show();
        } else {
          state.hide();
        }
      }
    },
  );

  const id = createUniqueId();

  return createComponent(TransitionStateContext, {
    value: { value: state },
    get children() {
      return createUnmountable(props, visible, () =>
        createDynamic(
          () => props.as || ('div' as T),
          merge(
            {
              id,
            },
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
                return current();
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
      return createComponent(TransitionStateContext, {
        value: { value: undefined },
        get children() {
          return createComponent(
            TransitionChild,
            omit(props, 'show') as unknown as TransitionChildProps<T>,
          );
        },
      });
    },
  });
}
