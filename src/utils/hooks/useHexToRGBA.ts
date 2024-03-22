const useHexToRGBA = (hex: string, alpha: number) => {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const a = alpha || 1.0;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default useHexToRGBA;
