import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
// import node from '@astrojs/node';
import solidLabelsPlugin from 'vite-plugin-solid-labels';

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  output: 'server',
  adapter: vercel(),
  // adapter: node({
  //   mode: 'standalone'
  // }),
  vite: {
    plugins: [solidLabelsPlugin({
      filter: {
        include: 'src/**/*.tsx',
        exclude: 'node_modules/**/*.{ts,js}'
      }
    })],
    ssr: {
      noExternal: ['solid-swr-store']
    }
  }
});