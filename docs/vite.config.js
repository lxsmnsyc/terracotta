import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidLabels from 'babel-plugin-solid-labels';
import solidStyledPlugin from 'babel-plugin-solid-styled';

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [
          [solidLabels, { dev: false }],
          [solidStyledPlugin],
        ],
      },
    }),
  ],
});
