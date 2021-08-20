const { solidPlugin } = require('esbuild-plugin-solid');

module.exports = {
  target: 'es2017',
  plugins: [
    solidPlugin(),
  ],
};
