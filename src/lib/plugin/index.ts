import type { PluginWithConfig } from 'tailwindcss/plugin';
import plugin from 'tailwindcss/plugin';
import isDarkColor from '../../utils/isDarkColor';
import { classGenerator } from './classGenerator';

// Default palette anchors (equivalent to blue-800, violet-800, slate-100, slate-900)
const DEFAULTS = {
  primary: '#1e40af',
  secondary: '#5b21b6',
  white: '#f1f5f9',
  black: '#0f172a',
  bgDefault: '#f3f4f6',
};

export interface SkogenOptions {
  primary?: string;
  secondary?: string;
}

// PluginWithOptions is not re-exported from tailwindcss/plugin, so we reconstruct
// the shape locally to avoid TS2742 in isolated-declarations mode.
type PluginWithOptions<T> = {
  (options?: T): PluginWithConfig;
  __isOptionsFunction: true;
};

const skogen: PluginWithOptions<SkogenOptions> = plugin.withOptions<SkogenOptions>(
  function (options = {}) {
    return function ({ addBase, addUtilities }) {
      const primary = options.primary ?? DEFAULTS.primary;
      const secondary = options.secondary ?? DEFAULTS.secondary;

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
          color: isDarkColor(primary)
            ? 'var(--color-white)'
            : 'var(--color-black)',
        },
        '.text-button-default': {
          color: isDarkColor(primary)
            ? 'var(--color-white)'
            : 'var(--color-black)',
        },
        '.text-button-secondary': {
          color: isDarkColor(secondary)
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
        classGenerator('primary', primary),
      );
      newUtilities = Object.assign(
        newUtilities,
        classGenerator('secondary', secondary),
      );

      addUtilities({ ...baseUtilities, ...newUtilities });
    };
  },
) as PluginWithOptions<SkogenOptions>;

export default skogen;
