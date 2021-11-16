const rigidity = require('rigidity');

rigidity.createBuild({
  esbuild: {
    tsconfig: './tsconfig.json',
  },
});
