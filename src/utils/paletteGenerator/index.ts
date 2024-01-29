// Useful tool to generate a palette of Tailwind compatible colors
// from a single hex color. Heavily inspired by:
// https://github.com/bobthered/tailwindcss-palette-generator
import { generateColor } from './generateColor';
import type { Color, Shade } from './interfaces';

const paletteGenerator = (hex: string) => {
  // shade calculation defaults
  const shades: Shade[] = [
    { name: '50', lightness: 98 },
    { name: '100', lightness: 95 },
    { name: '200', lightness: 90 },
    { name: '300', lightness: 82 },
    { name: '400', lightness: 64 },
    { name: '500', lightness: 46 },
    { name: '600', lightness: 33 },
    { name: '700', lightness: 24 },
    { name: '800', lightness: 14 },
    { name: '900', lightness: 7 },
    { name: '950', lightness: 4 },
  ];
  // loop through palette
  const colors: Color = generateColor({ hex, shades });

  return colors;
};

export default paletteGenerator;
