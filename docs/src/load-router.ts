import { defineLoaderRouter } from './internal/root';
import { Load } from './internal/router';

const getLoader = defineLoaderRouter({
  routes: {
    path: './routes',
    imports: import.meta.glob<true, string, Load>('./routes/**/*.tsx', { import: 'load', eager: true }),
  },
});

export default getLoader;
