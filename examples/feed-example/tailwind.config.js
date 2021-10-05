const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.tsx',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  variants: {},
  plugins: [
  ],
};