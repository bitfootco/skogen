import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import { classGenerator } from './classGenerator';

// import isDarkColor from '../../utils/isDarkColor';
// import paletteGenerator from '../../utils/paletteGenerator';

const skogen = plugin(function ({ addBase, addUtilities, theme }) {
  // Add base styles
  addBase({
    ':root': {
      // font family variables
      '--font-header': 'Montserrat',
      '--font-body': 'Noto Sans',
    },
  });
  // generate theme classes based on defaults or user defined colors
  const primary: string = theme('colors.primary') || colors.blue[400];
  const secondary: string = theme('colors.secondary') || colors.violet[500];
  let newUtilites = {};
  newUtilites = Object.assign(newUtilites, classGenerator('primary', primary));
  newUtilites = Object.assign(
    newUtilites,
    classGenerator('secondary', secondary),
  );
  addUtilities(newUtilites);
});

export default skogen;
