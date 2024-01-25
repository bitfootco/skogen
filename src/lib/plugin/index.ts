import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import isDarkColor from '../../utils/isDarkColor';
import paletteGenerator from '../../utils/paletteGenerator';

interface SkogenOptions {
  colors: {
    primary?: string;
    secondary?: string;
  };
}

const skogen = plugin.withOptions<SkogenOptions>(
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
    // determine default color based on options
    const primary = options?.colors?.primary || colors.blue[400];
    const secondary = options?.colors?.secondary || colors.violet[500];
    // generate the theme extension
    return {
      theme: {
        extend: {
          // add custom colors
          colors: {
            primary,
            secondary,
            'palette-primary': paletteGenerator(primary),
            'palette-secondary': paletteGenerator(secondary),
            'button-primary': isDarkColor(primary)
              ? colors.white
              : colors.gray[900],
            'button-secondary': isDarkColor(primary)
              ? colors.white
              : colors.gray[900],
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
