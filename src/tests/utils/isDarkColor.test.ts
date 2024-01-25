import isDarkColor from '../../utils/isDarkColor';

const colors = require('tailwindcss/colors');

describe('isDarkColor', () => {
  test('should return true for black', () => {
    expect(isDarkColor('#000000')).toBe(true);
    expect(isDarkColor('#000')).toBe(true);
  });
  test('should return false for white', () => {
    expect(isDarkColor('#ffffff')).toBe(false);
    expect(isDarkColor('#fff')).toBe(false);
  });
  test('should return correct results for gray spectrum', () => {
    expect(isDarkColor(colors.gray[900])).toBe(true);
    expect(isDarkColor(colors.gray[800])).toBe(true);
    expect(isDarkColor(colors.gray[700])).toBe(true);
    expect(isDarkColor(colors.gray[600])).toBe(true);
    expect(isDarkColor(colors.gray[500])).toBe(true);
    expect(isDarkColor(colors.gray[400])).toBe(false);
    expect(isDarkColor(colors.gray[300])).toBe(false);
    expect(isDarkColor(colors.gray[200])).toBe(false);
    expect(isDarkColor(colors.gray[100])).toBe(false);
  });
  test('should return correct results for lime spectrum', () => {
    expect(isDarkColor(colors.lime[900])).toBe(true);
    expect(isDarkColor(colors.lime[800])).toBe(true);
    expect(isDarkColor(colors.lime[700])).toBe(true);
    expect(isDarkColor(colors.lime[600])).toBe(true);
    expect(isDarkColor(colors.lime[500])).toBe(true);
    expect(isDarkColor(colors.lime[400])).toBe(false);
    expect(isDarkColor(colors.lime[300])).toBe(false);
    expect(isDarkColor(colors.lime[200])).toBe(false);
    expect(isDarkColor(colors.lime[100])).toBe(false);
  });
  test('should return true for a color right on the edge', () => {
    expect(isDarkColor('#4b0cdf')).toBe(true);
  });
});
