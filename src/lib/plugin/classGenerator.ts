import paletteGenerator from '../../utils/paletteGenerator';
import { hexToRGB } from '../../utils/paletteGenerator/hexConverters';

export const classUtility = {
  general: ({
    type,
    attribute,
    color,
    name,
  }: {
    type: string;
    attribute: string;
    color: string;
    name: string;
  }): {
    [key: string]: {
      [key: string]: string;
    };
  } => {
    let new_utilities: {
      [key: string]: {
        [key: string]: string;
      };
    } = {};
    // generate the full palette
    const palette = paletteGenerator(color);
    Object.keys(palette).forEach((shade) => {
      const buffer: {
        [key: string]: string;
      } = {};
      const { r, g, b } = hexToRGB(palette[shade]);
      buffer[attribute] =
        'rgba(' +
        r +
        ', ' +
        g +
        ', ' +
        b +
        ', var(--tw-' +
        type +
        '-opacity, 1))';
      new_utilities['.' + type + '-' + name + '-' + shade] = buffer;
    });
    return new_utilities;
  },
};

export const classGenerator = function (
  name: string,
  color: string,
): {
  [key: string]: {
    [key: string]: string;
  };
} {
  let new_utilities = {};

  // create text utilities
  new_utilities = Object.assign(
    new_utilities,
    classUtility.general({
      type: 'text',
      attribute: 'color',
      color,
      name,
    }),
  );
  // create background utilities
  new_utilities = Object.assign(
    new_utilities,
    classUtility.general({
      type: 'bg',
      attribute: 'background-color',
      color,
      name,
    }),
  );

  return new_utilities;
};
