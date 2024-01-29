import paletteGenerator from '../../utils/paletteGenerator';
import { hexToRGB } from '../../utils/paletteGenerator/hexConverters';

interface NewUtilities {
  [cssSelector: string]: {
    [cssRule: string]: string;
  };
}

const generateCSS = (color: string, type: string) => {
  // generate raw CSS string to use with selector
  const { r, g, b } = hexToRGB(color);
  return `rgba(${r}, ${g}, ${b}, var(--tw-${type}-opacity, 1))`;
};

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
  }): NewUtilities => {
    let new_utilities: NewUtilities = {};
    // generate singleton CSS color utility
    new_utilities['.' + type + '-' + name] = {
      [attribute]: generateCSS(color, type),
    };
    // generate the full palette
    const palette = paletteGenerator(color);
    Object.keys(palette).forEach((shade) => {
      const buffer: {
        [key: string]: string;
      } = {};
      buffer[attribute] = generateCSS(palette[shade], type);
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
      attribute: 'backgroundColor',
      color,
      name,
    }),
  );
  // crate border utilities
  new_utilities = Object.assign(
    new_utilities,
    classUtility.general({
      type: 'border',
      attribute: 'borderColor',
      color,
      name,
    }),
  );

  return new_utilities;
};
