import {
  classGenerator,
  classUtility,
} from '../../../lib/plugin/classGenerator';

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
      expect(results[expected]).toEqual({
        color: 'rgba(250, 63, 63, var(--tw-text-opacity, 1))',
      });
    });
    it('should return all expected text-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'text',
        attribute: 'color',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [_, second] = Object.keys(results);
      const expected = '.text-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      expect(results[expected]).toEqual({
        color: 'rgba(255, 245, 245, var(--tw-text-opacity, 1))',
      });
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
      expect(results[expected]).toEqual({
        backgroundColor: 'rgba(250, 63, 63, var(--tw-bg-opacity, 1))',
      });
    });
    it('should return all expected bg-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'bg',
        attribute: 'backgroundColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [_, second] = Object.keys(results);
      const expected = '.bg-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      expect(results[expected]).toEqual({
        backgroundColor: 'rgba(255, 245, 245, var(--tw-bg-opacity, 1))',
      });
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
      expect(results[expected]).toEqual({
        borderColor: 'rgba(250, 63, 63, var(--tw-border-opacity, 1))',
      });
    });
    it('should return all expected border-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'border',
        attribute: 'borderColor',
        color: '#fa3f3f',
        name: 'primary',
      });
      const [_, second] = Object.keys(results);
      const expected = '.border-primary-50';
      expect(Object.keys(results).length).toEqual(12);
      expect(second).toEqual(expected);
      expect(results[expected]).toEqual({
        borderColor: 'rgba(255, 245, 245, var(--tw-border-opacity, 1))',
      });
    });
  });
  describe('classGenerator()', () => {
    it('should return all expect class utilities', () => {
      const results = classGenerator('primary', '#fa3f3f');
      expect(Object.keys(results).length).toEqual(36);
      expect(results['.text-primary-500']).toEqual({
        color: 'rgba(229, 6, 6, var(--tw-text-opacity, 1))',
      });
    });
  });
});
