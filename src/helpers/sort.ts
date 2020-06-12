export const getSortValueForString = (a: string|number|null, b: string|number|null, desc = false):
  number => {
  const lowerResult = desc ? -1 : 1;
  if (a === null) {
    return (b === null) ? 0 : (lowerResult * -1);
  }
  if (b === null) {
    return lowerResult;
  }
  return `${a}`.toLowerCase().localeCompare(`${b}`.toLowerCase()) * lowerResult;
};

export const getSortValueForNumber = (a: string|number|null, b: string|number|null, desc = false):
  number => {
  const aNumeric = (a === null) ? null : +a;
  const bNumeric = (b === null) ? null : +b;
  const lowerResult = desc ? -1 : 1;
  if (Number.isNaN(aNumeric)) {
    return (Number.isNaN(bNumeric)) ? 0 : lowerResult;
  }
  if (Number.isNaN(bNumeric)) {
    return lowerResult * -1;
  }
  if (aNumeric === null) {
    return (bNumeric === null) ? 0 : (lowerResult * -1);
  }
  if (bNumeric === null) {
    return lowerResult;
  }
  if (aNumeric === bNumeric) {
    return 0;
  }
  return aNumeric > bNumeric ? lowerResult : (lowerResult * -1);
};

export const getSortValueForNumberOrString = (
  a: string|number|null,
  b: string|number|null,
  desc = false,
): number => {
  const aNumeric = (a === null) ? null : +a;
  const bNumeric = (b === null) ? null : +b;
  if (Number.isNaN(aNumeric) || Number.isNaN(bNumeric)) {
    return getSortValueForString(a, b, desc);
  }
  return getSortValueForNumber(a, b, desc) || getSortValueForString(a, b, desc);
};
