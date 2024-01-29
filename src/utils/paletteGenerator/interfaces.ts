interface Color {
  [shade: string]: string;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

interface Shade {
  name: string | number;
  lightness: number;
}

export type { Color, HSL, Shade };
