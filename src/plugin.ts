import type { createPlugin } from 'tailwindcss/plugin';
import isDarkColor from './utils/isDarkColor';
import { classGenerator } from './lib/classGenerator';

type PluginAPI = Parameters<Parameters<typeof createPlugin>[0]>[0];

const DEFAULTS = {
  primary: '#1e40af',
  secondary: '#5b21b6',
  white: '#f1f5f9',
  black: '#0f172a',
  bgDefault: '#f3f4f6',
};

function skogenPlugin({ addBase, addUtilities }: PluginAPI) {
  addBase({
    ':root': {
      '--font-header': 'Montserrat',
      '--font-body': 'Noto Sans',
      '--color-white': DEFAULTS.white,
      '--color-black': DEFAULTS.black,
    },
  });

  const baseUtilities = {
    '.text-default': {
      color: isDarkColor(DEFAULTS.primary)
        ? 'var(--color-white)'
        : 'var(--color-black)',
    },
    '.text-button-default': {
      color: isDarkColor(DEFAULTS.primary)
        ? 'var(--color-white)'
        : 'var(--color-black)',
    },
    '.text-button-secondary': {
      color: isDarkColor(DEFAULTS.secondary)
        ? 'var(--color-white)'
        : 'var(--color-black)',
    },
    '.bg-default': {
      backgroundColor: DEFAULTS.bgDefault,
    },
  };

  let newUtilities = {};
  newUtilities = Object.assign(
    newUtilities,
    classGenerator('primary', DEFAULTS.primary),
  );
  newUtilities = Object.assign(
    newUtilities,
    classGenerator('secondary', DEFAULTS.secondary),
  );

  addUtilities({ ...baseUtilities, ...newUtilities });
}

export default { handler: skogenPlugin };
