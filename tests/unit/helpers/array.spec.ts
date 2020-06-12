import { expect } from 'chai';
import { getArrayWithOffset } from '@/helpers/array';

describe('helpers/array', () => {
  // getArrayWithOffset
  const array = Array.from(Array(10).keys()); // [0, .., 9]
  const arrayLength = array.length; // [0, .., 9]
  it('returns full array when no params specified', () => {
    expect(getArrayWithOffset(array).length).to.be.equal(arrayLength);
  });
  it('returns correct length when offset specified', () => {
    expect(getArrayWithOffset(array, 5).length).to.be.equal(5);
  });
  it('returns correct length when offset and length specified', () => {
    expect(getArrayWithOffset(array, 5, 2).length).to.be.equal(2);
  });
  it('returns correct elements', () => {
    const newArray = getArrayWithOffset(array, 5, 3);
    expect(newArray[0]).to.be.equal(5);
    expect(newArray.slice(-1)[0]).to.be.equal(7);
  });
});
