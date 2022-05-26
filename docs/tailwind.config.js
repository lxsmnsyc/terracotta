module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.tsx',
    './src/**/*.css',
  ],
  darkMode: 'class', // or 'media' or 'class'
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};