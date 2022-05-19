import { isList, shapeArray } from '../../src/ai/svm/svm_binary_classifier';
import '../../src/extensions/array';

describe('Array extension methods', () => {
  it('can check if a list var is a list', () => {
    expect(isList([1, 2, 3, 4])).toBe(true);
  });
  it('can check if a float var is a list', () => {
    expect(isList(1)).toBe(false);
  });
  it('can sum a list', () => {
    expect([1, 2, 3, 4].sum()).toBe(10);
  });
  it('can get first element', () => {
    expect([1, 2, 3, 4].first()).toBe(1);
  });
  it('can calculate average', () => {
    expect([1, 2, 3, 4].average()).toBeCloseTo(2.5);
  });
  it('can pull unique values from array', () => {
    expect([0, 1, 2, 3, 2, 3].unique()).toMatchObject([0, 1, 2, 3]);
  });
  it("can create 'new' range", () => {
    expect(Array.Arange(5, 9, 2)).toMatchObject([5, 7]);
  });
  it('set shape property correctly', () => {
    expect(
      [
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
      ].shape()
    ).toMatchObject([4, 3]);
  });
  it('compares shape property correctly', () => {
    expect(shapeArray([[0], [3]])).toMatchObject([2, 1]);
  });
});
