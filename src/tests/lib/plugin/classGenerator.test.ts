import {
  classGenerator,
  classUtility,
} from '../../../lib/classGenerator';

describe('classGenerator()', () => {
  describe('classUtility.general()', () => {
    it('should return all expected text-{color} utils', () => {
      const results = classUtility.general({
        type: 'text',
        attribute: 'color',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [first] = Object.keys(results);
      const expected = '.text-primary';
      expect(first).toEqual(expected);
      expect(results[expected]).toEqual({ color: '#fa3f3f' });
    });
    it('should return all expected text-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'text',
        attribute: 'color',
        color: '#fa3f3f',
        name: 'primary',
      });
      const second = Object.keys(results)[1];
      const expected = '.text-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      // shade value is hex from paletteGenerator — just assert it's a hex string
      expect(results[expected].color).toMatch(/^#[0-9a-f]{6}$/i);
    });
    it('should return all expected bg-{color} utils', () => {
      const results = classUtility.general({
        type: 'bg',
        attribute: 'backgroundColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [first] = Object.keys(results);
      const expected = '.bg-primary';
      expect(first).toEqual(expected);
      expect(results[expected]).toEqual({ backgroundColor: '#fa3f3f' });
    });
    it('should return all expected bg-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'bg',
        attribute: 'backgroundColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const second = Object.keys(results)[1];
      const expected = '.bg-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      expect(results[expected].backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
    it('should return all expected border-{color} utils', () => {
      const results = classUtility.general({
        type: 'border',
        attribute: 'borderColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [first] = Object.keys(results);
      const expected = '.border-primary';
      expect(first).toEqual(expected);
      expect(results[expected]).toEqual({ borderColor: '#fa3f3f' });
    });
    it('should return all expected border-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'border',
        attribute: 'borderColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const second = Object.keys(results)[1];
      const expected = '.border-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      expect(results[expected].borderColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
  describe('classGenerator()', () => {
    it('should return all expected class utilities', () => {
      const results = classGenerator('primary', '#fa3f3f');
      expect(Object.keys(results).length).toEqual(36);
      expect(results['.text-primary-500']).toBeDefined();
      expect(results['.text-primary-500'].color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
