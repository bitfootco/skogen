import paletteGenerator from '../../utils/paletteGenerator';

describe('paletteGenerator()', () => {
  test('should generate an object with eleven shades', () => {
    const result = paletteGenerator('#93c5fd'); // blue-300 equivalent in hex
    expect(Object.keys(result)).toHaveLength(11);
  });
  test('all generated shades should be hex strings', () => {
    const result = paletteGenerator('#93c5fd');
    Object.values(result).forEach((shade) => {
      expect(shade).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
