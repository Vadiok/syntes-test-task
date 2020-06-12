import { expect } from 'chai';
import {
  getSortValueForNumber,
  getSortValueForNumberOrString,
  getSortValueForString,
} from '@/helpers/sort';

describe('helpers/sort', () => {
  it('should return correct values for strings', () => {
    expect(getSortValueForString('a', 'b')).to.be.equal(-1);
    expect(getSortValueForString('a', 'b', true)).to.be.equal(1);
    expect(getSortValueForString('b', 'a')).to.be.equal(1);
    expect(getSortValueForString('b', 'a', true)).to.be.equal(-1);
    expect(getSortValueForString('a', 'a')).to.be.equal(0);
    expect(getSortValueForString('a', 'a', true)).to.be.equal(0);
    expect(getSortValueForString(null, null)).to.be.equal(0);
    expect(getSortValueForString(null, null, true)).to.be.equal(0);
    expect(getSortValueForString(null, 'b')).to.be.equal(-1);
    expect(getSortValueForString(null, 'b', true)).to.be.equal(1);
    expect(getSortValueForString('a', null)).to.be.equal(1);
    expect(getSortValueForString('a', null, true)).to.be.equal(-1);
  });
  it('should return correct values for numbers', () => {
    expect(getSortValueForNumber(1, 2)).to.be.equal(-1);
    expect(getSortValueForNumber(1, 2, true)).to.be.equal(1);
    expect(getSortValueForNumber(2, 1)).to.be.equal(1);
    expect(getSortValueForNumber(2, 1, true)).to.be.equal(-1);
    expect(getSortValueForNumber(1, 1)).to.be.equal(0);
    expect(getSortValueForNumber(1, 1, true)).to.be.equal(0);
    expect(getSortValueForNumber('a', 2)).to.be.equal(1);
    expect(getSortValueForNumber('a', 2, true)).to.be.equal(-1);
    expect(getSortValueForNumber(1, 'b')).to.be.equal(-1);
    expect(getSortValueForNumber(1, 'b', true)).to.be.equal(1);
    expect(getSortValueForNumber('a', 'b')).to.be.equal(0);
    expect(getSortValueForNumber('a', 'b', true)).to.be.equal(0);
  });
  it('should return correct values for numbers & strings', () => {
    expect(getSortValueForNumberOrString(1, 2)).to.be.equal(-1);
    expect(getSortValueForNumberOrString(1, 2, true)).to.be.equal(1);
    expect(getSortValueForNumberOrString('a', 'b')).to.be.equal(-1);
    expect(getSortValueForNumberOrString('a', 'b', true)).to.be.equal(1);
    expect(getSortValueForNumberOrString(1, 'b')).to.be.equal(-1);
    expect(getSortValueForNumberOrString('a', 2)).to.be.equal(1);
    expect(getSortValueForNumberOrString(1, 1)).to.be.equal(0);
    expect(getSortValueForNumberOrString('a', 'a')).to.be.equal(0);
    expect(getSortValueForNumberOrString('1', 1)).to.be.equal(0);
    expect(getSortValueForNumberOrString(1, '1')).to.be.equal(0);
    expect(getSortValueForNumberOrString(1, '2b')).to.be.equal(-1);
    expect(getSortValueForNumberOrString('1a', 2)).to.be.equal(-1);
  });
});
