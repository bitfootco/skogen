/**
 * cn — Skogen's zero-dependency Tailwind class merger.
 *
 * Merges class strings and resolves conflicts: when two classes belong to the
 * same Tailwind utility group, the last one wins. Variant prefixes (hover:,
 * dark:, md:, focus:dark:, etc.) are part of the key — classes with the same
 * group but different variant prefixes never conflict.
 *
 * Covers every Tailwind utility used by Skogen components. Unknown utilities
 * are passed through unchanged (they are treated as their own unique key and
 * never conflict with anything).
 *
 * Examples:
 *   cn('px-2 px-4')                          → 'px-4'
 *   cn('bg-primary-500', 'bg-blue-500')       → 'bg-blue-500'
 *   cn('text-sm text-gray-500')               → 'text-sm text-gray-500'   (size ≠ color)
 *   cn('bg-primary-500', 'hover:bg-blue-500') → 'bg-primary-500 hover:bg-blue-500'
 *   cn('p-2', 'px-4')                         → 'p-2 px-4'   (different groups, both kept)
 *   cn('p-2', 'p-4')                          → 'p-4'        (same group, last wins)
 *   cn('a', null, undefined, false, 'b')       → 'a b'
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  const tokens: string[] = [];
  for (const input of inputs) {
    if (input) {
      for (const cls of input.split(/\s+/)) {
        if (cls) tokens.push(cls);
      }
    }
  }

  if (tokens.length === 0) return '';

  // Map from conflict-group key → { original position, class string }.
  // Later entries overwrite earlier ones in the same group.
  const seen = new Map<string, { pos: number; cls: string }>();
  for (let i = 0; i < tokens.length; i++) {
    const cls = tokens[i];
    seen.set(conflictKey(cls), { pos: i, cls });
  }

  // Re-assemble in original position order.
  return Array.from(seen.values())
    .sort((a, b) => a.pos - b.pos)
    .map(({ cls }) => cls)
    .join(' ');
}

// ---------------------------------------------------------------------------
// Conflict key computation
// ---------------------------------------------------------------------------

/**
 * Returns the conflict key for a class.
 *
 * The key is `${variantPrefix}${groupName}`. Classes with identical keys
 * conflict; classes with different keys never conflict.
 *
 * When no conflict group is found (unknown utility), the class itself is
 * returned as the key — making it unique and unconflicting.
 */
function conflictKey(cls: string): string {
  // Separate variant prefixes from the base utility.
  // e.g. "hover:dark:bg-gray-500" → prefix = "hover:dark:", base = "bg-gray-500"
  const colonIdx = cls.lastIndexOf(':');
  const prefix = colonIdx >= 0 ? cls.slice(0, colonIdx + 1) : '';
  const base = colonIdx >= 0 ? cls.slice(colonIdx + 1) : cls;

  const group = baseGroup(base);
  return group !== null ? `${prefix}${group}` : cls;
}

// ---------------------------------------------------------------------------
// Exact-match sets (checked before prefix scan for efficiency)
// ---------------------------------------------------------------------------

/** Display-value keywords (single word, no dash). */
const DISPLAY = new Set([
  'block', 'inline', 'flex', 'grid', 'hidden', 'contents', 'flow-root',
  'list-item', 'table',
]);

/** Inline display variants — same conflict group as DISPLAY. */
const INLINE_DISPLAY = new Set(['inline-block', 'inline-flex', 'inline-grid',
  'inline-table', 'table-cell', 'table-row', 'table-column', 'table-caption',
  'table-row-group', 'table-header-group', 'table-footer-group', 'table-column-group',
]);

/** CSS position keywords. */
const POSITION = new Set(['static', 'fixed', 'absolute', 'relative', 'sticky']);

/** Visibility keywords. */
const VISIBILITY = new Set(['visible', 'invisible', 'collapse']);

// ---------------------------------------------------------------------------
// Sub-group discriminator sets
// ---------------------------------------------------------------------------

const TEXT_SIZES = new Set([
  'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl',
]);

const FONT_WEIGHTS = new Set([
  'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black',
]);

const SHADOW_SCALES = new Set(['sm', 'md', 'lg', 'xl', '2xl', 'none', 'inner']);

const ROUNDED_SCALES = new Set(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']);

const BORDER_WIDTH_VALS = new Set(['0', '2', '4', '8']);
const BORDER_STYLES = new Set([
  'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden', 'none',
]);
const BORDER_DIRS = new Set(['t', 'r', 'b', 'l', 'x', 'y', 's', 'e']);

const FLEX_DIRECTIONS = new Set(['row', 'col', 'row-reverse', 'col-reverse']);
const FLEX_WRAPS = new Set(['wrap', 'nowrap', 'wrap-reverse']);

// ---------------------------------------------------------------------------
// Prefix-resolver table
// ---------------------------------------------------------------------------
// Entries are checked in order — put MORE SPECIFIC prefixes before less specific.
// Each entry is [prefix, resolver] where resolver is either:
//   - a static group-name string, or
//   - a function (rest: string) → group-name | null
// ---------------------------------------------------------------------------

type Resolver = string | ((rest: string) => string | null);

const RESOLVERS: [string, Resolver][] = [
  // Background
  ['bg-opacity-',     'bg-opacity'],
  ['bg-gradient-',    'bg-gradient'],
  ['bg-',             'bg'],

  // Text — size/opacity before color
  ['text-opacity-',   'text-opacity'],
  ['text-',           (r) => TEXT_SIZES.has(r) ? 'text-size' : 'text-color'],

  // Font — weight before family
  ['font-',           (r) => FONT_WEIGHTS.has(r) ? 'font-weight' : 'font-family'],

  // Padding — specific axes before generic p-
  ['px-', 'px'], ['py-', 'py'],
  ['pt-', 'pt'], ['pb-', 'pb'],
  ['pl-', 'pl'], ['pr-', 'pr'],
  ['ps-', 'ps'], ['pe-', 'pe'],
  ['p-',  'p'],

  // Margin — specific axes before generic m-
  ['mx-', 'mx'], ['my-', 'my'],
  ['mt-', 'mt'], ['mb-', 'mb'],
  ['ml-', 'ml'], ['mr-', 'mr'],
  ['ms-', 'ms'], ['me-', 'me'],
  ['m-',  'm'],

  // Sizing — constrained before unconstrained
  ['size-',   'size'],
  ['min-w-',  'min-w'], ['max-w-', 'max-w'],
  ['min-h-',  'min-h'], ['max-h-', 'max-h'],
  ['w-', 'w'], ['h-', 'h'],

  // Border — specific patterns before generic border-
  ['border-opacity-', 'border-opacity'],
  ['border-',         (r) => {
    if (!r)                        return 'border-width'; // shouldn't occur with 'border-' prefix
    if (BORDER_WIDTH_VALS.has(r))  return 'border-width';
    if (BORDER_STYLES.has(r))      return 'border-style';
    if (r === 'collapse' || r === 'separate') return 'border-collapse';
    const dir = r.split('-')[0];
    if (BORDER_DIRS.has(dir)) {
      const after = r.slice(dir.length).replace(/^-/, '');
      return !after || BORDER_WIDTH_VALS.has(after)
        ? `border-${dir}-width`
        : `border-${dir}-color`;
    }
    return 'border-color';
  }],

  // Rounded — scale keywords → unified group; directional → sub-group
  ['rounded-',        (r) => ROUNDED_SCALES.has(r) ? 'rounded' : `rounded-${r.split('-')[0]}`],

  // Opacity
  ['opacity-', 'opacity'],

  // Shadow — scale → unified group; color → own group
  ['shadow-',  (r) => SHADOW_SCALES.has(r) ? 'shadow' : 'shadow-color'],

  // Ring — numeric width, offset, opacity, then color
  ['ring-',    (r) => {
    if (/^\d/.test(r))         return 'ring-width';
    if (r.startsWith('offset-')) return 'ring-offset';
    if (r.startsWith('opacity-')) return 'ring-opacity';
    return 'ring-color';
  }],

  // Gap
  ['gap-x-', 'gap-x'], ['gap-y-', 'gap-y'], ['gap-', 'gap'],

  // Space-between
  ['space-x-', 'space-x'], ['space-y-', 'space-y'],

  // Flex
  ['flex-',    (r) => {
    if (FLEX_DIRECTIONS.has(r)) return 'flex-direction';
    if (FLEX_WRAPS.has(r))      return 'flex-wrap';
    if (r === 'grow')           return 'flex-grow';
    if (r === 'shrink')         return 'flex-shrink';
    return 'flex-basis';
  }],
  ['grow-',   'flex-grow'],
  ['shrink-', 'flex-shrink'],

  // Grid
  ['grid-cols-', 'grid-cols'],
  ['grid-rows-', 'grid-rows'],
  ['col-span-',  'col-span'],
  ['row-span-',  'row-span'],

  // Inset — specific axes before generic
  ['inset-x-', 'inset-x'], ['inset-y-', 'inset-y'], ['inset-', 'inset'],

  // Directional position
  ['top-', 'top'], ['right-', 'right'], ['bottom-', 'bottom'], ['left-', 'left'],

  // Z-index
  ['z-', 'z'],

  // Overflow — specific axes before generic
  ['overflow-x-', 'overflow-x'], ['overflow-y-', 'overflow-y'], ['overflow-', 'overflow'],

  // Cursor
  ['cursor-', 'cursor'],

  // Transition timing
  ['duration-', 'duration'], ['ease-', 'ease'], ['delay-', 'delay'], ['animate-', 'animate'],

  // Typography
  ['leading-',     'leading'],
  ['tracking-',    'tracking'],
  ['decoration-',  'text-decoration'],
  ['whitespace-',  'whitespace'],
  ['break-',       'word-break'],
  ['indent-',      'indent'],
  ['line-clamp-',  'line-clamp'],

  // Misc
  ['aspect-',  'aspect'],
  ['outline-', 'outline'],
  ['object-',  'object-fit'],
  ['scroll-',  'scroll'],
  ['select-',  'user-select'],
  ['pointer-', 'pointer-events'],
  ['resize-',  'resize'],
  ['columns-', 'columns'],
  ['will-change-', 'will-change'],
  ['transform-',   'transform-origin'],
  ['translate-x-', 'translate-x'],
  ['translate-y-', 'translate-y'],
  ['scale-',       'scale'],
  ['rotate-',      'rotate'],
  ['skew-x-',      'skew-x'],
  ['skew-y-',      'skew-y'],
];

// ---------------------------------------------------------------------------
// Core group resolver
// ---------------------------------------------------------------------------

function baseGroup(base: string): string | null {
  // Fast exact-match checks for common single-token utilities
  if (DISPLAY.has(base))         return 'display';
  if (INLINE_DISPLAY.has(base))  return 'display';
  if (POSITION.has(base))        return 'position';
  if (VISIBILITY.has(base))      return 'visibility';

  // Single-token exact matches for utilities that also have prefix variants
  switch (base) {
    case 'border':  return 'border-width';
    case 'rounded': return 'rounded';
    case 'shadow':  return 'shadow';
    case 'ring':    return 'ring-width';
    case 'gap':     return 'gap';
    case 'grow':    return 'flex-grow';
    case 'shrink':  return 'flex-shrink';
    case 'outline': return 'outline';
    case 'resize':  return 'resize';
    case 'p':       return 'p';
    case 'm':       return 'm';
  }

  // Prefix-based scan — first matching prefix wins
  for (const [prefix, resolver] of RESOLVERS) {
    if (base.startsWith(prefix)) {
      const rest = base.slice(prefix.length);
      return typeof resolver === 'string' ? resolver : resolver(rest);
    }
  }

  return null; // unknown utility — unique key, never conflicts
}
