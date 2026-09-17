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
  // `prebuild` clears `dist` once up front. Cleaning per config would let the
  // two declaration builds, which share `dist/types`, delete each other's
  // output.
  clean: false,
};

/**
 * Declarations only, bundled into one file. They are built twice, identical
 * apart from the extension: a `.d.ts` for `import` and a `.d.cts` for
 * `require`. Under `"type": "module"` a `.d.ts` reads as ESM, so a single file
 * shared by both would describe the CommonJS build as ESM to TypeScript.
 *
 * Both go through the ESM declarations pass. TypeScript takes a declaration
 * file's module format from its extension alone, so the `.d.cts` is CommonJS
 * however it was produced. A `cjs` format build would not do: tsdown always
 * emits the CommonJS JavaScript for it, and `emitDtsOnly` only reaches ESM.
 */
function declarations(extension: '.d.ts' | '.d.cts'): UserConfig {
  return {
    ...shared,
    format: 'esm',
    outDir: 'dist/types',
    dts: { emitDtsOnly: true, sourcemap: true },
    outExtensions: () => ({ dts: extension }),
  };
}

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
  declarations('.d.ts'),
  declarations('.d.cts'),
]);
