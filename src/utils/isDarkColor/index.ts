import { hexToHSL } from '../paletteGenerator/hexConverters';

const isDarkColor = (color: string): boolean => {
  const { l: luma } = hexToHSL(color);

  if (luma > 48) {
    return false;
  }

  return true;
};

export default isDarkColor;
