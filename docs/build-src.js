const rigidity = require('rigidity');

rigidity.createBuild({
  directories: {
    api: 'apis',
  },
  esbuild: {
    tsconfig: './tsconfig.json',
  },
});
