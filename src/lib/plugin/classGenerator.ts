import paletteGenerator from '../../utils/paletteGenerator';

interface NewUtilities {
  [cssSelector: string]: {
    [cssRule: string]: string;
  };
}

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
    const new_utilities: NewUtilities = {};
    new_utilities['.' + type + '-' + name] = { [attribute]: color };
    const palette = paletteGenerator(color);
    Object.keys(palette).forEach((shade) => {
      new_utilities['.' + type + '-' + name + '-' + shade] = {
        [attribute]: palette[shade],
      };
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

  new_utilities = Object.assign(
    new_utilities,
    classUtility.general({ type: 'text', attribute: 'color', color, name }),
  );
  new_utilities = Object.assign(
    new_utilities,
    classUtility.general({
      type: 'bg',
      attribute: 'backgroundColor',
      color,
      name,
    }),
  );
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
