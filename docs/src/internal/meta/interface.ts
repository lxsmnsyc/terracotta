export interface MetaData {
  tag: string;
  attributes?: Record<string, string | boolean | undefined>;
  content?: string;
}

export interface ViewportMeta {
  width?: number | 'device-width';
  height?: number | 'device-height';
  ['initial-scale']?: number | string;
  ['maximum-scale']?: number | string;
  ['minimum-scale']?: number | string;
  ['user-scalable']?: 'yes' | 'no';
  ['viewport-fit']?: 'auto' | 'contain' | 'cover';
}

export interface OpenGraphImageMeta {
  url: string;
  secure_url?: string;
  type?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export interface OpenGraphVideoMeta {
  url: string;
  secure_url?: string;
  type?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export interface OpenGraphAudioMeta {
  url: string;
  secure_url?: string;
  type?: string;
}

type OneOrMore<T> = T | T[];

export type OpenGraphMediaKeys = 'image' | 'audio' | 'video';

export interface OpenGraphMeta {
  type?: string;
  title?: string;
  image?: OneOrMore<OpenGraphImageMeta | string>;
  url?: string;
  audio?: OneOrMore<OpenGraphAudioMeta | string>;
  description?: string;
  determiner?: 'a' | 'an' | 'the' | 'auto';
  locale?: string;
  site_name?: string;
  video?: OneOrMore<OpenGraphVideoMeta | string>;
}

export type RobotsMetaValues =
  | 'index'
  | 'noindex'
  | 'follow'
  | 'nofollow'
  | 'all'
  | 'none'
  | 'noarchive'
  | 'nosnippet'
  | 'noimageindex'
  | 'nocache';

export type RobotsMeta = {
  [key in RobotsMetaValues]?: string;
} | RobotsMetaValues[];

export interface Meta {
  title?: string;
  description?: string;
  viewport?: ViewportMeta;
  themeColor?: string;
  colorScheme?: 'normal' | 'light' | 'dark' | 'dark light' | 'light dark' | 'only light';
  openGraph?: OpenGraphMeta;
  robots?: RobotsMeta;
  others?: MetaData[];
}
