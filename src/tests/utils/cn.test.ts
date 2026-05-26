import { cn } from '../../utils/cn';

describe('cn — class merger', () => {
  // ── Basic behaviour ────────────────────────────────────────────────────────

  test('concatenates multiple strings', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  test('filters falsy inputs', () => {
    expect(cn('a', null, undefined, false, 'b')).toBe('a b');
  });

  test('handles empty / whitespace strings', () => {
    expect(cn('', '  ', 'a')).toBe('a');
  });

  test('returns empty string when all inputs are falsy', () => {
    expect(cn(null, undefined, false)).toBe('');
  });

  // ── Deduplication (same group → last wins) ─────────────────────────────────

  test('deduplicates classes in the same conflict group (inline)', () => {
    expect(cn('px-2 px-4')).toBe('px-4');
  });

  test('deduplicates classes in the same conflict group (separate args)', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  test('consumer override wins over base classes', () => {
    // Base has bg-primary-500; consumer passes bg-blue-500 — should win
    expect(cn('rounded-full bg-primary-500 text-white', 'bg-blue-500'))
      .toBe('rounded-full text-white bg-blue-500');
  });

  // ── Variant-prefix scoping ─────────────────────────────────────────────────

  test('classes with same group but same variant prefix conflict', () => {
    expect(cn('hover:bg-primary-500 hover:bg-blue-500')).toBe('hover:bg-blue-500');
  });

  test('classes with same group but different variant prefixes do not conflict', () => {
    expect(cn('bg-primary-500 hover:bg-blue-500'))
      .toBe('bg-primary-500 hover:bg-blue-500');
  });

  test('multi-variant prefix handled correctly', () => {
    expect(cn('dark:md:text-sm', 'dark:md:text-lg')).toBe('dark:md:text-lg');
    // Different prefix → no conflict
    expect(cn('md:text-sm', 'lg:text-sm')).toBe('md:text-sm lg:text-sm');
  });

  // ── Text size vs colour (must not clobber each other) ─────────────────────

  test('text-size and text-color are distinct groups', () => {
    expect(cn('text-sm text-gray-500')).toBe('text-sm text-gray-500');
    expect(cn('text-xl text-primary-500')).toBe('text-xl text-primary-500');
  });

  test('same text-size group conflicts', () => {
    expect(cn('text-sm text-lg')).toBe('text-lg');
  });

  test('same text-color group conflicts', () => {
    expect(cn('text-gray-500 text-blue-600')).toBe('text-blue-600');
  });

  // ── Padding specificity ────────────────────────────────────────────────────

  test('p-* and px-* are different groups (both kept)', () => {
    // p-2 sets all sides; px-4 overrides horizontal only — correct to keep both
    expect(cn('p-2 px-4')).toBe('p-2 px-4');
  });

  test('same p group conflicts', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
  });

  test('same px group conflicts', () => {
    expect(cn('px-2 px-6')).toBe('px-6');
  });

  // ── Font weight vs font family ─────────────────────────────────────────────

  test('font-weight and font-family are distinct groups', () => {
    expect(cn('font-body font-bold')).toBe('font-body font-bold');
    expect(cn('font-header font-medium')).toBe('font-header font-medium');
  });

  test('same font-weight conflicts', () => {
    expect(cn('font-bold font-semibold')).toBe('font-semibold');
  });

  // ── Border ────────────────────────────────────────────────────────────────

  test('border-color and border-width are distinct groups', () => {
    expect(cn('border border-red-500')).toBe('border border-red-500');
  });

  test('same border-color conflicts', () => {
    expect(cn('border-red-500 border-blue-500')).toBe('border-blue-500');
  });

  test('same border-width conflicts', () => {
    expect(cn('border border-2')).toBe('border-2');
  });

  // ── Rounded ───────────────────────────────────────────────────────────────

  test('same rounded group conflicts', () => {
    expect(cn('rounded-full rounded-md')).toBe('rounded-md');
  });

  // ── Background ────────────────────────────────────────────────────────────

  test('bg-opacity is distinct from bg-color', () => {
    expect(cn('bg-gray-500 bg-opacity-50')).toBe('bg-gray-500 bg-opacity-50');
  });

  test('same bg group conflicts', () => {
    expect(cn('bg-gray-100 bg-white')).toBe('bg-white');
  });

  // ── Preserves position order ───────────────────────────────────────────────

  test('output maintains original class order (by first occurrence position)', () => {
    // 'flex' at pos 0, 'items-center' at pos 1, 'bg-red-500' at pos 3 wins over pos 2
    const result = cn('flex items-center bg-blue-500 bg-red-500 p-4');
    expect(result).toBe('flex items-center bg-red-500 p-4');
  });

  // ── Display / position exact-match utilities ───────────────────────────────

  test('display keywords conflict', () => {
    expect(cn('block flex')).toBe('flex');
    expect(cn('inline-flex grid')).toBe('grid');
  });

  test('position keywords conflict', () => {
    expect(cn('relative absolute')).toBe('absolute');
  });

  // ── Unknown utilities pass through unchanged ───────────────────────────────

  test('unknown utilities are passed through without conflicting', () => {
    expect(cn('some-custom-class another-custom-class'))
      .toBe('some-custom-class another-custom-class');
  });

  // ── Real Skogen component scenarios ───────────────────────────────────────

  test('Button: consumer bg override wins', () => {
    // Button base: bg-primary-500 hover:bg-primary-600 rounded-full px-4 py-2 font-bold text-white
    const base = 'bg-primary-500 hover:bg-primary-600 rounded-full px-4 py-2 font-bold text-white';
    const result = cn(base, 'bg-blue-500');
    expect(result).toContain('bg-blue-500');
    expect(result).not.toContain('bg-primary-500');
    expect(result).toContain('hover:bg-primary-600'); // hover variant untouched
  });

  test('InputField: error border overrides default border', () => {
    const base = 'border border-gray-300 focus:border-blue-500';
    const result = cn(base, 'border-red-500');
    expect(result).toContain('border-red-500');
    expect(result).not.toContain('border-gray-300');
    expect(result).toContain('border');          // border-width kept
    expect(result).toContain('focus:border-blue-500'); // focus variant kept
  });

  test('Typography: consumer className text size overrides variant', () => {
    const base = 'text-lg font-semibold text-slate-800';
    const result = cn(base, 'text-xl');
    expect(result).toContain('text-xl');
    expect(result).not.toContain('text-lg');
    expect(result).toContain('text-slate-800'); // color untouched
  });
});
