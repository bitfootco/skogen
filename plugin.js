const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addBase }) {
    // Add base styles
    addBase({
      ':root': {
        '--font-header': 'Montserrat',
        '--font-body': 'Noto Sans',
      },
    });
  },
  {
    // extend the base theme
    theme: {
      extend: {
        fontFamily: {
          // add custom font selectors
          header: ['var(--font-header)'],
          body: ['var(--font-body)'],
        },
      },
    },
  },
);
