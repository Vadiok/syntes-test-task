export const getArrayWithOffset = <T>(array: T[], start = 0, elementCount?: number): T[] => {
  const end = (typeof elementCount === 'number') ? (start + elementCount) : undefined;
  return array.slice(start, end);
};
