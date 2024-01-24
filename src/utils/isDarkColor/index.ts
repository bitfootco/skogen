import { hexToHSL } from '../paletteGenerator/hexConverters';

const isDarkColor = (color: string): boolean => {
  const { l: luma } = hexToHSL(color);
  console.log('luma is', luma);

  if (luma > 48) {
    return false;
  }

  return true;
};

export default isDarkColor;
