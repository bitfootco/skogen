import { hexToRGB, rgbToHSL } from '../../utils/paletteGenerator/hexConverters';

describe('hexConverters', () => {
  describe('hexToRGB()', () => {
    test('should return correct RGB values for #000000', () => {
      expect(hexToRGB('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });
    test('should return correct RGB values for #ffffff', () => {
      expect(hexToRGB('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    });
    test('should return correct RGB values for #f4845a', () => {
      expect(hexToRGB('#f4845a')).toEqual({ r: 244, g: 132, b: 90 });
    });
  });

  describe('rgbToHSL()', () => {
    test('should return correct HSL values for #000000', () => {
      expect(rgbToHSL(0, 0, 0)).toEqual([0, 0, 0]);
    });
    test('should return correct HSL values for #ffffff', () => {
      expect(rgbToHSL(255, 255, 255)).toEqual([0, 0, 100]);
    });
    test('should return correct HSL values for #f4845a', () => {
      expect(rgbToHSL(244, 132, 90)).toEqual([
        16.363636363636367, 87.50000000000001, 65.49019607843137,
      ]);
    });
  });
});
