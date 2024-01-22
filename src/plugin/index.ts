import plugin from 'tailwindcss/plugin';

export default plugin(
  function ({ addBase }) {
    // Add base styles
    addBase({
      ':root': {
        '--font-header': 'Montserrat',
        '--font-body': 'Noto Sans',
      },
      // @ts-ignore
      '@font-face': [
        {
          src: `url(https://fonts.googleapis.com/css2?family=Montserrat:wght@200..900&display=swap)`,
          fontFamily: 'Montserrat',
          fontDisplay: 'swap',
        },
        {
          src: `url(https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200..900&display=swap)`,
          fontFamily: 'Noto Sans',
          fontDisplay: 'swap',
        },
      ],
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
