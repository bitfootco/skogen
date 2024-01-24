import { hexToHSL, hslToHEX } from './hexConverters';
import type { Color, HSL, Shade } from './interfaces';

interface GenerateColorConfig {
  hex: string;
  shades: Shade[];
}

const generateColor = ({ hex, shades }: GenerateColorConfig): Color => {
  // convert hex to hsl
  const colorHSL = hexToHSL(hex);

  // initiate shade object
  const obj: Color = {};

  // generate shades
  shades.forEach(({ name, lightness }: Shade) => {
    // deconstruct h & s
    const { h, s } = colorHSL;

    // generate shade hsl
    const hsl: HSL = { h, s, l: lightness };

    // convert hsl to hex
    const hex = hslToHEX(hsl);

    // update shade object
    obj[name] = hex;
  });

  return obj;
};

export { generateColor };
