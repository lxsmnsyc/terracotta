import {
  createComponent,
  JSX,
} from 'solid-js';
import {
  HeadlessSelectContext,
  HeadlessSelectProperties,
} from './useHeadlessSelectProperties';
import {
  useHeadlessSelect,
  HeadlessSelectOptions,
} from './useHeadlessSelect';
import {
  HeadlessSelectMultipleControlledOptions,
  HeadlessSelectMultipleUncontrolledOptions,
} from './useHeadlessSelectMultiple';
import {
  HeadlessSelectSingleControlledOptions,
  HeadlessSelectSingleUncontrolledOptions,
} from './useHeadlessSelectSingle';
import { NonLazyElement } from '../../utils/types';

export type HeadlessSelectRootRenderProp<T> = (
  (properties: HeadlessSelectProperties<T>) => JSX.Element
);

function isHeadlessSelectRootRenderProp<T>(
  children: HeadlessSelectRootRenderProp<T> | NonLazyElement,
): children is HeadlessSelectRootRenderProp<T> {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessSelectRootChildren<T> {
  children?: HeadlessSelectRootRenderProp<T> | NonLazyElement;
}

export type HeadlessSelectRootProps<T> = HeadlessSelectRootChildren<T> & HeadlessSelectOptions<T>;

export function HeadlessSelectRoot<T>(props: HeadlessSelectRootProps<T>): JSX.Element {
  const properties = useHeadlessSelect(props);
  return (
    createComponent(HeadlessSelectContext.Provider, {
      value: properties,
      children: () => {
        const body = props.children;
        if (isHeadlessSelectRootRenderProp(body)) {
          return body(properties);
        }
        return body;
      },
    })
  );
}

export function createHeadlessSelectRootMultipleControlledProps<T>(
  props: HeadlessSelectMultipleControlledOptions<T> & HeadlessSelectRootChildren<T>,
): HeadlessSelectRootChildren<T> {
  return {
    get children() {
      return createComponent(HeadlessSelectRoot, {
        multiple: true,
        onChange: props.onChange,
        get value() {
          return props.value;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        },
      } as HeadlessSelectRootProps<T>);
    },
  };
}

export function createHeadlessSelectRootMultipleUncontrolledProps<T>(
  props: HeadlessSelectMultipleUncontrolledOptions<T> & HeadlessSelectRootChildren<T>,
): HeadlessSelectRootChildren<T> {
  return {
    get children() {
      return createComponent(HeadlessSelectRoot, {
        multiple: true,
        onChange: props.onChange,
        get defaultValue() {
          return props.defaultValue;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        },
      } as HeadlessSelectRootProps<T>);
    },
  };
}

export function createHeadlessSelectRootSingleControlledProps<T>(
  props: HeadlessSelectSingleControlledOptions<T> & HeadlessSelectRootChildren<T>,
): HeadlessSelectRootChildren<T> {
  return {
    get children() {
      return createComponent(HeadlessSelectRoot, {
        onChange: props.onChange,
        get value() {
          return props.value;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        },
      } as HeadlessSelectRootProps<T>);
    },
  };
}

export function createHeadlessSelectRootSingleUncontrolledProps<T>(
  props: HeadlessSelectSingleUncontrolledOptions<T> & HeadlessSelectRootChildren<T>,
): HeadlessSelectRootChildren<T> {
  return {
    get children() {
      return createComponent(HeadlessSelectRoot, {
        onChange: props.onChange,
        get defaultValue() {
          return props.defaultValue;
        },
        get toggleable() {
          return props.toggleable;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return props.children;
        },
      } as HeadlessSelectRootProps<T>);
    },
  };
}
