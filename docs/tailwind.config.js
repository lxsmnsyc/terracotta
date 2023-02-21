module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{tsx,astro}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
};