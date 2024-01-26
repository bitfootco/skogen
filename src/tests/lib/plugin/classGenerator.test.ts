import {
  classGenerator,
  classUtility,
} from '../../../lib/plugin/classGenerator';

describe('classGenerator()', () => {
  describe('classUtility.general()', () => {
    it('should return all expected text-{color}-{shade} utils', () => {
      const results = classUtility.general({
        type: 'text',
        attribute: 'color',
        color: '#fa3f3f',
        name: 'test',
      });
      const [first] = Object.keys(results);
      const expected = '.text-test-50';
      expect(Object.keys(results).length).toEqual(11);
      expect(first).toEqual(expected);
      expect(results[expected]).toEqual({
        color: 'rgba(255, 245, 245, var(--tw-text-opacity, 1))',
      });
    });
  });
  describe('classGenerator()', () => {
    it('should return all expect class utilities', () => {
      const results = classGenerator('test', '#fa3f3f');
      expect(Object.keys(results).length).toEqual(11);
      expect(results['.text-test-500']).toEqual({
        color: 'rgba(229, 6, 6, var(--tw-text-opacity, 1))',
      });
    });
  });
});
