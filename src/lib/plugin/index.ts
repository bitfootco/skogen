import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import isDarkColor from '../../utils/isDarkColor';
import { classGenerator } from './classGenerator';

// import paletteGenerator from '../../utils/paletteGenerator';

const skogen = plugin(function ({ addBase, addUtilities, theme }) {
  // Add base styles
  addBase({
    ':root': {
      // font family variables
      '--font-header': 'Montserrat',
      '--font-body': 'Noto Sans',
      // color variables
      '--color-white': colors.slate[100],
      '--color-black': colors.slate[900],
    },
  });
  // generate theme classes based on defaults or user defined colors
  const primary: string = theme('colors.primary') || colors.blue[500];
  const secondary: string = theme('colors.secondary') || colors.violet[500];
  // generate singleton CSS utilities
  const baseUtilities = {
    '.text-default': {
      color: isDarkColor(theme('colors.text.default') || colors.gray[900])
        ? 'var(--color-white)'
        : 'var(--color-black)',
    },
    '.text-button-default': {
      color: isDarkColor(primary) ? 'var(--color-white)' : 'var(--color-black)',
    },
    '.text-button-secondary': {
      color: isDarkColor(secondary)
        ? 'var(--color-white)'
        : 'var(--color-black)',
    },
    '.bg-default': {
      backgroundColor: theme('colors.bg.default') || colors.gray[100],
    },
  };
  // init empty object to store new utilities
  let newUtilites = {};
  // create Primary and Secondary color utilities
  newUtilites = Object.assign(newUtilites, classGenerator('primary', primary));
  newUtilites = Object.assign(
    newUtilites,
    classGenerator('secondary', secondary),
  );
  // add new utilities to Tailwind
  addUtilities({ ...baseUtilities, ...newUtilites });
});

export default skogen;
