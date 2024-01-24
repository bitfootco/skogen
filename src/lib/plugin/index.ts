import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import paletteGenerator from '../../utils/paletteGenerator';

interface SkogenOptions {
  colors: {
    primary?: string;
    secondary?: string;
  };
}

const skogen = plugin.withOptions(
  function (_) {
    return function ({ addBase }) {
      // Add base styles
      addBase({
        ':root': {
          // font family variables
          '--font-header': 'Montserrat',
          '--font-body': 'Noto Sans',
        },
      });
    };
  },
  function (options: SkogenOptions) {
    return {
      theme: {
        extend: {
          // add custom colors
          colors: {
            primary: paletteGenerator(
              options?.colors?.primary || colors.blue[400],
            ),
            secondary: paletteGenerator(
              options?.colors?.secondary || colors.violet[500],
            ),
          },
          // add custom font selectors
          fontFamily: {
            header: ['var(--font-header)'],
            body: ['var(--font-body)'],
          },
        },
      },
    };
  },
);

export default skogen;
