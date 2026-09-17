import { type UserConfig, defineConfig } from 'tsdown';

/**
 * Reproduces the layout the package was published with under pridepack, so the
 * `exports` map, `main`, `module` and `types` keep pointing at the same files.
 *
 * Four bundles: ESM and CommonJS, each once readable for the `development`
 * condition and once minified for production. The source has no
 * development-only branches, so the two differ only in minification and source
 * maps, which is also all they differed in before.
 */
const shared: UserConfig = {
  entry: { index: 'src/index.ts' },
  platform: 'neutral',
  target: 'es2020',
  // One stable file name per directory; the paths are part of the contract.
  hash: false,
  dts: false,
};

function bundle(format: 'esm' | 'cjs', mode: 'development' | 'production'): UserConfig {
  return {
    ...shared,
    format,
    outDir: `dist/${format}/${mode}`,
    outExtensions: () => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
    minify: mode === 'production',
    sourcemap: mode === 'development',
  };
}

export default defineConfig([
  bundle('esm', 'development'),
  bundle('esm', 'production'),
  bundle('cjs', 'development'),
  bundle('cjs', 'production'),
  {
    ...shared,
    format: 'esm',
    outDir: 'dist/types',
    // Declarations only, bundled into the single `index.d.ts` that `types`
    // names. Nothing reaches the per-file declarations behind it: `exports`
    // only publishes the package root.
    dts: { emitDtsOnly: true, sourcemap: true },
    outExtensions: () => ({ dts: '.d.ts' }),
  },
]);
