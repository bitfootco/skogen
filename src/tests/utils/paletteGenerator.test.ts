import paletteGenerator from '../../utils/paletteGenerator';

const colors = require('tailwindcss/colors');

describe('paletteGenerator()', () => {
  test('should generate an object with eleven shades', () => {
    const result = paletteGenerator(colors.blue[300]);
    expect(Object.keys(result)).toHaveLength(11);
  });
});
