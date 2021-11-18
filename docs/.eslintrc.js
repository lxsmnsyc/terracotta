module.exports = {
  "extends": [
    'lxsmnsyc/typescript/react',
  ],
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": ["**/*.test.tsx"]
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-pascal-case": "off",
    "react/jsx-no-undef": "off",
    "react/destructuring-assignment": "off",
    "react/no-unknown-property": "off",
    "no-labels": "off",
    "no-restricted-syntax": "off",
    "no-unused-labels": "off",
    "react/jsx-no-bind": "off"
  },
};