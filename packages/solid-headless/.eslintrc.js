module.exports = {
  "root": true,
  "extends": [
    "lxsmnsyc/typescript/react"
  ],
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
  },
  "rules": {
    "@typescript-eslint/no-unsafe-return": "off",
    "react-hooks/rules-of-hooks": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/jsx-props-no-spreading": "off",
    "no-restricted-syntax": "off"
  }
};
