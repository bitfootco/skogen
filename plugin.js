const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addBase, theme }) {
    // Add base styles
    addBase({
      ':root': {
        // font family variables
        '--font-header': 'Montserrat',
        '--font-body': 'Noto Sans',
        // color variables
        '--color-primary': theme("colors.blue.500"), 
        '--color-secondary': theme("colors.violet.500"),
      },
    });
  },
  {
    // extend the base theme
    theme: {
      extend: {
        // add custom colors
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
        },
        // add custom font selectors
        fontFamily: {
          header: ['var(--font-header)'],
          body: ['var(--font-body)'],
        },
      },
    },
  },
);
