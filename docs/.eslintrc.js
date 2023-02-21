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
    "no-param-reassign": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "no-restricted-syntax": "off",
    "react/jsx-no-undef": "off"
  }
};
