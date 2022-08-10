import {
  createComponent,
  createMemo,
  JSX,
} from 'solid-js';
import {
  HeadlessAutocompleteContext,
  HeadlessAutocompleteProperties,
} from './useHeadlessAutocompleteProperties';
import {
  useHeadlessAutocomplete,
  HeadlessAutocompleteOptions,
  HeadlessAutocompleteControlledOptions,
  HeadlessAutocompleteUncontrolledOptions,
} from './useHeadlessAutocomplete';

export type HeadlessAutocompleteRootRenderProp = (
  (properties: HeadlessAutocompleteProperties) => JSX.Element
);

function isHeadlessAutocompleteRootRenderProp(
  children: JSX.Element | HeadlessAutocompleteRootRenderProp,
): children is HeadlessAutocompleteRootRenderProp {
  return typeof children === 'function' && children.length > 0;
}

export interface HeadlessAutocompleteRootChildren {
  children?: JSX.Element | HeadlessAutocompleteRootRenderProp;
}

export type HeadlessAutocompleteRootProps =
  HeadlessAutocompleteRootChildren & HeadlessAutocompleteOptions;

export function HeadlessAutocompleteRoot(props: HeadlessAutocompleteRootProps): JSX.Element {
  const properties = useHeadlessAutocomplete(props);
  return (
    createComponent(HeadlessAutocompleteContext.Provider, {
      value: properties,
      get children() {
        return createMemo(() => {
          const body = props.children;
          if (isHeadlessAutocompleteRootRenderProp(body)) {
            return body(properties);
          }
          return body;
        });
      },
    })
  );
}

export function createHeadlessAutocompleteRootControlledProps(
  props: HeadlessAutocompleteControlledOptions & HeadlessAutocompleteRootChildren,
): HeadlessAutocompleteRootChildren {
  return {
    get children() {
      return createComponent(HeadlessAutocompleteRoot, {
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
        get matches() {
          return props.matches;
        },
        get children() {
          return props.children;
        },
      } as HeadlessAutocompleteRootProps);
    },
  };
}

export function createHeadlessAutocompleteRootUncontrolledProps(
  props: HeadlessAutocompleteUncontrolledOptions & HeadlessAutocompleteRootChildren,
): HeadlessAutocompleteRootChildren {
  return {
    get children() {
      return createComponent(HeadlessAutocompleteRoot, {
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
        get matches() {
          return props.matches;
        },
        get children() {
          return props.children;
        },
      } as HeadlessAutocompleteRootProps);
    },
  };
}
