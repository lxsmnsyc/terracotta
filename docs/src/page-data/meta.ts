import {
  JSX,
} from 'solid-js';

export interface PropInfo {
  name: string;
  type: string;
  default: string;
  description?: JSX.Element;
}

export interface ComponentInfo {
  name: string;
  description?: JSX.Element;
  props: PropInfo[];
}

export interface ExtraAPIInfo {
  code: string;
  description?: JSX.Element;
}

export interface APIInfo {
  components: ComponentInfo[];
  extras?: ExtraAPIInfo[];
}

export interface HeaderInfo {
  title: string;
  description: JSX.Element;
}

export interface StructureInfo {
  description: JSX.Element;
  code: string;
}

export interface DocumentInfo {
  header?: HeaderInfo;
  structure?: StructureInfo;
  demo?: string;
  api?: APIInfo;
}
