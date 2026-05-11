import isDarkColor from '../../utils/isDarkColor';

// Hardcoded hex values — isDarkColor is a hex utility and should not depend
// on any external color library for its test fixtures.
const gray = {
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};
const lime = {
  100: '#ecfccb',
  200: '#d9f99d',
  300: '#bef264',
  400: '#a3e635',
  500: '#84cc16',
  600: '#65a30d',
  700: '#4d7c0f',
  800: '#3f6212',
  900: '#365314',
};

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
    expect(isDarkColor(gray[900])).toBe(true);
    expect(isDarkColor(gray[800])).toBe(true);
    expect(isDarkColor(gray[700])).toBe(true);
    expect(isDarkColor(gray[600])).toBe(true);
    expect(isDarkColor(gray[500])).toBe(true);
    expect(isDarkColor(gray[400])).toBe(false);
    expect(isDarkColor(gray[300])).toBe(false);
    expect(isDarkColor(gray[200])).toBe(false);
    expect(isDarkColor(gray[100])).toBe(false);
  });
  test('should return correct results for lime spectrum', () => {
    expect(isDarkColor(lime[900])).toBe(true);
    expect(isDarkColor(lime[800])).toBe(true);
    expect(isDarkColor(lime[700])).toBe(true);
    expect(isDarkColor(lime[600])).toBe(true);
    expect(isDarkColor(lime[500])).toBe(true);
    expect(isDarkColor(lime[400])).toBe(false);
    expect(isDarkColor(lime[300])).toBe(false);
    expect(isDarkColor(lime[200])).toBe(false);
    expect(isDarkColor(lime[100])).toBe(false);
  });
  test('should return true for a color right on the edge', () => {
    expect(isDarkColor('#4b0cdf')).toBe(true);
  });
});
