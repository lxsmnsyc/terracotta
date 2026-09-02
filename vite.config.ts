import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import { demosPlugin } from './vite/demos';
import { contentIndexPlugin, markdownPlugin } from './vite/markdown';

export default defineConfig({
  plugins: [
    markdownPlugin(),
    contentIndexPlugin(),
    demosPlugin(),
    solid({ start: true, ssr: true }),
  ],
});
