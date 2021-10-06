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
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unknown-property": "off"
  }
};
