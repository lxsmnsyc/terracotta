module.exports = {
  "root": true,
  "extends": [
    "lxsmnsyc/typescript/solid"
  ],
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
  },
  "rules": {
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-syntax": "off",
    "no-param-reassign": "off",
  }
};
